'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

const philosophyData = [
    {
        id: 1,
        title: "Our Mission",
        subtitle: "EMPOWERING BUYERS",
        description: "Empower buyers with premier Real estate opportunities through transparent deals, expert guidance, and personalized service.",
        image: "/about/philosophy1.png",
    },
    {
        id: 2,
        title: "Our Vision",
        subtitle: "SHAPING COMMUNITIES",
        description: "To be the region's most trusted platform for plot ownership—shaping sustainable communities and enabling dreams through innovation and integrity.",
        image: "/about/philosophy2.png",
    },
    {
        id: 3,
        title: "Our Values",
        subtitle: "INTEGRITY FIRST",
        description: "We act with integrity in every decision and interaction, ensuring honesty, accountability, and trust are always foundational.",
        image: "/about/philosophy3.png",
    }
];

export default function ClubPhilosophy() {
    const targetRef = useRef(null);

    // SCROLL LOGIC (Desktop)
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    // Slide the cards horizontally based on vertical scroll
    // mapping scroll 0% -> 100% to x-axis 0% -> -66% (to show all 3 cards)
    const x = useTransform(scrollYProgress, [0, 1], ["1%", "-65%"]);

    return (
        <section ref={targetRef} className="relative bg-[#0A0A0A] text-white">

            {/* ================= DESKTOP LAYOUT (Horizontal Scroll) ================= */}
            <div className="hidden lg:block h-[300vh] relative">
                <div className="sticky top-0 flex h-screen items-center overflow-hidden">

                    {/* Horizontal Track */}
                    <motion.div style={{ x }} className="flex gap-12 pl-24 pr-24">
                        {/* Intro Text Block (First item in scroll) */}
                        <div className="min-w-[400px] flex flex-col justify-center">
                            <p className="font-sans text-sm text-[#C5A880] tracking-[0.3em] mb-6">
                                OUR PRINCIPLES
                            </p>
                            <h2 className="font-serif text-6xl font-light leading-tight mb-8">
                                What Drives <br />
                                <span className="italic text-[#C5A880]">Our Work</span>
                            </h2>
                            <p className="font-sans text-lg text-gray-300 leading-relaxed max-w-sm">
                                Our mission, vision, and values guide every project we undertake and every relationship we build.
                            </p>
                        </div>

                        {/* The Cards */}
                        {philosophyData.map((item) => (
                            <div key={item.id} className="relative h-[70vh] w-[60vh] min-w-[60vh] rounded-2xl overflow-hidden border border-white/10 group">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                                {/* Content */}
                                <div className="absolute bottom-0 left-0 p-10 w-full">
                                    <p className="font-sans text-xs text-[#C5A880] tracking-[0.25em] mb-3 uppercase">
                                        {item.subtitle}
                                    </p>
                                    <h3 className="font-serif text-3xl mb-4 text-white">
                                        {item.title}
                                    </h3>
                                    <p className="font-sans text-sm text-gray-300 leading-relaxed opacity-0 transform translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* ================= MOBILE LAYOUT (Swipe Carousel) ================= */}
            <div className="lg:hidden py-24 px-6">
                <div className="mb-12">
                    <p className="font-sans text-xs text-[#C5A880] tracking-[0.3em] mb-4 text-center">
                        OUR PRINCIPLES
                    </p>
                    <h2 className="font-serif text-4xl text-center font-light">
                        What Drives <br /><span className="italic text-[#C5A880]">Our Work</span>
                    </h2>
                </div>

                {/* Scroll Container */}
                <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 -mx-6 px-6 no-scrollbar">
                    {philosophyData.map((item) => (
                        <div key={item.id} className="snap-center shrink-0 w-[85vw] relative aspect-[3/4] rounded-xl overflow-hidden border border-white/10">
                            <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                            <div className="absolute bottom-0 left-0 p-8 w-full">
                                <p className="font-sans text-[10px] text-[#C5A880] tracking-[0.25em] mb-2 uppercase">
                                    {item.subtitle}
                                </p>
                                <h3 className="font-serif text-2xl mb-3 text-white">
                                    {item.title}
                                </h3>
                                <p className="font-sans text-sm text-gray-300 leading-relaxed">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </section>
    );
}
