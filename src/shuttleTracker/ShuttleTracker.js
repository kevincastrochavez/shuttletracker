import React from 'react';

import ShuttleTrackerLoader from './ShuttleTrackerLoader';
import ShuttleTrackerContent from './ShuttleTrackerContent';

/**
 * Main Shuttle Tracker rendering component
 * @returns {JSX.Element}
 */

export default function ShuttleTracker() {
  return (
    <ShuttleTrackerLoader>
      <ShuttleTrackerContent></ShuttleTrackerContent>
    </ShuttleTrackerLoader>
  );
}
