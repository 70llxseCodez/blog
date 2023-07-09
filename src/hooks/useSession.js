import { useEffect, useState } from 'react';

export const useSession = (initValue, key) => {
  const getValue = () => {
    const data = JSON.parse(sessionStorage.getItem(key));
    if (data) {
      return JSON.parse(data);
    }
    return initValue;
  };
  const [value, setValue] = useState(getValue);
  useEffect(() => {
    sessionStorage.setItem(key, JSON.stringify(value));
  }, [value]);
  return [value, setValue, key];
};
