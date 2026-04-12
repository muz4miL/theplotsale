'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import NavDropdown from './NavDropdown';

const navConfig = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Properties', href: '/properties' },
  { label: 'Projects', href: '/projects' },
  { label: 'Contact Us', href: '/contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 32);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.body.style.overflow = isDrawerOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isDrawerOpen]);

  const toggleDrawer = () => setIsDrawerOpen((prev) => !prev);
  const closeDrawer = () => setIsDrawerOpen(false);



  return (
    <header
      className={`fixed top-0 left-0 right-0 z-60 px-[clamp(1.5rem,4vw,3rem)] transition-all duration-[350ms] ease-out border-b ${isScrolled
        ? 'bg-[rgba(15,37,34,0.85)] backdrop-blur-[18px] border-b-[rgba(255,255,255,0.08)] py-[0.85rem]'
        : 'border-b-transparent py-5'
        }`}
    >
      <div className="mx-auto max-w-[1440px] flex items-center gap-6">
        <Link href="/" className="flex items-center gap-3 no-underline" aria-label="ThePlotSale.com">
          <div className="flex items-center shrink-0">
            <Image
              src="/newLogo.png"
              alt="The Plot Sale"
              width={45}
              height={45}
              priority
              className="object-contain"
            />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-[family-name:var(--font-playfair)] text-[1.05rem] tracking-[0.35em] uppercase text-[var(--text-light)]">
              ThePlotSale
            </span>
            <span className="font-[family-name:var(--font-manrope)] text-[0.55rem] tracking-[0.35em] uppercase text-[#C5A880]">
              .com
            </span>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-11 ml-auto">
          {navConfig.map((item) => {
            if (item.items) {
              return (
                <NavDropdown
                  key={item.label}
                  title={item.label}
                  items={item.items}
                />
              );
            }

            return (
              <Link
                key={item.label}
                href={item.href}
                className="font-[family-name:var(--font-manrope)] text-[0.78rem] tracking-[0.18em] uppercase text-[rgba(245,245,245,0.85)] no-underline transition-colors duration-300 hover:text-[#C5A880]"
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden xl:block">
          <Link
            href="/reserve"
            className="inline-flex items-center justify-center px-10 py-[0.9rem] bg-[#C5A880] text-[#111111] font-[family-name:var(--font-manrope)] text-[0.78rem] font-semibold tracking-[0.25em] uppercase rounded-full border border-[#C5A880] transition-all duration-300 hover:bg-transparent hover:text-[#C5A880]"
          >
            Book Appointment
          </Link>
        </div>

        <button
          className="ml-auto lg:hidden flex w-11 h-11 items-center justify-center border border-[rgba(197,168,128,0.4)] rounded-xl bg-transparent text-[#C5A880] cursor-pointer"
          onClick={toggleDrawer}
          aria-label="Toggle navigation menu"
        >
          {isDrawerOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <div
        className={`fixed inset-0 bg-[rgba(0,0,0,0.45)] z-50 transition-opacity duration-300 ${isDrawerOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
        onClick={closeDrawer}
      />

      <aside
        className={`fixed top-0 right-0 bottom-0 w-[min(360px,85vw)] bg-[#05110e] text-[#f5f5f5] z-55 flex flex-col p-6 gap-6 border-l border-[rgba(197,168,128,0.2)] transition-transform duration-[350ms] ease-out ${isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        <div className="flex items-center justify-between">
          <p className="tracking-[0.3em] text-xs uppercase text-[rgba(245,245,245,0.7)]">
            The Plot Sale Navigation
          </p>
          <button
            className="w-9 h-9 rounded-full border border-[rgba(197,168,128,0.3)] bg-transparent text-[#C5A880] flex items-center justify-center cursor-pointer"
            aria-label="Close menu"
            onClick={closeDrawer}
          >
            <X size={20} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto flex flex-col gap-4">
          {navConfig.map((item) => (
            <div
              key={item.label}
              className="border border-[rgba(255,255,255,0.05)] rounded-2xl py-4 px-5 bg-[rgba(255,255,255,0.02)]"
            >
              <div className="flex items-center justify-between font-[family-name:var(--font-playfair)] text-base uppercase tracking-[0.15em]">
                <p>{item.label}</p>
                {item.items && (
                  <span className="font-[family-name:var(--font-manrope)] text-[0.65rem] tracking-[0.3em] text-[rgba(200,155,123,0.8)]">
                    Explore
                  </span>
                )}
              </div>
              <div className="flex flex-col mt-3 gap-2">
                {item.items ? (
                  item.items.map((child) => (
                    <Link
                      key={child.label}
                      href={child.href}
                      onClick={closeDrawer}
                      className="font-[family-name:var(--font-manrope)] text-[0.9rem] text-[rgba(245,245,245,0.85)] no-underline hover:text-[#c89b7b]"
                    >
                      {child.label}
                    </Link>
                  ))
                ) : (
                  <Link
                    href={item.href}
                    onClick={closeDrawer}
                    className="font-[family-name:var(--font-manrope)] text-[0.9rem] text-[rgba(245,245,245,0.85)] no-underline hover:text-[#c89b7b]"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
        <div>
          <Link
            href="/reserve"
            onClick={closeDrawer}
            className="block w-full text-center p-4 rounded-full bg-[#C5A880] text-[#05110e] font-[family-name:var(--font-manrope)] tracking-[0.2em] uppercase text-[0.85rem]"
          >
            Book Appointment
          </Link>
        </div>
      </aside>
    </header>
  );
}
