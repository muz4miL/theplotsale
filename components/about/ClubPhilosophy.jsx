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
    image: '/about/philosophy11.png',
  },
  {
    id: 2,
    title: 'Our Vision',
    subtitle: 'SHAPING COMMUNITIES',
    description:
      "To be the region's most trusted platform for plot ownership — shaping sustainable communities and enabling dreams through innovation and integrity.",
    image: '/about/philosophy22.png',
  },
  {
    id: 3,
    title: 'Our Values',
    subtitle: 'INTEGRITY FIRST',
    description:
      'We act with integrity in every decision and interaction, ensuring honesty, accountability, and trust are always foundational.',
    image: '/about/philosophy33.png',
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
      // Measure against the scrolling container (parentElement), not the viewport.
      // This prevents the last card from landing off-screen and means we never
      // need to care about the editorial panel's width in the math.
      const containerWidth = el.parentElement ? el.parentElement.clientWidth : (window.innerWidth || 1);
      const trackWidth = el.scrollWidth;
      const target = Math.max(0, trackWidth - containerWidth + 64); // +64px right breathing room
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
    <div ref={targetRef} className="relative hidden h-[260vh] lg:block">
      <div className="sticky top-0 flex h-screen overflow-hidden">

        {/* ── Editorial rail ── true flex sibling so it NEVER overlaps the cards. */}
        <div
          className="hidden xl:flex w-[clamp(280px,26vw,400px)] shrink-0 flex-col justify-center border-r border-white/[0.05] px-10 2xl:px-12"
          style={{
            opacity: 1 - scrollP * 0.55,
            transform: `translateX(${-scrollP * 20}px)`,
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}
        >
          <p className="mb-5 font-[family-name:var(--font-manrope)] text-[10px] font-semibold uppercase tracking-[0.38em] text-[#C5A880]">
            OUR PRINCIPLES
          </p>
          <h2 className="mb-6 font-[family-name:var(--font-playfair)] text-[clamp(2.6rem,3.6vw,3.8rem)] font-light leading-[1.05] text-white">
            What Drives
            <br />
            <span className="italic text-[#C5A880]">Our Work</span>
          </h2>
          <p className="max-w-[22ch] font-[family-name:var(--font-manrope)] text-[0.85rem] leading-relaxed text-white/55">
            Our mission, vision, and values guide every project we undertake and every relationship we build.
          </p>
          <div className="mt-8 h-px w-16 bg-gradient-to-r from-[#C5A880] to-transparent" />
          <p className="mt-4 font-[family-name:var(--font-manrope)] text-[10px] uppercase tracking-[0.28em] text-white/30">
            {String(Math.min(3, 1 + Math.floor(scrollP * 2.85))).padStart(2, '0')} / 03 · Scroll to Reveal
          </p>
        </div>

        {/* ── Cards track — clipped inside its own overflow-hidden flex child. ── */}
        <div className="relative flex-1 overflow-hidden">
          <div
            ref={trackRef}
            className="absolute inset-y-0 left-0 flex items-center gap-10 pl-10 pr-16 will-change-transform xl:gap-12"
            style={{ transform: `translate3d(${translatePx}px, 0, 0)` }}
          >
            {philosophyData.map((item, i) => (
              <div
                key={item.id}
                className={[
                  'group relative h-[68vh] w-[52vh] min-w-[52vh] overflow-hidden rounded-[2px] border border-white/[0.07]',
                  'transition-transform duration-[1.4s] ease-[cubic-bezier(0.22,1,0.36,1)]',
                  i % 2 === 1 ? 'translate-y-8' : '-translate-y-2',
                ].join(' ')}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="52vh"
                  className="object-cover transition-transform duration-[1.6s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/5" />
                <div className="pointer-events-none absolute inset-0 border border-[#C5A880]/0 transition-colors duration-700 group-hover:border-[#C5A880]/35" />

                <div className="absolute inset-x-0 bottom-0 p-7 lg:p-9">
                  <p className="mb-2.5 font-[family-name:var(--font-manrope)] text-[9px] font-semibold uppercase tracking-[0.34em] text-[#C5A880]">
                    {item.subtitle}
                  </p>
                  <h3 className="mb-3.5 font-[family-name:var(--font-playfair)] text-[1.85rem] font-light text-white">
                    {item.title}
                  </h3>
                  <p className="font-[family-name:var(--font-manrope)] text-[0.82rem] leading-relaxed text-white/65">
                    {item.description}
                  </p>
                </div>

                <div className="absolute left-5 top-5 font-[family-name:var(--font-manrope)] text-[10px] tracking-[0.3em] text-white/35">
                  0{item.id}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pin progress rail — bottom-right */}
        <div className="pointer-events-none absolute bottom-8 right-10 z-30 flex items-center gap-4">
          <span className="font-[family-name:var(--font-manrope)] text-[9px] font-medium uppercase tracking-[0.3em] text-white/25">
            Philosophy
          </span>
          <div className="relative h-px w-20 bg-white/10">
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
