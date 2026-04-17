'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { useSectionScrollProgress } from '@/hooks/useSectionScrollProgress';

const experienceItems = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1000',
    title: 'AIRPORT CITY',
    label: 'Sialkot',
    description:
      'Home is Where Your Story Unfolds - Premium residential and commercial development with world-class infrastructure.',
    isPortrait: true,
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000',
    title: 'CANAL FORT 2',
    label: 'Lahore',
    description:
      'A Place to Grow, A Place to Belong - Master-planned community offering modern living spaces and family-friendly amenities.',
    isPortrait: false,
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1000',
    title: 'EXXSN HEIGHTS',
    label: 'Lahore',
    description:
      'Premium Vertical Development Under Way - Contemporary high-rise living with luxury finishes and panoramic views.',
    isPortrait: true,
  },
  {
    id: 4,
    url: '/amenities/events-vertical.png',
    title: 'PEARL GARDEN',
    label: 'Lahore',
    description:
      'Premium Vertical Development Under Way - Elegant residential towers designed for sophisticated urban living.',
    isPortrait: true,
  },
  {
    id: 5,
    url: '/amenities/kids-zone.png',
    title: 'SIDDIQUE CITY',
    label: 'Lahore',
    description:
      'Elevated Living, Grounded in Comfort - Sustainable community development with green spaces and modern infrastructure.',
    isPortrait: false,
  },
];

function DesktopExperience({ targetRef, scrollP }) {
  const xPercent = scrollP * -85;
  return (
    <section ref={targetRef} className="relative hidden bg-[#0A0A0A] md:block" style={{ height: '500vh' }}>
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
          className="absolute inset-0 flex items-end gap-0 pb-20 pl-[15vw] will-change-transform"
          style={{ transform: `translateX(${xPercent}%)` }}
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

                <div className="group relative flex-shrink-0">
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
                    <div className="absolute inset-0 border border-white/10 transition-colors duration-700 group-hover:border-[#C5A880]/20" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-100 transition-opacity duration-700 group-hover:opacity-100" />
                    <div className="absolute bottom-0 left-0 right-0 z-10 p-6">
                      <div className="mb-2">
                        <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-[#C5A880] transition-colors duration-500 group-hover:text-[#D4AF8A]">
                          {item.label}
                        </span>
                      </div>
                      <p className="text-xs font-light leading-relaxed text-white/70 transition-colors duration-500 group-hover:text-white md:text-sm">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
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
              <div className="flex flex-col overflow-hidden rounded-2xl border border-white/[0.07] bg-[#080c0b]/90 shadow-[0_28px_80px_rgba(0,0,0,0.5)] backdrop-blur-md">
                <div className="relative h-[min(42vh,380px)] overflow-hidden sm:h-[40vh]">
                  <Image src={item.url} alt={item.title} fill className="object-cover" sizes="80vw" />
                </div>

                <div className="space-y-4 bg-[#060908] p-6 sm:p-7">
                  <h3 className="text-balance font-playfair text-[clamp(1.5rem,4.5vw,1.85rem)] font-light tracking-tight text-white/90">
                    {item.title}
                  </h3>

                  <div className="h-[1px] w-12 bg-[#C5A880]/60" />

                  <span className="block text-[10px] font-medium uppercase tracking-[0.25em] text-[#C5A880]">{item.label}</span>

                  <p className="text-sm font-light leading-relaxed text-white/70">{item.description}</p>
                </div>
              </div>

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
  const scrollP = useSectionScrollProgress(targetRef);

  return (
    <>
      <DesktopExperience targetRef={targetRef} scrollP={scrollP} />
      <MobileExperience />
    </>
  );
}
