import { IconType } from "react-icons";
import {
    SiPython,
    SiJavascript,
    SiCplusplus,
    SiReact,
    SiHtml5,
    SiBootstrap,
    SiFastapi,
    SiNodedotjs,
    SiPostgresql,
    SiMongodb,
    SiElasticsearch,
    SiGit,
    SiGithub,
    SiDocker,
    SiPostman,
    SiIntellijidea,
    SiGooglegemini,
} from "react-icons/si";
import { FaJava, FaCss3Alt } from "react-icons/fa";
import { VscVscode } from "react-icons/vsc";
import { TbSql } from "react-icons/tb";

export interface SkillItem {
    name: string;
    icon: IconType;
    color: string;
}

export interface SkillCategory {
    id: string;
    title: string;
    description: string;
    iconSymbol: string;
    badge: string;
    skills: SkillItem[];
}

export const SKILL_CATEGORIES: SkillCategory[] = [
    {
        id: "programming-languages",
        title: "Programming Languages",
        description: "Core languages used for problem solving, backend systems, and modern software development.",
        iconSymbol: "</>",
        badge: "Core",
        skills: [
            { name: "Python", icon: SiPython, color: "#3776AB" },
            { name: "Java", icon: FaJava, color: "#ED8B00" },
            { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
            { name: "SQL", icon: TbSql, color: "#00758F" },
            { name: "C++", icon: SiCplusplus, color: "#00599C" },
        ],
    },
    {
        id: "frontend",
        title: "Frontend",
        description: "Modern libraries and styling technologies for building responsive, interactive user experiences.",
        iconSymbol: "🎨",
        badge: "UI / Web",
        skills: [
            { name: "React.js", icon: SiReact, color: "#61DAFB" },
            { name: "HTML5", icon: SiHtml5, color: "#E34F26" },
            { name: "CSS3", icon: FaCss3Alt, color: "#1572B6" },
            { name: "Bootstrap", icon: SiBootstrap, color: "#7952B3" },
        ],
    },
    {
        id: "backend",
        title: "Backend",
        description: "High-performance server-side frameworks and runtimes powering APIs and business logic.",
        iconSymbol: "⚙️",
        badge: "APIs & Servers",
        skills: [
            { name: "FastAPI", icon: SiFastapi, color: "#009688" },
            { name: "Node.js", icon: SiNodedotjs, color: "#5FA04E" },
        ],
    },
    {
        id: "databases",
        title: "Databases",
        description: "Relational, document-oriented, and full-text search database management systems.",
        iconSymbol: "🗄️",
        badge: "Storage & Search",
        skills: [
            { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
            { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
            { name: "Elasticsearch", icon: SiElasticsearch, color: "#005571" },
        ],
    },
    {
        id: "developer-tools",
        title: "Developer Tools",
        description: "Version control, containerization, API development environments, and IDEs.",
        iconSymbol: "🛠️",
        badge: "Tools & DevOps",
        skills: [
            { name: "Git", icon: SiGit, color: "#F05032" },
            { name: "GitHub", icon: SiGithub, color: "#24292F" },
            { name: "Docker", icon: SiDocker, color: "#2496ED" },
            { name: "Postman", icon: SiPostman, color: "#FF6C37" },
            { name: "VS Code", icon: VscVscode, color: "#007ACC" },
            { name: "IntelliJ IDEA", icon: SiIntellijidea, color: "#FE315D" },
            { name: "Antigravity", icon: SiGooglegemini, color: "#8E75FF" },
        ],
    },
];
