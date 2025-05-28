'use client';

import { useState, useRef, useEffect } from 'react';
import { Loader2, Volume2, VolumeX, ChevronLeft, ChevronRight, Instagram } from 'lucide-react';

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
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleVideoLoad = () => {
    setIsLoading(false);
    // Start playing when video is loaded
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? reels.length - 1 : prev - 1));
    setIsLoading(true);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === reels.length - 1 ? 0 : prev + 1));
    setIsLoading(true);
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      // Ensure video plays when component mounts or when reel changes
      videoRef.current.play();
    }
    setIsPlaying(true);
  }, [currentIndex]);

  return (
    <div className="flex items-center justify-center gap-4">
      {/* Left Arrow (completely outside) */}
      <button
        onClick={handlePrev}
        className="p-2 rounded-full focus:outline-none z-20"
        style={{ color: 'var(--background)', background: 'none' }}
        aria-label="Previous Reel"
      >
        <ChevronLeft className="w-7 h-7" />
      </button>

      {/* Video Demo Box */}
      <div className="relative w-56 sm:w-72 lg:w-80 aspect-[9/16] rounded-2xl overflow-hidden shadow-lg bg-gray-300 border-2 border-background z-10">
        {/* Video Container */}
        <div className="relative w-full h-full bg-gray-900">
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            playsInline
            loop
            autoPlay
            muted={isMuted}
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

          {/* Instagram Link */}
          <a
            href="https://instagram.com/taimurmasud"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute top-3 left-3 p-1.5 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-75 transition-opacity"
            onClick={(e) => e.stopPropagation()}
          >
            <Instagram className="w-4 h-4" />
          </a>

          {/* Volume Toggle Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleMute();
            }}
            className="absolute top-3 right-3 p-1.5 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-75 transition-opacity"
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Instagram Handle */}
      <div className="absolute -bottom-5 right-16 text-black text-xs font-medium">
        @taimurmasud
      </div>

      {/* Right Arrow (completely outside) */}
      <button
        onClick={handleNext}
        className="p-2 rounded-full focus:outline-none z-20"
        style={{ color: 'var(--background)', background: 'none' }}
        aria-label="Next Reel"
      >
        <ChevronRight className="w-7 h-7" />
      </button>
    </div>
  );
} 