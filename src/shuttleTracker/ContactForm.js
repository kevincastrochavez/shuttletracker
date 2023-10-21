import React from 'react';
import { Button, Space, Textarea, TextInput } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';

import classes from './ContactForm.module.css';

function ContactForm() {
  const { width } = useViewportSize();

  return (
    <div className={width > 990 && classes.contactForm}>
      <Space h='lg' />
      <h2>Contact Us</h2>
      <Space h='xs' />
      <p>Experiencing issues related to the website? Send us an email</p>
      <Space h='xl' />
      <TextInput label='Email' placeholder='johndoe@gmail.com' />
      <Space h='lg' />
      <Textarea
        label="What's the issue?"
        placeholder='Something is not working...'
      />
      <Button variant='filled' mt={20} w={200}>
        Submit Message
      </Button>
    </div>
  );
}

export default ContactForm;
