import React from 'react';
import { Container, Space, Title } from '@mantine/core';

import { useLocation } from './ShuttleTrackerProvider';
import ShuttleTrackerSkeleton from './ShuttleTrackerSkeleton';
import MinutesAway from './MinutesAway';
import PreferredStop from './PreferredStop';
import GoogleMapComponent from './GoogleMapComponent';
import ShuttleTrackerFooter from './ShuttleTrackerFooter';
import ShuttleTrackerDriver from './ShuttleTrackerDriver';

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
      <>
        {locationLoading ? (
          <ShuttleTrackerSkeleton />
        ) : (
          <>
            {/* <PreferredStop /> */}
            {/* <MinutesAway /> */}
            <Space h='xl' />
            <GoogleMapComponent />
            <ShuttleTrackerDriver />
          </>
        )}
      </>
      <ShuttleTrackerFooter />
    </Container>
  );
}
