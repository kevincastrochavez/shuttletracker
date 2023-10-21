import React, { useEffect, useState } from 'react';
import { onValue, ref } from 'firebase/database';

import ShuttleTrackerProvider from './ShuttleTrackerProvider';
import { db } from '../firebase';

/**
 * Logic for deciding whether to display loading skeleton, error message, or data, and fetch and load data
 * @returns {JSX.Element}
 */

export default function ShuttleTrackerLoader({ children }) {
  const [location, setLocation] = useState({});
  const [locationLoading, setLocationLoading] = useState(true);

  const locationsRef = ref(db, 'locations/');
  useEffect(() => {
    onValue(locationsRef, (snapshot) => {
      const data = snapshot.val();
      setLocation(data);
      setLocationLoading(false);
    });
  }, [setLocation]);

  return (
    <ShuttleTrackerProvider
      location={location}
      locationLoading={locationLoading}
    >
      {children}
    </ShuttleTrackerProvider>
  );
}
