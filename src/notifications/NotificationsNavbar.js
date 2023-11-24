import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IconLogout } from '@tabler/icons-react';

import classes from './NotificationsNavbar.module.css';
import { auth } from '../firebase';

function NotificationsNavbar() {
  const navigate = useNavigate();
  const iconLogout = <IconLogout />;

  const onLogout = () => {
    auth
      .signOut()
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <nav className={classes.navbar}>
      <div onClick={onLogout}>
        <p>Logout</p>
        {iconLogout}
      </div>
    </nav>
  );
}

export default NotificationsNavbar;
