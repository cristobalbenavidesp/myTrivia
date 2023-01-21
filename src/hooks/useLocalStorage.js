import { useState, useEffect } from "react";

function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(storedValue));
  }, [storedValue]);

  const setValue = (value) => {
    try {
      setStoredValue(value);
    } catch (error) {
      console.log(error);
    }
  };
  return [storedValue, setValue];
}

export default useLocalStorage;
