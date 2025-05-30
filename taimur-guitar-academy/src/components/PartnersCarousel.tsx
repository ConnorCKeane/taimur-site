import { motion } from 'framer-motion';
import Image from 'next/image';
import React from 'react';
import { Users2, Eye, Heart } from 'lucide-react';

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
      <div className="w-full max-w-3xl rounded-3xl bg-[#232326] bg-opacity-90 shadow-2xl px-0 pt-8 pb-10 flex flex-col items-center border border-white/10 overflow-hidden relative">
        {/* Call to Action Above Carousel */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">Become a Sponsor</h3>
          <p className="text-white/90 mb-5 max-w-lg mx-auto text-base font-medium">
            Put your product in front of thousands of passionate musicians and students.<br />

          </p>
          <button
            type="button"
            onClick={onContactClick}
            className="inline-block rounded-md bg-transparent px-5 py-2 text-base font-semibold text-white border border-white shadow-[0_0_10px_rgba(255,255,255,0.2)] hover:shadow-[0_0_15px_rgba(255,255,255,0.3)] transition-all duration-300"
          >
            Get In Touch
          </button>
        </div>
        {/* Animated Carousel */}
        <div className="relative w-full overflow-hidden pt-2">
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
        {/* Stats Row Below Carousel */}
        <div className="w-full flex flex-row justify-center items-center gap-8 mt-10">
          <div className="flex items-center gap-2 text-white/80 text-base font-semibold text-center">
            <Users2 className="w-5 h-5" />
            160,000+ <span className="font-normal">followers</span>
          </div>
          <div className="flex items-center gap-2 text-white/80 text-base font-semibold text-center">
            <Eye className="w-5 h-5" />
            100,000,000+ <span className="font-normal">views</span>
          </div>
          <div className="flex items-center gap-2 text-white/80 text-base font-semibold text-center">
            <Heart className="w-5 h-5" />
            45,000,000+ <span className="font-normal">likes</span>
          </div>
        </div>
      </div>
    </div>
  );
} 