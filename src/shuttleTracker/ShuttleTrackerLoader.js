import React, { useEffect, useState } from 'react';
import { onValue, ref } from 'firebase/database';

import ShuttleTrackerProvider from './ShuttleTrackerProvider';
import { db } from '../firebase';

/**
 * Logic for deciding whether to display loading skeleton, error message, or data, and fetch and load data
 * @returns {JSX.Element}
 */

export default function ShuttleTrackerLoader({ children }) {
  const busStopsList = [
    'Walmart',
    'East MC Circle',
    'Aspen Village',
    'Center Square',
    'The Gates',
    'Camden Apartments',
    'Colonial House',
    'BYU-I Hart',
    'BYU-I Parking Lot',
    'Rexburg Floral',
  ];

  const [location, setLocation] = useState({});
  const [locationLoading, setLocationLoading] = useState(true);
  const [minutesAway, setMinutesAway] = useState(0);

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
      minutesAway={minutesAway}
      busStopsList={busStopsList}
    >
      {children}
    </ShuttleTrackerProvider>
  );
}
