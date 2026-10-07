import { Metadata } from "next";
import ProjectsClient from "./ProjectsClient";

export const metadata: Metadata = {
    title: "Projects",
    description: "Browse my portfolio of full-stack web development projects.",
};

async function getProjects() {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/projects`, { next: { revalidate: 60 } });
        const data = await res.json();
        return data.data || [];
    } catch { return []; }
}

export default async function ProjectsPage() {
    const projects = await getProjects();
    return <ProjectsClient initialProjects={projects} />;
}
