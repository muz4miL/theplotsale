'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 32);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;

    const { body, documentElement } = document;

    if (!isDrawerOpen) return;

    const scrollY = window.scrollY;
    const prevHtmlOverflow = documentElement.style.overflow;
    const prevBodyOverflow = body.style.overflow;
    const prevBodyPosition = body.style.position;
    const prevBodyTop = body.style.top;
    const prevBodyLeft = body.style.left;
    const prevBodyRight = body.style.right;
    const prevBodyWidth = body.style.width;
    const prevBodyTouchAction = body.style.touchAction;

    documentElement.style.overflow = 'hidden';
    body.style.overflow = 'hidden';
    body.style.position = 'fixed';
    body.style.top = `-${scrollY}px`;
    body.style.left = '0';
    body.style.right = '0';
    body.style.width = '100%';
    body.style.touchAction = 'none';

    return () => {
      documentElement.style.overflow = prevHtmlOverflow;
      body.style.overflow = prevBodyOverflow;
      body.style.position = prevBodyPosition;
      body.style.top = prevBodyTop;
      body.style.left = prevBodyLeft;
      body.style.right = prevBodyRight;
      body.style.width = prevBodyWidth;
      body.style.touchAction = prevBodyTouchAction;
      window.scrollTo(0, scrollY);
    };
  }, [isDrawerOpen]);

  useEffect(() => {
    if (!isDrawerOpen) return;

    const handleEscape = (event) => {
      if (event.key === 'Escape') setIsDrawerOpen(false);
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isDrawerOpen]);

  const toggleDrawer = () => setIsDrawerOpen((prev) => !prev);
  const closeDrawer = () => setIsDrawerOpen(false);



  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[60] px-[clamp(1.5rem,4vw,3rem)] transition-all duration-[350ms] ease-out border-b ${isScrolled
          ? 'bg-[rgba(10,16,15,0.85)] backdrop-blur-[18px] border-b-[rgba(255,255,255,0.08)] py-[0.85rem] shadow-[0_10px_35px_rgba(0,0,0,0.35)]'
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
                  className={`lux-nav-link font-[family-name:var(--font-manrope)] text-[0.78rem] tracking-[0.18em] uppercase no-underline transition-colors duration-300 ${pathname === item.href
                    ? 'is-active text-[#C5A880]'
                    : 'text-[rgba(245,245,245,0.85)] hover:text-[#C5A880]'
                    }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden xl:block">
            <Link
              href="/reserve"
              className="lux-button inline-flex items-center justify-center px-10 py-[0.9rem] bg-[#C5A880] text-[#111111] font-[family-name:var(--font-manrope)] text-[0.78rem] font-semibold tracking-[0.25em] uppercase rounded-full border border-[#C5A880] hover:bg-transparent hover:text-[#C5A880]"
            >
              Book Appointment
            </Link>
          </div>

          <button
            className="ml-auto lg:hidden flex w-11 h-11 items-center justify-center border border-[rgba(197,168,128,0.4)] rounded-xl bg-transparent text-[#C5A880] cursor-pointer"
            onClick={toggleDrawer}
            aria-label="Toggle navigation menu"
            aria-expanded={isDrawerOpen}
            aria-controls="mobile-navigation-drawer"
          >
            {isDrawerOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      <div
        className={`fixed inset-0 bg-[rgba(0,0,0,0.45)] z-[70] transition-opacity duration-300 ${isDrawerOpen ? 'opacity-100 visible pointer-events-auto' : 'opacity-0 invisible pointer-events-none'
          }`}
        onClick={closeDrawer}
        aria-hidden={!isDrawerOpen}
      />

      <aside
        id="mobile-navigation-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        aria-hidden={!isDrawerOpen}
        className={`fixed top-0 right-0 h-[100dvh] max-h-[100dvh] w-[min(360px,85vw)] bg-[#05110e] text-[#f5f5f5] z-[80] flex flex-col gap-6 border-l border-[rgba(197,168,128,0.2)] overflow-hidden transition-transform duration-[350ms] ease-out ${isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        style={{
          paddingTop: 'max(1.5rem, env(safe-area-inset-top))',
          paddingBottom: 'max(1.5rem, calc(env(safe-area-inset-bottom) + 1rem))',
          paddingLeft: '1.5rem',
          paddingRight: '1.5rem',
        }}
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
        <div className="flex-1 overflow-y-auto overscroll-contain flex flex-col gap-4">
          {navConfig.map((item) => (
            <div
              key={item.label}
              className="border border-[rgba(255,255,255,0.08)] rounded-2xl py-4 px-5 bg-[rgba(255,255,255,0.03)] transition-colors duration-300 hover:border-[rgba(197,168,128,0.35)]"
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
                    className="font-[family-name:var(--font-manrope)] text-[0.9rem] text-[rgba(245,245,245,0.85)] no-underline transition-all duration-300 hover:translate-x-1 hover:text-[#c89b7b]"
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
            className="lux-button block w-full text-center p-4 rounded-full bg-[#C5A880] text-[#05110e] font-[family-name:var(--font-manrope)] tracking-[0.2em] uppercase text-[0.85rem]"
          >
            Book Appointment
          </Link>
        </div>
      </aside>
    </>
  );
}
