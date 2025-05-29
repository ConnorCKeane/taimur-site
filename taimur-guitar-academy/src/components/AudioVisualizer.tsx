'use client';

import { useEffect, useRef } from 'react';

interface AudioVisualizerProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  height: number;
  isPlaying: boolean;
}

declare global {
  interface Window {
    webkitAudioContext: typeof AudioContext;
  }
}

// Keep track of created MediaElementSource nodes and their contexts
const audioContexts = new WeakMap<HTMLVideoElement, AudioContext>();
const mediaElementSources = new WeakMap<HTMLVideoElement, MediaElementAudioSourceNode>();
const gainNodes = new WeakMap<HTMLVideoElement, GainNode>();

// Initial animation frames (2 seconds worth of data)
const initialFrames = [
  [232, 229, 204, 183, 191, 189, 176, 198, 219, 218, 199, 185, 183, 182, 184, 165, 154, 177, 183, 163, 181, 189, 186, 174, 165, 153, 153, 158, 154, 153, 150, 137, 116, 121, 104, 83, 89, 99, 94, 89, 78, 81, 80, 77, 63, 46, 45, 51, 40, 51, 61, 60, 60, 57, 48, 44, 51, 44, 41, 37, 27, 18, 15, 4, 9, 19, 14, 13, 21, 26, 16, 5, 18, 16, 17, 20, 19, 20, 18, 16, 19, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [229, 229, 208, 185, 187, 185, 171, 193, 219, 218, 193, 189, 180, 189, 190, 173, 163, 181, 184, 163, 175, 184, 184, 175, 163, 148, 153, 156, 155, 160, 158, 142, 114, 120, 103, 77, 84, 96, 97, 89, 80, 78, 78, 77, 64, 51, 52, 54, 41, 46, 57, 58, 59, 55, 44, 42, 51, 46, 38, 35, 22, 13, 9, 0, 12, 19, 13, 14, 21, 25, 13, 6, 15, 11, 12, 16, 16, 14, 14, 11, 17, 6, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  // ... Add all the frames here
];

export default function AudioVisualizer({ videoRef, height, isPlaying }: AudioVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number>(0);
  const lastFrameRef = useRef<Uint8Array | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const storedFramesRef = useRef<Uint8Array[]>([]);
  const frameIndexRef = useRef<number>(0);
  const isMutedRef = useRef<boolean>(false);
  const isInitializedRef = useRef<boolean>(false);
  const hasRealAudioRef = useRef<boolean>(false);

  // Padding in px
  const verticalPadding = 16;
  const canvasHeight = height > 0 ? Math.max(0, height - verticalPadding * 2 - 60) : 220;
  const canvasWidth = 64;

  // Initialize stored frames immediately
  useEffect(() => {
    storedFramesRef.current = initialFrames.map(frame => new Uint8Array(frame));
    frameIndexRef.current = 0;
  }, []);

  // Initialize audio context when video is available
  useEffect(() => {
    if (!videoRef.current || isInitializedRef.current) return;

    const initializeAudio = async () => {
      try {
        // Only create AudioContext if it doesn't exist
        if (!audioContextRef.current) {
          const AudioContextClass = window.AudioContext || window.webkitAudioContext;
          audioContextRef.current = new AudioContextClass();
        }

        // If context is suspended, don't proceed with initialization
        if (audioContextRef.current.state === 'suspended') {
          return;
        }

        const source = audioContextRef.current.createMediaElementSource(videoRef.current!);
        const analyser = audioContextRef.current.createAnalyser();
        const gainNode = audioContextRef.current.createGain();

        // Configure analyser for better visualization
        analyser.fftSize = 256;
        analyser.smoothingTimeConstant = 0.8;

        // Connect nodes - connect analyser directly to destination for visualization
        source.connect(analyser);
        analyser.connect(audioContextRef.current.destination);
        
        // Store references
        audioContexts.set(videoRef.current!, audioContextRef.current);
        mediaElementSources.set(videoRef.current!, source);
        gainNodes.set(videoRef.current!, gainNode);
        analyserRef.current = analyser;

        // Set initial mute state
        isMutedRef.current = videoRef.current?.muted || false;

        // Listen for mute state changes
        videoRef.current?.addEventListener('volumechange', () => {
          isMutedRef.current = videoRef.current?.muted || false;
          if (!isMutedRef.current) {
            // Clear stored frames when unmuted
            storedFramesRef.current = [];
            frameIndexRef.current = 0;
          }
        });

        isInitializedRef.current = true;
      } catch (error) {
        console.error('Error initializing audio:', error);
      }
    };

    // Initialize audio context
    initializeAudio();

    // Cleanup function
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
      }
      isInitializedRef.current = false;
    };
  }, [videoRef]);

  // Add effect to handle user interaction
  useEffect(() => {
    const handleUserInteraction = async () => {
      if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
        try {
          await audioContextRef.current.resume();
        } catch (error) {
          console.error('Error resuming audio context:', error);
        }
      }
    };

    // Listen for user interactions
    document.addEventListener('click', handleUserInteraction);
    document.addEventListener('touchstart', handleUserInteraction);

    return () => {
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
    };
  }, []);

  useEffect(() => {
    if (!videoRef.current) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const drawFrame = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const barHeight = canvas.height / 128;
      const barSpacing = 1;
      const maxWidth = canvas.width * 0.8;
      ctx.fillStyle = 'var(--background)';

      // Always show visualization, even before audio context is ready
      if (!analyserRef.current || !isInitializedRef.current) {
        // Use initial frames if no audio data is available
        if (storedFramesRef.current.length > 0) {
          const frame = storedFramesRef.current[frameIndexRef.current];
          for (let i = 0; i < 128; i++) {
            const barWidth = (frame[i] / 255) * maxWidth;
            const y = i * (barHeight + barSpacing);
            ctx.fillRect(canvas.width - barWidth, y, barWidth, barHeight);
          }
          frameIndexRef.current = (frameIndexRef.current + 1) % storedFramesRef.current.length;
        }
        return;
      }

      if (isPlaying && analyserRef.current) {
        const dataArray = new Uint8Array(128);
        analyserRef.current.getByteFrequencyData(dataArray);

        // Check if we have real audio data
        if (dataArray.some(v => v > 0)) {
          hasRealAudioRef.current = true;
        }

        if (!isMutedRef.current && hasRealAudioRef.current) {
          // When not muted and we have real audio, store frames for later replay
          if (dataArray.some(v => v > 0)) {
            storedFramesRef.current.push(dataArray.slice());
            // Keep only the last 180 frames (about 3 seconds at 60fps)
            if (storedFramesRef.current.length > 180) {
              storedFramesRef.current.shift();
            }
          }
          lastFrameRef.current = dataArray.slice();
        } else {
          // When muted or no real audio yet, replay stored frames
          if (storedFramesRef.current.length > 0) {
            lastFrameRef.current = storedFramesRef.current[frameIndexRef.current];
            frameIndexRef.current = (frameIndexRef.current + 1) % storedFramesRef.current.length;
          }
        }
      }

      // Always draw the current frame
      if (lastFrameRef.current) {
        for (let i = 0; i < 128; i++) {
          const barWidth = (lastFrameRef.current[i] / 255) * maxWidth;
          const y = i * (barHeight + barSpacing);
          ctx.fillRect(canvas.width - barWidth, y, barWidth, barHeight);
        }
      }
    };

    const animate = () => {
      drawFrame();
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [videoRef, canvasHeight, isPlaying]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute left-0 z-20"
      width={canvasWidth}
      height={canvasHeight}
      style={{ 
        pointerEvents: 'none', 
        height: `${canvasHeight}px`, 
        top: `${verticalPadding + 24}px`,
        opacity: 1
      }}
    />
  );
} 