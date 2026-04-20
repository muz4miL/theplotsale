'use client';

import { useEffect, useLayoutEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LuxurySkylineGlyph } from '@/components/shared/LuxuryMotionAccents';

const HERO_VIDEOS = ['/videos/1.mp4', '/videos/2.mp4', '/videos/3.mp4'];
const HERO_POSTER = '/lifestyle-hero.png';

const SLIDE_CONTENT = [
  {
    title: 'Cultivating Futures',
    subtitle: 'We are not just building homes. We are shaping dreams into addresses.',
    location: 'LONDON • LAHORE',
    cta: 'DISCOVER OUR CANVAS',
  },
  {
    title: 'Aspirations into',
    subtitle: 'At ThePlotSale, we bridge developers and homeowners in trusted partnership.',
    location: 'PREMIER CONSULTANCY',
    cta: 'EXPLORE PROPERTIES',
  },
  {
    title: 'Foundations',
    subtitle: 'Every property is not just an asset, but a space people are proud to call home.',
    location: 'SUSTAINABLE FUTURE',
    cta: 'MEET OUR TEAM',
  },
];

export default function MobileHeroVideo() {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const overlayRef = useRef(null);
  const contentRefs = useRef({});
  const slideIndicatorsRef = useRef([]);
  
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPlayButton, setShowPlayButton] = useState(true);
  
  // Touch handling
  const touchStartY = useRef(0);
  const touchEndY = useRef(0);

  const goToSlide = useCallback((index) => {
    if (isTransitioning || index === currentSlide) return;
    setIsTransitioning(true);

    const video = videoRef.current;
    if (!video) return;

    const tl = gsap.timeline({
      onComplete: () => {
        setCurrentSlide(index);
        setIsTransitioning(false);
        
        // Change video source
        video.src = HERO_VIDEOS[index];
        video.currentTime = 0;
        video.load();
        
        // Try to play the new video
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.then(() => {
            setIsPlaying(true);
            setShowPlayButton(false);
          }).catch((err) => {
            console.log('Video play failed:', err.name);
            setShowPlayButton(true);
          });
        }
      },
    });

    tl.to(overlayRef.current, { opacity: 0, duration: 0.3, ease: 'power2.in' }, 0);
    
    Object.values(contentRefs.current).forEach((el) => {
      if (el) tl.to(el, { y: -20, opacity: 0, duration: 0.25, stagger: 0.05 }, 0);
    });

    slideIndicatorsRef.current.forEach((dot, i) => {
      if (dot) {
        gsap.to(dot, {
          backgroundColor: i === index ? '#C5A880' : 'rgba(255,255,255,0.3)',
          width: i === index ? '24px' : '8px',
          duration: 0.3,
          ease: 'power2.out',
        });
      }
    });

    tl.to(overlayRef.current, { opacity: 1, duration: 0.4, delay: 0.1 }, '+=0.1');
    Object.entries(contentRefs.current).forEach(([key, el], i) => {
      if (el) {
        tl.fromTo(
          el,
          { y: 15, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' },
          `+=${i * 0.05}`
        );
      }
    });

  }, [currentSlide, isTransitioning]);

  const handleIndicatorClick = (index) => {
    if (!isTransitioning) goToSlide(index);
  };

  // Touch event handlers
  const handleTouchStart = (e) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e) => {
    touchEndY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = () => {
    if (isTransitioning) return;
    
    const swipeThreshold = 50;
    const diff = touchStartY.current - touchEndY.current;
    
    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        // Swipe up - next slide
        goToSlide((currentSlide + 1) % HERO_VIDEOS.length);
      } else {
        // Swipe down - previous slide
        goToSlide((currentSlide - 1 + HERO_VIDEOS.length) % HERO_VIDEOS.length);
      }
    }
  };

  // Initialize video
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let playAttempted = false;

    const attemptPlay = async () => {
      if (playAttempted) return;
      playAttempted = true;
      
      try {
        await video.play();
        setIsPlaying(true);
        setShowPlayButton(false);
      } catch (err) {
        console.log('Autoplay prevented:', err.name);
        // Only show play button if it's a user interaction requirement
        if (err.name === 'NotAllowedError') {
          setShowPlayButton(true);
        }
      }
    };

    const handleCanPlay = () => {
      if (!playAttempted) {
        attemptPlay();
      }
    };

    const handlePlay = () => {
      setIsPlaying(true);
      setShowPlayButton(false);
    };

    const handlePause = () => {
      // Don't show play button on programmatic pause during transitions
      if (!isTransitioning) {
        setIsPlaying(false);
      }
    };

    const handleEnded = () => {
      if (!isTransitioning) {
        goToSlide((currentSlide + 1) % HERO_VIDEOS.length);
      }
    };

    const handleWaiting = () => {
      // Video is buffering, don't show play button
      setIsPlaying(false);
    };

    const handlePlaying = () => {
      // Video resumed after buffering
      setIsPlaying(true);
      setShowPlayButton(false);
    };

    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('waiting', handleWaiting);
    video.addEventListener('playing', handlePlaying);

    // Try to play immediately if video is ready
    if (video.readyState >= 3) {
      attemptPlay();
    }

    return () => {
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('waiting', handleWaiting);
      video.removeEventListener('playing', handlePlaying);
    };
  }, [currentSlide, isTransitioning, goToSlide]);

  // Handle manual play button click
  const handlePlayClick = async () => {
    const video = videoRef.current;
    if (!video) return;

    try {
      await video.play();
      setIsPlaying(true);
      setShowPlayButton(false);
    } catch (err) {
      console.error('Play failed:', err);
    }
  };

  const content = SLIDE_CONTENT[currentSlide];

  return (
    <section 
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-black"
      style={{ 
        background: 'linear-gradient(to bottom, #111, #0A0A0A)',
        // Extend into safe areas on mobile
        paddingTop: 'env(safe-area-inset-top)',
        marginTop: 'calc(-1 * env(safe-area-inset-top))',
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Video Layer */}
      <div className="absolute inset-0 z-10 bg-black">
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          src={HERO_VIDEOS[currentSlide]}
          poster={HERO_POSTER}
          muted
          playsInline
          preload="auto"
          webkit-playsinline="true"
          x5-playsinline="true"
          x5-video-player-type="h5"
          x5-video-player-fullscreen="true"
          aria-hidden="true"
        />
        
        {/* Play Button Overlay - Only show when explicitly needed */}
        {showPlayButton && !isPlaying && (
          <div 
            className="absolute inset-0 z-40 flex items-center justify-center cursor-pointer"
            onClick={handlePlayClick}
            style={{ 
              background: 'radial-gradient(circle, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.2) 100%)',
              backdropFilter: 'blur(2px)'
            }}
          >
            <div className="flex flex-col items-center gap-3 animate-fade-in">
              <button
                className="w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-2xl"
                style={{
                  background: 'linear-gradient(135deg, #C5A880 0%, #B8986E 100%)',
                  boxShadow: '0 8px 32px rgba(197, 168, 128, 0.4)'
                }}
                aria-label="Play video"
              >
                <svg 
                  className="w-9 h-9 text-white ml-1" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
              <span 
                className="text-white text-xs tracking-[0.3em] uppercase font-light"
                style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}
              >
                Tap to Play
              </span>
            </div>
          </div>
        )}
        
        {/* Gradient overlays */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{ 
            background: 'linear-gradient(to top, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.4) 40%, transparent 70%)' 
          }} 
        />
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{ 
            background: 'linear-gradient(to right, rgba(10,10,10,0.6), transparent 30%, transparent 70%, rgba(10,10,10,0.4))' 
          }} 
        />
      </div>

      {/* Content Overlay */}
      <div 
        ref={overlayRef}
        className="absolute inset-0 z-20 flex flex-col justify-end pb-16 px-6 md:px-8"
      >
        <div 
          ref={(el) => (contentRefs.current.label = el)}
          className="mb-6 flex items-center gap-3"
        >
          <div 
            className="h-[1px] w-10"
            style={{ background: 'linear-gradient(to right, #C5A880, rgba(197,168,128,0.3))' }}
          />
          <span 
            className="text-[10px] tracking-[0.35em] font-sans uppercase font-medium"
            style={{ color: '#C5A880' }}
          >
            THEPLOTSALE
          </span>
        </div>

        <div className="mb-4">
          <span 
            ref={(el) => (contentRefs.current.tagline = el)}
            className="text-xs tracking-[0.25em] font-sans uppercase font-light block mb-3"
            style={{ color: '#C5A880' }}
          >
            {content.location}
          </span>
          <h1 
            ref={(el) => (contentRefs.current.title = el)}
            className="text-3xl md:text-4xl font-serif font-light leading-[1.1] text-white"
            style={{ textShadow: '0 2px 12px rgba(0,0,0,0.6)' }}
          >
            {content.title}
          </h1>
          {content.title.includes('into') && (
            <h1 
              ref={(el) => (contentRefs.current.titleItalic = el)}
              className="text-3xl md:text-4xl font-serif font-light italic leading-[1.1] mt-2"
              style={{ color: '#C5A880', textShadow: '0 2px 12px rgba(0,0,0,0.6)' }}
            >
              Foundations
            </h1>
          )}
        </div>

        <p 
          ref={(el) => (contentRefs.current.description = el)}
          className="max-w-sm text-sm md:text-base font-light font-sans leading-relaxed mb-8"
          style={{ color: 'rgba(242,244,246,0.85)' }}
        >
          {content.subtitle}
        </p>

        <div 
          ref={(el) => (contentRefs.current.cta = el)}
          className="flex items-center gap-4 group cursor-pointer"
        >
          <div 
            className="h-[1px] w-10 transition-all duration-500 group-hover:w-14"
            style={{ background: 'linear-gradient(to right, #C5A880, transparent)' }}
          />
          <span 
            className="text-[10px] tracking-[0.3em] uppercase font-sans font-light"
            style={{ color: '#C5A880' }}
          >
            {content.cta}
          </span>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {HERO_VIDEOS.map((_, i) => (
          <button
            key={i}
            ref={(el) => (slideIndicatorsRef.current[i] = el)}
            onClick={() => handleIndicatorClick(i)}
            className="h-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#C5A880]/50"
            style={{
              width: i === currentSlide ? '24px' : '8px',
              backgroundColor: i === currentSlide ? '#C5A880' : 'rgba(255,255,255,0.3)',
            }}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      <div className="absolute bottom-20 right-4 z-25 opacity-20 pointer-events-none">
        <LuxurySkylineGlyph className="h-10 w-28" />
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 animate-pulse">
        <span 
          className="text-[9px] tracking-[0.3em] uppercase font-sans font-light"
          style={{ color: 'rgba(197,168,128,0.7)' }}
        >
          SWIPE
        </span>
      </div>
    </section>
  );
}