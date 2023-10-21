import { useEffect, useRef, useState } from 'react';

/**
 * Custom hook to get and set values to and from localStorage
 * @param {String} key value from localStorage
 * @param {String} defaultValue value to look for
 * @returns {[String, Function]}
 */
export function useStorage(key, defaultValue) {
  const [value, setValue] = useState(() => {
    const jsonValue = window.localStorage.getItem(key);
    if (jsonValue !== null) return JSON.parse(jsonValue);

    if (typeof initialValue === 'function') {
      return defaultValue();
    } else {
      return defaultValue;
    }
  });

  useEffect(() => {
    if (value === undefined) return window.localStorage.removeItem(key);
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

/**
 * Custom hook to determine which way the bus us heading
 * @param {Object} startCoords coordinates (lat, lng) for the first point
 * @param {Object} endCoords coordinates (lat, lng) for the second point
 * @returns {[String, Function]}
 */
export function useGetHeading(startCoords, endCoords) {
  const [startLat, startLon] = startCoords;
  const [endLat, endLon] = endCoords;

  const latDiff = endLat - startLat;
  const lonDiff = endLon - startLon;

  if (Math.abs(latDiff) > Math.abs(lonDiff)) {
    if (latDiff > 0) {
      return 'North';
    } else if (latDiff < 0) {
      return 'South';
    }
  } else {
    if (lonDiff > 0) {
      return 'East';
    } else if (lonDiff < 0) {
      return 'West';
    }
  }

  return 'No significant movement';
}

/**
 * Custom hook to save previous value or state and make a comparison
 * @param {Any} value
 * @returns {[String, Function]}
 */
export default function usePrevious(value) {
  const currentRef = useRef(value);
  const previousRef = useRef();

  if (currentRef.current !== value) {
    previousRef.current = currentRef.current;
    currentRef.current = value;
  }

  return previousRef.current;
}
