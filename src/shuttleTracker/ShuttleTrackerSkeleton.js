import React from 'react';
import { Skeleton } from '@mantine/core';

import classes from './ShuttleTrackerSkeleton.module.css';

/**
 * Skeleton structure
 * @returns {JSX.Element}
 */
function ShuttleTrackerSkeleton() {
  return (
    <div className={classes.skeletonContainer}>
      <Skeleton height={16} mt={6} radius='xl' width={'60%'} />
      <Skeleton height={14} mt={6} radius='xl' width={'75%'} />
      <Skeleton height={40} mt={6} radius='md' />
      <Skeleton height={16} mt={30} radius='xl' width={'75%'} />
      <Skeleton height={400} mt={60} radius='md' />
      <div className={classes.avatarContainer}>
        <Skeleton height={100} circle />
        <div>
          <Skeleton height={30} mt={6} radius='xl' width={'75%'} />
          <Skeleton height={16} mt={6} radius='xl' width={'75%'} />
        </div>
      </div>
    </div>
  );
}

export default ShuttleTrackerSkeleton;
