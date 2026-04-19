'use client';

/**
 * CinematicVision — About-page centrepiece.
 *
 * Why this exists:
 *  - Delivers the client's branded "Extraordinary" cinematic reel as a theatre-grade moment.
 *  - Pure Tailwind + CSS hover/reveal. Zero Framer Motion surfaces — safe for React 19 /
 *    Next 16 hydration.
 *  - IntersectionObserver pauses the video when off-screen (battery + main thread friendly)
 *    and autoplays (muted) when it re-enters. User can unmute via a luxury glass button.
 */

import { useEffect, useRef, useState } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

/**
 * Source is a portrait (9:16) film. We present it two ways:
 *  - Mobile: native portrait frame, full width.
 *  - Desktop: centered portrait player with an ambient blurred duplicate filling
 *    the wider cinema frame — the same treatment Apple / Samsung use for
 *    vertical product reels.
 */
const VIDEO_SRC = '/about/AboutUsVIdeo.mp4';
const POSTER_SRC = '/about/about-hero.png';

export default function CinematicVision() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const backdropRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [canPlay, setCanPlay] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting || entry.intersectionRatio > 0);
        const v = videoRef.current;
        const bg = backdropRef.current;
        if (entry.isIntersecting) {
          v?.play().catch(() => {});
          bg?.play().catch(() => {});
        } else {
          v?.pause();
          bg?.pause();
        }
      },
      { threshold: [0, 0.18, 0.5], rootMargin: '-8% 0px -8% 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const togglePlay = () => {
    const v = videoRef.current;
    const bg = backdropRef.current;
    if (!v) return;
    if (v.paused) {
      v.play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
      bg?.play().catch(() => {});
    } else {
      v.pause();
      bg?.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    const next = !v.muted;
    v.muted = next;
    setIsMuted(next);
    if (!next) {
      v.play().catch(() => {});
    }
  };

  const fadeBase = `transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:translate-y-0 motion-reduce:opacity-100`;
  const fadeState = visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0';

  return (
    <section
      ref={sectionRef}
      aria-labelledby="cinematic-vision-title"
      className="relative isolate overflow-hidden bg-[#050505] py-20 md:py-28 lg:py-32"
    >
      {/* Ambient gold wash */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_45%_at_50%_0%,rgba(197,168,128,0.09),transparent_60%)]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.018] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative mx-auto w-full max-w-[1240px] px-5 sm:px-8 lg:px-10">
        {/* Editorial masthead — a single whisper above the reel. The film carries the rest. */}
        <div className="mb-10 flex flex-col items-center text-center md:mb-14">
          <div
            className={`flex items-center gap-4 ${fadeBase} ${fadeState}`}
            style={{ transitionDelay: '80ms' }}
          >
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#C5A880]/70" />
            <p
              id="cinematic-vision-title"
              className="font-[family-name:var(--font-manrope)] text-[10px] font-medium uppercase tracking-[0.48em] text-[#C5A880]"
            >
              Signature Reel · 2026
            </p>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#C5A880]/70" />
          </div>
        </div>

        {/* Cinema frame — portrait on mobile, cinematic landscape on desktop with an
            ambient blurred backdrop filling the wider frame around the portrait video. */}
        <div
          className={`relative mx-auto aspect-[9/16] w-full max-w-[min(420px,92vw)] overflow-hidden rounded-[4px] sm:rounded-[6px] md:aspect-[16/9] md:max-w-none ${fadeBase} ${fadeState}`}
          style={{ transitionDelay: '300ms' }}
        >
          {/* Outer gold filament */}
          <div
            className="cinematic-vision-frame pointer-events-none absolute -inset-px z-[5] rounded-[inherit]"
            aria-hidden
          />

          {/* Poster layer — shows instantly so the frame never looks empty,
              fades out once the video has decoded a frame. */}
          <div
            className="absolute inset-0 transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{
              backgroundImage: `url(${POSTER_SRC})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: canPlay ? 0 : 1,
            }}
            aria-hidden
          />

          {/* Ambient backdrop video — desktop only. A scaled, blurred duplicate of
              the source film fills the wider frame, turning a portrait reel into a
              true cinema-scope presentation. Pointer-events disabled; audio muted. */}
          <video
            ref={backdropRef}
            className="pointer-events-none absolute inset-0 hidden h-full w-full scale-125 object-cover opacity-[0.55] blur-3xl saturate-[1.15] md:block"
            src={VIDEO_SRC}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 hidden bg-black/45 md:block"
            aria-hidden
          />

          {/* Primary video surface — on mobile the frame matches the video aspect so
              object-cover fills cleanly; on desktop we contain (letterbox-safe) and
              center at the natural 9:16 ratio, sitting over the blurred backdrop. */}
          <div className="absolute inset-0 flex items-center justify-center">
            <video
              ref={videoRef}
              className="h-full w-full object-cover md:h-full md:w-auto md:object-contain md:drop-shadow-[0_20px_60px_rgba(0,0,0,0.55)]"
              src={VIDEO_SRC}
              poster={POSTER_SRC}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              // prevent iOS inline-play quirks
              webkit-playsinline="true"
              x5-playsinline="true"
              onCanPlay={() => setCanPlay(true)}
              onLoadedData={() => setCanPlay(true)}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            />
          </div>

          {/* Cinematic grade — subtle, only darkens the bottom so caption reads.
              Vignette kept for all breakpoints to pull the eye inward. */}
          <div
            className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-t from-black/55 via-transparent to-black/15"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 z-[2] bg-[radial-gradient(ellipse_at_center,transparent_65%,rgba(0,0,0,0.45)_100%)]"
            aria-hidden
          />

          {/* Grain */}
          <div className="lux-listing-grain z-[3]" aria-hidden />

          {/* Top rail — brand tag */}
          <div className="absolute left-0 right-0 top-0 z-10 flex items-start justify-between gap-3 p-4 sm:p-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#C5A880]/45 bg-black/25 px-3 py-1.5 font-[family-name:var(--font-manrope)] text-[10px] font-semibold uppercase tracking-[0.32em] text-[#f0e6d4] backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-[#C5A880] shadow-[0_0_10px_rgba(197,168,128,0.7)]" />
              ThePlotSale
            </span>
            <span className="hidden items-center gap-2 rounded-full border border-white/10 bg-black/20 px-3 py-1.5 font-[family-name:var(--font-manrope)] text-[10px] font-medium uppercase tracking-[0.3em] text-white/70 backdrop-blur-md sm:inline-flex">
              London · Lahore · Sialkot
            </span>
          </div>

          {/* Bottom rail — controls + caption */}
          <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col gap-4 p-4 sm:flex-row sm:items-end sm:justify-between sm:p-6 md:p-8">
            <div className="max-w-xl">
              <p className="font-[family-name:var(--font-manrope)] text-[10px] font-semibold uppercase tracking-[0.32em] text-[#C5A880]/90">
                Brand Film · 2026
              </p>
              <p className="mt-2 font-playfair text-[1.25rem] font-light leading-snug text-white sm:text-[1.5rem]">
                Cultivating futures across <span className="italic text-[#e8dcc4]">two continents.</span>
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={togglePlay}
                disabled={!canPlay}
                aria-label={isPlaying ? 'Pause brand film' : 'Play brand film'}
                className="group/btn inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-black/40 text-white/85 backdrop-blur-md transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-[#C5A880] hover:bg-[#C5A880] hover:text-[#111111] hover:shadow-[0_10px_30px_rgba(197,168,128,0.28)] disabled:opacity-50 sm:h-12 sm:w-12"
              >
                {isPlaying ? (
                  <Pause className="h-4 w-4 sm:h-[18px] sm:w-[18px]" strokeWidth={1.5} />
                ) : (
                  <Play className="h-4 w-4 translate-x-[1px] sm:h-[18px] sm:w-[18px]" strokeWidth={1.5} />
                )}
              </button>
              <button
                type="button"
                onClick={toggleMute}
                aria-label={isMuted ? 'Unmute brand film' : 'Mute brand film'}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-black/40 text-white/85 backdrop-blur-md transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-[#C5A880] hover:bg-[#C5A880] hover:text-[#111111] hover:shadow-[0_10px_30px_rgba(197,168,128,0.28)] sm:h-12 sm:w-12"
              >
                {isMuted ? (
                  <VolumeX className="h-4 w-4 sm:h-[18px] sm:w-[18px]" strokeWidth={1.5} />
                ) : (
                  <Volume2 className="h-4 w-4 sm:h-[18px] sm:w-[18px]" strokeWidth={1.5} />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Editorial stats rail */}
        <div
          className={`mt-10 grid grid-cols-3 gap-6 border-t border-white/[0.06] pt-8 sm:gap-10 md:mt-14 ${fadeBase} ${fadeState}`}
          style={{ transitionDelay: '420ms' }}
        >
          {[
            { k: '2', l: 'Continents' },
            { k: '12+', l: 'Active Projects' },
            { k: '£500M+', l: 'Curated Portfolio' },
          ].map((row) => (
            <div key={row.l} className="flex flex-col items-start gap-1.5">
              <span className="font-playfair text-[clamp(1.6rem,4vw,2.4rem)] font-light tracking-tight text-white">
                {row.k}
              </span>
              <span className="font-[family-name:var(--font-manrope)] text-[10px] font-medium uppercase tracking-[0.32em] text-[#C5A880]/85">
                {row.l}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
