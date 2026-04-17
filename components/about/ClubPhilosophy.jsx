'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';

const philosophyData = [
  {
    id: 1,
    title: 'Our Mission',
    subtitle: 'EMPOWERING BUYERS',
    description:
      'Empower buyers with premier Real estate opportunities through transparent deals, expert guidance, and personalized service.',
    image: '/about/philosophy1.png',
  },
  {
    id: 2,
    title: 'Our Vision',
    subtitle: 'SHAPING COMMUNITIES',
    description:
      "To be the region's most trusted platform for plot ownership—shaping sustainable communities and enabling dreams through innovation and integrity.",
    image: '/about/philosophy2.png',
  },
  {
    id: 3,
    title: 'Our Values',
    subtitle: 'INTEGRITY FIRST',
    description:
      'We act with integrity in every decision and interaction, ensuring honesty, accountability, and trust are always foundational.',
    image: '/about/philosophy3.png',
  },
];

export default function ClubPhilosophy() {
  const targetRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const el = targetRef.current;
    if (!el) return;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const topAbs = rect.top + window.scrollY;
      const start = topAbs - window.innerHeight;
      const scrollable = Math.max(1, el.offsetHeight - window.innerHeight);
      const raw = (window.scrollY - start) / scrollable;
      setScrollProgress(Math.max(0, Math.min(1, raw)));
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  const translatePercent = 1 - scrollProgress * 66;

  return (
    <section className="relative bg-[#0A0A0A] text-white">
      <div ref={targetRef} className="relative hidden h-[300vh] lg:block">
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <div
            className="flex gap-12 pl-24 pr-24 will-change-transform"
            style={{
              transform: `translateX(${translatePercent}%)`,
              transition: 'transform 0.05s linear',
            }}
          >
            <div className="flex min-w-[400px] flex-col justify-center">
              <p className="mb-6 font-sans text-sm tracking-[0.3em] text-[#C5A880]">OUR PRINCIPLES</p>
              <h2 className="mb-8 font-serif text-6xl font-light leading-tight">
                What Drives <br />
                <span className="italic text-[#C5A880]">Our Work</span>
              </h2>
              <p className="max-w-sm font-sans text-lg leading-relaxed text-gray-300">
                Our mission, vision, and values guide every project we undertake and every relationship we build.
              </p>
            </div>

            {philosophyData.map((item) => (
              <div
                key={item.id}
                className="group relative h-[70vh] w-[60vh] min-w-[60vh] overflow-hidden rounded-2xl border border-white/10"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                <div className="absolute bottom-0 left-0 w-full p-10">
                  <p className="mb-3 font-sans text-xs uppercase tracking-[0.25em] text-[#C5A880]">{item.subtitle}</p>
                  <h3 className="mb-4 font-serif text-3xl text-white">{item.title}</h3>
                  <p className="translate-y-4 transform font-sans text-sm leading-relaxed text-gray-300 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="px-6 py-24 lg:hidden">
        <div className="mb-12 text-center">
          <p className="mb-4 font-sans text-xs tracking-[0.3em] text-[#C5A880]">OUR PRINCIPLES</p>
          <h2 className="font-serif text-4xl font-light">
            What Drives <br />
            <span className="italic text-[#C5A880]">Our Work</span>
          </h2>
        </div>

        <div className="-mx-6 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-8 no-scrollbar">
          {philosophyData.map((item) => (
            <div
              key={item.id}
              className="relative aspect-[3/4] w-[85vw] shrink-0 snap-center overflow-hidden rounded-xl border border-white/10"
            >
              <Image src={item.image} alt={item.title} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

              <div className="absolute bottom-0 left-0 w-full p-8">
                <p className="mb-2 font-sans text-[10px] uppercase tracking-[0.25em] text-[#C5A880]">{item.subtitle}</p>
                <h3 className="mb-3 font-serif text-2xl text-white">{item.title}</h3>
                <p className="font-sans text-sm leading-relaxed text-gray-300">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
