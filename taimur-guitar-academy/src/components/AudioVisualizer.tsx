'use client';

import { useEffect, useRef } from 'react';

interface AudioVisualizerProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  height: number;
  gain: number; // 0 for muted, 1 for unmuted
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

export default function AudioVisualizer({ videoRef, height, gain }: AudioVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number>(0);
  const phaseRef = useRef<number>(0);
  const lastSimDataRef = useRef<number[]>([]);
  const lastFrameRef = useRef<Uint8Array | null>(null);

  // Padding in px
  const verticalPadding = 16;
  const canvasHeight = height > 0 ? Math.max(0, height - verticalPadding * 2) : 400;
  const canvasWidth = 64;

  useEffect(() => {
    if (!videoRef.current) return;

    // Setup audio context, analyser, and gain node only once
    let analyser: AnalyserNode | null = null;
    let bufferLength = 128;
    let dataArray: Uint8Array = new Uint8Array(bufferLength);
    let audioContext: AudioContext | undefined;
    let source: MediaElementAudioSourceNode | undefined;
    let gainNode: GainNode | undefined;

    try {
      // Get or create AudioContext
      if (audioContexts.has(videoRef.current)) {
        audioContext = audioContexts.get(videoRef.current)!;
      } else {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        audioContext = new AudioContextClass();
        audioContexts.set(videoRef.current, audioContext);
      }
      // Get or create MediaElementSource
      if (mediaElementSources.has(videoRef.current)) {
        source = mediaElementSources.get(videoRef.current)!;
      } else {
        source = audioContext.createMediaElementSource(videoRef.current);
        mediaElementSources.set(videoRef.current, source);
      }
      // Create analyser with more bars
      analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
      bufferLength = analyser.frequencyBinCount;
      dataArray = new Uint8Array(bufferLength);
      // Get or create GainNode
      if (gainNodes.has(videoRef.current)) {
        gainNode = gainNodes.get(videoRef.current)!;
      } else {
        gainNode = audioContext.createGain();
        gainNodes.set(videoRef.current, gainNode);
      }
      // Connect: source -> analyser -> gain -> destination
      source.disconnect();
      analyser.disconnect();
      gainNode.disconnect();
      source.connect(analyser);
      analyser.connect(gainNode);
      gainNode.connect(audioContext.destination);
      analyserRef.current = analyser;
      // Set gain value
      gainNode.gain.value = gain;
    } catch (error) {
      console.error('Error setting up audio context:', error);
    }

    // --- Add event listeners to freeze visualizer on pause ---
    const handlePause = () => {
      if (analyser) {
        analyser.getByteFrequencyData(dataArray);
        if (dataArray.some(v => v > 0)) {
          lastFrameRef.current = dataArray.slice();
        }
      }
    };
    const video = videoRef.current;
    video.addEventListener('pause', handlePause);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const drawFrame = (simData?: number[]) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const barHeight = canvas.height / bufferLength;
      const barSpacing = 1;
      const maxWidth = canvas.width * 0.8;
      ctx.fillStyle = 'var(--background)';

      const playing = !videoRef.current?.paused && !videoRef.current?.ended;
      if (playing && analyser) {
        analyser.getByteFrequencyData(dataArray);
        console.log('Analyser data:', Array.from(dataArray));
        // Only save if not all zeros
        if (dataArray.some(v => v > 0)) {
          console.log('Saving last non-zero frame');
          lastFrameRef.current = dataArray.slice();
        }
        console.log('Drawing new analyser data');
        for (let i = 0; i < bufferLength; i++) {
          const barWidth = (dataArray[i] / 255) * maxWidth;
          const y = i * (barHeight + barSpacing);
          ctx.fillRect(canvas.width - barWidth, y, barWidth, barHeight);
        }
      } else if (lastFrameRef.current) {
        console.log('Drawing last saved frame (paused)');
        // Draw the last saved frame
        for (let i = 0; i < bufferLength; i++) {
          const barWidth = (lastFrameRef.current[i] / 255) * maxWidth;
          const y = i * (barHeight + barSpacing);
          ctx.fillRect(canvas.width - barWidth, y, barWidth, barHeight);
        }
      } else {
        // Simulate music: short peaks/valleys, slower
        let simValues: number[] = simData || [];
        if (!simData) {
          if (playing) {
            phaseRef.current += 0.04;
            simValues = [];
            for (let i = 0; i < bufferLength; i++) {
              const sine = Math.sin(phaseRef.current + i * 0.7);
              const random = 0.85 + 0.15 * Math.sin(phaseRef.current * 2 + i * 1.2 + Math.random());
              const value = 0.18 + 0.10 * sine * random;
              simValues.push(value);
            }
            lastSimDataRef.current = simValues;
          } else {
            simValues = lastSimDataRef.current;
          }
        }
        for (let i = 0; i < bufferLength; i++) {
          const value = simValues[i] ?? 0.6;
          const barWidth = value * maxWidth;
          const y = i * (barHeight + barSpacing);
          ctx.fillRect(canvas.width - barWidth, y, barWidth, barHeight);
        }
      }
    };

    const animate = () => {
      drawFrame(); // Always draw (either new or last frame)
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (video) {
        video.removeEventListener('pause', handlePause);
      }
    };
  }, [videoRef, canvasHeight, gain]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute left-0 z-20"
      width={canvasWidth}
      height={canvasHeight}
      style={{ pointerEvents: 'none', height: `${canvasHeight}px`, top: `${verticalPadding + 24}px` }}
    />
  );
} 