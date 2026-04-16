'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function Testimonials() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    const testimonialsData = [
        { name: 'Recent Investor', title: 'Property Investor', quote: '"ThePlotSale has consistently exceeded my expectations. Their professionalism, market insights, and ongoing support have made each investment experience smooth and rewarding."' },
        { name: 'Frequent Buyer', title: 'Repeat Client', quote: '"As a frequent buyer, ThePlotSale has been my trusted partner. They understand my needs, offer great options, and make the process smooth and stress-free."' },
        { name: 'First-Time Buyer', title: 'New Homeowner', quote: '"As a first-time buyer, I was nervous about picking the right plot. ThePlotSale guided me through every step with patience and honesty, and now I feel confident in my investment."' },
    ];

    // Duplicate for infinite scroll effect
    const topRowTestimonials = [...testimonialsData, ...testimonialsData];
    const bottomRowTestimonials = [...testimonialsData.slice().reverse(), ...testimonialsData.slice().reverse()];

    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
            }
        }
    };

    return (
        <section
            ref={sectionRef}
            className="relative w-full overflow-hidden bg-[#0A0A0A] py-14 max-lg:py-16 lg:py-16"
        >
            {/* Noise Texture Overlay */}
            <div
                className="absolute inset-0 opacity-[0.015] pointer-events-none mix-blend-overlay"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
                }}
            />

            <div className="mx-auto max-w-7xl pl-[max(1.5rem,env(safe-area-inset-left,0px))] pr-[max(1.5rem,env(safe-area-inset-right,0px))] md:pl-8 md:pr-8 lg:pl-12 lg:pr-12">
                {/* Header Section */}
                <motion.div
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={fadeInUp}
                    className="text-center mb-12 lg:mb-16"
                >
                    {/* Eyebrow - Matching LavitaLifestyle Style */}
                    <div className="mb-6 flex items-center justify-center gap-3">
                        <div className="h-[1px] w-10 bg-gradient-to-r from-transparent to-[#C5A880]" />
                        <span className="text-[#C5A880] text-[10px] tracking-[0.35em] uppercase font-medium">
                            Client Experiences
                        </span>
                        <div className="h-[1px] w-10 bg-gradient-to-r from-[#C5A880] to-transparent" />
                    </div>

                    {/* Main Title */}
                    <h2 className="mb-4 lg:mb-5">
                        <span className="block text-3xl md:text-5xl lg:text-6xl font-playfair font-light tracking-tight leading-[1.1] text-white">
                            Voices of Our Community
                        </span>
                    </h2>

                    {/* Subtext */}
                    <p className="text-white/60 text-sm md:text-base font-light mb-0 max-w-2xl mx-auto">
                        Trusted by investors and homeowners across London and Lahore.
                    </p>
                </motion.div>
            </div>

            {/* Scrolling Testimonials - Full Viewport Width */}
            <div className="relative w-full">
                {/* Top Row - Scrolling Right to Left */}
                <div className="mb-4 overflow-hidden">
                    <motion.div
                        className="flex gap-6"
                        animate={{
                            x: [0, -1920],
                        }}
                        transition={{
                            x: {
                                repeat: Infinity,
                                repeatType: "loop",
                                duration: 40,
                                ease: "linear",
                            },
                        }}
                    >
                        {topRowTestimonials.map((testimonial, index) => (
                            <div
                                key={`top-${index}`}
                                className="flex-shrink-0 w-[360px] bg-white/5 backdrop-blur-md border border-white/10 rounded-sm p-5 hover:border-[#C5A880]/30 transition-all duration-300"
                            >
                                {/* Avatar Placeholder */}
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 rounded-full bg-[#C5A880]/20 border border-[#C5A880]/30 flex items-center justify-center">
                                        <span className="text-[#C5A880] text-lg font-semibold font-[family-name:var(--font-playfair)]">
                                            {testimonial.name.charAt(0)}
                                        </span>
                                    </div>
                                    <div>
                                        <h4 className="text-white text-sm font-semibold font-[family-name:var(--font-manrope)]">
                                            {testimonial.name}
                                        </h4>
                                        <p className="text-white/50 text-xs font-[family-name:var(--font-manrope)]">
                                            {testimonial.title}
                                        </p>
                                    </div>
                                </div>

                                {/* Quote */}
                                <blockquote className="text-white/80 text-sm font-light font-[family-name:var(--font-manrope)] leading-relaxed italic">
                                    {testimonial.quote}
                                </blockquote>
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Bottom Row - Scrolling Left to Right */}
                <div className="overflow-hidden">
                    <motion.div
                        className="flex gap-6"
                        animate={{
                            x: [-1920, 0],
                        }}
                        transition={{
                            x: {
                                repeat: Infinity,
                                repeatType: "loop",
                                duration: 40,
                                ease: "linear",
                            },
                        }}
                    >
                        {bottomRowTestimonials.map((testimonial, index) => (
                            <div
                                key={`bottom-${index}`}
                                className="flex-shrink-0 w-[360px] bg-white/5 backdrop-blur-md border border-white/10 rounded-sm p-5 hover:border-[#C5A880]/30 transition-all duration-300"
                            >
                                {/* Avatar Placeholder */}
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 rounded-full bg-[#C5A880]/20 border border-[#C5A880]/30 flex items-center justify-center">
                                        <span className="text-[#C5A880] text-lg font-semibold font-[family-name:var(--font-playfair)]">
                                            {testimonial.name.charAt(0)}
                                        </span>
                                    </div>
                                    <div>
                                        <h4 className="text-white text-sm font-semibold font-[family-name:var(--font-manrope)]">
                                            {testimonial.name}
                                        </h4>
                                        <p className="text-white/50 text-xs font-[family-name:var(--font-manrope)]">
                                            {testimonial.title}
                                        </p>
                                    </div>
                                </div>

                                {/* Quote */}
                                <blockquote className="text-white/80 text-sm font-light font-[family-name:var(--font-manrope)] leading-relaxed italic">
                                    {testimonial.quote}
                                </blockquote>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
