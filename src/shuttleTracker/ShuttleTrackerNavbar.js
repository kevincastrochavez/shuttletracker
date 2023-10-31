import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from './images/logo.png';

import classes from './ShuttleTrackerNavbar.module.css';
import { useLocation, useNotifications } from './ShuttleTrackerProvider';

function Footer() {
  const {
    notifications: { brokenDown },
  } = useNotifications();
  const {
    location: { isDriving },
  } = useLocation();
  const scrollPositionRef = useRef(0);
  const scrollToPosition = () => {
    window.scrollTo({
      top: scrollPositionRef.current,
      behavior: 'smooth',
    });
  };

  return (
    <div className={classes.navBarContainer}>
      <div className={classes.navBarInfoBox}>
        <div className={classes.navBarInfoBoxSingle}>
          <Link
            to='/'
            className={classes.navBarLogo}
            onClick={() => {
              scrollPositionRef.current = 0; // Set the desired scroll position in pixels
              scrollToPosition();
            }}
          >
            <img src={logo} alt='shuttle tracker logo' />
          </Link>
        </div>

        <div
          className={`${classes.navBarInfoBoxSingleLinks} ${
            (!isDriving || brokenDown) && classes.navBarInfoBoxSingleContact
          }`}
        >
          {isDriving && !brokenDown && (
            <>
              <Link
                to={'/'}
                className={classes.navBarInfoBoxSingleLink}
                onClick={() => {
                  scrollPositionRef.current = 0; // Set the desired scroll position in pixels
                  scrollToPosition();
                }}
              >
                YOUR STOP
              </Link>
              <Link
                to={'/'}
                className={classes.navBarInfoBoxSingleLink}
                onClick={() => {
                  scrollPositionRef.current = 280; // Set the desired scroll position in pixels
                  scrollToPosition();
                }}
              >
                MAP
              </Link>
              <Link
                to={'/'}
                className={classes.navBarInfoBoxSingleLink}
                onClick={() => {
                  scrollPositionRef.current = 800; // Set the desired scroll position in pixels
                  scrollToPosition();
                }}
              >
                VEHICLE & SEATS
              </Link>
              <Link
                to={'/'}
                className={classes.navBarInfoBoxSingleLink}
                onClick={() => {
                  scrollPositionRef.current = 1150; // Set the desired scroll position in pixels
                  scrollToPosition();
                }}
              >
                DRIVER
              </Link>
            </>
          )}
          <Link
            to={'./'}
            className={classes.navBarInfoBoxSingleLink}
            onClick={() => {
              scrollPositionRef.current = 1550; // Set the desired scroll position in pixels
              scrollToPosition();
            }}
          >
            CONTACT US
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Footer;
