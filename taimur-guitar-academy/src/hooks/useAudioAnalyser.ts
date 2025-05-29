import { useEffect, useRef, useState } from 'react';

type AudioState = 'init' | 'ready' | 'error';

interface UseAudioAnalyserOptions {
  onStateChange?: (state: AudioState) => void;
}

export function useAudioAnalyser(
  video: HTMLVideoElement | null,
  { onStateChange }: UseAudioAnalyserOptions = {}
): AnalyserNode | null {
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);
  const hasUserInteractedRef = useRef(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioGraphRef = useRef<{ analyser: AnalyserNode; source: MediaElementAudioSourceNode } | null>(null);

  // Handle video state changes
  useEffect(() => {
    if (!video) return;

    const handlePlayStateChange = () => {
      console.log('[Audio] Video play state changed:', {
        playing: !video.paused,
        muted: video.muted,
        volume: video.volume,
        hasUserInteracted: hasUserInteractedRef.current,
        hasAudioContext: !!audioContextRef.current,
        hasAudioGraph: !!audioGraphRef.current
      });

      // If video is playing and we have an audio context, ensure it's running
      if (!video.paused && audioContextRef.current?.state === 'suspended') {
        console.log('[Audio] Resuming suspended audio context');
        audioContextRef.current.resume().catch(console.error);
      }
    };

    const handleVolumeChange = () => {
      console.log('[Audio] Volume state changing:', {
        muted: video.muted,
        volume: video.volume,
        hasUserInteracted: hasUserInteractedRef.current,
        hasAudioContext: !!audioContextRef.current,
        hasAudioGraph: !!audioGraphRef.current
      });

      // If unmuting and we have an audio context, ensure it's running
      if (!video.muted && audioContextRef.current?.state === 'suspended') {
        console.log('[Audio] Resuming audio context after unmute');
        audioContextRef.current.resume().catch(console.error);
      }
    };

    video.addEventListener('play', handlePlayStateChange);
    video.addEventListener('pause', handlePlayStateChange);
    video.addEventListener('volumechange', handleVolumeChange);

    return () => {
      video.removeEventListener('play', handlePlayStateChange);
      video.removeEventListener('pause', handlePlayStateChange);
      video.removeEventListener('volumechange', handleVolumeChange);
    };
  }, [video]);

  // Initialize audio context and graph
  useEffect(() => {
    if (!video) return;

    const initializeAudio = async () => {
      try {
        console.log('[Audio] Starting initialization:', {
          videoReady: video.readyState >= 2,
          hasUserInteracted: hasUserInteractedRef.current,
          hasAudioContext: !!audioContextRef.current,
          hasAudioGraph: !!audioGraphRef.current
        });

        // Only initialize if we have user interaction or video is ready
        if (!hasUserInteractedRef.current && video.readyState < 2) {
          console.log('[Audio] Waiting for user interaction or video ready state');
          return;
        }

        // Create or reuse audio context
        if (!audioContextRef.current) {
          console.log('[Audio] Creating new audio context');
          const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
          audioContextRef.current = new AudioContextClass();
        } else {
          console.log('[Audio] Reusing existing audio context');
          if (audioContextRef.current.state === 'suspended') {
            await audioContextRef.current.resume();
          }
        }

        // Create or reuse audio graph
        if (!audioGraphRef.current) {
          console.log('[Audio] Creating new audio graph');
          const analyser = audioContextRef.current.createAnalyser();
          analyser.fftSize = 256;
          analyser.smoothingTimeConstant = 0.8;

          const source = audioContextRef.current.createMediaElementSource(video);
          
          // Create a gain node for the analyzer to ensure consistent signal
          const analyserGain = audioContextRef.current.createGain();
          analyserGain.gain.value = 1; // Always keep analyzer gain at 1

          // Create a splitter to ensure analyzer gets full signal
          const splitter = audioContextRef.current.createChannelSplitter(2);
          source.connect(splitter);
          
          // Connect splitter to analyzer path (always active)
          splitter.connect(analyserGain, 0);
          analyserGain.connect(analyser);
          
          // Connect splitter to audio output path (controlled by mute)
          splitter.connect(audioContextRef.current.destination, 1);

          audioGraphRef.current = { analyser, source };
          setAnalyser(analyser);
        } else {
          console.log('[Audio] Reusing existing audio graph');
        }

        // Ensure audio context is running
        if (audioContextRef.current.state === 'suspended') {
          console.log('[Audio] Resuming audio context');
          await audioContextRef.current.resume();
        }

        onStateChange?.('ready');
      } catch (error) {
        console.error('[Audio] Error initializing audio:', error);
        onStateChange?.('error');
      }
    };

    initializeAudio();
  }, [video, onStateChange]);

  // Handle user interaction
  useEffect(() => {
    if (!video || hasUserInteractedRef.current) return;

    const handleUserInteraction = async () => {
      console.log('[Audio] User interaction detected');
      hasUserInteractedRef.current = true;

      if (audioContextRef.current?.state === 'suspended') {
        console.log('[Audio] Resuming audio context after user interaction');
        try {
          await audioContextRef.current.resume();
          onStateChange?.('ready');
        } catch (error) {
          console.error('[Audio] Error resuming audio context:', error);
          onStateChange?.('error');
        }
      }
    };

    const events = ['touchstart', 'click', 'keydown'];
    events.forEach(event => {
      document.addEventListener(event, handleUserInteraction, { once: true });
    });

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleUserInteraction);
      });
    };
  }, [video, onStateChange]);

  return analyser;
} 