import React, { createContext } from 'react';
import { useContext } from 'react';

const ShuttleTrackerContext = createContext({});

/**
 * Providers for the Shuttle Map components
 * @returns {JSX.Element}
 */

export default function ShuttleTrackerProvider({ children, location }) {
  console.log(location);

  return (
    <ShuttleTrackerContext.Provider value={{ location }}>
      {children}
    </ShuttleTrackerContext.Provider>
  );
}

/**
 * Get the location object
 * @returns {{location}}
 */
export function useLocation() {
  const { location } = useShuttleTrackerProvider('useLocation');
  return { location };
}

/**
 * Returns the ShuttleTrackerContext
 * @param {string} functionName - just for using in error reporting
 * @returns {{}}
 */
function useShuttleTrackerProvider(functionName) {
  const data = useContext(ShuttleTrackerContext);
  if (!data)
    throw new Error(
      `${functionName} must be used within a component wrapped by ShuttleTrackerProvider`
    );
  return data;
}
