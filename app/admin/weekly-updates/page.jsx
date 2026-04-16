/* eslint-disable @next/next/no-img-element */
'use client';

import { useEffect, useState } from 'react';
import { Clock3, Film, PlayCircle } from 'lucide-react';
import AddProgressForm from '@/components/admin/AddProgressForm';
import { LISTING_IMAGE_FALLBACK, resolveListingImageSrc } from '@/lib/listing-images';

export default function WeeklyUpdatesPage() {
  const [recentUploads, setRecentUploads] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchRecentUploads() {
    try {
      setIsLoading(true);
      const res = await fetch('/api/projects', { cache: 'no-store' });
      const data = await res.json();
      if (!res.ok || !data.success) return;

      const flattened = (data.data || [])
        .flatMap((project) =>
          (project.progressUpdates || []).map((update) => ({
            title: update.title,
            project: project.title,
            date: update.date,
            mediaUrls: update.mediaUrls || [],
          }))
        )
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 6);

      setRecentUploads(flattened);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchRecentUploads();
  }, []);

  return (
    <div className="space-y-8">
      <header className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.03] p-6 backdrop-blur-md">
        <p className="text-xs uppercase tracking-[0.35em] text-[#C5A880]">Media Command</p>
        <h1 className="mt-2 text-3xl font-semibold text-white">Weekly Updates Hub</h1>
        <p className="mt-2 text-sm text-neutral-400">
          Centralize bi-weekly construction uploads, project storytelling, and investor-ready media.
        </p>
      </header>

      <AddProgressForm onSuccess={fetchRecentUploads} />

      <section className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-black/20 p-6 backdrop-blur-md md:p-8">
        <div className="mb-6 flex items-center justify-between gap-4">
          <h2 className="text-xl font-semibold text-white">Recent Uploads</h2>
          <span className="inline-flex items-center gap-2 rounded-lg border border-[#C5A880]/40 bg-[#C5A880]/10 px-3 py-1 text-xs font-medium text-[#C5A880]">
            <Film className="h-4 w-4" />
            Latest Media Queue
          </span>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {isLoading ? (
            <p className="text-sm text-neutral-400">Loading recent uploads...</p>
          ) : null}
          {!isLoading && recentUploads.length === 0 ? (
            <p className="text-sm text-neutral-400">
              No uploads yet. Use the form above to publish your first weekly update.
            </p>
          ) : null}
          {recentUploads.map((item) => (
            <article
              key={`${item.project}-${item.title}-${item.date}`}
              className="overflow-hidden rounded-2xl border border-white/10 bg-black/25 transition-all hover:-translate-y-0.5 hover:border-[#C5A880]/35"
            >
              <div className="relative">
                <img
                  src={resolveListingImageSrc(item.mediaUrls[0], LISTING_IMAGE_FALLBACK)}
                  alt={item.title}
                  className="h-44 w-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = LISTING_IMAGE_FALLBACK;
                  }}
                />
                <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-md border border-white/20 bg-black/60 px-2 py-1 text-xs text-white">
                  <Clock3 className="h-3.5 w-3.5" />
                  Recent
                </span>
              </div>

              <div className="space-y-2 p-4">
                <p className="text-sm font-semibold text-white">{item.title}</p>
                <p className="text-xs uppercase tracking-[0.2em] text-[#C5A880]">{item.project}</p>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-neutral-400">{new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}</p>
                  <button
                    type="button"
                    className="inline-flex items-center gap-1 rounded-lg border border-white/15 bg-black/30 px-2.5 py-1.5 text-xs text-neutral-200 transition-colors hover:border-[#C5A880]/60 hover:text-[#C5A880]"
                  >
                    <PlayCircle className="h-3.5 w-3.5" />
                    Preview
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
