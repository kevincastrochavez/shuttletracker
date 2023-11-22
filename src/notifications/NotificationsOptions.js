import React, { useState } from 'react';

import { ref, set } from 'firebase/database';

import { db } from '../firebase';
import NotificationsSwitch from './NotificationsSwitch';
import { useNotifications } from './NotificationsProvider';
import NotificationsAlert from './NotificationsAlert';

/**
 * Saves the state of the option notification to the database
 * @param {Boolean} vehicleBrokenChecked true if bus is broken
 * @param {Boolean} deviationChecked true if bus took a deviation
 * @param {Boolean} reducedHoursChecked true if it's a holiday or reduced hours
 * @param {Boolean} heavyTrafficChecked true if there is heavy traffic
 * @param {Boolean} setNotificationAlert true if the alert should show up
 * @returns {JSX.Element}
 */
function saveNotificationsToDatabase(
  vehicleBrokenChecked,
  deviationChecked,
  reducedHoursChecked,
  heavyTrafficChecked,
  setNotificationAlert
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
      setNotificationAlert(true);

      setTimeout(() => {
        setNotificationAlert(false);
      }, 2000);
    })
    .catch((error) => {
      console.log('The write failed...');
    });
}

/**
 * Returns the notification options to switch from the db
 * @returns {JSX.Element}
 */
function NotificationsOptions() {
  const [alertVehicle, setAlertVehicle] = useState(false);
  const [alertDeviation, setAlertDeviation] = useState(false);
  const [alertReduce, setAlertReduce] = useState(false);
  const [alertTraffic, setAlertTraffic] = useState(false);

  const {
    vehicleBrokenChecked,
    deviationChecked,
    reducedHoursChecked,
    heavyTrafficChecked,
  } = useNotifications();

  const onVehicleBrokenChange = () => {
    saveNotificationsToDatabase(
      !vehicleBrokenChecked,
      deviationChecked,
      reducedHoursChecked,
      heavyTrafficChecked,
      setAlertVehicle
    );
  };

  const onHeavyTrafficChange = (e) => {
    saveNotificationsToDatabase(
      vehicleBrokenChecked,
      deviationChecked,
      reducedHoursChecked,
      !heavyTrafficChecked,
      setAlertTraffic
    );
  };

  const onDetourChange = (e) => {
    saveNotificationsToDatabase(
      vehicleBrokenChecked,
      !deviationChecked,
      reducedHoursChecked,
      heavyTrafficChecked,
      setAlertDeviation
    );
  };

  const onReducedHoursChange = (e) => {
    saveNotificationsToDatabase(
      vehicleBrokenChecked,
      deviationChecked,
      !reducedHoursChecked,
      heavyTrafficChecked,
      setAlertReduce
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
      {alertVehicle && (
        <NotificationsAlert
          color='teal'
          title='Vehicle Broken Down'
          message={`This notification was turned ${
            vehicleBrokenChecked ? 'ON' : 'OFF'
          } successfully`}
          setAlertVehicle
        />
      )}
      {alertDeviation && (
        <NotificationsAlert
          color='teal'
          title='Detour'
          message={`This notification was turned ${
            deviationChecked ? 'ON' : 'OFF'
          } successfully`}
          setAlertDeviation
        />
      )}
      {alertReduce && (
        <NotificationsAlert
          color='teal'
          title='Reduced Hours'
          message={`This notification was turned ${
            reducedHoursChecked ? 'ON' : 'OFF'
          } successfully`}
          setAlertReduce
        />
      )}
      {alertTraffic && (
        <NotificationsAlert
          color='teal'
          title='Heavy Traffic'
          message={`This notification was turned ${
            heavyTrafficChecked ? 'ON' : 'OFF'
          } successfully`}
          setAlertTraffic
        />
      )}
    </>
  );
}

export default NotificationsOptions;
