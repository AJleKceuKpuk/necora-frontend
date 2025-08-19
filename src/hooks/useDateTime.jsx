import { useState, useEffect } from 'react';

const useDateTime = (interval = 1000) => {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, interval);

    return () => clearInterval(timer);
  }, [interval]);

  return dateTime;
};

export default useDateTime;