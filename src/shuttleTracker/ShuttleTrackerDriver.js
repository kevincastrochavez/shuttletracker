import React from 'react';
import { Avatar } from '@mantine/core';

import { useLocation } from './ShuttleTrackerProvider';
import classes from './ShuttleTrackerDriver.module.css';
import { useViewportSize } from '@mantine/hooks';

function ShuttleTrackerDriver() {
  const { width } = useViewportSize();
  const {
    location: {
      userInfo: { name: driverName, url: driverPicture },
    },
  } = useLocation();

  return (
    <div
      className={
        width < 990 ? classes.driverContainer : classes.driverContainerLarge
      }
    >
      <Avatar src={driverPicture} w={80} h={80} />
      <div className={classes.driverInfo}>
        <h2>{driverName}</h2>
        <p>Your current driver</p>
      </div>
    </div>
  );
}

export default ShuttleTrackerDriver;
