import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import classes from './NotificationsContent.module.css';
import NotificationsNavbar from './NotificationsNavbar';
import NotificationsOptions from './NotificationsOptions';
import { useUser } from '../login/LoginProvider';

function NotificationsContent() {
  const navigate = useNavigate();
  const { user } = useUser();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [navigate, user]);

  return (
    <div className={classes.content}>
      <NotificationsNavbar />
      <div className={classes.contentContainer}>
        <h1>Notifications</h1>
        <NotificationsOptions />
      </div>
    </div>
  );
}

export default NotificationsContent;
