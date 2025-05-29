'use client';

import { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Clock, Music, BookOpen, Users, Award } from 'lucide-react';
import { InlineWidget } from 'react-calendly';

const features = [
  {
    name: 'Personalized Learning',
    description: 'Customized lesson plans tailored to your goals and skill level',
    icon: Music,
  },
  {
    name: 'Flexible Scheduling',
    description: 'Book lessons at times that work best for your schedule',
    icon: Clock,
  },
  {
    name: 'Comprehensive Curriculum',
    description: 'Structured learning path covering technique, theory, and performance',
    icon: BookOpen,
  },
  {
    name: 'Small Group Option',
    description: 'Learn with friends or join a group of similar skill level',
    icon: Users,
  },
  {
    name: 'Performance Opportunities',
    description: 'Regular opportunities to showcase your progress',
    icon: Award,
  },
];

export default function LessonsPage() {
  const [selectedLessonType, setSelectedLessonType] = useState('private');

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#E8E8E8] via-[#A4B8D8] via-[#8BA3C8] via-[#A4B8D8] to-[#E8E8E8]">
      <Navigation />
      
      {/* Hero Section */}
      <div className="pt-32 pb-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Book Your Guitar Lessons
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Start your musical journey with personalized guitar instruction. Choose between private or group lessons and book your preferred time slot.
            </p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col items-start">
                <div className="rounded-lg bg-white p-2 ring-1 ring-gray-200">
                  <feature.icon className="h-6 w-6 text-[#F04C3E]" aria-hidden="true" />
                </div>
                <div className="mt-4">
                  <h3 className="text-lg font-semibold leading-8 text-gray-900">{feature.name}</h3>
                  <p className="mt-2 text-base leading-7 text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Booking Section */}
      <div className="py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Schedule Your Lesson
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              Choose your preferred lesson type and select an available time slot
            </p>
          </div>

          {/* Lesson Type Selector */}
          <div className="mt-8 flex justify-center gap-4">
            <button
              onClick={() => setSelectedLessonType('private')}
              className={`rounded-md px-4 py-2 text-sm font-semibold ${
                selectedLessonType === 'private'
                  ? 'bg-[#F04C3E] text-white'
                  : 'bg-white text-gray-900 hover:bg-gray-50'
              }`}
            >
              Private Lessons
            </button>
            <button
              onClick={() => setSelectedLessonType('group')}
              className={`rounded-md px-4 py-2 text-sm font-semibold ${
                selectedLessonType === 'group'
                  ? 'bg-[#F04C3E] text-white'
                  : 'bg-white text-gray-900 hover:bg-gray-50'
              }`}
            >
              Group Lessons
            </button>
          </div>

          {/* Calendly Widget */}
          <div className="mt-8 rounded-2xl bg-white p-4 shadow-lg">
            <InlineWidget
              url={selectedLessonType === 'private' 
                ? "https://calendly.com/your-private-lessons-link"
                : "https://calendly.com/your-group-lessons-link"
              }
              styles={{
                height: '650px',
                width: '100%',
              }}
              prefill={{
                email: '',
                firstName: '',
                lastName: '',
              }}
            />
          </div>
        </div>
      </div>
    </main>
  );
} 