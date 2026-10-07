"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { SKILL_CATEGORIES } from "@/lib/skillsData";

export default function SkillsOverview() {
    return (
        <section className="py-24 bg-zinc-50/70 dark:bg-dark-800/40 relative overflow-hidden transition-colors">
            {/* Background Accent Gradients */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary-600/10 dark:bg-primary-600/15 blur-[120px] rounded-full pointer-events-none" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-3xl mx-auto mb-16"
                >
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-primary-500/10 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 border border-primary-500/20 mb-4">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary-500 animate-pulse" />
                        Tech Stack
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-zinc-900 dark:text-white tracking-tight mb-4">
                        Skills &amp; Technologies
                    </h2>
                    <p className="text-zinc-600 dark:text-zinc-400 text-base sm:text-lg">
                        Languages, frameworks, databases, and tools powering my full-stack workflow.
                    </p>
                </motion.div>

                {/* Categories Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {SKILL_CATEGORIES.map((category, catIdx) => (
                        <motion.div
                            key={category.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: catIdx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                            className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-dark-900/80 border border-zinc-200/80 dark:border-white/10 hover:border-zinc-300 dark:hover:border-white/20 shadow-sm hover:shadow-xl dark:shadow-none transition-all duration-300 flex flex-col justify-between"
                        >
                            <div>
                                {/* Category Header */}
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-primary-500/10 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 flex items-center justify-center text-lg font-bold border border-primary-500/20">
                                            {category.iconSymbol}
                                        </div>
                                        <h3 className="font-bold text-lg text-zinc-900 dark:text-white tracking-tight">
                                            {category.title}
                                        </h3>
                                    </div>
                                    <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-zinc-100 dark:bg-dark-700 text-zinc-500 dark:text-zinc-400">
                                        {category.badge}
                                    </span>
                                </div>

                                {/* Skills Pill Grid */}
                                <div className="grid grid-cols-2 gap-3">
                                    {category.skills.map((skill) => {
                                        const Icon = skill.icon;
                                        const isGitHub = skill.name === "GitHub";

                                        return (
                                            <div
                                                key={skill.name}
                                                className="group relative flex items-center gap-3 p-2.5 rounded-xl bg-zinc-50 dark:bg-dark-800/70 border border-zinc-200/60 dark:border-white/5 hover:border-zinc-300 dark:hover:border-white/20 hover:bg-zinc-100/80 dark:hover:bg-dark-700/80 transition-all duration-200"
                                            >
                                                <div className="w-8 h-8 rounded-lg bg-white dark:bg-dark-900 flex items-center justify-center text-lg shrink-0 shadow-sm transition-transform duration-200 group-hover:scale-110">
                                                    <Icon
                                                        style={{ color: isGitHub ? undefined : skill.color }}
                                                        className={isGitHub ? "text-zinc-900 dark:text-white" : ""}
                                                    />
                                                </div>
                                                <span className="text-xs sm:text-sm font-semibold text-zinc-800 dark:text-zinc-200 truncate">
                                                    {skill.name}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* View All Skills Button */}
                <div className="text-center mt-12 sm:mt-16">
                    <Link
                        href="/skills"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm bg-primary-600 hover:bg-primary-500 text-white shadow-lg shadow-primary-600/25 transition-all duration-200 hover:-translate-y-0.5"
                    >
                        Explore Full Tech Stack &rarr;
                    </Link>
                </div>
            </div>
        </section>
    );
}
