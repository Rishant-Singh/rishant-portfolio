import { Metadata } from "next";
import HeroSection from "@/components/sections/HeroSection";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import SkillsOverview from "@/components/sections/SkillsOverview";
import GitHubSection from "@/components/sections/GitHubSection";

export const metadata: Metadata = {
    title: "Home | Full-Stack Developer Portfolio",
    description: "Full-Stack Developer portfolio showcasing projects, skills, and blog.",
};

async function getFeaturedProjects() {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/projects?featured=true`, { next: { revalidate: 60 } });
        const data = await res.json();
        return data.data || [];
    } catch { return []; }
}

async function getSkills() {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/skills`, { next: { revalidate: 60 } });
        const data = await res.json();
        return data.data || [];
    } catch { return []; }
}

export default async function HomePage() {
    const [projects] = await Promise.all([getFeaturedProjects()]);

    return (
        <>
            <HeroSection />
            <FeaturedProjects projects={projects} />
            <SkillsOverview />
            <GitHubSection />
        </>
    );
}
