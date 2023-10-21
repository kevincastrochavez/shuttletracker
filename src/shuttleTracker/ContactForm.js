import React from 'react';
import { Space, Textarea, TextInput } from '@mantine/core';

function ContactForm() {
  return (
    <>
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
    </>
  );
}

export default ContactForm;
