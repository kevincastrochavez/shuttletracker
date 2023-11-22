import React, { useEffect, useState } from 'react';

import { onValue, ref } from 'firebase/database';

import NotificationsProvider from './NotificationsProvider';
import { db } from '../firebase';

/**
 * Logic for deciding whether to display loading skeleton, error message, or data, and fetch and load data
 * @returns {JSX.Element}
 */
function NotificationsLoader({ children }) {
  const [vehicleBrokenChecked, setVehicleBrokenChecked] = useState(false);
  const [deviationChecked, setDeviationChecked] = useState(false);
  const [reducedHoursChecked, setReducedHoursChecked] = useState(false);
  const [heavyTrafficChecked, setHeavyTrafficChecked] = useState(false);

  const notificationsRef = ref(db, 'notifications/');

  useEffect(() => {
    onValue(notificationsRef, (snapshot) => {
      const data = snapshot.val();
      setVehicleBrokenChecked(data?.brokenDown);
      setDeviationChecked(data?.deviation);
      setReducedHoursChecked(data?.reduce);
      setHeavyTrafficChecked(data?.traffic);
    });
  }, [notificationsRef]);

  return (
    <NotificationsProvider
      vehicleBrokenChecked={vehicleBrokenChecked}
      deviationChecked={deviationChecked}
      reducedHoursChecked={reducedHoursChecked}
      heavyTrafficChecked={heavyTrafficChecked}
    >
      {children}
    </NotificationsProvider>
  );
}

export default NotificationsLoader;
