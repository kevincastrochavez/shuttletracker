import React from 'react';

import NotificationsProvider from './NotificationsProvider';

/**
 * Logic for deciding whether to display loading skeleton, error message, or data, and fetch and load data
 * @returns {JSX.Element}
 */
function NotificationsLoader({ children }) {
  return <NotificationsProvider>{children}</NotificationsProvider>;
}

export default NotificationsLoader;
