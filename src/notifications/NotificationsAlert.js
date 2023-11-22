import { Alert } from '@mantine/core';
import { IconInfoCircle } from '@tabler/icons-react';

/**
 * Returns a custom alert from Mantine UI
 * @param {String} color color for the alert
 * @param {String} title custom title for the alert
 * @param {String} message custom message for the alert
 * @returns {Function}
 */
function NotificationsAlert({ color, title, message, setAlert }) {
  const icon = <IconInfoCircle />;

  return (
    <Alert
      variant='outline'
      color={color}
      title={title}
      icon={icon}
      onClose={() => setAlert(false)}
    >
      {message}
    </Alert>
  );
}

export default NotificationsAlert;
