import React from 'react';
import { ActionIcon, Popover, Text } from '@mantine/core';
import { IconInfoSmall } from '@tabler/icons-react';

import classes from './MinutesAway.module.css';

/**
 * Small component to let you know how far the bus is from you in minutes
 * @returns {JSX.Element}
 */
function MinutesAway({ minutesAway }) {
  const icon = <IconInfoSmall />;

  return (
    <>
      {minutesAway ? (
        <p className={classes.minutesAwayP}>
          The shuttle is approx.{' '}
          <b className={classes.minutesAwayB}>
            {minutesAway} {minutesAway === 1 ? 'minute' : 'minutes'}
          </b>{' '}
          away from you{' '}
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
                Calculation based on information provided by the driver at the
                last stop made. For accuracy, please check the map below
              </Text>
            </Popover.Dropdown>
          </Popover>
        </p>
      ) : (
        <p>
          We are having difficulties getting how far the bus is from you. Please
          refresh the page.
        </p>
      )}
    </>
  );
}

export default MinutesAway;
