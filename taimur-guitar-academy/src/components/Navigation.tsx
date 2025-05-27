'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Instagram, Mail, Phone } from 'lucide-react';
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

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-background h-24 border-b border-gray-200">
      <nav className="flex items-center justify-between h-full px-4 lg:px-8" aria-label="Global">
        {/* Social Media Links */}
        <div className="hidden lg:flex items-center gap-x-4">
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
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <Link href="/" className="flex items-center h-full">
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

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-x-6">
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

        {/* Mobile Nav Button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5"
            onClick={() => setMobileMenuOpen(true)}
            style={{ color: '#F04C3E' }}
          >
            <span className="sr-only">Open main menu</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden">
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black/20" onClick={() => setMobileMenuOpen(false)} />
          {/* Menu panel */}
          <div className="fixed inset-y-0 left-0 z-50 w-[300px] overflow-y-auto bg-background px-6 py-6 sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <Link href="/" className="-m-1.5 p-1.5" onClick={() => setMobileMenuOpen(false)}>
                <Image
                  src="/logo.png"
                  alt="Taimur's Guitar Academy Logo"
                  height={32}
                  width={80}
                  priority
                  className="h-8 w-auto"
                  style={{ minWidth: 32 }}
                />
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5"
                onClick={() => setMobileMenuOpen(false)}
                style={{ color: '#F04C3E' }}
              >
                <span className="sr-only">Close menu</span>
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-medium leading-7 hover:bg-gray-50"
                      style={{ color: '#F04C3E' }}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setIsContactOpen(true);
                    }}
                    className="-mx-3 block w-full text-left rounded-lg px-3 py-2 text-base font-medium leading-7 bg-[#F04C3E] text-white hover:bg-red-600 transition-colors"
                  >
                    Contact
                  </button>
                </div>
                {/* Social Links in Mobile Menu */}
                <div className="py-6">
                  <div className="flex items-center gap-x-4">
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
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Contact Dialog */}
      <ContactDialog
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </header>
  );
} 