'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { CheckCircle2, Star } from 'lucide-react';

/** Moody architecture / dusk — generous crop for scroll zoom without edges showing */
const CONTACT_HERO_IMAGE =
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=85';

export default function HomeContact() {
  const sectionRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const imageScale = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [1, 1] : [1.02, 1.14]
  );

  const leftTextOpacity = useTransform(
    scrollYProgress,
    [0, 0.12, 0.42, 0.68, 0.92],
    [0, 1, 1, 0.75, 0]
  );
  const leftTextY = useTransform(scrollYProgress, [0, 0.18, 0.5, 0.85], [56, 0, 0, -48]);

  const cardOpacity = useTransform(scrollYProgress, [0.08, 0.22, 0.55, 0.88], [0, 1, 1, 0.92]);
  const cardY = useTransform(scrollYProgress, [0.08, 0.24, 0.55, 0.9], [40, 0, 0, -28]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (status === 'loading') return;
    setErrorMessage('');
    setStatus('loading');

    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      message: formData.get('message'),
      website: formData.get('website'),
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data.success) {
        setErrorMessage(data.message || 'Could not send your request. Please try again.');
        setStatus('idle');
        return;
      }

      setStatus('success');
      form.reset();
    } catch {
      setErrorMessage('Network error. Check your connection and try again.');
      setStatus('idle');
    }
  }

  return (
    <section
      id="concierge"
      ref={sectionRef}
      className="relative -mt-2 scroll-mt-28 overflow-hidden bg-[#060a09]"
      aria-labelledby="home-contact-heading"
    >
      {/* Seamless blend from previous section */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-20 h-32 bg-gradient-to-b from-[#0A0A0A] to-transparent"
        aria-hidden
      />

      <div className="relative grid min-h-[min(100dvh,960px)] lg:grid-cols-2">
        {/* —— Left: full-bleed image + scroll zoom —— */}
        <div className="relative min-h-[48vh] overflow-hidden lg:min-h-[min(100dvh,960px)]">
          <motion.div
            className="absolute inset-0 will-change-transform"
            style={{ scale: imageScale }}
            initial={false}
          >
            <Image
              src={CONTACT_HERO_IMAGE}
              alt="Modern luxury architecture at dusk"
              fill
              priority={false}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center"
            />
          </motion.div>
          <div
            className="absolute inset-0 bg-gradient-to-br from-black/75 via-black/25 to-black/55"
            aria-hidden
          />
          <div
            className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-[#060a09]/90 lg:to-[#060a09]"
            aria-hidden
          />

          {/* Top-left editorial block */}
          <motion.div
            className="absolute left-0 top-0 z-10 max-w-xl px-6 pb-8 pt-24 sm:px-10 sm:pt-28 lg:max-w-lg lg:px-12 lg:pt-32"
            style={{ opacity: leftTextOpacity, y: leftTextY }}
          >
            <p className="font-[family-name:var(--font-manrope)] text-[10px] uppercase tracking-[0.4em] text-[#C5A880]/90">
              The Plot Sale
            </p>
            <h2
              id="home-contact-heading"
              className="mt-5 font-playfair text-[clamp(1.65rem,4.2vw,2.75rem)] font-light leading-[1.12] tracking-[0.02em] text-white"
            >
              <span className="block italic text-white/95">Curated access to</span>
              <span className="mt-1 block font-normal not-italic tracking-normal text-white">
                extraordinary property &amp; land
              </span>
            </h2>
            <p className="mt-6 max-w-md font-[family-name:var(--font-manrope)] text-sm font-light leading-relaxed text-white/65">
              A discreet advisory layer for cross-border buyers and investors. Share your brief — our team responds
              with precision, not noise.
            </p>
          </motion.div>
        </div>

        {/* —— Right: premium contact panel —— */}
        <div className="relative flex flex-col justify-center bg-[#0a1412] py-16 pl-[max(1.5rem,env(safe-area-inset-left,0px))] pr-[max(1.5rem,env(safe-area-inset-right,0px))] sm:px-10 lg:px-14 lg:py-20">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage: `linear-gradient(135deg, transparent 0%, #C5A880 50%, transparent 100%)`,
            }}
            aria-hidden
          />

          <motion.div
            className="relative z-10 mx-auto w-full max-w-md"
            style={{ opacity: cardOpacity, y: cardY }}
          >
            <div className="rounded-2xl border border-white/[0.09] bg-[#0d1815]/95 px-7 py-10 shadow-[0_40px_80px_rgba(0,0,0,0.45)] backdrop-blur-md sm:px-9 sm:py-11 md:rounded-3xl">
              <div className="absolute left-8 right-8 top-0 h-px bg-gradient-to-r from-transparent via-[#C5A880]/50 to-transparent sm:left-9 sm:right-9" />

              <div className="mb-6 inline-flex items-center gap-2">
                <Star className="h-3 w-3 text-[#C5A880]" aria-hidden />
                <span className="text-[9px] font-medium uppercase tracking-[0.35em] text-[#C5A880]">
                  Concierge
                </span>
                <Star className="h-3 w-3 text-[#C5A880]" aria-hidden />
              </div>

              <h3 className="font-playfair text-2xl font-light leading-snug text-white sm:text-3xl">
                Envision <span className="italic text-[#e8d5b5]">your</span> next move
              </h3>
              <p className="mt-3 text-xs font-light leading-relaxed text-white/50 sm:text-sm">
                Our team will reach out shortly with a tailored follow-up.
              </p>

              <div className="sr-only" aria-live="polite">
                {status === 'success' ? 'Your concierge request was sent successfully.' : ''}
                {errorMessage ? errorMessage : ''}
              </div>

              {status === 'success' ? (
                <div className="mt-8 rounded-2xl border border-[#C5A880]/30 bg-[#C5A880]/10 px-6 py-8 text-center">
                  <CheckCircle2 className="mx-auto h-10 w-10 text-[#C5A880]" aria-hidden />
                  <p className="mt-4 font-playfair text-lg text-white">Request received</p>
                  <p className="mt-2 text-sm font-light text-white/65">
                    Thank you. Our desk will respond with discretion and care.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setStatus('idle');
                      setErrorMessage('');
                    }}
                    className="mt-6 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#C5A880] underline-offset-4 hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
              <form onSubmit={handleSubmit} className="relative mt-8 space-y-6 text-left" noValidate>
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  className="absolute h-0 w-0 overflow-hidden opacity-0"
                  aria-hidden="true"
                />
                {errorMessage ? (
                  <p className="rounded-xl border border-red-400/40 bg-red-400/10 px-4 py-3 text-sm text-red-200">
                    {errorMessage}
                  </p>
                ) : null}
                <div>
                  <label htmlFor="hc-name" className="sr-only">
                    Full name
                  </label>
                  <input
                    id="hc-name"
                    type="text"
                    name="name"
                    placeholder="Name"
                    required
                    autoComplete="name"
                    disabled={status === 'loading'}
                    className="w-full min-h-[48px] border-0 border-b border-white/15 bg-transparent py-3 font-[family-name:var(--font-manrope)] text-base font-light tracking-wide text-white/90 outline-none transition-colors duration-300 placeholder:text-white/25 focus:border-[#C5A880] disabled:opacity-50"
                  />
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="hc-email" className="sr-only">
                      Email
                    </label>
                    <input
                      id="hc-email"
                      type="email"
                      name="email"
                      placeholder="Email"
                      required
                      autoComplete="email"
                      disabled={status === 'loading'}
                      className="w-full min-h-[48px] border-0 border-b border-white/15 bg-transparent py-3 font-[family-name:var(--font-manrope)] text-base font-light tracking-wide text-white/90 outline-none transition-colors duration-300 placeholder:text-white/25 focus:border-[#C5A880] disabled:opacity-50"
                    />
                  </div>
                  <div>
                    <label htmlFor="hc-phone" className="sr-only">
                      Phone
                    </label>
                    <input
                      id="hc-phone"
                      type="tel"
                      name="phone"
                      placeholder="Phone"
                      required
                      autoComplete="tel"
                      disabled={status === 'loading'}
                      className="w-full min-h-[48px] border-0 border-b border-white/15 bg-transparent py-3 font-[family-name:var(--font-manrope)] text-base font-light tracking-wide text-white/90 outline-none transition-colors duration-300 placeholder:text-white/25 focus:border-[#C5A880] disabled:opacity-50"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="hc-message" className="sr-only">
                    Message
                  </label>
                  <textarea
                    id="hc-message"
                    name="message"
                    placeholder="Your message"
                    rows={3}
                    required
                    disabled={status === 'loading'}
                    className="w-full min-h-[6.5rem] resize-none border-0 border-b border-white/15 bg-transparent py-3 font-[family-name:var(--font-manrope)] text-base font-light tracking-wide text-white/90 outline-none transition-colors duration-300 placeholder:text-white/25 focus:border-[#C5A880] disabled:opacity-50"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="lux-button min-h-[52px] w-full rounded-full bg-[#f2ebe3] py-3.5 font-[family-name:var(--font-manrope)] text-[11px] font-semibold uppercase tracking-[0.22em] text-[#0a1412] transition-colors hover:bg-white active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {status === 'loading' ? 'Sending…' : 'Request'}
                  </button>
                </div>

                <p className="text-center text-[10px] leading-relaxed text-white/30">
                  By sending your request, you agree to our approach to privacy — we treat your details with discretion.
                </p>
              </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
