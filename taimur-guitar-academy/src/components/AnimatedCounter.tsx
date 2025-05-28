'use client';

import { motion, useSpring, useTransform } from 'framer-motion';
import { useEffect } from 'react';

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  duration?: number;
}

export default function AnimatedCounter({ value, suffix = '', duration = 2 }: AnimatedCounterProps) {
  const spring = useSpring(0, {
    stiffness: 50,
    damping: 20,
    duration: duration * 1000,
  });

  useEffect(() => {
    spring.set(value);
  }, [value, spring]);

  const displayValue = useTransform(spring, (latest) => {
    if (latest >= 1000000) {
      return `${(latest / 1000000).toFixed(1)}M`;
    } else if (latest >= 1000) {
      return `${(latest / 1000).toFixed(1)}K`;
    }
    return Math.round(latest).toString();
  });

  return (
    <motion.span>
      {displayValue.get()}
      {suffix}
    </motion.span>
  );
} 