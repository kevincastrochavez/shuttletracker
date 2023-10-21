import React from 'react';
import { Select } from '@mantine/core';
import {
  useBusInfo,
  usePreferredStop,
  useSetPreferredStop,
} from './ShuttleTrackerProvider';

function PreferredStop() {
  const { busStopsList } = useBusInfo();
  const { setStopSelected } = useSetPreferredStop();
  const { stopSelected } = usePreferredStop();

  return (
    <Select
      style={{ width: '100%' }}
      size='md'
      label='Select your Preferred Stop'
      description='Shuttle might be closer than you think'
      data={busStopsList}
      placeholder='Pick value'
      onChange={setStopSelected}
      value={stopSelected}
    />
  );
}

export default PreferredStop;
