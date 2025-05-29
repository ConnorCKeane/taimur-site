'use client';

import { useEffect, useRef, useMemo, useCallback } from 'react';
import { useAudioAnalyser } from '../hooks/useAudioAnalyser';
import { useAnimationFrame } from '../hooks/useAnimationFrame';

interface AudioVisualizerProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  height: number;
  isPlaying: boolean;
}

declare global {
  interface Window {
    webkitAudioContext: typeof AudioContext;
    webkitOfflineAudioContext: typeof OfflineAudioContext;
  }
}

// Initial animation frame (static visualization)
const INITIAL_FRAME = new Uint8Array([
  232, 229, 204, 183, 191, 189, 176, 198, 219, 218, 199, 185, 183, 182, 184, 165, 154, 177, 183, 163, 181, 189, 186, 174, 165, 153, 153, 158, 154, 153, 150, 137, 116, 121, 104, 83, 89, 99, 94, 89, 78, 81, 80, 77, 63, 46, 45, 51, 40, 51, 61, 60, 60, 57, 48, 44, 51, 44, 41, 37, 27, 18, 15, 4, 9, 19, 14, 13, 21, 26, 16, 5, 18, 16, 17, 20, 19, 20, 18, 16, 19, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
]);

type AudioState = 'init' | 'ready' | 'error';

export default function AudioVisualizer({ videoRef, height, isPlaying }: AudioVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const readyTimeRef = useRef<number>(0);
  const hasRealAudioRef = useRef<boolean>(false);
  const dataArrayRef = useRef<Uint8Array>(new Uint8Array(128));

  // Get analyser node from our custom hook
  const analyser = useAudioAnalyser(videoRef.current, {
    onStateChange: useCallback((state: AudioState) => {
      if (state === 'ready') {
        readyTimeRef.current = performance.now();
      }
    }, [])
  });

  // Memoize bar geometry calculations
  const { barHeight, barSpacing, maxWidth } = useMemo(() => {
    const verticalPadding = 16;
    const canvasHeight = height > 0 ? Math.max(0, height - verticalPadding * 2 - 60) : 220;
    const canvasWidth = 64;
    const barHeight = canvasHeight / 128;
    const barSpacing = 1;
    const maxWidth = canvasWidth * 0.8;

    return { barHeight, barSpacing, maxWidth };
  }, [height]);

  // Memoize the draw callback
  const draw = useCallback((timestamp: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'var(--background)';

    // If no analyser or not ready, show initial frame
    if (!analyser) {
      console.log('No analyzer available, showing initial frame');
      for (let i = 0; i < 128; i++) {
        const barWidth = (INITIAL_FRAME[i] / 255) * maxWidth;
        const y = i * (barHeight + barSpacing);
        ctx.fillRect(canvas.width - barWidth, y, barWidth, barHeight);
      }
      return;
    }

    // Get frequency data
    analyser.getByteFrequencyData(dataArrayRef.current);

    // Check if we have real audio data
    const hasAudioData = dataArrayRef.current.some(v => v > 0);
    const elapsedSinceReady = timestamp - readyTimeRef.current;

    // Log audio data state
    if (timestamp % 1000 < 16) { // Log roughly once per second
      console.log('[Visualizer] Audio state:', {
        hasAudioData,
        elapsedSinceReady,
        hasRealAudio: hasRealAudioRef.current,
        isPlaying,
        maxValue: Math.max(...dataArrayRef.current),
        averageValue: dataArrayRef.current.reduce((a, b) => a + b, 0) / dataArrayRef.current.length,
        dataArray: Array.from(dataArrayRef.current.slice(0, 5)) // Log first 5 values for debugging
      });
    }

    // If we have real audio data, update the flag
    if (hasAudioData && !hasRealAudioRef.current) {
      console.log('[Visualizer] Real audio data detected');
      hasRealAudioRef.current = true;
    }

    // If we don't have real audio yet and it's been less than 200ms since ready,
    // or if we're not playing, show initial frame
    if ((!hasRealAudioRef.current && elapsedSinceReady < 200) || !isPlaying) {
      if (timestamp % 1000 < 16) { // Log roughly once per second
        console.log('[Visualizer] Showing initial frame:', {
          reason: !hasRealAudioRef.current ? 'No real audio yet' : 'Not playing',
          elapsedSinceReady,
          isPlaying,
          hasAudioData,
          maxValue: Math.max(...dataArrayRef.current)
        });
      }
      for (let i = 0; i < 128; i++) {
        const barWidth = (INITIAL_FRAME[i] / 255) * maxWidth;
        const y = i * (barHeight + barSpacing);
        ctx.fillRect(canvas.width - barWidth, y, barWidth, barHeight);
      }
      return;
    }

    // Draw live bars
    for (let i = 0; i < 128; i++) {
      const barWidth = (dataArrayRef.current[i] / 255) * maxWidth;
      const y = i * (barHeight + barSpacing);
      ctx.fillRect(canvas.width - barWidth, y, barWidth, barHeight);
    }
  }, [analyser, barHeight, barSpacing, maxWidth, isPlaying]);

  // Start animation loop
  useAnimationFrame(draw);

  // Reset real audio flag when video changes
  useEffect(() => {
    hasRealAudioRef.current = false;
  }, [videoRef]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute left-0 z-20"
      width={64}
      height={height > 0 ? Math.max(0, height - 32 - 60) : 220}
      style={{ 
        pointerEvents: 'none', 
        height: `${height > 0 ? Math.max(0, height - 32 - 60) : 220}px`, 
        top: '24px',
        opacity: 1,
        WebkitTransform: 'translateZ(0)', // Force hardware acceleration on Safari
        transform: 'translateZ(0)'
      }}
    />
  );
} 