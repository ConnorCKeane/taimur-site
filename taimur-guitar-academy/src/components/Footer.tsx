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
    <footer className="bg-background shadow-[0_-2px_10px_rgba(0,0,0,0.1)]">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div className="flex flex-col items-center space-y-4">
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
              <div className="h-0.5 w-full bg-[#9CA3AF] mt-1" />
            </Link>
            <div className="flex items-center justify-center gap-x-6">
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

          {/* Partners */}
          <div className="flex flex-col items-center md:col-span-2">
            <h3 className="text-md font-semibold text-[#9CA3AF] mb-4 text-center border-b border-gray-500 pb-1">Our Partners</h3>
            <div className="grid grid-cols-3 gap-4 w-full mb-4">
              <div className="flex justify-center">
                <Image src="/schoolofrock-logo.png" alt="School of Rock" width={100} height={40} className="h-10 w-auto object-contain" />
              </div>
              <div className="flex justify-center">
                <Image src="/Wylde-Audio-logo.png" alt="Wylde Audio" width={100} height={40} className="h-10 w-auto object-contain" />
              </div>
              <div className="flex justify-center">
                <Image src="/Logo-Tagima.png" alt="Tagima" width={150} height={60} className="h-12 w-auto object-contain" />
              </div>
            </div>
            <button
              onClick={() => setIsContactOpen(true)}
              className="rounded-md bg-transparent px-3 py-1.5 text-xs font-semibold text-[#9CA3AF] border border-[#9CA3AF] shadow-[0_0_10px_rgba(156,163,175,0.2)] hover:shadow-[0_0_15px_rgba(156,163,175,0.3)] transition-all"
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
              className="text-[#9CA3AF] hover:text-[#6B7280] underline transition-colors"
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