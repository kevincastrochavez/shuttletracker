import React, { createContext, useState } from 'react';
import { useContext } from 'react';

const ShuttleTrackerContext = createContext({});
const ShuttleTrackerUpdateContext = createContext({});

/**
 * Providers for the Shuttle Map components
 * @returns {JSX.Element}
 */

export default function ShuttleTrackerProvider({ children }) {
  const [location, setLocation] = useState({});

  return (
    <ShuttleTrackerUpdateContext.Provider value={{ setLocation }}>
      <ShuttleTrackerContext.Provider value={{ location }}>
        {children}
      </ShuttleTrackerContext.Provider>
    </ShuttleTrackerUpdateContext.Provider>
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
 * Enables setting the location object
 * @returns {{setLocation}}
 */
export function useSetLocation() {
  const { setLocation } = useSetShuttleTrackerProvider('useSetLocation');
  return { setLocation };
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

/**
 * Enables making changes to the ShuttleTrackerContext (using the ShuttleTrackerUpdateContext)
 * @param {string} functionName - just for using in error reporting
 * @returns {{}}
 */
function useSetShuttleTrackerProvider(functionName) {
  const data = useContext(ShuttleTrackerUpdateContext);
  if (!data)
    throw new Error(
      `${functionName} must be used within a component wrapped by ShuttleTrackerProvider`
    );
  return data;
}
