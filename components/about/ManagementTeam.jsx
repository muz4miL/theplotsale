'use client';

import Image from 'next/image';
import { useInViewOnce } from '@/hooks/useInViewOnce';

const teamMembers = [
  {
    name: 'Bilal Siddique',
    role: 'Managing Director - UK',
    image: '/images/1.png',
  },
  {
    name: 'Muhammad Siddique',
    role: 'CEO',
    image: '/images/2.png',
  },
  {
    name: 'Hamza Siddique',
    role: 'Managing Director - Pakistan',
    image: '/images/3.png',
  },
];

export default function ManagementTeam() {
  const [sectionRef, visible] = useInViewOnce({ threshold: 0.1, rootMargin: '-60px 0px' });

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
          className={`mb-16 text-center transition-all duration-700 ease-out motion-reduce:translate-y-0 motion-reduce:opacity-100 lg:mb-24 ${
            visible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
          }`}
        >
          <p className="mb-4 font-sans text-sm uppercase tracking-[0.3em] text-[#C5A880] lg:text-base">LEADERSHIP</p>
          <h2 className="font-serif text-4xl font-light text-white lg:text-5xl xl:text-6xl">Management Team</h2>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-12">
          {teamMembers.map((member, index) => (
            <div
              key={member.name}
              className={`group relative transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:translate-y-0 motion-reduce:opacity-100 ${
                visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
              style={{ transitionDelay: visible ? `${200 + index * 100}ms` : '0ms' }}
            >
              <div className="relative mb-6 aspect-[4/5] overflow-hidden rounded-lg border border-white/10 bg-gradient-to-b from-white/5 to-transparent">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-contain transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  priority={index === 0}
                  unoptimized
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="absolute inset-0 rounded-lg border border-[#C5A880]/0 transition-all duration-500 group-hover:border-[#C5A880]/30" />
              </div>

              <div className="text-center lg:text-left">
                <h3 className="mb-2 font-serif text-2xl font-light text-white transition-colors duration-300 group-hover:text-[#C5A880] lg:text-3xl">
                  {member.name}
                </h3>
                <p className="font-sans text-sm uppercase tracking-[0.15em] text-gray-400">{member.role}</p>
              </div>

              <div className="absolute right-0 top-0 h-12 w-12 rounded-tr-lg border-t-2 border-r-2 border-[#C5A880]/0 transition-all duration-500 group-hover:border-[#C5A880]/40" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
