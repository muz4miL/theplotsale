'use client';

import { BarChart3, Building2, Handshake } from 'lucide-react';
import Image from 'next/image';
import { useInViewOnce } from '@/hooks/useInViewOnce';

const features = [
  { icon: Building2, label: 'Development' },
  { icon: Handshake, label: 'Management' },
  { icon: BarChart3, label: 'Investment' },
];

export default function WhoWeAre() {
  const [sectionRef, visible] = useInViewOnce({ threshold: 0.08, rootMargin: '-80px 0px' });

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[85vh] w-full items-center justify-center overflow-x-hidden bg-[#0A0A0A] py-12 lg:py-16"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.015] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
        }}
      />

      <div className="mx-auto w-full max-w-7xl px-6 md:px-8 lg:px-12">
        <div className="flex flex-col gap-10 lg:grid lg:grid-cols-2 lg:items-center lg:gap-12">
          <div
            className={`relative order-2 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:translate-y-0 motion-reduce:opacity-100 lg:order-1 ${
              visible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <div className="relative mb-8 h-[450px] w-full overflow-hidden rounded-sm lg:mb-0 lg:h-[500px]">
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

            <div
              className={`absolute -bottom-6 -right-6 h-44 w-44 overflow-hidden rounded-sm border border-white/30 shadow-2xl backdrop-blur-md transition-all delay-300 duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:translate-y-0 motion-reduce:opacity-100 lg:-bottom-8 lg:-right-8 lg:h-52 lg:w-52 ${
                visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
            >
              <div className="absolute inset-0 z-10 rounded-sm border border-white/30" />
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
            <p
              className={`flex justify-center font-sans text-xs uppercase tracking-[0.4em] text-[#C5A880] opacity-60 transition-all delay-100 duration-700 ease-out motion-reduce:translate-y-0 motion-reduce:opacity-100 lg:justify-start ${
                visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
            >
              PREMIER REAL ESTATE CONSULTANCY
            </p>

            <div
              className={`transition-all delay-150 duration-700 ease-out motion-reduce:translate-y-0 motion-reduce:opacity-100 ${
                visible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
              }`}
            >
              <h2 className="text-3xl leading-[1.1] text-white md:text-4xl lg:text-5xl">
                Cultivating
                <br />
                <span className="text-[1.1em] italic text-white/90">Futures</span>
              </h2>
            </div>

            <p
              className={`mx-auto max-w-full text-base font-light leading-relaxed text-white/80 transition-all delay-200 duration-700 ease-out motion-reduce:translate-y-0 motion-reduce:opacity-100 lg:mx-0 lg:max-w-xl ${
                visible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
              }`}
            >
              At ThePlotSale, we are committed to delivering real estate solutions marked by transparency and
              integrity, bridging developers and homeowners in a trusted partnership. We envision a sustainable future
              where every property is not just an asset, but a space people are proud to call home.
            </p>

            <div
              className={`order-3 flex flex-wrap justify-center gap-6 pt-4 transition-all delay-300 duration-700 ease-out motion-reduce:translate-y-0 motion-reduce:opacity-100 lg:justify-start ${
                visible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
              }`}
            >
              {features.map((feature, index) => (
                <div
                  key={feature.label}
                  className="flex items-center gap-2.5 transition-all duration-500 ease-out motion-reduce:translate-x-0 motion-reduce:opacity-100"
                  style={{
                    transitionDelay: visible ? `${400 + index * 80}ms` : '0ms',
                    opacity: visible ? 1 : 0,
                    transform: visible ? 'translateX(0)' : 'translateX(-12px)',
                  }}
                >
                  <div className="flex h-9 w-9 shrink-0 rotate-45 items-center justify-center border border-white/10 transition-all duration-300 group-hover:border-[#C5A880]/40">
                    <feature.icon className="h-4 w-4 -rotate-45 text-[#C5A880]" strokeWidth={1.5} />
                  </div>
                  <span className="text-sm font-medium text-white/70">{feature.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
