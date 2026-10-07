"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { FiExternalLink, FiGithub } from "react-icons/fi";

interface Project {
    _id: string;
    title: string;
    description: string;
    techStack: string[];
    githubUrl: string;
    liveUrl: string;
    images: string[];
    slug: string;
}

interface Props {
    projects: Project[];
}

export default function FeaturedProjects({ projects }: Props) {
    if (!projects.length) return null;

    return (
        <section className="py-24 bg-white dark:bg-dark-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="tag mb-4">Featured Work</span>
                    <h2 className="section-title">Projects I'm Proud Of</h2>
                    <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
                        A collection of things I've built — each one a story of challenges, solutions, and learnings.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project, i) => (
                        <motion.div
                            key={project._id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="card group hover:-translate-y-1"
                        >
                            {/* Project image / placeholder */}
                            <div className="h-48 bg-gradient-to-br from-primary-600/20 to-accent-600/20 rounded-t-2xl flex items-center justify-center overflow-hidden">
                                {project.images?.[0] ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img src={project.images[0]} alt={project.title} className="w-full h-full object-cover" />
                                ) : (
                                    <span className="text-4xl font-black gradient-text opacity-40">
                                        {project.title.charAt(0)}
                                    </span>
                                )}
                            </div>

                            <div className="p-6">
                                <h3 className="font-bold text-lg mb-2 group-hover:text-primary-500 transition-colors">
                                    {project.title}
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-4">
                                    {project.description}
                                </p>

                                {/* Tech stack */}
                                <div className="flex flex-wrap gap-1.5 mb-4">
                                    {project.techStack.slice(0, 4).map((tech) => (
                                        <span key={tech} className="px-2 py-0.5 rounded-md text-xs bg-gray-100 dark:bg-dark-600 text-gray-600 dark:text-gray-300">
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                {/* Links */}
                                <div className="flex items-center gap-3">
                                    <Link href={`/projects/${project.slug}`} className="flex-1 text-center text-sm font-medium text-primary-500 hover:text-primary-400 transition-colors">
                                        View Case Study →
                                    </Link>
                                    {project.githubUrl && (
                                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                                            className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-dark-600 transition-all">
                                            <FiGithub size={16} />
                                        </a>
                                    )}
                                    {project.liveUrl && (
                                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                                            className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-dark-600 transition-all">
                                            <FiExternalLink size={16} />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <Link href="/projects" className="btn-secondary">
                        View All Projects →
                    </Link>
                </div>
            </div>
        </section>
    );
}
