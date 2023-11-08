import React, { useState } from 'react';
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  DirectionsRenderer,
} from '@react-google-maps/api';
import { Skeleton } from '@mantine/core';
import { Box, Flex } from '@chakra-ui/react';
import { useViewportSize } from '@mantine/hooks';
import classes from './GoogleMapComponent.module.css';

import { useBusInfo, usePreferredStop } from './ShuttleTrackerProvider';
import marker from './images/navigation.svg';
import stopMarker from './images/stop.svg';
import busStopsObj from './busStopsList';
import MinutesAway from './MinutesAway';
// import usePrevious, { useGetHeading } from './utils';

const WAYPOINTS_LIST = [
  {
    // Point to redirect route
    location: { lat: 43.85679807613483, lng: -111.77639721690906 },
    stopover: false,
  },
  {
    // MC
    location: { lat: 43.81770587485943, lng: -111.78097590122007 },
    stopover: true,
  },
  {
    // Aspen Village
    location: { lat: 43.813951265739014, lng: -111.77687831416215 },
    stopover: true,
  },
  {
    // Point to redirect route
    location: { lat: 43.81358932622403, lng: -111.78411066620575 },
    stopover: false,
  },
  {
    // Center Square
    location: { lat: 43.81180247920654, lng: -111.78677373375258 },
    stopover: true,
  },
  {
    // The Gates
    location: { lat: 43.813570621409866, lng: -111.79428811938575 },
    stopover: true,
  },
  {
    // Point to redirect route
    location: { lat: 43.81561946956219, lng: -111.79476980506578 },
    stopover: false,
  },
  {
    // Camden Apartments
    location: { lat: 43.81560399540041, lng: -111.7903517882398 },
    stopover: true,
  },
  {
    // Colonial House
    location: { lat: 43.81769451560912, lng: -111.78818646234022 },
    stopover: true,
  },
  {
    // Hart Building
    location: { lat: 43.81920198334671, lng: -111.78664755368018 },
    stopover: true,
  },
  {
    // Snow Building
    location: { lat: 43.8221074545991, lng: -111.78322995479034 },
    stopover: true,
  },
  {
    // Point to redirect route
    location: { lat: 43.82605882374381, lng: -111.783811649418 },
    stopover: false,
  },
];

const walmartCoords = {
  lat: 43.85633241609863,
  lng: -111.77465905384925,
};

function GoogleMapComponent() {
  // const middleOfRexburgCoords = {
  //   lat: 43.82402030515836,
  //   lng: -111.78097057734374,
  // };
  const { width } = useViewportSize();
  let mapSize;
  let marginRules;

  if (width <= 720) {
    mapSize = '450px';
    marginRules = '10px 24px';
  }
  if (width > 720) {
    mapSize = '450px';
    marginRules = '10px 30px';
  }

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  const [map, setMap] = useState(null);
  const [nearDirectionsResponse, setNearDirectionsResponse] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  // const center = middleOfRexburgCoords;
  const { busLocation } = useBusInfo();
  const { stopSelected } = usePreferredStop();
  const stopSelectedCoords = busStopsObj.filter(
    (stop) => Object.keys(stop)[0] === stopSelected
  )[0];
  const { location: preferredLocationSelected } =
    stopSelectedCoords[stopSelected];
  // const previousLocation = usePrevious(busLocation);

  // Get car heading direction and apply styles accordingly
  // const value = useGetHeading(
  //   [previousLocation?.lat, previousLocation?.lng],
  //   [busLocation?.lat, busLocation?.lng]
  // );

  // const updateMap = async () => {
  //   // Get directions
  //   const google = window.google;
  //   const directionsService = new google.maps.DirectionsService();

  //   const nearStopRoute = await directionsService.route({
  //     origin: preferredLocationSelected,
  //     destination: busLocation,
  //     travelMode: 'DRIVING',
  //   });

  //   setNearDirectionsResponse(nearStopRoute);
  // };

  const onLoad = React.useCallback(async function callback(map) {
    setMap(map);

    // Get directions
    const google = window.google;
    const directionsService = new google.maps.DirectionsService();

    const completeRouteData = await directionsService.route({
      origin: walmartCoords,
      destination: walmartCoords,
      waypoints: WAYPOINTS_LIST,
      travelMode: 'DRIVING',
    });

    const nearStopRoute = await directionsService.route({
      origin: preferredLocationSelected,
      destination: busLocation,
      travelMode: 'DRIVING',
    });

    setDirectionsResponse(completeRouteData);
    setNearDirectionsResponse(nearStopRoute);
  }, []);

  if (!isLoaded) return <Skeleton height={400} radius='md' />;

  const waypointsLocation = WAYPOINTS_LIST.filter(
    (waypoint) => waypoint.stopover === true
  ).map((waypoint) => waypoint.location);
  const waypointMarkersLocation = [walmartCoords, ...waypointsLocation];

  return (
    <Flex
      position='relative'
      flexDirection='column'
      alignItems='center'
      h={mapSize}
      m={marginRules}
    >
      <Box position='absolute' left={0} top={0} h={mapSize} w='100%'>
        <MinutesAway nearDirectionsResponse={nearDirectionsResponse} />
        <GoogleMap
          m={marginRules}
          className={classes.googleMapComponentMap}
          onLoad={(map) => {
            onLoad(map);
          }}
          onZoomChanged={(map) => map}
          onDrag={(map) => map}
          mapContainerStyle={{ height: '450px' }}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            mapId: '84f24b345e664424',
          }}
        >
          {waypointMarkersLocation.map((waypointPosition) => (
            <Marker position={waypointPosition} map={map} icon={stopMarker} />
          ))}
          <Marker position={busLocation} icon={marker} map={map} />
          {directionsResponse && (
            <DirectionsRenderer
              directions={directionsResponse}
              options={{ suppressMarkers: true }}
            />
          )}
        </GoogleMap>
      </Box>
    </Flex>
  );
}

export default GoogleMapComponent;
