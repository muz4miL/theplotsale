'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MapPin, Maximize2, ArrowLeft, FileText } from 'lucide-react';
import ProgressTimeline from '@/components/projects/ProgressTimeline';
import ListingLogo from '@/components/ListingLogo';

export default function ProjectDetailPage() {
  const params = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProject() {
      try {
        const response = await fetch('/api/projects', { cache: 'no-store' });
        const data = await response.json();
        
        if (data.success) {
          const foundProject = data.data.find(p => p.slug === params.slug);
          if (foundProject) {
            setProject(foundProject);
          } else {
            setError('Project not found');
          }
        } else {
          setError('Failed to load project');
        }
      } catch (err) {
        setError('An error occurred');
        console.error('Error fetching project:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchProject();
  }, [params.slug]);

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 text-lg mb-4">{error || 'Project not found'}</p>
          <Link href="/pakistan-projects" className="text-[#C5A880] hover:underline">
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

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

  const galleryMedia = project.galleryMedia || [];
  const imageGallery = galleryMedia.filter((url) => !url.includes('/video/upload/'));
  const videoGallery = galleryMedia.filter((url) => url.includes('/video/upload/'));

  return (
    <div className="min-h-screen bg-black">
      {/* Back Button */}
      <div className="fixed top-24 left-6 z-40">
        <Link href="/pakistan-projects">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 hover:bg-white/20 transition-all"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
            <span className="text-white font-semibold">Back</span>
          </motion.button>
        </Link>
      </div>

      {/* Hero Image */}
      <section className="relative h-screen">
        <Image
          src={project.mainImage || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop'}
          alt={project.title}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        
        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 p-12">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className={`inline-block px-6 py-3 rounded-full border backdrop-blur-md mb-6 ${getStatusColor(project.status)}`}>
                <span className="font-bold text-lg">{project.status}</span>
              </div>
              <div className="mb-6">
                <ListingLogo src={project.primaryLogo} name={project.title} className="h-16 w-16" imageClassName="p-2" />
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
                {project.title}
              </h1>
              <div className="flex flex-wrap items-center gap-6 text-xl text-gray-300">
                <div className="flex items-center">
                  <MapPin className="w-6 h-6 mr-2 text-[#C5A880]" />
                  {project.location}
                </div>
                {project.totalArea && (
                  <div className="flex items-center">
                    <Maximize2 className="w-6 h-6 mr-2 text-[#C5A880]" />
                    {project.totalArea}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-8 mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-6">About This Project</h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              {project.description || 'Project details will be updated soon.'}
            </p>
          </motion.div>

          {/* Payment Plan */}
          {project.paymentPlan && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-8 mb-12"
            >
              <div className="flex items-center mb-4">
                <FileText className="w-8 h-8 text-[#C5A880] mr-3" />
                <h2 className="text-3xl font-bold text-white">Payment Plan</h2>
              </div>
              <p className="text-gray-300 text-lg">{project.paymentPlan}</p>
            </motion.div>
          )}

          {/* Development Progress Timeline */}
          {project.progressUpdates && project.progressUpdates.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-8"
            >
              <h2 className="text-3xl font-bold text-white mb-8">Development Progress</h2>
              <ProgressTimeline progressUpdates={project.progressUpdates} />
            </motion.div>
          )}

          {(imageGallery.length > 0 || videoGallery.length > 0) && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-12 rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md"
            >
              <h2 className="mb-6 text-3xl font-bold text-white">Project Gallery</h2>

              {imageGallery.length > 0 && (
                <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
                  {imageGallery.map((url) => (
                    <div key={url} className="relative h-44 overflow-hidden rounded-xl border border-white/10">
                      <Image src={url} alt={project.title} fill className="object-cover" sizes="33vw" />
                    </div>
                  ))}
                </div>
              )}

              {videoGallery.length > 0 && (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {videoGallery.map((url) => (
                    <video
                      key={url}
                      src={url}
                      controls
                      className="h-64 w-full rounded-xl border border-white/10 bg-black/40 object-cover"
                    />
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {!!project.floatingLogos?.length && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-12 rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md"
            >
              <h2 className="mb-6 text-3xl font-bold text-white">Brand Partners</h2>
              <div className="flex flex-wrap gap-4">
                {project.floatingLogos.map((logoUrl) => (
                  <ListingLogo key={logoUrl} src={logoUrl} name={project.title} className="h-14 w-14" />
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-black">
      <div className="h-screen bg-white/5 animate-pulse" />
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="h-60 bg-white/5 rounded-2xl animate-pulse mb-12" />
        <div className="h-40 bg-white/5 rounded-2xl animate-pulse mb-12" />
        <div className="h-96 bg-white/5 rounded-2xl animate-pulse" />
      </div>
    </div>
  );
}
