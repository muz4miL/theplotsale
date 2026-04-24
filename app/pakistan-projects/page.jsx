'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import ExtraordinaryCta from '@/components/shared/ExtraordinaryCta';
import ProjectListingCard from '@/components/projects/ProjectListingCard';
import FeaturedExxensSpotlight from '@/components/projects/FeaturedExxensSpotlight';
import ProjectFilters from '@/components/projects/ProjectFilters';
import { pickFeaturedFlagshipProject } from '@/lib/featured-flagship';

export default function PakistanProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredProjects, setFilteredProjects] = useState([]);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch('/api/projects', { cache: 'no-store' });
        const data = await response.json();

        if (response.ok && data.success) {
          setProjects(data.data);
          setFilteredProjects(data.data);
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

  const handleFilteredChange = useCallback((filtered) => {
    setFilteredProjects(filtered);
  }, []);

  const featuredProject = pickFeaturedFlagshipProject(projects);
  const gridProjects = filteredProjects.filter(
    (p) => !featuredProject || String(p.slug) !== String(featuredProject.slug)
  );
  const flagshipIsSoleListingInTab =
    Boolean(featuredProject) &&
    filteredProjects.length > 0 &&
    gridProjects.length === 0;

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black">
        <div className="mx-4 max-w-2xl rounded-2xl border border-[#C5A880]/30 bg-white/5 p-8 text-center backdrop-blur-md">
          <p className="text-xs uppercase tracking-[0.3em] text-[#C5A880]">Projects Service Notice</p>
          <p className="mt-4 text-lg text-red-300">Unable to load live projects right now.</p>
          <p className="mt-3 text-sm text-white/70">{error}</p>
          <p className="mt-4 text-xs text-white/50">
            If this is production, verify Vercel environment variables and MongoDB network access.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen min-w-0 overflow-x-hidden bg-[#030706]">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(197,168,128,0.06),transparent)]" />

      {featuredProject ? <FeaturedExxensSpotlight project={featuredProject} /> : null}

      {!featuredProject ? (
        <section className="relative px-5 pb-16 pt-32 sm:px-8 lg:px-10">
          <div className="relative mx-auto max-w-[1200px]">
            <div className="lux-animate-featured-in mb-14 text-center lg:mb-16">
              <p className="mb-5 font-[family-name:var(--font-manrope)] text-[10px] font-medium uppercase tracking-[0.42em] text-[#C5A880]/90">
                Portfolio
              </p>
              <h1 className="font-playfair text-[clamp(2.5rem,6vw,4rem)] font-light leading-[1.05] text-white">
                Pakistan <span className="italic text-[#e8dcc4]">developments</span>
              </h1>
              <p className="mx-auto mt-5 max-w-xl font-[family-name:var(--font-manrope)] text-sm font-light leading-relaxed text-white/50 sm:text-base">
                Master-planned communities and signature builds — curated for international and domestic capital.
              </p>
              <div className="mx-auto mt-8 h-px w-24 bg-gradient-to-r from-transparent via-[#C5A880]/50 to-transparent" />
            </div>
          </div>
        </section>
      ) : null}

      <section
        id="portfolio-grid"
        className={`relative px-5 pb-16 sm:px-8 lg:px-10 ${featuredProject ? 'border-t border-white/[0.05] bg-[#030706] pt-14 sm:pt-16' : ''}`}
      >
        <div className="relative mx-auto max-w-[1200px]">
          {featuredProject ? (
            <div className="lux-animate-featured-in mb-12 text-center lg:mb-14">
              <p className="font-[family-name:var(--font-manrope)] text-[10px] font-medium uppercase tracking-[0.4em] text-[#C5A880]/90">
                Portfolio
              </p>
              <h2 className="mt-3 font-playfair text-[clamp(1.75rem,4vw,2.75rem)] font-light text-white">
                Pakistan <span className="italic text-[#e8dcc4]">developments</span>
              </h2>
              <p className="mx-auto mt-4 max-w-lg font-[family-name:var(--font-manrope)] text-sm font-light text-white/45">
                Continue into the full register — every dossier is investor-grade.
              </p>
            </div>
          ) : null}

          {/* Luxury Filters */}
          <ProjectFilters projects={projects} onFilteredChange={handleFilteredChange} />

          <div className="lux-animate-featured-in">
            {flagshipIsSoleListingInTab ? (
              <div className="py-20 text-center">
                <p className="font-playfair text-xl italic text-white/55">This phase is led by the flagship above.</p>
                <p className="mx-auto mt-3 max-w-md font-[family-name:var(--font-manrope)] text-sm text-white/40">
                  Scroll the scene for the full reveal, or open the dossier directly.
                </p>
                <Link
                  href={`/pakistan-projects/${featuredProject.slug}`}
                  className="mt-8 inline-flex items-center gap-2 font-[family-name:var(--font-manrope)] text-[10px] font-semibold uppercase tracking-[0.28em] text-[#C5A880] underline-offset-4 hover:underline"
                >
                  Open dossier
                </Link>
              </div>
            ) : gridProjects.length === 0 ? (
              <div className="py-24 text-center">
                <p className="font-playfair text-xl italic text-white/50">No projects match your filters.</p>
                <p className="mx-auto mt-3 max-w-md font-[family-name:var(--font-manrope)] text-sm text-white/35">
                  Try adjusting your criteria or contact concierge for off-market opportunities.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-x-10 lg:gap-y-14 lg:[&>*:nth-child(even)]:mt-14">
                {gridProjects.map((project, index) => (
                  <ProjectListingCard key={project._id} project={project} index={index} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
      <ExtraordinaryCta />
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="min-h-screen min-w-0 overflow-x-hidden bg-[#030706]">
      <section className="relative px-5 pb-16 pt-32 sm:px-8">
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-14 text-center">
            <div className="mx-auto mb-5 h-3 w-24 animate-pulse rounded-full bg-white/10" />
            <div className="mx-auto h-12 max-w-md animate-pulse rounded bg-white/10" />
            <div className="mx-auto mt-4 h-4 w-2/3 max-w-lg animate-pulse rounded bg-white/5" />
          </div>
          <div className="mb-14 flex justify-center">
            <div className="h-12 w-72 animate-pulse rounded-full bg-white/10" />
          </div>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
            {[1, 2].map((i) => (
              <div key={i} className="overflow-hidden rounded-[2px] border border-white/10 bg-white/[0.03]">
                <div className="h-[340px] animate-pulse bg-white/10" />
                <div className="space-y-3 p-6">
                  <div className="h-4 w-full animate-pulse rounded bg-white/10" />
                  <div className="h-4 w-4/5 animate-pulse rounded bg-white/5" />
                  <div className="h-10 w-full animate-pulse rounded bg-white/5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
