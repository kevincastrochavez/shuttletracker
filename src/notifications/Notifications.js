import React from 'react';
import NotificationsLoader from './NotificationsLoader';
import NotificationsContent from './NotificationsContent';

/**
 * Main Notifications rendering component
 * @returns {JSX.Element}
 */
export default function Notifications() {
  return (
    <NotificationsLoader>
      <NotificationsContent />
    </NotificationsLoader>
  );
}
