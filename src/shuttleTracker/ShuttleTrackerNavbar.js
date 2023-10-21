import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from './images/logo.png';

import classes from './ShuttleTrackerNavbar.module.css';

function Footer() {
  const [currentYear, setCurrentYear] = useState(0);
  let navigate = useNavigate();

  useEffect(() => {
    const date = new Date().getFullYear();
    setCurrentYear(date);
  });

  return (
    <div className={classes.navBarContainer}>
      <div className={classes.navBarInfoBox}>
        <div className={classes.navBarInfoBoxSingle}>
          <Link to='/' className={classes.navBarLogo}>
            <img src={logo} />
          </Link>
        </div>

        <div className={classes.navBarInfoBoxSingleLinks}>
          <Link
            to={'/'}
            className={classes.navBarInfoBoxSingleLink}
            onClick={() => {
              navigate('/');
            }}
          >
            YOUR STOP
          </Link>
          <Link
            to={'/'}
            className={classes.navBarInfoBoxSingleLink}
            onClick={() => {
              navigate('/');
            }}
          >
            MAP
          </Link>
          <Link
            to={'/'}
            className={classes.navBarInfoBoxSingleLink}
            onClick={() => {
              navigate('/');
            }}
          >
            DRIVER
          </Link>
          <Link
            to={'/'}
            className={classes.navBarInfoBoxSingleLink}
            onClick={() => {
              navigate('/');
            }}
          >
            VEHICLE & SEATS
          </Link>
          <Link
            to={'/'}
            className={classes.navBarInfoBoxSingleLink}
            onClick={() => {
              navigate('/');
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
