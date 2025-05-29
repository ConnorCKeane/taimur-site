'use client';

import { useState, useEffect } from 'react';
import { MusicalNoteIcon, ClockIcon, UsersIcon } from '@heroicons/react/24/outline';
// import Calendar from '@/components/lessons/Calendar';
import BookingModal from '@/components/lessons/BookingModal';
import { motion } from 'framer-motion';
import SimpleCalendar from '@/components/lessons/SimpleCalendar';
import ContactDialog from '@/components/ContactDialog';
import { format } from 'date-fns';

const lesson = {
  id: 1,
  title: 'Virtual Guitar Lesson',
  description: "Personalized one-on-one guitar instruction tailored to your goals. Whether you're a beginner or looking to refine your skills, each lesson is customized to your learning style and musical interests.",
  duration: '60 minutes',
  price: 50,
  icon: MusicalNoteIcon,
};

const customSession = {
  id: 2,
  title: 'Group or Custom Session',
  description: "Looking for a group class, special event, or a custom session? Reach out to discuss your needs and we'll create a tailored experience for you or your group.",
  icon: UsersIcon,
  cta: 'Contact',
};

const TIME_SLOTS = [
  '12:00 PM',
  '1:00 PM',
  '2:00 PM',
  '3:00 PM',
  '4:00 PM',
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

  useEffect(() => {
    console.log('selectedDate changed:', selectedDate, selectedDate ? selectedDate.toISOString() : null);
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

        {/* Lesson Cards Row */}
        <motion.div
          className="py-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex flex-col md:flex-row gap-4 w-full">
            {/* Standard Lesson Card */}
            <motion.div
              className="flex-1 bg-[#232326] rounded-xl shadow-lg overflow-hidden border border-white/10 flex flex-row items-center min-h-[90px] max-h-[110px] px-4 py-2"
              whileHover={{ y: -3 }}
            >
              <div className="flex-shrink-0 flex items-center justify-center mr-4">
                <lesson.icon className="h-10 w-10 text-white" aria-hidden="true" />
              </div>
              <div className="flex-grow flex flex-col justify-center">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-white">{lesson.title}</h3>
                  <div className="text-xl font-bold text-white">
                    ${lesson.price}
                    <span className="text-base font-normal text-gray-300">/lesson</span>
                  </div>
                </div>
                <div className="flex items-center text-xs text-gray-300 mt-1">
                  <ClockIcon className="flex-shrink-0 mr-1 h-4 w-4 text-gray-400" />
                  {lesson.duration}
                </div>
              </div>
            </motion.div>

            {/* Custom/Group Session Card */}
            <motion.div
              className="flex-1 bg-[#232326] rounded-xl shadow-lg overflow-hidden border border-white/10 flex flex-row items-center min-h-[90px] max-h-[110px] px-4 py-2"
              whileHover={{ y: -3 }}
            >
              <div className="flex-shrink-0 flex items-center justify-center mr-4">
                <customSession.icon className="h-10 w-10 text-white" aria-hidden="true" />
              </div>
              <div className="flex-grow flex flex-col justify-center">
                <h3 className="text-lg font-semibold text-white mb-0.5">{customSession.title}</h3>
              </div>
              <button
                onClick={() => setIsContactOpen(true)}
                className="ml-4 px-4 py-1 rounded-lg border border-white text-white bg-transparent font-semibold text-sm hover:bg-white/10 transition"
              >
                {customSession.cta}
              </button>
            </motion.div>
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
              />
            </div>
            {/* Time & Duration Options */}
            <div className="w-full md:w-1/2 flex flex-col justify-center">
              {selectedDate && (
                <div className="w-full max-w-md mx-auto md:mx-0 md:max-w-none flex flex-col h-full justify-center">
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
              )}
            </div>
          </div>
        </motion.div>
      </div>
      {/* Booking Modal */}
      {isBookingModalOpen && selectedDate && selectedTime && selectedDuration && (
        <BookingModal
          isOpen={isBookingModalOpen}
          onClose={() => setIsBookingModalOpen(false)}
          selectedLesson={lesson}
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