'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

const experienceItems = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1000',
    title: 'AIRPORT CITY',
    label: 'Sialkot',
    description: 'Home is Where Your Story Unfolds - Premium residential and commercial development with world-class infrastructure.',
    isPortrait: true,
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000',
    title: 'CANAL FORT 2',
    label: 'Lahore',
    description: 'A Place to Grow, A Place to Belong - Master-planned community offering modern living spaces and family-friendly amenities.',
    isPortrait: false,
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1000',
    title: 'EXXSN HEIGHTS',
    label: 'Lahore',
    description: 'Premium Vertical Development Under Way - Contemporary high-rise living with luxury finishes and panoramic views.',
    isPortrait: true,
  },
  {
    id: 4,
    url: '/amenities/events-vertical.png',
    title: 'PEARL GARDEN',
    label: 'Lahore',
    description: 'Premium Vertical Development Under Way - Elegant residential towers designed for sophisticated urban living.',
    isPortrait: true,
  },
  {
    id: 5,
    url: '/amenities/kids-zone.png',
    title: 'SIDDIQUE CITY',
    label: 'Lahore',
    description: 'Elevated Living, Grounded in Comfort - Sustainable community development with green spaces and modern infrastructure.',
    isPortrait: false,
  },
];

// ============================================================================
// DESKTOP EXPERIENCE - SCROLL-BASED HORIZONTAL ANIMATION
// DO NOT MODIFY - This is the original, perfect desktop experience
// ============================================================================
function DesktopExperience({ targetRef, scrollYProgress, x }) {
  return (
    <section
      ref={targetRef}
      className="relative bg-[#0A0A0A] hidden md:block"
      style={{ height: '500vh' }}
    >
      {/* Sticky Container */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Static Background - No Animation for Performance */}
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

        {/* Noise Texture */}
        <div
          className="absolute inset-0 opacity-[0.02] pointer-events-none mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
          }}
        />

        {/* Section Header - Top Left */}
        <div className="absolute top-12 left-8 md:left-16 lg:left-24 z-30">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-[1px] w-10 bg-gradient-to-r from-[#C5A880] to-transparent" />
            <span className="text-[#C5A880] text-[10px] tracking-[0.35em] uppercase font-medium">
              Our Portfolio
            </span>
          </div>
          <h2 className="font-playfair text-3xl md:text-4xl font-light tracking-tight text-white/90">
            Track Record & Expertise
          </h2>
        </div>

        {/* Horizontal Scrolling Track - Optimized with will-change */}
        <motion.div
          style={{ x, willChange: 'transform' }}
          className="absolute inset-0 flex items-end pb-20 gap-0 pl-[15vw]"
        >
          {experienceItems.map((item, index) => {
            const isPortrait = item.isPortrait;

            return (
              <div
                key={item.id}
                className="relative flex-shrink-0 flex items-center"
                style={{
                  marginRight: isPortrait ? 'clamp(40px, 8vw, 80px)' : 'clamp(60px, 12vw, 150px)',
                }}
              >
                {/* Vertical Text for Portrait, Horizontal for Landscape */}
                {isPortrait ? (
                  <div className="relative flex-shrink-0 h-[50vh] flex items-center justify-center mr-6 md:mr-8" style={{ width: '10vh' }}>
                    <h3
                      className="font-playfair text-[8vh] md:text-[9vh] font-light text-white/10 whitespace-nowrap select-none absolute"
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
                    <h3 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-light text-white/10 whitespace-nowrap select-none tracking-tight">
                      {item.title}
                    </h3>
                  </div>
                )}

                {/* Image Card */}
                <div className="relative flex-shrink-0 group">
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
                      sizes={isPortrait ? "(max-width: 768px) 30vw, 320px" : "(max-width: 768px) 45vw, 500px"}
                    />
                    <div className="absolute inset-0 border border-white/10 group-hover:border-[#C5A880]/20 transition-colors duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-100 group-hover:opacity-100 transition-opacity duration-700" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                      <div className="mb-2">
                        <span className="text-[#C5A880] group-hover:text-[#D4AF8A] text-[10px] tracking-[0.25em] uppercase font-medium transition-colors duration-500">
                          {item.label}
                        </span>
                      </div>
                      <p className="text-white/70 group-hover:text-white text-xs md:text-sm font-light leading-relaxed transition-colors duration-500">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          <div className="flex-shrink-0 w-[50vw]" />
        </motion.div>

        {/* Scroll Progress Indicator */}
        <div className="absolute bottom-12 right-8 md:right-16 z-30">
          <div className="flex items-center gap-4">
            <span className="text-white/30 text-[10px] tracking-[0.3em] uppercase font-medium">
              Scroll to Explore
            </span>
            <div className="relative w-20 h-[1px] bg-white/10">
              <motion.div
                className="absolute inset-y-0 left-0 bg-[#C5A880]"
                style={{
                  width: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]),
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// MOBILE EXPERIENCE - PREMIUM SWIPER CAROUSEL
// Luxury horizontal swipe with snap, peek, and minimal progress indicator
// ============================================================================
function MobileExperience() {
  const scrollRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const cardWidth = container.offsetWidth * 0.8; // 80vw card width
      const newIndex = Math.round(scrollLeft / cardWidth);
      setCurrentIndex(newIndex);
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative bg-[#0A0A0A] md:hidden min-h-screen flex flex-col">
      {/* Static Background */}
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

      {/* Noise Texture */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
        }}
      />

      {/* Section Header - Centered */}
      <div className="relative z-20 flex flex-col items-center px-[max(1.5rem,env(safe-area-inset-left,0px))] pb-10 pt-14 text-center max-[380px]:pt-12 sm:px-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-[1px] w-8 bg-gradient-to-r from-transparent via-[#C5A880] to-[#C5A880]" />
          <span className="text-[#C5A880] text-[9px] tracking-[0.35em] uppercase font-medium">
            Our Portfolio
          </span>
          <div className="h-[1px] w-8 bg-gradient-to-l from-transparent via-[#C5A880] to-[#C5A880]" />
        </div>
        <h2 className="max-w-[18ch] font-playfair text-[clamp(1.45rem,4.8vw,1.85rem)] font-light leading-tight tracking-tight text-white/90 text-balance">
          Track Record & Expertise
        </h2>
      </div>

      {/* Swipeable Carousel Container */}
      <div className="relative flex-1 z-10">
        <div
          ref={scrollRef}
          className="flex h-full snap-x snap-mandatory items-center gap-4 overflow-x-auto pl-[max(1.5rem,env(safe-area-inset-left,0px))] pr-[max(1.5rem,env(safe-area-inset-right,0px))] no-scrollbar sm:pl-8 sm:pr-8"
          style={{
            scrollBehavior: 'smooth',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {experienceItems.map((item, index) => (
            <motion.div
              key={item.id}
              className="flex-shrink-0 snap-center"
              style={{ width: '80vw' }}
            >
              {/* Magazine-Style Card */}
              <div className="flex flex-col overflow-hidden rounded-2xl border border-white/[0.07] bg-[#080c0b]/90 shadow-[0_28px_80px_rgba(0,0,0,0.5)] backdrop-blur-md">

                {/* Image Container - Clean, No Overlays */}
                <div className="relative h-[min(42vh,380px)] overflow-hidden sm:h-[40vh]">
                  <Image
                    src={item.url}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="80vw"
                  />
                </div>

                {/* Text Container - Below Image */}
                <div className="space-y-4 bg-[#060908] p-6 sm:p-7">
                  {/* Title */}
                  <h3 className="font-playfair text-[clamp(1.5rem,4.5vw,1.85rem)] font-light tracking-tight text-white/90 text-balance">
                    {item.title}
                  </h3>

                  {/* Separator Line */}
                  <div className="h-[1px] w-12 bg-[#C5A880]/60" />

                  {/* Label */}
                  <span className="block text-[#C5A880] text-[10px] tracking-[0.25em] uppercase font-medium">
                    {item.label}
                  </span>

                  {/* Description */}
                  <p className="text-white/70 text-sm font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Peek Spacer - Creates the slight peek effect */}
              {index < experienceItems.length - 1 && (
                <div className="absolute right-0 top-0 bottom-0 w-4 pointer-events-none" />
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Minimal Progress Indicator - Bottom */}
      <div className="relative z-20 py-10 pl-[max(1.5rem,env(safe-area-inset-left,0px))] pr-[max(1.5rem,env(safe-area-inset-right,0px))] pb-[max(2rem,env(safe-area-inset-bottom,0px))] sm:pl-8 sm:pr-8">
        <div className="flex items-center justify-center gap-3">
          {/* Thin Luxury Line Indicator */}
          <div className="relative w-32 h-[1px] bg-white/10">
            <motion.div
              className="absolute inset-y-0 left-0 bg-[#C5A880]"
              animate={{
                width: `${((currentIndex + 1) / experienceItems.length) * 100}%`,
              }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
          {/* Counter */}
          <span className="text-white/30 text-[10px] tracking-[0.3em] uppercase font-medium tabular-nums">
            {String(currentIndex + 1).padStart(2, '0')} / {String(experienceItems.length).padStart(2, '0')}
          </span>
        </div>
      </div>
    </section>
  );
}


// ============================================================================
// MAIN COMPONENT - RENDERS DESKTOP OR MOBILE BASED ON SCREEN SIZE
// ============================================================================
export default function HorizontalScrollCarousel() {
  const targetRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-85%"]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Render both components but let CSS handle visibility to avoid hydration issues
  return (
    <>
      {/* DESKTOP: Original scroll-based horizontal animation */}
      <DesktopExperience
        targetRef={targetRef}
        scrollYProgress={scrollYProgress}
        x={x}
      />

      {/* MOBILE: Premium swiper carousel */}
      <MobileExperience />
    </>
  );
}
