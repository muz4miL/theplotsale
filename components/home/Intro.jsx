'use client';

import { LuxurySectionOrbs } from '@/components/shared/LuxuryMotionAccents';
import { BarChart3, Building2, Handshake } from 'lucide-react';
import Image from 'next/image';
import { useInViewOnce } from '@/hooks/useInViewOnce';

export default function Intro() {
  const [sectionRef, inView] = useInViewOnce({ once: true, threshold: 0.12, rootMargin: '-60px 0px' });
  const visibleClass = inView ? 'intro-css-visible' : '';

  const features = [
    { icon: Building2, label: 'Development' },
    { icon: Handshake, label: 'Management' },
    { icon: BarChart3, label: 'Investment' },
  ];

  return (
    <section
      ref={sectionRef}
      className={`intro-css-root relative flex min-h-[min(88vh,920px)] w-full items-center justify-center overflow-x-hidden bg-[#0A0A0A] py-14 max-lg:py-16 lg:min-h-[85vh] lg:py-16 ${visibleClass}`}
    >
      <LuxurySectionOrbs />

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.015] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
        }}
      />

      <div className="mx-auto w-full max-w-7xl pl-[max(1.5rem,env(safe-area-inset-left,0px))] pr-[max(1.5rem,env(safe-area-inset-right,0px))] md:pl-8 md:pr-8 lg:pl-12 lg:pr-12">
        <div className="flex flex-col gap-10 lg:grid lg:grid-cols-2 lg:items-center lg:gap-12">
          <div className="relative order-2 lg:order-1">
            <div className="relative mb-8 h-[min(52vh,460px)] w-full overflow-hidden rounded-2xl sm:h-[min(50vh,480px)] sm:rounded-3xl lg:mb-0 lg:h-[500px] lg:rounded-sm">
              <div className="intro-css-curtain absolute inset-0 z-20 bg-black" aria-hidden />

              <div className="intro-css-image-inner relative h-full w-full opacity-0">
                <Image
                  src="/images/architecture.png"
                  alt="Modern real estate development"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <div className="absolute inset-0 border border-white/5" />
              </div>
            </div>

            <div className="intro-css-badge absolute -bottom-4 -right-2 h-40 w-40 overflow-hidden rounded-2xl shadow-[0_24px_60px_rgba(0,0,0,0.55)] sm:-bottom-6 sm:-right-4 sm:h-44 sm:w-44 lg:-bottom-8 lg:-right-8 lg:h-52 lg:w-52 lg:rounded-sm opacity-0">
              <div className="absolute inset-0 z-10 rounded-2xl border border-white/25 lg:rounded-sm" />
              <div className="relative flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-white/5 via-black/40 to-black/60">
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="relative z-10 space-y-2 text-center">
                  <p className="text-[0.65rem] font-medium uppercase tracking-[0.4em] text-[#C5A880]">DUAL PRESENCE</p>
                  <p className="text-2xl italic text-white lg:text-3xl">London &amp; Lahore</p>
                  <p className="text-[0.6rem] uppercase tracking-[0.3em] text-white/50">OPERATING LOCATIONS</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative order-1 flex flex-col justify-center space-y-6 text-center lg:order-2 lg:space-y-5 lg:text-left">
            <div className="intro-css-stagger-0 flex justify-center opacity-0 lg:justify-start">
              <p className="text-xs uppercase tracking-[0.4em] text-[#C5A880] opacity-60">TRACK RECORD &amp; EXPERTISE</p>
            </div>

            <div className="intro-css-stagger-1 opacity-0">
              <h2 className="text-[clamp(1.75rem,5.2vw,2.25rem)] leading-[1.12] text-white md:text-4xl lg:text-5xl">
                Built on
                <br />
                <span className="text-[1.1em] italic text-white/90">Trust &amp; Performance</span>
              </h2>
            </div>

            <div className="intro-css-stagger-2 opacity-0">
              <p className="mx-auto max-w-full text-base font-light leading-relaxed text-white/80 lg:mx-0 lg:max-w-xl">
                At ThePlotSale, we believe in shaping dreams into addresses. We stand at the intersection of promise and
                possibility, connecting developers and end users through seamless real estate solutions. Whether
                it&rsquo;s property development, management, or investment planning, we deliver opportunities that reflect
                dedication, creativity, and transparency.
              </p>
            </div>

            <div className="intro-css-stagger-3 pt-4 opacity-0">
              <div className="flex flex-wrap justify-center gap-6 lg:justify-start">
                {features.map((feature) => (
                  <div key={feature.label} className="intro-css-icon-wrap group flex items-center gap-2.5">
                    <div className="flex h-9 w-9 shrink-0 rotate-45 items-center justify-center border border-white/10 transition-all duration-300 group-hover:border-[#C5A880]/40">
                      <feature.icon className="h-4 w-4 -rotate-45 text-[#C5A880]" strokeWidth={1.5} />
                    </div>
                    <span className="text-sm font-medium text-white/70">{feature.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="intro-css-stagger-4 hidden pt-3 opacity-0 md:block">
              <p className="text-xl italic text-[#C5A880] opacity-60 md:text-2xl">Core Expertise</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
