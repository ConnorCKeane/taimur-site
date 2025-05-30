'use client';

// import { motion } from 'framer-motion';
import { FilmIcon, AcademicCapIcon, MagnifyingGlassIcon, UsersIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

const songs = [
  {
    id: 1,
    title: 'Stairway to Heaven',
    artist: 'Led Zeppelin',
    price: 9.99,
    description: 'Master every nuance of this classic with Taimur\'s step-by-step video playlist. Perfect for intermediate and advanced players.',
    audio: '/audio/stairway.mp3',
    image: '/guitar-icon.svg',
  },
  {
    id: 2,
    title: 'Hotel California',
    artist: 'Eagles',
    price: 9.99,
    description: 'Unlock the secrets to the iconic solos and rhythms. Taimur breaks it down in detail for you.',
    audio: '/audio/hotelcalifornia.mp3',
    image: '/guitar-icon.svg',
  },
  {
    id: 3,
    title: 'Sweet Child O\' Mine',
    artist: 'Guns N\' Roses',
    price: 9.99,
    description: 'From intro to outro, learn every lick and riff with Taimur\'s in-depth video course.',
    audio: '/audio/sweetchild.mp3',
    image: '/guitar-icon.svg',
  },
];

export default function ShopPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#E8E8E8] via-[#A4B8D8] via-[#8BA3C8] via-[#A4B8D8] to-[#E8E8E8]">
      <div className="max-w-5xl mx-auto px-4 pt-32 pb-32">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl mb-4">
            Master a Song
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-gray-700">
            Master your favorite songs with step-by-step video courses and real playthroughs by Taimur.
          </p>
        </div>
        {/* Timeline Graphic: What to Expect */}
        <div className="w-full mb-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 w-full">
            {/* Intro & Song Overview */}
            <div className="rounded-xl overflow-hidden py-1 px-2 flex flex-col items-center text-center min-w-0 flex-1 max-w-xs">
              <div className="flex items-center justify-center mb-1">
                <FilmIcon className="h-7 w-7 md:h-8 md:w-8 text-black" />
              </div>
              <h3 className="text-xs md:text-sm lg:text-base font-semibold text-black leading-tight">Intro & Song Overview</h3>
              <p className="text-[10px] md:text-xs text-gray-800 leading-tight">Get inspired and see what you&apos;ll learn</p>
            </div>
            {/* Step-by-Step Lessons */}
            <div className="rounded-xl overflow-hidden py-1 px-2 flex flex-col items-center text-center min-w-0 flex-1 max-w-xs">
              <div className="flex items-center justify-center mb-1">
                <AcademicCapIcon className="h-7 w-7 md:h-8 md:w-8 text-black" />
              </div>
              <h3 className="text-xs md:text-sm lg:text-base font-semibold text-black leading-tight">Step-by-Step Lessons</h3>
              <p className="text-[10px] md:text-xs text-gray-800 leading-tight">Breakdowns of every section, riff, and solo</p>
            </div>
            {/* Close-Up Technique */}
            <div className="rounded-xl overflow-hidden py-1 px-2 flex flex-col items-center text-center min-w-0 flex-1 max-w-xs">
              <div className="flex items-center justify-center mb-1">
                <MagnifyingGlassIcon className="h-7 w-7 md:h-8 md:w-8 text-black" />
              </div>
              <h3 className="text-xs md:text-sm lg:text-base font-semibold text-black leading-tight">Close-Up Technique</h3>
              <p className="text-[10px] md:text-xs text-gray-800 leading-tight">See finger placement and picking up close</p>
            </div>
            {/* Play-Along & Tips */}
            <div className="rounded-xl overflow-hidden py-1 px-2 flex flex-col items-center text-center min-w-0 flex-1 max-w-xs">
              <div className="flex items-center justify-center mb-1">
                <UsersIcon className="h-7 w-7 md:h-8 md:w-8 text-black" />
              </div>
              <h3 className="text-xs md:text-sm lg:text-base font-semibold text-black leading-tight">Play-Along & Tips</h3>
              <p className="text-[10px] md:text-xs text-gray-800 leading-tight">Jam with Taimur and get pro advice</p>
            </div>
          </div>
        </div>
        {/* Course Cards Grid */}
        <div className="w-full mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {songs.map((song) => (
              <div key={song.id} className="bg-[#232326] rounded-2xl shadow-md border border-white/10 flex flex-col overflow-hidden">
                {/* Image on top */}
                <div className="relative w-full h-40 bg-[#232326] flex items-center justify-center">
                  <Image src={song.image} alt={song.title} fill className="object-contain p-6" />
                </div>
                {/* Content below */}
                <div className="flex flex-col gap-2 p-5 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-lg font-bold text-white leading-tight truncate mb-0">{song.title}</h2>
                    <span className="text-sm text-gray-300 font-normal truncate">by {song.artist}</span>
                  </div>
                  <div className="text-xs text-white/80 mb-2">8 videos: step-by-step, close-up, play-along</div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-base font-semibold text-white">${song.price.toFixed(2)}</span>
                    <span className="text-gray-400 text-xs">/course</span>
                  </div>
                  <button className="mt-4 px-4 py-2 rounded-md text-white font-semibold bg-transparent border border-white shadow-[0_0_10px_rgba(255,255,255,0.2)] hover:shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:bg-white/10 transition text-base w-full">
                    Buy Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
} 