'use client';

/**
 * AboutHero — full-bleed cinematic video hero.
 *
 * Design pattern (React 19 / Next.js hydration-safe):
 *   - Pure native <video> with autoPlay, muted, loop, playsInline.
 *   - Poster layer rendered as a CSS background that's instantly visible on first paint
 *     and fades out only when the video has decoded a frame. Prevents the
 *     "empty black hero while video downloads" flash.
 *   - IntersectionObserver pauses the video when the user has scrolled past the hero,
 *     so playback never burns CPU off-screen.
 *   - Soft play / mute controls (pure CSS hover states, no Framer on paint).
 *   - No GSAP, no pinning, no scroll-driven layout — avoids the bug class the home
 *     BentoGrid and ClubPhilosophy had.
 */

import { useEffect, useRef, useState } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

const VIDEO_SRC = '/About_Hero_Cinematic.mp4';
const POSTER_SRC = '/images/architecture.png';

/**
 * React 19 / Next.js-safe video preload helper.
 *
 * We call react-dom's `preload()` at module-evaluation time on the client so
 * that the browser starts fetching the video even before the <video> element
 * actually mounts. The <link rel="preload"> in app/about/layout.jsx handles
 * the very first paint on SSR; this covers client-side navigation to /about.
 */
if (typeof window !== 'undefined') {
  // Lazy-require to avoid pulling the helper into SSR bundles unnecessarily.
  import('react-dom').then((mod) => {
    try {
      mod.preload?.(VIDEO_SRC, { as: 'video', fetchPriority: 'high' });
      mod.preload?.(POSTER_SRC, { as: 'image', fetchPriority: 'high' });
    } catch {
      /* react-dom < 19 — safe to ignore */
    }
  });
}

export default function AboutHero() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const [canPlay, setCanPlay] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
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

  // Pause when fully off-screen to save decode cycles; resume when back in view.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        const v = videoRef.current;
        if (!v) return;
        if (entry.isIntersecting) {
          const p = v.play();
          if (p && typeof p.catch === 'function') p.catch(() => {});
        } else {
          v.pause();
        }
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      const p = v.play();
      if (p && typeof p.catch === 'function') p.catch(() => {});
    } else {
      v.pause();
    }
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setIsMuted(v.muted);
  };

  return (
    <section
      ref={sectionRef}
      className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-black"
      aria-label="About ThePlotSale — cinematic introduction"
    >
      {/* 1) Poster — visible instantly, fades once video is ready */}
      <div
        className="absolute inset-0 z-[1] transition-opacity duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
        style={{
          backgroundImage: `url(${POSTER_SRC})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: canPlay ? 0 : 1,
          transform: 'scale(1.02)',
        }}
        aria-hidden
      />

      {/* 2) Video surface */}
      <div className="absolute inset-0 z-[2]">
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          src={VIDEO_SRC}
          poster={POSTER_SRC}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          // iOS inline-play quirks
          webkit-playsinline="true"
          x5-playsinline="true"
          onCanPlay={() => setCanPlay(true)}
          onLoadedData={() => setCanPlay(true)}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />
      </div>

      {/* 3) Cinematic grade — taller top dark band so the nav melts in, softer
             mid-band, firm bottom so typography + controls read */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-[3] h-[28%] bg-gradient-to-b from-black/80 via-black/35 to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 z-[3] bg-gradient-to-t from-black/80 via-black/10 to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 z-[3] bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(0,0,0,0.55)_100%)]"
        aria-hidden
      />
      <div className="lux-listing-grain pointer-events-none absolute inset-0 z-[3] opacity-[0.14]" aria-hidden />

      {/* 4) Editorial corner brackets — matches the /projects spotlight language */}
      <div className="pointer-events-none absolute inset-6 z-[4] sm:inset-8 lg:inset-12" aria-hidden>
        <div className="absolute left-0 top-0 h-8 w-8 border-l border-t border-[#C5A880]/55 sm:h-10 sm:w-10" />
        <div className="absolute right-0 top-0 h-8 w-8 border-r border-t border-[#C5A880]/55 sm:h-10 sm:w-10" />
        <div className="absolute bottom-0 left-0 h-8 w-8 border-b border-l border-[#C5A880]/55 sm:h-10 sm:w-10" />
        <div className="absolute bottom-0 right-0 h-8 w-8 border-b border-r border-[#C5A880]/55 sm:h-10 sm:w-10" />
      </div>

      {/* 5) Top rail — brand chip */}
      <div className="pointer-events-none absolute left-0 right-0 top-0 z-[5] flex items-start justify-between gap-4 px-6 pt-[max(5rem,calc(env(safe-area-inset-top,0px)+4.25rem))] sm:px-10 lg:px-14">
        <div className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-white/[0.14] bg-black/40 px-3 py-1.5 backdrop-blur-md">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#C5A880] shadow-[0_0_10px_rgba(197,168,128,0.6)]" />
          <span className="font-[family-name:var(--font-manrope)] text-[9px] font-semibold uppercase tracking-[0.32em] text-white/70">
            ThePlotSale · Est. 1998
          </span>
        </div>
        <div className="pointer-events-auto hidden items-center gap-2 rounded-full border border-white/[0.14] bg-black/40 px-3 py-1.5 backdrop-blur-md sm:inline-flex">
          <span className="font-[family-name:var(--font-manrope)] text-[9px] font-semibold uppercase tracking-[0.32em] text-[#C5A880]">
            Cinematic Brief · 2026
          </span>
        </div>
      </div>

      {/* 6) Editorial masthead */}
      <div className="absolute inset-0 z-[5] flex h-full flex-col items-center justify-center px-6 text-center md:px-12">
        <p className="about-hero-stagger-1 font-[family-name:var(--font-manrope)] text-[10px] font-medium uppercase tracking-[0.42em] text-[#C5A880] md:text-[11px]">
          Premier Real Estate Consultancy
        </p>

        <div className="about-hero-stagger-1 mx-auto mt-5 flex items-center justify-center gap-4">
          <div className="h-px w-10 bg-gradient-to-r from-transparent to-[#C5A880]/70" />
          <span className="font-[family-name:var(--font-manrope)] text-[9px] uppercase tracking-[0.32em] text-[#C5A880]/80">
            London · Lahore
          </span>
          <div className="h-px w-10 bg-gradient-to-l from-transparent to-[#C5A880]/70" />
        </div>

        <h1 className="about-hero-stagger-2 mt-6 font-playfair text-[clamp(3rem,10vw,7.5rem)] font-light leading-[0.98] tracking-tight text-white drop-shadow-[0_8px_40px_rgba(0,0,0,0.6)] md:mt-8">
          About <span className="italic text-[#e8dcc4]">Us</span>
        </h1>

        <p className="about-hero-stagger-3 mt-7 max-w-md font-playfair text-lg font-light italic leading-snug text-white/80 md:mt-9 md:max-w-2xl md:text-2xl">
          We are not just building homes — we are shaping dreams into addresses.
        </p>

        <p className="about-hero-stagger-3 mx-auto mt-6 max-w-xl font-[family-name:var(--font-manrope)] text-[11px] font-light leading-relaxed tracking-[0.08em] text-white/50 md:text-[13px]">
          A private advisory bridging London residences and Pakistan flagships — curated by the Siddique family since 1998.
        </p>
      </div>

      {/* 7) Bottom rail — video controls + scroll hint.
             On mobile the controls stack above the centered scroll hint so
             nothing overlaps on portrait viewports. */}
      <div className="absolute bottom-0 left-0 right-0 z-[6] flex flex-col items-center gap-3 px-5 pb-[max(1.25rem,calc(env(safe-area-inset-bottom,0px)+1rem))] sm:flex-row sm:items-end sm:justify-between sm:gap-4 sm:px-10 sm:pb-8 lg:px-14 lg:pb-10">
        <div className="pointer-events-auto flex items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={togglePlay}
            aria-label={isPlaying ? 'Pause cinematic hero' : 'Play cinematic hero'}
            className="group/ctrl flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.18] bg-black/35 text-white/80 backdrop-blur-md transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-[#C5A880]/65 hover:bg-[#C5A880]/15 hover:text-[#f5f0e8] active:scale-[0.96]"
          >
            {isPlaying ? (
              <Pause className="h-4 w-4" strokeWidth={1.5} />
            ) : (
              <Play className="h-4 w-4 translate-x-[1px]" strokeWidth={1.5} />
            )}
          </button>
          <button
            type="button"
            onClick={toggleMute}
            aria-label={isMuted ? 'Unmute cinematic hero' : 'Mute cinematic hero'}
            className="group/ctrl flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.18] bg-black/35 text-white/80 backdrop-blur-md transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-[#C5A880]/65 hover:bg-[#C5A880]/15 hover:text-[#f5f0e8] active:scale-[0.96]"
          >
            {isMuted ? <VolumeX className="h-4 w-4" strokeWidth={1.5} /> : <Volume2 className="h-4 w-4" strokeWidth={1.5} />}
          </button>
          <div className="ml-3 hidden flex-col gap-0.5 sm:flex">
            <span className="font-[family-name:var(--font-manrope)] text-[9px] font-semibold uppercase tracking-[0.3em] text-[#C5A880]">
              Opening Reel
            </span>
            <span className="font-[family-name:var(--font-manrope)] text-[9px] font-light tracking-[0.2em] text-white/45">
              A ThePlotSale Production
            </span>
          </div>
        </div>

        <div
          className="pointer-events-none flex flex-col items-center transition-opacity duration-500 sm:items-end"
          style={{ opacity: isMobile ? 1 : scrollHintOpacity }}
        >
          <div className="about-hero-chevron motion-reduce:animate-none">
            <svg
              className="h-5 w-5 text-[#C5A880] sm:h-6 sm:w-6"
              fill="none"
              strokeWidth="1"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          <p className="mt-1.5 font-[family-name:var(--font-manrope)] text-[9px] font-semibold uppercase tracking-[0.42em] text-[#C5A880] sm:mt-2">
            Scroll to Discover
          </p>
        </div>
      </div>
    </section>
  );
}
