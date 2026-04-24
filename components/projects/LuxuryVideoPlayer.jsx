'use client';

import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Maximize2, Volume2, VolumeX } from 'lucide-react';

/**
 * LuxuryVideoPlayer — Awwwards-grade video player for project drone footage
 * 
 * Features:
 * - Custom luxury controls with gold accents
 * - Elegant play/pause overlay
 * - Hover-reveal controls with smooth transitions
 * - Muted autoplay on viewport entry
 * - Progress bar with gold styling
 * - Fullscreen support
 * - Respects prefers-reduced-motion
 */

export default function LuxuryVideoPlayer({ src, poster, index = 0 }) {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isInView, setIsInView] = useState(false);
  const hideControlsTimeout = useRef(null);

  // Intersection Observer for autoplay on scroll
  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
        if (entry.isIntersecting && !isPlaying) {
          // Autoplay muted when in view
          video.play().catch(() => {
            // Autoplay blocked - user needs to interact
          });
          setIsPlaying(true);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [isPlaying]);

  // Update progress
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateProgress = () => {
      const percent = (video.currentTime / video.duration) * 100;
      setProgress(percent || 0);
    };

    video.addEventListener('timeupdate', updateProgress);
    return () => video.removeEventListener('timeupdate', updateProgress);
  }, []);

  // Auto-hide controls after 3 seconds of no interaction
  useEffect(() => {
    if (isHovered || !isPlaying) {
      setShowControls(true);
      if (hideControlsTimeout.current) {
        clearTimeout(hideControlsTimeout.current);
      }
    } else {
      hideControlsTimeout.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }

    return () => {
      if (hideControlsTimeout.current) {
        clearTimeout(hideControlsTimeout.current);
      }
    };
  }, [isHovered, isPlaying]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const toggleFullscreen = () => {
    const container = containerRef.current;
    if (!container) return;

    if (!document.fullscreenElement) {
      container.requestFullscreen().catch(() => {
        // Fullscreen not supported or denied
      });
    } else {
      document.exitFullscreen();
    }
  };

  const handleProgressClick = (e) => {
    const video = videoRef.current;
    const progressBar = e.currentTarget;
    if (!video || !progressBar) return;

    const rect = progressBar.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    video.currentTime = percent * video.duration;
  };

  return (
    <div
      ref={containerRef}
      className="group relative overflow-hidden rounded-xl border border-white/[0.08] bg-black/40 backdrop-blur-sm transition-all duration-500 hover:border-[#C5A880]/30"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        animation: `luxuryVideoFadeIn 0.8s cubic-bezier(0.22,1,0.36,1) ${index * 150}ms both`,
      }}
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        playsInline
        muted={isMuted}
        loop
        className="h-64 w-full object-cover transition-transform duration-700 group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        onClick={togglePlay}
      />

      {/* Gradient Overlays */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 transition-opacity duration-500 group-hover:from-black/40" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#C5A880]/0 via-transparent to-[#C5A880]/5 opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

      {/* Center Play/Pause Button */}
      <button
        onClick={togglePlay}
        className={`absolute left-1/2 top-1/2 z-10 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-[#C5A880]/60 bg-black/50 text-[#C5A880] backdrop-blur-md transition-all duration-500 hover:scale-110 hover:border-[#C5A880] hover:bg-[#C5A880]/20 hover:shadow-[0_0_40px_rgba(197,168,128,0.3)] active:scale-95 ${
          isPlaying && !isHovered ? 'opacity-0' : 'opacity-100'
        }`}
        aria-label={isPlaying ? 'Pause video' : 'Play video'}
      >
        {isPlaying ? (
          <Pause className="h-7 w-7 fill-current" strokeWidth={0} />
        ) : (
          <Play className="h-7 w-7 translate-x-0.5 fill-current" strokeWidth={0} />
        )}
      </button>

      {/* Bottom Controls Bar */}
      <div
        className={`absolute bottom-0 left-0 right-0 z-20 transition-all duration-500 ${
          showControls || !isPlaying ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
        }`}
      >
        {/* Progress Bar */}
        <div
          className="group/progress relative h-1 w-full cursor-pointer bg-white/10 transition-all duration-300 hover:h-1.5"
          onClick={handleProgressClick}
        >
          <div
            className="absolute left-0 top-0 h-full bg-gradient-to-r from-[#C5A880] to-[#e8dcc4] transition-all duration-150"
            style={{ width: `${progress}%` }}
          />
          <div
            className="absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-[#C5A880] opacity-0 shadow-[0_0_12px_rgba(197,168,128,0.6)] transition-all duration-300 group-hover/progress:opacity-100"
            style={{ left: `${progress}%`, transform: `translate(-50%, -50%)` }}
          />
        </div>

        {/* Control Buttons */}
        <div className="flex items-center justify-between gap-2 bg-gradient-to-t from-black/90 via-black/80 to-transparent px-4 py-3 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <button
              onClick={togglePlay}
              className="flex h-8 w-8 items-center justify-center rounded-full text-white/80 transition-all duration-300 hover:bg-white/10 hover:text-[#C5A880]"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <Pause className="h-4 w-4 fill-current" strokeWidth={0} />
              ) : (
                <Play className="h-4 w-4 translate-x-0.5 fill-current" strokeWidth={0} />
              )}
            </button>

            <button
              onClick={toggleMute}
              className="flex h-8 w-8 items-center justify-center rounded-full text-white/80 transition-all duration-300 hover:bg-white/10 hover:text-[#C5A880]"
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? (
                <VolumeX className="h-4 w-4" strokeWidth={1.5} />
              ) : (
                <Volume2 className="h-4 w-4" strokeWidth={1.5} />
              )}
            </button>
          </div>

          <button
            onClick={toggleFullscreen}
            className="flex h-8 w-8 items-center justify-center rounded-full text-white/80 transition-all duration-300 hover:bg-white/10 hover:text-[#C5A880]"
            aria-label="Fullscreen"
          >
            <Maximize2 className="h-4 w-4" strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* Film grain texture overlay */}
      <div className="pointer-events-none absolute inset-0 z-[1] opacity-[0.08] mix-blend-overlay">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='a'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23a)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Keyframes */}
      <style jsx>{`
        @keyframes luxuryVideoFadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          @keyframes luxuryVideoFadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
        }
      `}</style>
    </div>
  );
}
