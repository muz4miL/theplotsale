'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MobileHeroVideo from './MobileHeroVideo';
import { LuxurySkylineGlyph } from '@/components/shared/LuxuryMotionAccents';

const HERO_VIDEOS = ['/videos/1.mp4', '/videos/2.mp4', '/videos/3.mp4'];
const HERO_POSTER = '/lifestyle-hero.png';

/**
 * Kick off the hero video + poster fetch the moment this module is evaluated
 * on the client. Runs before the component even mounts, so by the time the
 * <video> element is in the DOM the first clip is already partly — often
 * fully — in cache. Paired with <link rel="preload"> in app/layout.jsx so
 * the very first paint on direct navigations benefits too.
 */
if (typeof window !== 'undefined') {
  import('react-dom').then((mod) => {
    try {
      mod.preload?.(HERO_VIDEOS[0], { as: 'video', fetchPriority: 'high' });
      mod.preload?.(HERO_POSTER, { as: 'image', fetchPriority: 'high' });
      mod.preload?.(HERO_VIDEOS[1], { as: 'video', fetchPriority: 'low' });
    } catch { /* react-dom < 19 — safe to ignore */ }
  });
}

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

  // Defer mobile vs desktop until after mount so SSR + first client paint match,
  // then branch once — avoids swapping the entire tree after effects touch video nodes.
  const [ready, setReady] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const videos = HERO_VIDEOS;

  useLayoutEffect(() => {
    /* Touch-first viewports: dedicated hero (no ScrollTrigger pin / heavy video stack). */
    const mq = window.matchMedia('(max-width: 1023px)');
    const apply = () => setIsMobile(mq.matches);
    apply();
    setReady(true);
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  // Seamless video transition logic (desktop hero only)
  useEffect(() => {
    if (!ready || isMobile) return;
    const video1 = videoRef.current;
    const video2 = video2Ref.current;
    if (!video1 || !video2) return;

    let activeVideo = video1;
    let inactiveVideo = video2;
    let activeIndex = 0;

    // Initial setup: active starts at first video, inactive preloads second.
    // video1.src is already bound via JSX (src={HERO_VIDEOS[0]}) so the
    // browser can begin buffering it during the initial HTML parse. We
    // deliberately do NOT reassign/reload it here or we would throw away
    // those already-buffered bytes and restart the fetch.
    video1.style.opacity = '1';
    video2.style.opacity = '0';
    
    // Ensure video1 is properly configured
    video1.muted = true;
    video1.playsInline = true;
    
    if (!video2.src || !video2.src.includes(videos[1])) {
      video2.src = videos[1];
      video2.muted = true;
      video2.playsInline = true;
      video2.load();
    }

    const attemptVideoPlay = async (video) => {
      if (!video) return;
      try {
        // Ensure video is muted before playing (required for autoplay)
        video.muted = true;
        video.playsInline = true;
        const playPromise = await video.play();
        console.log('Video playing successfully');
        return playPromise;
      } catch (err) {
        console.warn('Video autoplay blocked:', err.name, err.message);
        // If autoplay is blocked, set up click handler to start video
        if (err.name === 'NotAllowedError' || err.name === 'NotSupportedException') {
          const playOnInteraction = async () => {
            try {
              video.muted = true;
              await video.play();
              console.log('Video started after user interaction');
              document.removeEventListener('click', playOnInteraction);
              document.removeEventListener('touchstart', playOnInteraction);
              document.removeEventListener('scroll', playOnInteraction);
            } catch (retryErr) {
              console.warn('Video play retry failed:', retryErr.name);
            }
          };
          
          document.addEventListener('click', playOnInteraction, { once: true });
          document.addEventListener('touchstart', playOnInteraction, { once: true });
          document.addEventListener('scroll', playOnInteraction, { once: true });
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

    // Handle user interaction to start videos
    const handleUserInteraction = async () => {
      if (video1 && video1.paused) {
        await attemptVideoPlay(video1);
      }
      if (video2 && video2.paused && video2.src) {
        video2.muted = true;
        video2.load();
      }
    };

    video1.addEventListener('ended', handleVideoEnd);
    video2.addEventListener('ended', handleVideoEnd);

    // Add multiple interaction listeners for better coverage
    const interactionEvents = ['click', 'touchstart', 'scroll', 'mousemove'];
    interactionEvents.forEach(event => {
      document.addEventListener(event, handleUserInteraction, { once: true, passive: true });
    });

    // Attempt to start first video immediately
    attemptVideoPlay(video1);

    return () => {
      gsap.killTweensOf([video1, video2]);
      video1.removeEventListener('ended', handleVideoEnd);
      video2.removeEventListener('ended', handleVideoEnd);
      // Clean up all interaction listeners
      const interactionEvents = ['click', 'touchstart', 'scroll', 'mousemove'];
      interactionEvents.forEach(event => {
        document.removeEventListener(event, handleUserInteraction);
      });
    };
  }, [ready, isMobile]);

  // GSAP animations — desktop only. Avoid ScrollTrigger `pin` (it reparents DOM and races React 19
  // commitDeletion). Sticky wrapper below keeps the hero in view for ~400vh while we scrub.
  useLayoutEffect(() => {
    if (!ready || isMobile || typeof window === 'undefined' || !sectionRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.2,
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
          width: '45vw',
          height: '75vh',
          right: '4%',
          top: '12.5%',
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

    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, [ready, isMobile]);

  if (!ready) {
    /* First-paint skeleton. Shows the cinematic poster immediately with a dark
       overlay so the hero never renders as a flat black block while we decide
       mobile vs desktop and React hydrates. */
    return (
      <div
        className="relative min-h-screen w-full overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(10,10,10,0.55), rgba(10,10,10,0.9)), url(${HERO_POSTER})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundColor: '#0A0A0A',
        }}
        aria-hidden
      />
    );
  }

  if (isMobile) {
    return <MobileHeroVideo />;
  }

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[500vh] w-full text-white"
      style={{ background: 'linear-gradient(to bottom right, #111111, #0A0A0A, #050505)' }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <>
          <div ref={videoContainerRef} className="absolute z-20 overflow-hidden bg-black/20 w-full h-full right-0 top-0 rounded-none shadow-none">
            <div className="relative h-full w-full overflow-hidden z-10 bg-black">
              {/* Primary hero clip — src, poster and preload="auto" baked into
                  the JSX so the browser's preload scanner picks it up from the
                  initial HTML, before React hydrates. This is the single most
                  impactful change for time-to-first-frame. */}
              <video
                ref={videoRef}
                className="h-full w-full object-cover absolute inset-0"
                src={HERO_VIDEOS[0]}
                poster={HERO_POSTER}
                autoPlay
                loop={false}
                muted
                playsInline
                preload="auto"
                webkit-playsinline="true"
                x5-playsinline="true"
                x5-video-player-type="h5"
                disablePictureInPicture
                controlsList="nodownload nofullscreen noremoteplayback"
                style={{ transition: 'opacity 1.5s ease-in-out' }}
              />
              <video
                ref={video2Ref}
                className="h-full w-full object-cover absolute inset-0"
                poster={HERO_POSTER}
                loop={false}
                muted
                playsInline
                preload="none"
                webkit-playsinline="true"
                x5-playsinline="true"
                x5-video-player-type="h5"
                disablePictureInPicture
                controlsList="nodownload nofullscreen noremoteplayback"
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
                  <span className="text-[10px] tracking-[0.35em] font-sans uppercase font-medium" style={{ color: '#C5A880' }}>THEPLOTSALE</span>
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
                  <span className="text-[10px] tracking-[0.35em] uppercase font-sans font-light transition-all duration-700 ease-out group-hover:translate-x-1 group-hover:tracking-[0.4em]" style={{ color: '#C5A880' }}>DISCOVER OUR CANVAS</span>
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
                <span className="text-xs md:text-sm tracking-[0.3em] text-white/90 font-sans uppercase font-light">PREMIER REAL ESTATE CONSULTANCY</span>
              </div>
              <h1 className="mb-8 md:mb-10 font-serif text-4xl md:text-6xl lg:text-7xl font-medium leading-[0.9] text-white px-4">
                <span className="block mb-4 md:mb-6" style={{ textShadow: '0 2px 12px rgba(0, 0, 0, 0.6)' }}>Cultivating Futures</span>
                <span className="block italic font-light text-2xl md:text-3xl lg:text-4xl text-[#C5A880]" style={{ textShadow: '0 4px 20px rgba(0, 0, 0, 0.6)' }}>We are not just building homes. We are shaping dreams into addresses.</span>
              </h1>
              <p className="max-w-xs md:max-w-md text-xs tracking-[0.3em] text-white/80 font-sans uppercase font-light mt-12 md:mt-14" style={{ textShadow: '0 1px 6px rgba(0, 0, 0, 0.5)' }}>LONDON • LAHORE</p>
            </div>
          </div>

          <div ref={anchorLineRef} className="absolute left-1/2 top-1/2 z-20 h-0 -translate-x-1/2 -translate-y-1/2 opacity-0" style={{ width: '0.5px', background: 'linear-gradient(to bottom, transparent, rgba(197, 168, 128, 0.3), transparent)' }} />

          <div className="pointer-events-none absolute bottom-28 right-5 z-[45] hidden opacity-[0.28] lg:block xl:right-10">
            <LuxurySkylineGlyph className="h-14 w-36" />
          </div>

          <div ref={scrollIndicatorRef} className="absolute bottom-8 md:bottom-12 left-1/2 z-50 -translate-x-1/2">
            <div className="flex flex-col items-center">
              <span className="mb-3 md:mb-4 text-[10px] md:text-xs tracking-[0.25em] md:tracking-[0.3em] font-sans uppercase font-light" style={{ color: '#C5A880', textShadow: '0 1px 4px rgba(0, 0, 0, 0.5)' }}>EXPLORE</span>
              <div className="relative h-10 md:h-16 overflow-hidden bg-white/10 backdrop-blur-sm" style={{ width: '0.5px' }}>
                <div className="absolute top-0 h-5 md:h-8 w-full animate-scroll-indicator" style={{ background: 'linear-gradient(to bottom, #C5A880, transparent)' }} />
              </div>
            </div>
          </div>
        </>
      </div>
    </section>
  );
}
