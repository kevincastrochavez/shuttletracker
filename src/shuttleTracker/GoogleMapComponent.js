import React, { useState, useEffect } from "react";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { Skeleton } from "@mantine/core";
import { Box, Flex } from "@chakra-ui/react";
import { useViewportSize } from "@mantine/hooks";
import classes from "./GoogleMapComponent.module.css";

import { useBusInfo, usePreferredStop } from "./ShuttleTrackerProvider";
import marker from "./images/marker.png";
import front from "./images/front.png";
import busStopsObj from "./busStopsList";
import MinutesAway from "./MinutesAway";
import usePrevious, { useGetHeading } from "./utils";

function GoogleMapComponent() {
  const middleOfRexburgCoords = {
    lat: 43.82402030515836,
    lng: -111.78097057734374,
  };
  const { width } = useViewportSize();
  let mapSize;
  let marginRules;

  if (width <= 720) {
    mapSize = "450px";
    marginRules = "10px 24px";
  }
  if (width > 720) {
    mapSize = "450px";
    marginRules = "10px 30px";
  }

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  const [map, setMap] = useState(null);
  const [nearDirectionsResponse, setNearDirectionsResponse] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const center = middleOfRexburgCoords;
  const { busLocation } = useBusInfo();
  const { stopSelected } = usePreferredStop();
  const stopSelectedCoords = busStopsObj.filter(
    (stop) => Object.keys(stop)[0] === stopSelected
  )[0];
  const { location: preferredLocationSelected } =
    stopSelectedCoords[stopSelected];
  const previousLocation = usePrevious(busLocation);

  // Get car heading direction and apply styles accordingly
  const value = useGetHeading(
    [previousLocation?.lat, previousLocation?.lng],
    [busLocation?.lat, busLocation?.lng]
  );

  // useEffect(() => {
  //   updateMap();
  // }, [stopSelected]);

  const updateMap = async () => {
    // Get directions
    const google = window.google;
    const directionsService = new google.maps.DirectionsService();

    const nearStopRoute = await directionsService.route({
      origin: preferredLocationSelected,
      destination: busLocation,
      travelMode: "DRIVING",
    });

    setNearDirectionsResponse(nearStopRoute);
  };

  const onLoad = React.useCallback(
    async function callback(map) {
      setMap(map);
      const walmartCoords = { lat: 43.854752, lng: -111.777962 };

      // Get directions
      const google = window.google;
      const directionsService = new google.maps.DirectionsService();

      const completeRouteData = await directionsService.route({
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
        travelMode: "DRIVING",
      });

      const nearStopRoute = await directionsService.route({
        origin: preferredLocationSelected,
        destination: busLocation,
        travelMode: "DRIVING",
      });

      setDirectionsResponse(completeRouteData);
      setNearDirectionsResponse(nearStopRoute);
    },
    [busLocation, preferredLocationSelected]
  );

  if (!isLoaded) return <Skeleton height={400} radius="md" />;

  return (
    <Flex
      position="relative"
      flexDirection="column"
      alignItems="center"
      h={mapSize}
      m={marginRules}
    >
      <Box position="absolute" left={0} top={0} h={mapSize} w="100%">
        <MinutesAway nearDirectionsResponse={nearDirectionsResponse} />
        <GoogleMap
          m={marginRules}
          className={classes.googleMapComponentMap}
          defaultZoom={14}
          onLoad={(map) => {
            onLoad(map);
          }}
          onZoomChanged={(map) => map}
          onDrag={(map) => map}
          mapContainerStyle={{ height: "450px" }}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
          }}
        >
          <Marker
            position={busLocation}
            icon={marker}
            map={map}
            center={center}
          />
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
        </GoogleMap>
      </Box>
    </Flex>
  );
}

export default GoogleMapComponent;
