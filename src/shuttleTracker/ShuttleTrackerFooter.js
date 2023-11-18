import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';

import classes from './ShuttleTrackerFooter.module.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollPositionRef = useRef(0);
  const scrollToPosition = () => {
    window.scrollTo({
      top: scrollPositionRef.current,
      behavior: 'smooth',
    });
  };

  /**
   * Creates link with custom link and name to LinkedIn
   * @param {String} link custom link to LinkedIn
   * @param {String} name user name
   * @returns {{location, locationLoading}}
   */
  const includeLinkAndName = (link, name) => {
    return (
      <a href={link} target='_blank' rel='noreferrer'>
        {name}
      </a>
    );
  };

  const cindysLink = includeLinkAndName(
    'https://www.linkedin.com/in/cindycasttc/',
    'Cindy'
  );
  const andresLink = includeLinkAndName(
    'https://www.linkedin.com/in/andres-felipe-castro-2a628b165/',
    'Andres'
  );
  const ignacioLink = includeLinkAndName(
    'https://www.linkedin.com/in/ignacio-villar-b37895171/',
    'Ignacio'
  );
  const kevinLink = includeLinkAndName(
    'https://www.linkedin.com/in/kevincastroc0',
    'Kevin'
  );

  return (
    <div className={classes.footerContainer}>
      <div className={classes.footerContainerTitle}>
        REXBURG SHUTTLE TRACKER
      </div>
      <div className={classes.footerInfoBox}>
        <div className={classes.footerInfoBoxSingle}>
          <div className={classes.footerInfoBoxSingleTitle}>
            ABOUT THIS WEBSITE
          </div>
          <div className={classes.footerInfoBoxSingleParagraphs}>
            <p className={classes.footerInfoBoxSingle}>
              This website is not an official platform of{' '}
              <a
                href='https://www.walmart.com/store/1878-rexburg-id'
                target='_blank'
                rel='noreferrer'
              >
                Walmart
              </a>{' '}
              or{' '}
              <a
                href='https://saltlakeexpress.com/contact/?gad_source=1&gclid=CjwKCAjwv-2pBhB-EiwAtsQZFCa83h1ptocokZsOxlZyNpwsbUsWsEAFPtSvJy6hUjjbSa-z7J-0sBoCfx4QAvD_BwE'
                target='_blank'
                rel='noreferrer'
              >
                Salt Lake Express
              </a>{' '}
              . We are an independent non-profit team providing information and
              services related to the Rexburg Walmart Shuttle.
            </p>
          </div>
        </div>
        <div className={classes.footerInfoBoxSingle}>
          <div className={classes.footerInfoBoxSingleTitle}>DISCLAIMER</div>
          <div className={classes.footerInfoBoxSingleParagraphs}>
            <p className={classes.footerInfoBoxSingle}>
              Any use of the{' '}
              <a
                href='https://www.walmart.com/store/1878-rexburg-id'
                target='_blank'
                rel='noreferrer'
              >
                Walmart
              </a>{' '}
              or{' '}
              <a
                href='https://saltlakeexpress.com/contact/?gad_source=1&gclid=CjwKCAjwv-2pBhB-EiwAtsQZFCa83h1ptocokZsOxlZyNpwsbUsWsEAFPtSvJy6hUjjbSa-z7J-0sBoCfx4QAvD_BwE'
                target='_blank'
                rel='noreferrer'
              >
                Salt Lake Express
              </a>{' '}
              names or trademarks on this website is purely for informative
              purposes and does not imply any affiliation or endorsement by
              these companies.
            </p>
          </div>
        </div>
        <div className={classes.footerInfoBoxSingle}>
          <div className={classes.footerInfoBoxSingleTitle}>SECTIONS</div>
          <div className={classes.footerInfoBoxSingleLinks}>
            <Link
              to={'/'}
              className={classes.footerInfoBoxSingleLink}
              onClick={() => {
                scrollPositionRef.current = 0; // Set the desired scroll position in pixels
                scrollToPosition();
              }}
            >
              YOUR STOP
            </Link>
            <Link
              to={'/'}
              className={classes.footerInfoBoxSingleLink}
              onClick={() => {
                scrollPositionRef.current = 150; // Set the desired scroll position in pixels
                scrollToPosition();
              }}
            >
              MAP
            </Link>
            <Link
              to={'/'}
              className={classes.footerInfoBoxSingleLink}
              onClick={() => {
                scrollPositionRef.current = 850; // Set the desired scroll position in pixels
                scrollToPosition();
              }}
            >
              DRIVER
            </Link>
            <Link
              to={'/'}
              className={classes.footerInfoBoxSingleLink}
              onClick={() => {
                scrollPositionRef.current = 500; // Set the desired scroll position in pixels
                scrollToPosition();
              }}
            >
              VEHICLE & SEATS
            </Link>
            <Link
              to={'/'}
              className={classes.footerInfoBoxSingleLink}
              onClick={() => {
                scrollPositionRef.current = 1300; // Set the desired scroll position in pixels
                scrollToPosition();
              }}
            >
              CONTACT US
            </Link>
          </div>
        </div>
      </div>
      <div className={classes.footerInfoBox}>
        <div className={classes.footerInfoBoxSingle}>
          <div className={classes.footerRights}>
            ® {currentYear}{' '}
            <p>
              {cindysLink} | {andresLink} | {ignacioLink} | {kevinLink}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
