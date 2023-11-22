import React, { createContext, useContext } from 'react';

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

/**
 * Returns whether the notifications are turned on or not
 * @returns {{vehicleBrokenChecked, deviationChecked, reducedHoursChecked, heavyTrafficChecked}}
 */
export function useNotifications() {
  const {
    vehicleBrokenChecked,
    deviationChecked,
    reducedHoursChecked,
    heavyTrafficChecked,
  } = useNotificationsProvider('useNotifications');
  return {
    vehicleBrokenChecked,
    deviationChecked,
    reducedHoursChecked,
    heavyTrafficChecked,
  };
}

/* PRIVATE FUNCTIONS */

/**
 * Enables making changes to the ShuttleMapContext (using the ShuttleMapUpdateContext)
 * @param {string} functionName - just for using in error reporting
 * @returns {{}}
 */
function useNotificationsProvider(functionName) {
  const data = useContext(NotificationsContext);
  if (!data)
    throw new Error(
      `${functionName} must be used within a component wrapped by NotificationsProvider`
    );
  return data;
}
