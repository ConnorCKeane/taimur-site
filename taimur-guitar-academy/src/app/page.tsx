'use client';

import { Users, Clock, Award, ChevronDown, Instagram, Users2, Eye, Heart, GraduationCap, Music, School, Mic, Video } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import ContactDialog from '@/components/ContactDialog';
import { motion } from 'framer-motion';
import InstagramReel from '@/components/InstagramReel';
import PartnersCarousel from '@/components/PartnersCarousel';

export default function Home() {
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about-section');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const aboutSection = document.getElementById('about-section');
      if (aboutSection) {
        const rect = aboutSection.getBoundingClientRect();
        // Show button only when about section is completely out of view (above viewport)
        setShowScrollButton(rect.top > window.innerHeight);
      }
    };

    // Initial check
    handleScroll();
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#E8E8E8] via-[#A4B8D8] via-[#8BA3C8] via-[#A4B8D8] to-[#E8E8E8]">
      {/* Mobile: Demo reel above, Desktop: side-by-side */}
      <motion.div
        className="relative pt-40 pb-4 lg:pt-32 lg:pb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mx-auto max-w-5xl px-4 flex flex-col lg:flex-row-reverse items-start justify-center gap-8 lg:gap-16">
          {/* Mobile: Title and sublines above demo reel */}
          <div className="block lg:hidden w-full">
            <div className="text-center mb-10">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 pt-0 mb-1">Mastering the Guitar</h1>
              <h2 className="text-lg sm:text-xl font-medium text-gray-700 mb-2">With Taimur Masud</h2>
              <p className="text-sm sm:text-base text-gray-700 mb-3">
                Offering high-quality guitar instruction for all levels
              </p>
            </div>
            <div className="w-full flex justify-center mb-10">
              <InstagramReel />
            </div>
            {/* Icon list after demo reel on mobile */}
            <div className="space-y-6 mb-10">
              <div className="flex flex-col items-center gap-2">
                <div className="flex-shrink-0">
                  <Users className="h-8 w-8 text-[#1a202c]" />
                </div>
                <div className="text-center">
                  <h3 className="text-base font-semibold text-gray-900">20+ Active Students</h3>
                  <p className="mt-0.5 text-gray-700 text-sm">Join a community of dedicated learners achieving their musical goals through personalized instruction.</p>
                </div>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="flex-shrink-0">
                  <Award className="h-8 w-8 text-[#1a202c]" />
                </div>
                <div className="text-center">
                  <h3 className="text-base font-semibold text-gray-900">15+ Years of Experience</h3>
                  <p className="mt-0.5 text-gray-700 text-sm">Benefit from expert instruction honed over a decade of teaching and performing.</p>
                </div>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="flex-shrink-0">
                  <Clock className="h-8 w-8 text-[#1a202c]" />
                </div>
                <div className="text-center">
                  <h3 className="text-base font-semibold text-gray-900">250+ Hours Teaching</h3>
                  <p className="mt-0.5 text-gray-700 text-sm">Extensive hands-on experience teaching students ages 7–17 at School of Rock</p>
                </div>
              </div>
            </div>
          </div>
          {/* Content (desktop only) */}
          <motion.div 
            className="hidden lg:flex w-full lg:w-1/2 flex-col justify-center space-y-8 relative text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative z-10">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 pt-12 mb-1">Mastering the Guitar</h1>
              <h2 className="text-lg sm:text-xl font-medium text-gray-700 mb-2">With Taimur Masud</h2>
              <p className="text-sm sm:text-base text-gray-700 mb-3">
                Offering high-quality guitar instruction for all levels
              </p>
            </div>
            <div className="space-y-6">
              <div className="flex flex-row items-center gap-3">
                <div className="flex-shrink-0">
                  <Users className="h-8 w-8 text-[#1a202c]" />
                </div>
                <div className="text-left">
                  <h3 className="text-base font-semibold text-gray-900">20+ Active Students</h3>
                  <p className="mt-0.5 text-gray-700 text-sm">Join a community of dedicated learners achieving their musical goals through personalized instruction.</p>
                </div>
              </div>
              <div className="flex flex-row items-center gap-3">
                <div className="flex-shrink-0">
                  <Award className="h-8 w-8 text-[#1a202c]" />
                </div>
                <div className="text-left">
                  <h3 className="text-base font-semibold text-gray-900">15+ Years of Experience</h3>
                  <p className="mt-0.5 text-gray-700 text-sm">Benefit from expert instruction honed over a decade of teaching and performing.</p>
                </div>
              </div>
              <div className="flex flex-row items-center gap-3">
                <div className="flex-shrink-0">
                  <Clock className="h-8 w-8 text-[#1a202c]" />
                </div>
                <div className="text-left">
                  <h3 className="text-base font-semibold text-gray-900">250+ Hours Teaching</h3>
                  <p className="mt-0.5 text-gray-700 text-sm">Extensive hands-on experience teaching students ages 7–17 at School of Rock</p>
                </div>
              </div>
            </div>
            <div className="flex flex-row items-center gap-2 mt-4">
              <Link
                href="/lessons"
                className="rounded-md bg-background px-4 py-2 text-sm font-semibold text-white shadow-[0_0_15px_rgba(69,67,73,0.3)] hover:shadow-[0_0_20px_rgba(69,67,73,0.4)] transition-all duration-300"
              >
                Book a Lesson
              </Link>
              <button
                onClick={() => setIsContactOpen(true)}
                className="text-sm font-semibold text-background hover:text-[#6B7280] transition-colors"
              >
                Get In Touch <span aria-hidden="true">→</span>
              </button>
            </div>
          </motion.div>
          {/* Desktop: Demo Reel side-by-side */}
          <motion.div 
            className="hidden lg:flex w-full lg:w-1/2 justify-center items-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex flex-col justify-between h-full">
              <div className="relative">
                <InstagramReel />
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Partnerships Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <PartnersCarousel onContactClick={() => setIsContactOpen(true)} />
        </div>
      </motion.div>

      {/* Features Section */}
      <motion.div
        id="about-section"
        className="py-20 pb-24"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-12">
            <div className="flex-shrink-0 flex flex-col items-center">
              <Image src="/taimur-kid.png" alt="Taimur as a kid with guitar" width={224} height={224} className="w-56 h-56 object-cover rounded-full border-4 border-background shadow-2xl mb-4" />
              <a href="https://instagram.com/taimurmasud" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 text-gray-900 font-bold text-lg mb-3">
                <Instagram className="w-7 h-7" />
                @taimurmasud
              </a>
              <div className="w-full border-t text-gray-900 mb-3"></div>
              <div className="flex flex-col items-center gap-2">
                <span className="inline-flex items-center gap-2 text-gray-900 font-medium">
                  <Users2 className="w-4 h-4" />
                  160,000+ followers
                </span>
                <span className="inline-flex items-center gap-2 text-gray-900 font-medium">
                  <Eye className="w-4 h-4" />
                  8,000,000+ views
                </span>
                <span className="inline-flex items-center gap-2 text-gray-900 font-medium">
                  <Heart className="w-4 h-4" />
                  2,000,000+ likes
                </span>
              </div>
            </div>
            <div className="flex-1">
              {/* About Me header - moved inside the content area */}
              <div className="flex justify-center md:justify-start mb-6">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900">About Me</h2>
              </div>
              
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-3">
                  <div className="flex-shrink-0 flex justify-center md:mt-1.5">
                    <GraduationCap className="h-6 w-6 text-gray-900" />
                  </div>
                  <div className="text-center md:text-left">
                    <p className="text-base leading-relaxed text-gray-700">
                      <span className="font-semibold text-gray-900">21-year-old musician & educator</span> in New Jersey, pursuing Music Education
                    </p>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row items-center md:items-start gap-3">
                  <div className="flex-shrink-0 flex justify-center md:mt-1.5">
                    <Music className="h-6 w-6 text-gray-900" />
                  </div>
                  <div className="text-center md:text-left">
                    <p className="text-base leading-relaxed text-gray-700">
                      <span className="font-semibold text-gray-900">14+ years</span> mastering guitar, bass, and drums
                    </p>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row items-center md:items-start gap-3">
                  <div className="flex-shrink-0 flex justify-center md:mt-1.5">
                    <School className="h-6 w-6 text-gray-900" />
                  </div>
                  <div className="text-center md:text-left">
                    <p className="text-base leading-relaxed text-gray-700">
                      <span className="font-semibold text-gray-900">School of Rock</span> certified instructor (ages 5–17)
                    </p>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row items-center md:items-start gap-3">
                  <div className="flex-shrink-0 flex justify-center md:mt-1.5">
                    <Mic className="h-6 w-6 text-gray-900" />
                  </div>
                  <div className="text-center md:text-left">
                    <p className="text-base leading-relaxed text-gray-700">
                      <span className="font-semibold text-gray-900">8+ years</span> of professional performance experience
                    </p>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row items-center md:items-start gap-3">
                  <div className="flex-shrink-0 flex justify-center md:mt-1.5">
                    <Video className="h-6 w-6 text-gray-900" />
                  </div>
                  <div className="text-center md:text-left">
                    <p className="text-base leading-relaxed text-gray-700">
                      <span className="font-semibold text-gray-900">Music producer & content creator</span> with 160K+ followers
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-full border-t border-gray-900 my-6"></div>
              <div className="text-base text-center md:text-left text-gray-700">
                <span className="font-semibold text-gray-900">Taimur&apos;s Guitar Academy</span> offers personalized guitar lessons for all ages and skill levels. Lessons are tailored to your goals, with a focus on comprehensive music knowledge and individual growth.
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Scroll Button */}
      {showScrollButton && (
        <button
          onClick={scrollToAbout}
          className="fixed bottom-8 right-8 px-4 py-2 rounded-full bg-background text-white shadow-[0_0_15px_rgba(69,67,73,0.3)] hover:shadow-[0_0_20px_rgba(69,67,73,0.4)] transition-all duration-300 z-50 flex items-center gap-2"
          aria-label="Scroll to about section"
        >
          <span className="hidden md:inline text-sm font-medium">About</span>
          <ChevronDown className="h-4 w-4" />
        </button>
      )}

      {/* Contact Dialog */}
      <ContactDialog
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </main>
  );
}
