import ReactDOM from 'react-dom';
import HeroVideoParallax from '@/components/home/HeroVideoParallax';
import Intro from '@/components/home/Intro';
import CoreCapabilitiesCarousel from '@/components/home/CoreCapabilitiesCarousel';
import LuxuryLogoMarquee from '@/components/home/LuxuryLogoMarquee';
import Properties from '@/components/home/Properties';
import LavitaLifestyle from '@/components/home/LavitaLifestyle';
import Testimonials from '@/components/home/Testimonials';
import BentoGrid from '@/components/home/BentoGrid';
import HomeContact from '@/components/home/HomeContact';
import OfficeLocations from '@/components/home/OfficeLocations';

export default function Home() {
  /* Above-the-fold hero: emit <link rel="preload"> for the first cinematic clip
     and its poster directly into <head> during SSR. The browser's preload
     scanner picks these up before any JavaScript runs, so /videos/1.mp4 starts
     downloading in parallel with JS/CSS instead of waiting for React to
     hydrate and mount the <video>. This is the single biggest win for
     time-to-first-frame on cold loads (Vercel edge + fresh visit). */
  ReactDOM.preload('/videos/1.mp4', { as: 'video', fetchPriority: 'high' });
  ReactDOM.preload('/lifestyle-hero.png', { as: 'image', fetchPriority: 'high' });

  return (
    <>
      <HeroVideoParallax />
      <Intro />
      <LuxuryLogoMarquee />
      <Properties />
      <BentoGrid />
      <LavitaLifestyle />
      <Testimonials />
      <CoreCapabilitiesCarousel />
      <HomeContact />
      <OfficeLocations />
    </>
  );
}