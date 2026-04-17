'use client';

import { Calendar } from 'lucide-react';
import SafeListingImage from '@/components/shared/SafeListingImage';
import { useInViewOnce } from '@/hooks/useInViewOnce';

export default function ProgressTimeline({ progressUpdates }) {
  if (!progressUpdates || progressUpdates.length === 0) {
    return (
      <div className="py-12 text-center">
        <div className="inline-block rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md">
          <p className="text-lg text-gray-400">Construction updates coming soon...</p>
        </div>
      </div>
    );
  }

  const sortedUpdates = [...progressUpdates].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="relative">
      <div className="absolute bottom-0 left-8 top-0 w-0.5 bg-gradient-to-b from-[#C5A880] via-[#C5A880]/50 to-transparent" />

      <div className="space-y-12">
        {sortedUpdates.map((update, index) => (
          <TimelineItem key={index} update={update} index={index} />
        ))}
      </div>
    </div>
  );
}

function TimelineItem({ update, index }) {
  const [ref, visible] = useInViewOnce({ threshold: 0.08, rootMargin: '-40px 0px' });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <div
      ref={ref}
      className={`relative pl-20 transition-all duration-500 ease-out motion-reduce:translate-x-0 motion-reduce:opacity-100 ${
        visible ? 'translate-x-0 opacity-100' : '-translate-x-6 opacity-0'
      }`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className="absolute left-6 top-6 h-5 w-5 rounded-full border-4 border-black bg-[#C5A880] shadow-lg shadow-[#C5A880]/50" />

      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-all duration-500 hover:border-[#C5A880]/50">
        <div className="mb-4 flex items-center">
          <Calendar className="mr-2 h-5 w-5 text-[#C5A880]" />
          <span className="font-semibold text-[#C5A880]">{formatDate(update.date)}</span>
        </div>

        <h3 className="mb-6 text-2xl font-bold text-white">{update.title}</h3>

        {update.mediaUrls && update.mediaUrls.length > 0 && (
          <div
            className={`grid gap-4 ${
              update.mediaUrls.length === 1
                ? 'grid-cols-1'
                : update.mediaUrls.length === 2
                  ? 'grid-cols-2'
                  : 'grid-cols-2 md:grid-cols-3'
            }`}
          >
            {update.mediaUrls.map((url, mediaIndex) => (
              <div
                key={mediaIndex}
                className="group relative aspect-video cursor-pointer overflow-hidden rounded-lg transition-transform duration-500 hover:scale-[1.01]"
              >
                {url.includes('/video/upload/') ? (
                  <video
                    src={url}
                    controls
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                ) : (
                  <>
                    <SafeListingImage
                      src={url}
                      alt={`${update.title} - Image ${mediaIndex + 1}`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 768px) 50vw, 33vw"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
