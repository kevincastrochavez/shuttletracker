import React, { createContext, useState } from 'react';
import { useContext } from 'react';

import { useStorage } from './utils';

const ShuttleTrackerContext = createContext({});
const ShuttleTrackerUpdateContext = createContext({});

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
  const [value] = useStorage('preferredBusStop', 'BYU-I Hart');
  const [stopSelected, setStopSelected] = useState(() => value);

  return (
    <ShuttleTrackerUpdateContext.Provider value={{ setStopSelected }}>
      <ShuttleTrackerContext.Provider
        value={{
          location,
          locationLoading,
          minutesAway,
          busStopsList,
          stopSelected,
        }}
      >
        {children}
      </ShuttleTrackerContext.Provider>
    </ShuttleTrackerUpdateContext.Provider>
  );
}

/**
 * Provides a list of bus stops, your preferred bus stop
 * @returns {{busStopsList}}
 */
export function useBusInfo() {
  const { busStopsList } = useShuttleTrackerProvider('useBusInfo');
  return { busStopsList };
}

/**
 * Gets the location object, loading status`
 * @returns {{location, locationLoading}}
 */
export function useLocation() {
  const { location, locationLoading } =
    useShuttleTrackerProvider('useLocation');
  return { location, locationLoading };
}

/**
 * Provides the minutes away the bus is from your preferred stop
 * @returns {{location, locationLoading}}
 */
export function useMinutesAway() {
  const { minutesAway } = useShuttleTrackerProvider('useMinutesAway');
  return { minutesAway };
}

/**
 * Provides your preferred bus stop
 * @returns {{stopSelected}}
 */
export function usePreferredStop() {
  const { stopSelected } = useShuttleTrackerProvider('usePreferredStop');
  return { stopSelected };
}

/**
 * Sets your preferred bus stop
 * @returns {{setStopSelected}}
 */
export function useSetPreferredStop() {
  const { setStopSelected } = useSetShuttleTrackerProvider(
    'useSetPreferredStop'
  );
  return { setStopSelected };
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
 * Enables making changes to the ShuttleMapContext (using the ShuttleMapUpdateContext)
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
