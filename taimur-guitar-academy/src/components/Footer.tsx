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
  return (
    <footer className="bg-background border-t border-gray-200 pt-8 pb-4">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div className="flex flex-col items-center">
            <Link href="/" className="mb-4">
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
            <div className="flex items-center gap-x-4 mb-3">
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
            <button
              onClick={() => setIsContactOpen(true)}
              className="rounded-md bg-transparent px-3 py-1.5 text-xs font-semibold text-[#F04C3E] border border-[#F04C3E] shadow-[0_0_10px_rgba(240,76,62,0.2)] hover:shadow-[0_0_15px_rgba(240,76,62,0.3)] transition-all"
            >
              Contact Me
            </button>
          </div>

          {/* Partners */}
          <div className="flex flex-col items-center md:col-span-2">
            <h3 className="text-md font-semibold text-[#F04C3E] mb-6 text-center w-full">Our Partners:</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-6">
              <div className="flex justify-center">
                <Image src="/schoolofrock-logo.png" alt="School of Rock" width={120} height={48} className="h-12 w-auto object-contain" />
              </div>
              <div className="flex justify-center">
                <Image src="/Wylde-Audio-logo.png" alt="Wylde Audio" width={120} height={48} className="h-12 w-auto object-contain" />
              </div>
              <div className="flex justify-center">
                <Image src="/Logo-Tagima.png" alt="Tagima" width={180} height={72} className="h-16 w-auto object-contain" />
              </div>
            </div>
            <button
              onClick={() => setIsContactOpen(true)}
              className="rounded-md bg-transparent px-3 py-1.5 text-xs font-semibold text-[#F04C3E] border border-[#F04C3E] shadow-[0_0_10px_rgba(240,76,62,0.2)] hover:shadow-[0_0_15px_rgba(240,76,62,0.3)] transition-all"
            >
              Become a Partner
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t text-gray-500 pt-4">
          <p className="text-center text-sm text-gray-500">
            Site Powered by{' '}
            <a
              href="https://websmith-co.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#F04C3E] hover:text-red-600 underline transition-colors"
            >
              Websmith
            </a>
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