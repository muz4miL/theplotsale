'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';

const heritageData = [
    {
        year: '2020',
        title: 'Foundation of Trust',
        body: 'ThePlotSale was established with a clear mission: to bridge the gap between developers and homeowners through transparent, integrity-driven real estate solutions across London and Lahore.',
        image: '/about/heritage.png',
    },
    {
        year: '2022',
        title: 'Expanding Horizons',
        body: 'Our portfolio grew to include landmark projects like Airport City Sialkot, Siddique City, and premium developments in Hounslow, establishing us as a trusted name in cross-border real estate consultancy.',
        image: '/about/heritage2.png',
    },
    {
        year: '2025',
        title: 'Cultivating Futures',
        body: 'Today, we stand as a premier consultancy committed to quality in every detail and dedication in every project. We don\'t just sell properties—we help people find spaces they\'re proud to call home.',
        image: '/about/heritage3.png',
    },
];

const HeritageBlock = ({ data, index, activeIndex, onActivate }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, {
        margin: '-20% 0px -20% 0px',
        amount: 0.3
    });

    useEffect(() => {
        if (isInView) {
            onActivate(index);
        }
    }, [isInView, index, onActivate]);

    return (
        <>
            {/* DESKTOP VIEW - Original Timeline Design */}
            <motion.div
                ref={ref}
                className="hidden lg:flex relative min-h-[70vh] items-center"
            >
                {/* Timeline Indicator */}
                <div className="absolute left-0 top-0 bottom-0 w-px">
                    <motion.div
                        className="absolute left-0 top-0 bottom-0 w-px bg-[#C5A880]"
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: isInView ? 1 : 0 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        style={{ transformOrigin: 'top' }}
                    />
                    <motion.div
                        className="absolute left-[-3px] top-1/2 -translate-y-1/2 w-[7px] h-[7px] rounded-full bg-[#C5A880]"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{
                            scale: isInView ? 1.2 : 0,
                            opacity: isInView ? 1 : 0
                        }}
                        transition={{ duration: 0.4, delay: 0.3 }}
                    />
                </div>

                {/* Desktop Content */}
                <div className="pl-12 lg:pl-16 pr-8">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{
                            opacity: isInView ? 1 : 0.2,
                            x: isInView ? 0 : -20
                        }}
                        transition={{ duration: 0.6 }}
                    >
                        {/* Year Label */}
                        <motion.p
                            className="font-sans text-sm lg:text-base text-[#C5A880] tracking-[0.3em] mb-6 lg:mb-8"
                            animate={{
                                opacity: isInView ? 1 : 0.5
                            }}
                        >
                            {data.year}
                        </motion.p>

                        {/* Title */}
                        <h3 className="font-serif text-4xl lg:text-5xl xl:text-6xl text-white font-light mb-6 lg:mb-8 leading-tight">
                            {data.title}
                        </h3>

                        {/* Body */}
                        <p className="font-sans text-lg text-gray-100 font-normal leading-relaxed max-w-xl opacity-90">
                            {data.body}
                        </p>
                    </motion.div>
                </div>
            </motion.div>

            {/* MOBILE VIEW - Premium Glass Card Design */}
            <motion.div
                className="lg:hidden relative p-6 mb-12 rounded-2xl bg-gradient-to-b from-white/5 to-transparent border border-white/5 backdrop-blur-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
            >
                {/* Year Badge */}
                <span className="inline-block text-xs font-serif text-[#C5A880] border border-[#C5A880]/30 px-3 py-1 rounded-full mb-4">
                    {data.year}
                </span>

                {/* Title */}
                <h3 className="text-3xl font-serif text-white font-light mb-4 leading-tight">
                    {data.title}
                </h3>

                {/* Body */}
                <p className="text-sm text-gray-300 leading-relaxed mb-6">
                    {data.body}
                </p>

                {/* Premium Photo Frame */}
                <motion.div
                    className="relative w-full h-64 sm:h-80 rounded-lg overflow-hidden border border-white/10 shadow-2xl"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <Image
                        src={data.image}
                        alt={data.title}
                        fill
                        className="object-cover"
                    />
                    {/* Subtle vignette for depth */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                </motion.div>
            </motion.div>
        </>
    );
};

const StickyImageContainer = ({ activeIndex }) => {
    return (
        <div className="sticky top-0 h-screen flex flex-col justify-center p-8 lg:p-12">
            <div className="relative w-full aspect-[4/3] rounded-xl shadow-2xl overflow-hidden border border-white/10">
                {heritageData.map((data, index) => (
                    <motion.div
                        key={index}
                        className="absolute inset-0"
                        initial={{ opacity: 0 }}
                        animate={{
                            opacity: activeIndex === index ? 1 : 0,
                            filter: activeIndex === index
                                ? 'grayscale(0%) brightness(1)'
                                : 'grayscale(100%) brightness(0.7)'
                        }}
                        transition={{
                            opacity: { duration: 0.8, ease: 'easeInOut' },
                            filter: { duration: 0.8, ease: 'easeInOut' }
                        }}
                    >
                        <Image
                            src={data.image}
                            alt={data.title}
                            fill
                            className="object-cover"
                            priority={index === 0}
                        />
                    </motion.div>
                ))}

                {/* Subtle Vignette */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 pointer-events-none" />
            </div>
        </div>
    );
};

export default function HeritageStory() {
    const [activeIndex, setActiveIndex] = useState(0);

    // Track which section is in view
    const sectionRefs = useRef([]);

    return (
        <section className="relative bg-[#0A0A0A] py-20 lg:py-32">
            <div className="container mx-auto px-6 lg:px-12">
                {/* Section Header */}
                <motion.div
                    className="mb-16 lg:mb-24 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.6 }}
                >
                    <p className="font-sans text-sm lg:text-base text-[#C5A880] tracking-[0.3em] mb-4">
                        OUR STORY
                    </p>
                    <h2 className="font-serif text-4xl lg:text-5xl xl:text-6xl text-white font-light">
                        Our Journey of Excellence
                    </h2>
                </motion.div>

                {/* Desktop: Two Column Layout */}
                <div className="hidden lg:grid lg:grid-cols-2 lg:gap-12 xl:gap-16">
                    {/* Left Column: Scrolling Text with Timeline */}
                    <div className="relative">
                        {/* Vertical Timeline Base Line */}
                        <div className="absolute left-0 top-0 bottom-0 w-px bg-white/10" />

                        {/* Heritage Blocks */}
                        <div className="space-y-0">
                            {heritageData.map((data, index) => (
                                <HeritageBlock
                                    key={index}
                                    data={data}
                                    index={index}
                                    activeIndex={activeIndex}
                                    onActivate={setActiveIndex}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Sticky Image Container */}
                    <StickyImageContainer activeIndex={activeIndex} />
                </div>

                {/* Mobile: Glass Card Stack */}
                <div className="lg:hidden">
                    {heritageData.map((data, index) => (
                        <HeritageBlock
                            key={index}
                            data={data}
                            index={index}
                            activeIndex={activeIndex}
                            onActivate={setActiveIndex}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

