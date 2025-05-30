'use client';

import { useState, useEffect } from 'react';
import { MusicalNoteIcon, ClockIcon } from '@heroicons/react/24/outline';
// import Calendar from '@/components/lessons/Calendar';
import BookingModal from '@/components/lessons/BookingModal';
import { motion } from 'framer-motion';
import SimpleCalendar from '@/components/lessons/SimpleCalendar';
import ContactDialog from '@/components/ContactDialog';
import { format, addDays, addMonths, isAfter } from 'date-fns';

const lesson = {
  id: 1,
  title: 'Virtual Guitar Lesson',
  description: "Personalized one-on-one guitar instruction tailored to your goals. Whether you're a beginner or looking to refine your skills, each lesson is customized to your learning style and musical interests.",
  duration: '60 minutes',
  price: 50,
  icon: MusicalNoteIcon,
};

const TIME_SLOTS = [
  '12:00 PM',
  '1:00 PM',
  '2:00 PM',
  '3:00 PM',
];
const DURATIONS = [
  { label: '30 minutes', value: 30 },
  { label: '60 minutes', value: 60 },
];

export default function LessonsPage() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedDuration, setSelectedDuration] = useState<number | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  // Dynamic price based on duration
  const getLessonPrice = () => {
    if (selectedDuration === 30) return 45;
    if (selectedDuration === 60) return 60;
    return 60; // default to 60 min price
  };
  const getLessonDurationLabel = () => {
    if (selectedDuration === 30) return '30 minutes';
    if (selectedDuration === 60) return '60 minutes';
    return '60 minutes';
  };

  // Find the closest available weekday (Mon-Fri, at least 2 days from today, within 1 month)
  useEffect(() => {
    if (!selectedDate) {
      const now = new Date();
      let candidate = addDays(now, 2);
      const maxDate = addMonths(now, 1);
      while (
        (candidate.getDay() === 0 || candidate.getDay() === 6 || isAfter(candidate, maxDate))
      ) {
        candidate = addDays(candidate, 1);
      }
      if (!isAfter(candidate, maxDate)) {
        setSelectedDate(candidate);
      }
    }
  }, [selectedDate]);

  const handleBook = () => {
    if (selectedDate && selectedTime && selectedDuration) {
      setIsBookingModalOpen(true);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#E8E8E8] via-[#A4B8D8] via-[#8BA3C8] via-[#A4B8D8] to-[#E8E8E8]">
      <div className="max-w-5xl mx-auto px-4 pt-32 pb-32">
        {/* Hero Section */}
        <motion.div
          className="relative pb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
              Book a Lesson
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-700">
              Personalized guitar lessons for all skill levels—beginners, intermediates, and advanced players.
            </p>
          </div>
        </motion.div>

        {/* Lesson Features Grid */}
        <motion.div
          className="py-2 w-full overflow-x-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex flex-row gap-2 w-full min-w-0">
            {/* Personalized Plan */}
            <div className="rounded-xl overflow-hidden py-1 px-2 flex flex-col items-center text-center min-w-0 flex-1 max-w-xs">
              <svg className="h-7 w-7 md:h-8 md:w-8 text-black mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <h3 className="text-xs md:text-sm lg:text-base font-semibold text-black leading-tight">Personalized Plan</h3>
              <p className="text-[10px] md:text-xs text-gray-800 leading-tight">Tailored lessons to your goals and skill level.</p>
            </div>
            {/* Live Video Call */}
            <div className="rounded-xl overflow-hidden py-1 px-2 flex flex-col items-center text-center min-w-0 flex-1 max-w-xs">
              <svg className="h-7 w-7 md:h-8 md:w-8 text-black mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <h3 className="text-xs md:text-sm lg:text-base font-semibold text-black leading-tight">Live Video Call</h3>
              <p className="text-[10px] md:text-xs text-gray-800 leading-tight">Interactive sessions from the comfort of your home.</p>
            </div>
            {/* Technique Focus */}
            <div className="rounded-xl overflow-hidden py-1 px-2 flex flex-col items-center text-center min-w-0 flex-1 max-w-xs">
              <svg className="h-7 w-7 md:h-8 md:w-8 text-black mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
              <h3 className="text-xs md:text-sm lg:text-base font-semibold text-black leading-tight">Technique Focus</h3>
              <p className="text-[10px] md:text-xs text-gray-800 leading-tight">Master essential guitar techniques with expert guidance.</p>
            </div>
            {/* Progress Tracking */}
            <div className="rounded-xl overflow-hidden py-1 px-2 flex flex-col items-center text-center min-w-0 flex-1 max-w-xs">
              <svg className="h-7 w-7 md:h-8 md:w-8 text-black mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <h3 className="text-xs md:text-sm lg:text-base font-semibold text-black leading-tight">Progress Tracking</h3>
              <p className="text-[10px] md:text-xs text-gray-800 leading-tight">Monitor your improvement and celebrate milestones.</p>
            </div>
          </div>
        </motion.div>

        {/* Calendar & Booking Section */}
        <motion.div
          className="py-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-[#232326] rounded-xl shadow-lg p-4 border border-white/10 flex flex-col md:flex-row gap-6 items-stretch">
            {/* Calendar */}
            <div className="w-full md:w-1/2 flex flex-col justify-center">
              <SimpleCalendar
                onDateSelect={(date) => {
                  setSelectedDate(date);
                  setSelectedTime(null);
                  setSelectedDuration(null);
                }}
                selectedDate={selectedDate}
                darkMode
                initialMonth={selectedDate || undefined}
              />
            </div>
            {/* Time & Duration Options */}
            <div className="w-full md:w-1/2 flex flex-col justify-center">
              <div className="w-full max-w-md mx-auto md:mx-0 md:max-w-none flex flex-col h-full justify-center">
                {/* Virtual Guitar Lesson Content (always visible, no description) */}
                <div className="flex flex-row items-center justify-center gap-4 mb-6">
                  <lesson.icon className="h-12 w-12 text-white flex-shrink-0" aria-hidden="true" />
                  <div className="flex flex-col items-start justify-center">
                    <h3 className="text-xl font-bold text-white mb-1">{lesson.title}</h3>
                    <div className="flex items-center text-lg font-semibold text-white mb-1 gap-2">
                      <span>${getLessonPrice()} <span className="text-base font-normal text-gray-300">/lesson</span></span>
                      <span className="text-gray-400">&bull;</span>
                      <span className="flex items-center text-base font-normal text-gray-300">
                        <ClockIcon className="flex-shrink-0 mr-1 h-4 w-4 text-gray-400" />
                        {getLessonDurationLabel()}
                      </span>
                    </div>
                  </div>
                </div>
                {/* Centered selected date/time */}
                <div className="mb-4">
                  <div className="text-center text-white text-base font-semibold">
                    {selectedDate && (
                      selectedTime
                        ? `${format(selectedDate, 'EEEE, MMMM d, yyyy')} at ${selectedTime}`
                        : `${format(selectedDate, 'EEEE, MMMM d, yyyy')}`
                    )}
                  </div>
                </div>
                <h3 className="font-semibold text-white mb-2">Available Time Slots EST</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {TIME_SLOTS.map((slot) => (
                    <button
                      key={slot}
                      onClick={() => setSelectedTime(slot)}
                      className={`px-4 py-2 rounded-lg border text-sm font-medium transition
                        ${selectedTime === slot ? 'bg-white text-[#232326] border-white' : 'bg-transparent text-white border-white hover:bg-white/10'}`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
                <h3 className="font-semibold text-white mb-2">Lesson Duration</h3>
                <div className="flex gap-2 mb-4">
                  {DURATIONS.map((d) => (
                    <button
                      key={d.value}
                      onClick={() => setSelectedDuration(d.value)}
                      className={`px-4 py-2 rounded-lg border text-sm font-medium transition
                        ${selectedDuration === d.value ? 'bg-white text-[#232326] border-white' : 'bg-transparent text-white border-white hover:bg-white/10'}`}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={handleBook}
                    disabled={!(selectedTime && selectedDuration)}
                    className={`px-6 py-2 rounded-lg font-semibold text-[#232326] bg-white border border-white hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    Book Lesson
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      {/* Booking Modal */}
      {isBookingModalOpen && selectedDate && selectedTime && selectedDuration && (
        <BookingModal
          isOpen={isBookingModalOpen}
          onClose={() => setIsBookingModalOpen(false)}
          selectedLesson={{
            ...lesson,
            price: getLessonPrice(),
            duration: getLessonDurationLabel(),
          }}
          selectedDate={selectedDate}
          selectedTime={selectedTime}
          selectedDuration={selectedDuration}
          darkMode
        />
      )}
      {/* Contact Dialog */}
      <ContactDialog isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </main>
  );
} 