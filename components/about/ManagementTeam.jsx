'use client';

import Image from 'next/image';
import { useInViewOnce } from '@/hooks/useInViewOnce';

const teamMembers = [
  {
    name: 'Bilal Siddique',
    role: 'Chairman',
    image: '/images/11.png',
    bio: 'Leading UK operations with strategic vision and market expertise across premium London properties.',
  },
  {
    name: 'Muhammad Siddique',
    role: 'Founder',
    image: '/images/22.png',
    bio: 'Visionary founder driving cross-border real estate excellence and luxury market innovation.',
  },
  {
    name: 'Hamza Siddique',
    role: 'Vice Chairman',
    image: '/images/33.png',
    bio: 'Pioneering development projects across Pakistan with precision and architectural excellence.',
  },
];

export default function ManagementTeam() {
  const [sectionRef, visible] = useInViewOnce({ threshold: 0.15, rootMargin: '-60px 0px' });

  return (
    <section ref={sectionRef} className="relative bg-[#0A0A0A] py-20 lg:py-32">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.015] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
        }}
      />

      <div className="container mx-auto px-6 lg:px-12">
        <div
          className={`mb-20 text-center transition-all duration-700 ease-out motion-reduce:translate-y-0 motion-reduce:opacity-100 lg:mb-32 ${
            visible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
          }`}
        >
          <p className="mb-4 font-sans text-sm uppercase tracking-[0.3em] text-[#C5A880] lg:text-base">LEADERSHIP</p>
          <h2 className="font-serif text-4xl font-light text-white lg:text-5xl xl:text-6xl">Management Team</h2>
        </div>

        <div className="space-y-20 lg:space-y-28">
          {teamMembers.map((member, index) => (
            <div
              key={member.name}
              className={`group relative transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:translate-y-0 motion-reduce:opacity-100 ${
                visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
              style={{ transitionDelay: visible ? `${200 + index * 120}ms` : '0ms' }}
            >
              <div className="grid grid-cols-1 gap-12 items-center lg:grid-cols-2 lg:gap-16">
                {/* Left: Text Content */}
                <div className={`space-y-6 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div>
                    <p className="mb-3 font-sans text-xs uppercase tracking-[0.3em] text-[#C5A880]/70">
                      {index === 0 ? 'UK Leadership' : index === 1 ? 'Executive' : 'Pakistan Leadership'}
                    </p>
                    <h3 className="font-serif text-3xl lg:text-4xl font-light text-white mb-2 transition-colors duration-300 group-hover:text-[#C5A880]">
                      {member.name}
                    </h3>
                    <p className="font-sans text-sm uppercase tracking-[0.15em] text-gray-400">{member.role}</p>
                  </div>

                  <div className="h-px w-12 bg-gradient-to-r from-[#C5A880] to-transparent" />

                  <p className="font-sans text-base leading-relaxed text-white/70">
                    {member.bio}
                  </p>

                  <div className="pt-2">
                    <button className="group/btn inline-flex items-center gap-2 font-sans text-xs uppercase tracking-[0.2em] text-[#C5A880] transition-all duration-300 hover:text-white">
                      <span>Learn More</span>
                      <span className="transition-transform duration-300 group-hover/btn:translate-x-1">→</span>
                    </button>
                  </div>
                </div>

                {/* Right: Floating Image */}
                <div
                  className={`group relative h-[420px] lg:h-[480px] transition-all duration-1000 ease-out ${index % 2 === 1 ? 'lg:order-1' : ''}`}
                  style={{
                    transform: visible ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.92)',
                    opacity: visible ? 1 : 0,
                    transitionDelay: visible ? `${350 + index * 150}ms` : '0ms',
                  }}
                >
                  {/* Floating glow container */}
                  <div className="absolute -inset-8 rounded-3xl bg-gradient-to-br from-[#C5A880]/0 to-transparent blur-2xl opacity-0 transition-all duration-700 group-hover:from-[#C5A880]/25 group-hover:opacity-100" />

                  {/* Image container with refined border and drop shadow */}
                  <div className="relative h-full w-full overflow-hidden rounded-2xl border border-[#C5A880]/30 bg-gradient-to-br from-white/8 to-transparent shadow-2xl drop-shadow-[0_8px_32px_rgba(197,168,128,0.25)]">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 lg:object-contain lg:object-center lg:group-hover:scale-[1.01]"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 35vw"
                      priority={index === 0}
                      quality={85}
                    />

                    {/* Subtle gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                    {/* Elegant corner accents */}
                    <div className="absolute top-0 right-0 h-16 w-16 border-t border-r border-[#C5A880]/0 transition-all duration-500 group-hover:border-[#C5A880]/40 rounded-tr-2xl" />
                    <div className="absolute bottom-0 left-0 h-16 w-16 border-b border-l border-[#C5A880]/0 transition-all duration-500 group-hover:border-[#C5A880]/40 rounded-bl-2xl" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
