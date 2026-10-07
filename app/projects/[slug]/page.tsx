import { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectCaseStudy from "./ProjectCaseStudy";

interface Props { params: { slug: string } }

async function getProject(slug: string) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/projects/${slug}`, { next: { revalidate: 60 } });
        if (!res.ok) return null;
        const data = await res.json();
        return data.data || null;
    } catch { return null; }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const project = await getProject(slug);
    if (!project) return { title: "Project Not Found" };
    return { title: project.title, description: project.description };
}

export default async function ProjectDetailPage({ params }: Props) {
    const { slug } = await params;
    const project = await getProject(slug);
    if (!project) notFound();
    return <ProjectCaseStudy project={project} />;
}
