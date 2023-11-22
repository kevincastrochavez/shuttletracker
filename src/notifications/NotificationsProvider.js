import React, { createContext } from 'react';

const NotificationsContext = createContext({});

/**
 * Providers for the Notification components
 * @param {Any} children components passed
 * @param {Boolean} vehicleBrokenChecked true if the vehicle is broken
 * @param {Boolean} deviationChecked true if bus took a deviation
 * @param {Boolean} reducedHoursChecked true if it's a holiday or reduced hours
 * @param {Boolean} heavyTrafficChecked true if there is heavy traffic
 * @returns {JSX.Element}
 */
export default function NotificationsProvider({
  children,
  vehicleBrokenChecked,
  deviationChecked,
  reducedHoursChecked,
  heavyTrafficChecked,
}) {
  console.log('vehicleBrokenChecked', vehicleBrokenChecked);
  console.log('deviationChecked', deviationChecked);
  console.log('reducedHoursChecked', reducedHoursChecked);
  console.log('heavyTrafficChecked', heavyTrafficChecked);
  return (
    <NotificationsContext.Provider
      value={{
        vehicleBrokenChecked,
        deviationChecked,
        reducedHoursChecked,
        heavyTrafficChecked,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
}
