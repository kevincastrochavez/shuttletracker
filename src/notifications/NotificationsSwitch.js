import React from 'react';

import { Switch } from '@mantine/core';

/**
 * Returns custom Switch component from Mantine UI Library
 * @param {Boolean} checked true if switch is checked
 * @param {Function} onChange function to set the switch state to whatever passed
 * @param {String} label custom message for the switch
 * @param {String} disabled true if the switch is disabled
 * @returns {JSX.Element}
 */
function NotificationsSwitch({ checked, onChange, label, disabled }) {
  return (
    <Switch
      checked={checked}
      onChange={onChange}
      color='green'
      labelPosition='left'
      label={label}
      size='md'
      disabled={disabled}
    />
  );
}

export default NotificationsSwitch;
