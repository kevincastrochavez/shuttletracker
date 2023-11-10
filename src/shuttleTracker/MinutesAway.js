import React from 'react';
import classes from './MinutesAway.module.css';

/**
 * Small component to let you know how far the bus is from you in minutes
 * @returns {JSX.Element}
 */
function MinutesAway({ minutesAway }) {
  return (
    <>
      {minutesAway ? (
        <p className={classes.minutesAwayP}>
          The shuttle is approx.{' '}
          <b className={classes.minutesAwayB}>
            {minutesAway} {minutesAway === 1 ? 'minute' : 'minutes'}
          </b>{' '}
          away from you
        </p>
      ) : (
        <p>We are having difficulties getting how far the bus is from you</p>
      )}
    </>
  );
}

export default MinutesAway;
