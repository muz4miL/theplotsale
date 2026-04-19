'use client';

import { useLayoutEffect, useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { useStickyPinProgress } from '@/hooks/useSectionScrollProgress';

// Flagship portfolio — real, client-delivered assets. Update imagery here when
// the CMS sync ships a new hero photo for any of these projects.
const experienceItems = [
  {
    id: 1,
    url: '/images/UnionTown.png',
    title: 'UNION TOWN',
    label: 'Lahore · Current',
    description:
      "ThePlotSale's flagship master-planned community — road infrastructure, mosque, schools, sports complex and a residential grid built to international standards.",
    isPortrait: true,
    href: '/pakistan-projects/union-town-lahore',
  },
  {
    id: 2,
    url: '/images/ExxnsHeight.png',
    title: 'EXXNS HEIGHTS',
    label: 'Lahore · Current',
    description:
      'Contemporary vertical development under construction — luxury finishes, panoramic views and a structural programme that rewards early investors.',
    isPortrait: false,
    href: '/pakistan-projects/exxsn-heights-etihad-town',
  },
  {
    id: 3,
    url: '/images/TheGreenValley.png',
    title: 'GREEN VALLEY',
    label: 'Murree · Completed',
    description:
      'Completed hillside retreat in Murree — the handcrafted calling card of the Siddique family, blending alpine landscape with quiet residential luxury.',
    isPortrait: true,
    href: '/pakistan-projects/green-valley-murree',
  },
  {
    id: 4,
    url: '/images/UnionTown3Mosque.png',
    title: 'UNION MOSQUE',
    label: 'Lahore · Civic',
    description:
      "Union Town's spiritual centrepiece — a civic-scale mosque anchoring the community plan and setting the architectural language for every block around it.",
    isPortrait: true,
    href: '/pakistan-projects/union-town-lahore',
  },
  {
    id: 5,
    url: '/images/UnionTown4CityView.png',
    title: 'UNION TOWN · CITY VIEW',
    label: 'Lahore · Masterplan',
    description:
      'The Union Town masterplan from above — avenues, blocks and civic anchors knitted into one investor-grade community, ready for phased delivery.',
    isPortrait: false,
    href: '/pakistan-projects/union-town-lahore',
  },
];

function DesktopExperience({ targetRef, scrollP }) {
  const trackRef = useRef(null);
  const [maxTranslate, setMaxTranslate] = useState(0);

  // Measure the real on-screen distance we need to travel so the LAST card lands
  // cleanly centered in the viewport (right-biased), regardless of viewport width.
  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;
    const measure = () => {
      const el = trackRef.current;
      if (!el) return;
      // trackWidth = full content width; we want to stop translating when the
      // right-edge of the track has travelled past the right-edge of the viewport
      // by roughly a card's width, so the final card sits comfortably in-frame.
      const trackWidth = el.scrollWidth;
      const vw = window.innerWidth || 1;
      // Right-edge of the track should end at ~ vw - 15vw (mirrors pl-[15vw] on left)
      const target = Math.max(0, trackWidth - vw * 0.85);
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
    <section
      ref={targetRef}
      className="relative hidden bg-[#0A0A0A] md:block"
      style={{ height: '380vh' }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/lifestyle-hero.png"
            alt="Background"
            fill
            className="object-cover opacity-20"
            style={{ filter: 'blur(8px) brightness(0.3)' }}
            priority
          />
          <div className="absolute inset-0 bg-[#0D1512]/70" />
        </div>

        <div
          className="pointer-events-none absolute inset-0 opacity-[0.02] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
          }}
        />

        <div className="absolute left-8 top-12 z-30 md:left-16 lg:left-24">
          <div className="mb-4 flex items-center gap-3">
            <div className="h-[1px] w-10 bg-gradient-to-r from-[#C5A880] to-transparent" />
            <span className="text-[10px] font-medium uppercase tracking-[0.35em] text-[#C5A880]">Our Portfolio</span>
          </div>
          <h2 className="font-playfair text-3xl font-light tracking-tight text-white/90 md:text-4xl">
            Track Record & Expertise
          </h2>
        </div>

        <div
          ref={trackRef}
          className="absolute inset-0 flex items-end gap-0 pb-20 pl-[15vw] will-change-transform"
          style={{ transform: `translate3d(${translatePx}px, 0, 0)` }}
        >
          {experienceItems.map((item) => {
            const isPortrait = item.isPortrait;

            return (
              <div
                key={item.id}
                className="relative flex flex-shrink-0 items-center"
                style={{
                  marginRight: isPortrait ? 'clamp(40px, 8vw, 80px)' : 'clamp(60px, 12vw, 150px)',
                }}
              >
                {isPortrait ? (
                  <div
                    className="relative mr-6 flex h-[50vh] flex-shrink-0 items-center justify-center md:mr-8"
                    style={{ width: '10vh' }}
                  >
                    <h3
                      className="absolute whitespace-nowrap font-playfair text-[8vh] font-light text-white/10 select-none md:text-[9vh]"
                      style={{
                        writingMode: 'vertical-rl',
                        textOrientation: 'mixed',
                        transform: 'rotate(180deg)',
                        letterSpacing: '0.05em',
                      }}
                    >
                      {item.title}
                    </h3>
                  </div>
                ) : (
                  <div className="absolute -top-16 left-0 z-10">
                    <h3 className="whitespace-nowrap font-playfair text-4xl font-light tracking-tight text-white/10 select-none md:text-5xl lg:text-6xl">
                      {item.title}
                    </h3>
                  </div>
                )}

                <Link href={item.href} className="group relative flex-shrink-0 cursor-pointer">
                  <div
                    className="relative overflow-hidden rounded-sm"
                    style={{
                      width: isPortrait ? 'min(25vw, 320px)' : 'min(40vw, 500px)',
                      aspectRatio: isPortrait ? '3/4' : '16/9',
                    }}
                  >
                    <Image
                      src={item.url}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                      sizes={isPortrait ? '(max-width: 768px) 30vw, 320px' : '(max-width: 768px) 45vw, 500px'}
                    />
                    {/* Permanent gradient for text legibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                    {/* Hover reveal: golden overlay sweeps up */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#C5A880]/18 via-transparent to-transparent opacity-0 transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:opacity-100" />
                    {/* Hover border glow */}
                    <div className="absolute inset-0 border border-white/10 transition-colors duration-700 group-hover:border-[#C5A880]/45" />

                    {/* Bottom content panel */}
                    <div className="absolute bottom-0 left-0 right-0 z-10 p-6">
                      <div className="mb-2">
                        <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-[#C5A880] transition-colors duration-500 group-hover:text-[#D4AF8A]">
                          {item.label}
                        </span>
                      </div>
                      <p className="text-xs font-light leading-relaxed text-white/70 transition-colors duration-500 group-hover:text-white/90 md:text-sm">
                        {item.description}
                      </p>

                      {/* CTA — slides up from nothing on hover */}
                      <div className="mt-4 flex items-center gap-3 translate-y-3 opacity-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 group-hover:opacity-100">
                        <span className="h-px w-8 bg-gradient-to-r from-[#C5A880] to-transparent" />
                        <span className="font-[family-name:var(--font-manrope)] text-[10px] font-semibold uppercase tracking-[0.3em] text-[#C5A880]">
                          View Project
                        </span>
                        <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#C5A880]/50 bg-[#C5A880]/10 text-[#C5A880]">
                          <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.75} />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
          <div className="w-[50vw] flex-shrink-0" />
        </div>

        <div className="absolute bottom-12 right-8 z-30 md:right-16">
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-white/30">Scroll to Explore</span>
            <div className="relative h-[1px] w-20 bg-white/10">
              <div
                className="absolute inset-y-0 left-0 bg-[#C5A880] transition-[width] duration-150 ease-out"
                style={{ width: `${scrollP * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MobileExperience() {
  const scrollRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const cardWidth = container.offsetWidth * 0.8;
      const newIndex = Math.round(scrollLeft / Math.max(1, cardWidth));
      setCurrentIndex(newIndex);
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  const progressWidth = `${((currentIndex + 1) / experienceItems.length) * 100}%`;

  return (
    <section className="relative flex min-h-screen flex-col bg-[#0A0A0A] md:hidden">
      <div className="absolute inset-0">
        <Image
          src="/lifestyle-hero.png"
          alt="Background"
          fill
          className="object-cover opacity-20"
          style={{ filter: 'blur(8px) brightness(0.3)' }}
          priority
        />
        <div className="absolute inset-0 bg-[#0D1512]/70" />
      </div>

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-20 flex flex-col items-center px-[max(1.5rem,env(safe-area-inset-left,0px))] pb-10 pt-14 text-center max-[380px]:pt-12 sm:px-8">
        <div className="mb-3 flex items-center gap-3">
          <div className="h-[1px] w-8 bg-gradient-to-r from-transparent via-[#C5A880] to-[#C5A880]" />
          <span className="text-[9px] font-medium uppercase tracking-[0.35em] text-[#C5A880]">Our Portfolio</span>
          <div className="h-[1px] w-8 bg-gradient-to-l from-transparent via-[#C5A880] to-[#C5A880]" />
        </div>
        <h2 className="max-w-[18ch] text-balance font-playfair text-[clamp(1.45rem,4.8vw,1.85rem)] font-light leading-tight tracking-tight text-white/90">
          Track Record & Expertise
        </h2>
      </div>

      <div className="relative z-10 flex-1">
        <div
          ref={scrollRef}
          className="no-scrollbar flex h-full snap-x snap-mandatory items-center gap-4 overflow-x-auto pl-[max(1.5rem,env(safe-area-inset-left,0px))] pr-[max(1.5rem,env(safe-area-inset-right,0px))] sm:pl-8 sm:pr-8"
          style={{
            scrollBehavior: 'smooth',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {experienceItems.map((item, index) => (
            <div key={item.id} className="relative flex-shrink-0 snap-center" style={{ width: '80vw' }}>
              <Link href={item.href} className="block">
                <div className="flex flex-col overflow-hidden rounded-2xl border border-white/[0.07] bg-[#080c0b]/90 shadow-[0_28px_80px_rgba(0,0,0,0.5)] backdrop-blur-md active:border-[#C5A880]/30 transition-colors duration-300">
                  <div className="relative h-[min(42vh,380px)] overflow-hidden sm:h-[40vh]">
                    <Image src={item.url} alt={item.title} fill className="object-cover" sizes="80vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  </div>

                  <div className="space-y-4 bg-[#060908] p-6 sm:p-7">
                    <h3 className="text-balance font-playfair text-[clamp(1.5rem,4.5vw,1.85rem)] font-light tracking-tight text-white/90">
                      {item.title}
                    </h3>

                    <div className="h-[1px] w-12 bg-[#C5A880]/60" />

                    <span className="block text-[10px] font-medium uppercase tracking-[0.25em] text-[#C5A880]">{item.label}</span>

                    <p className="text-sm font-light leading-relaxed text-white/70">{item.description}</p>

                    <div className="flex items-center gap-2 pt-1">
                      <span className="font-[family-name:var(--font-manrope)] text-[10px] font-semibold uppercase tracking-[0.28em] text-[#C5A880]/80">
                        View Project
                      </span>
                      <ArrowUpRight className="h-3.5 w-3.5 text-[#C5A880]/80" strokeWidth={1.75} />
                    </div>
                  </div>
                </div>
              </Link>

              {index < experienceItems.length - 1 ? (
                <div className="pointer-events-none absolute bottom-0 right-0 top-0 w-4" />
              ) : null}
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-20 py-10 pl-[max(1.5rem,env(safe-area-inset-left,0px))] pr-[max(1.5rem,env(safe-area-inset-right,0px))] pb-[max(2rem,env(safe-area-inset-bottom,0px))] sm:pl-8 sm:pr-8">
        <div className="flex items-center justify-center gap-3">
          <div className="relative h-[1px] w-32 bg-white/10">
            <div
              className="absolute inset-y-0 left-0 bg-[#C5A880] transition-[width] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{ width: progressWidth }}
            />
          </div>
          <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-white/30 tabular-nums">
            {String(currentIndex + 1).padStart(2, '0')} / {String(experienceItems.length).padStart(2, '0')}
          </span>
        </div>
      </div>
    </section>
  );
}

export default function HorizontalScrollCarousel() {
  const targetRef = useRef(null);
  // Progress locked to the sticky-pin range — animation finishes exactly when the
  // section is about to release its pin, so there's no "last card cut off /
  // next section bleeds in" race.
  const scrollP = useStickyPinProgress(targetRef);

  return (
    <>
      <DesktopExperience targetRef={targetRef} scrollP={scrollP} />
      <MobileExperience />
    </>
  );
}
