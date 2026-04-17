'use client';

import Image from 'next/image';
import { Snowflake, Coffee, Waves, Landmark } from 'lucide-react';
import { useInViewOnce } from '@/hooks/useInViewOnce';

export default function LavitaLifestyle() {
  const [sectionRef, inView] = useInViewOnce({ once: true, threshold: 0.1, rootMargin: '-80px 0px' });

  const reveal = (delayMs = 0) =>
    `transition-all duration-[750ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:translate-y-0 motion-reduce:opacity-100 ${
      inView ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
    }`;

  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden bg-[#0A0A0A] py-16 lg:py-20">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.015] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
        }}
      />

      <div className="mx-auto max-w-7xl pl-[max(1.5rem,env(safe-area-inset-left,0px))] pr-[max(1.5rem,env(safe-area-inset-right,0px))] md:pl-8 md:pr-8 lg:pl-12 lg:pr-12">
        <div className="flex flex-col items-center gap-12 lg:grid lg:grid-cols-12 lg:gap-16">
          <div className={`text-center lg:col-span-5 lg:text-left ${reveal(0)}`}>
            <div className="mb-6 flex items-center justify-center gap-3 lg:justify-start">
              <div className="h-[1px] w-10 bg-gradient-to-r from-[#C5A880] to-transparent" />
              <span className="text-[10px] font-medium uppercase tracking-[0.35em] text-[#C5A880]">Why Choose Us</span>
            </div>

            <h2 className="mb-6">
              <span className="block font-playfair text-3xl uppercase leading-none tracking-tight text-white md:text-5xl lg:text-6xl">
                Your Trusted
              </span>
              <span className="mt-1 block font-playfair text-3xl uppercase leading-none tracking-tight text-white md:text-5xl lg:text-6xl">
                Partner
              </span>
              <span className="mt-4 block font-playfair text-xl italic text-[#C5A880] md:text-3xl lg:text-4xl">In Real Estate</span>
            </h2>

            <p className="mx-auto mb-6 max-w-md text-base font-light leading-relaxed text-white/75 lg:mx-0 lg:text-sm">
              From London to Lahore, we connect you with premium properties and investment opportunities backed by transparency,
              expertise, and dedication.
            </p>

            <div className={reveal(200)} style={{ transitionDelay: '200ms' }}>
              <a
                href="/about"
                className="inline-flex items-center justify-center gap-2 rounded-sm border border-[#C5A880]/30 bg-[#C5A880]/5 px-6 py-3 transition-colors hover:border-[#C5A880]/50 hover:bg-[#C5A880]/10"
              >
                <span className="text-xs font-medium uppercase tracking-[0.12em] text-white">Learn More About Us</span>
                <svg className="h-4 w-4 text-[#C5A880]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>

          <div
            className={`relative h-[380px] w-full overflow-hidden rounded group/image md:h-[500px] lg:col-span-7 lg:h-[550px] ${reveal(120)}`}
            style={{ transitionDelay: '120ms' }}
          >
            <Image
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
              alt="Premium urban architectural facade"
              fill
              className="object-cover transition-transform duration-1000 group-hover/image:scale-105"
              sizes="100vw"
              priority
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />
            <div className="absolute inset-0 border border-white/5" />

            <div className="absolute bottom-8 left-1/2 z-20 hidden w-full -translate-x-1/2 items-center justify-center gap-6 lg:flex">
              {[
                { label: 'TRANSPARENCY', icon: <Snowflake className="h-5 w-5" strokeWidth={1.5} /> },
                { label: 'EXPERTISE', icon: <Coffee className="h-5 w-5" strokeWidth={1.5} /> },
                { label: 'INTEGRITY', icon: <Waves className="h-5 w-5" strokeWidth={1.5} /> },
                { label: 'DEDICATION', icon: <Landmark className="h-5 w-5" strokeWidth={1.5} /> },
              ].map((item, i) => (
                <div key={i} className="group relative flex h-20 w-20 cursor-pointer items-center justify-center">
                  <div className="absolute inset-0 rotate-45 border border-white/20 bg-white/5 shadow-lg backdrop-blur-md transition-all duration-500 group-hover:border-[#C5A880]/50 group-hover:bg-[#C5A880]/10 group-hover:shadow-[#C5A880]/20" />
                  <div className="relative z-10 flex flex-col items-center justify-center gap-1.5">
                    <div className="text-[#C5A880] transition-transform duration-300 group-hover:scale-110 group-hover:text-white">{item.icon}</div>
                    <span className="text-[9px] font-medium uppercase tracking-[0.2em] text-white/80 transition-colors duration-300 group-hover:text-white">
                      {item.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={`mt-6 grid grid-cols-2 gap-3 lg:hidden ${reveal(240)}`} style={{ transitionDelay: '240ms' }}>
            {[
              { label: 'TRANSPARENCY', sub: 'Clear & Honest Deals' },
              { label: 'EXPERTISE', sub: 'Market Knowledge' },
              { label: 'INTEGRITY', sub: 'Trust & Accountability' },
              { label: 'DEDICATION', sub: 'Personalized Service' },
            ].map((item, i) => (
              <div
                key={i}
                className="rounded-sm border border-white/10 bg-white/5 p-4 backdrop-blur-md transition hover:border-[#C5A880]/30"
                style={{ transitionDelay: `${280 + i * 50}ms` }}
              >
                <div className="space-y-2 text-center">
                  <span className="text-sm font-semibold uppercase tracking-[0.15em] text-[#C5A880]">{item.label}</span>
                  <p className="text-xs text-white/60">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
