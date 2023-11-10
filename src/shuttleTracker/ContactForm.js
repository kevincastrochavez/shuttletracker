import React, { useRef, useState } from 'react';
import { Alert, Textarea, TextInput } from '@mantine/core';
import emailjs from '@emailjs/browser';

import classes from './ContactForm.module.css';
import {
  IconAlertTriangle,
  IconCheck,
  IconExclamationCircle,
} from '@tabler/icons-react';

function ContactForm() {
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [isUnsuccessful, setIsUnsuccessful] = useState(false);
  const [formInvalid, setFormInvalid] = useState(false);
  const form = useRef();

  const iconCheck = <IconCheck />;
  const iconTriangle = <IconAlertTriangle />;
  const iconExclamationCircle = <IconExclamationCircle />;

  const sendEmail = (e) => {
    e.preventDefault();

    if (form.current[0].value !== '' && form.current[1].value !== '') {
      emailjs
        .sendForm(
          'service_0mn37ts',
          'template_es4isll',
          form.current,
          'dLOh8cyvr5SZ1jboU'
        )
        .then(
          (result) => {
            if (result.text === 'OK') {
              setIsSuccessful(true);
            }
          },
          (error) => {
            setIsUnsuccessful(true);
          }
        );
    } else {
      setFormInvalid(true);
    }
  };

  return (
    <div className={classes.contactForm}>
      <h2>CONTACT US</h2>

      <p>Experiencing issues related to the website? Send us an email</p>

      <form ref={form} onSubmit={sendEmail}>
        <TextInput
          label='Your Email'
          placeholder='johndoe@gmail.com'
          className={classes.contactFormEmail}
          type='email'
          name='email'
        />

        <Textarea
          label="What's the issue?"
          placeholder='Something is not working...'
          className={classes.contactFormMessage}
          name='message'
        />
        <input
          className={classes.contactFormButton}
          type='submit'
          value='SUBMIT'
          id='submitForm'
        />
      </form>

      {isSuccessful && (
        <Alert
          variant='light'
          color='teal'
          withCloseButton
          title='Thanks for the feedback!'
          icon={iconCheck}
          onClose={() => setIsSuccessful(false)}
        >
          We will try to look into this matter as soon as possible
        </Alert>
      )}
      {isUnsuccessful && (
        <Alert
          variant='light'
          color='red'
          withCloseButton
          title='Mesagge failed'
          icon={iconTriangle}
          onClose={() => setIsUnsuccessful(false)}
        >
          Looks like we are experiencing some problems. Try again later!
        </Alert>
      )}
      {formInvalid && (
        <Alert
          variant='light'
          color='yellow'
          withCloseButton
          title='Invalid Form'
          icon={iconExclamationCircle}
          onClose={() => setFormInvalid(false)}
        >
          Make sure all fields are filled out correctly
        </Alert>
      )}
    </div>
  );
}

export default ContactForm;
