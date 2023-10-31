import React from 'react';
import { Alert, Container, Skeleton, Space, Title } from '@mantine/core';

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
  // const { locationLoading } = useLocation();
  const {
    notifications: { brokenDown, deviation, reduce, traffic },
  } = useNotifications();
  const locationLoading = true;

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
              )}
            </>
          )}
        </>
      </div>
      <ShuttleTrackerFooter />
    </div>
  );
}
