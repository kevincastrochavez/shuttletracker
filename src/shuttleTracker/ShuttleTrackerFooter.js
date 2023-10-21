import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import classes from "./ShuttleTrackerFooter.module.css";

function Footer() {
  const [currentYear, setCurrentYear] = useState(0);
  let navigate = useNavigate();

  useEffect(() => {
    const date = new Date().getFullYear();
    setCurrentYear(date);
  });

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
                navigate("/");
              }}
            >
              YOUR STOP
            </Link>
            <Link
              to={"/"}
              className={classes.footerInfoBoxSingleLink}
              onClick={() => {
                navigate("/");
              }}
            >
              MAP
            </Link>
            <Link
              to={"/"}
              className={classes.footerInfoBoxSingleLink}
              onClick={() => {
                navigate("/");
              }}
            >
              DRIVER
            </Link>
            <Link
              to={"/"}
              className={classes.footerInfoBoxSingleLink}
              onClick={() => {
                navigate("/");
              }}
            >
              VEHICLE & SEATS
            </Link>
            <Link
              to={"/"}
              className={classes.footerInfoBoxSingleLink}
              onClick={() => {
                navigate("/");
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
            ® {currentYear} BYUI HACKATHON. All Rights Reserved
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
