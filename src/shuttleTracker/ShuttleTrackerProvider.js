import React, { createContext } from 'react';
import { useContext } from 'react';

const ShuttleTrackerContext = createContext({});

/**
 * Providers for the Shuttle Map components
 * @param {Any} children components passed
 * @param {Object} location location object including the coordinates
 * @param {Boolean} locationLoading whether the location data is being fetched or not
 * @param {Number} minutesAway minutes away the bus is from your preferred bus stop
 * @returns {JSX.Element}
 */

export default function ShuttleTrackerProvider({
  children,
  location,
  locationLoading,
  minutesAway,
}) {
  return (
    <ShuttleTrackerContext.Provider
      value={{ location, locationLoading, minutesAway }}
    >
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
 * Get the location object, loading status`
 * @returns {{location, locationLoading}}
 */
export function useMinutesAway() {
  const { minutesAway } = useShuttleTrackerProvider('useMinutesAway');
  return { minutesAway };
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
