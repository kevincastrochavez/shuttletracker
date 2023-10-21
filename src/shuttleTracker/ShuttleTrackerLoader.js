import React from 'react';

import ShuttleTrackerProvider from './ShuttleTrackerProvider';

/**
 * Logic for deciding whether to display loading skeleton, error message, or data
 * @returns {JSX.Element}
 */

export default function ShuttleTrackerLoader({ children }) {
  return <ShuttleTrackerProvider>{children}</ShuttleTrackerProvider>;
}
