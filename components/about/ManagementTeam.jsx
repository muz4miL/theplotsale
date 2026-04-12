'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';

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
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#0A0A0A] py-20 lg:py-32"
    >
      {/* Noise Texture */}
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
        }}
      />

      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          className="mb-16 lg:mb-24 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-sans text-sm lg:text-base text-[#C5A880] tracking-[0.3em] mb-4 uppercase">
            LEADERSHIP
          </p>
          <h2 className="font-serif text-4xl lg:text-5xl xl:text-6xl text-white font-light">
            Management Team
          </h2>
        </motion.div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              className="group relative"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{
                duration: 0.6,
                delay: 0.2 + index * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {/* Image Container */}
              <div className="relative aspect-[4/5] overflow-hidden rounded-lg mb-6 bg-gradient-to-b from-white/5 to-transparent border border-white/10">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-contain transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  priority={index === 0}
                  unoptimized
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Glassmorphic Border Effect */}
                <div className="absolute inset-0 border border-[#C5A880]/0 group-hover:border-[#C5A880]/30 transition-all duration-500 rounded-lg" />
              </div>

              {/* Text Content */}
              <div className="text-center lg:text-left">
                <h3 className="font-serif text-2xl lg:text-3xl text-white font-light mb-2 group-hover:text-[#C5A880] transition-colors duration-300">
                  {member.name}
                </h3>
                <p className="font-sans text-sm text-gray-400 tracking-[0.15em] uppercase">
                  {member.role}
                </p>
              </div>

              {/* Decorative Corner Accent */}
              <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-[#C5A880]/0 group-hover:border-[#C5A880]/40 transition-all duration-500 rounded-tr-lg" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
