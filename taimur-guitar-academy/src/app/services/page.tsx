'use client';

import Navigation from '@/components/Navigation';
import { InlineWidget } from 'react-calendly';
import { Check } from 'lucide-react';

const pricingDetails = {
  title: '30-Minute Private Lesson',
  price: '$60',
  description: 'One-on-one instruction tailored to your goals',
  features: [
    'Personalized lesson plan',
    'Focus on your specific goals',
    'Professional feedback',
    'Practice materials included',
    'Email support between lessons',
  ],
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#E8E8E8] via-[#A4B8D8] via-[#8BA3C8] via-[#A4B8D8] to-[#E8E8E8]">
      <Navigation />
      
      <div className="pt-32 pb-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Book Your Guitar Lesson
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Schedule a 30-minute lesson with Taimur. Choose a time that works best for you.
            </p>
          </div>

          {/* Booking and Pricing Section */}
          <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Calendar Widget */}
            <div className="rounded-2xl bg-white p-4 shadow-lg">
              <InlineWidget
                url="https://calendly.com/connorcorneliuskeane/30min"
                styles={{
                  height: '500px',
                  width: '100%',
                }}
                prefill={{
                  email: '',
                  firstName: '',
                  lastName: '',
                }}
              />
            </div>

            {/* Pricing Information */}
            <div className="flex flex-col justify-center">
              <div className="rounded-2xl bg-white p-8 shadow-lg">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-gray-900">{pricingDetails.title}</h2>
                  <p className="mt-2 text-gray-600">{pricingDetails.description}</p>
                  <p className="mt-4 text-4xl font-bold text-[#F04C3E]">{pricingDetails.price}</p>
                </div>

                <ul className="mt-8 space-y-4">
                  {pricingDetails.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="h-5 w-5 flex-none text-[#F04C3E]" aria-hidden="true" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 text-center text-sm text-gray-500">
                  <p>Payment is processed securely through Calendly</p>
                  <p className="mt-1">Cancel or reschedule up to 24 hours before your lesson</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 