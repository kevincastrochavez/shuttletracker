import React from 'react';
import { Skeleton } from '@mantine/core';

function ShuttleTrackerSkeleton() {
  return (
    <>
      <Skeleton height={16} mt={6} radius='xl' width={'60%'} />
      <Skeleton height={14} mt={6} radius='xl' width={'75%'} />
      <Skeleton height={40} mt={6} radius='sm' />
    </>
  );
}

export default ShuttleTrackerSkeleton;
