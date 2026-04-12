import AboutHero from '@/components/about/AboutHero';
import WhoWeAre from '@/components/about/WhoWeAre';
import ManagementTeam from '@/components/about/ManagementTeam';
import HeritageStory from '@/components/about/HeritageStory';
import ClubPhilosophy from '@/components/about/ClubPhilosophy';

export default function AboutPage() {
    return (
        <main className="bg-[#0A0A0A] min-h-screen">
            <AboutHero />
            <WhoWeAre />
            <ManagementTeam />
            <HeritageStory />
            <ClubPhilosophy />
        </main>
    );
}
