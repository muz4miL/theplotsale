// app/page.jsx
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