import React from 'react';
import { Space } from '@mantine/core';
import { useMinutesAway } from './ShuttleTrackerProvider';

function MinutesAway() {
  const { minutesAway } = useMinutesAway();

  return (
    <>
      <Space h='lg' />
      <Space h='xs' />
      <p>
        The Shuttle is {minutesAway} {minutesAway !== 1 ? 'minutes' : 'minute'}{' '}
        away from you
      </p>
    </>
  );
}

export default MinutesAway;
