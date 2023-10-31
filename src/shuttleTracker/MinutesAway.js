import React from 'react';
import classes from './MinutesAway.module.css';

/**
 * Small component to let you know how far the bus is from you in minutes
 * @returns {JSX.Element}
 */
function MinutesAway({ nearDirectionsResponse }) {
  const minutesAway =
    nearDirectionsResponse?.routes[0]?.legs[0]?.duration?.text;

  return (
    <>
      {nearDirectionsResponse && (
        <>
          {minutesAway ? (
            <p className={classes.minutesAwayP}>
              The shuttle is approx.{' '}
              <b className={classes.minutesAwayB}>{minutesAway}</b> away from
              you
            </p>
          ) : (
            <p>
              We are having difficulties getting how far the bus is from you
            </p>
          )}
        </>
      )}
    </>
  );
}

export default MinutesAway;
