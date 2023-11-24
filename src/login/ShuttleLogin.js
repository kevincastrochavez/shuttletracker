import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  Button,
  Divider,
  Stack,
} from '@mantine/core';
import { useRef, useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';

import { auth } from '../firebase';

export function ShuttleLogin() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [isLoginLoading, setIsLoginLoading] = useState(false);

  const onLogin = (e) => {
    setIsLoginLoading(true);
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        setIsLoginLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoginLoading(false);
      });
  };

  return (
    <Paper radius='md' p='xl' withBorder>
      <Text size='lg' fw={500}>
        Welcome to ShuttleTracker Notifications
      </Text>

      <Divider my='lg' />

      <form onSubmit={onLogin}>
        <Stack>
          <TextInput
            required
            label='Email'
            placeholder='hello@mantine.dev'
            radius='md'
            ref={emailRef}
          />

          <PasswordInput
            required
            label='Password'
            placeholder='Your password'
            radius='md'
            ref={passwordRef}
          />
        </Stack>

        <Group justify='space-between' mt='xl'>
          <Button loading={isLoginLoading} type='submit' radius='md' size='md'>
            Login
          </Button>
        </Group>
      </form>
    </Paper>
  );
}
