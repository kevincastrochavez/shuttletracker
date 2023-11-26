import React from 'react';
import { useViewportSize } from '@mantine/hooks';
import { ActionIcon, Popover, Text } from '@mantine/core';
import { IconInfoSmall } from '@tabler/icons-react';

import classes from './ShuttleTrackerCount.module.css';
import bus from './images/bus.svg';
import { useBusInfo, useCarType } from './ShuttleTrackerProvider';

/**
 * Component to display how many available seats there are on the van or bus
 * @returns {JSX.Element}
 */
function ShuttleTrackerCount() {
  const { totalSeats, seatsAvailable } = useBusInfo();
  const { width } = useViewportSize();
  const icon = <IconInfoSmall />;

  const {
    carType: { busType },
  } = useCarType();

  return (
    <div
      className={
        width < 990 ? classes.countContainer : classes.countContainerLarge
      }
    >
      <h2>{busType === 'Bus' ? 'BUS' : 'VAN'}</h2>
      <img src={bus} alt='Front for little bus' />
      <p>
        There are currently <b>{seatsAvailable}</b> out of <b>{totalSeats}</b>{' '}
        seats available.{' '}
        <Popover width={200} position='bottom' withArrow shadow='md'>
          <Popover.Target>
            <ActionIcon
              variant='outline'
              aria-label='Info'
              size='xs'
              radius='xl'
            >
              {icon}
            </ActionIcon>
          </Popover.Target>
          <Popover.Dropdown>
            <Text size='xs'>
              Seat count availability is subject to the data entered by the
              driver
            </Text>
          </Popover.Dropdown>
        </Popover>
      </p>
      <div className={classes.countBar}></div>
    </div>
  );
}

export default ShuttleTrackerCount;
