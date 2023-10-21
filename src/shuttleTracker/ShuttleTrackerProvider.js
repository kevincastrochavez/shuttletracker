import React, { createContext } from 'react';
import { useContext } from 'react';

const ShuttleTrackerContext = createContext({});

/**
 * Providers for the Shuttle Map components
 * @param {Any} children components passed
 * @param {Object} location location object including the coordinates
 * @param {Boolean} locationLoading whether the location data is being fetched or not
 * @returns {JSX.Element}
 */

export default function ShuttleTrackerProvider({
  children,
  location,
  locationLoading,
}) {
  return (
    <ShuttleTrackerContext.Provider value={{ location, locationLoading }}>
      {children}
    </ShuttleTrackerContext.Provider>
  );
}

/**
 * Get the location object, loading status`
 * @returns {{location, locationLoading}}
 */
export function useLocation() {
  const { location, locationLoading } =
    useShuttleTrackerProvider('useLocation');
  return { location, locationLoading };
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
