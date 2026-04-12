import Image from 'next/image';
import Link from 'next/link';
import { Instagram, Facebook, MessageCircle } from 'lucide-react';

const exploreLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Properties', href: '/properties' },
  { label: 'Projects', href: '/projects' },
  { label: 'Contact Us', href: '/contact' },
];

const projectsLinks = [
  { label: 'Airport City Sialkot', href: '/projects/airport-city-sialkot' },
  { label: 'Canal Fort II', href: '/projects/canal-fort-ii' },
  { label: 'Exxsn Heights', href: '/projects/exxsn-heights' },
  { label: 'Pearl Garden', href: '/projects/pearl-garden' },
  { label: 'Siddique City', href: '/projects/siddique-city' },
  { label: 'Siddique Heights', href: '/projects/siddique-heights' },
];

const socialIcons = [
  { icon: Instagram, href: 'https://instagram.com/theplotsale', label: 'Instagram' },
  { icon: Facebook, href: 'https://facebook.com/theplotsale', label: 'Facebook' },
  { icon: MessageCircle, href: 'https://wa.me/923211222999', label: 'WhatsApp' },
];

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-t from-black to-[#05110e] text-[#f5f5f5] pt-16 pb-8">
      {/* Golden Horizon Border */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C5A880]/40 to-transparent" />

      <div className="max-w-[1200px] mx-auto px-6">

        {/* SECTION 1: IDENTITY & SOCIALS */}
        <section className="flex flex-col md:flex-row gap-8 md:justify-between md:items-start pb-12">
          {/* Left: Logo + Headline */}
          <div className="flex items-start gap-6 border-l border-[#C5A880]/30 pl-6">
            <div className="flex-shrink-0">
              <Image
                src="/newLogo.png"
                alt="The Plot Sale"
                width={70}
                height={70}
                className="object-contain"
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

          {/* Right: Social Icons */}
          <div className="flex gap-3 md:justify-end justify-center md:mt-0">
            {socialIcons.map(({ icon: Icon, href, label }) => (
              <Link
                key={label}
                href={href}
                aria-label={`Visit The Plot Sale on ${label}`}
                className="w-11 h-11 rounded-full border border-[#C5A880]/40 text-[#C5A880] flex items-center justify-center transition-all duration-300 hover:bg-[#C5A880] hover:text-[#05110e] hover:border-[#C5A880]"
              >
                <Icon size={17} />
              </Link>
            ))}
          </div>
        </section>

        {/* Divider */}
        <div className="border-t border-white/5" />

        {/* SECTION 2: NAVIGATION LINKS */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 pb-12">
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
                  className="text-white/70 text-sm font-light hover:translate-x-1 hover:text-[#C5A880] transition-all duration-300"
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
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="border-t border-white/5" />

        {/* SECTION 3: LEGAL */}
        <section className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between pt-8 text-xs text-white/30">
          <p>© 2025 ThePlotSale. All Rights Reserved.</p>
          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="hover:text-[#C5A880] transition-colors duration-300"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-[#C5A880] transition-colors duration-300"
            >
              Terms of Service
            </Link>
          </div>
        </section>

      </div>
    </footer>
  );
}
