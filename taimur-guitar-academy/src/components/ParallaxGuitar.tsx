'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function ParallaxGuitar() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.1, 0.2, 0.2, 0.1]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.1, 1]);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        style={{ y, opacity, scale }}
      >
        <svg
          viewBox="0 0 24 24"
          className="w-[800px] h-[800px] text-background/5"
          fill="currentColor"
        >
          <path d="M20.5,3.5c-0.2-0.2-0.5-0.2-0.7,0L17.5,5.8c-0.2,0.2-0.2,0.5,0,0.7l0.7,0.7c0.2,0.2,0.5,0.2,0.7,0l2.3-2.3 C20.7,4,20.7,3.7,20.5,3.5z M16.8,7.2l-0.7-0.7c-0.2-0.2-0.5-0.2-0.7,0L13.1,9.2c-0.2,0.2-0.2,0.5,0,0.7l0.7,0.7 c0.2,0.2,0.5,0.2,0.7,0l2.3-2.3C17,7.7,17,7.4,16.8,7.2z M13.1,10.9l-0.7-0.7c-0.2-0.2-0.5-0.2-0.7,0L9.4,12.9c-0.2,0.2-0.2,0.5,0,0.7 l0.7,0.7c0.2,0.2,0.5,0.2,0.7,0l2.3-2.3C13.3,11.4,13.3,11.1,13.1,10.9z M9.4,14.6l-0.7-0.7c-0.2-0.2-0.5-0.2-0.7,0L5.7,16.6 c-0.2,0.2-0.2,0.5,0,0.7l0.7,0.7c0.2,0.2,0.5,0.2,0.7,0l2.3-2.3C9.6,15.1,9.6,14.8,9.4,14.6z M5.7,18.3l-0.7-0.7 c-0.2-0.2-0.5-0.2-0.7,0L2,20.3c-0.2,0.2-0.2,0.5,0,0.7l0.7,0.7c0.2,0.2,0.5,0.2,0.7,0l2.3-2.3C5.9,18.8,5.9,18.5,5.7,18.3z M2,22 l-0.7-0.7c-0.2-0.2-0.5-0.2-0.7,0L0.3,22.3c-0.2,0.2-0.2,0.5,0,0.7l0.7,0.7c0.2,0.2,0.5,0.2,0.7,0L2,22.7C2.2,22.5,2.2,22.2,2,22z" />
        </svg>
      </motion.div>
    </div>
  );
} 