import React from 'react';
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  DirectionsRenderer,
} from '@react-google-maps/api';

import { useBusInfo } from './ShuttleTrackerProvider';

function GoogleMapComponent() {
  const center = { lat: 43.82402030515836, lng: -111.78097057734374 };
  const { busLocation } = useBusInfo();
  console.log(busLocation);

  return <div>GoogleMapComponent</div>;
}

export default GoogleMapComponent;
