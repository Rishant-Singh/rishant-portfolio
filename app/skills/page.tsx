import { Metadata } from "next";
import SkillsClient from "./SkillsClient";

export const metadata: Metadata = {
    title: "Skills & Technologies",
    description: "Technical stack and tools including Python, React.js, FastAPI, Node.js, PostgreSQL, Docker, and more.",
};

export default function SkillsPage() {
    return <SkillsClient />;
}
