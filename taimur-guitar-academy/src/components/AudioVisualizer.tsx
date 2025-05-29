'use client';

import { useEffect, useRef, useMemo, useCallback } from 'react';
import { useAudioAnalyser } from '../hooks/useAudioAnalyser';

interface AudioVisualizerProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  height: number;
  isPlaying: boolean;
  hasUserInteracted: boolean;
}

// Initial animation frame (static visualization)
const INITIAL_FRAME = new Uint8Array([
  232, 229, 204, 183, 191, 189, 176, 198, 219, 218, 199, 185, 183, 182, 184, 165, 154, 177, 183, 163, 181, 189, 186, 174, 165, 153, 153, 158, 154, 153, 150, 137, 116, 121, 104, 83, 89, 99, 94, 89, 78, 81, 80, 77, 63, 46, 45, 51, 40, 51, 61, 60, 60, 57, 48, 44, 51, 44, 41, 37, 27, 18, 15, 4, 9, 19, 14, 13, 21, 26, 16, 5, 18, 16, 17, 20, 19, 20, 18, 16, 19, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
]);

// Animation frames for simulated state
const SIMULATED_FRAMES = [
  [255, 255, 245, 215, 198, 195, 171, 141, 149, 155, 157, 163, 158, 163, 171, 180, 172, 148, 148, 174, 182, 177, 164, 161, 163, 154, 154, 146, 141, 158, 168, 155, 125, 123, 124, 130, 133, 117, 94, 94, 101, 104, 100, 109, 110, 117, 119, 117, 112, 103, 102, 112, 110, 109, 112, 126, 129, 115, 108, 109, 104, 112, 119, 113, 102, 100, 100, 93, 95, 81, 90, 101, 105, 96, 99, 112, 101, 92, 89, 81, 78, 74, 69, 69, 69, 70, 72, 64, 65, 63, 56, 61, 64, 55, 45, 15, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [255, 255, 243, 215, 191, 188, 162, 130, 142, 156, 168, 169, 156, 164, 183, 190, 177, 138, 151, 171, 174, 169, 158, 161, 166, 163, 165, 151, 133, 152, 163, 152, 130, 117, 121, 126, 131, 113, 91, 90, 97, 98, 94, 103, 104, 111, 115, 116, 107, 97, 100, 107, 101, 99, 107, 124, 128, 120, 116, 106, 96, 104, 114, 105, 102, 91, 100, 102, 104, 90, 92, 95, 96, 86, 92, 106, 100, 92, 85, 82, 83, 73, 80, 80, 76, 81, 79, 59, 65, 67, 57, 63, 63, 47, 45, 18, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [252, 253, 244, 228, 203, 187, 176, 154, 147, 146, 168, 169, 151, 160, 180, 190, 177, 148, 154, 169, 169, 167, 162, 162, 166, 166, 165, 150, 142, 157, 164, 156, 139, 115, 124, 132, 129, 112, 106, 98, 102, 96, 95, 104, 107, 115, 115, 115, 108, 94, 99, 105, 107, 115, 120, 121, 124, 123, 118, 109, 112, 114, 114, 115, 109, 92, 102, 95, 97, 95, 101, 108, 110, 103, 102, 108, 105, 104, 99, 82, 90, 93, 96, 99, 100, 97, 92, 93, 90, 81, 70, 80, 89, 85, 70, 28, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [251, 252, 249, 232, 203, 185, 168, 155, 145, 142, 168, 171, 158, 162, 179, 187, 175, 142, 150, 165, 168, 169, 159, 155, 162, 165, 164, 147, 140, 155, 158, 150, 138, 122, 128, 132, 127, 110, 103, 94, 98, 92, 95, 100, 101, 109, 111, 113, 105, 88, 102, 115, 118, 114, 111, 114, 116, 120, 117, 106, 112, 114, 113, 112, 108, 100, 109, 103, 98, 87, 103, 107, 108, 101, 94, 103, 106, 107, 99, 77, 88, 93, 98, 102, 97, 90, 87, 88, 86, 79, 66, 75, 83, 77, 65, 27, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [255, 255, 253, 231, 196, 190, 172, 150, 146, 142, 164, 167, 152, 157, 178, 187, 175, 142, 148, 165, 166, 162, 151, 151, 159, 165, 165, 148, 136, 149, 152, 148, 138, 123, 126, 128, 127, 109, 103, 87, 101, 100, 102, 101, 91, 105, 112, 112, 104, 93, 98, 105, 112, 107, 102, 105, 108, 116, 116, 106, 105, 106, 106, 107, 108, 102, 104, 97, 90, 82, 102, 105, 98, 97, 91, 98, 98, 100, 93, 76, 80, 87, 92, 93, 91, 86, 85, 87, 86, 77, 66, 64, 77, 73, 59, 24, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

type VisualizerState = 'frozen' | 'simulated' | 'real';

export default function AudioVisualizer({ videoRef, height, isPlaying, hasUserInteracted }: AudioVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dataArrayRef = useRef<Uint8Array>(new Uint8Array(128));
  const animationFrameIndexRef = useRef<number>(0);
  const lastFrameTimeRef = useRef<number>(0);
  const animationFrameRef = useRef<number>(0);
  const hasRealAudioRef = useRef<boolean>(false);
  const stateRef = useRef<VisualizerState>('frozen');

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

  // Get analyser node from our custom hook
  const analyser = useAudioAnalyser(videoRef.current, {
    onStateChange: (state) => {
      console.log('[AudioVisualizer] Audio state changed:', { 
        state, 
        hasUserInteracted,
        isPlaying,
        videoMuted: videoRef.current?.muted,
        videoPaused: videoRef.current?.paused
      });
    }
  });

  // Memoize draw functions
  const drawFrozen = useCallback((ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    for (let i = 0; i < 128; i++) {
      const barWidth = (INITIAL_FRAME[i] / 255) * maxWidth;
      const y = i * (barHeight + barSpacing);
      ctx.fillRect(canvas.width - barWidth, y, barWidth, barHeight);
    }
  }, [barHeight, barSpacing, maxWidth]);

  const drawSimulated = useCallback((ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    const currentFrame = SIMULATED_FRAMES[animationFrameIndexRef.current];
    for (let i = 0; i < 128; i++) {
      const barWidth = (currentFrame[i] / 255) * maxWidth;
      const y = i * (barHeight + barSpacing);
      ctx.fillRect(canvas.width - barWidth, y, barWidth, barHeight);
    }
  }, [barHeight, barSpacing, maxWidth]);

  const drawReal = useCallback((ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    if (!analyser) return;
    analyser.getByteFrequencyData(dataArrayRef.current);
    for (let i = 0; i < 128; i++) {
      const barWidth = (dataArrayRef.current[i] / 255) * maxWidth;
      const y = i * (barHeight + barSpacing);
      ctx.fillRect(canvas.width - barWidth, y, barWidth, barHeight);
    }
  }, [analyser, barHeight, barSpacing, maxWidth]);

  // Memoize state getter
  const getVisualizerState = useCallback((): VisualizerState => {
    // If video is playing, we should be in simulated or real state
    if (isPlaying) {
      // Only show real audio when video is unmuted and we have an analyser
      if (!videoRef.current?.muted && analyser && hasUserInteracted) {
        return 'real';
      }
      // Otherwise show simulated animation
      return 'simulated';
    }
    // If video is not playing, show frozen state
    return 'frozen';
  }, [isPlaying, analyser, hasUserInteracted, videoRef]);

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const animate = (timestamp: number) => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'var(--background)';

      // Update animation frame timing for simulated state
      if (!lastFrameTimeRef.current) {
        lastFrameTimeRef.current = timestamp;
      }
      
      if (timestamp - lastFrameTimeRef.current > 100) {
        animationFrameIndexRef.current = (animationFrameIndexRef.current + 1) % SIMULATED_FRAMES.length;
        lastFrameTimeRef.current = timestamp;
      }

      // Get current state
      const currentState = getVisualizerState();
      
      // Check for real audio data only when unmuted
      if (analyser && currentState === 'real' && !videoRef.current?.muted) {
        analyser.getByteFrequencyData(dataArrayRef.current);
        const hasAudioData = dataArrayRef.current.some(v => v > 0);
        if (hasAudioData && !hasRealAudioRef.current) {
          console.log('[AudioVisualizer] Real audio data detected');
          hasRealAudioRef.current = true;
        }
      }

      // Draw based on state
      switch (currentState) {
        case 'frozen':
          drawFrozen(ctx, canvas);
          break;
        case 'simulated':
          drawSimulated(ctx, canvas);
          break;
        case 'real':
          drawReal(ctx, canvas);
          break;
      }

      // Log state changes
      if (currentState !== stateRef.current) {
        console.log('[AudioVisualizer] State changed:', {
          from: stateRef.current,
          to: currentState,
          hasUserInteracted,
          isPlaying,
          videoMuted: videoRef.current?.muted,
          videoPaused: videoRef.current?.paused,
          hasAnalyser: !!analyser,
          hasRealAudio: hasRealAudioRef.current
        });
        stateRef.current = currentState;
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [analyser, isPlaying, hasUserInteracted, drawFrozen, drawSimulated, drawReal, getVisualizerState]);

  // Reset states when video changes
  useEffect(() => {
    console.log('[AudioVisualizer] Video changed, resetting states');
    hasRealAudioRef.current = false;
    animationFrameIndexRef.current = 0;
    lastFrameTimeRef.current = 0;
    // Start in simulated state if video is playing
    stateRef.current = isPlaying ? 'simulated' : 'frozen';
  }, [videoRef, isPlaying]);

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
        WebkitTransform: 'translateZ(0)',
        transform: 'translateZ(0)'
      }}
    />
  );
} 