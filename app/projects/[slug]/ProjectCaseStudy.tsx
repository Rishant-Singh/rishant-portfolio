"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { FiGithub, FiExternalLink, FiArrowLeft } from "react-icons/fi";

interface Project {
    title: string; description: string; techStack: string[]; githubUrl: string;
    liveUrl: string; images: string[]; content: string; category: string;
}

export default function ProjectCaseStudy({ project }: { project: Project }) {
    return (
        <div className="pt-20 min-h-screen bg-white dark:bg-dark-900">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <Link href="/projects" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-primary-400 transition-colors mb-8">
                        <FiArrowLeft /> Back to Projects
                    </Link>

                    {/* Hero image */}
                    {project.images?.[0] && (
                        <div className="rounded-2xl overflow-hidden mb-8 h-72 bg-dark-800">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={project.images[0]} alt={project.title} className="w-full h-full object-cover" />
                        </div>
                    )}

                    <div className="flex flex-wrap gap-3 mb-4">
                        <span className="tag">{project.category}</span>
                    </div>

                    <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-4">{project.title}</h1>
                    <p className="text-gray-500 dark:text-gray-400 mb-8 text-lg">{project.description}</p>

                    {/* Links */}
                    <div className="flex gap-4 mb-8">
                        {project.githubUrl && (
                            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary text-sm py-2">
                                <FiGithub /> View Code
                            </a>
                        )}
                        {project.liveUrl && (
                            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-primary text-sm py-2">
                                <FiExternalLink /> Live Demo
                            </a>
                        )}
                    </div>

                    {/* Tech stack */}
                    <div className="card p-5 mb-8">
                        <h2 className="font-bold mb-3">Tech Stack</h2>
                        <div className="flex flex-wrap gap-2">
                            {project.techStack.map(t => (
                                <span key={t} className="px-3 py-1.5 rounded-lg text-sm bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 font-medium">{t}</span>
                            ))}
                        </div>
                    </div>

                    {/* Markdown case study */}
                    {project.content && (
                        <div className="prose-portfolio">
                            <ReactMarkdown>{project.content}</ReactMarkdown>
                        </div>
                    )}

                    {/* Image gallery */}
                    {project.images?.length > 1 && (
                        <div className="mt-12">
                            <h2 className="font-bold text-xl mb-4">Screenshots</h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                {project.images.slice(1).map((img, i) => (
                                    <div key={i} className="rounded-xl overflow-hidden h-48 bg-dark-800">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={img} alt={`Screenshot ${i + 2}`} className="w-full h-full object-cover" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
}
