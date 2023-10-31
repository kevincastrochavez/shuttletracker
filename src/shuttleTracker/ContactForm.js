import React from 'react';
import { Button, Textarea, TextInput } from '@mantine/core';

import classes from './ContactForm.module.css';

function ContactForm() {
  return (
    <div className={classes.contactForm}>
      <h2>CONTACT US</h2>

      <p>Experiencing issues related to the website? Send us an email</p>

      <TextInput
        label='Your Email'
        placeholder='johndoe@gmail.com'
        className={classes.contactFormEmail}
      />

      <Textarea
        label="What's the issue?"
        placeholder='Something is not working...'
        className={classes.contactFormMessage}
      />
      <Button className={classes.contactFormButton}>SUBMIT</Button>
    </div>
  );
}

export default ContactForm;
