'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function AboutHero() {
    const containerRef = useRef(null);

    // Mobile detection for performance optimization
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Desktop parallax effect - text moves faster than scroll
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end start']
    });

    const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.8], [1, 1, 0]);
    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
    const opacityIndicator = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

    return (
        <section
            ref={containerRef}
            className="relative w-full h-screen overflow-hidden"
        >
            {/* BACKGROUND IMAGE - Cinematic Ken Burns Zoom */}
            <div className="absolute inset-0 w-full h-full overflow-hidden">
                <motion.div
                    className="w-full h-full"
                    initial={{ scale: 1 }}
                    animate={{ scale: 1.1 }}
                    transition={{
                        duration: 20,
                        ease: "linear",
                        repeat: Infinity,
                        repeatType: "reverse"
                    }}
                >
                    <Image
                        src="/images/architecture.png"
                        alt="ThePlotSale - Premium Real Estate Consultancy"
                        fill
                        priority
                        quality={90}
                        className="object-cover"
                    />
                </motion.div>
            </div>

            {/* DARKER OVERLAY - Base layer for better readability */}
            <div className="absolute inset-0 bg-black/40 z-10" />

            {/* VIGNETTE GRADIENT - Darker top and bottom for moodier feel */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20 z-10" />





            {/* CONTENT CONTAINER - Centered with Parallax on Desktop */}
            <motion.div
                style={isMobile ? {} : { y, opacity, scale }}
                className="absolute inset-0 z-30 flex flex-col justify-center items-center h-screen px-6 md:px-12 will-change-transform"
            >
                {/* LABEL - Gold */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="text-[10px] md:text-sm tracking-[0.35em] text-[#C5A880] uppercase font-sans"
                >
                    PREMIER REAL ESTATE CONSULTANCY
                </motion.p>

                {/* HEADLINE - Serif Light with Gold Italic Accent */}
                <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="text-4xl md:text-8xl font-serif text-white font-light leading-none mt-6 mb-8 text-center"
                >
                    About Us
                </motion.h1>

                {/* SUB-HEADLINE - White with opacity, perfect centering */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="text-sm md:text-xl text-white/80 max-w-md md:max-w-2xl text-center leading-relaxed px-4 font-sans font-light"
                >
                    We are not just building homes. We are shaping dreams into addresses.
                </motion.p>
            </motion.div>

            {/* SCROLL INDICATOR - Elegant Floating Chevron */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
                style={isMobile ? {} : { opacity: opacityIndicator }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center"
            >
                {/* Floating Chevron Arrow */}
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                    <svg
                        className="w-6 h-6 text-[#C5A880]"
                        fill="none"
                        strokeWidth="1"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19 9l-7 7-7-7"
                        />
                    </svg>
                </motion.div>

                {/* Scroll Text */}
                <p className="text-[9px] tracking-[0.4em] text-[#C5A880] uppercase mt-2 font-sans">
                    SCROLL TO DISCOVER
                </p>
            </motion.div>
        </section>
    );
}
