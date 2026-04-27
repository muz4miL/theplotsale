'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useVideoAutoplay } from '@/hooks/useVideoAutoplay';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { LuxurySkylineGlyph } from '@/components/shared/LuxuryMotionAccents';

const HERO_VIDEO = '/videos/1.mp4';
const HERO_POSTER = '/lifestyle-hero.png';

export default function MobileHeroVideo() {
  const containerRef = useRef(null);
  const overlayRef = useRef(null);
  const headlineRef = useRef(null);
  const sublineRef = useRef(null);
  const taglineRef = useRef(null);
  const ctaRef = useRef(null);
  const posterRef = useRef(null);

  const reduced = usePrefersReducedMotion();
  const { videoRef, status, play, posterVisible } = useVideoAutoplay({
    src: HERO_VIDEO,
    poster: HERO_POSTER,
    loop: true,
  });

  const isError = status === 'error';
  const isBlocked = status === 'blocked';
  const isLoading = status === 'loading';
  const isPlaying = status === 'playing';

  // GSAP entrance animations (mobile-optimized: no pin, no scrub)
  useEffect(() => {
    if (reduced) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      tl.fromTo(
        headlineRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.9 },
        0.2
      )
        .fromTo(
          sublineRef.current,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.8 },
          0.45
        )
        .fromTo(
          taglineRef.current,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.7 },
          0.65
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.6 },
          0.85
        );

      // Parallax on scroll (lightweight, no pin)
      gsap.to(overlayRef.current, {
        y: -40,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [reduced]);

  // Ken Burns animation on poster when video fails
  useEffect(() => {
    if (!isError || !posterRef.current) return;
    const tween = gsap.to(posterRef.current, {
      scale: 1.08,
      duration: 20,
      ease: 'none',
      repeat: -1,
      yoyo: true,
    });
    return () => tween.kill();
  }, [isError]);

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden bg-[#030303]"
      style={{ height: '100dvh', minHeight: '600px' }}
    >
      {/* ── Video + Poster Layer ── */}
      <div className="absolute inset-0 z-10 bg-[#0a0a0a]">
        {/* Poster image: always rendered, crossfades out when video plays */}
        <div
          ref={posterRef}
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(10,10,10,0.3), rgba(10,10,10,0.7)), url(${HERO_POSTER})`,
            opacity: posterVisible ? 1 : 0,
            transform: 'scale(1)',
          }}
        />

        {/* Video element */}
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-1000"
          src={HERO_VIDEO}
          poster={HERO_POSTER}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          webkit-playsinline="true"
          x5-playsinline="true"
          disablePictureInPicture
          controlsList="nodownload nofullscreen noremoteplayback"
          aria-hidden="true"
          style={{
            opacity: isPlaying ? 1 : 0,
          }}
        />

        {/* Gradient overlays for text readability */}
        <div
          className="pointer-events-none absolute inset-0 z-[11]"
          style={{
            background:
              'linear-gradient(to top, rgba(3,3,3,0.95) 0%, rgba(3,3,3,0.5) 45%, rgba(3,3,3,0.15) 72%, transparent 100%)',
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 z-[11]"
          style={{
            background:
              'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, transparent 25%)',
          }}
        />
      </div>

      {/* ── Loading State ── */}
      {isLoading && (
        <div className="absolute inset-0 z-40 flex flex-col items-center justify-center">
          <div className="flex flex-col items-center gap-5">
            <div className="relative h-14 w-14">
              <div className="absolute inset-0 rounded-full border-[2.5px] border-[#C5A880]/12" />
              <div className="absolute inset-0 animate-spin rounded-full border-[2.5px] border-transparent border-t-[#C5A880]" />
            </div>
            <p className="font-[family-name:var(--font-manrope)] text-[10px] uppercase tracking-[0.34em] text-[#C5A880]/80">
              Preparing scene
            </p>
          </div>
        </div>
      )}

      {/* ── Tap-to-Play State (autoplay blocked) ── */}
      {isBlocked && (
        <button
          type="button"
          onClick={play}
          className="absolute inset-0 z-40 flex cursor-pointer items-center justify-center border-0 bg-black/40 backdrop-blur-[3px] active:bg-black/50"
          aria-label="Begin cinematic introduction"
        >
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#C5A880]/45 bg-[#C5A880]/12 shadow-[0_0_40px_rgba(197,168,128,0.2)] backdrop-blur-md transition-transform duration-300 active:scale-95">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="#C5A880" aria-hidden>
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <p className="font-[family-name:var(--font-manrope)] text-[11px] uppercase tracking-[0.28em] text-white/90">
              Tap to begin
            </p>
          </div>
        </button>
      )}

      {/* ── Content Overlay ── */}
      <div
        ref={overlayRef}
        className="absolute inset-x-0 bottom-0 z-20 flex flex-col justify-end px-6 pb-[max(1.5rem,env(safe-area-inset-bottom,0px))] pt-24 sm:px-8"
      >
        {/* Top-left decorative glyph */}
        <div className="pointer-events-none absolute right-4 top-[max(5rem,env(safe-area-inset-top,0px))] z-[14] opacity-[0.15]">
          <LuxurySkylineGlyph className="h-9 w-24" />
        </div>

        <div className="mb-3 flex items-center gap-3">
          <div className="h-px w-10 shrink-0 bg-gradient-to-r from-[#C5A880] to-transparent sm:w-12" />
          <span
            ref={taglineRef}
            className="font-[family-name:var(--font-manrope)] text-[10px] font-medium uppercase tracking-[0.32em] text-[#C5A880]"
            style={{ textShadow: '0 2px 12px rgba(0,0,0,0.85)' }}
          >
            Premier real estate consultancy
          </span>
        </div>

        <h1
          ref={headlineRef}
          className="max-w-[20ch] font-[family-name:var(--font-playfair)] text-[clamp(2rem,7vw,3.25rem)] font-light leading-[1.08] tracking-[-0.02em] text-white"
          style={{ textShadow: '0 6px 28px rgba(0,0,0,0.78)' }}
        >
          Cultivating Futures
        </h1>

        <p
          ref={sublineRef}
          className="mt-3 max-w-prose font-[family-name:var(--font-playfair)] text-[clamp(1.05rem,3.8vw,1.35rem)] font-light italic leading-snug text-[#e8d4bc]"
          style={{ textShadow: '0 4px 22px rgba(0,0,0,0.82)' }}
        >
          We are not just building homes. We are shaping dreams into addresses.
        </p>

        <p
          className="mt-5 font-[family-name:var(--font-manrope)] text-[10px] uppercase tracking-[0.3em] text-white/50"
          style={{ textShadow: '0 2px 8px rgba(0,0,0,0.6)' }}
        >
          London · Lahore
        </p>

        {/* Scroll indicator */}
        <div ref={ctaRef} className="mt-8 flex flex-col items-center gap-2 border-t border-white/[0.06] pt-6">
          <span className="font-[family-name:var(--font-manrope)] text-[9px] uppercase tracking-[0.3em] text-[#C5A880]/85">
            Explore
          </span>
          <div className="relative h-9 w-px overflow-hidden rounded-full bg-white/10">
            <div
              className="absolute top-0 h-4 w-full animate-scroll-indicator rounded-full"
              style={{ background: 'linear-gradient(to bottom, #C5A880, transparent)' }}
            />
          </div>
        </div>
      </div>

      {/* Bottom gold hairline */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[25] h-px bg-gradient-to-r from-transparent via-[#C5A880]/35 to-transparent"
        aria-hidden
      />
    </section>
  );
}