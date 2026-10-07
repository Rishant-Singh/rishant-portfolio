"use client";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { FiGithub, FiExternalLink, FiFilter, FiArrowRight } from "react-icons/fi";

interface Project {
    _id: string; title: string; slug: string; description: string;
    techStack: string[]; githubUrl: string; liveUrl: string; images: string[];
    category: string; featured: boolean;
}

export default function ProjectsClient({ initialProjects }: { initialProjects: Project[] }) {
    const [search, setSearch] = useState("");
    const [selectedTech, setSelectedTech] = useState("All");

    // Collect all unique tech tags
    const allTechs = useMemo(() => {
        const set = new Set<string>();
        initialProjects.forEach(p => p.techStack.forEach(t => set.add(t)));
        return ["All", ...Array.from(set).sort()];
    }, [initialProjects]);

    const filtered = useMemo(() => {
        return initialProjects.filter(p => {
            const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
                p.description.toLowerCase().includes(search.toLowerCase());
            const matchTech = selectedTech === "All" || p.techStack.includes(selectedTech);
            return matchSearch && matchTech;
        });
    }, [initialProjects, search, selectedTech]);

    return (
        <div className="pt-20 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col items-center text-center mb-16"
                >
                    <span className="tag mb-4 shadow-sm">Showcase</span>
                    <h1 className="text-5xl font-black text-zinc-900 dark:text-white tracking-tight">All Projects</h1>
                    <p className="text-zinc-500 dark:text-zinc-400 mt-4 max-w-xl text-lg font-medium leading-relaxed">
                        A collection of recursive experiments, production apps, and creative coding.
                    </p>
                </motion.div>

                {/* Filter bar */}
                <div className="flex flex-col sm:flex-row gap-6 mb-16 items-center justify-between">
                    <div className="relative group w-full max-w-xs">
                        <input
                            type="text"
                            placeholder="Search projects…"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="w-full bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl px-5 py-3 text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all placeholder:text-zinc-500"
                        />
                    </div>
                    <div className="flex flex-wrap justify-center gap-2">
                        {allTechs.slice(0, 12).map(tech => (
                            <button
                                key={tech}
                                onClick={() => setSelectedTech(tech)}
                                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 ${selectedTech === tech
                                        ? "bg-primary-500 text-white shadow-glow"
                                        : "bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:border-primary-500/50"
                                    }`}
                            >
                                {tech}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Projects Grid */}
                {filtered.length === 0 ? (
                    <div className="text-center py-32 text-zinc-400">
                        <p className="text-6xl mb-6 grayscale">🔍</p>
                        <p className="text-xl font-medium tracking-tight">No projects match your criteria.</p>
                    </div>
                ) : (
                    <AnimatePresence mode="popLayout">
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filtered.map((project, i) => (
                                <motion.div
                                    key={project._id}
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.5, delay: i * 0.05 }}
                                    className="glass-card group hover:-translate-y-2 transition-all duration-500 overflow-hidden"
                                >
                                    <div className="aspect-[16/10] bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center overflow-hidden relative">
                                        {project.images?.[0] ? (
                                            // eslint-disable-next-line @next/next/no-img-element
                                            <img src={project.images[0]} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                        ) : (
                                            <span className="text-6xl font-black gradient-text opacity-20 select-none group-hover:scale-125 transition-transform duration-700">
                                                {project.title.charAt(0)}
                                            </span>
                                        )}
                                        {project.featured && (
                                            <span className="absolute top-4 right-4 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-primary-500 border border-primary-500/20">⭐ Featured</span>
                                        )}
                                    </div>
                                    <div className="p-8">
                                        <div className="flex flex-wrap gap-1.5 mb-4">
                                            {project.techStack.slice(0, 3).map(t => (
                                                <span key={t} className="text-[10px] font-black uppercase tracking-widest text-primary-500/70">{t}</span>
                                            ))}
                                        </div>
                                        <h3 className="text-xl font-black mb-2 text-zinc-900 dark:text-white tracking-tight group-hover:text-primary-500 transition-colors">{project.title}</h3>
                                        <p className="text-sm text-zinc-500 dark:text-zinc-400 line-clamp-2 mb-6 font-medium leading-relaxed">{project.description}</p>
                                        
                                        <div className="flex items-center justify-between pt-6 border-t border-zinc-100 dark:border-zinc-800">
                                            <Link href={`/projects/${project.slug}`} className="text-xs font-black uppercase tracking-widest text-primary-500 hover:text-primary-400 transition-colors flex items-center gap-2">
                                                View Case <FiArrowRight />
                                            </Link>
                                            <div className="flex gap-4">
                                                {project.githubUrl && (
                                                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-all"><FiGithub size={18} /></a>
                                                )}
                                                {project.liveUrl && (
                                                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-all"><FiExternalLink size={18} /></a>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </AnimatePresence>
                )}
            </div>
        </div>
    );
}
