import React from 'react';
import { Space } from '@mantine/core';

/**
 * Small component to let you know how far the bus is from you in minutes
 * @returns {JSX.Element}
 */
function MinutesAway({ nearDirectionsResponse }) {
  const minutesAway =
    nearDirectionsResponse?.routes[0]?.legs[0]?.duration?.text;

  return (
    <>
      <Space h='xl' />
      {nearDirectionsResponse && (
        <>
          {minutesAway ? (
            <p>
              The Shuttle is approx. <b>{minutesAway}</b> away from your
              preferred stop
            </p>
          ) : (
            <p>
              We are having difficulties getting how far the bus is from you
            </p>
          )}
          <Space h='lg' />
        </>
      )}
    </>
  );
}

export default MinutesAway;
