import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

import classes from "./ShuttleTrackerFooter.module.css";

function Footer() {
  const [currentYear, setCurrentYear] = useState(0);
  let navigate = useNavigate();

  useEffect(() => {
    const date = new Date().getFullYear();
    setCurrentYear(date);
  });

  const scrollPositionRef = useRef(0);
  const scrollToPosition = () => {
    window.scrollTo({
      top: scrollPositionRef.current,
      behavior: "smooth",
    });
  };

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
              This website is not an official platform of Walmart or Salt Lake
              Express. We are an independent non-profit team providing
              information and services related to the Rexburg Walmart Shuttle.
            </p>
          </div>
        </div>
        <div className={classes.footerInfoBoxSingle}>
          <div className={classes.footerInfoBoxSingleTitle}>DISCLAIMER</div>
          <div className={classes.footerInfoBoxSingleParagraphs}>
            <p className={classes.footerInfoBoxSingle}>
              Any use of the Walmart or Salt Lake Express names or trademarks on
              this website is purely for informative purposes and does not imply
              any affiliation or endorsement by these companies.
            </p>
          </div>
        </div>
        <div className={classes.footerInfoBoxSingle}>
          <div className={classes.footerInfoBoxSingleTitle}>SECTIONS</div>
          <div className={classes.footerInfoBoxSingleLinks}>
            <Link
              to={"/"}
              className={classes.footerInfoBoxSingleLink}
              onClick={() => {
                scrollPositionRef.current = 0; // Set the desired scroll position in pixels
                scrollToPosition();
              }}
            >
              YOUR STOP
            </Link>
            <Link
              to={"/"}
              className={classes.footerInfoBoxSingleLink}
              onClick={() => {
                scrollPositionRef.current = 150; // Set the desired scroll position in pixels
                scrollToPosition();
              }}
            >
              MAP
            </Link>
            <Link
              to={"/"}
              className={classes.footerInfoBoxSingleLink}
              onClick={() => {
                scrollPositionRef.current = 850; // Set the desired scroll position in pixels
                scrollToPosition();
              }}
            >
              DRIVER
            </Link>
            <Link
              to={"/"}
              className={classes.footerInfoBoxSingleLink}
              onClick={() => {
                scrollPositionRef.current = 500; // Set the desired scroll position in pixels
                scrollToPosition();
              }}
            >
              VEHICLE & SEATS
            </Link>
            <Link
              to={"/"}
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
            ® {currentYear} Castro | Villar
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
