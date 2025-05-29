import { useEffect, useRef, useCallback } from 'react';

export function useAnimationFrame(callback: (timestamp: number) => void) {
  const frameRef = useRef<number | undefined>(undefined);
  const lastTimeRef = useRef<number>(0);
  const frameInterval = 1000 / 60; // Target 60 FPS

  // Memoize the callback to prevent unnecessary re-renders
  const memoizedCallback = useCallback(callback, [callback]);

  useEffect(() => {
    const animate = (timestamp: number = performance.now()) => {
      // Calculate time elapsed since last frame
      const elapsed = timestamp - lastTimeRef.current;

      // Only draw if enough time has passed
      if (elapsed > frameInterval) {
        lastTimeRef.current = timestamp;
        memoizedCallback(timestamp);
      }

      // Request next frame
      frameRef.current = requestAnimationFrame(animate);
    };

    // Start animation loop if document is visible
    if (!document.hidden) {
      frameRef.current = requestAnimationFrame(animate);
    }

    // Handle visibility changes
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (frameRef.current) {
          cancelAnimationFrame(frameRef.current);
          frameRef.current = undefined;
        }
      } else {
        if (!frameRef.current) {
          frameRef.current = requestAnimationFrame(animate);
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Cleanup
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [memoizedCallback, frameInterval]);
} 