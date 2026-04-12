'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { MapPin, ArrowRight } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'Airport City',
    tagline: 'Home is Where Your Story Unfolds',
    description: 'A master-planned community near Sialkot International Airport, offering modern living with world-class amenities. Experience the perfect blend of connectivity and tranquility in this prestigious development.',
    location: 'Sialkot, Pakistan',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80',
    status: 'Active Development'
  },
  {
    id: 2,
    title: 'Canal Fort 2 Homes',
    tagline: 'A Place to Grow, A Place to Belong',
    description: 'Nestled along the scenic canal, this residential haven offers spacious plots and contemporary homes designed for families seeking comfort and community. A sanctuary where memories are made and futures are built.',
    location: 'Lahore, Pakistan',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80',
    status: 'Pre-Launch'
  },
  {
    id: 3,
    title: 'Exxsn Heights',
    tagline: 'Premium Vertical Development Under Way',
    description: 'Soaring above the cityscape, Exxsn Heights redefines urban luxury with its contemporary architecture and panoramic views. Each residence is crafted to offer unparalleled sophistication and modern convenience.',
    location: 'Lahore, Pakistan',
    image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1200&q=80',
    status: 'Under Construction'
  },
  {
    id: 4,
    title: 'Pearl Garden Housing Scheme',
    tagline: 'Premium Vertical Development Under Way',
    description: 'An exclusive gated community featuring lush landscapes and premium residential plots. Pearl Garden combines natural beauty with modern infrastructure, creating an oasis of refined living.',
    location: 'Lahore, Pakistan',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&q=80',
    status: 'Active Development'
  },
  {
    id: 5,
    title: 'Siddique City',
    tagline: 'Elevated Living, Grounded in Comfort',
    description: 'A thoughtfully planned township offering affordable luxury and comprehensive amenities. Siddique City is designed for families who value quality, accessibility, and a vibrant community atmosphere.',
    location: 'Lahore, Pakistan',
    image: 'https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?w=1200&q=80',
    status: 'Active Sales'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.4, 0, 0.2, 1]
    }
  }
};

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0A] pt-32 pb-20 px-6">
      <div className="max-w-[1600px] mx-auto">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 mb-6"
          >
            <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-[#C5A880]" />
            <span className="text-[#C5A880] text-[10px] tracking-[0.3em] uppercase font-medium">
              Our Portfolio
            </span>
            <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-[#C5A880]" />
          </motion.div>

          <h1 className="font-playfair text-5xl md:text-7xl text-white font-light mb-6 leading-tight">
            Designing Communities,<br />
            <span className="italic text-[#C5A880]">Defining Futures</span>
          </h1>

          <p className="text-white/50 text-sm md:text-base max-w-3xl mx-auto font-light leading-relaxed">
            From concept to completion, we create landmark developments that transform landscapes 
            and elevate lifestyles. Each project is a testament to our commitment to excellence.
          </p>
        </motion.div>

        {/* Projects Showcase */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-12"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              className={`group relative flex flex-col ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              } gap-8 items-center`}
            >
              {/* Image Section */}
              <div className="relative w-full lg:w-1/2 h-[400px] lg:h-[500px] rounded-2xl overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-40" />
                
                {/* Status Badge */}
                <div className="absolute top-6 left-6 bg-[#C5A880]/10 backdrop-blur-md border border-[#C5A880]/30 text-[#C5A880] px-4 py-2 rounded-full">
                  <span className="text-xs tracking-wider uppercase font-medium">{project.status}</span>
                </div>
              </div>

              {/* Content Section */}
              <div className="w-full lg:w-1/2 space-y-6">
                {/* Location */}
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#C5A880]" />
                  <span className="text-white/60 text-sm tracking-wide">{project.location}</span>
                </div>

                {/* Title */}
                <h2 className="font-playfair text-4xl md:text-5xl text-white font-light leading-tight group-hover:text-[#C5A880] transition-colors duration-300">
                  {project.title}
                </h2>

                {/* Tagline */}
                <p className="font-playfair italic text-xl text-[#C5A880]/80 leading-relaxed">
                  {project.tagline}
                </p>

                {/* Description */}
                <p className="text-white/60 text-base leading-relaxed font-light">
                  {project.description}
                </p>

                {/* CTA Button */}
                <button className="group/btn inline-flex items-center gap-3 px-8 py-4 bg-transparent border border-[#C5A880]/30 text-[#C5A880] rounded-lg text-sm tracking-[0.2em] uppercase font-medium hover:bg-[#C5A880] hover:text-[#111111] transition-all duration-300">
                  Explore Project
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </main>
  );
}
