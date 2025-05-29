'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Loader2, Volume2, VolumeX, Instagram } from 'lucide-react';
import AudioVisualizer from './AudioVisualizer';

interface Reel {
  id: string;
  title: string;
  videoUrl: string;
}

// Using the existing reel1.mp4, reel2.mp4, and new reel3.mp4
const reels: Reel[] = [
  {
    id: '1',
    title: 'Guitar Performance 1',
    videoUrl: '/reels/reel1.mp4',
  },
  {
    id: '2',
    title: 'Guitar Performance 2',
    videoUrl: '/reels/reel2.mp4',
  },
  {
    id: '3',
    title: 'Guitar Performance 3',
    videoUrl: '/reels/reel3.mp4',
  }
];

export default function InstagramReel() {
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(1);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoBoxRef = useRef<HTMLDivElement>(null);
  const [videoBoxHeight, setVideoBoxHeight] = useState(0);
  const preloadedVideos = useRef<HTMLVideoElement[]>([]);

  // Handle user interaction
  const handleUserInteraction = useCallback(() => {
    console.log('[InstagramReel] User interaction detected');
    setHasUserInteracted(true);
  }, []);

  // Add event listeners for user interaction
  useEffect(() => {
    const events = ['touchstart', 'click', 'keydown'];
    events.forEach(event => {
      document.addEventListener(event, handleUserInteraction, { once: true });
    });

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleUserInteraction);
      });
    };
  }, [handleUserInteraction]);

  // Preload next video
  useEffect(() => {
    const nextIndex = (currentIndex + 1) % reels.length;
    const nextVideo = document.createElement('video');
    nextVideo.src = reels[nextIndex].videoUrl;
    nextVideo.preload = 'auto';
    preloadedVideos.current = [nextVideo];
  }, [currentIndex]);

  const handleVideoLoad = async () => {
    const video = videoRef.current;
    if (!video) return;

    try {
      // Always start muted for autoplay
      video.muted = true;
      video.volume = 0;
      setIsMuted(true);
      
      // Try to play the video
      await video.play();
      setIsPlaying(true);
      setIsLoading(false);
    } catch (error) {
      console.error('Error playing video:', error);
      setIsPlaying(false);
      setIsLoading(false);
    }
  };

  // Handle initial load and reel changes
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const loadAndPlay = async () => {
      console.log('[InstagramReel] Loading and playing new video');
      setIsLoading(true);
      video.load();
      
      // Always start muted for autoplay
      video.muted = true;
      video.volume = 0;
      setIsMuted(true);
      
      try {
        await video.play();
        setIsPlaying(true);
        // Trigger user interaction for audio context
        handleUserInteraction();
      } catch (error) {
        console.error('[InstagramReel] Error playing video:', error);
        setIsPlaying(false);
      } finally {
        setIsLoading(false);
      }
    };

    loadAndPlay();
  }, [currentIndex, handleUserInteraction]);

  const togglePlay = async () => {
    const video = videoRef.current;
    if (!video) return;

    try {
      if (isPlaying) {
        console.log('[InstagramReel] Pausing video');
        video.pause();
        setIsPlaying(false);
      } else {
        console.log('[InstagramReel] Playing video');
        await video.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error('[InstagramReel] Error toggling play:', error);
      setIsPlaying(false);
    }
  };

  const toggleMute = async () => {
    const video = videoRef.current;
    if (!video) return;

    console.log('[InstagramReel] Toggle mute:', { 
      currentMuted: isMuted, 
      hasUserInteracted,
      isPlaying,
      videoPaused: video.paused
    });

    const newMutedState = !isMuted;
    
    // Update video state without pausing
    video.muted = newMutedState;
    video.volume = newMutedState ? 0 : 1;
    setIsMuted(newMutedState);
    
    // If we're unmuting and not playing, start playing
    if (!newMutedState && !isPlaying) {
      try {
        console.log('[InstagramReel] Unmuting and playing video');
        await video.play();
        setIsPlaying(true);
      } catch (error) {
        console.error('[InstagramReel] Error playing video after unmute:', error);
        setIsPlaying(false);
      }
    }
  };

  // Add video event listeners
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => {
      console.log('[InstagramReel] Video play event');
      setIsPlaying(true);
      // Trigger user interaction for audio context
      handleUserInteraction();
    };

    const handlePause = () => {
      console.log('[InstagramReel] Video pause event');
      setIsPlaying(false);
    };

    const handleVolumeChange = () => {
      console.log('[InstagramReel] Video volume change event:', {
        muted: video.muted,
        volume: video.volume,
        hasUserInteracted,
        isPlaying
      });
      setIsMuted(video.muted);
    };

    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('volumechange', handleVolumeChange);

    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('volumechange', handleVolumeChange);
    };
  }, [handleUserInteraction, hasUserInteracted]);

  const handleReelChange = (index: number) => {
    setCurrentIndex(index);
    setIsLoading(true);
    setIsPlaying(false);
  };

  useEffect(() => {
    if (videoBoxRef.current) {
      setVideoBoxHeight(videoBoxRef.current.offsetHeight);
    }
  }, [currentIndex, isLoading]);

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Video Demo Box Container with padding for visualization */}
      <div className="relative pl-16" style={{overflow: 'visible'}}>
        {/* Audio Visualizer absolutely positioned to the left, full height of video box */}
        <AudioVisualizer 
          videoRef={videoRef as React.RefObject<HTMLVideoElement>} 
          height={videoBoxHeight} 
          isPlaying={isPlaying}
          hasUserInteracted={hasUserInteracted}
        />
        {/* Video Demo Box */}
        <div 
          ref={videoBoxRef} 
          className="relative w-56 sm:w-72 lg:w-80 aspect-[9/16] rounded-2xl overflow-hidden shadow-lg bg-gray-300 border-4 border-background z-10"
          onClick={handleUserInteraction}
        >
          {/* Video Container */}
          <div className="relative w-full h-full bg-gray-900">
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              playsInline
              loop
              muted={isMuted}
              preload="auto"
              onLoadedData={handleVideoLoad}
              onClick={togglePlay}
            >
              <source src={reels[currentIndex].videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Loading State */}
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <Loader2 className="w-8 h-8 text-white animate-spin" />
              </div>
            )}

            {/* Play/Pause Overlay */}
            {!isLoading && !isPlaying && (
              <div
                className="absolute inset-0 flex items-center justify-center cursor-pointer"
                onClick={togglePlay}
              >
                <div className="w-12 h-12 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            )}

            {/* Volume Toggle Button */}
            <div className="absolute top-3 right-3 flex flex-col items-end gap-2 z-20">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleMute();
                }}
                className="p-2 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-75 transition-opacity"
                id="volume-btn"
                style={{ fontSize: '1.5rem' }}
              >
                {isMuted ? (
                  <VolumeX className="w-6 h-6" />
                ) : (
                  <Volume2 className="w-6 h-6" />
                )}
              </button>
              <a
                href="https://instagram.com/taimurmasud"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-75 transition-opacity"
                onClick={(e) => e.stopPropagation()}
                style={{ fontSize: '1.5rem' }}
              >
                <Instagram className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="flex gap-2 mt-2">
        {reels.map((_, index) => (
          <button
            key={index}
            onClick={() => handleReelChange(index)}
            className={`w-2 h-2 rounded-full transition-all duration-200 ${
              currentIndex === index
                ? 'bg-black scale-125'
                : 'bg-gray-400 hover:bg-gray-600'
            }`}
            aria-label={`Go to reel ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
} 