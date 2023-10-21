import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Footer() {
  const [currentYear, setCurrentYear] = useState(0);
  let navigate = useNavigate();

  useEffect(() => {
    const date = new Date().getFullYear();
    setCurrentYear(date);
  });

  return (
    <div className="footerContainer">
      <div className="footerContainer-title">REXBURG SHUTTLE TRACKER</div>
      <div className="footerInfoBox">
        <div className="footerInfoBoxSingle">
          <div className="footerInfoBoxSingle-title">ABOUT THIS WEBSITE</div>
          <div className="footerInfoBoxSingle-links">
            <p className="footerInfoBoxSingle-link">
              This website is not an official platform of Walmart or Salt Lake
              Express. We are an independent non-profit team providing
              information and services related to the Rexburg Walmart Shuttle.
            </p>
          </div>
        </div>
        <div className="footerInfoBoxSingle">
          <div className="footerInfoBoxSingle-title">DISCLAIMER</div>
          <div className="footerInfoBoxSingle-links">
            <p className="footerInfoBoxSingle-link">
              Any use of the Walmart or Salt Lake Express names or trademarks on
              this website is purely for informative purposes and does not imply
              any affiliation or endorsement by these companies.
            </p>
          </div>
        </div>
        <div className="footerInfoBoxSingle">
          <div className="footerInfoBoxSingle-title">SECTIONS</div>
          <div className="footerInfoBoxSingle-links">
            <Link
              to={"/"}
              className="footerInfoBoxSingle-link"
              onClick={() => {
                navigate("/");
              }}
            >
              YOUR STOP
            </Link>
            <Link
              to={"/"}
              className="footerInfoBoxSingle-link"
              onClick={() => {
                navigate("/");
              }}
            >
              MAP
            </Link>
            <Link
              to={"/"}
              className="footerInfoBoxSingle-link"
              onClick={() => {
                navigate("/");
              }}
            >
              DRIVER
            </Link>
            <Link
              to={"/"}
              className="footerInfoBoxSingle-link"
              onClick={() => {
                navigate("/");
              }}
            >
              VEHICLE & SEATS
            </Link>
            <Link
              to={"/"}
              className="footerInfoBoxSingle-link"
              onClick={() => {
                navigate("/");
              }}
            >
              CONTACT US
            </Link>
          </div>
        </div>
      </div>
      <div className="footerInfoBox">
        <div className="footerInfoBoxSingle">
          <div className="footerRights">
            ® {currentYear} BYUI HACKATHON. All Rights Reserved
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
