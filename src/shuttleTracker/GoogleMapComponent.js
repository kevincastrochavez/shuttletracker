import React, { useState } from 'react';
import { useJsApiLoader, GoogleMap, Marker } from '@react-google-maps/api';
import { Skeleton } from '@mantine/core';
import { Box, Flex } from '@chakra-ui/react';

import { useBusInfo } from './ShuttleTrackerProvider';
import car from './car.png';

function GoogleMapComponent() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  const middleOfRexburgCoords = {
    lat: 43.82402030515836,
    lng: -111.78097057734374,
  };
  const center = middleOfRexburgCoords;
  const { busLocation } = useBusInfo();

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
          onLoad={(map) => setMap(map)}
          mapContainerStyle={{ width: '100%', height: '100%' }}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
          }}
        >
          <Marker position={busLocation} icon={car} map={map} />
        </GoogleMap>
      </Box>
    </Flex>
  );
}

export default GoogleMapComponent;
