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
 * @param {Boolean} setFailingAlert true if the failure alert should show up
 * @returns {JSX.Element}
 */
function saveNotificationsToDatabase(
  vehicleBrokenChecked,
  deviationChecked,
  reducedHoursChecked,
  heavyTrafficChecked,
  setNotificationSuccessAlert,
  setFailingAlert,
  setDisabledLoading
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
      setDisabledLoading(false);

      setTimeout(() => {
        setNotificationSuccessAlert(false);
      }, 2000);
    })
    .catch((error) => {
      setDisabledLoading(false);
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
  // State for showing the alerts for each one of the notifications
  const [alertVehicle, setAlertVehicle] = useState(false);
  const [alertDeviation, setAlertDeviation] = useState(false);
  const [alertReduce, setAlertReduce] = useState(false);
  const [alertTraffic, setAlertTraffic] = useState(false);
  const [alertFail, setFailingAlert] = useState(false);

  // State for disabling the switch buttons during the db connection
  const [vehicleNotificationProcessing, setVehicleNotificationProcessing] =
    useState(false);
  const [deviationNotificationProcessing, setDeviationNotificationProcessing] =
    useState(false);
  const [reduceNotificationProcessing, setReduceNotificationProcessing] =
    useState(false);
  const [trafficNotificationProcessing, setTrafficNotificationProcessing] =
    useState(false);

  const {
    vehicleBrokenChecked,
    deviationChecked,
    reducedHoursChecked,
    heavyTrafficChecked,
  } = useNotifications();

  const onVehicleBrokenChange = () => {
    setVehicleNotificationProcessing(true);

    saveNotificationsToDatabase(
      !vehicleBrokenChecked,
      deviationChecked,
      reducedHoursChecked,
      heavyTrafficChecked,
      setAlertVehicle,
      setFailingAlert,
      setVehicleNotificationProcessing
    );
  };

  const onHeavyTrafficChange = (e) => {
    setTrafficNotificationProcessing(true);

    saveNotificationsToDatabase(
      vehicleBrokenChecked,
      deviationChecked,
      reducedHoursChecked,
      !heavyTrafficChecked,
      setAlertTraffic,
      setFailingAlert,
      setTrafficNotificationProcessing
    );
  };

  const onDetourChange = (e) => {
    setDeviationNotificationProcessing(true);

    saveNotificationsToDatabase(
      vehicleBrokenChecked,
      !deviationChecked,
      reducedHoursChecked,
      heavyTrafficChecked,
      setAlertDeviation,
      setFailingAlert,
      setDeviationNotificationProcessing
    );
  };

  const onReducedHoursChange = (e) => {
    setReduceNotificationProcessing(true);

    saveNotificationsToDatabase(
      vehicleBrokenChecked,
      deviationChecked,
      !reducedHoursChecked,
      heavyTrafficChecked,
      setAlertReduce,
      setFailingAlert,
      setReduceNotificationProcessing
    );
  };

  return (
    <>
      <NotificationsSwitch
        checked={vehicleBrokenChecked}
        onChange={onVehicleBrokenChange}
        disabled={vehicleNotificationProcessing}
        label='Vehicle Broke Down'
      />
      <NotificationsSwitch
        checked={heavyTrafficChecked}
        onChange={onHeavyTrafficChange}
        disabled={trafficNotificationProcessing}
        label='Heavy Traffic'
      />
      <NotificationsSwitch
        checked={deviationChecked}
        onChange={onDetourChange}
        disabled={deviationNotificationProcessing}
        label='Detour'
      />
      <NotificationsSwitch
        checked={reducedHoursChecked}
        onChange={onReducedHoursChange}
        disabled={reduceNotificationProcessing}
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
