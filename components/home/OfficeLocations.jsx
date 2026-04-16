'use client';

const officeLocations = [
  {
    city: 'Lahore Office',
    region: 'Pakistan',
    address: 'DHA Phase 6, Main Boulevard, Lahore',
    mapsQuery: 'DHA Phase 6 Main Boulevard Lahore Pakistan',
  },
  {
    city: 'Peshawar Office',
    region: 'Pakistan',
    address: 'Deans Trade Center, Peshawar Cantt',
    mapsQuery: 'Deans Trade Center Peshawar Cantt Pakistan',
  },
  {
    city: 'UK Desk',
    region: 'United Kingdom',
    address: 'London Service Area (By Appointment)',
    mapsQuery: 'London United Kingdom',
  },
];

function mapEmbedUrl(query) {
  return `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
}

function mapOpenUrl(query) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export default function OfficeLocations() {
  return (
    <section className="relative overflow-hidden bg-[#050708] pb-[max(5rem,env(safe-area-inset-bottom,0px))] pl-[max(1rem,env(safe-area-inset-left,0px))] pr-[max(1rem,env(safe-area-inset-right,0px))] pt-14 md:pb-24 md:pl-8 md:pr-8 md:pt-20">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-60 w-[65rem] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,_rgba(197,168,128,0.12),_transparent_65%)]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-10 text-center md:mb-14">
          <p className="text-[10px] uppercase tracking-[0.45em] text-[#C5A880]">Global Presence</p>
          <h3 className="mt-4 font-serif text-3xl font-light text-white md:text-5xl">
            Visit Our <span className="italic text-[#C5A880]">Office Network</span>
          </h3>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-white/60 md:text-base">
            Strategic presence across Pakistan and the UK to support premium property advisory.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {officeLocations.map((office) => (
            <article
              key={office.city}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-[#C5A880]/40"
            >
              <div className="relative h-56 overflow-hidden border-b border-white/10">
                <iframe
                  title={`${office.city} map`}
                  src={mapEmbedUrl(office.mapsQuery)}
                  className="h-full w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              </div>

              <div className="p-6">
                <p className="text-[10px] uppercase tracking-[0.3em] text-[#C5A880]">{office.region}</p>
                <h4 className="mt-2 font-serif text-2xl font-light text-white">{office.city}</h4>
                <p className="mt-3 text-sm leading-relaxed text-white/70">{office.address}</p>

                <a
                  href={mapOpenUrl(office.mapsQuery)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-[#C5A880] transition-colors duration-300 hover:text-[#e3caa4]"
                >
                  Open in Google Maps
                  <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
