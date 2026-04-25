'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import CurrencyToggle from '@/components/layout/CurrencyToggle';

const navConfig = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'UK Properties', href: '/uk-properties' },
  { label: 'Projects', href: '/projects' },
  { label: 'Contact Us', href: '/contact' },
];

function isNavActive(href, pathname) {
  if (!pathname) return false;
  if (href === '/') return pathname === '/';
  if (href === '/uk-properties') {
    return pathname.startsWith('/uk-properties');
  }
  if (href === '/projects') {
    return pathname === '/projects' || pathname.startsWith('/pakistan-projects');
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Detect prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handler = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Simple scroll detection — only for glassmorphism styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;

    if (!isDrawerOpen) return;

    const scrollY = window.scrollY;
    const { body, documentElement } = document;

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

  const isImmersiveRoute =
    pathname === '/' ||
    pathname === '/projects' ||
    pathname === '/pakistan-projects' ||
    pathname === '/about' ||
    pathname.startsWith('/uk-properties/') ||
    pathname.startsWith('/pakistan-projects/');
  const immersiveNav = isImmersiveRoute && !isScrolled;

  return (
    <>
      <header
        style={{ opacity: 1, transform: 'translateY(0)', isolation: 'isolate' }}
        className={`pointer-events-auto fixed top-0 left-0 right-0 z-[9999] pl-[max(env(safe-area-inset-left,0px),clamp(1.25rem,3.5vw,2.75rem))] pr-[max(env(safe-area-inset-right,0px),clamp(1.25rem,3.5vw,2.75rem))] ${
          prefersReducedMotion
            ? ''
            : 'transition-[padding,background,border,box-shadow,backdrop-filter] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]'
        } ${
          isScrolled
            ? 'border-b border-white/[0.09] bg-[rgba(6,10,9,0.92)] pb-3 pt-[calc(0.75rem+env(safe-area-inset-top,0px))] shadow-[0_12px_40px_rgba(0,0,0,0.5),0_0_80px_rgba(197,168,128,0.08)] supports-[backdrop-filter]:backdrop-blur-xl'
            : immersiveNav
              ? 'border-b border-transparent bg-transparent pb-4 pt-[calc(1rem+env(safe-area-inset-top,0px))] shadow-none supports-[backdrop-filter]:backdrop-blur-none lg:pb-5 lg:pt-[calc(1.25rem+env(safe-area-inset-top,0px))]'
              : 'border-b border-transparent bg-gradient-to-b from-black/55 via-black/20 to-transparent pb-4 pt-[calc(1rem+env(safe-area-inset-top,0px))] supports-[backdrop-filter]:backdrop-blur-[6px] lg:pb-5 lg:pt-[calc(1.25rem+env(safe-area-inset-top,0px))]'
        }`}
      >
        <div
          className={`pointer-events-none absolute bottom-0 left-[8%] right-[8%] h-px bg-gradient-to-r from-transparent via-[#C5A880]/35 to-transparent transition-opacity duration-500 ${
            isScrolled ? 'opacity-100' : immersiveNav ? 'opacity-[0.22]' : 'opacity-40'
          }`}
          aria-hidden
        />

        <div className="relative mx-auto flex max-w-[1440px] items-center gap-4 lg:gap-6">
          <Link
            href="/"
            className={`group flex items-center gap-2.5 no-underline sm:gap-3 ${immersiveNav ? 'drop-shadow-[0_4px_24px_rgba(0,0,0,0.7)]' : ''}`}
            aria-label="The Plot Sale home"
          >
            <div className="relative flex shrink-0 items-center">
              <span className="absolute -inset-1 rounded-full bg-[#C5A880]/0 opacity-0 blur-md transition-all duration-500 group-hover:bg-[#C5A880]/15 group-hover:opacity-100" />
              <Image
                src="/newLogo2.png"
                alt=""
                width={140}
                height={140}
                priority
                className="h-auto w-32 md:w-36 object-contain relative transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </div>

          </Link>

          {/* Desktop — pill rail + sliding active indicator */}
          <nav
            className={`ml-auto hidden items-center gap-0.5 rounded-full border p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] supports-[backdrop-filter]:backdrop-blur-md lg:flex ${
              immersiveNav
                ? 'border-white/[0.12] bg-black/50 shadow-[0_8px_32px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.08)] supports-[backdrop-filter]:backdrop-blur-xl'
                : 'border-white/[0.08] bg-black/25'
            }`}
            aria-label="Primary"
          >
            {navConfig.map((item) => {
              const active = isNavActive(item.href, pathname);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => {
                    // Force navigation only if Link fails after 200ms
                    const startPath = window.location.pathname;
                    setTimeout(() => {
                      if (window.location.pathname === startPath) {
                        window.location.href = item.href;
                      }
                    }, 200);
                  }}
                  className={`relative rounded-full px-3.5 py-2.5 no-underline outline-none transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-[#C5A880]/50 xl:px-4 xl:py-2.5 ${
                    active ? 'text-[#f5f0e6]' : 'text-[rgba(245,245,245,0.72)] hover:text-white'
                  }`}
                >
                  {active ? (
                    <span
                      className="absolute inset-0 rounded-full border border-[#C5A880]/45 bg-[#C5A880]/[0.14] shadow-[0_0_24px_rgba(197,168,128,0.12)] transition-colors duration-300"
                      aria-hidden
                    />
                  ) : null}
                  <span className="relative z-10 font-[family-name:var(--font-manrope)] text-[0.68rem] font-medium uppercase tracking-[0.16em] xl:text-[0.72rem] xl:tracking-[0.18em]">
                    {item.label.replace(/ /g, '\u00A0')}
                  </span>
                </Link>
              );
            })}
          </nav>

          <div
            className={`hidden shrink-0 items-center lg:flex ${immersiveNav ? 'drop-shadow-[0_4px_24px_rgba(0,0,0,0.55)]' : ''}`}
          >
            <CurrencyToggle />
          </div>

          <div className="hidden lg:block">
            <Link
              href="/contact"
              className={`lux-button inline-flex items-center justify-center rounded-full border border-[#C5A880] bg-[#C5A880] px-7 py-2.5 font-[family-name:var(--font-manrope)] text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[#111111] transition-colors hover:bg-transparent hover:text-[#C5A880] xl:px-9 xl:py-[0.85rem] xl:text-[0.74rem] xl:tracking-[0.25em] ${
                immersiveNav ? 'shadow-[0_10px_36px_rgba(0,0,0,0.45)]' : ''
              }`}
            >
              Book appointment
            </Link>
          </div>

          <div
            className={`ml-auto flex shrink-0 items-center gap-2 lg:hidden ${immersiveNav ? 'drop-shadow-[0_4px_24px_rgba(0,0,0,0.55)]' : ''}`}
          >
            <CurrencyToggle />
            <button
              type="button"
              className={`flex h-12 w-12 min-h-[48px] min-w-[48px] items-center justify-center rounded-full border border-[#C5A880]/35 text-[#C5A880] shadow-[0_4px_24px_rgba(0,0,0,0.25)] transition-all duration-300 hover:border-[#C5A880]/55 hover:bg-[#C5A880]/10 active:scale-[0.96] ${
                immersiveNav ? 'bg-black/50 backdrop-blur-md' : 'bg-black/30'
              }`}
              onClick={toggleDrawer}
              aria-label={isDrawerOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isDrawerOpen}
              aria-controls="mobile-navigation-drawer"
            >
              <span className="flex transition-opacity duration-200">
                {isDrawerOpen ? (
                  <X size={20} strokeWidth={1.75} />
                ) : (
                  <Menu size={20} strokeWidth={1.75} />
                )}
              </span>
            </button>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-[90] bg-black/55 transition-[opacity,backdrop-filter] duration-300 supports-[backdrop-filter]:backdrop-blur-sm ${
          isDrawerOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
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
        className={`fixed top-0 right-0 z-[95] flex h-[100dvh] max-h-[100dvh] w-[min(400px,92vw)] flex-col border-l border-[#C5A880]/20 bg-[#030706]/95 text-[#f5f5f5] shadow-[-24px_0_60px_rgba(0,0,0,0.5)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] supports-[backdrop-filter]:backdrop-blur-2xl ${
          isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{
          paddingTop: 'max(1.25rem, env(safe-area-inset-top))',
          paddingBottom: 'max(1.25rem, calc(env(safe-area-inset-bottom) + 0.75rem))',
          paddingLeft: '1.5rem',
          paddingRight: '1.5rem',
        }}
      >
        <div className="flex items-center justify-between border-b border-white/[0.06] pb-5">
          <div>
            <p className="font-playfair text-lg tracking-wide text-white">Menu</p>
            <p className="mt-0.5 font-[family-name:var(--font-manrope)] text-[10px] uppercase tracking-[0.3em] text-[#C5A880]/80">
              The Plot Sale
            </p>
          </div>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/80 transition-colors hover:border-[#C5A880]/50 hover:text-[#C5A880]"
            aria-label="Close menu"
            onClick={closeDrawer}
          >
            <X size={18} strokeWidth={1.75} />
          </button>
        </div>

        <nav className="flex flex-1 flex-col overflow-y-auto overscroll-contain py-2" aria-label="Mobile primary">
          {navConfig.map((item, i) => {
            const active = isNavActive(item.href, pathname);
            return (
              <div
                key={item.href}
                style={{
                  opacity: isDrawerOpen ? 1 : 0,
                  transform: isDrawerOpen ? 'translateX(0)' : 'translateX(28px)',
                  transitionProperty: 'opacity, transform',
                  transitionDuration: '0.45s',
                  transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
                  transitionDelay: isDrawerOpen ? `${80 + i * 55}ms` : '0ms',
                }}
              >
                <Link
                  href={item.href}
                  onClick={() => {
                    closeDrawer();
                    // Force navigation only if Link fails after 200ms
                    const startPath = window.location.pathname;
                    setTimeout(() => {
                      if (window.location.pathname === startPath) {
                        window.location.href = item.href;
                      }
                    }, 200);
                  }}
                  className={`group relative block border-b border-white/[0.06] py-5 pl-4 no-underline transition-colors ${
                    active ? 'text-white' : 'text-white/65 hover:text-white'
                  }`}
                >
                  <span
                    className={`absolute left-0 top-1/2 h-8 w-[3px] -translate-y-1/2 rounded-full bg-[#C5A880] transition-opacity duration-300 ${
                      active ? 'opacity-100' : 'opacity-0 group-hover:opacity-40'
                    }`}
                  />
                  <span className="block font-playfair text-[1.35rem] font-light leading-tight tracking-tight sm:text-2xl">
                    {item.label}
                  </span>
                  <span className="mt-1 block font-[family-name:var(--font-manrope)] text-[10px] uppercase tracking-[0.28em] text-[#C5A880]/50">
                    {active ? 'Current' : 'View'}
                  </span>
                </Link>
              </div>
            );
          })}
        </nav>

        <div className="border-t border-white/[0.06] pt-5">
          <Link
            href="/contact"
            onClick={closeDrawer}
            className="lux-button flex w-full items-center justify-center rounded-full border border-[#C5A880] bg-[#C5A880] py-3.5 font-[family-name:var(--font-manrope)] text-[11px] font-semibold uppercase tracking-[0.22em] text-[#111111] hover:bg-[#d4b896]"
          >
            Book appointment
          </Link>
          <p className="mt-3 text-center font-[family-name:var(--font-manrope)] text-[10px] text-white/35">
            London · Lahore
          </p>
        </div>
      </aside>
    </>
  );
}