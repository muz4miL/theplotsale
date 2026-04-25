'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import BrandSocialLinks from '@/components/layout/BrandSocialLinks';
import ConciergeTextReveal from '@/components/layout/ConciergeTextReveal';

const exploreLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Properties', href: '/properties' },
  { label: 'Projects', href: '/projects' },
  { label: 'Contact Us', href: '/contact' },
];

const projectsLinks = [
  { label: 'UK Residences', href: '/uk-properties' },
  { label: 'Pakistan Developments', href: '/pakistan-projects' },
];

export default function Footer() {
  const pathname = usePathname();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <footer className="relative z-10 bg-gradient-to-t from-black to-[#05110e] text-[#f5f5f5] pt-16 pb-[max(2rem,env(safe-area-inset-bottom,0px))] pointer-events-auto">
      {/* Golden Horizon Border */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C5A880]/40 to-transparent" />

      <div className="mx-auto max-w-[1200px] lux-mobile-page-gutter">

        {/* SECTION 1: IDENTITY & SOCIALS */}
        <section className="flex flex-col md:flex-row gap-8 md:justify-between md:items-start pb-12">
          {/* Left: Logo + Headline */}
          <div className="flex items-start gap-6 border-l border-[#C5A880]/30 pl-6">
            <div className="flex-shrink-0">
              <Image
                src="/newLogo2.png"
                alt="The Plot Sale"
                width={180}
                height={180}
                className="h-auto w-40 md:w-44 object-contain"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-playfair italic text-2xl text-white/90 leading-relaxed">
                We are not just building homes, we are cultivating futures.
              </h3>
              <p className="text-xs text-white/40 mt-2 font-light">
                Trusted Real Estate Consultancy
              </p>
            </div>
          </div>

          <BrandSocialLinks className="md:mt-0" />
        </section>

        {/* Concierge — private desk */}
        <ConciergeTextReveal className="relative mb-12 overflow-hidden rounded-2xl border border-[#C5A880]/20 bg-gradient-to-br from-white/[0.04] via-transparent to-[#C5A880]/[0.06] px-6 py-8 sm:px-10 sm:py-10">
          <div className="pointer-events-none absolute left-0 top-0 h-full w-[3px] bg-gradient-to-b from-[#C5A880] via-[#C5A880]/35 to-transparent" aria-hidden />
          <div className="pl-4 sm:pl-6">
            <p
              data-concierge-reveal
              className="font-[family-name:var(--font-manrope)] text-[10px] font-semibold uppercase tracking-[0.38em] text-[#C5A880]"
            >
              Concierge
            </p>
            <h2 className="mt-3 font-playfair text-2xl font-light text-white/95 sm:text-3xl">
              <span data-concierge-reveal className="block">
                Private client
              </span>
              <span data-concierge-reveal className="mt-1 block italic text-[#e8d5b5]">
                desk
              </span>
            </h2>
            <p
              data-concierge-reveal
              className="mt-5 max-w-xl font-[family-name:var(--font-manrope)] text-sm font-light leading-relaxed text-white/55"
            >
              A discreet line for acquisitions, developments, and cross-border mandates. Share your brief — we respond
              with clarity, not noise.
            </p>
            <div
              data-concierge-reveal
              className="mt-6 flex flex-col gap-3 border-t border-white/[0.08] pt-6 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-8 sm:gap-y-3"
            >
              <Link
                href="mailto:contact@theplotsale.com"
                className="text-sm font-light text-[#C5A880] transition-colors hover:text-white"
              >
                contact@theplotsale.com
              </Link>
              <span className="hidden text-white/20 sm:inline" aria-hidden>
                ·
              </span>
              <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-white/40">London · Lahore</p>
              <span className="hidden text-white/20 sm:inline" aria-hidden>
                ·
              </span>
              <Link
                href="https://wa.me/923211222999"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-[#25D366]"
              >
                <span className="font-[family-name:var(--font-manrope)] text-[10px] font-semibold uppercase tracking-[0.2em] text-[#25D366]/90">
                  WhatsApp
                </span>
                <span className="font-light tracking-wide">92 321 1222999</span>
              </Link>
            </div>
          </div>
        </ConciergeTextReveal>

        {/* Divider */}
        <div className="border-t border-white/5" />

        {/* SECTION 2: NAVIGATION LINKS */}
        <section className="grid grid-cols-1 gap-10 pt-12 pb-12 md:grid-cols-3">
          {/* Quick Links */}
          <div>
            <p className="font-playfair text-[#C5A880] text-[10px] tracking-[0.25em] uppercase mb-4">
              Quick Links
            </p>
            <div className="flex flex-col gap-2.5">
              {exploreLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-white/70 text-sm font-light hover:translate-x-1 hover:text-[#C5A880] transition-all duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Our Projects */}
          <div>
            <p className="font-playfair text-[#C5A880] text-[10px] tracking-[0.25em] uppercase mb-4">
              Our Projects
            </p>
            <div className="flex flex-col gap-2.5">
              {projectsLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-white/70 text-sm font-light tracking-[0.08em] hover:translate-x-1 hover:text-[#C5A880] transition-all duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <p className="font-playfair text-[#C5A880] text-[10px] tracking-[0.25em] uppercase mb-4">
              Contact Information
            </p>
            <div className="flex flex-col gap-3 text-white/70 text-sm font-light">
              <div>
                <p className="text-[#C5A880] text-xs font-medium mb-1">Pakistan Office:</p>
                <p className="leading-relaxed">Plot 2, Block C, Etihad Town<br />Main Raiwind Road, Lahore, 54000</p>
              </div>
              <div>
                <p className="text-[#C5A880] text-xs font-medium mb-1">UK Inquiries:</p>
                <p className="leading-relaxed">The Vista Center 50 Salisbury road<br />Hounslow, London TW4 6JQ<br />Office number A4-16</p>
              </div>
              <div>
                <p className="text-[#C5A880] text-xs font-medium mb-1">Email:</p>
                <a href="mailto:contact@theplotsale.com" className="hover:text-[#C5A880] transition-colors">
                  contact@theplotsale.com
                </a>
              </div>
              <div>
                <p className="text-[#C5A880] text-xs font-medium mb-1">Phone:</p>
                <p>PK: <a href="tel:+923211222999" className="hover:text-[#C5A880] transition-colors">(+92) 321-1222999</a></p>
                <p>UK: <a href="tel:+447383663339" className="hover:text-[#C5A880] transition-colors">+44 7383663339</a></p>
              </div>
              <div>
                <p className="text-[#C5A880] text-xs font-medium mb-1">WhatsApp:</p>
                <a
                  href="https://wa.me/923211222999"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#25D366] transition-colors"
                >
                  92 321 1222999
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="border-t border-white/5" />

        {/* SECTION 3: LEGAL */}
        <section className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between pt-8 text-xs text-white/30">
          <p>© 2026 ThePlotSale. All Rights Reserved.</p>
          <div className="flex gap-6">
            <a
              href="/admin/login"
              className="hover:text-[#C5A880] transition-colors duration-300"
            >
              Admin Login
            </a>
            <a
              href="/privacy"
              className="hover:text-[#C5A880] transition-colors duration-300"
            >
              Privacy Policy
            </a>
            <a
              href="/terms"
              className="hover:text-[#C5A880] transition-colors duration-300"
            >
              Terms of Service
            </a>
          </div>
        </section>

      </div>
    </footer>
  );
}