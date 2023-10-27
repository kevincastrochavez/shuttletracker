import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "./images/logo.png";

import classes from "./ShuttleTrackerNavbar.module.css";

function Footer() {
  // const scrollToSection = (sectionId) => {
  //   const section = document.getElementById(sectionId);

  //   if (section) {
  //     section.scrollIntoView({ behavior: "smooth" });
  //   }
  // };

  // let navigate = useNavigate();
  // let yourStopRef = useRef(null);
  // let contactUsRef = useRef(null);
  // let scrollToSection = (sectionRef) => {
  //   sectionRef.current.scrollIntoView({ behavior: "smooth" });
  // };
  // useEffect(() => {
  //   yourStopRef.current = document.getElementById("yourStop");
  // });

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
          <Link to="/" className={classes.navBarLogo}>
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
              scrollPositionRef.current = 260; // Set the desired scroll position in pixels
              scrollToPosition();
            }}
          >
            MAP
          </Link>
          <Link
            to={"/"}
            className={classes.navBarInfoBoxSingleLink}
            onClick={() => {
              scrollPositionRef.current = 700; // Set the desired scroll position in pixels
              scrollToPosition();
            }}
          >
            VEHICLE & SEATS
          </Link>
          <Link
            to={"/"}
            className={classes.navBarInfoBoxSingleLink}
            onClick={() => {
              scrollPositionRef.current = 1050; // Set the desired scroll position in pixels
              scrollToPosition();
            }}
          >
            DRIVER
          </Link>
          <Link
            to={"./"}
            className={classes.navBarInfoBoxSingleLink}
            onClick={() => {
              scrollPositionRef.current = 1500; // Set the desired scroll position in pixels
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
