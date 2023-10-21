import React, { useEffect, useState } from 'react';
import { onValue, ref } from 'firebase/database';

import ShuttleTrackerProvider from './ShuttleTrackerProvider';
import { db } from '../firebase';

/**
 * Logic for deciding whether to display loading skeleton, error message, or data
 * @returns {JSX.Element}
 */

export default function ShuttleTrackerLoader({ children }) {
  const [location, setLocation] = useState({});

  const locationsRef = ref(db, 'locations/');
  useEffect(() => {
    onValue(locationsRef, (snapshot) => {
      const data = snapshot.val();
      setLocation(data);
    });
  }, [setLocation]);

  return (
    <ShuttleTrackerProvider location={location}>
      {children}
    </ShuttleTrackerProvider>
  );
}
