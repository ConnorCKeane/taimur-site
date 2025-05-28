import React from 'react';

interface GuitarParallaxIconProps {
  className?: string;
  style?: React.CSSProperties;
  color?: string;
  opacity?: number;
}

export default function GuitarParallaxIcon({ className = '', style = {}, color = '#9CA3AF', opacity = 0.08 }: GuitarParallaxIconProps) {
  return (
    <svg
      viewBox="0 0 800 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ ...style, color, opacity }}
    >
      <g stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {/* Body */}
        <path d="M400 100 C 440 100, 460 80, 460 40 C 460 0, 440 -20, 400 -20 C 360 -20, 340 0, 340 40 C 340 80, 360 100, 400 100" />
        {/* Sound Hole */}
        <circle cx="400" cy="40" r="20" />
        {/* Neck */}
        <path d="M390 -20 L390 -120" />
        <path d="M410 -20 L410 -120" />
        {/* Headstock */}
        <path d="M370 -120 L430 -120" />
        <path d="M380 -120 L380 -160" />
        <path d="M420 -120 L420 -160" />
        {/* Tuning Pegs */}
        <circle cx="380" cy="-150" r="5" />
        <circle cx="420" cy="-150" r="5" />
        {/* Bridge */}
        <path d="M380 100 L420 100" />
      </g>
    </svg>
  );
} 