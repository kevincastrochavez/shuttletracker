import React, { useState } from 'react';
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  DirectionsRenderer,
} from '@react-google-maps/api';
import { Skeleton } from '@mantine/core';
import { Box, Flex } from '@chakra-ui/react';

import { useBusInfo } from './ShuttleTrackerProvider';
import car from './car.png';

function GoogleMapComponent() {
  const middleOfRexburgCoords = {
    lat: 43.82402030515836,
    lng: -111.78097057734374,
  };
  const walmartCoords = { lat: 43.854752, lng: -111.777962 };

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  const [map, setMap] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const center = middleOfRexburgCoords;
  const { busLocation } = useBusInfo();

  const onLoad = React.useCallback(async function callback(map) {
    setMap(map);

    // Get directions
    const google = window.google;
    const directionsService = new google.maps.DirectionsService();

    const results = await directionsService.route({
      origin: walmartCoords,
      destination: walmartCoords,
      waypoints: [
        {
          location: { lat: 43.81778, lng: -111.78084 },
          stopover: true,
        },
        {
          location: { lat: 43.814201, lng: -111.778122 },
          stopover: true,
        },
        {
          location: { lat: 43.81180247920654, lng: -111.78677373375258 },
          stopover: true,
        },
        {
          location: { lat: 43.813570621409866, lng: -111.79428811938575 },
          stopover: true,
        },
        {
          location: { lat: 43.81561946956219, lng: -111.79476980506578 },
          stopover: false,
        },
        {
          location: { lat: 43.8155133, lng: -111.7903156 },
          stopover: true,
        },
        {
          location: { lat: 43.817596, lng: -111.788459 },
          stopover: true,
        },
        {
          location: { lat: 43.8195804, lng: -111.7868141 },
          stopover: true,
        },
        {
          location: { lat: 43.8221074545991, lng: -111.78322995479034 },
          stopover: true,
        },
        {
          location: { lat: 43.8297894, lng: -111.7839334 },
          stopover: true,
        },
      ],
      travelMode: 'DRIVING',
    });

    setDirectionsResponse(results);
  }, []);

  if (!isLoaded) return <Skeleton height={400} radius='md' />;

  return (
    <Flex
      position='relative'
      flexDirection='column'
      alignItems='center'
      h='40vh'
    >
      <Box position='absolute' left={0} top={0} h='40vh' w='100%'>
        <GoogleMap
          center={center}
          zoom={13}
          onLoad={onLoad}
          mapContainerStyle={{ width: '100%', height: '100%' }}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
          }}
        >
          <Marker position={busLocation} icon={car} map={map} />
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
        </GoogleMap>
      </Box>
    </Flex>
  );
}

export default GoogleMapComponent;
