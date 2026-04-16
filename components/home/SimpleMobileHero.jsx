'use client';

import { useRef, useState, useEffect } from 'react';
import { LuxurySkylineGlyph } from '@/components/shared/LuxuryMotionAccents';

const VIDEOS = ['/videos/1.mp4', '/videos/2.mp4', '/videos/3.mp4'];
const LOAD_FALLBACK_MS = 9000;

export default function SimpleMobileHero() {
  const videoRef = useRef(null);
  const needsTapRef = useRef(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [showTapToPlay, setShowTapToPlay] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');

    const clearLoading = () => setIsLoading(false);

    const loadFallback = window.setTimeout(() => {
      clearLoading();
    }, LOAD_FALLBACK_MS);

    const attemptPlay = async () => {
      if (!video) return;

      try {
        await video.play();
        needsTapRef.current = false;
        setShowTapToPlay(false);
        clearLoading();
      } catch (err) {
        console.log('Autoplay blocked:', err?.name);
        if (err?.name === 'NotAllowedError') {
          needsTapRef.current = true;
          setShowTapToPlay(true);
        }
        clearLoading();
      }
    };

    const onReady = () => {
      clearLoading();
      void attemptPlay();
    };

    const handleCanPlay = () => onReady();
    const handleLoadedData = () => clearLoading();
    const handlePlaying = () => clearLoading();

    const handleError = (e) => {
      console.error('Video error:', e);
      setHasError(true);
      clearLoading();
    };

    const handleEnded = () => {
      setCurrentVideoIndex((i) => (i + 1) % VIDEOS.length);
    };

    const handleVisibilityChange = () => {
      if (!document.hidden && video.paused && !needsTapRef.current) {
        void attemptPlay();
      }
    };

    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('playing', handlePlaying);
    video.addEventListener('error', handleError);
    video.addEventListener('ended', handleEnded);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    video.load();

    return () => {
      window.clearTimeout(loadFallback);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('playing', handlePlaying);
      video.removeEventListener('error', handleError);
      video.removeEventListener('ended', handleEnded);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [currentVideoIndex]);

  const handleTapToPlayClick = async () => {
    const video = videoRef.current;
    if (!video) return;

    try {
      video.muted = true;
      await video.play();
      needsTapRef.current = false;
      setShowTapToPlay(false);
      setIsLoading(false);
    } catch (err) {
      console.error('Play failed:', err);
    }
  };

  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden bg-[#030303]">
      <div className="relative h-[min(70svh,620px)] min-h-[300px] w-full overflow-hidden sm:h-[min(66svh,660px)]">
        {!hasError && (
          <video
            ref={videoRef}
            key={currentVideoIndex}
            className="absolute inset-0 z-10 h-full w-full object-cover bg-black"
            muted
            playsInline
            preload="metadata"
            style={{
              opacity: isLoading ? 0 : 1,
              transition: 'opacity 0.55s cubic-bezier(0.22, 1, 0.36, 1)',
            }}
          >
            <source src={VIDEOS[currentVideoIndex]} type="video/mp4" />
          </video>
        )}

        <div
          className="pointer-events-none absolute inset-0 z-[12]"
          style={{
            background:
              'linear-gradient(to top, rgba(3,3,3,0.97) 0%, rgba(3,3,3,0.55) 42%, rgba(3,3,3,0.12) 72%, transparent 100%), linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, transparent 28%)',
          }}
        />

        {isLoading && !hasError && (
          <div className="absolute inset-0 z-[35] flex flex-col items-center justify-center bg-[#030303]">
            <div className="flex flex-col items-center gap-5 px-8">
              <div className="relative h-16 w-16">
                <div className="absolute inset-0 rounded-full border-[3px] border-[#C5A880]/12" />
                <div className="absolute inset-0 animate-spin rounded-full border-[3px] border-transparent border-t-[#C5A880]" />
              </div>
              <p className="text-center font-[family-name:var(--font-manrope)] text-[10px] uppercase tracking-[0.34em] text-[#C5A880]/80">
                Preparing scene
              </p>
            </div>
          </div>
        )}

        {showTapToPlay && !isLoading && (
          <button
            type="button"
            className="absolute inset-0 z-30 flex cursor-pointer items-center justify-center border-0 bg-black/50 backdrop-blur-[2px] active:bg-black/60"
            onClick={handleTapToPlayClick}
            aria-label="Begin cinematic introduction"
          >
            <div className="flex flex-col items-center gap-4 px-6 text-center">
              <div className="flex h-[72px] w-[72px] items-center justify-center rounded-full border border-[#C5A880]/50 bg-[#C5A880]/12 shadow-[0_0_48px_rgba(197,168,128,0.18)] backdrop-blur-md transition-transform duration-300 active:scale-95">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="#C5A880" aria-hidden>
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <p className="font-[family-name:var(--font-manrope)] text-[11px] uppercase tracking-[0.28em] text-white/85">
                Tap to begin
              </p>
            </div>
          </button>
        )}

        {!isLoading && (
          <div className="pointer-events-none absolute right-[max(0.75rem,env(safe-area-inset-right,0px))] top-[max(5.5rem,env(safe-area-inset-top,0px))] z-[14] opacity-[0.18]">
            <LuxurySkylineGlyph className="h-9 w-24" />
          </div>
        )}

        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[20] h-px bg-gradient-to-r from-transparent via-[#C5A880]/35 to-transparent"
          aria-hidden
        />

        {/* Single stacked column: copy first, then explore — avoids overlap with headline */}
        <div className="absolute inset-x-0 bottom-0 z-[25] lux-mobile-page-gutter pb-[max(1.25rem,env(safe-area-inset-bottom,0px))]">
          <div className="rounded-t-2xl bg-gradient-to-t from-black via-black/92 to-black/40 px-1 pt-10 pb-2 sm:pt-12">
            <div className="mb-3 flex items-center gap-3">
              <div className="h-px w-10 shrink-0 bg-gradient-to-r from-[#C5A880] to-transparent sm:w-12" />
              <span
                className="font-[family-name:var(--font-manrope)] text-[10px] font-medium uppercase leading-snug tracking-[0.28em] text-[#C5A880] sm:text-[11px] sm:tracking-[0.32em]"
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
              className="mt-3 max-w-prose font-[family-name:var(--font-playfair)] text-[clamp(1rem,3.5vw,1.25rem)] font-light italic leading-snug text-[#e8d4bc] text-pretty sm:mt-4"
              style={{ textShadow: '0 4px 22px rgba(0,0,0,0.82)' }}
            >
              We are not just building homes. We are shaping dreams into addresses.
            </p>

            <p
              className="mt-5 font-[family-name:var(--font-manrope)] text-[10px] uppercase tracking-[0.3em] text-white/50 sm:mt-6"
              style={{ textShadow: '0 2px 8px rgba(0,0,0,0.6)' }}
            >
              London · Lahore
            </p>

            {!isLoading && !showTapToPlay && (
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
