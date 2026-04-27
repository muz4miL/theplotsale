/**
 * Office location map card component for displaying Google Maps embed
 */

'use client';

export default function OfficeMapCard({ office }) {
  if (!office || !office.mapUrl) return null;

  return (
    <div className="relative overflow-hidden rounded-lg border border-white/10 bg-white/[0.02] backdrop-blur-sm">
      <div className="aspect-[16/10] w-full">
        <iframe
          src={office.mapUrl.replace('?g_st=iwb', '').replace('/maps/', '/maps/embed?pb=')}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={`Map of ${office.city} office`}
          className="h-full w-full"
        />
      </div>
    </div>
  );
}
