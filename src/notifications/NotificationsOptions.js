import React, { useState } from 'react';

import { Switch } from '@mantine/core';
import NotificationsSwitch from './NotificationsSwitch';

function NotificationsOptions() {
  const [vehicleBrokenChecked, setVehicleBrokenChecked] = useState(false);
  const [heavyTrafficChecked, setHeavyTrafficChecked] = useState(false);
  const [detourChecked, setDetourChecked] = useState(false);
  const [reducedHoursChecked, setReducedHoursChecked] = useState(false);

  const onVehicleBrokenChange = (e) => {
    setVehicleBrokenChecked(e.currentTarget.checked);
  };

  const onHeavyTrafficChange = (e) => {
    setHeavyTrafficChecked(e.currentTarget.checked);
  };

  const onDetourChange = (e) => {
    setDetourChecked(e.currentTarget.checked);
  };

  const onReducedHoursChange = (e) => {
    setReducedHoursChecked(e.currentTarget.checked);
  };

  return (
    <>
      <NotificationsSwitch
        checked={vehicleBrokenChecked}
        onChange={onVehicleBrokenChange}
        label='Vehicle Broke Down'
      />
      <NotificationsSwitch
        checked={heavyTrafficChecked}
        onChange={onHeavyTrafficChange}
        label='Heavy Traffic'
      />
      <NotificationsSwitch
        checked={detourChecked}
        onChange={onDetourChange}
        label='Detour'
      />
      <NotificationsSwitch
        checked={reducedHoursChecked}
        onChange={onReducedHoursChange}
        label='Reduced Service Hours'
      />
    </>
  );
}

export default NotificationsOptions;
