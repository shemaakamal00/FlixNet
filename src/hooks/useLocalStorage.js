import { useEffect, useState } from "react";

function readValue(key, fallbackValue) {
  try {
    const storedValue = window.localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : fallbackValue;
  } catch {
    return fallbackValue;
  }
}

function useLocalStorage(key, fallbackValue) {
  const [value, setValue] = useState(() => readValue(key, fallbackValue));

  useEffect(() => {
    try {
        window.localStorage.setItem(key, JSON.stringify(value));
      } catch {
        // Ignore storage write errors so the UI can still render.
      } 
    },[key, value]);

  return [value, setValue];
}

export default useLocalStorage;
