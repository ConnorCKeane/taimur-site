'use client';

import { motion } from 'framer-motion';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

const merchandise = [
  {
    id: 1,
    name: 'TGA Hoodie',
    price: 49.99,
    description: 'Coming Soon',
  },
  {
    id: 2,
    name: 'TGA Hat',
    price: 24.99,
    description: 'Coming Soon',
  },
  {
    id: 3,
    name: 'TGA T-Shirt',
    price: 29.99,
    description: 'Coming Soon',
  },
];

const storeLinks = [
  {
    id: 1,
    name: 'Sweetwater',
    description: 'Use code ',
    code: 'TAIMUR10',
    url: 'https://www.sweetwater.com',
    image: '/Wylde-Audio-logo.png',
  },
  {
    id: 2,
    name: 'Guitar Center',
    description: 'Use code ',
    code: 'TAIMUR15',
    url: 'https://www.guitarcenter.com',
    image: '/schoolofrock-logo.png',
  },
];

export default function ShopPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#E8E8E8] via-[#A4B8D8] via-[#8BA3C8] via-[#A4B8D8] to-[#E8E8E8]">
      <div className="max-w-7xl mx-auto px-4 pt-32 pb-32">
        {/* Hero Section */}
        <motion.div
          className="relative pb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
              Merch & Deals
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-700">
              Shop Taimur Guitar Academy apparel and access exclusive offers from our trusted partners.
            </p>
          </div>
        </motion.div>

        {/* Store Links Section */}
        <motion.div
          className="py-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Use My Code:</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {storeLinks.map((store) => (
              <motion.a
                key={store.id}
                href={store.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#232326] rounded-xl shadow-lg overflow-hidden border border-white/10 block relative group cursor-pointer h-[90px]"
                whileHover={{ y: -5 }}
              >
                <div className="absolute top-3 right-3 text-white/60 group-hover:text-white transition-colors">
                  <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                </div>
                <div className="h-full px-5 py-3">
                  <div className="flex items-center space-x-4 h-full">
                    <div className="w-12 h-12 relative rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={store.image}
                        alt={store.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-lg font-semibold text-white mb-0.5">{store.name}</h3>
                      <p className="text-gray-300 text-sm">
                        {store.description}
                        <span className="text-white font-bold">{store.code}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Divider */}
        <div className="max-w-4xl mx-auto">
          <div className="h-px bg-[#232326] my-12" />
        </div>

        {/* Merchandise Section */}
        <motion.div
          className="py-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {merchandise.map((item) => (
              <motion.div
                key={item.id}
                className="bg-[#232326] rounded-xl shadow-lg overflow-hidden border border-white/10 flex flex-col h-[400px]"
                whileHover={{ y: -5 }}
              >
                <div className="h-[240px] relative bg-gray-700 flex items-center justify-center">
                  <span className="text-gray-400 text-lg">Coming Soon</span>
                </div>
                <div className="p-3 flex flex-col flex-grow">
                  <div className="flex-grow">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-lg font-semibold text-white line-clamp-1">{item.name}</h3>
                      <span className="text-lg font-bold text-white whitespace-nowrap">${item.price}</span>
                    </div>
                    <p className="text-gray-400 text-sm mt-1">{item.description}</p>
                  </div>
                  <div className="mt-2">
                    <button className="w-full px-4 py-1.5 rounded-lg border border-white/30 text-white/30 font-semibold bg-transparent cursor-not-allowed">
                      Coming Soon
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </main>
  );
} 