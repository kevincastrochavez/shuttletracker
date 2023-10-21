import React from 'react';

import classes from './ShuttleTrackerCount.module.css';
import bus from './images/bus.svg';

/**
 * Component to display how many available seats there are on the van or bus
 * @returns {JSX.Element}
 */
function ShuttleTrackerCount() {
  return (
    <div className={classes.countContainer}>
      <h2>BUS</h2>
      <img src={bus} alt='' />
      <p>There are currently 42 out of 45 seats available.</p>
      <div></div>
    </div>
  );
}

export default ShuttleTrackerCount;
