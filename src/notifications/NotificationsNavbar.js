import React from 'react';

import { IconLogout } from '@tabler/icons-react';

import classes from './NotificationsNavbar.module.css';

function NotificationsNavbar() {
  const iconLogout = <IconLogout />;

  return (
    <nav className={classes.navbar}>
      <p>Logout</p>
      {iconLogout}
    </nav>
  );
}

export default NotificationsNavbar;
