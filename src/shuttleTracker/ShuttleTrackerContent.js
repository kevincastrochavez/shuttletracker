import React from 'react';
import { Container, Space, Title, Alert } from '@mantine/core';

import { useLocation, useNotifications } from './ShuttleTrackerProvider';
import ShuttleTrackerSkeleton from './ShuttleTrackerSkeleton';
import MinutesAway from './MinutesAway';
import PreferredStop from './PreferredStop';
import GoogleMapComponent from './GoogleMapComponent';
import ShuttleTrackerFooter from './ShuttleTrackerFooter';
import ShuttleTrackerDriver from './ShuttleTrackerDriver';
import ShuttleTrackerCount from './ShuttleTrackerCount';
import ContactForm from './ContactForm';
import { useViewportSize } from '@mantine/hooks';

/**
 * The main Shuttle Tracker content: stops list, minutes away & map
 * @returns {JSX.Element}
 */

export default function ShuttleTrackerContent() {
  const { width } = useViewportSize();
  const { locationLoading } = useLocation();
  const {
    notifications: { deviation, reduce, traffic },
  } = useNotifications();

  // console.log(brokenDown);
  // console.log(deviation);
  // console.log(reduce);
  // console.log(traffic);

  const brokenDown = true;

  return (
    <>
      <Container fluid px={24} py={24} maw={1200}>
        <Title order={1} align={width > 1200 && 'center'}>
          Shuttle Live Tracking
        </Title>
        <Space h='lg' />
        <Space h='lg' />
        <>
          {brokenDown ? (
            <Alert variant='light' color='red' title='Alert title'>
              The Shuttle Tracker is currently down. Please try again later
            </Alert>
          ) : (
            <>
              {locationLoading && !brokenDown ? (
                <ShuttleTrackerSkeleton />
              ) : (
                <>
                  <PreferredStop />
                  {/* <MinutesAway /> */}
                  <GoogleMapComponent />
                  <ShuttleTrackerDriver />
                  <ShuttleTrackerCount />
                  <ContactForm />
                </>
              )}
            </>
          )}
        </>
      </Container>
      <ShuttleTrackerFooter />
    </>
  );
}
