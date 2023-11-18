import React from 'react';

import classes from './NotificationsContent.module.css';
import NotificationsNavbar from './NotificationsNavbar';

function NotificationsContent() {
  return (
    <div className={classes.content}>
      <NotificationsNavbar />
      <div className={classes.contentContainer}>
        <h1>Notifications</h1>
      </div>
    </div>
  );
}

export default NotificationsContent;
