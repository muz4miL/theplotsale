'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { LuxurySectionOrbs } from '@/components/shared/LuxuryMotionAccents';
import { BarChart3, Building2, Handshake } from 'lucide-react';
import Image from 'next/image';

export default function Intro() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();

  const curtainVariant = {
    hidden: { scaleX: 1 },
    visible: {
      scaleX: 0,
      transition: {
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1],
      }
    }
  };

  const imageVariant = {
    hidden: { scale: 1.1, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 1,
        delay: 0.3,
        ease: [0.16, 1, 0.3, 1],
      }
    }
  };

  const floatingImageVariant = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 1,
        delay: 0.8,
        ease: [0.16, 1, 0.3, 1],
      }
    }
  };

  const textVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: (custom) => ({
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        delay: 0.4 + custom * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }
    })
  };

  const features = [
    { icon: Building2, label: 'Development' },
    { icon: Handshake, label: 'Management' },
    { icon: BarChart3, label: 'Investment' }
  ];

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[min(88vh,920px)] w-full items-center justify-center overflow-x-hidden bg-[#0A0A0A] py-14 max-lg:py-16 lg:min-h-[85vh] lg:py-16"
    >
      <LuxurySectionOrbs />

      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
        }}
      />

      <div className="mx-auto w-full max-w-7xl pl-[max(1.5rem,env(safe-area-inset-left,0px))] pr-[max(1.5rem,env(safe-area-inset-right,0px))] md:pl-8 md:pr-8 lg:pl-12 lg:pr-12">

        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-10 lg:gap-12 lg:items-center">

          {/* MOBILE ORDER 2 (Image) | DESKTOP ORDER 1 (Left Column) */}
          <motion.div
            className="relative order-2 lg:order-1"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <div className="relative mb-8 h-[min(52vh,460px)] w-full overflow-hidden rounded-2xl sm:h-[min(50vh,480px)] sm:rounded-3xl lg:mb-0 lg:h-[500px] lg:rounded-sm">

              <motion.div
                className="absolute inset-0 bg-black z-20 origin-right"
                variants={curtainVariant}
              />

              <motion.div
                className="relative w-full h-full"
                variants={imageVariant}
              >
                <Image
                  src="/images/architecture.png"
                  alt="Modern real estate development"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />

                {/* Subtle gradient overlay for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                {/* Subtle border */}
                <div className="absolute inset-0 border border-white/5" />
              </motion.div>

            </div>

            {/* FLOATING BADGE */}
            <motion.div
              className="absolute -bottom-4 -right-2 h-40 w-40 overflow-hidden rounded-2xl shadow-[0_24px_60px_rgba(0,0,0,0.55)] sm:-bottom-6 sm:-right-4 sm:h-44 sm:w-44 lg:-bottom-8 lg:-right-8 lg:h-52 lg:w-52 lg:rounded-sm"
              variants={floatingImageVariant}
              style={{ backdropFilter: 'blur(12px)' }}
            >
              <div className="absolute inset-0 z-10 rounded-2xl border border-white/25 lg:rounded-sm" />

              <div className="w-full h-full bg-gradient-to-br from-white/5 via-black/40 to-black/60 flex flex-col items-center justify-center relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                <div className="relative z-10 text-center space-y-2">
                  <p className="text-[0.65rem] tracking-[0.4em] uppercase text-[#C5A880] font-medium">
                    DUAL PRESENCE
                  </p>
                  <p className="text-2xl lg:text-3xl text-white italic">
                    London &amp; Lahore
                  </p>
                  <p className="text-[0.6rem] tracking-[0.3em] uppercase text-white/50">
                    OPERATING LOCATIONS
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* MOBILE ORDER 1 (Text First) | DESKTOP ORDER 2 (Right Column) */}
          <div className="relative order-1 lg:order-2 flex flex-col justify-center space-y-6 lg:space-y-5 text-center lg:text-left">

            <motion.div
              custom={0}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={textVariants}
              className="flex justify-center lg:justify-start"
            >
              <p className="text-[#C5A880] text-xs tracking-[0.4em] uppercase opacity-60">
                TRACK RECORD &amp; EXPERTISE
              </p>
            </motion.div>

            <motion.div
              custom={1}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={textVariants}
            >
              <h2 className="text-[clamp(1.75rem,5.2vw,2.25rem)] leading-[1.12] text-white md:text-4xl lg:text-5xl">
                Built on
                <br />
                <span className="italic text-white/90 text-[1.1em]">Trust &amp; Performance</span>
              </h2>
            </motion.div>

            <motion.div
              custom={2}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={textVariants}
            >
              <p className="text-white/80 text-base font-light leading-relaxed max-w-full lg:max-w-xl mx-auto lg:mx-0">
                At ThePlotSale, we believe in shaping dreams into addresses. We stand at the intersection of promise and possibility, connecting developers and end users through seamless real estate solutions. Whether it&rsquo;s property development, management, or investment planning, we deliver opportunities that reflect dedication, creativity, and transparency.
              </p>
            </motion.div>

            <motion.div
              custom={3}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={textVariants}
              className="pt-4 order-3"
            >
              <div className="flex flex-wrap gap-6 justify-center lg:justify-start">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.label}
                    className="flex items-center gap-2.5 group"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{
                      duration: 0.6,
                      delay: 0.8 + index * 0.1,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <motion.div
                      className="shrink-0"
                      animate={prefersReducedMotion || !isInView ? {} : { y: [0, -5, 0] }}
                      transition={{
                        duration: 4.5 + index * 0.4,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: index * 0.2,
                      }}
                    >
                      <div className="w-9 h-9 rotate-45 border border-white/10 flex items-center justify-center group-hover:border-[#C5A880]/40 transition-all duration-300">
                        <feature.icon className="w-4 h-4 text-[#C5A880] -rotate-45" strokeWidth={1.5} />
                      </div>
                    </motion.div>
                    <span className="text-white/70 text-sm font-medium">
                      {feature.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              custom={4}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={textVariants}
              className="pt-3"
            >
              <p className="hidden md:block text-[#C5A880] text-xl md:text-2xl italic opacity-60">
                Core Expertise
              </p>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
