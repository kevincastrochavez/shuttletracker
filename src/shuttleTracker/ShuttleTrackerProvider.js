import React, { createContext } from 'react';
import { useContext } from 'react';

const ShuttleTrackerContext = createContext({});

/**
 * Providers for the Shuttle Map components
 * @param {Any} children components passed
 * @param {Object} location location object including the coordinates
 * @param {Boolean} locationLoading whether the location data is being fetched or not
 * @param {Number} minutesAway minutes away the bus is from your preferred bus stop
 * @param {Array.String} busStopsList list og bus stops
 * @returns {JSX.Element}
 */

export default function ShuttleTrackerProvider({
  children,
  location,
  locationLoading,
  minutesAway,
  busStopsList,
}) {
  return (
    <ShuttleTrackerContext.Provider
      value={{ location, locationLoading, minutesAway, busStopsList }}
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
 * Provide the minutes away the bus is from your preferred stop
 * @returns {{location, locationLoading}}
 */
export function useMinutesAway() {
  const { minutesAway } = useShuttleTrackerProvider('useMinutesAway');
  return { minutesAway };
}

/**
 * Provide a list of bus stops
 * @returns {{busStopsList}}
 */
export function useBusInfo() {
  const { busStopsList } = useShuttleTrackerProvider('useBusInfo');
  return { busStopsList };
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
