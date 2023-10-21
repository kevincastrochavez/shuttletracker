import React from 'react';
import { Select } from '@mantine/core';
import { useBusInfo } from './ShuttleTrackerProvider';

function PreferredStop() {
  const { busStopsList } = useBusInfo();

  return (
    <Select
      style={{ width: '100%' }}
      size='md'
      label='Select your Preferred Stop'
      description='Shuttle might be closer than you think'
      data={busStopsList}
      placeholder='Pick value'
    />
  );
}

export default PreferredStop;
