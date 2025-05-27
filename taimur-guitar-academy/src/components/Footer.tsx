'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Instagram, Mail, Phone } from 'lucide-react';
import { useState } from 'react';
import ContactDialog from './ContactDialog';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Lessons', href: '/services' },
  { name: 'Shop', href: '/shop' },
];

const socialLinks = [
  { name: 'Instagram', href: 'https://instagram.com', icon: Instagram },
  { name: 'Email', href: 'mailto:your@email.com', icon: Mail },
  { name: 'Phone', href: 'tel:+1234567890', icon: Phone },
];

export default function Footer() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  return (
    <footer className="bg-background border-t border-gray-800 shadow-inner pt-10 pb-6 px-4">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-8">
        {/* Social Media Links */}
        <div className="flex items-center gap-x-4 mb-4">
          {socialLinks.map((item) => (
            <a
              key={item.name}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#F04C3E] hover:text-red-600 transition-colors"
              aria-label={item.name}
            >
              <item.icon className="h-5 w-5" />
            </a>
          ))}
        </div>

        {/* Logo - Centered */}
        <div className="flex items-center justify-center mb-4">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="Taimur's Guitar Academy Logo"
              height={48}
              width={120}
              priority
              className="h-12 w-auto"
              style={{ minWidth: 48 }}
            />
          </Link>
        </div>

        {/* Nav Links and Contact Button */}
        <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 mb-4">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium leading-6 hover:text-primary transition-colors"
              style={{ color: '#F04C3E' }}
            >
              {item.name}
            </Link>
          ))}
          <button
            onClick={() => setIsContactOpen(true)}
            className="rounded-md bg-[#F04C3E] px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F04C3E] transition-colors"
          >
            Contact
          </button>
        </div>

        <p className="text-center text-base text-gray-500 mt-2">
          Site built &amp; maintained by{' '}
          <a
            href="https://websmith-co.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-primary-hover underline transition-colors"
          >
            Websmith
          </a>
        </p>

        <ContactDialog
          isOpen={isContactOpen}
          onClose={() => setIsContactOpen(false)}
        />
      </div>
    </footer>
  );
} 