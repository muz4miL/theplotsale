import connectDB from '@/lib/mongodb';
import Project from '@/models/Project';
import Link from 'next/link';
import { MapPin, Maximize2, ArrowLeft, FileText } from 'lucide-react';
import ProgressTimeline from '@/components/projects/ProgressTimeline';
import ListingLogo from '@/components/ListingLogo';
import ProjectLuxuryShowcase from '@/components/projects/ProjectLuxuryShowcase';
import LuxuryVideoPlayer from '@/components/projects/LuxuryVideoPlayer';
import LuxuryPaymentPlan from '@/components/projects/LuxuryPaymentPlan';

export const dynamic = 'force-dynamic';

async function getProjectBySlug(slug) {
  await connectDB();
  return Project.findOne({ slug: slug.toLowerCase() }).lean();
}

export default async function ProjectDetailPage({ params }) {
  const { slug } = await params;
  const normalizedSlug = typeof slug === 'string' ? slug : '';

  if (!normalizedSlug) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 text-lg mb-4">Project not found</p>
          <Link href="/pakistan-projects" className="text-[#C5A880] hover:underline">
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  let project = null;
  try {
    const doc = await getProjectBySlug(normalizedSlug);
    project = doc ? JSON.parse(JSON.stringify(doc)) : null;
  } catch (error) {
    console.error('Error fetching project:', error);
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 text-lg mb-4">Project not found</p>
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

  const galleryMedia = Array.isArray(project.galleryMedia) ? project.galleryMedia : [];
  const videoGallery = galleryMedia.filter((url) => typeof url === 'string' && url.includes('/video/upload/'));
  const progressUpdates = Array.isArray(project.progressUpdates) ? project.progressUpdates : [];
  const floatingLogos = Array.isArray(project.floatingLogos) ? project.floatingLogos : [];

  return (
    <div className="min-h-screen bg-black">
      {/* Back Button */}
      <div className="fixed top-24 left-6 z-[100] lg:hidden">
        <Link
          href="/pakistan-projects"
          className="inline-flex items-center space-x-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-md transition-all hover:bg-white/20"
        >
          <ArrowLeft className="h-5 w-5 text-white" />
          <span className="font-semibold text-white">Back</span>
        </Link>
      </div>

      <ProjectLuxuryShowcase project={project} />

      {/* Status + meta strip (below flagship showcase) */}
      <section className="border-b border-white/10 bg-black px-6 py-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
          <div className={`inline-flex w-fit items-center gap-2 rounded-full border px-4 py-2 backdrop-blur-md ${getStatusColor(project.status)}`}>
            <span className="text-sm font-bold">{project.status}</span>
          </div>
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-300 sm:text-base">
            <div className="flex items-center">
              <MapPin className="mr-2 h-5 w-5 shrink-0 text-[#C5A880]" />
              {project.location}
            </div>
            {project.totalArea ? (
              <div className="flex items-center">
                <Maximize2 className="mr-2 h-5 w-5 shrink-0 text-[#C5A880]" />
                {project.totalArea}
              </div>
            ) : null}
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Description */}
          <div className="mb-12 rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md">
            <h2 className="text-3xl font-bold text-white mb-6">About This Project</h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              {project.description || 'Project details will be updated soon.'}
            </p>
          </div>

          {/* Payment Plan */}
          {project.paymentPlanStructure && (
            <div className="mb-12">
              <LuxuryPaymentPlan paymentPlan={project.paymentPlanStructure} />
            </div>
          )}

          {/* Legacy Payment Plan Text (fallback) */}
          {!project.paymentPlanStructure && project.paymentPlan && (
            <div className="mb-12 rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md">
              <div className="flex items-center mb-4">
                <FileText className="w-8 h-8 text-[#C5A880] mr-3" />
                <h2 className="text-3xl font-bold text-white">Payment Plan</h2>
              </div>
              <p className="text-gray-300 text-lg">{project.paymentPlan}</p>
            </div>
          )}

          {/* Development Progress Timeline */}
          {progressUpdates.length > 0 && (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md">
              <h2 className="text-3xl font-bold text-white mb-8">Development Progress</h2>
              <ProgressTimeline progressUpdates={progressUpdates} />
            </div>
          )}

          {videoGallery.length > 0 && (
            <div className="mt-12 rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-6 backdrop-blur-xl sm:p-8 lg:p-10">
              <div className="mb-8 border-b border-white/[0.06] pb-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="h-px w-8 bg-gradient-to-r from-[#C5A880] to-transparent" />
                  <p className="font-[family-name:var(--font-manrope)] text-[10px] font-medium uppercase tracking-[0.35em] text-[#C5A880]/90">
                    Cinematic
                  </p>
                </div>
                <h2 className="font-playfair text-3xl font-light text-white sm:text-4xl">
                  Project <span className="italic text-[#e8dcc4]">film</span>
                </h2>
                <p className="mt-3 font-[family-name:var(--font-manrope)] text-sm font-light text-white/45 sm:text-base">
                  Aerial walkthroughs and drone reels capturing the development&rsquo;s scale and setting.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:gap-6">
                {videoGallery.map((url, index) => (
                  <LuxuryVideoPlayer key={url} src={url} index={index} />
                ))}
              </div>
            </div>
          )}

          {!!floatingLogos.length && (
            <div className="mt-12 rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md">
              <h2 className="mb-6 text-3xl font-bold text-white">Brand Partners</h2>
              <div className="flex flex-wrap gap-4">
                {floatingLogos.map((logoUrl) => (
                  <ListingLogo key={logoUrl} src={logoUrl} name={project.title} className="h-14 w-14" />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
