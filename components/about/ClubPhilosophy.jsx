'use client';

/**
 * ClubPhilosophy — About page horizontal editorial reveal.
 *
 * Historical bug (fixed): the component computed its own scrollProgress against
 * the whole "element crosses viewport" range and then translated by a magic
 * percentage-of-its-own-width (`1 - p*66`). This caused the animation to finish
 * before the sticky pin released, leaving a large black empty band above the
 * cards at the hand-off to the next section — the exact same class of bug the
 * home-page BentoGrid had.
 *
 * New behaviour:
 *  - Progress is locked to the sticky-pin window via `useStickyPinProgress`.
 *  - Translate is measured in pixels from the real content width, so regardless
 *    of viewport size the last card lands perfectly centered in-frame before
 *    the pin releases.
 *  - The intro block ("Our Principles / What Drives Our Work") is fixed to a
 *    pinned editorial rail on the left so there is always visible content — no
 *    more blank void during the pin.
 *  - Section height tightened from 300vh → 240vh for a snappier feel.
 */

import { useLayoutEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useStickyPinProgress } from '@/hooks/useSectionScrollProgress';

const philosophyData = [
  {
    id: 1,
    title: 'Our Mission',
    subtitle: 'EMPOWERING BUYERS',
    description:
      'Empower buyers with premier real estate opportunities through transparent deals, expert guidance, and personalized service.',
    image: '/about/philosophy1.png',
  },
  {
    id: 2,
    title: 'Our Vision',
    subtitle: 'SHAPING COMMUNITIES',
    description:
      "To be the region's most trusted platform for plot ownership — shaping sustainable communities and enabling dreams through innovation and integrity.",
    image: '/about/philosophy2.png',
  },
  {
    id: 3,
    title: 'Our Values',
    subtitle: 'INTEGRITY FIRST',
    description:
      'We act with integrity in every decision and interaction, ensuring honesty, accountability, and trust are always foundational.',
    image: '/about/philosophy3.png',
  },
];

function DesktopPhilosophy() {
  const targetRef = useRef(null);
  const trackRef = useRef(null);
  const [maxTranslate, setMaxTranslate] = useState(0);

  const scrollP = useStickyPinProgress(targetRef);

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;
    const measure = () => {
      const el = trackRef.current;
      if (!el) return;
      const trackWidth = el.scrollWidth;
      const vw = window.innerWidth || 1;
      // We want the right-edge of the last card to stop ~6vw from the right edge
      // so the final composition feels framed, not clipped.
      const target = Math.max(0, trackWidth - vw * 0.94);
      setMaxTranslate(target);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);

  const translatePx = -scrollP * maxTranslate;

  return (
    <div ref={targetRef} className="relative hidden h-[240vh] lg:block">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        {/* Pinned editorial rail — always visible, establishes the section's voice. */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-20 hidden w-[30vw] max-w-[440px] flex-col justify-center pl-12 xl:flex">
          <p
            className="mb-6 font-sans text-xs tracking-[0.32em] text-[#C5A880] transition-opacity duration-700"
            style={{ opacity: 1 - scrollP * 0.7 }}
          >
            OUR PRINCIPLES
          </p>
          <h2
            className="mb-6 font-serif text-5xl font-light leading-[1.05] text-white transition-transform duration-700 2xl:text-6xl"
            style={{ transform: `translateX(${-scrollP * 24}px)`, opacity: 1 - scrollP * 0.55 }}
          >
            What Drives
            <br />
            <span className="italic text-[#C5A880]">Our Work</span>
          </h2>
          <p
            className="max-w-sm font-sans text-base leading-relaxed text-white/60 transition-opacity duration-700"
            style={{ opacity: 1 - scrollP * 0.8 }}
          >
            Our mission, vision, and values guide every project we undertake and every relationship we build.
          </p>
          <div className="mt-10 h-px w-24 bg-gradient-to-r from-[#C5A880] to-transparent" />
          <p className="mt-4 font-sans text-[10px] uppercase tracking-[0.28em] text-white/35">
            {String(Math.min(3, 1 + Math.floor(scrollP * 2.6))).padStart(2, '0')} / 03 · Scroll to Reveal
          </p>
        </div>

        <div
          ref={trackRef}
          className="flex items-center gap-12 pl-[8vw] pr-[8vw] will-change-transform xl:pl-[32vw]"
          style={{ transform: `translate3d(${translatePx}px, 0, 0)` }}
        >
          {philosophyData.map((item, i) => (
            <div
              key={item.id}
              className={[
                'group relative h-[68vh] w-[58vh] min-w-[58vh] overflow-hidden rounded-[3px] border border-white/[0.08]',
                'transition-transform duration-[1.4s] ease-[cubic-bezier(0.22,1,0.36,1)]',
                i % 2 === 1 ? 'translate-y-6' : '',
              ].join(' ')}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="58vh"
                className="object-cover transition-transform duration-[1.6s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />
              <div className="pointer-events-none absolute inset-0 border border-[#C5A880]/0 transition-colors duration-700 group-hover:border-[#C5A880]/40" />

              <div className="absolute inset-x-0 bottom-0 p-8 lg:p-10">
                <p className="mb-3 font-sans text-[10px] uppercase tracking-[0.3em] text-[#C5A880]">{item.subtitle}</p>
                <h3 className="mb-4 font-serif text-3xl font-light text-white">{item.title}</h3>
                <p className="font-sans text-sm leading-relaxed text-white/70">{item.description}</p>
              </div>

              <div className="absolute left-5 top-5 font-sans text-[10px] tracking-[0.3em] text-white/40">
                0{item.id}
              </div>
            </div>
          ))}
        </div>

        {/* Pin progress rail — bottom-right editorial ruler, matches BentoGrid */}
        <div className="pointer-events-none absolute bottom-10 right-10 z-30 flex items-center gap-4">
          <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-white/30">Philosophy</span>
          <div className="relative h-[1px] w-24 bg-white/10">
            <div
              className="absolute inset-y-0 left-0 bg-[#C5A880] transition-[width] duration-150 ease-out"
              style={{ width: `${scrollP * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function MobilePhilosophy() {
  return (
    <div className="px-6 py-24 lg:hidden">
      <div className="mb-12 text-center">
        <p className="mb-4 font-sans text-xs tracking-[0.3em] text-[#C5A880]">OUR PRINCIPLES</p>
        <h2 className="font-serif text-4xl font-light">
          What Drives <br />
          <span className="italic text-[#C5A880]">Our Work</span>
        </h2>
      </div>

      <div className="-mx-6 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-8 no-scrollbar">
        {philosophyData.map((item) => (
          <div
            key={item.id}
            className="relative aspect-[3/4] w-[85vw] shrink-0 snap-center overflow-hidden rounded-xl border border-white/10"
          >
            <Image src={item.image} alt={item.title} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

            <div className="absolute bottom-0 left-0 w-full p-8">
              <p className="mb-2 font-sans text-[10px] uppercase tracking-[0.25em] text-[#C5A880]">{item.subtitle}</p>
              <h3 className="mb-3 font-serif text-2xl text-white">{item.title}</h3>
              <p className="font-sans text-sm leading-relaxed text-gray-300">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ClubPhilosophy() {
  return (
    <section className="relative bg-[#0A0A0A] text-white">
      <DesktopPhilosophy />
      <MobilePhilosophy />
    </section>
  );
}
