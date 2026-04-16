'use client';

import { useRef, useState, useEffect } from 'react';
import { LuxurySkylineGlyph } from '@/components/shared/LuxuryMotionAccents';

const VIDEOS = ['/videos/1.mp4', '/videos/2.mp4', '/videos/3.mp4'];

export default function SimpleMobileHero() {
  const videoRef = useRef(null);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [showTapToPlay, setShowTapToPlay] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Configure video for mobile
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    // Handle when video can play
    const handleCanPlay = () => {
      setIsLoading(false);
      attemptPlay();
    };

    // Handle video errors
    const handleError = (e) => {
      console.error('Video error:', e);
      setHasError(true);
      setIsLoading(false);
    };

    // Handle video end - move to next video
    const handleEnded = () => {
      const nextIndex = (currentVideoIndex + 1) % VIDEOS.length;
      setCurrentVideoIndex(nextIndex);
    };

    // Attempt to play video
    const attemptPlay = async () => {
      if (!video) return;

      try {
        await video.play();
        setShowTapToPlay(false);
      } catch (err) {
        console.log('Autoplay blocked:', err.name);
        if (err.name === 'NotAllowedError') {
          // iOS blocked autoplay - show tap to play
          setShowTapToPlay(true);
        }
      }
    };

    // Handle user tap to play
    const handleUserPlay = async () => {
      if (!video) return;
      
      try {
        video.muted = true;
        await video.play();
        setShowTapToPlay(false);
      } catch (err) {
        console.error('Play failed:', err);
      }
    };

    // Attach event listeners
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('error', handleError);
    video.addEventListener('ended', handleEnded);

    // Handle visibility change (resume when tab becomes visible)
    const handleVisibilityChange = () => {
      if (!document.hidden && video.paused && !showTapToPlay) {
        attemptPlay();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Try to load and play
    video.load();

    // Cleanup
    return () => {
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('error', handleError);
      video.removeEventListener('ended', handleEnded);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [currentVideoIndex, showTapToPlay]);

  // Handle tap to play overlay click
  const handleTapToPlayClick = async () => {
    const video = videoRef.current;
    if (!video) return;

    try {
      video.muted = true;
      await video.play();
      setShowTapToPlay(false);
    } catch (err) {
      console.error('Play failed:', err);
    }
  };

  return (
    <section className="relative w-full overflow-hidden bg-black" style={{ height: '100svh', minHeight: '100vh' }}>
      {/* Video Container */}
      <div className="relative h-[60vh] w-full overflow-hidden">
        {/* Video Element */}
        {!hasError && (
          <video
            ref={videoRef}
            key={currentVideoIndex}
            className="absolute inset-0 w-full h-full object-cover z-10 bg-black"
            muted
            playsInline
            preload="auto"
            style={{
              opacity: isLoading ? 0 : 1,
              transition: 'opacity 0.5s ease-in-out',
            }}
          >
            <source src={VIDEOS[currentVideoIndex]} type="video/mp4" />
          </video>
        )}

        {/* Loading Spinner */}
        {isLoading && !hasError && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/50">
            <div className="flex flex-col items-center gap-3">
              <div className="relative w-12 h-12">
                <div className="absolute inset-0 border-3 border-[#C5A880]/20 rounded-full" />
                <div className="absolute inset-0 border-3 border-transparent border-t-[#C5A880] rounded-full animate-spin" />
              </div>
              <p className="text-[#C5A880]/70 text-xs tracking-[0.2em] uppercase font-[family-name:var(--font-manrope)]">
                Loading
              </p>
            </div>
          </div>
        )}

        {/* Tap to Play Overlay (iOS Autoplay Blocked) */}
        {showTapToPlay && !isLoading && (
          <div
            className="absolute inset-0 z-30 flex items-center justify-center bg-black/40 cursor-pointer"
            onClick={handleTapToPlayClick}
          >
            <div className="flex flex-col items-center gap-3">
              <div className="w-16 h-16 rounded-full bg-[#C5A880]/20 border border-[#C5A880]/40 backdrop-blur-sm flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#C5A880">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <p className="text-white/70 text-xs tracking-[0.2em] uppercase font-[family-name:var(--font-manrope)]">
                Tap to play
              </p>
            </div>
          </div>
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 z-15 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        <div className="pointer-events-none absolute bottom-[5.5rem] right-3 z-[16] opacity-25">
          <LuxurySkylineGlyph className="h-10 w-28" />
        </div>

        {/* Brand Identity Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
          <div className="mb-4">
            <span
              className="text-[10px] tracking-[0.3em] text-white/90 font-sans uppercase font-light"
              style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.8)' }}
            >
              PREMIER REAL ESTATE CONSULTANCY
            </span>
          </div>
          <h1
            className="text-3xl font-serif font-light text-white mb-2"
            style={{ textShadow: '0 4px 16px rgba(0, 0, 0, 0.9)' }}
          >
            Cultivating Futures
          </h1>
          <p
            className="text-xl italic font-serif text-[#C5A880] font-light"
            style={{ textShadow: '0 4px 16px rgba(0, 0, 0, 0.9)' }}
          >
            We are not just building homes. We are shaping dreams into addresses.
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 py-24 bg-[#0A0A0A]">
        <div className="w-full max-w-md text-center">
          <div
            className="h-[1px] w-24 mb-6 mx-auto"
            style={{ background: 'linear-gradient(to right, #C5A880, rgba(197, 168, 128, 0.3))' }}
          />
          <div className="mb-4">
            <span className="text-xs tracking-[0.25em] font-sans uppercase font-light text-[#C5A880]">
              LONDON • LAHORE
            </span>
          </div>
          <div className="mb-8">
            <h2
              className="text-3xl font-light font-serif mb-2"
              style={{ color: '#F2F4F6', textShadow: '0 4px 20px rgba(0,0,0,0.5)' }}
            >
              Aspirations into
            </h2>
            <h2
              className="text-3xl italic font-light font-serif"
              style={{ color: '#C5A880', textShadow: '0 4px 20px rgba(0,0,0,0.5)' }}
            >
              Foundations
            </h2>
          </div>
          <p
            className="font-light font-sans"
            style={{ color: 'rgba(242, 244, 246, 0.8)', lineHeight: '1.8' }}
          >
            At ThePlotSale, we are committed to delivering real estate solutions marked by transparency and
            integrity, bridging developers and homeowners in a trusted partnership. We envision a sustainable
            future where every property is not just an asset, but a space people are proud to call home.
          </p>
        </div>
      </div>
    </section>
  );
}
