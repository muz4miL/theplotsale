import AboutHero from '@/components/about/AboutHero';
import WhoWeAre from '@/components/about/WhoWeAre';
import CinematicVision from '@/components/about/CinematicVision';
import ManagementTeam from '@/components/about/ManagementTeam';
import HeritageStory from '@/components/about/HeritageStory';
import ClubPhilosophy from '@/components/about/ClubPhilosophy';
import ExtraordinaryCta from '@/components/shared/ExtraordinaryCta';

export default function AboutPage() {
    return (
        <main className="bg-[#0A0A0A] min-h-screen">
            <AboutHero />
            <WhoWeAre />
            <CinematicVision />
            <ManagementTeam />
            <HeritageStory />
            <ClubPhilosophy />
            <ExtraordinaryCta />
        </main>
    );
}
