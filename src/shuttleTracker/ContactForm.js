import React from 'react';
import { Button, Space, Textarea, TextInput } from '@mantine/core';

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
      <Button variant='filled' mt={20} w={200}>
        Submit Message
      </Button>
    </>
  );
}

export default ContactForm;
