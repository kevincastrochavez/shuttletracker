import React from 'react';

import { useNotifications } from './NotificationsProvider';

import NotificationsSwitch from './NotificationsSwitch';

function NotificationsOptions() {
  const {
    vehicleBrokenChecked,
    deviationChecked,
    reducedHoursChecked,
    heavyTrafficChecked,
  } = useNotifications();

  // const onVehicleBrokenChange = (e) => {
  //   setVehicleBrokenChecked(e.currentTarget.checked);
  // };

  // const onHeavyTrafficChange = (e) => {
  //   setHeavyTrafficChecked(e.currentTarget.checked);
  // };

  // const onDetourChange = (e) => {
  //   setDetourChecked(e.currentTarget.checked);
  // };

  // const onReducedHoursChange = (e) => {
  //   setReducedHoursChecked(e.currentTarget.checked);
  // };

  return (
    <>
      <NotificationsSwitch
        checked={vehicleBrokenChecked}
        // onChange={onVehicleBrokenChange}
        label='Vehicle Broke Down'
      />
      <NotificationsSwitch
        checked={heavyTrafficChecked}
        // onChange={onHeavyTrafficChange}
        label='Heavy Traffic'
      />
      <NotificationsSwitch
        checked={deviationChecked}
        // onChange={onDetourChange}
        label='Detour'
      />
      <NotificationsSwitch
        checked={reducedHoursChecked}
        // onChange={onReducedHoursChange}
        label='Reduced Service Hours'
      />
    </>
  );
}

export default NotificationsOptions;
