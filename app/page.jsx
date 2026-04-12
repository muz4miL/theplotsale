// app/page.jsx
import HeroVideoParallax from '@/components/home/HeroVideoParallax';
import Intro from '@/components/home/Intro';
import Properties from '@/components/home/Properties';
import LavitaLifestyle from '@/components/home/LavitaLifestyle';
import Testimonials from '@/components/home/Testimonials';
import BentoGrid from '@/components/home/BentoGrid';
import HomeContact from '@/components/home/HomeContact';

export default function Home() {
  return (
    <main>
      <HeroVideoParallax />
      <Intro />
      <Properties />
      <BentoGrid />
      <LavitaLifestyle />
      <Testimonials />
      <HomeContact />

    </main>
  );
}