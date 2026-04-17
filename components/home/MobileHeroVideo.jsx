'use client';

/**
 * Mobile-only hero: full-bleed video + luxury copy. Desktop uses HeroVideoParallax unchanged.
 * iOS Safari: muted + playsInline + play() must run synchronously inside tap/click (no async handler).
 * Overlay z-index must sit above hero copy so “Tap to play” receives touches.
 */

import { useRef, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { LuxurySkylineGlyph } from '@/components/shared/LuxuryMotionAccents';

const VIDEOS = ['/videos/1.mp4', '/videos/2.mp4', '/videos/3.mp4'];
const POSTER = '/lifestyle-hero.png';

function applyIosVideoAttrs(video) {
  if (!video) return;
  video.muted = true;
  video.defaultMuted = true;
  video.volume = 0;
  video.playsInline = true;
  video.setAttribute('playsinline', '');
  video.setAttribute('webkit-playsinline', '');
  video.setAttribute('muted', '');
}

/** Call play() synchronously — required for user-activation on WebKit. */
function tryPlayNow(video, onPlaying, onBlocked) {
  if (!video) {
    onBlocked?.();
    return;
  }
  applyIosVideoAttrs(video);
  try {
    const p = video.play();
    if (p !== undefined) {
      p.then(() => onPlaying?.()).catch(() => onBlocked?.());
    } else {
      onPlaying?.();
    }
  } catch {
    onBlocked?.();
  }
}

export default function MobileHeroVideo() {
  const videoRef = useRef(null);
  const heroAreaRef = useRef(null);
  const lastUserPlayRef = useRef(0);
  const [index, setIndex] = useState(0);
  /** buffering | playing | needs_tap | error */
  const [phase, setPhase] = useState('buffering');

  useEffect(() => {
    setPhase('buffering');
  }, [index]);

  const markPlaying = useCallback(() => setPhase('playing'), []);
  const markNeedsTap = useCallback(() => setPhase('needs_tap'), []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let cancelled = false;
    applyIosVideoAttrs(video);

    const tryAutoplay = () => {
      if (cancelled) return;
      tryPlayNow(
        video,
        () => {
          if (!cancelled) markPlaying();
        },
        () => {
          if (!cancelled) markNeedsTap();
        }
      );
    };

    const onPlaying = () => {
      if (!cancelled) markPlaying();
    };
    const onError = () => {
      if (!cancelled) setPhase('error');
    };

    video.addEventListener('playing', onPlaying);
    video.addEventListener('error', onError);

    // Defer one frame so layout + decoder can attach (helps first paint on iOS)
    const raf = requestAnimationFrame(() => {
      tryAutoplay();
    });

    const t1 = window.setTimeout(tryAutoplay, 120);
    const t2 = window.setTimeout(tryAutoplay, 600);
    const softFail = window.setTimeout(() => {
      if (!cancelled && video.paused) markNeedsTap();
    }, 3200);

    const root = heroAreaRef.current;
    let io;
    if (root && typeof IntersectionObserver !== 'undefined') {
      io = new IntersectionObserver(
        (entries) => {
          const vis = entries.some((e) => e.isIntersecting && e.intersectionRatio > 0.15);
          if (vis && video.paused) tryAutoplay();
        },
        { threshold: [0, 0.15, 0.35] }
      );
      io.observe(root);
    }

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(softFail);
      video.removeEventListener('playing', onPlaying);
      video.removeEventListener('error', onError);
      io?.disconnect();
    };
  }, [index, markPlaying, markNeedsTap]);

  const handleEnded = () => {
    setIndex((i) => (i + 1) % VIDEOS.length);
  };

  /** User gesture: must stay synchronous — no async/await. */
  const handleUserPlayIntent = () => {
    const now = Date.now();
    if (now - lastUserPlayRef.current < 350) return;
    lastUserPlayRef.current = now;

    const video = videoRef.current;
    tryPlayNow(
      video,
      () => setPhase('playing'),
      () => setPhase('needs_tap')
    );
  };

  return (
    <section ref={heroAreaRef} className="relative min-h-[100svh] w-full overflow-hidden bg-[#030303]">
      <div className="relative min-h-[min(72svh,720px)] w-full overflow-hidden">
        {phase !== 'error' ? (
          <video
            ref={videoRef}
            key={index}
            className="absolute inset-0 z-[1] h-full w-full object-cover"
            poster={POSTER}
            preload="auto"
            muted
            playsInline
            autoPlay
            controls={false}
            disablePictureInPicture
            onEnded={handleEnded}
          >
            <source src={VIDEOS[index]} type="video/mp4" />
          </video>
        ) : (
          <div className="absolute inset-0 z-[1]">
            <Image src={POSTER} alt="" fill className="object-cover" sizes="100vw" priority />
          </div>
        )}

        <div
          className="pointer-events-none absolute inset-0 z-[2]"
          style={{
            background:
              'linear-gradient(to top, rgba(3,3,3,0.98) 0%, rgba(3,3,3,0.5) 45%, rgba(0,0,0,0.2) 72%, transparent 100%), linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, transparent 32%)',
          }}
        />

        {phase === 'buffering' && (
          <div className="pointer-events-none absolute right-4 top-[max(5.5rem,env(safe-area-inset-top,0px))] z-[18] flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-3 py-1.5 backdrop-blur-md">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#C5A880]" />
            <span className="font-[family-name:var(--font-manrope)] text-[9px] uppercase tracking-[0.28em] text-[#C5A880]/90">
              Loading
            </span>
          </div>
        )}

        {phase === 'needs_tap' && (
          <button
            type="button"
            className="absolute inset-0 z-[200] flex cursor-pointer touch-manipulation flex-col items-center justify-center border-0 bg-black/35 backdrop-blur-[1px] active:bg-black/45"
            style={{ WebkitTapHighlightColor: 'transparent' }}
            onClick={handleUserPlayIntent}
            aria-label="Play video"
          >
            <div className="pointer-events-none flex flex-col items-center gap-3 px-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#C5A880]/45 bg-[#C5A880]/10 shadow-[0_0_40px_rgba(197,168,128,0.15)]">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#C5A880" aria-hidden>
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <p className="font-[family-name:var(--font-manrope)] text-[10px] uppercase tracking-[0.3em] text-white/85">
                Tap to play
              </p>
            </div>
          </button>
        )}

        {phase === 'playing' && (
          <div className="pointer-events-none absolute right-[max(0.75rem,env(safe-area-inset-right,0px))] top-[max(5.5rem,env(safe-area-inset-top,0px))] z-[14] opacity-[0.16]">
            <LuxurySkylineGlyph className="h-9 w-24" />
          </div>
        )}

        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[15] h-px bg-gradient-to-r from-transparent via-[#C5A880]/35 to-transparent"
          aria-hidden
        />

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[20] lux-mobile-page-gutter pb-[max(1.25rem,env(safe-area-inset-bottom,0px))]">
          <div className="rounded-t-2xl bg-gradient-to-t from-black via-black/94 to-transparent px-1 pb-2 pt-12 sm:pt-14">
            <div className="mb-3 flex items-center gap-3">
              <div className="h-px w-10 shrink-0 bg-gradient-to-r from-[#C5A880] to-transparent sm:w-12" />
              <span
                className="font-[family-name:var(--font-manrope)] text-[10px] font-medium uppercase leading-snug tracking-[0.28em] text-[#C5A880] sm:text-[11px]"
                style={{ textShadow: '0 2px 12px rgba(0,0,0,0.85)' }}
              >
                Premier real estate consultancy
              </span>
            </div>

            <h1
              className="max-w-[22ch] font-[family-name:var(--font-playfair)] text-[clamp(1.75rem,6.2vw,2.5rem)] font-light leading-[1.1] tracking-[-0.02em] text-white text-balance"
              style={{ textShadow: '0 6px 28px rgba(0,0,0,0.78)' }}
            >
              Cultivating Futures
            </h1>

            <p
              className="mt-3 max-w-prose font-[family-name:var(--font-playfair)] text-[clamp(1rem,3.5vw,1.25rem)] font-light italic leading-snug text-[#e8d4bc] text-pretty"
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

            {phase === 'playing' && (
              <div className="mt-8 flex flex-col items-center gap-2 border-t border-white/[0.06] pt-6">
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
            )}
          </div>
        </div>
      </div>

      <div className="relative border-t border-white/[0.06] bg-[linear-gradient(180deg,#060807_0%,#0a0a0a_45%,#080a09_100%)]">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-32 opacity-40"
          style={{
            background: 'radial-gradient(ellipse 120% 100% at 50% 0%, rgba(197,168,128,0.12), transparent 55%)',
          }}
        />

        <div className="relative mx-auto max-w-lg lux-mobile-page-gutter py-16 sm:py-20">
          <div
            className="rounded-2xl border border-white/[0.07] bg-[#0c1010]/80 px-6 py-10 shadow-[0_32px_80px_rgba(0,0,0,0.55)] backdrop-blur-md sm:rounded-3xl sm:px-8 sm:py-12"
            style={{
              boxShadow:
                '0 32px 80px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.04), 0 0 0 1px rgba(197,168,128,0.06)',
            }}
          >
            <div className="mx-auto mb-8 h-px w-20 bg-gradient-to-r from-transparent via-[#C5A880]/55 to-transparent sm:mb-10 sm:w-24" />
            <div className="mb-5 text-center">
              <span className="font-[family-name:var(--font-manrope)] text-[11px] uppercase tracking-[0.28em] text-[#C5A880]">
                London · Lahore
              </span>
            </div>
            <div className="text-center">
              <h2
                className="font-[family-name:var(--font-playfair)] text-[clamp(1.65rem,5vw,2.15rem)] font-light leading-tight tracking-tight text-[#f2f4f6] text-balance"
                style={{ textShadow: '0 4px 28px rgba(0,0,0,0.45)' }}
              >
                Aspirations into
              </h2>
              <h2
                className="mt-1 font-[family-name:var(--font-playfair)] text-[clamp(1.65rem,5vw,2.15rem)] font-light italic leading-tight tracking-tight text-[#C5A880] text-balance"
                style={{ textShadow: '0 4px 28px rgba(0,0,0,0.45)' }}
              >
                Foundations
              </h2>
            </div>
            <p className="mx-auto mt-8 max-w-prose text-center font-[family-name:var(--font-manrope)] text-[15px] font-light leading-[1.75] tracking-[0.01em] text-white/[0.78] text-pretty sm:text-base sm:leading-[1.8]">
              At ThePlotSale, we are committed to delivering real estate solutions marked by transparency and
              integrity, bridging developers and homeowners in a trusted partnership. We envision a sustainable future
              where every property is not just an asset, but a space people are proud to call home.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
