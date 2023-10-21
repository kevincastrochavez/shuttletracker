import React from 'react';

import classes from './ShuttleTrackerCount.module.css';
import bus from './images/bus.svg';
import { useBusInfo, useCarType } from './ShuttleTrackerProvider';

/**
 * Component to display how many available seats there are on the van or bus
 * @returns {JSX.Element}
 */
function ShuttleTrackerCount() {
  const { totalSeats, seatsAvailable } = useBusInfo();

  const {
    carType: { busType },
  } = useCarType();

  return (
    <div className={classes.countContainer}>
      <h2>{busType === 'bus' ? 'BUS' : 'VAN'}</h2>
      <img src={bus} alt='' />
      <p>
        There are currently <b>{seatsAvailable}</b> out of <b>{totalSeats}</b>{' '}
        seats available.
      </p>
      <div></div>
    </div>
  );
}

export default ShuttleTrackerCount;
