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
 * @param {Boolean} setNotificationSuccessAlert true if the success alert should show up
 * @returns {JSX.Element}
 */
function saveNotificationsToDatabase(
  vehicleBrokenChecked,
  deviationChecked,
  reducedHoursChecked,
  heavyTrafficChecked,
  setNotificationSuccessAlert,
  setFailingAlert
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
      setNotificationSuccessAlert(true);

      setTimeout(() => {
        setNotificationSuccessAlert(false);
      }, 2000);
    })
    .catch((error) => {
      setFailingAlert(true);

      setTimeout(() => {
        setFailingAlert(false);
      }, 2000);
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
  const [alertFail, setFailingAlert] = useState(false);

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
      setAlertVehicle,
      setFailingAlert
    );
  };

  const onHeavyTrafficChange = (e) => {
    saveNotificationsToDatabase(
      vehicleBrokenChecked,
      deviationChecked,
      reducedHoursChecked,
      !heavyTrafficChecked,
      setAlertTraffic,
      setFailingAlert
    );
  };

  const onDetourChange = (e) => {
    saveNotificationsToDatabase(
      vehicleBrokenChecked,
      !deviationChecked,
      reducedHoursChecked,
      heavyTrafficChecked,
      setAlertDeviation,
      setFailingAlert
    );
  };

  const onReducedHoursChange = (e) => {
    saveNotificationsToDatabase(
      vehicleBrokenChecked,
      deviationChecked,
      !reducedHoursChecked,
      heavyTrafficChecked,
      setAlertReduce,
      setFailingAlert
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
        />
      )}
      {alertDeviation && (
        <NotificationsAlert
          color='teal'
          title='Detour'
          message={`This notification was turned ${
            deviationChecked ? 'ON' : 'OFF'
          } successfully`}
        />
      )}
      {alertReduce && (
        <NotificationsAlert
          color='teal'
          title='Reduced Hours'
          message={`This notification was turned ${
            reducedHoursChecked ? 'ON' : 'OFF'
          } successfully`}
        />
      )}
      {alertTraffic && (
        <NotificationsAlert
          color='teal'
          title='Heavy Traffic'
          message={`This notification was turned ${
            heavyTrafficChecked ? 'ON' : 'OFF'
          } successfully`}
        />
      )}
      {alertFail && (
        <NotificationsAlert
          color='red'
          title='Something went wrong'
          message='Please try again later'
        />
      )}
    </>
  );
}

export default NotificationsOptions;
