'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import CountUpNumber from '@/components/projects/CountUpNumber';

const heritageData = [
  {
    year: '1998',
    title: 'Foundation of Trust',
    body: 'ThePlotSale is founded by the Siddique family with a single mandate — bridge the gap between developers and homeowners through transparent, integrity-driven real estate across London and Lahore. Over two decades, the first handshake became the company charter: quality in every detail, dedication in every project.',
    image: '/images/TheGreenValley.png',
  },
  {
    year: '2023',
    title: 'Green Valley Delivered',
    body: 'Our Murree hill-retreat project — Green Valley — is handed over. Finished in the Siddique family tradition, it becomes the firm\'s calling card and proves a quiet thesis: alpine landscape, private roads and careful architecture compound resale value for a generation.',
    image: '/images/TheGreenValley3.png',
  },
  {
    year: '2025',
    title: 'Union Town & EXXNS Heights',
    body: 'The portfolio expands into two flagship fronts. Union Town — a master-planned community in Sialkot with its own civic mosque, school, and sports complex — is underway. In Lahore, EXXNS Heights rises as our signature vertical development, engineered for international investors.',
    image: '/images/UnionTown4CityView.png',
  },
  {
    year: '2026',
    title: 'Cultivating Futures',
    body: "Today we operate across two continents — London and Lahore — with a private-client desk for cross-border investors. We don't just sell properties; we shape the addresses our clients are proud to call home, and the assets their children will inherit.",
    image: '/images/ExxnsHeight.png',
  },
];

function HeritageBlockDesktop({ data, index, activeIndex, onActivate }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && e.intersectionRatio > 0.2) {
          onActivate(index);
        }
      },
      { threshold: [0, 0.15, 0.25, 0.35, 0.5], rootMargin: '-38% 0px -38% 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [index, onActivate]);

  const active = activeIndex === index;

  return (
    <div ref={ref} className="relative hidden min-h-[70vh] items-center lg:flex">
      <div className="absolute bottom-0 left-0 top-0 w-px">
        <div
          className="absolute bottom-0 left-0 top-0 w-px origin-top bg-[#C5A880] transition-transform duration-500 ease-out"
          style={{ transform: active ? 'scaleY(1)' : 'scaleY(0.35)' }}
        />
        <div
          className="absolute left-[-3px] top-1/2 h-[7px] w-[7px] -translate-y-1/2 rounded-full bg-[#C5A880] transition-all duration-500"
          style={{ opacity: active ? 1 : 0.35, transform: active ? 'translateY(-50%) scale(1.1)' : 'translateY(-50%) scale(0.9)' }}
        />
      </div>

      <div className="pr-8 pl-12 lg:pl-16">
        <div
          className={`transition-all duration-500 ease-out ${
            active ? 'translate-x-0 opacity-100' : 'translate-x-[-10px] opacity-[0.35]'
          }`}
        >
          <p className="mb-6 font-sans text-sm tracking-[0.3em] text-[#C5A880] lg:mb-8 lg:text-base">
            {active ? <CountUpNumber end={parseInt(data.year)} duration={1500} /> : data.year}
          </p>
          <h3 className="mb-6 font-serif text-4xl font-light leading-tight text-white lg:mb-8 lg:text-5xl xl:text-6xl">
            {data.title}
          </h3>
          <p className="max-w-xl font-sans text-lg font-normal leading-relaxed text-gray-100 opacity-90">{data.body}</p>
        </div>
      </div>
    </div>
  );
}

function HeritageBlockMobile({ data, index }) {
  return (
    <div
      className="relative mb-12 rounded-2xl border border-white/5 bg-gradient-to-b from-white/5 to-transparent p-6 backdrop-blur-sm lux-animate-featured-in lg:hidden"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <span className="mb-4 inline-block rounded-full border border-[#C5A880]/30 px-3 py-1 font-serif text-xs text-[#C5A880]">
        {data.year}
      </span>
      <h3 className="mb-4 font-serif text-3xl font-light leading-tight text-white">{data.title}</h3>
      <p className="mb-6 text-sm leading-relaxed text-gray-300">{data.body}</p>
      <div className="relative h-64 w-full overflow-hidden rounded-lg border border-white/10 shadow-2xl sm:h-80">
        <Image src={data.image} alt={data.title} fill className="object-cover" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>
    </div>
  );
}

function StickyImageContainer({ activeIndex }) {
  return (
    <div className="sticky top-0 flex h-screen flex-col justify-center p-8 lg:p-12">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-white/10 shadow-2xl">
        {heritageData.map((data, index) => (
          <div
            key={index}
            className="absolute inset-0 transition-all duration-700 ease-in-out"
            style={{
              opacity: activeIndex === index ? 1 : 0,
              filter: activeIndex === index ? 'grayscale(0%) brightness(1)' : 'grayscale(100%) brightness(0.7)',
              zIndex: activeIndex === index ? 2 : 1,
            }}
          >
            <Image src={data.image} alt={data.title} fill className="object-cover" priority={index === 0} />
          </div>
        ))}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20" />
      </div>
    </div>
  );
}

export default function HeritageStory() {
  const [activeIndex, setActiveIndex] = useState(0);
  const onActivate = useCallback((i) => setActiveIndex(i), []);

  return (
    <section className="relative bg-[#0A0A0A] py-20 lg:py-32">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="lux-animate-featured-in mb-16 text-center lg:mb-24">
          <p className="mb-4 font-sans text-sm tracking-[0.3em] text-[#C5A880] lg:text-base">OUR STORY</p>
          <h2 className="font-serif text-4xl font-light text-white lg:text-5xl xl:text-6xl">Our Journey of Excellence</h2>
        </div>

        <div className="hidden lg:grid lg:grid-cols-2 lg:gap-12 xl:gap-16">
          <div className="relative">
            <div className="absolute bottom-0 left-0 top-0 w-px bg-white/10" />
            <div className="space-y-0">
              {heritageData.map((data, index) => (
                <HeritageBlockDesktop
                  key={index}
                  data={data}
                  index={index}
                  activeIndex={activeIndex}
                  onActivate={onActivate}
                />
              ))}
            </div>
          </div>
          <StickyImageContainer activeIndex={activeIndex} />
        </div>

        <div className="lg:hidden">
          {heritageData.map((data, index) => (
            <HeritageBlockMobile key={index} data={data} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
