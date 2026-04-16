'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SimpleMobileHero from './SimpleMobileHero';

export default function HeroVideoParallax() {
  // All refs
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const video2Ref = useRef(null);
  const overlayRef = useRef(null);
  const revealRef = useRef(null);
  const revealSubRef = useRef(null);
  const anchorLineRef = useRef(null);
  const videoContainerRef = useRef(null);
  const scrollIndicatorRef = useRef(null);
  const luxuryLabelRef = useRef(null);
  const visionLabelRef = useRef(null);
  const timelessRef = useRef(null);
  const eleganceRef = useRef(null);
  const goldDividerRef = useRef(null);

  // State for mobile/desktop and video transitions
  const [isMobile, setIsMobile] = useState(false);
  
  const videos = [
    '/videos/1.mp4',
    '/videos/2.mp4',
    '/videos/3.mp4'
  ];

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);

      // On mobile, show content immediately
      if (mobile && revealRef.current && timelessRef.current && eleganceRef.current) {
        gsap.set([revealRef.current, timelessRef.current, eleganceRef.current, revealSubRef.current], {
          opacity: 1,
          y: 0,
          clipPath: 'inset(0 0 0 0)'
        });
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Seamless video transition logic (desktop + mobile video layer)
  useEffect(() => {
    const video1 = videoRef.current;
    const video2 = video2Ref.current;
    if (!video1 || !video2) return;

    let activeVideo = video1;
    let inactiveVideo = video2;
    let activeIndex = 0;

    // Initial setup: active starts at first video, inactive preloads second
    video1.style.opacity = '1';
    video2.style.opacity = '0';
    video1.src = videos[0];
    video2.src = videos[1];
    video1.load();
    video2.load();

    const attemptVideoPlay = async (video) => {
      if (!video) return;
      
      try {
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

    const handleVideoEnd = async (event) => {
      // Ignore end events from non-active layer to prevent odd mid-transition jumps.
      if (event?.target !== activeVideo) return;

      // Determine next active video and the one to preload after transition
      const nextActiveIndex = (activeIndex + 1) % videos.length;
      const nextPreloadIndex = (nextActiveIndex + 1) % videos.length;

      // Ensure inactive layer points to next active source
      if (inactiveVideo.src !== `${window.location.origin}${videos[nextActiveIndex]}`) {
        inactiveVideo.src = videos[nextActiveIndex];
        inactiveVideo.load();
      }

      // Always start next clip from the beginning.
      inactiveVideo.currentTime = 0;
      await attemptVideoPlay(inactiveVideo);

      // Elegant crossfade transition between video layers
      gsap.to(activeVideo, { opacity: 0, duration: 1.2, ease: 'power2.inOut' });
      gsap.to(inactiveVideo, { opacity: 1, duration: 1.2, ease: 'power2.inOut' });

      // Swap layers: inactive becomes active
      [activeVideo, inactiveVideo] = [inactiveVideo, activeVideo];
      activeIndex = nextActiveIndex;

      // Preload the following video into the now-inactive layer
      inactiveVideo.pause();
      inactiveVideo.currentTime = 0;
      inactiveVideo.src = videos[nextPreloadIndex];
      inactiveVideo.load();
    };

    // Handle user interaction to start videos on mobile
    const handleUserInteraction = () => {
      if (video1 && video1.paused) {
        attemptVideoPlay(video1);
      }
    };

    video1.addEventListener('ended', handleVideoEnd);
    video2.addEventListener('ended', handleVideoEnd);
    
    // Add mobile interaction listeners
    document.addEventListener('touchstart', handleUserInteraction, { once: true });
    document.addEventListener('click', handleUserInteraction, { once: true });

    // Start first video
    attemptVideoPlay(video1);

    return () => {
      video1.removeEventListener('ended', handleVideoEnd);
      video2.removeEventListener('ended', handleVideoEnd);
      document.removeEventListener('touchstart', handleUserInteraction);
      document.removeEventListener('click', handleUserInteraction);
    };
  }, []);

  // GSAP animations - DESKTOP ONLY
  useEffect(() => {
    if (isMobile || typeof window === 'undefined' || !sectionRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Create timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=400%',
          scrub: 1.2,
          pin: true,
          anticipatePin: 1,
        },
      });

      // 0. Scroll indicator fades out fast
      if (scrollIndicatorRef.current) {
        tl.to(scrollIndicatorRef.current, { opacity: 0, y: -24, duration: 0.3, ease: 'power2.in' }, 0);
      }

      // 1. Initial Overlay fades out
      if (overlayRef.current) {
        tl.to(overlayRef.current, { opacity: 0, y: '-10%', scale: 0.95, duration: 0.8, ease: 'power2.inOut' }, 0);
      }

      // 2. Video container transforms to side panel
      if (videoContainerRef.current) {
        tl.to(videoContainerRef.current, {
          width: '45vw', height: '75vh', right: '4%', top: '12.5%',
          borderRadius: '32px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 60px 120px -30px rgba(0, 0, 0, 0.9), 0 0 60px rgba(197, 168, 128, 0.1) inset',
          duration: 1, ease: 'power2.inOut',
        }, 0);
      }

      // 3. Anchor line grows
      if (anchorLineRef.current) {
        tl.fromTo(anchorLineRef.current, { scaleY: 0, opacity: 0 }, { scaleY: 1, opacity: 1, duration: 0.6, ease: 'power2.out' }, 0.4);
      }

      // 4. Luxury label appears
      if (luxuryLabelRef.current) {
        tl.fromTo(luxuryLabelRef.current, { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }, 0.4);
      }

      // 5. Content reveal sequence
      if (revealRef.current) {
        tl.to(revealRef.current, { opacity: 1, duration: 0.1 }, 0.6);
      }

      // "PREMIER REAL ESTATE CONSULTANCY" label appears FIRST
      if (visionLabelRef.current) {
        tl.fromTo(visionLabelRef.current, { opacity: 0, y: 20, filter: 'blur(4px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.5, ease: 'power2.out' }, 0.7);
      }

      // "Aspirations into" word appears SECOND
      if (timelessRef.current) {
        tl.fromTo(timelessRef.current, { opacity: 0, y: 50, clipPath: 'inset(0 0 100% 0)' }, { opacity: 1, y: 0, clipPath: 'inset(0 0 0 0)', duration: 1.2, ease: 'power2.out' }, 0.8);
      }

      // "Foundations" word appears THIRD
      if (eleganceRef.current) {
        tl.fromTo(eleganceRef.current, { opacity: 0, y: 50, clipPath: 'inset(0 0 100% 0)' }, { opacity: 1, y: 0, clipPath: 'inset(0 0 0 0)', duration: 1.2, ease: 'power2.out' }, 1.1);
      }

      // Divider appears
      if (goldDividerRef.current) {
        tl.fromTo(goldDividerRef.current, { opacity: 0, scaleX: 0 }, { opacity: 1, scaleX: 1, duration: 0.6, ease: 'power2.out' }, 1.2);
      }

      // Description text appears FOURTH
      if (revealSubRef.current) {
        tl.fromTo(revealSubRef.current, { opacity: 0, y: 30, filter: 'blur(4px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.7, ease: 'power2.out' }, 1.4);
      }

      // 6. Ensure visibility
      if (revealRef.current) tl.to(revealRef.current, { opacity: 1, duration: 0.01 }, 1.5);
      if (timelessRef.current) tl.to(timelessRef.current, { opacity: 1, duration: 0.01 }, 1.5);
      if (eleganceRef.current) tl.to(eleganceRef.current, { opacity: 1, duration: 0.01 }, 1.5);
      if (revealSubRef.current) tl.to(revealSubRef.current, { opacity: 1, duration: 0.01 }, 1.5);

      // 7. Subtle parallax
      if (revealRef.current) tl.to(revealRef.current, { y: '-5%', duration: 1, ease: 'none' }, 2.0);
      if (videoContainerRef.current) tl.to(videoContainerRef.current, { y: '2%', scale: 0.98, duration: 1, ease: 'none' }, 2.0);

    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile]);

  if (isMobile) {
    return <SimpleMobileHero />;
  }

  return (
    <section
      ref={sectionRef}
      className={`relative ${isMobile ? 'h-auto min-h-screen flex flex-col' : 'h-screen w-full overflow-hidden'} text-white`}
      style={{ background: 'linear-gradient(to bottom right, #111111, #0A0A0A, #050505)' }}
    >
      {/* ==================== DESKTOP LAYOUT ==================== */}
      <>
          <div ref={videoContainerRef} className="absolute z-20 overflow-hidden bg-black/20 w-full h-full right-0 top-0 rounded-none shadow-none">
            <div className="relative h-full w-full overflow-hidden z-10 bg-black">
              <video
                ref={videoRef}
                className="h-full w-full object-cover absolute inset-0"
                autoPlay 
                loop={false} 
                muted 
                playsInline 
                preload="metadata"
                webkit-playsinline="true"
                x5-playsinline="true"
                x5-video-player-type="h5"
                style={{ transition: 'opacity 1.5s ease-in-out' }}
              />
              <video
                ref={video2Ref}
                className="h-full w-full object-cover absolute inset-0"
                loop={false} 
                muted 
                playsInline 
                preload="none"
                webkit-playsinline="true"
                x5-playsinline="true"
                x5-video-player-type="h5"
                style={{ opacity: 0, transition: 'opacity 1.5s ease-in-out' }}
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(17, 17, 17, 0.9), rgba(17, 17, 17, 0.3), transparent)' }} />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(17, 17, 17, 0.4), transparent, transparent)' }} />
            </div>
          </div>

          <div ref={revealRef} className="absolute left-0 top-0 z-30 flex h-full w-full items-center justify-start pl-[5%] md:pl-[10%] pr-[5%] md:pr-[52%] opacity-0 pt-20 md:pt-0">
            <div className="relative w-full max-w-2xl text-left">

              <div ref={luxuryLabelRef} className="mb-8 md:mb-12 opacity-0">
                <div className="flex items-center gap-4">
                  <div className="h-[1px] w-12" style={{ background: 'linear-gradient(to right, #C5A880, rgba(197, 168, 128, 0.3))' }} />
                  <span className="text-[10px] tracking-[0.35em] font-sans uppercase font-medium" style={{ color: '#C5A880' }}>
                    THEPLOTSALE
                  </span>
                </div>
              </div>

              <div className="flex flex-col justify-center items-start">
                <div ref={visionLabelRef} className="mb-6 opacity-0">
                  <span className="text-xs tracking-[0.25em] font-sans uppercase font-light" style={{ color: '#C5A880' }}>PREMIER REAL ESTATE CONSULTANCY</span>
                </div>

                <div className="mb-10 overflow-visible pb-4">
                  <h2
                    ref={timelessRef}
                    className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl tracking-tight leading-[1.15] font-light font-serif opacity-0 overflow-visible"
                    style={{ color: '#F2F4F6', textShadow: '0 4px 20px rgba(0, 0, 0, 0.5)' }}
                  >
                    Aspirations into
                  </h2>
                  <h2
                    ref={eleganceRef}
                    className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl tracking-tight leading-[1.15] italic font-light font-serif opacity-0 overflow-visible mt-2 md:mt-3"
                    style={{ color: '#C5A880', textShadow: '0 4px 20px rgba(0, 0, 0, 0.5)' }}
                  >
                    Foundations
                  </h2>
                </div>

                <div
                  ref={goldDividerRef}
                  className="h-[1px] w-20 md:w-24 my-8 md:my-10 opacity-0 transform origin-left scale-x-0"
                  style={{ background: 'linear-gradient(to right, #C5A880, rgba(197, 168, 128, 0.3))' }}
                />

                <p
                  ref={revealSubRef}
                  className="max-w-md text-base md:text-[1.125rem] font-light font-sans opacity-0"
                  style={{ color: 'rgba(242, 244, 246, 0.8)', lineHeight: '1.8', letterSpacing: '0.01em' }}
                >
                  At ThePlotSale, we are committed to delivering real estate solutions marked by transparency and integrity, bridging developers and homeowners in a trusted partnership. We envision a sustainable future where every property is not just an asset, but a space people are proud to call home.
                </p>

                <div className="mt-14 md:mt-20 flex items-center gap-6 group cursor-pointer">
                  <div className="h-[1px] w-12 transition-all duration-700 ease-out group-hover:w-16" style={{ background: 'linear-gradient(to right, #C5A880, transparent)' }} />
                  <span className="text-[10px] tracking-[0.35em] uppercase font-sans font-light transition-all duration-700 ease-out group-hover:translate-x-1 group-hover:tracking-[0.4em]" style={{ color: '#C5A880' }}>
                    DISCOVER OUR CANVAS
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Seamless Gradient to Next Section */}
          <div className="absolute bottom-0 left-0 right-0 h-56 z-25 pointer-events-none" style={{ background: 'linear-gradient(to bottom, transparent, rgba(10, 10, 10, 0.4), #0A0A0A)' }} />

          {/* Initial Full Screen Overlay - LEFT ALIGNED */}
          <div ref={overlayRef} className="absolute inset-0 z-40 flex flex-col items-start justify-center pointer-events-none pb-12 md:pb-16 pl-[5%] md:pl-[10%]">
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.2), transparent)' }} />

            <div className="text-left px-4 relative z-10 w-full">
              <div className="mb-8 md:mb-10">
                <span className="text-xs md:text-sm tracking-[0.3em] text-white/90 font-sans uppercase font-light">
                  PREMIER REAL ESTATE CONSULTANCY
                </span>
              </div>
              <h1 className="mb-8 md:mb-10 font-serif text-4xl md:text-6xl lg:text-7xl font-medium leading-[0.9] text-white px-4">
                <span className="block mb-4 md:mb-6" style={{ textShadow: '0 2px 12px rgba(0, 0, 0, 0.6)' }}>
                  Cultivating Futures
                </span>
                <span className="block italic font-light text-2xl md:text-3xl lg:text-4xl text-[#C5A880]" style={{ textShadow: '0 4px 20px rgba(0, 0, 0, 0.6)' }}>
                  We are not just building homes. We are shaping dreams into addresses.
                </span>
              </h1>
              <p className="max-w-xs md:max-w-md text-xs tracking-[0.3em] text-white/80 font-sans uppercase font-light mt-12 md:mt-14" style={{ textShadow: '0 1px 6px rgba(0, 0, 0, 0.5)' }}>
                LONDON • LAHORE
              </p>
            </div>
          </div>

          <div ref={anchorLineRef} className="absolute left-1/2 top-1/2 z-20 h-0 -translate-x-1/2 -translate-y-1/2 opacity-0" style={{ width: '0.5px', background: 'linear-gradient(to bottom, transparent, rgba(197, 168, 128, 0.3), transparent)' }} />

          <div ref={scrollIndicatorRef} className="absolute bottom-8 md:bottom-12 left-1/2 z-50 -translate-x-1/2">
            <div className="flex flex-col items-center">
              <span className="mb-3 md:mb-4 text-[10px] md:text-xs tracking-[0.25em] md:tracking-[0.3em] font-sans uppercase font-light" style={{ color: '#C5A880', textShadow: '0 1px 4px rgba(0, 0, 0, 0.5)' }}>
                EXPLORE
              </span>
              <div className="relative h-10 md:h-16 overflow-hidden bg-white/10 backdrop-blur-sm" style={{ width: '0.5px' }}>
                <div className="absolute top-0 h-5 md:h-8 w-full animate-scroll-indicator" style={{ background: 'linear-gradient(to bottom, #C5A880, transparent)' }} />
              </div>
            </div>
          </div>
      </>
    </section >
  );
}
