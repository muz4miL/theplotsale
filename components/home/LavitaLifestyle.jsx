'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { Snowflake, Coffee, Waves, Landmark } from 'lucide-react';

export default function LavitaLifestyle() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    const fadeInUp = {
        hidden: { opacity: 0, y: 24 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.7, ease: [0.25, 0.8, 0.25, 1] }
        }
    };

    const staggerContainer = {
        hidden: {},
        visible: {
            transition: { staggerChildren: 0.12, delayChildren: 0.15 }
        }
    };

    return (
        <section
            ref={sectionRef}
            className="relative w-full overflow-hidden bg-[#0A0A0A] py-16 lg:py-20"
        >
            {/* Noise Overlay */}
            <div
                className="absolute inset-0 opacity-[0.015] pointer-events-none mix-blend-overlay"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
                }}
            />

            <div className="mx-auto max-w-7xl pl-[max(1.5rem,env(safe-area-inset-left,0px))] pr-[max(1.5rem,env(safe-area-inset-right,0px))] md:pl-8 md:pr-8 lg:pl-12 lg:pr-12">
                <div className="flex flex-col lg:grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">

                    {/* LEFT COLUMN: TEXT */}
                    <motion.div
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        variants={fadeInUp}
                        className="lg:col-span-5 text-center lg:text-left"
                    >
                        {/* Eyebrow */}
                        <div className="mb-6 flex items-center justify-center lg:justify-start gap-3">
                            <div className="h-[1px] w-10 bg-gradient-to-r from-[#C5A880] to-transparent" />
                            <span className="text-[#C5A880] text-[10px] tracking-[0.35em] uppercase font-medium">
                                Why Choose Us
                            </span>
                        </div>

                        {/* Headline */}
                        <h2 className="mb-6">
                            <span className="block text-3xl md:text-5xl lg:text-6xl font-playfair tracking-tight leading-[1] text-white uppercase">
                                Your Trusted
                            </span>
                            <span className="block text-3xl md:text-5xl lg:text-6xl font-playfair tracking-tight leading-[1] text-white uppercase mt-1">
                                Partner
                            </span>
                            <span className="block text-xl md:text-3xl lg:text-4xl font-playfair italic text-[#C5A880] mt-4">
                                In Real Estate
                            </span>
                        </h2>

                        {/* Description */}
                        <p className="text-white/75 text-base lg:text-sm font-light leading-relaxed max-w-md mx-auto lg:mx-0 mb-6">
                            From London to Lahore, we connect you with premium properties and investment opportunities backed by transparency, expertise, and dedication.
                        </p>

                        {/* CTA */}
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.3 }}
                        >
                            <a
                                href="/about"
                                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-[#C5A880]/30 rounded-sm bg-[#C5A880]/5 hover:bg-[#C5A880]/10 hover:border-[#C5A880]/50 transition-colors"
                            >
                                <span className="text-white text-xs tracking-[0.12em] uppercase font-medium">
                                    Learn More About Us
                                </span>
                                <svg
                                    className="w-4 h-4 text-[#C5A880] transition-transform group-hover:translate-x-1"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </a>
                        </motion.div>
                    </motion.div>

                    {/* RIGHT COLUMN: IMAGE (Updated with Centered Diamonds) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.9, ease: [0.25, 0.8, 0.25, 1] }}
                        className="lg:col-span-7 relative w-full h-[380px] md:h-[500px] lg:h-[550px] rounded overflow-hidden group/image"
                    >
                        <Image
                            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
                            alt="Premium urban architectural facade"
                            fill
                            className="object-cover transition-transform duration-1000 group-hover/image:scale-105"
                            sizes="100vw"
                            priority
                        />

                        {/* Gradient Overlays */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />
                        <div className="absolute inset-0 border border-white/5" />

                        {/* === DESKTOP DIAMOND OVERLAY (CENTERED) === */}
                        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 hidden lg:flex gap-6 items-center justify-center w-full">
                            {[
                                {
                                    label: "TRANSPARENCY",
                                    icon: <Snowflake className="w-5 h-5" strokeWidth={1.5} />
                                },
                                {
                                    label: "EXPERTISE",
                                    icon: <Coffee className="w-5 h-5" strokeWidth={1.5} />
                                },
                                {
                                    label: "INTEGRITY",
                                    icon: <Waves className="w-5 h-5" strokeWidth={1.5} />
                                },
                                {
                                    label: "DEDICATION",
                                    icon: <Landmark className="w-5 h-5" strokeWidth={1.5} />
                                },
                            ].map((item, i) => (
                                <div key={i} className="group relative cursor-pointer w-20 h-20 flex items-center justify-center">
                                    {/* Glass Diamond Shape */}
                                    <div className="absolute inset-0 rotate-45 border border-white/20 bg-white/5 backdrop-blur-md shadow-lg transition-all duration-500 group-hover:bg-[#C5A880]/10 group-hover:border-[#C5A880]/50 group-hover:shadow-[#C5A880]/20" />

                                    {/* Content (No Rotation) */}
                                    <div className="relative z-10 flex flex-col items-center justify-center gap-1.5">
                                        <div className="text-[#C5A880] transition-transform duration-300 group-hover:scale-110 group-hover:text-white">
                                            {item.icon}
                                        </div>
                                        <span className="text-[9px] tracking-[0.2em] uppercase font-medium text-white/80 transition-colors duration-300 group-hover:text-white">
                                            {item.label}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* MOBILE CARDS */}
                    <motion.div
                        className="lg:hidden grid grid-cols-2 gap-3 mt-6"
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        variants={staggerContainer}
                    >
                        {[
                            { label: "TRANSPARENCY", sub: "Clear & Honest Deals" },
                            { label: "EXPERTISE", sub: "Market Knowledge" },
                            { label: "INTEGRITY", sub: "Trust & Accountability" },
                            { label: "DEDICATION", sub: "Personalized Service" },
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                variants={fadeInUp}
                                className="bg-white/5 border border-white/10 rounded-sm p-4 backdrop-blur-md hover:border-[#C5A880]/30 transition"
                            >
                                <div className="text-center space-y-2">
                                    <span className="text-[#C5A880] text-sm font-semibold uppercase tracking-[0.15em]">
                                        {item.label}
                                    </span>
                                    <p className="text-white/60 text-xs">{item.sub}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
