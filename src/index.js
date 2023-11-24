import React, { lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';

import './index.css';
import reportWebVitals from './reportWebVitals';
import LoginProvider from './login/LoginProvider';

const ShuttleTracker = lazy(() => import('./shuttleTracker/ShuttleTracker'));
const Notifications = lazy(() => import('./notifications/Notifications'));
const Login = lazy(() => import('./login/Login'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <ShuttleTracker />,
  },
  {
    path: '/notifications',
    element: <Notifications />,
  },
  {
    path: '/login',
    element: <Login />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <MantineProvider>
    <LoginProvider>
      <RouterProvider router={router} />
    </LoginProvider>
  </MantineProvider>
);

reportWebVitals();
