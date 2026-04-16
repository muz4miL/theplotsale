'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import SafeListingImage from '@/components/shared/SafeListingImage';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, MapPin, Maximize2 } from 'lucide-react';
import ListingLogo from '@/components/ListingLogo';
import ExtraordinaryCta from '@/components/shared/ExtraordinaryCta';

const TABS = ['Completed', 'Current', 'Upcoming'];

export default function PakistanProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('Current');

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch('/api/projects', { cache: 'no-store' });
        const data = await response.json();

        if (response.ok && data.success) {
          setProjects(data.data);
        } else {
          const apiMessage = data?.message || data?.error || 'Failed to load projects';
          setError(apiMessage);
        }
      } catch (err) {
        setError('Unable to connect to project service. Please try again shortly.');
        console.error('Error fetching projects:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  const filteredProjects = projects.filter(project => project.status === activeTab);

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="mx-4 max-w-2xl rounded-2xl border border-[#C5A880]/30 bg-white/5 p-8 text-center backdrop-blur-md">
          <p className="text-xs uppercase tracking-[0.3em] text-[#C5A880]">Projects Service Notice</p>
          <p className="mt-4 text-red-300 text-lg">Unable to load live projects right now.</p>
          <p className="mt-3 text-sm text-white/70">{error}</p>
          <p className="mt-4 text-xs text-white/50">
            If this is production, verify Vercel environment variables and MongoDB network access.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative pt-32 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Pakistan Projects
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Explore premium master-planned communities and luxury developments
            </p>
          </motion.div>

          {/* Tab Interface */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center mb-16"
          >
            <div className="inline-flex bg-white/5 backdrop-blur-md rounded-2xl p-2 border border-white/10">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className="relative px-8 py-3 rounded-xl font-semibold transition-colors duration-300"
                >
                  {activeTab === tab && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-[#C5A880] rounded-xl"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className={`relative z-10 ${activeTab === tab ? 'text-black' : 'text-gray-400 hover:text-white'}`}>
                    {tab}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Projects Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {filteredProjects.length === 0 ? (
                <div className="text-center py-20">
                  <div className="inline-block p-8 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10">
                    <p className="text-gray-400 text-lg">No {activeTab.toLowerCase()} projects available at the moment.</p>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                  {filteredProjects.map((project, index) => (
                    <ProjectCard key={project._id} project={project} index={index} />
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
      <ExtraordinaryCta />
    </div>
  );
}

function ProjectCard({ project, index }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Current':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Upcoming':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative"
    >
      <div className="relative h-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-black/35 backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:border-[#C5A880]/50 hover:shadow-[0_24px_48px_rgba(0,0,0,0.38)]">
          {/* Wide Format Image */}
          <div className="relative h-80 overflow-hidden">
            <SafeListingImage
              src={project.mainImage}
              alt={project.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

            <div className="absolute left-4 top-4">
              <ListingLogo src={project.primaryLogo} name={project.title} />
            </div>
            
            {/* Status Badge */}
            <div className={`absolute top-4 right-4 px-4 py-2 rounded-full border backdrop-blur-md ${getStatusColor(project.status)}`}>
              <span className="font-bold text-sm">{project.status}</span>
            </div>

            {/* Title Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="text-3xl font-bold text-white mb-2 group-hover:text-[#C5A880] transition-colors">
                {project.title}
              </h3>
              <div className="flex items-center text-gray-300 mb-2">
                <MapPin className="w-4 h-4 mr-2 text-[#C5A880]" />
                <span>{project.location}</span>
              </div>
              {project.totalArea && (
                <div className="flex items-center text-gray-300">
                  <Maximize2 className="w-4 h-4 mr-2 text-[#C5A880]" />
                  <span>{project.totalArea}</span>
                </div>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <p className="text-gray-400 mb-4 line-clamp-3">
              {project.description}
            </p>

            {project.paymentPlan && (
              <div className="mb-6 p-4 bg-white/5 rounded-lg border border-white/10">
                <p className="text-sm text-gray-500 mb-1">Payment Plan</p>
                <p className="text-white font-semibold">{project.paymentPlan}</p>
              </div>
            )}

            {/* View Details Button */}
            <Link
              href={`/pakistan-projects/${project.slug}`}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 py-3 font-semibold text-white transition-all duration-300 hover:border-[#C5A880] hover:bg-[#C5A880] hover:text-black group-hover:shadow-lg group-hover:shadow-[#C5A880]/20"
            >
              View Project Details
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
      </div>
    </motion.div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-black">
      <section className="relative pt-32 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header Skeleton */}
          <div className="text-center mb-12">
            <div className="h-16 w-96 bg-white/5 rounded-lg mx-auto mb-6 animate-pulse" />
            <div className="h-6 w-[600px] bg-white/5 rounded-lg mx-auto animate-pulse" />
          </div>

          {/* Tabs Skeleton */}
          <div className="flex justify-center mb-16">
            <div className="h-14 w-96 bg-white/5 rounded-2xl animate-pulse" />
          </div>

          {/* Grid Skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[1, 2].map((i) => (
              <div key={i} className="rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 overflow-hidden">
                <div className="h-80 bg-white/10 animate-pulse" />
                <div className="p-6 space-y-4">
                  <div className="h-6 bg-white/10 rounded animate-pulse" />
                  <div className="h-4 bg-white/10 rounded w-3/4 animate-pulse" />
                  <div className="h-20 bg-white/10 rounded animate-pulse" />
                  <div className="h-12 bg-white/10 rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
