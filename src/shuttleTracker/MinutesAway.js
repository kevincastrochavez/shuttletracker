import React from 'react';
import { Space } from '@mantine/core';

import { useMinutesAway, usePreferredStop } from './ShuttleTrackerProvider';
import busStopsObj from './busStopsList';

/**
 * Small component to let you know how far the bus is from you in minutes
 * @returns {JSX.Element}
 */
function MinutesAway() {
  const { minutesAway } = useMinutesAway();
  const { stopSelected } = usePreferredStop();
  const {
    location: { lat, lng },
  } = busStopsObj.find((stop) => Object.keys(stop)[0] === stopSelected)[
    stopSelected
  ];

  return (
    <>
      <Space h='xl' />
      <p>
        The Shuttle is {minutesAway} {minutesAway !== 1 ? 'minutes' : 'minute'}{' '}
        away from you
      </p>
    </>
  );
}

export default MinutesAway;
