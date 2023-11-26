import React, { useState } from 'react';
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  DirectionsRenderer,
  InfoWindow,
} from '@react-google-maps/api';
import { Skeleton } from '@mantine/core';
import { Box, Flex } from '@chakra-ui/react';
import { useViewportSize } from '@mantine/hooks';
import classes from './GoogleMapComponent.module.css';

import {
  useActiveMarker,
  useBusInfo,
  usePreferredStop,
  useSetActiveMarker,
} from './ShuttleTrackerProvider';
import marker from './images/navigation.svg';
import userMarker from './images/user.svg';
import stopMarker from './images/stop.svg';
import MinutesAway from './MinutesAway';

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

const stopsList = [
  'Walmart',
  'East MC Circle',
  'Aspen Village',
  'Center Square',
  'The Gates',
  'Camden Apartments',
  'Colonial House',
  'BYU-I Hart',
  'BYU-I Parking Lot',
];

function GoogleMapComponent() {
  const { activeMarker } = useActiveMarker();
  const { setActiveMarker } = useSetActiveMarker();
  const [map, setMap] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [userLatitude, setUserLatitude] = useState(0);
  const [userLongitude, setUserLongitude] = useState(0);
  const [showBusInfoWindow, setShowBusInfoWindow] = useState(false);
  const { busLocation, lastBusStop } = useBusInfo();
  const { stopSelected } = usePreferredStop();

  const routeLegsParsed = parseRouteLegs(directionsResponse);
  const minutesAway = getMinutesAway(
    routeLegsParsed,
    stopSelected,
    lastBusStop
  );

  navigator.geolocation.watchPosition(function ({ coords }) {
    setUserLatitude(coords.latitude);
    setUserLongitude(coords.longitude);
  });

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

    setDirectionsResponse(completeRouteData);
  }, []);

  if (!isLoaded) return <Skeleton height={400} radius='md' />;

  const waypointsLocation = WAYPOINTS_LIST.filter(
    (waypoint) => waypoint.stopover === true
  ).map((waypoint) => waypoint.location);
  const waypointMarkersLocation = [walmartCoords, ...waypointsLocation];

  const onMarkerClick = (index) => {
    setActiveMarker(index);
    setShowBusInfoWindow(false);
  };

  return (
    <Flex
      position='relative'
      flexDirection='column'
      alignItems='center'
      h={mapSize}
      m={marginRules}
    >
      <Box position='absolute' left={0} top={0} h={mapSize} w='100%'>
        <MinutesAway minutesAway={minutesAway} />
        <GoogleMap
          m={marginRules}
          className={classes.googleMapComponentMap}
          onLoad={(map) => {
            onLoad(map);
          }}
          mapContainerStyle={{ height: '450px' }}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            mapId: '84f24b345e664424',
          }}
        >
          {waypointMarkersLocation.map((waypointPosition, index) => (
            <Marker
              key={index}
              position={waypointPosition}
              map={map}
              icon={stopMarker}
              onClick={() => onMarkerClick(index)}
            >
              {activeMarker === index ? (
                <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                  <div>{stopsList[index]}</div>
                </InfoWindow>
              ) : null}
            </Marker>
          ))}
          <Marker
            position={busLocation}
            icon={marker}
            map={map}
            onClick={() => setShowBusInfoWindow(true)}
          >
            {showBusInfoWindow && (
              <InfoWindow onCloseClick={() => setShowBusInfoWindow(false)}>
                <div>Bus' current location</div>
              </InfoWindow>
            )}
          </Marker>
          {userLatitude !== 0 && userLongitude !== 0 && (
            <Marker
              position={{ lat: userLatitude, lng: userLongitude }}
              map={map}
              icon={userMarker}
            />
          )}
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

/* PRIVATE FUNCTIONS */

/**
 * Manipulates and returns the route with bus stops
 * @param {[Object]} WAYPOINTS_LIST - location and stop type
 * @returns {[Object]} routeLegsWithBusStop
 */
const parseRouteLegs = (WAYPOINTS_LIST) => {
  const routeLegs = WAYPOINTS_LIST?.routes[0]?.legs;
  const routeLegsWithBusStop = routeLegs?.map(
    ({ duration, start_address, end_address }, index) => {
      return { duration, start_address, end_address, stop: stopsList[index] };
    }
  );

  return routeLegsWithBusStop;
};

/**
 * Returns the minutes the bus is away from your
 * @param {[Object]} routeLegsParsed - complete route with stop names
 * @param {String} stopSelected - stop selected as preferred by the user
 * @param {String} lastBusStop - last stop the bus was at
 * @returns {Number} number of minutes the bus is away from the selected stop
 */
const getMinutesAway = (routeLegsParsed, stopSelected, lastBusStop) => {
  let stopSelectedIndex = 0;
  let lastBusStopIndex = 0;

  routeLegsParsed?.find((routeLeg, index) => {
    if (routeLeg?.stop === stopSelected) {
      stopSelectedIndex = index;
    }
    if (routeLeg?.stop === lastBusStop) {
      lastBusStopIndex = index;
    }
  });

  // Last bus stop
  let stopsToCountMinutes;
  let totalSeconds = 0;

  // Last bus stop is before your stop on the shuttle route starting at Walmart
  if (lastBusStopIndex < stopSelectedIndex) {
    stopsToCountMinutes = routeLegsParsed?.slice(
      lastBusStopIndex,
      stopSelectedIndex
    );

    totalSeconds = stopsToCountMinutes
      ?.map((route) => route.duration.value)
      .reduce((acc, curr) => acc + curr);
  }

  // Last bus stop is after your stop on the shuttle route starting at Walmart
  if (lastBusStopIndex > stopSelectedIndex) {
    stopsToCountMinutes = [
      ...routeLegsParsed?.slice(lastBusStopIndex),
      ...routeLegsParsed?.slice(0, stopSelectedIndex),
    ];

    totalSeconds = stopsToCountMinutes
      ?.map((route) => route.duration.value)
      .reduce((acc, curr) => acc + curr);
  }

  const totalMinutes =
    Math.round(totalSeconds / 60) !== 0 ? Math.round(totalSeconds / 60) : 34;

  return totalMinutes;
};
