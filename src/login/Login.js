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
import { useNavigate } from 'react-router-dom';

import { auth } from '../firebase';
import { useSetUser } from './LoginProvider';
import NotificationsAlert from '../notifications/NotificationsAlert';

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useSetUser();

  const onLogin = (e) => {
    setIsLoginLoading(true);
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setIsLoginLoading(false);
        setUser(userCredential?.user);
        navigate('/notifications');
      })
      .catch((error) => {
        console.log(error);
        setIsLoginLoading(false);
        setShowAlert(true);

        setTimeout(() => {
          setShowAlert(false);
        }, 8000);
      });
  };

  return (
    <Paper radius='md' p='xl' withBorder px={24} pl={24} mx={24} my={24}>
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
          <Button
            mb={30}
            loading={isLoginLoading}
            type='submit'
            radius='md'
            size='md'
          >
            Login
          </Button>
        </Group>
      </form>
      {showAlert && (
        <NotificationsAlert
          color='red'
          title='Email or Password wrong'
          message='Make sure to enter your email or password correctly. If you are sure they are correct, contact the Developers'
        />
      )}
    </Paper>
  );
}
