import React from 'react';
import { Alert, Container, Skeleton, Space, Title } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';
import {
  IconClockHour5,
  IconTrafficLights,
  IconArrowBearRight2,
} from '@tabler/icons-react';

import { useLocation, useNotifications } from './ShuttleTrackerProvider';
import ShuttleTrackerSkeleton from './ShuttleTrackerSkeleton';
import PreferredStop from './PreferredStop';
import GoogleMapComponent from './GoogleMapComponent';
import ShuttleTrackerNavBar from './ShuttleTrackerNavbar';
import ShuttleTrackerFooter from './ShuttleTrackerFooter';
import ShuttleTrackerDriver from './ShuttleTrackerDriver';
import ShuttleTrackerCount from './ShuttleTrackerCount';
import ContactForm from './ContactForm';
// import logo from "./images/logo.png";

import classes from './ShuttleTrackerContent.module.css';

/**
 * The main Shuttle Tracker content: stops list, minutes away & map
 * @returns {JSX.Element}
 */

export default function ShuttleTrackerContent() {
  const { width } = useViewportSize();
  const {
    locationLoading,
    location: { isDriving },
  } = useLocation();
  const {
    notifications: { brokenDown, deviation, reduce, traffic },
  } = useNotifications();

  const iconClock = <IconClockHour5 />;
  const iconTraffic = <IconTrafficLights />;
  const iconDetour = <IconArrowBearRight2 />;

  return (
    <div className={classes.NavBarPageWraperFooter}>
      <ShuttleTrackerNavBar />
      <div className={classes.contentPageWrapper}>
        <div className={classes.contentSpace}></div>
        <div className={classes.titleContainer}>
          {locationLoading ? (
            <Skeleton height={40} mt={6} radius='xl' width={'80%'} />
          ) : (
            'SHUTTLE LIVE TRACKING'
          )}
        </div>

        {brokenDown && (
          <Alert
            variant='filled'
            color='red'
            title='What a Bummer!'
            mx={width < 750 ? 24 : 30}
            mt={60}
            mb={30}
            // icon={}
          >
            The Walmart Shuttle is currently broken. Check the site again in a
            few minutes
          </Alert>
        )}
        {!brokenDown &&
          (locationLoading ? (
            <ShuttleTrackerSkeleton />
          ) : (
            <>
              {traffic && (
                <Alert
                  variant='outline'
                  color='yellow'
                  title='Traffic!'
                  mb={20}
                  mx={width < 750 ? 24 : 30}
                  icon={iconTraffic}
                >
                  Heavy traffic present. Waiting times may be longer
                </Alert>
              )}
              {reduce && (
                <Alert
                  variant='outline'
                  color='yellow'
                  title='Holiday hours!'
                  mb={20}
                  mx={width < 750 ? 24 : 30}
                  icon={iconClock}
                >
                  Limited schedule, plan ahead - Call for more information
                </Alert>
              )}
              {deviation && (
                <Alert
                  variant='outline'
                  color='yellow'
                  title='Taking detour!'
                  mb={20}
                  mx={width < 750 ? 24 : 30}
                  icon={iconDetour}
                >
                  Bus might need to take a detour. Check map for live tracking
                </Alert>
              )}
              <PreferredStop
                className={classes.contentPreferredStop}
                id='preferredStop'
              />
              <GoogleMapComponent
                className={classes.contentMap}
                id='googleMapComponent'
              />
              <ShuttleTrackerCount id='shuttleTrackerCount' />
              <ShuttleTrackerDriver id='shuttleTrackerDriver' />
              <ContactForm id='contactForm' />
            </>
          ))}
      </div>
      <ShuttleTrackerFooter />
    </div>
  );
}
