'use client';

import { Star } from 'lucide-react';

// Pre-defined star positions and animation durations to avoid hydration mismatch
const starPositions = [
  { left: 5, top: 12, duration: 5.2 }, { left: 15, top: 8, duration: 4.8 }, { left: 25, top: 22, duration: 6.3 },
  { left: 35, top: 5, duration: 3.7 }, { left: 45, top: 18, duration: 5.9 }, { left: 55, top: 3, duration: 4.1 },
  { left: 65, top: 25, duration: 6.7 }, { left: 75, top: 10, duration: 5.4 }, { left: 85, top: 20, duration: 3.9 },
  { left: 95, top: 7, duration: 4.6 }, { left: 10, top: 35, duration: 6.1 }, { left: 20, top: 42, duration: 5.8 },
  { left: 30, top: 30, duration: 4.3 }, { left: 40, top: 48, duration: 6.5 }, { left: 50, top: 38, duration: 3.5 },
  { left: 60, top: 45, duration: 5.1 }, { left: 70, top: 32, duration: 4.9 }, { left: 80, top: 50, duration: 6.8 },
  { left: 90, top: 40, duration: 5.6 }, { left: 3, top: 55, duration: 3.3 }, { left: 12, top: 62, duration: 4.4 },
  { left: 22, top: 58, duration: 6.2 }, { left: 32, top: 68, duration: 5.7 }, { left: 42, top: 52, duration: 3.8 },
  { left: 52, top: 72, duration: 4.7 }, { left: 62, top: 60, duration: 6.4 }, { left: 72, top: 78, duration: 5.3 },
  { left: 82, top: 65, duration: 3.6 }, { left: 92, top: 70, duration: 4.5 }, { left: 8, top: 82, duration: 6.9 },
  { left: 18, top: 88, duration: 5.5 }, { left: 28, top: 75, duration: 3.4 }, { left: 38, top: 92, duration: 4.2 },
  { left: 48, top: 85, duration: 6.6 }, { left: 58, top: 95, duration: 5.0 }, { left: 68, top: 80, duration: 3.2 },
  { left: 78, top: 90, duration: 4.0 }, { left: 88, top: 77, duration: 6.0 }, { left: 98, top: 88, duration: 5.2 },
  { left: 2, top: 15, duration: 4.8 }, { left: 97, top: 28, duration: 6.3 }, { left: 7, top: 47, duration: 3.7 },
  { left: 93, top: 55, duration: 5.9 }, { left: 17, top: 73, duration: 4.1 }, { left: 87, top: 33, duration: 6.7 },
  { left: 27, top: 95, duration: 5.4 }, { left: 77, top: 4, duration: 3.9 }, { left: 47, top: 67, duration: 4.6 },
  { left: 67, top: 15, duration: 6.1 },
];

export default function OpenSky() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted');
  };

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center px-4 py-16 overflow-hidden bg-[#020508] -mt-2">

      {/* 1. SEAMLESS FLOW GRADIENT - Deep Push Technique */}
      {/* Solid green for first 250px (covers seam completely), then slow imperceptible fade to space black */}
      <div
        className="absolute top-0 left-0 right-0 z-10 pointer-events-none h-[90vh]"
        style={{
          background: 'linear-gradient(to bottom, #0A0A0A 0%, #0A0A0A 250px, #020508 100%)'
        }}
      />

      {/* 2. ATMOSPHERIC BACKGROUND (The "Nebula" Glow) */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1a2e35]/20 via-[#020508] to-[#020508]" />
      </div>

      {/* 3. PREMIUM STAR FIELD */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {starPositions.map((pos, i) => {
          // Varied star sizes and opacities for depth
          const size = i % 3 === 0 ? 'w-[2px] h-[2px]' : 'w-[1px] h-[1px]';
          const opacity = i % 2 === 0 ? 'opacity-40' : 'opacity-80';
          const animation = i % 5 === 0 ? 'animate-pulse' : '';

          return (
            <div
              key={i}
              className={`absolute bg-white rounded-full ${size} ${opacity} ${animation}`}
              style={{
                left: `${pos.left}%`,
                top: `${pos.top}%`,
                // Occasional "Glow" effect on random stars
                boxShadow: i % 15 === 0 ? '0 0 10px 2px rgba(255, 255, 255, 0.4)' : 'none',
                animationDuration: `${pos.duration}s`
              }}
            />
          );
        })}
        {/* Shooting Star */}
        <div className="absolute top-1/3 left-[10%] w-[200px] h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 animate-[shoot_8s_ease-in-out_infinite]" />
      </div>

      {/* 4. THE VIP INVITATION CARD */}
      <div className="relative z-20 w-full max-w-lg mx-auto">
        <div className="relative bg-[#050A08]/60 backdrop-blur-xl border border-white/10 rounded-3xl px-8 py-10 md:px-10 md:py-12 text-center shadow-[0_0_50px_rgba(0,0,0,0.5),inset_0_0_20px_rgba(255,255,255,0.02)]">

          {/* Bronze Accent Line */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-[1px] bg-gradient-to-r from-transparent via-[#C5A880] to-transparent" />

          {/* Label */}
          <div className="inline-flex items-center gap-2 mb-4">
            <Star className="w-3 h-3 text-[#C5A880]" />
            <span className="text-[#C5A880] text-[9px] tracking-[0.35em] uppercase font-medium">Concierge Service</span>
            <Star className="w-3 h-3 text-[#C5A880]" />
          </div>

          {/* Elegant Typography */}
          <h2 className="text-3xl md:text-4xl text-white font-playfair font-light leading-tight mb-3">
            Begin Your <br />
            <span className="italic text-[#C5A880] opacity-90">Journey</span>
          </h2>

          {/* Subtle Description */}
          <p className="text-white/50 text-xs md:text-sm font-light leading-relaxed mb-8">
            Leave us a message. Our team will contact you shortly.
          </p>

          {/* Ghost Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-5 text-left">

            {/* Name Field */}
            <div>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                required
                className="w-full bg-transparent border-0 border-b border-white/10 focus:border-[#C5A880] text-white/80 placeholder:text-white/20 px-0 py-2.5 outline-none transition-all duration-500 text-sm font-light tracking-wide"
              />
            </div>

            {/* Email and Phone Row */}
            <div className="grid grid-cols-2 gap-4">
              {/* Email */}
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  className="w-full bg-transparent border-0 border-b border-white/10 focus:border-[#C5A880] text-white/80 placeholder:text-white/20 px-0 py-2.5 outline-none transition-all duration-500 text-sm font-light tracking-wide"
                />
              </div>

              {/* Phone */}
              <div>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone"
                  required
                  className="w-full bg-transparent border-0 border-b border-white/10 focus:border-[#C5A880] text-white/80 placeholder:text-white/20 px-0 py-2.5 outline-none transition-all duration-500 text-sm font-light tracking-wide"
                />
              </div>
            </div>

            {/* Message Field */}
            <div>
              <textarea
                name="message"
                placeholder="Your Message"
                rows="3"
                required
                className="w-full bg-transparent border-0 border-b border-white/10 focus:border-[#C5A880] text-white/80 placeholder:text-white/20 px-0 py-2.5 outline-none transition-all duration-500 resize-none text-sm font-light tracking-wide"
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="text-center pt-3">
              <button
                type="submit"
                className="group relative px-8 py-3 bg-[#C5A880]/10 hover:bg-[#C5A880]/20 border border-[#C5A880]/30 rounded-sm transition-all duration-500 overflow-hidden"
              >
                <span className="relative text-[#C5A880] text-[10px] tracking-[0.25em] uppercase font-semibold group-hover:text-white transition-colors z-10">
                  Send Inquiry
                </span>
                <div className="absolute inset-0 bg-[#C5A880] opacity-0 group-hover:opacity-10 transition-opacity duration-500 z-0" />
              </button>
            </div>
          </form>

        </div>
      </div>
    </section>
  );
}
