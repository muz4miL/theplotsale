'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function AboutHero() {
  const [isMobile, setIsMobile] = useState(true);
  const [scrollHintOpacity, setScrollHintOpacity] = useState(1);

  useEffect(() => {
    const mq = () => setIsMobile(window.innerWidth < 768);
    mq();
    window.addEventListener('resize', mq);
    return () => window.removeEventListener('resize', mq);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    const onScroll = () => {
      const y = window.scrollY || 0;
      setScrollHintOpacity(Math.max(0, Math.min(1, 1 - y / 160)));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [isMobile]);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0 h-full w-full overflow-hidden">
        <div className="about-hero-kenburns h-full w-full motion-reduce:animate-none">
          <Image
            src="/images/architecture.png"
            alt="ThePlotSale - Premium Real Estate Consultancy"
            fill
            priority
            quality={90}
            className="object-cover"
          />
        </div>
      </div>

      <div className="absolute inset-0 z-10 bg-black/40" />
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-transparent to-black/20" />

      <div className="absolute inset-0 z-30 flex h-screen flex-col items-center justify-center px-6 md:px-12">
        <p className="about-hero-stagger-1 text-center font-sans text-[10px] uppercase tracking-[0.35em] text-[#C5A880] md:text-sm">
          PREMIER REAL ESTATE CONSULTANCY
        </p>

        <h1 className="about-hero-stagger-2 mt-6 mb-8 text-center font-serif text-4xl font-light leading-none text-white md:text-8xl">
          About Us
        </h1>

        <p className="about-hero-stagger-3 max-w-md px-4 text-center font-sans text-sm font-light leading-relaxed text-white/80 md:max-w-2xl md:text-xl">
          We are not just building homes. We are shaping dreams into addresses.
        </p>
      </div>

      <div
        className="absolute bottom-12 left-1/2 z-30 flex -translate-x-1/2 flex-col items-center transition-opacity duration-500"
        style={{ opacity: isMobile ? 1 : scrollHintOpacity }}
      >
        <div className="about-hero-chevron motion-reduce:animate-none">
          <svg
            className="h-6 w-6 text-[#C5A880]"
            fill="none"
            strokeWidth="1"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        <p className="mt-2 font-sans text-[9px] uppercase tracking-[0.4em] text-[#C5A880]">SCROLL TO DISCOVER</p>
      </div>
    </section>
  );
}
