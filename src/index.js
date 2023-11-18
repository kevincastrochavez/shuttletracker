import React, { lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';

import './index.css';
import reportWebVitals from './reportWebVitals';

const ShuttleTracker = lazy(() => import('./shuttleTracker/ShuttleTracker'));
const Notifications = lazy(() => import('./notifications/Notifications'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <ShuttleTracker />,
  },
  {
    path: '/notifications',
    element: <Notifications />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <MantineProvider>
    <RouterProvider router={router} />
  </MantineProvider>
);

reportWebVitals();
