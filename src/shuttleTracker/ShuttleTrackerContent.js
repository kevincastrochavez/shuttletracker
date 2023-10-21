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

/**
 * The main Shuttle Tracker content: stops list, minutes away & map
 * @returns {JSX.Element}
 */

export default function ShuttleTrackerContent() {
  const { locationLoading } = useLocation();

  return (
    <>
      <Container fluid px={24} py={24}>
        <ShuttleTrackerNavBar />
        <Title order={1}>Shuttle Live Tracking</Title>
        <Space h="lg" />
        <Space h="lg" />
        <>
          {locationLoading ? (
            <ShuttleTrackerSkeleton />
          ) : (
            <>
              <PreferredStop />
              <MinutesAway />
              <GoogleMapComponent />
              <ShuttleTrackerDriver />
              <ShuttleTrackerCount />
              <ContactForm />
            </>
          )}
        </>
      </Container>
      <ShuttleTrackerFooter />
    </>
  );
}
