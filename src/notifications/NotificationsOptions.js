import React from 'react';

import { ref, set } from 'firebase/database';

import { db } from '../firebase';
import NotificationsSwitch from './NotificationsSwitch';
import { useNotifications } from './NotificationsProvider';

/**
 * Returns the notification options to switch from the db
 * @returns {JSX.Element}
 */
function NotificationsOptions() {
  const {
    vehicleBrokenChecked,
    deviationChecked,
    reducedHoursChecked,
    heavyTrafficChecked,
  } = useNotifications();

  /**
   * Saves the state of the option notification to the database
   * @param {Boolean} vehicleBrokenChecked true if bus is broken
   * @param {Boolean} deviationChecked true if bus took a deviation
   * @param {Boolean} reducedHoursChecked true if it's a holiday or reduced hours
   * @param {Boolean} heavyTrafficChecked true if there is heavy traffic
   * @returns {JSX.Element}
   */
  function saveNotificationsToDatabase(
    vehicleBrokenChecked,
    deviationChecked,
    reducedHoursChecked,
    heavyTrafficChecked
  ) {
    const notificationsRef = ref(db, 'notifications/');
    const data = {
      brokenDown: vehicleBrokenChecked,
      deviation: deviationChecked,
      reduce: reducedHoursChecked,
      traffic: heavyTrafficChecked,
    };

    set(notificationsRef, data)
      .then(() => {
        console.log('Data saved successfully!');
      })
      .catch((error) => {
        console.log('The write failed...');
      });
  }

  const onVehicleBrokenChange = () => {
    saveNotificationsToDatabase(
      !vehicleBrokenChecked,
      deviationChecked,
      reducedHoursChecked,
      heavyTrafficChecked
    );
  };

  const onHeavyTrafficChange = (e) => {
    saveNotificationsToDatabase(
      vehicleBrokenChecked,
      deviationChecked,
      reducedHoursChecked,
      !heavyTrafficChecked
    );
  };

  const onDetourChange = (e) => {
    saveNotificationsToDatabase(
      vehicleBrokenChecked,
      !deviationChecked,
      reducedHoursChecked,
      heavyTrafficChecked
    );
  };

  const onReducedHoursChange = (e) => {
    saveNotificationsToDatabase(
      vehicleBrokenChecked,
      deviationChecked,
      !reducedHoursChecked,
      heavyTrafficChecked
    );
  };

  return (
    <>
      <NotificationsSwitch
        checked={vehicleBrokenChecked}
        onChange={onVehicleBrokenChange}
        label='Vehicle Broke Down'
      />
      <NotificationsSwitch
        checked={heavyTrafficChecked}
        onChange={onHeavyTrafficChange}
        label='Heavy Traffic'
      />
      <NotificationsSwitch
        checked={deviationChecked}
        onChange={onDetourChange}
        label='Detour'
      />
      <NotificationsSwitch
        checked={reducedHoursChecked}
        onChange={onReducedHoursChange}
        label='Reduced Service Hours'
      />
    </>
  );
}

export default NotificationsOptions;
