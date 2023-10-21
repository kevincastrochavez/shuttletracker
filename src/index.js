import React, { lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';

import './index.css';
import reportWebVitals from './reportWebVitals';

const ShuttleTracker = lazy(() => import('./shuttleTracker/ShuttleTracker'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <ShuttleTracker />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MantineProvider>
      <RouterProvider router={router} />
    </MantineProvider>
  </React.StrictMode>
);

reportWebVitals();
