import { useEffect, useRef, useState } from 'react';

type AudioState = 'init' | 'ready' | 'error';

interface UseAudioAnalyserOptions {
  onStateChange?: (state: AudioState) => void;
}

// Keep track of created contexts and sources per video element
const audioContexts = new WeakMap<HTMLVideoElement, AudioContext>();
const mediaElementSources = new WeakMap<HTMLVideoElement, MediaElementAudioSourceNode>();
const gainNodes = new WeakMap<HTMLVideoElement, GainNode>();
const analyserNodes = new WeakMap<HTMLVideoElement, AnalyserNode>();

export function useAudioAnalyser(
  video: HTMLVideoElement | null,
  { onStateChange }: UseAudioAnalyserOptions = {}
): AnalyserNode | null {
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);
  const hasUserInteractedRef = useRef(false);
  const isInitializedRef = useRef(false);
  const initializationPromiseRef = useRef<Promise<void> | null>(null);

  useEffect(() => {
    if (!video) {
      setAnalyser(null);
      return;
    }

    let audioContext: AudioContext | null = null;
    let mediaSource: MediaElementAudioSourceNode | null = null;
    let gainNode: GainNode | null = null;
    let analyserNode: AnalyserNode | null = null;

    const initializeAudio = async () => {
      if (isInitializedRef.current) {
        return;
      }

      if (initializationPromiseRef.current) {
        await initializationPromiseRef.current;
        return;
      }

      isInitializedRef.current = true;

      initializationPromiseRef.current = (async () => {
        try {
          const AudioContextClass = window.AudioContext || window.webkitAudioContext;
          audioContext = audioContexts.get(video) || new AudioContextClass({
            sampleRate: 44100,
            latencyHint: 'interactive'
          });

          if (audioContext.state === 'suspended') {
            await audioContext.resume();
          }

          if (mediaElementSources.has(video)) {
            analyserNode = analyserNodes.get(video)!;
            mediaSource = mediaElementSources.get(video)!;
            gainNode = gainNodes.get(video)!;
          } else {
            try {
              // Create new audio graph
              mediaSource = audioContext.createMediaElementSource(video);
              analyserNode = audioContext.createAnalyser();
              gainNode = audioContext.createGain();

              analyserNode.fftSize = 256;
              analyserNode.smoothingTimeConstant = 0.7;

              // Create a gain node for the analyzer to ensure consistent signal
              const analyserGain = audioContext.createGain();
              analyserGain.gain.value = 1; // Always keep analyzer gain at 1

              // Create a splitter to ensure analyzer gets full signal
              const splitter = audioContext.createChannelSplitter(2);
              mediaSource.connect(splitter);
              
              // Connect splitter to analyzer path (always active)
              splitter.connect(analyserGain, 0);
              analyserGain.connect(analyserNode);
              
              // Connect splitter to audio output path (controlled by mute)
              splitter.connect(gainNode, 1);
              gainNode.connect(audioContext.destination);

              // Store references
              audioContexts.set(video, audioContext);
              mediaElementSources.set(video, mediaSource);
              gainNodes.set(video, gainNode);
              analyserNodes.set(video, analyserNode);

              // Set gain based on video's mute state
              gainNode.gain.value = video.muted ? 0 : 1;

              const handleVolumeChange = () => {
                if (gainNode) {
                  gainNode.gain.value = video.muted ? 0 : 1;
                  console.log('[Audio] Volume state changed:', {
                    muted: video.muted,
                    gain: gainNode.gain.value,
                    contextState: audioContext?.state,
                    analyserConnected: analyserNode?.numberOfInputs > 0,
                    mediaSourceConnected: mediaSource?.numberOfOutputs > 0,
                    analyserGain: analyserGain.gain.value,
                    splitterConnected: splitter.numberOfOutputs > 0
                  });
                }
              };

              video.addEventListener('volumechange', handleVolumeChange);

              setAnalyser(analyserNode);
              onStateChange?.('ready');

              // Log initial audio graph state
              console.log('[Audio] Graph initialized:', {
                contextState: audioContext.state,
                analyserConnected: analyserNode?.numberOfInputs > 0,
                mediaSourceConnected: mediaSource?.numberOfOutputs > 0,
                gainValue: gainNode.gain.value,
                videoMuted: video.muted,
                videoPaused: video.paused,
                videoReadyState: video.readyState,
                analyserGain: analyserGain.gain.value,
                splitterConnected: splitter.numberOfOutputs > 0
              });
            } catch (error) {
              console.error('[Audio] Error creating audio graph:', error);
              onStateChange?.('error');
              throw error;
            }
          }
        } catch (error) {
          console.error('[Audio] Initialization error:', error);
          onStateChange?.('error');
          isInitializedRef.current = false;
          throw error;
        } finally {
          initializationPromiseRef.current = null;
        }
      })();

      return initializationPromiseRef.current;
    };

    const handleUserInteraction = async () => {
      if (hasUserInteractedRef.current) return;
      hasUserInteractedRef.current = true;

      try {
        await initializeAudio();
      } catch (error) {
        console.error('[Audio] User interaction error:', error);
        onStateChange?.('error');
      }
    };

    document.addEventListener('pointerdown', handleUserInteraction);
    document.addEventListener('touchstart', handleUserInteraction);

    if (video.readyState >= 2) {
      initializeAudio();
    } else {
      const handleVideoLoad = () => {
        if (video.readyState >= 2) {
          console.log('[Audio] Video ready for initialization:', {
            readyState: video.readyState,
            muted: video.muted,
            paused: video.paused
          });
          initializeAudio();
        }
      };
      video.addEventListener('loadeddata', handleVideoLoad);
      video.addEventListener('canplay', handleVideoLoad);

      return () => {
        video.removeEventListener('loadeddata', handleVideoLoad);
        video.removeEventListener('canplay', handleVideoLoad);
      };
    }

    return () => {
      document.removeEventListener('pointerdown', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);

      if (mediaSource) {
        mediaSource.disconnect();
      }
      if (gainNode) {
        gainNode.disconnect();
      }
      if (analyserNode) {
        analyserNode.disconnect();
      }
      if (audioContext && !audioContexts.has(video)) {
        audioContext.close();
      }
      isInitializedRef.current = false;
      initializationPromiseRef.current = null;
    };
  }, [video, onStateChange]);

  return analyser;
} 