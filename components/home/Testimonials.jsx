'use client';

import { useInViewOnce } from '@/hooks/useInViewOnce';

export default function Testimonials() {
  const [sectionRef, inView] = useInViewOnce({ once: true, threshold: 0.08, rootMargin: '-80px 0px' });

  const testimonialsData = [
    {
      name: 'Shahzad Ahmed',
      title: 'CEO, Textile Manufacturing',
      location: 'Lahore',
      image: 'https://i.pravatar.cc/150?img=12',
      quote:
        '"ThePlotSale has consistently exceeded my expectations. Their professionalism, market insights, and ongoing support have made each investment experience smooth and rewarding. I\'ve invested in multiple properties through them."',
    },
    {
      name: 'Farhan Malik',
      title: 'Managing Director, Import/Export',
      location: 'Karachi',
      image: 'https://i.pravatar.cc/150?img=33',
      quote:
        '"As a frequent buyer, ThePlotSale has been my trusted partner. They understand my needs, offer great options, and make the process smooth and stress-free. Their expertise in both UK and Pakistan markets is unmatched."',
    },
    {
      name: 'Ayesha Khan',
      title: 'Real Estate Developer',
      location: 'Islamabad',
      image: 'https://i.pravatar.cc/150?img=47',
      quote:
        '"Working with ThePlotSale has been transformative for my portfolio. Their attention to detail, transparent dealings, and deep market knowledge have helped me secure prime locations in both Lahore and London."',
    },
    {
      name: 'Imran Siddiqui',
      title: 'Chairman, Hospitality Group',
      location: 'London',
      image: 'https://i.pravatar.cc/150?img=14',
      quote:
        '"ThePlotSale guided me through every step with patience and expertise. Their dual-market presence in London and Lahore gives them unique insights that have proven invaluable for my investment strategy."',
    },
    {
      name: 'Zainab Rashid',
      title: 'Investment Banker',
      location: 'Dubai',
      image: 'https://i.pravatar.cc/150?img=45',
      quote:
        '"As someone who analyzes investments professionally, I can confidently say ThePlotSale operates at the highest standard. Their market research, legal support, and post-purchase service are exceptional."',
    },
    {
      name: 'Kamran Haider',
      title: 'Founder, Tech Startup',
      location: 'Lahore',
      image: 'https://i.pravatar.cc/150?img=52',
      quote:
        '"I was nervous about my first property investment, but ThePlotSale made it seamless. Their team\'s professionalism and honest guidance gave me confidence. Now I own three plots through them."',
    },
    {
      name: 'Saira Akhtar',
      title: 'Medical Consultant',
      location: 'Manchester',
      image: 'https://i.pravatar.cc/150?img=32',
      quote:
        '"ThePlotSale has been instrumental in helping me invest back home in Pakistan while living abroad. Their transparent communication and reliable service make international property investment stress-free."',
    },
    {
      name: 'Bilal Chaudhry',
      title: 'Director, Construction Firm',
      location: 'Islamabad',
      image: 'https://i.pravatar.cc/150?img=59',
      quote:
        '"Their market insights are second to none. ThePlotSale helped me identify emerging areas before they peaked. The ROI on my investments has exceeded all projections. Truly exceptional service."',
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
        <div className="mb-6 overflow-hidden">
          <div className="lux-marquee-track">
            {topRowTestimonials.map((testimonial, index) => (
              <div
                key={`top-${index}-${testimonial.name}`}
                className="group relative w-[420px] flex-shrink-0 rounded-lg border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.03] p-6 backdrop-blur-xl transition-all duration-500 hover:border-[#C5A880]/40 hover:shadow-[0_8px_32px_rgba(197,168,128,0.15)]"
              >
                {/* Subtle grain texture */}
                <div
                  className="pointer-events-none absolute inset-0 rounded-lg opacity-[0.03] mix-blend-overlay"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
                  }}
                />

                {/* Gold accent line */}
                <div className="absolute left-0 top-0 h-full w-[2px] bg-gradient-to-b from-transparent via-[#C5A880]/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative">
                  <div className="mb-5 flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className="relative flex h-14 w-14 flex-shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-[#C5A880]/40 bg-gradient-to-br from-[#C5A880]/30 to-[#C5A880]/10 shadow-lg shadow-[#C5A880]/20 transition-all duration-500 group-hover:border-[#C5A880]/60 group-hover:shadow-[#C5A880]/30">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <div>
                        <h4 className="font-manrope text-base font-semibold tracking-tight text-white">
                          {testimonial.name}
                        </h4>
                        <p className="font-manrope text-xs font-medium text-[#C5A880]/80">
                          {testimonial.title}
                        </p>
                        <p className="font-manrope text-[10px] uppercase tracking-wider text-white/40">
                          {testimonial.location}
                        </p>
                      </div>
                    </div>

                    {/* Quote icon */}
                    <svg
                      className="h-8 w-8 text-[#C5A880]/20 transition-colors duration-500 group-hover:text-[#C5A880]/30"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
                    </svg>
                  </div>

                  <blockquote className="font-manrope text-[15px] font-light leading-relaxed tracking-wide text-white/85">
                    {testimonial.quote}
                  </blockquote>

                  {/* Star rating */}
                  <div className="mt-4 flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="h-4 w-4 text-[#C5A880]"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="overflow-hidden">
          <div className="lux-marquee-track lux-marquee-track-reverse">
            {bottomRowTestimonials.map((testimonial, index) => (
              <div
                key={`bottom-${index}-${testimonial.name}`}
                className="group relative w-[420px] flex-shrink-0 rounded-lg border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.03] p-6 backdrop-blur-xl transition-all duration-500 hover:border-[#C5A880]/40 hover:shadow-[0_8px_32px_rgba(197,168,128,0.15)]"
              >
                {/* Subtle grain texture */}
                <div
                  className="pointer-events-none absolute inset-0 rounded-lg opacity-[0.03] mix-blend-overlay"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
                  }}
                />

                {/* Gold accent line */}
                <div className="absolute left-0 top-0 h-full w-[2px] bg-gradient-to-b from-transparent via-[#C5A880]/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative">
                  <div className="mb-5 flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className="relative flex h-14 w-14 flex-shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-[#C5A880]/40 bg-gradient-to-br from-[#C5A880]/30 to-[#C5A880]/10 shadow-lg shadow-[#C5A880]/20 transition-all duration-500 group-hover:border-[#C5A880]/60 group-hover:shadow-[#C5A880]/30">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <div>
                        <h4 className="font-manrope text-base font-semibold tracking-tight text-white">
                          {testimonial.name}
                        </h4>
                        <p className="font-manrope text-xs font-medium text-[#C5A880]/80">
                          {testimonial.title}
                        </p>
                        <p className="font-manrope text-[10px] uppercase tracking-wider text-white/40">
                          {testimonial.location}
                        </p>
                      </div>
                    </div>

                    {/* Quote icon */}
                    <svg
                      className="h-8 w-8 text-[#C5A880]/20 transition-colors duration-500 group-hover:text-[#C5A880]/30"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
                    </svg>
                  </div>

                  <blockquote className="font-manrope text-[15px] font-light leading-relaxed tracking-wide text-white/85">
                    {testimonial.quote}
                  </blockquote>

                  {/* Star rating */}
                  <div className="mt-4 flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="h-4 w-4 text-[#C5A880]"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
