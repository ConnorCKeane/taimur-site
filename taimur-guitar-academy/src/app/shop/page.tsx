'use client';

// import { motion } from 'framer-motion';
import { SpeakerWaveIcon, FilmIcon, AcademicCapIcon, MagnifyingGlassIcon, UsersIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { useRef } from 'react';

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
  const audioRefs = useRef<(HTMLAudioElement | null)[]>([]);

  const handlePlay = (idx: number) => {
    audioRefs.current.forEach((audio, i) => {
      if (audio && i !== idx) audio.pause();
    });
    const audio = audioRefs.current[idx];
    if (audio) {
      audio.currentTime = 0;
      audio.play();
    }
  };

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
        <div className="w-full overflow-x-auto mb-10">
          <div className="flex flex-row gap-2 w-full min-w-0">
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
        {/* Divider intentionally removed for a cleaner look */}
        <div className="w-full overflow-x-auto mb-10">
          <div className="flex flex-row gap-6 w-full min-w-0">
            {songs.map((song, idx) => (
              <div key={song.id} className="bg-[#232326] rounded-2xl shadow-xl border border-white/10 flex flex-row h-[140px] sm:h-[170px] min-w-[480px] max-w-lg overflow-hidden">
                {/* Image on the left */}
                <div className="relative h-full w-2/5 min-w-[140px] max-w-[200px]">
                  <Image src={song.image} alt={song.title} fill className="object-cover h-full w-full rounded-l-2xl" style={{objectFit: 'cover', borderTopRightRadius: 0, borderBottomRightRadius: 0}} />
                </div>
                {/* Content on the right */}
                <div className="flex flex-col justify-center flex-1 p-4 gap-2">
                  <div className="flex items-center justify-between w-full">
                    <div className="flex flex-col items-start">
                      <h2 className="text-lg font-bold text-white leading-tight truncate">{song.title}</h2>
                      <h3 className="text-sm text-gray-300 leading-tight m-0 truncate">by {song.artist}</h3>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-lg font-semibold text-white">${song.price.toFixed(2)}</span>
                      <span className="text-gray-400 text-xs">/course</span>
                    </div>
                  </div>
                  <div className="flex flex-row items-center gap-3 mt-2">
                    <button
                      className="flex items-center justify-center px-3 py-3 rounded-full bg-[#232326] text-white shadow hover:bg-gray-800 transition text-base"
                      style={{ minWidth: 36, minHeight: 36 }}
                      onClick={() => handlePlay(idx)}
                      aria-label={`Play preview of ${song.title}`}
                    >
                      <SpeakerWaveIcon className="w-5 h-5" />
                    </button>
                    <audio ref={el => { audioRefs.current[idx] = el; }} src={song.audio} preload="none" />
                    <button className="px-4 py-2 rounded-lg text-white font-semibold bg-transparent hover:bg-white/10 transition text-base" style={{ minWidth: 90 }}>
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
} 