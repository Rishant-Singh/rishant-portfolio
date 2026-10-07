"use client";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import dynamic from "next/dynamic";
import { FiDownload, FiArrowRight, FiGithub } from "react-icons/fi";

// Lazy-load Three.js to avoid SSR issues
const ThreeScene = dynamic(() => import("@/components/three/ThreeScene"), { ssr: false });

const techStack = ["Python", "FastAPI", "React.js", "Node.js", "PostgreSQL", "MongoDB", "Docker", "Antigravity"];

export default function HeroSection() {
    const [hoveredTech, setHoveredTech] = useState<string | null>(null);

    return (
        <section className="relative min-h-screen flex items-center overflow-hidden bg-dark-900">
            {/* 3D Background */}
            <ThreeScene />

            {/* Glow overlay */}
            <div className="absolute inset-0 bg-hero-glow z-10 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark-900/50 to-dark-900 z-10 pointer-events-none" />

            {/* Content */}
            <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
                <div className="max-w-3xl">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-card text-xs font-medium text-primary-400 mb-6 border-white/20"
                    >
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        Available for new projects
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="text-5xl sm:text-6xl md:text-8xl font-black text-white leading-[1.1] tracking-tight"
                    >
                        Full-Stack
                        <br />
                        <span className="gradient-text">Developer</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                        className="mt-8 text-lg md:text-xl text-zinc-400 max-w-xl leading-relaxed font-medium"
                    >
                        Aspiring Software Engineer &amp; Full-Stack Developer with hands-on experience building scalable applications using Python, React, FastAPI, SQL, Git, and Docker.
                    </motion.p>

                    {/* Tech stack badges */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="mt-8 flex flex-wrap gap-2"
                    >
                        {techStack.map((tech, i) => (
                            <motion.span
                                key={tech}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.3 + i * 0.05 }}
                                onMouseEnter={() => setHoveredTech(tech)}
                                onMouseLeave={() => setHoveredTech(null)}
                                className={`px-3 py-1 rounded-lg text-xs font-semibold border transition-all duration-300 cursor-default ${hoveredTech === tech
                                        ? "bg-primary-500/20 border-primary-500/50 text-white translate-y-[-2px]"
                                        : "bg-white/5 border-white/10 text-zinc-400"
                                    }`}
                            >
                                {tech}
                            </motion.span>
                        ))}
                    </motion.div>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="mt-12 flex flex-wrap gap-4"
                    >
                        <Link href="/projects" className="btn-primary px-8 py-4 text-base shadow-glow group">
                            Explore Work <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <a href="/resume.pdf" download="Rishant_Kumar_Singh_Resume.pdf" className="btn-secondary px-8 py-4 text-base glass-card">
                            <FiDownload /> Resume
                        </a>
                        <a href="https://github.com/Rishant-Singh" target="_blank" rel="noopener noreferrer" className="btn-secondary p-4 glass-card" aria-label="GitHub Profile">
                            <FiGithub size={20} />
                        </a>
                    </motion.div>
                </div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-gray-400 text-xs"
            >
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-5 h-8 rounded-full border-2 border-gray-500 flex items-start justify-center p-1"
                >
                    <div className="w-1 h-1.5 rounded-full bg-gray-400" />
                </motion.div>
                scroll
            </motion.div>
        </section>
    );
}
