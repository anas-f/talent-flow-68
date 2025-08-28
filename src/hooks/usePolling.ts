import { useEffect, useRef } from 'react';

export function usePolling(callback: () => void, delay: number) {
  const savedCallback = useRef<() => void>();
  const intervalId = useRef<NodeJS.Timeout>();

  // Remember the latest callback
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval
  useEffect(() => {
    function tick() {
      savedCallback.current?.();
    }

    if (delay !== null) {
      // Initial call
      tick();
      
      // Set up interval
      intervalId.current = setInterval(tick, delay);
      
      // Clean up interval on unmount
      return () => {
        if (intervalId.current) {
          clearInterval(intervalId.current);
        }
      };
    }
  }, [delay]);

  // Function to manually trigger a refresh
  const triggerRefresh = () => {
    savedCallback.current?.();
  };

  return { triggerRefresh };
}
