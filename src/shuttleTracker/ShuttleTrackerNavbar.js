import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "./images/logo.png";

import classes from "./ShuttleTrackerNavbar.module.css";

function Footer() {
  const scrollPositionRef = useRef(0);
  const scrollToPosition = () => {
    window.scrollTo({
      top: scrollPositionRef.current,
      behavior: "smooth",
    });
  };

  return (
    <div className={classes.navBarContainer}>
      <div className={classes.navBarInfoBox}>
        <div className={classes.navBarInfoBoxSingle}>
          <Link
            to="/"
            className={classes.navBarLogo}
            onClick={() => {
              scrollPositionRef.current = 0; // Set the desired scroll position in pixels
              scrollToPosition();
            }}
          >
            <img src={logo} alt="shuttle tracker logo" />
          </Link>
        </div>

        <div className={classes.navBarInfoBoxSingleLinks}>
          <Link
            to={"/"}
            className={classes.navBarInfoBoxSingleLink}
            onClick={() => {
              scrollPositionRef.current = 0; // Set the desired scroll position in pixels
              scrollToPosition();
            }}
          >
            YOUR STOP
          </Link>
          <Link
            to={"/"}
            className={classes.navBarInfoBoxSingleLink}
            onClick={() => {
              scrollPositionRef.current = 150; // Set the desired scroll position in pixels
              scrollToPosition();
            }}
          >
            MAP
          </Link>
          <Link
            to={"/"}
            className={classes.navBarInfoBoxSingleLink}
            onClick={() => {
              scrollPositionRef.current = 500; // Set the desired scroll position in pixels
              scrollToPosition();
            }}
          >
            VEHICLE & SEATS
          </Link>
          <Link
            to={"/"}
            className={classes.navBarInfoBoxSingleLink}
            onClick={() => {
              scrollPositionRef.current = 850; // Set the desired scroll position in pixels
              scrollToPosition();
            }}
          >
            DRIVER
          </Link>
          <Link
            to={"./"}
            className={classes.navBarInfoBoxSingleLink}
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
  );
}

export default Footer;
