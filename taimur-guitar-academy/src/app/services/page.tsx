import Navigation from '@/components/Navigation';
import { Check } from 'lucide-react';
import Link from 'next/link';

const tiers = [
  {
    name: 'Beginner',
    id: 'tier-beginner',
    price: { monthly: '$120' },
    description: 'Perfect for those just starting their guitar journey.',
    features: [
      'Basic chord progressions',
      'Simple strumming patterns',
      'Introduction to music theory',
      'Weekly 30-minute lessons',
      'Practice materials included',
      'Email support between lessons',
    ],
    cta: 'Start Learning',
    mostPopular: false,
  },
  {
    name: 'Intermediate',
    id: 'tier-intermediate',
    price: { monthly: '$180' },
    description: 'For players looking to advance their skills.',
    features: [
      'Advanced chord progressions',
      'Complex strumming patterns',
      'Intermediate music theory',
      'Weekly 45-minute lessons',
      'Custom practice materials',
      'Priority email support',
      'Performance opportunities',
    ],
    cta: 'Level Up',
    mostPopular: true,
  },
  {
    name: 'Advanced',
    id: 'tier-advanced',
    price: { monthly: '$240' },
    description: 'For serious musicians ready to master the guitar.',
    features: [
      'Advanced techniques',
      'Complex music theory',
      'Composition guidance',
      'Weekly 60-minute lessons',
      'Custom learning materials',
      '24/7 priority support',
      'Performance opportunities',
      'Recording studio access',
    ],
    cta: 'Master Your Craft',
    mostPopular: false,
  },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-base font-semibold leading-7 text-[#F04C3E]">Pricing</h2>
            <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Choose the right plan for&nbsp;you
            </p>
          </div>
          <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600">
            All plans include personalized instruction, practice materials, and ongoing support. Book your first lesson today!
          </p>
          <div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-y-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {tiers.map((tier) => (
              <div
                key={tier.id}
                className={`flex flex-col justify-between rounded-3xl bg-white p-8 ring-1 ring-gray-200 xl:p-10 ${
                  tier.mostPopular ? 'ring-2 ring-[#F04C3E]' : ''
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-x-4">
                    <h3
                      className={`text-lg font-semibold leading-8 ${
                        tier.mostPopular ? 'text-[#F04C3E]' : 'text-gray-900'
                      }`}
                    >
                      {tier.name}
                    </h3>
                    {tier.mostPopular ? (
                      <p className="rounded-full bg-[#F04C3E]/10 px-2.5 py-1 text-xs font-semibold leading-5 text-[#F04C3E]">
                        Most popular
                      </p>
                    ) : null}
                  </div>
                  <p className="mt-4 text-sm leading-6 text-gray-600">{tier.description}</p>
                  <p className="mt-6 flex items-baseline gap-x-1">
                    <span className="text-4xl font-bold tracking-tight text-gray-900">{tier.price.monthly}</span>
                    <span className="text-sm font-semibold leading-6 text-gray-600">/month</span>
                  </p>
                  <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-600">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex gap-x-3">
                        <Check className="h-6 w-5 flex-none text-[#F04C3E]" aria-hidden="true" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <Link
                  href="/booking"
                  className={`mt-8 block rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                    tier.mostPopular
                      ? 'bg-[#F04C3E] text-white shadow-sm hover:bg-red-600 focus-visible:outline-[#F04C3E]'
                      : 'bg-red-50 text-[#F04C3E] hover:bg-red-100 focus-visible:outline-[#F04C3E]'
                  }`}
                >
                  {tier.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
} 