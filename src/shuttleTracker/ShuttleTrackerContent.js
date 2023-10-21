
import React from "react";
import { Container, Space, Title } from "@mantine/core";

import { useLocation } from "./ShuttleTrackerProvider";
import ShuttleTrackerSkeleton from "./ShuttleTrackerSkeleton";
import MinutesAway from "./MinutesAway";
import PreferredStop from "./PreferredStop";
import GoogleMapComponent from "./GoogleMapComponent";
import ShuttleTrackerNavBar from "./ShuttleTrackerNavbar";
import ShuttleTrackerFooter from "./ShuttleTrackerFooter";
import ShuttleTrackerDriver from "./ShuttleTrackerDriver";
import ShuttleTrackerCount from "./ShuttleTrackerCount";
import ContactForm from "./ContactForm";
import { useViewportSize } from '@mantine/hooks';


/**
 * The main Shuttle Tracker content: stops list, minutes away & map
 * @returns {JSX.Element}
 */

export default function ShuttleTrackerContent() {
  const { width } = useViewportSize();
  const { locationLoading } = useLocation();
  const {
    notifications: { brokenDown, deviation, reduce, traffic },
  } = useNotifications();

  return (
    <>
      <Container fluid px={24} py={24} maw={1200}>
        <ShuttleTrackerNavBar />
        <Title order={1}>Shuttle Live Tracking</Title>
        <Space h="lg" />
        <Space h="lg" />
        <>
          {brokenDown ? (
            <Alert variant='filled' color='red' title='Alert title'>
              The Shuttle Tracker is currently down. Please try again later
            </Alert>
          ) : (
            <>
              {locationLoading && !brokenDown ? (
                <ShuttleTrackerSkeleton />
              ) : (
                <>
                  {traffic && (
                    <Alert
                      variant='outline'
                      color='yellow'
                      title='Alert title'
                      mb={20}
                    >
                      Heavy traffic. Times may be slower
                    </Alert>
                  )}
                  {reduce && (
                    <Alert
                      variant='outline'
                      color='blue'
                      title='Alert title'
                      mb={20}
                    >
                      Reduced Hours - Call for more information
                    </Alert>
                  )}
                  {deviation && (
                    <Alert
                      variant='outline'
                      color='orange'
                      title='Alert title'
                      mb={20}
                    >
                      Bus might need to take a detour
                    </Alert>
                  )}
                  <PreferredStop />
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
