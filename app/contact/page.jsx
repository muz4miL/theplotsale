'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Phone, Mail, Clock, ArrowUpRight } from 'lucide-react';
import { LuxurySkylineGlyph, LuxurySectionOrbs } from '@/components/shared/LuxuryMotionAccents';
import { useInViewOnce } from '@/hooks/useInViewOnce';
import { useSectionScrollProgress } from '@/hooks/useSectionScrollProgress';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2400&q=85';

export default function ContactPage() {
  const heroRef = useRef(null);
  const reduceMotion = usePrefersReducedMotion();
  const scrollP = useSectionScrollProgress(heroRef);
  const imageScale = reduceMotion ? 1 : 1.03 + (1.12 - 1.03) * scrollP;

  const [formState, setFormState] = useState({ status: 'idle', message: '' });

  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();
    const phone = String(data.get('phone') || '').trim();
    const topic = String(data.get('topic') || '').trim();
    const messageBody = String(data.get('message') || '').trim();
    const message = topic ? `Topic: ${topic}\n\n${messageBody}` : messageBody;

    setFormState({ status: 'sending', message: '' });

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, message }),
      });
      const payload = await res.json().catch(() => ({}));
      if (!res.ok || !payload.success) {
        setFormState({
          status: 'error',
          message: payload.message || 'Something went wrong. Please try again.',
        });
        return;
      }
      setFormState({ status: 'success', message: payload.message || 'Thank you. We will be in touch shortly.' });
      form.reset();
    } catch {
      setFormState({ status: 'error', message: 'Network error. Please try again.' });
    }
  }

  return (
    <main className="relative min-h-screen bg-[#030706] text-white">
      <section
        ref={heroRef}
        className="relative overflow-hidden border-b border-white/[0.06] pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-24"
      >
        <LuxurySectionOrbs />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(197,168,128,0.12),transparent)]" />

        <div className="relative z-10 mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl lux-animate-featured-in">
              <div className="mb-6 flex items-center gap-3">
                <span className="h-px w-10 bg-gradient-to-r from-[#C5A880] to-transparent" />
                <span className="text-[10px] font-medium uppercase tracking-[0.42em] text-[#C5A880]">Concierge</span>
                <LuxurySkylineGlyph className="hidden h-8 w-24 opacity-40 sm:block md:h-9 md:w-28" />
              </div>

              <h1 className="font-playfair text-[clamp(2.5rem,6.5vw,4.25rem)] font-light leading-[1.05] tracking-tight">
                <span className="block text-white/95">Private client</span>
                <span className="mt-1 block italic text-[#e8d5b5]">desk</span>
              </h1>

              <p className="mt-6 max-w-xl font-[family-name:var(--font-manrope)] text-sm font-light leading-relaxed text-white/55 sm:text-base">
                A discreet line for acquisitions, developments, and cross-border mandates. Share your brief — we
                respond with clarity, not noise.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href="mailto:contact@theplotsale.com"
                  className="group inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#C5A880] transition-colors hover:text-white"
                >
                  contact@theplotsale.com
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
                <span className="hidden h-3 w-px bg-white/15 sm:block" aria-hidden />
                <p className="text-[10px] uppercase tracking-[0.28em] text-white/35">London · Lahore</p>
              </div>
            </div>

            <div
              className="flex shrink-0 flex-col items-start gap-2 border-l border-[#C5A880]/35 pl-6 lux-animate-featured-in lg:items-end lg:border-l-0 lg:border-r lg:pl-0 lg:pr-6 lg:text-right"
              style={{ animationDelay: '120ms' }}
            >
              <p className="font-playfair text-lg italic text-white/80">By appointment</p>
              <p className="max-w-[220px] font-[family-name:var(--font-manrope)] text-xs font-light leading-relaxed text-white/45">
                Prefer voice? Call either studio — we route you to the right director.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative">
        <div className="mx-auto grid max-w-[1600px] lg:min-h-[min(88vh,900px)] lg:grid-cols-[1fr_minmax(380px,42%)]">
          <div className="relative min-h-[280px] overflow-hidden lg:min-h-0">
            <div
              className="absolute inset-0 will-change-transform"
              style={{
                transform: `scale(${imageScale})`,
                transformOrigin: 'center center',
              }}
            >
              <Image
                src={HERO_IMAGE}
                alt="Architectural interior — The Plot Sale"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 58vw"
                priority
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#030706] via-black/20 to-black/50 lg:bg-gradient-to-r lg:from-transparent lg:via-black/25 lg:to-[#030706]" />
            <div className="pointer-events-none absolute bottom-8 left-6 z-10 max-w-xs sm:left-10 lg:bottom-12 lg:left-12">
              <p className="font-playfair text-sm italic text-white/90">The Plot Sale</p>
              <p className="mt-1 font-[family-name:var(--font-manrope)] text-[10px] uppercase tracking-[0.3em] text-white/40">
                Advisory · 2026
              </p>
            </div>
          </div>

          <div className="relative flex flex-col justify-center bg-[#050a09] px-6 py-14 sm:px-10 sm:py-16 lg:px-12 lg:py-20">
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.12]"
              style={{
                background:
                  'radial-gradient(ellipse 90% 60% at 80% 0%, rgba(197,168,128,0.25), transparent 55%)',
              }}
            />
            <LuxurySectionOrbs className="opacity-80" />

            <FormPanel
              formState={formState}
              handleSubmit={handleSubmit}
            />
          </div>
        </div>
      </section>

      <section className="border-t border-white/[0.06] bg-[#030706] px-5 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-[1400px]">
          <StudiosHeader />

          <div className="grid gap-6 md:grid-cols-2">
            <StudioCard
              title="Pakistan"
              lines={['Plot 2, Block C, Etihad Town', 'Main Raiwind Road', 'Lahore, 54000']}
            />
            <StudioCard
              title="United Kingdom"
              lines={['The Vista Center, 50 Salisbury Road', 'Hounslow, London TW4 6JQ', 'Office A4-16']}
            />
          </div>

          <QuickRowsBlock />
        </div>
      </section>
    </main>
  );
}

function FormPanel({ formState, handleSubmit }) {
  const [ref, inView] = useInViewOnce({ threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
  return (
    <div
      ref={ref}
      className={`relative z-10 mx-auto w-full max-w-md transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:translate-y-0 motion-reduce:opacity-100 ${
        inView ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
      }`}
    >
      <div className="mb-8 border-b border-white/[0.07] pb-8">
        <h2 className="font-playfair text-2xl font-light text-white sm:text-3xl">
          Request a <span className="italic text-[#e8d5b5]">conversation</span>
        </h2>
        <p className="mt-2 font-[family-name:var(--font-manrope)] text-sm font-light text-white/45">
          All fields are treated as confidential.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-7">
        <FormField label="Name" name="name" type="text" required placeholder="Full name" autoComplete="name" />
        <div className="grid gap-7 sm:grid-cols-2">
          <FormField label="Email" name="email" type="email" required placeholder="Email" autoComplete="email" />
          <FormField label="Phone" name="phone" type="tel" required placeholder="Phone" autoComplete="tel" />
        </div>
        <FormField label="Topic" name="topic" placeholder="e.g. UK acquisition, Lahore plot" />
        <div>
          <label htmlFor="contact-message" className="mb-2 block text-[10px] uppercase tracking-[0.28em] text-white/35">
            Message
          </label>
          <textarea
            id="contact-message"
            name="message"
            required
            rows={4}
            placeholder="Your objectives, timeline, and any constraints."
            className="w-full resize-none border-0 border-b border-white/12 bg-transparent py-2.5 font-[family-name:var(--font-manrope)] text-sm font-light text-white/90 outline-none transition-colors placeholder:text-white/25 focus:border-[#C5A880]"
          />
        </div>

        {formState.status === 'error' ? (
          <p className="rounded-lg border border-red-400/30 bg-red-400/10 px-3 py-2 text-sm text-red-200/95">{formState.message}</p>
        ) : null}
        {formState.status === 'success' ? (
          <p className="rounded-lg border border-emerald-400/30 bg-emerald-400/10 px-3 py-2 text-sm text-emerald-100/95">{formState.message}</p>
        ) : null}

        <button
          type="submit"
          disabled={formState.status === 'sending'}
          className="lux-button w-full rounded-full bg-[#f4efe8] py-4 font-[family-name:var(--font-manrope)] text-[11px] font-semibold uppercase tracking-[0.24em] text-[#0a1412] transition-colors hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          {formState.status === 'sending' ? 'Sending…' : 'Send request'}
        </button>

        <p className="text-center text-[10px] leading-relaxed text-white/30">
          By submitting, you agree we may contact you regarding this inquiry. We do not sell your data.
        </p>
      </form>
    </div>
  );
}

function StudiosHeader() {
  const [ref, inView] = useInViewOnce({ threshold: 0.2, rootMargin: '0px' });
  return (
    <div
      ref={ref}
      className={`mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:translate-y-0 motion-reduce:opacity-100 ${
        inView ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
      }`}
    >
      <div>
        <p className="text-[10px] uppercase tracking-[0.35em] text-[#C5A880]/90">Studios</p>
        <h3 className="mt-2 font-playfair text-3xl font-light text-white md:text-4xl">Two doors. One standard.</h3>
      </div>
      <p className="max-w-md font-[family-name:var(--font-manrope)] text-sm font-light text-white/45">
        Visit by appointment. We coordinate introductions across both markets.
      </p>
    </div>
  );
}

function StudioCard({ title, lines }) {
  const [ref, inView] = useInViewOnce({ threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
  return (
    <article
      ref={ref}
      className={`group relative overflow-hidden border border-white/[0.08] bg-gradient-to-br from-white/[0.04] to-transparent px-8 py-10 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-[#C5A880]/25 motion-reduce:translate-y-0 motion-reduce:opacity-100 ${
        inView ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
      }`}
    >
      <div className="absolute left-0 top-0 h-full w-[3px] bg-gradient-to-b from-[#C5A880] via-[#C5A880]/40 to-transparent opacity-90" />
      <div className="flex items-start gap-4 pl-2">
        <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#C5A880]" strokeWidth={1.25} />
        <div>
          <h4 className="font-playfair text-xl text-white">{title}</h4>
          <address className="mt-3 font-[family-name:var(--font-manrope)] text-sm font-light not-italic leading-relaxed text-white/55">
            {lines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </address>
        </div>
      </div>
    </article>
  );
}

function QuickRowsBlock() {
  const [ref, inView] = useInViewOnce({ threshold: 0.08, rootMargin: '0px' });
  return (
    <div
      ref={ref}
      className={`mt-12 grid gap-4 border border-white/[0.08] bg-white/[0.02] p-6 backdrop-blur-sm sm:grid-cols-3 sm:p-8 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:translate-y-0 motion-reduce:opacity-100 ${
        inView ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      }`}
    >
      <QuickRow icon={Phone} label="Phone">
        <a href="tel:+923211222999" className="mt-1 block text-sm text-white/70 transition-colors hover:text-[#C5A880]">
          PK (+92) 321-1222999
        </a>
        <a href="tel:+447383663339" className="block text-sm text-white/70 transition-colors hover:text-[#C5A880]">
          UK +44 7383663339
        </a>
      </QuickRow>
      <QuickRow icon={Mail} label="Email">
        <a
          href="mailto:contact@theplotsale.com"
          className="mt-1 break-all text-sm text-white/70 transition-colors hover:text-[#C5A880]"
        >
          contact@theplotsale.com
        </a>
      </QuickRow>
      <QuickRow icon={Clock} label="Hours">
        <p className="mt-1 text-sm text-white/70">Mon–Sat · 9:00–18:00</p>
        <p className="text-sm text-white/50">Sunday · by appointment</p>
      </QuickRow>
    </div>
  );
}

function FormField({ label, name, type = 'text', required, placeholder, autoComplete }) {
  return (
    <div>
      <label htmlFor={`cf-${name}`} className="mb-2 block text-[10px] uppercase tracking-[0.28em] text-white/35">
        {label}
        {required ? <span className="text-[#C5A880]/80"> ·</span> : null}
      </label>
      <input
        id={`cf-${name}`}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        placeholder={placeholder}
        className="w-full border-0 border-b border-white/12 bg-transparent py-2.5 font-[family-name:var(--font-manrope)] text-sm font-light text-white/90 outline-none transition-colors placeholder:text-white/25 focus:border-[#C5A880]"
      />
    </div>
  );
}

function QuickRow({ icon: Icon, label, children }) {
  return (
    <div className="flex gap-4 border-b border-white/[0.06] pb-6 sm:border-b-0 sm:pb-0">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#C5A880]/25 bg-[#C5A880]/5">
        <Icon className="h-4 w-4 text-[#C5A880]" strokeWidth={1.25} />
      </div>
      <div>
        <p className="text-[10px] uppercase tracking-[0.28em] text-white/35">{label}</p>
        {children}
      </div>
    </div>
  );
}
