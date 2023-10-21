import React, { useEffect } from 'react';
import { onValue, ref } from 'firebase/database';

import { useLocation, useSetLocation } from './ShuttleTrackerProvider';
import { db } from '../firebase';

/**
 * The main Shuttle Tracker content: stops list, minutes away & map
 * @returns {JSX.Element}
 */

export default function ShuttleTrackerContent() {
  const { location } = useLocation();
  const { setLocation } = useSetLocation();

  console.log(location);

  const locationsRef = ref(db, 'locations/');
  useEffect(() => {
    onValue(locationsRef, (snapshot) => {
      const data = snapshot.val();
      setLocation(data);
    });
  }, [setLocation]);

  return <div>ShuttleTrackerContent</div>;
}
