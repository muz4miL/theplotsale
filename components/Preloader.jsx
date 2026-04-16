'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [contentVisible, setContentVisible] = useState(true);

  useEffect(() => {
    if (typeof document === 'undefined') return;

    const { body, documentElement: html } = document;
    const prevBodyOverflow = body.style.overflow;
    const prevHtmlOverflow = html.style.overflow;
    const prevBodyTouchAction = body.style.touchAction;
    const prevHtmlHeight = html.style.height;

    body.style.overflow = 'hidden';
    html.style.overflow = 'hidden';
    body.style.touchAction = 'none';
    html.style.height = '100%';

    const contentTimer = setTimeout(() => {
      setContentVisible(false);
    }, 3200);

    const exitTimer = setTimeout(() => {
      setIsLoading(false);
      body.style.overflow = prevBodyOverflow;
      html.style.overflow = prevHtmlOverflow;
      body.style.touchAction = prevBodyTouchAction;
      html.style.height = prevHtmlHeight;
    }, 4200);

    return () => {
      clearTimeout(contentTimer);
      clearTimeout(exitTimer);
      body.style.overflow = prevBodyOverflow;
      html.style.overflow = prevHtmlOverflow;
      body.style.touchAction = prevBodyTouchAction;
      html.style.height = prevHtmlHeight;
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <div
          className="pointer-events-none fixed inset-0 z-[100002] flex w-full max-w-[100vw] flex-col overflow-hidden bg-[#0a0a0a]"
          style={{
            height: 'max(100dvh, 100lvh, 100svh)',
            minHeight: 'max(100dvh, 100lvh, 100svh)',
          }}
          aria-busy="true"
          aria-label="Loading"
        >
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_85%_55%_at_50%_42%,rgba(197,168,128,0.07),transparent_62%)]"
            aria-hidden
          />

          {/* Top curtain */}
          <motion.div
            className="absolute left-0 right-0 top-0 h-1/2 bg-[#111111]"
            initial={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{
              duration: 1.2,
              ease: [0.76, 0, 0.24, 1],
              delay: 0.2,
            }}
          >
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-px bg-[#C5A880]/25"
              initial={{ opacity: 0 }}
              exit={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            />
          </motion.div>

          {/* Bottom curtain */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-1/2 bg-[#111111]"
            initial={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{
              duration: 1.2,
              ease: [0.76, 0, 0.24, 1],
              delay: 0.2,
            }}
          />

          {/* Centered brand */}
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-center px-6">
            <AnimatePresence>
              {contentVisible && (
                <>
                  <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.96, filter: 'blur(12px)' }}
                    transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                    className="relative h-[240px] w-[240px] sm:h-[300px] sm:w-[300px] md:h-[360px] md:w-[360px]"
                  >
                    <svg
                      className="absolute inset-0 m-auto h-full w-full"
                      viewBox="0 0 400 400"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden
                    >
                      <motion.path
                        d="M 200 50 L 300 100 L 350 200 L 300 300 L 200 350 L 100 300 L 50 200 L 100 100 Z"
                        stroke="#C5A880"
                        strokeWidth="1"
                        fill="none"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{
                          pathLength: { duration: 2, ease: 'easeInOut' },
                          opacity: { duration: 0.5 },
                        }}
                      />
                      <motion.path
                        d="M 200 65 L 285 108 L 335 200 L 285 292 L 200 335 L 115 292 L 65 200 L 115 108 Z"
                        stroke="#C5A880"
                        strokeWidth="0.5"
                        strokeOpacity="0.45"
                        fill="none"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{
                          pathLength: { duration: 2, ease: 'easeInOut', delay: 0.2 },
                        }}
                      />
                    </svg>

                    <motion.div
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                      initial={{ opacity: 0, scale: 0.9, filter: 'blur(12px)' }}
                      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                      transition={{
                        duration: 1.2,
                        delay: 1,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    >
                      <Image
                        src="/newLogo.png"
                        alt=""
                        width={128}
                        height={128}
                        className="h-28 w-28 object-contain drop-shadow-[0_8px_40px_rgba(0,0,0,0.65)] sm:h-36 sm:w-36 md:h-44 md:w-44"
                        priority
                      />
                      <motion.div
                        className="absolute inset-0 -left-[25%] h-full w-[150%] bg-gradient-to-r from-transparent via-[#C5A880]/35 to-transparent"
                        style={{
                          filter: 'blur(18px)',
                          transform: 'skewX(-18deg)',
                        }}
                        initial={{ x: '-150%' }}
                        animate={{ x: '150%' }}
                        transition={{
                          duration: 1.5,
                          delay: 1.8,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        aria-hidden
                      />
                    </motion.div>
                  </motion.div>

                  <motion.div
                    className="mt-5 sm:mt-7"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 0.88, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 1, delay: 2.1, ease: 'easeOut' }}
                  >
                    <p className="whitespace-nowrap text-center font-[family-name:var(--font-manrope)] text-[9px] uppercase tracking-[0.38em] text-[#C5A880] sm:text-[11px] sm:tracking-[0.42em]">
                      Cultivating futures
                    </p>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          <div
            className="pointer-events-none absolute inset-0 z-[60] opacity-[0.04]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}
            aria-hidden
          />

          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 z-[55] h-24 bg-gradient-to-t from-black/40 to-transparent sm:h-28"
            aria-hidden
          />
        </div>
      )}
    </AnimatePresence>
  );
}
