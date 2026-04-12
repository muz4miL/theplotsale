'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function Preloader() {
    const [isLoading, setIsLoading] = useState(true);
    const [contentVisible, setContentVisible] = useState(true);

    useEffect(() => {
        if (typeof document === 'undefined') return;

        const previousBodyOverflow = document.body.style.overflow;

        // 1. Lock Body Scroll
        document.body.style.overflow = 'hidden';

        // 2. Sequence Management
        // Hide the logo/text slightly before the curtains open
        const contentTimer = setTimeout(() => {
            setContentVisible(false);
        }, 3200);

        // Remove the whole component from DOM after curtains finish opening
        const exitTimer = setTimeout(() => {
            setIsLoading(false);
            document.body.style.overflow = previousBodyOverflow;
        }, 4200);

        return () => {
            clearTimeout(contentTimer);
            clearTimeout(exitTimer);
            document.body.style.overflow = previousBodyOverflow;
        };
    }, []);

    return (
        <AnimatePresence mode="wait">
            {isLoading && (
                <div
                    className="fixed top-0 left-0 right-0 z-[9999] flex flex-col pointer-events-none overflow-hidden"
                    style={{ height: '100dvh', minHeight: '100vh' }}
                >

                    {/* --- LAYER 1: THE CURTAINS (Seamless Monolith) --- */}
                    {/* Top Curtain - No visible border initially */}
                    <motion.div
                        className="relative w-full flex-1 bg-[#111111]"
                        initial={{ y: 0 }}
                        exit={{
                            y: '-100%',
                        }}
                        transition={{
                            duration: 1.2,
                            ease: [0.76, 0, 0.24, 1], // "Cinematic" Ease
                            delay: 0.2
                        }}
                    >
                        {/* Hairline border that appears during split */}
                        <motion.div
                            className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#C5A880]/20"
                            initial={{ opacity: 0 }}
                            exit={{ opacity: 1 }}
                            transition={{ duration: 0.3, delay: 0.2 }}
                        />
                    </motion.div>

                    {/* Bottom Curtain - No visible border initially */}
                    <motion.div
                        className="relative w-full flex-1 bg-[#111111]"
                        initial={{ y: 0 }}
                        exit={{ y: '100%' }}
                        transition={{
                            duration: 1.2,
                            ease: [0.76, 0, 0.24, 1],
                            delay: 0.2
                        }}
                    />

                    {/* --- LAYER 2: THE CONTENT (Mathematically Centered) --- */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center z-50">
                        <AnimatePresence>
                            {contentVisible && (
                                <>
                                    {/* Main Logo Container */}
                                    <motion.div
                                        initial={{ opacity: 1 }}
                                        exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                                        transition={{ duration: 0.6, ease: 'easeInOut' }}
                                        className="relative w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] md:w-[400px] md:h-[400px]"
                                    >

                                        {/* A. The Drawing Frame (SVG) - Absolute Centered */}
                                        <svg
                                            className="absolute inset-0 m-auto w-full h-full"
                                            viewBox="0 0 400 400"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            {/* Outer Octagon - Refined stroke */}
                                            <motion.path
                                                d="M 200 50 L 300 100 L 350 200 L 300 300 L 200 350 L 100 300 L 50 200 L 100 100 Z"
                                                stroke="#C5A880"
                                                strokeWidth="1"
                                                fill="none"
                                                initial={{ pathLength: 0, opacity: 0 }}
                                                animate={{ pathLength: 1, opacity: 1 }}
                                                transition={{
                                                    pathLength: { duration: 2, ease: "easeInOut" },
                                                    opacity: { duration: 0.5 }
                                                }}
                                            />
                                            {/* Inner Decorative Line (For depth) */}
                                            <motion.path
                                                d="M 200 65 L 285 108 L 335 200 L 285 292 L 200 335 L 115 292 L 65 200 L 115 108 Z"
                                                stroke="#C5A880"
                                                strokeWidth="0.5"
                                                strokeOpacity="0.4"
                                                fill="none"
                                                initial={{ pathLength: 0 }}
                                                animate={{ pathLength: 1 }}
                                                transition={{
                                                    pathLength: { duration: 2, ease: "easeInOut", delay: 0.2 }
                                                }}
                                            />
                                        </svg>

                                        {/* B. The Logo Centerpiece - Perfectly Centered */}
                                        <motion.div
                                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                                            initial={{ opacity: 0, scale: 0.9, filter: 'blur(12px)' }}
                                            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                                            transition={{
                                                duration: 1.2,
                                                delay: 1,
                                                ease: [0.16, 1, 0.3, 1]
                                            }}
                                        >
                                            <Image
                                                src="/newLogo.png"
                                                alt="The Plot Sale Logo"
                                                width={128}
                                                height={128}
                                                className="object-contain drop-shadow-2xl w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48"
                                                priority
                                            />

                                            {/* Single Premium Glass Shimmer - Clean Sweep */}
                                            <motion.div
                                                className="absolute inset-0 w-[150%] h-full -left-[25%] bg-gradient-to-r from-transparent via-[#C5A880]/40 to-transparent"
                                                style={{
                                                    filter: 'blur(20px)',
                                                    transform: 'skewX(-20deg)',
                                                }}
                                                initial={{ x: '-150%' }}
                                                animate={{ x: '150%' }}
                                                transition={{
                                                    duration: 1.5,
                                                    delay: 1.8,
                                                    ease: [0.16, 1, 0.3, 1]
                                                }}
                                            />
                                        </motion.div>

                                    </motion.div>

                                    {/* C. The Tagline - Positioned BELOW the hexagon */}
                                    <motion.div
                                        className="mt-6 sm:mt-8 md:mt-10"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 0.8, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 1, delay: 2.2, ease: "easeOut" }}
                                    >
                                        <p className="font-[family-name:var(--font-manrope)] text-[9px] sm:text-[11px] md:text-[13px] lg:text-[15px] tracking-[0.35em] sm:tracking-[0.4em] uppercase text-[#C5A880] whitespace-nowrap">
                                            Cultivating Futures
                                        </p>
                                    </motion.div>
                                </>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* --- LAYER 3: Global Texture Overlay (Maintains grain during load) --- */}
                    <div
                        className="absolute inset-0 opacity-[0.03] pointer-events-none z-[60]"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
                        }}
                    />
                </div>
            )}
        </AnimatePresence>
    );
}
