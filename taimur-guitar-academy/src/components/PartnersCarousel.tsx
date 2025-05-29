import { motion } from 'framer-motion';
import Image from 'next/image';
import React from 'react';

const partners = [
  {
    name: 'School of Rock',
    logo: '/schoolofrock-logo.png',
    width: 120,
    height: 48,
  },
  {
    name: 'Wylde Audio',
    logo: '/Wylde-Audio-logo.png',
    width: 120,
    height: 48,
  },
  {
    name: 'Tagima',
    logo: '/Logo-Tagima.png',
    width: 180,
    height: 72,
  },
];

type PartnersCarouselProps = {
  onContactClick?: () => void;
};

export default function PartnersCarousel({ onContactClick }: PartnersCarouselProps) {
  // Duplicate the partners array to make the carousel seamless
  const carouselPartners = [...partners, ...partners, ...partners];

  return (
    <div className="flex justify-center w-full py-8">
      <div className="w-full max-w-3xl rounded-3xl bg-[#232326] bg-opacity-90 shadow-2xl px-6 py-8 flex flex-col items-center border border-white/10">
        {/* Call to Action Above Carousel */}
        <div className="text-center mb-6">
          <h3 className="text-xl font-semibold text-white mb-2">Become a Partner</h3>
          <p className="text-white/90 mb-4 max-w-md mx-auto">
            Join our network of premium partners and connect with passionate musicians and students.
          </p>
          <button
            type="button"
            onClick={onContactClick}
            className="inline-block rounded-md bg-transparent px-4 py-2 text-sm font-semibold text-white border border-white shadow-[0_0_10px_rgba(255,255,255,0.2)] hover:shadow-[0_0_15px_rgba(255,255,255,0.3)] transition-all duration-300"
          >
            Partner With Me
          </button>
        </div>
        {/* Animated Carousel */}
        <div className="relative w-full overflow-hidden">
          <motion.div
            className="flex gap-12 items-center"
            animate={{ x: [0, -((carouselPartners.length / 2) * 180)] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: 'loop',
                duration: 30,
                ease: 'linear',
              },
            }}
          >
            {carouselPartners.map((partner, index) => (
              <div
                key={index}
                className="flex-shrink-0 flex items-center justify-center h-20 w-44 bg-white/10 rounded-lg shadow-md mx-2"
                style={{ minWidth: 160 }}
              >
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={partner.width}
                  height={partner.height}
                  className="object-contain"
                  style={{ maxHeight: 56, maxWidth: '100%' }}
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
} 