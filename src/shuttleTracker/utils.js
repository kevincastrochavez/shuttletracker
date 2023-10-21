import { useEffect, useState } from 'react';

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
