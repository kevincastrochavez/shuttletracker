import React from 'react';

import classes from './NotificationsContent.module.css';
import NotificationsNavbar from './NotificationsNavbar';
import NotificationsOptions from './NotificationsOptions';

function NotificationsContent() {
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
