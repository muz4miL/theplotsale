'use client';

import { useInViewOnce } from '@/hooks/useInViewOnce';

export default function Testimonials() {
  const [sectionRef, inView] = useInViewOnce({ once: true, threshold: 0.08, rootMargin: '-80px 0px' });

  const testimonialsData = [
    {
      name: 'Recent Investor',
      title: 'Property Investor',
      quote:
        '"ThePlotSale has consistently exceeded my expectations. Their professionalism, market insights, and ongoing support have made each investment experience smooth and rewarding."',
    },
    {
      name: 'Frequent Buyer',
      title: 'Repeat Client',
      quote:
        '"As a frequent buyer, ThePlotSale has been my trusted partner. They understand my needs, offer great options, and make the process smooth and stress-free."',
    },
    {
      name: 'First-Time Buyer',
      title: 'New Homeowner',
      quote:
        '"As a first-time buyer, I was nervous about picking the right plot. ThePlotSale guided me through every step with patience and honesty, and now I feel confident in my investment."',
    },
  ];

  const topRowTestimonials = [...testimonialsData, ...testimonialsData];
  const bottomRowTestimonials = [...testimonialsData.slice().reverse(), ...testimonialsData.slice().reverse()];

  const headerReveal = `transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:translate-y-0 motion-reduce:opacity-100 ${
    inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
  }`;

  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden bg-[#0A0A0A] py-14 max-lg:py-16 lg:py-16">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.015] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
        }}
      />

      <div className="mx-auto max-w-7xl pl-[max(1.5rem,env(safe-area-inset-left,0px))] pr-[max(1.5rem,env(safe-area-inset-right,0px))] md:pl-8 md:pr-8 lg:pl-12 lg:pr-12">
        <div className={`mb-12 text-center lg:mb-16 ${headerReveal}`}>
          <div className="mb-6 flex items-center justify-center gap-3">
            <div className="h-[1px] w-10 bg-gradient-to-r from-transparent to-[#C5A880]" />
            <span className="text-[10px] font-medium uppercase tracking-[0.35em] text-[#C5A880]">Client Experiences</span>
            <div className="h-[1px] w-10 bg-gradient-to-r from-[#C5A880] to-transparent" />
          </div>

          <h2 className="mb-4 lg:mb-5">
            <span className="block font-playfair text-3xl font-light leading-[1.1] tracking-tight text-white md:text-5xl lg:text-6xl">
              Voices of Our Community
            </span>
          </h2>

          <p className="mx-auto mb-0 max-w-2xl text-sm font-light text-white/60 md:text-base">
            Trusted by investors and homeowners across London and Lahore.
          </p>
        </div>
      </div>

      <div className="relative w-full">
        <div className="mb-4 overflow-hidden">
          <div className="lux-marquee-track">
            {topRowTestimonials.map((testimonial, index) => (
              <div
                key={`top-${index}-${testimonial.name}`}
                className="w-[360px] flex-shrink-0 rounded-sm border border-white/10 bg-white/5 p-5 backdrop-blur-md transition-all duration-300 hover:border-[#C5A880]/30"
              >
                <div className="mb-4 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#C5A880]/30 bg-[#C5A880]/20">
                    <span className="font-[family-name:var(--font-playfair)] text-lg font-semibold text-[#C5A880]">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-[family-name:var(--font-manrope)] text-sm font-semibold text-white">{testimonial.name}</h4>
                    <p className="font-[family-name:var(--font-manrope)] text-xs text-white/50">{testimonial.title}</p>
                  </div>
                </div>

                <blockquote className="font-[family-name:var(--font-manrope)] text-sm font-light italic leading-relaxed text-white/80">
                  {testimonial.quote}
                </blockquote>
              </div>
            ))}
          </div>
        </div>

        <div className="overflow-hidden">
          <div className="lux-marquee-track lux-marquee-track-reverse">
            {bottomRowTestimonials.map((testimonial, index) => (
              <div
                key={`bottom-${index}-${testimonial.name}`}
                className="w-[360px] flex-shrink-0 rounded-sm border border-white/10 bg-white/5 p-5 backdrop-blur-md transition-all duration-300 hover:border-[#C5A880]/30"
              >
                <div className="mb-4 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#C5A880]/30 bg-[#C5A880]/20">
                    <span className="font-[family-name:var(--font-playfair)] text-lg font-semibold text-[#C5A880]">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-[family-name:var(--font-manrope)] text-sm font-semibold text-white">{testimonial.name}</h4>
                    <p className="font-[family-name:var(--font-manrope)] text-xs text-white/50">{testimonial.title}</p>
                  </div>
                </div>

                <blockquote className="font-[family-name:var(--font-manrope)] text-sm font-light italic leading-relaxed text-white/80">
                  {testimonial.quote}
                </blockquote>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
