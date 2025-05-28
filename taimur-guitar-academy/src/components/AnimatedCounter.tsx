'use client';

import { useEffect } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  className?: string;
}

export default function AnimatedCounter({ value, duration = 2, className = '' }: AnimatedCounterProps) {
  const spring = useSpring(0, { stiffness: 50, damping: 20 });
  const displayValue = useTransform(spring, (latest) => Math.floor(latest).toLocaleString());

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          spring.set(0);
          spring.set(value, { duration: duration * 1000 });
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('counter-container');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [value, spring, duration]);

  return (
    <div id="counter-container" className={`min-w-[120px] ${className}`}>
      <motion.span>{displayValue}</motion.span>
    </div>
  );
} 