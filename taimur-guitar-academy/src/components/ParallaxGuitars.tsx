'use client';

import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface GuitarIcon {
  id: number;
  x: string;
  y: string;
  scale: number;
  rotation: number;
  speed: number;
}

const guitarIcons: GuitarIcon[] = [
  { id: 1, x: '10%', y: '20%', scale: 0.8, rotation: -15, speed: 0.2 },
  { id: 2, x: '75%', y: '40%', scale: 1, rotation: 10, speed: 0.15 },
  { id: 3, x: '25%', y: '70%', scale: 0.9, rotation: -5, speed: 0.25 },
  { id: 4, x: '85%', y: '85%', scale: 0.7, rotation: 20, speed: 0.18 },
];

export default function ParallaxGuitars() {
  const { scrollY } = useScroll();
  const [isMobile, setIsMobile] = useState(false);

  // Create individual transforms for each icon
  const transform1 = useTransform(scrollY, [0, 1000], [0, -1000 * guitarIcons[0].speed]);
  const transform2 = useTransform(scrollY, [0, 1000], [0, -1000 * guitarIcons[1].speed]);
  const transform3 = useTransform(scrollY, [0, 1000], [0, -1000 * guitarIcons[2].speed]);
  const transform4 = useTransform(scrollY, [0, 1000], [0, -1000 * guitarIcons[3].speed]);

  const transforms = [transform1, transform2, transform3, transform4];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Filter icons for mobile view
  const displayIcons = isMobile ? guitarIcons.slice(0, 2) : guitarIcons;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {displayIcons.map((icon, index) => (
        <motion.div
          key={icon.id}
          className="absolute"
          style={{
            left: icon.x,
            top: icon.y,
            y: transforms[index],
            opacity: 0.08,
            willChange: 'transform',
          }}
          animate={{
            rotate: [icon.rotation - 2, icon.rotation + 2],
            opacity: [0.06, 0.1, 0.06],
          }}
          transition={{
            rotate: {
              duration: 4,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
            },
            opacity: {
              duration: 3,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
            },
          }}
        >
          <img
            src="/guitar-icon.svg"
            alt="Guitar icon"
            className="w-auto h-auto"
            style={{
              transform: `scale(${icon.scale})`,
              width: '100px',
              height: '100px',
            }}
          />
        </motion.div>
      ))}
    </div>
  );
} 