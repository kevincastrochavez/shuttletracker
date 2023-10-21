import React from 'react';
import { Container, Select, Space, Title } from '@mantine/core';

import { useLocation } from './ShuttleTrackerProvider';
import ShuttleTrackerSkeleton from './ShuttleTrackerSkeleton';
import MinutesAway from './MinutesAway';

/**
 * The main Shuttle Tracker content: stops list, minutes away & map
 * @returns {JSX.Element}
 */

export default function ShuttleTrackerContent() {
  const { locationLoading } = useLocation();

  return (
    <Container fluid px={24} py={24}>
      <Title order={1}>Shuttle Live Tracking</Title>
      <Space h='lg' />
      <Space h='lg' />
      <Space h='lg' />
      <>
        {locationLoading ? (
          <ShuttleTrackerSkeleton />
        ) : (
          <>
            <Select
              style={{ width: '100%' }}
              size='md'
              label='Select your Preferred Stop'
              description='Shuttle might be closer than you think'
              data={['React', 'Angular', 'Vue']}
              placeholder='Pick value'
            />
            <MinutesAway />
          </>
        )}
      </>
    </Container>
  );
}
