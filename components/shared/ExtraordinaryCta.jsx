'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const sectionVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.12,
    },
  },
};

const liftFade = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const lineReveal = {
  hidden: { opacity: 0, y: 42, filter: 'blur(8px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.95, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function ExtraordinaryCta() {
  return (
    <section className="relative isolate overflow-hidden bg-black">
      <div className="absolute left-0 right-0 top-0 z-20 h-[2px] bg-gradient-to-r from-transparent via-[#f97316] to-transparent" />
      <div
        className="relative min-h-[420px] bg-cover bg-center bg-no-repeat md:bg-fixed"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black/75" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-black/85" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(249,115,22,0.22),transparent_42%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,rgba(255,255,255,0.06),transparent_36%)]" />

        <motion.div
          className="relative z-10 mx-auto flex min-h-[420px] max-w-6xl items-center px-4 py-16 sm:px-6 md:min-h-[460px] md:px-10 md:py-20"
          variants={sectionVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
        >
          <div className="w-full max-w-3xl">
            <motion.p
              className="mb-4 text-[10px] uppercase tracking-[0.3em] text-[#C5A880] sm:tracking-[0.35em]"
              variants={liftFade}
            >
              ThePlotSale Signature
            </motion.p>

            <h2 className="font-playfair text-[clamp(2rem,7.2vw,4rem)] font-semibold uppercase leading-[1.04] text-white">
              <motion.span className="block" variants={lineReveal}>
                Ready to build
              </motion.span>
              <motion.span className="block text-[#f97316]" variants={lineReveal}>
                something extraordinary?
              </motion.span>
            </h2>

            <motion.p
              className="mt-4 max-w-2xl text-sm leading-relaxed text-white/75 sm:mt-5 sm:text-base"
              variants={liftFade}
            >
              Let&apos;s shape a project that feels timeless, practical, and truly valuable for your lifestyle or investment goals.
            </motion.p>

            <motion.div variants={liftFade}>
              <Link
                href="/contact"
                className="mt-8 inline-flex w-full items-center justify-center rounded-sm bg-[#f97316] px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-white transition-all duration-300 hover:translate-y-[-1px] hover:bg-[#ea580c] hover:shadow-[0_10px_28px_rgba(249,115,22,0.4)] sm:w-auto sm:px-8"
              >
                Start your project
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
