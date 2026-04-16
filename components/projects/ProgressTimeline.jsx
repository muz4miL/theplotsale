'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Calendar } from 'lucide-react';

export default function ProgressTimeline({ progressUpdates }) {
  if (!progressUpdates || progressUpdates.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="inline-block p-8 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10">
          <p className="text-gray-400 text-lg">Construction updates coming soon...</p>
        </div>
      </div>
    );
  }

  // Sort updates by date (most recent first)
  const sortedUpdates = [...progressUpdates].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="relative">
      {/* Timeline Line */}
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#C5A880] via-[#C5A880]/50 to-transparent" />

      {/* Timeline Items */}
      <div className="space-y-12">
        {sortedUpdates.map((update, index) => (
          <TimelineItem key={index} update={update} index={index} />
        ))}
      </div>
    </div>
  );
}

function TimelineItem({ update, index }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative pl-20"
    >
      {/* Timeline Dot */}
      <div className="absolute left-6 top-6 w-5 h-5 rounded-full bg-[#C5A880] border-4 border-black shadow-lg shadow-[#C5A880]/50" />

      {/* Content Card */}
      <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-6 hover:border-[#C5A880]/50 transition-all duration-500">
        {/* Date */}
        <div className="flex items-center mb-4">
          <Calendar className="w-5 h-5 text-[#C5A880] mr-2" />
          <span className="text-[#C5A880] font-semibold">{formatDate(update.date)}</span>
        </div>

        {/* Title */}
        <h3 className="text-2xl font-bold text-white mb-6">{update.title}</h3>

        {/* Media Grid */}
        {update.mediaUrls && update.mediaUrls.length > 0 && (
          <div className={`grid gap-4 ${
            update.mediaUrls.length === 1 
              ? 'grid-cols-1' 
              : update.mediaUrls.length === 2 
              ? 'grid-cols-2' 
              : 'grid-cols-2 md:grid-cols-3'
          }`}>
            {update.mediaUrls.map((url, mediaIndex) => (
              <motion.div
                key={mediaIndex}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: mediaIndex * 0.1 }}
                className="relative aspect-video rounded-lg overflow-hidden group cursor-pointer"
              >
                {url.includes('/video/upload/') ? (
                  <video
                    src={url}
                    controls
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                ) : (
                  <>
                    <Image
                      src={url}
                      alt={`${update.title} - Image ${mediaIndex + 1}`}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 768px) 50vw, 33vw"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                  </>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
