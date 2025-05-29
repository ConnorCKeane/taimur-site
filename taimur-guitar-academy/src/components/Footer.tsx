'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Instagram, Mail, Phone } from 'lucide-react';
import { useState } from 'react';
import ContactDialog from './ContactDialog';

const socialLinks = [
  { name: 'Instagram', href: 'https://instagram.com/taimurmasud', icon: Instagram },
  { name: 'Email', href: 'mailto:taimur@taimurguitar.com', icon: Mail },
  { name: 'Phone', href: 'tel:+1234567890', icon: Phone },
];

export default function Footer() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Lessons', href: '/lessons' },
    { name: 'Shop', href: '/shop' },
  ];
  return (
    <footer className="bg-background shadow-[0_-2px_10px_rgba(0,0,0,0.1)]">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 items-start">
          {/* Left: Logo, tagline, powered by */}
          <div className="flex flex-col items-center md:items-start space-y-3">
            <Link href="/" className="group">
              <Image
                src="/logo.png"
                alt="Taimur's Guitar Academy Logo"
                height={48}
                width={120}
                priority
                className="h-12 w-auto group-hover:opacity-90 transition-opacity"
                style={{ minWidth: 48 }}
              />
            </Link>
            <p className="text-[#9CA3AF] text-sm mt-2 text-center md:text-left">Professional guitar lessons tailored to your goals.</p>
            <div className="text-xs text-gray-500 text-center md:text-left">
              Site Powered by{' '}
              <a
                href="https://websmith-co.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#9CA3AF] hover:text-[#6B7280] underline transition-colors"
              >
                Websmith
              </a>
            </div>
          </div>

          {/* Center: Navigation and legal links */}
          <div className="flex flex-col items-center space-y-2">
            <nav className="flex flex-row gap-4 sm:gap-6 mb-2">
              {navLinks.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-[#9CA3AF] hover:text-[#6B7280] text-sm font-medium transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
            <div className="flex gap-4 mb-2">
              <a href="/privacy" className="text-[#9CA3AF] hover:text-[#6B7280] text-xs transition-colors">Privacy Policy</a>
              <a href="/terms" className="text-[#9CA3AF] hover:text-[#6B7280] text-xs transition-colors">Terms of Service</a>
            </div>
            <p className="text-[#9CA3AF] text-xs text-center">© 2023 Taimur&apos;s Guitar Academy. All rights reserved.</p>
          </div>

          {/* Right: Social icons and contact */}
          <div className="flex flex-col items-center md:items-end space-y-4">
            <div className="flex items-center gap-x-6">
              {socialLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#9CA3AF] hover:text-[#6B7280] transition-colors"
                  aria-label={item.name}
                >
                  <item.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
            <button
              onClick={() => setIsContactOpen(true)}
              className="rounded-md bg-transparent px-3 py-1.5 text-xs font-semibold text-[#9CA3AF] border border-[#9CA3AF] shadow-[0_0_10px_rgba(156,163,175,0.2)] hover:shadow-[0_0_15px_rgba(156,163,175,0.3)] transition-all"
            >
              Contact Me
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t text-gray-500 pt-4">
          <p className="text-center text-sm text-gray-500">
            {/* Intentionally left blank for visual separation, or add any extra info here if needed */}
          </p>
        </div>

        <ContactDialog
          isOpen={isContactOpen}
          onClose={() => setIsContactOpen(false)}
        />
      </div>
    </footer>
  );
} 