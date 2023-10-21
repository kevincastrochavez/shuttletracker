import React from 'react';
import { Avatar } from '@mantine/core';

import { useLocation } from './ShuttleTrackerProvider';
import classes from './ShuttleTrackerDriver.module.css';

function ShuttleTrackerDriver() {
  const {
    location: {
      userInfo: { name: driverName, url: driverPicture },
    },
  } = useLocation();

  return (
    <div className={classes.driverContainer}>
      <Avatar src={driverPicture} w={80} h={80} />
      <div className={classes.driverInfo}>
        <h2>{driverName}</h2>
        <p>Your current driver</p>
      </div>
    </div>
  );
}

export default ShuttleTrackerDriver;
