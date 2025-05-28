'use client';

import { Users, Clock, Award, ChevronDown, Instagram } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import ContactDialog from '@/components/ContactDialog';
import { motion } from 'framer-motion';
import InstagramReel from '@/components/InstagramReel';

export default function Home() {
  const [showScrollButton, setShowScrollButton] = useState(true);
  const [isContactOpen, setIsContactOpen] = useState(false);

  const scrollToFeatures = () => {
    const featuresSection = document.getElementById('features-section');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
      setShowScrollButton(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowScrollButton(false);
      } else {
        setShowScrollButton(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <motion.div
        className="relative bg-gradient-to-br from-gray-100 via-gray-200 to-gray-200 pt-30 pb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mx-auto max-w-5xl px-4 flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-16">
          {/* Content */}
          <motion.div 
            className="w-full lg:w-1/2 flex flex-col justify-center space-y-8 relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative z-10">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-1">Mastering the Guitar</h1>
              <h2 className="text-lg sm:text-xl font-medium text-gray-700 mb-2">With Taimur Masud</h2>
              <p className="text-sm sm:text-base text-gray-700 mb-3">
                Whether you&apos;re a beginner or advanced player, discover your potential with expert guidance.
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0">
                  <Users className="h-7 w-7 text-[#1a202c]" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-gray-900">20+ Active Students</h3>
                  <p className="mt-0.5 text-gray-700 text-sm">Join a community of dedicated learners achieving their musical goals through personalized instruction.</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0">
                  <Award className="h-7 w-7 text-[#1a202c]" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-gray-900">15+ Years of Experience</h3>
                  <p className="mt-0.5 text-gray-700 text-sm">Benefit from expert instruction honed over a decade of teaching and performing.</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0">
                  <Clock className="h-7 w-7 text-[#1a202c]" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-gray-900">250+ Hours Teaching</h3>
                  <p className="mt-0.5 text-gray-700 text-sm">Extensive hands-on experience delivering thousands of hours of personalized guitar lessons.</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-2 mt-4">
              <Link
                href="/services"
                className="rounded-md bg-[#1a202c] px-4 py-2 text-sm font-semibold text-white shadow hover:bg-gray-800 transition"
              >
                Schedule a Lesson
              </Link>
              <button
                onClick={() => setIsContactOpen(true)}
                className="text-sm font-semibold text-[#1a202c] hover:underline"
              >
                Get In Touch <span aria-hidden="true">→</span>
              </button>
            </div>
          </motion.div>
          {/* Image */}
          <motion.div 
            className="w-full lg:w-1/2 flex justify-center items-stretch"
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
        className="bg-background py-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <h2 className="text-center text-2xl font-bold text-[#F04C3E] mb-8">Our Partners</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* School of Rock */}
            <div className="relative w-full">
              <div className="absolute inset-0 bg-[#F04C3E] blur-xl opacity-20 rounded-xl"></div>
              <div className="relative bg-white/50 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-white/20">
                <div className="flex flex-col items-center gap-4">
                  <img src="/school-of-rock-logo.png" alt="School of Rock" className="h-12 object-contain" />
                  <p className="text-gray-900 text-center">Official Guitar Instructor</p>
                </div>
              </div>
            </div>

            {/* Music Store */}
            <div className="relative w-full">
              <div className="absolute inset-0 bg-[#F04C3E] blur-xl opacity-20 rounded-xl"></div>
              <div className="relative bg-white/50 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-white/20">
                <div className="flex flex-col items-center gap-4">
                  <img src="/music-store-logo.png" alt="Local Music Store" className="h-12 object-contain" />
                  <p className="text-gray-900 text-center">Preferred Music Store</p>
                </div>
              </div>
            </div>

            {/* Recording Studio */}
            <div className="relative w-full">
              <div className="absolute inset-0 bg-[#F04C3E] blur-xl opacity-20 rounded-xl"></div>
              <div className="relative bg-white/50 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-white/20">
                <div className="flex flex-col items-center gap-4">
                  <img src="/studio-logo.png" alt="Recording Studio" className="h-12 object-contain" />
                  <p className="text-gray-900 text-center">Recording Partner</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Features Section */}
      <motion.div
        id="features-section"
        className="bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 py-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="mx-auto text-center mb-12">
            <h2 className="text-base font-semibold leading-7 text-[#F04C3E]">About Taimur</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Meet Your Instructor
            </p>
          </div>
          <div className="flex flex-col md:flex-row items-center md:items-start gap-12">
            <div className="flex-shrink-0 flex flex-col items-center">
              <img src="/taimur-kid.png" alt="Taimur as a kid with guitar" className="w-56 h-56 object-cover rounded-full border-4 border-[#F04C3E] shadow-2xl mb-6" />
              <a href="https://instagram.com/taimurmasud" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[#F04C3E] font-bold text-lg bg-[#F04C3E]/10 px-4 py-2 rounded-full shadow hover:bg-[#F04C3E]/10 transition mb-2">
                <Instagram className="w-7 h-7" />
                @taimurmasud
              </a>
              <span className="inline-block bg-[#F04C3E]/10 text-[#F04C3E] px-4 py-2 rounded-full text-base font-bold shadow">160,000+ followers</span>
            </div>
            <div className="flex-1 text-gray-700 md:pt-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Taimur Masud</h3>
              <ul className="list-disc list-inside space-y-2 text-lg mb-6">
                <li>21-year-old musician & educator based in New Jersey</li>
                <li>14+ years playing guitar, bass, and drums</li>
                <li>2 years teaching at School of Rock (ages 5–17, all levels)</li>
                <li>8 years of stage & performance experience</li>
                <li>Music producer & content creator</li>
              </ul>
              <div className="text-lg">
                <span className="font-semibold text-gray-900">Taimur&apos;s Guitar Academy</span> offers personalized guitar lessons for all ages and skill levels. Lessons are tailored to your goals, with a focus on comprehensive music knowledge and individual growth.
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Scroll Button */}
      {showScrollButton && (
        <button
          onClick={scrollToFeatures}
          className="fixed bottom-8 right-8 p-3 rounded-full bg-[#1a202c] text-white shadow-lg hover:bg-gray-800 transition-all duration-300 z-50"
          aria-label="Scroll to features section"
        >
          <ChevronDown className="h-6 w-6" />
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
