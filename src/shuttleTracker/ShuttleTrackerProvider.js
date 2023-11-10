import React, { createContext, useMemo, useState } from 'react';
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
 * @param {String} carType type of car currently driving
 * @param {Array} passengerCount list of dates that contain the passengers who got on and off
 * @param {Object} notifications list of notifications for alerts
 * @returns {JSX.Element}
 */

export default function ShuttleTrackerProvider({
  children,
  location,
  locationLoading,
  minutesAway,
  busStopsList,
  carType,
  passengerCount,
  notifications,
}) {
  const [value] = useStorage('preferredBusStop', 'BYU-I Hart');
  const [stopSelected, setStopSelected] = useState(() => value);
  const { busType } = carType;
  // TODO: Use this when database is updated with stops
  // const dayDate = new Date().getDate();
  // const monthDate = new Date().getMonth() + 1;
  // const yearDate = new Date().getFullYear();
  // const formattedTodaysDate = `${monthDate}-${dayDate}-${yearDate}`;
  const formattedTodaysDate = '10-21-2023';

  const lastBusStop = getLastStop(formattedTodaysDate, passengerCount);

  const isBus = busType === 'Bus';
  const busSeats = 42;
  const vanSeats = 15;
  const totalSeats = isBus ? busSeats : vanSeats;
  let seatsAvailable = totalSeats;

  const stopsCountObjPerDay = passengerCount?.[formattedTodaysDate];
  stopsCountObjPerDay !== undefined &&
    Object.values(stopsCountObjPerDay)
      .map((stopObj) => {
        return {
          passengersOff: stopObj.passengerOff,
          passengersOn: stopObj.passengerOn,
        };
      })
      .forEach((stop) => {
        if (Number(stop?.passengersOn) > 0) {
          seatsAvailable -= Number(stop.passengersOn);
        }

        if (Number(stop?.passengersOff) > 0) {
          seatsAvailable += Number(stop.passengersOff);
        }
      });

  const busLocation = useMemo(() => {
    const latitude = location?.location?.latitude;
    const longitude = location?.location?.longitude;

    return {
      lat: latitude,
      lng: longitude,
    };
  }, [location?.location?.latitude, location?.location?.longitude]);

  return (
    <ShuttleTrackerUpdateContext.Provider value={{ setStopSelected }}>
      <ShuttleTrackerContext.Provider
        value={{
          location,
          locationLoading,
          minutesAway,
          busStopsList,
          stopSelected,
          busLocation,
          carType,
          seatsAvailable,
          totalSeats,
          notifications,
          lastBusStop,
        }}
      >
        {children}
      </ShuttleTrackerContext.Provider>
    </ShuttleTrackerUpdateContext.Provider>
  );
}

/**
 * Provides a list of bus stops, bus location, available seats, total seats and last bus stop the shuttle was at
 * @returns {{busStopsList, busLocation, seatsAvailable, lastBusStop}}
 */
export function useBusInfo() {
  const { busStopsList, busLocation, seatsAvailable, totalSeats, lastBusStop } =
    useShuttleTrackerProvider('useBusInfo');
  return { busStopsList, busLocation, seatsAvailable, totalSeats, lastBusStop };
}

/**
 * Indicates which car is being driven, either the van or the bus
 * @returns {{carType}}
 */
export function useCarType() {
  const { carType } = useShuttleTrackerProvider('useCarType');
  return { carType };
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
 * Returns the notifications object
 * @returns {{notifications}}
 */
export function useNotifications() {
  const { notifications } = useShuttleTrackerProvider('useNotifications');
  return { notifications };
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

/* PRIVATE FUNCTIONS */

/**
 * Returns the last bus stop the shuttle stopped at
 * @param {string} todaysDate - today's date
 * @param {object} passengerCountObj - object containing passenger count information, including stops
 * @returns {string} last bus stop
 */
function getLastStop(todaysDate, passengerCountObj) {
  const todaysInfo = passengerCountObj[todaysDate];
  const todaysInfoList = todaysInfo && Object.values(todaysInfo);
  const lastStop =
    todaysInfoList?.length > 0 &&
    todaysInfoList[todaysInfoList.length - 1]?.selectedPlace;

  return lastStop;
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
