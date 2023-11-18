import React, { createContext } from 'react';

const NotificationsContext = createContext({});

/**
 * Providers for the Notification components
 * @param {Any} children components passed
 * @returns {JSX.Element}
 */
export default function NotificationsProvider({ children }) {
  return (
    <NotificationsContext.Provider>{children}</NotificationsContext.Provider>
  );
}
