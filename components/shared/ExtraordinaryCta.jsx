'use client';

import { useRef, useState, useEffect } from 'react';
import { LuxurySectionOrbs, LuxurySkylineGlyph } from '@/components/shared/LuxuryMotionAccents';

export default function ExtraordinaryCta() {
  const blockRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = blockRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -5% 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const fade = () =>
    `transition-all duration-[850ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-7'}`;
  const delay = (ms) => ({ transitionDelay: `${ms}ms` });

  return (
    <section className="relative isolate overflow-hidden bg-black">
      <div className="absolute left-0 right-0 top-0 z-20 h-[2px] bg-gradient-to-r from-transparent via-[#f97316] to-transparent" />
      <div
        className="relative min-h-[420px] bg-cover bg-center bg-no-repeat md:bg-fixed"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black/75" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-black/85" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(249,115,22,0.22),transparent_42%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,rgba(255,255,255,0.06),transparent_36%)]" />

        <LuxurySectionOrbs className="z-[1]" />
        <div className="pointer-events-none absolute right-4 top-20 z-[15] hidden opacity-30 sm:block md:right-10 md:top-24">
          <LuxurySkylineGlyph className="h-12 w-[7.5rem] md:h-14 md:w-36" />
        </div>

        <div
          ref={blockRef}
          className="relative z-10 mx-auto flex min-h-[420px] max-w-6xl items-center px-4 py-16 sm:px-6 md:min-h-[460px] md:px-10 md:py-20"
        >
          <div className="w-full max-w-3xl">
            <p
              className={`mb-4 text-[10px] uppercase tracking-[0.3em] text-[#C5A880] sm:tracking-[0.35em] ${fade()}`}
              style={delay(120)}
            >
              ThePlotSale Signature
            </p>

            <h2 className="font-playfair text-[clamp(2rem,7.2vw,4rem)] font-semibold uppercase leading-[1.04] text-white">
              <span className={`block ${fade()}`} style={delay(200)}>
                Ready to build
              </span>
              <span className={`block text-[#f97316] ${fade()}`} style={delay(280)}>
                something extraordinary?
              </span>
            </h2>

            <p
              className={`mt-4 max-w-2xl text-sm leading-relaxed text-white/75 sm:mt-5 sm:text-base ${fade()}`}
              style={delay(360)}
            >
              Let&apos;s shape a project that feels timeless, practical, and truly valuable for your lifestyle or investment goals.
            </p>

            <div className={`mt-8 ${fade()}`} style={delay(440)}>
              <a
                href="/contact"
                className="lux-button inline-flex w-full items-center justify-center rounded-sm bg-[#f97316] px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-white transition-all duration-300 hover:bg-[#ea580c] hover:shadow-[0_10px_28px_rgba(249,115,22,0.4)] sm:w-auto sm:px-8"
              >
                Start your project
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
