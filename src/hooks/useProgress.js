import { useState, useEffect } from "react";

function useProgress(callback, increment, progressDelay, callbackDelay) {
  const [progressPercentage, setProgressPercentage] = useState(null);

  useEffect(() => {
    if (progressPercentage === 100) {
      callback();
      if (progressDelay === 0) {
        setProgressPercentage(0);
        return;
      }

      const timeout = setTimeout(() => {
        setProgressPercentage(0);
      }, progressDelay);

      return () => {
        clearTimeout(timeout);
      };
    } else {
      const timeout = setTimeout(() => {
        setProgressPercentage((prev) => prev + increment);
      }, callbackDelay);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [progressPercentage]);
  return progressPercentage;
}

export default useProgress;
