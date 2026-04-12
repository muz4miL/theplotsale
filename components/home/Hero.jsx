'use client';

import { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade } from 'swiper/modules';
import { ChevronDown } from 'lucide-react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';

export default function Hero() {
  const swiperRef = useRef(null);
  const videoRefs = useRef([]);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [videosLoaded, setVideosLoaded] = useState([false, false]);

  const videos = [
    '/hero-videos/hero1.mp4',
    '/hero-videos/hero6.mp4',
  ];

  const addVideoRef = (el, index) => {
    if (el) {
      videoRefs.current[index] = el;
    }
  };

  // Handle video loading and initial setup
  useEffect(() => {
    const firstVideo = videoRefs.current[0];

    // Mobile-specific video play handler
    const attemptVideoPlay = async (video) => {
      if (!video) return;
      
      try {
        // Reset video to start
        video.currentTime = 0;
        
        // Attempt to play
        await video.play();
      } catch (err) {
        console.log('Video play attempt:', err.name);
        
        // For mobile devices, try again after a short delay
        if (err.name === 'NotAllowedError' || err.name === 'AbortError') {
          setTimeout(async () => {
            try {
              await video.play();
            } catch (retryErr) {
              console.log('Video retry failed:', retryErr.name);
            }
          }, 100);
        }
      }
    };

    // Handler for when first video can play through
    const handleFirstVideoReady = () => {
      setVideosLoaded(prev => {
        const newState = [...prev];
        newState[0] = true;
        return newState;
      });

      // Play the first video immediately
      attemptVideoPlay(firstVideo);

      // Smooth fade-in after a small buffer to ensure smooth start
      setTimeout(() => {
        setIsVideoReady(true);
      }, 300);
    };

    // Handler for second video
    const handleSecondVideoReady = () => {
      setVideosLoaded(prev => {
        const newState = [...prev];
        newState[1] = true;
        return newState;
      });
    };

    // Attach event listeners
    if (firstVideo) {
      firstVideo.addEventListener('canplaythrough', handleFirstVideoReady, { once: true });
      firstVideo.addEventListener('loadeddata', handleFirstVideoReady, { once: true });
    }

    const secondVideo = videoRefs.current[1];
    if (secondVideo) {
      secondVideo.addEventListener('canplaythrough', handleSecondVideoReady, { once: true });
      secondVideo.addEventListener('loadeddata', handleSecondVideoReady, { once: true });
    }

    // Resume playback when tab becomes visible again
    const handleVisibilityChange = () => {
      if (!document.hidden && videoRefs.current[activeSlide]) {
        attemptVideoPlay(videoRefs.current[activeSlide]);
      }
    };

    // Handle user interaction to start videos on mobile
    const handleUserInteraction = () => {
      if (firstVideo && firstVideo.paused) {
        attemptVideoPlay(firstVideo);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    document.addEventListener('touchstart', handleUserInteraction, { once: true });
    document.addEventListener('click', handleUserInteraction, { once: true });

    return () => {
      if (firstVideo) {
        firstVideo.removeEventListener('canplaythrough', handleFirstVideoReady);
        firstVideo.removeEventListener('loadeddata', handleFirstVideoReady);
      }
      if (secondVideo) {
        secondVideo.removeEventListener('canplaythrough', handleSecondVideoReady);
        secondVideo.removeEventListener('loadeddata', handleSecondVideoReady);
      }
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.removeEventListener('touchstart', handleUserInteraction);
      document.removeEventListener('click', handleUserInteraction);
    };
  }, []);

  // Handle video playback based on active slide - CRITICAL for sequential playback
  useEffect(() => {
    const currentVideo = videoRefs.current[activeSlide];

    if (!currentVideo) return;

    const playCurrentVideo = async () => {
      try {
        // Pause all other videos
        videoRefs.current.forEach((video, index) => {
          if (video && index !== activeSlide) {
            video.pause();
            video.currentTime = 0; // Reset to beginning for next play
          }
        });

        // Play the current video from the beginning
        currentVideo.currentTime = 0;
        await currentVideo.play();
      } catch (err) {
        console.log('Video play error:', err);
        
        // Retry for mobile devices
        if (err.name === 'NotAllowedError' || err.name === 'AbortError') {
          setTimeout(async () => {
            try {
              await currentVideo.play();
            } catch (retryErr) {
              console.log('Video retry failed:', retryErr);
            }
          }, 100);
        }
      }
    };

    playCurrentVideo();

  }, [activeSlide]);

  // Handle video end events to trigger next slide
  useEffect(() => {
    const handleVideoEnd = (index) => {
      // When a video ends, move to the next slide
      if (swiperRef.current && swiperRef.current.swiper) {
        const swiper = swiperRef.current.swiper;

        // If we're at the last video, go back to first (rewind)
        if (index === videos.length - 1) {
          swiper.slideTo(0);
        } else {
          swiper.slideNext();
        }
      }
    };

    // Attach ended event listeners to all videos
    videoRefs.current.forEach((video, index) => {
      if (video) {
        const handler = () => handleVideoEnd(index);
        video.addEventListener('ended', handler);

        // Store handler for cleanup
        video._endHandler = handler;
      }
    });

    return () => {
      // Cleanup event listeners
      videoRefs.current.forEach((video) => {
        if (video && video._endHandler) {
          video.removeEventListener('ended', video._endHandler);
          delete video._endHandler;
        }
      });
    };
  }, [videos.length]);

  const handleSlideChange = (swiper) => {
    const newIndex = swiper.activeIndex;
    setActiveSlide(newIndex);
  };

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black">
      {/* PREMIUM LOADING STATE */}
      <div
        className={`absolute inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-700 ${isVideoReady ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
      >
        <div className="flex flex-col items-center gap-6">
          {/* Elegant Spinner */}
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 border-4 border-white/10 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-transparent border-t-[#C5A880] rounded-full animate-spin"></div>
          </div>

          {/* Loading Text */}
          <p className="text-white/60 text-sm font-[family-name:var(--font-manrope)] tracking-[0.2em] uppercase animate-pulse">
            Preparing Experience
          </p>
        </div>
      </div>

      {/* VIDEO CAROUSEL - Fades in when ready */}
      <div
        className={`absolute inset-0 w-full h-full transition-opacity duration-700 ${isVideoReady ? 'opacity-100' : 'opacity-0'
          }`}
      >
        <Swiper
          ref={swiperRef}
          modules={[EffectFade]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          speed={1500}
          loop={false}
          rewind={true}
          slidesPerView={1}
          allowTouchMove={false}
          onSlideChange={handleSlideChange}
          className="w-full h-full"
        >
          {videos.map((video, index) => (
            <SwiperSlide key={`video-${index}`} className="w-full h-full">
              <div className="relative w-full h-full">
                <video
                  ref={(el) => addVideoRef(el, index)}
                  muted
                  playsInline
                  autoPlay
                  loop={false}
                  preload="metadata"
                  webkit-playsinline="true"
                  x5-playsinline="true"
                  x5-video-player-type="h5"
                  x5-video-player-fullscreen="true"
                  poster="/intro.png"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    backgroundColor: '#000'
                  }}
                >
                  <source src={video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                
                {/* Fallback background image for mobile */}
                <div 
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                  style={{
                    backgroundImage: 'url(/intro.png)',
                    zIndex: -1
                  }}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* TOP GRADIENT SCRIM - Protects navbar from clouds/white building (FIX #1) */}
      <div
        className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/60 to-transparent pointer-events-none z-10"
      />

      {/* LEFT-TO-RIGHT GRADIENT OVERLAY - For text readability */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: 'linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 40%, transparent 70%)'
        }}
      />

      {/* PREMIUM LUXURY TEXT OVERLAY */}
      <div className="absolute inset-0 z-20 flex flex-col justify-end pb-16 md:pb-20 lg:pb-28 pl-6 md:pl-12 lg:pl-20">

        {/* Main Content Container with Glassmorphic Background */}
        <div className="max-w-3xl">

          {/* Premium Badge with Ornamental Line */}
          <div className="flex items-center gap-4 mb-6 md:mb-8 animate-[fadeSlideUp_0.8s_cubic-bezier(0.16,1,0.3,1)_0.3s_both]">
            <div className="relative group">
              {/* Glassmorphic Badge Container */}
              <div className="relative px-6 py-2.5 backdrop-blur-md bg-gradient-to-r from-[#C5A880]/20 to-[#C5A880]/10 border border-[#C5A880]/30 rounded-full shadow-[0_8px_32px_rgba(197,168,128,0.15)]">
                <p className="text-[#C5A880] tracking-[0.25em] text-[10px] md:text-xs font-bold uppercase">
                  Trusted Since 2020
                </p>
                {/* Subtle inner glow */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#C5A880]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </div>
            {/* Decorative Line */}
            <div className="h-[1px] w-16 md:w-24 bg-gradient-to-r from-[#C5A880]/50 to-transparent" />
          </div>

          {/* Main Headline - Elegant Typography Blocks */}
          <div className="space-y-3 md:space-y-4 mb-6 md:mb-8 animate-[fadeSlideUp_0.8s_cubic-bezier(0.16,1,0.3,1)_0.5s_both]">
            {/* First Line - Timeless */}
            <div className="relative inline-block group">
              <div className="relative px-8 py-4 md:px-10 md:py-5 backdrop-blur-sm bg-gradient-to-br from-[#C5A880]/25 via-[#C5A880]/15 to-transparent border-l-4 border-[#C5A880] shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-[family-name:var(--font-playfair)] text-white leading-none tracking-tight italic">
                  We Are Not Just
                </h1>
                {/* Subtle shine effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              </div>
            </div>

            {/* Second Line - Building Homes */}
            <div className="relative inline-block group">
              <div className="relative px-8 py-4 md:px-10 md:py-5 backdrop-blur-sm bg-gradient-to-br from-[#C5A880]/25 via-[#C5A880]/15 to-transparent border-l-4 border-[#C5A880] shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-[family-name:var(--font-playfair)] text-white leading-none tracking-tight italic">
                  Building Homes
                </h1>
                {/* Subtle shine effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              </div>
            </div>

            {/* Third Line - We Are Cultivating Futures */}
            <div className="relative inline-block group">
              <div className="relative px-8 py-4 md:px-10 md:py-5 backdrop-blur-sm bg-gradient-to-br from-[#C5A880]/25 via-[#C5A880]/15 to-transparent border-l-4 border-[#C5A880] shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-[family-name:var(--font-playfair)] text-white leading-none tracking-tight italic">
                  We Are Cultivating Futures
                </h1>
                {/* Subtle shine effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              </div>
            </div>
          </div>

          {/* Decorative Divider */}
          <div className="flex items-center gap-3 mb-6 md:mb-8 animate-[fadeSlideUp_0.8s_cubic-bezier(0.16,1,0.3,1)_0.7s_both]">
            <div className="w-2 h-2 rounded-full bg-[#C5A880] shadow-[0_0_12px_rgba(197,168,128,0.6)]" />
            <div className="h-[1px] flex-1 max-w-[120px] bg-gradient-to-r from-[#C5A880] via-[#C5A880]/50 to-transparent" />
          </div>

          {/* Descriptive Text - Premium Glass Card */}
          <div className="relative max-w-xl mb-8 md:mb-10 animate-[fadeSlideUp_0.8s_cubic-bezier(0.16,1,0.3,1)_0.9s_both]">
            <div className="relative px-6 py-5 md:px-8 md:py-6 backdrop-blur-md bg-black/30 border border-white/10 rounded-lg shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
              <p className="text-gray-100 text-sm md:text-base lg:text-lg font-[family-name:var(--font-manrope)] font-light leading-relaxed tracking-wide">
                Trusted real estate consultancy serving London & Lahore. Expert guidance for your property investment journey.
              </p>
              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-[#C5A880]/30 rounded-tr-lg" />
              <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-[#C5A880]/30 rounded-bl-lg" />
            </div>
          </div>

          {/* CTA Buttons - Premium Design */}
          <div className="flex flex-col sm:flex-row gap-4 animate-[fadeSlideUp_0.8s_cubic-bezier(0.16,1,0.3,1)_1.1s_both]">
            {/* Primary CTA */}
            <button className="group relative overflow-hidden bg-[#C5A880] text-black px-10 md:px-12 py-4 md:py-5 text-xs md:text-sm font-[family-name:var(--font-manrope)] font-bold uppercase tracking-[0.25em] transition-all duration-500 hover:scale-[1.02] shadow-[0_8px_30px_rgba(197,168,128,0.4)] hover:shadow-[0_12px_50px_rgba(197,168,128,0.6)]">
              <span className="relative z-10">View Properties</span>
              {/* Animated background on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            </button>

            {/* Secondary CTA */}
            <button className="group relative overflow-hidden backdrop-blur-md bg-white/5 border-2 border-white/20 text-white px-10 md:px-12 py-4 md:py-5 text-xs md:text-sm font-[family-name:var(--font-manrope)] font-bold uppercase tracking-[0.25em] transition-all duration-500 hover:bg-white hover:text-black hover:border-white shadow-[0_8px_30px_rgba(0,0,0,0.3)]">
              <span className="relative z-10">Schedule Consultation</span>
              {/* Border glow on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[inset_0_0_20px_rgba(255,255,255,0.2)]" />
            </button>
          </div>
        </div>
      </div>

      {/* Video Progress Indicator */}
      {/* <div className="absolute top-6 md:top-8 right-6 md:right-8 z-30 flex gap-2">
        {videos.map((_, index) => (
          <div
            key={index}
            className="w-10 md:w-12 h-1 rounded-full bg-white/20 overflow-hidden backdrop-blur-sm"
          >
            <div
              className="h-full bg-[#C89B7B] shadow-[0_0_16px_rgba(200,155,123,0.8)] transition-all duration-500"
              style={{
                width: activeSlide === index ? '100%' : '0%'
              }}
            />
          </div>
        ))}
      </div> */}

      {/* Scroll Indicator */}
      {/* <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-30 animate-[fadeIn_1s_ease-out_2s_both]">
        <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center pt-2 backdrop-blur-sm bg-black/20 shadow-xl">
          <div className="w-1 h-2 bg-[#C89B7B] rounded-full animate-[scrollBounce_2s_ease-in-out_infinite] shadow-[0_0_8px_rgba(200,155,123,0.8)]" />
        </div>
        <ChevronDown className="w-4 h-4 text-white/50 animate-[scrollChevronBounce_2s_ease-in-out_infinite] drop-shadow-lg" />
      </div> */}
    </section>
  );
}
