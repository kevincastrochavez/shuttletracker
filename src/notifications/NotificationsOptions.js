import React, { useState } from 'react';

import { Switch } from '@mantine/core';
import NotificationsSwitch from './NotificationsSwitch';

function NotificationsOptions() {
  const [vehicleBrokenChecked, setVehicleBrokenChecked] = useState(false);

  const onVehicleBrokenChange = (e) => {
    setVehicleBrokenChecked(e.currentTarget.checked);
  };

  return (
    <>
      <NotificationsSwitch
        checked={vehicleBrokenChecked}
        onChange={onVehicleBrokenChange}
        label='Vehicle Broke Down'
      />
    </>
  );
}

export default NotificationsOptions;
