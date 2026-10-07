"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SKILL_CATEGORIES, SkillCategory, SkillItem } from "@/lib/skillsData";

function SkillCard({ skill, index }: { skill: SkillItem; index: number }) {
    const Icon = skill.icon;
    const isGitHub = skill.name === "GitHub";

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            className="group relative flex flex-col items-center justify-center p-6 rounded-2xl bg-white dark:bg-dark-800/90 border border-zinc-200/80 dark:border-white/10 hover:border-zinc-300 dark:hover:border-white/25 shadow-sm hover:shadow-xl dark:shadow-none transition-all duration-300 overflow-hidden"
        >
            {/* Ambient Brand Glow on Hover */}
            <div
                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none rounded-2xl"
                style={{ backgroundColor: skill.color }}
            />

            {/* Icon Wrapper */}
            <div className="relative w-14 h-14 rounded-2xl bg-zinc-100/90 dark:bg-dark-700/80 border border-zinc-200/60 dark:border-white/5 flex items-center justify-center text-3xl mb-3.5 transition-transform duration-300 group-hover:scale-110 shadow-inner">
                <Icon
                    style={{ color: isGitHub ? undefined : skill.color }}
                    className={isGitHub ? "text-zinc-900 dark:text-white" : ""}
                />
            </div>

            {/* Skill Name */}
            <span className="font-semibold text-sm text-zinc-800 dark:text-zinc-100 tracking-tight text-center transition-colors duration-200">
                {skill.name}
            </span>
        </motion.div>
    );
}

export default function SkillsClient() {
    const [activeTab, setActiveTab] = useState<string>("all");

    const filteredCategories =
        activeTab === "all"
            ? SKILL_CATEGORIES
            : SKILL_CATEGORIES.filter((cat) => cat.id === activeTab);

    return (
        <div className="pt-24 min-h-screen bg-zinc-50 dark:bg-dark-900 transition-colors">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-3xl mx-auto mb-14"
                >
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-primary-500/10 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 border border-primary-500/20 mb-4">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary-500 animate-pulse" />
                        Technical Stack
                    </span>
                    <h1 className="text-4xl sm:text-5xl font-black text-zinc-900 dark:text-white tracking-tight mb-4">
                        Skills &amp; Technologies
                    </h1>
                    <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
                        Core languages, frameworks, databases, and engineering tools I work with daily to design and build production-grade software.
                    </p>
                </motion.div>

                {/* Filter Tabs */}
                <div className="flex flex-wrap items-center justify-center gap-2 mb-16">
                    <button
                        onClick={() => setActiveTab("all")}
                        className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                            activeTab === "all"
                                ? "bg-primary-600 text-white shadow-md shadow-primary-600/25"
                                : "bg-white dark:bg-dark-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white border border-zinc-200 dark:border-white/10"
                        }`}
                    >
                        All Categories
                    </button>
                    {SKILL_CATEGORIES.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveTab(cat.id)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                                activeTab === cat.id
                                    ? "bg-primary-600 text-white shadow-md shadow-primary-600/25"
                                    : "bg-white dark:bg-dark-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white border border-zinc-200 dark:border-white/10"
                            }`}
                        >
                            <span>{cat.iconSymbol}</span>
                            <span>{cat.title}</span>
                        </button>
                    ))}
                </div>

                {/* Categories Sections */}
                <div className="space-y-14">
                    <AnimatePresence mode="wait">
                        {filteredCategories.map((category) => (
                            <motion.section
                                key={category.id}
                                initial={{ opacity: 0, y: 24 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.4 }}
                                className="p-8 sm:p-10 rounded-3xl bg-white/60 dark:bg-dark-800/50 border border-zinc-200/80 dark:border-white/10 backdrop-blur-md shadow-sm"
                            >
                                {/* Category Header */}
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-zinc-200/70 dark:border-white/5">
                                    <div className="flex items-center gap-3.5">
                                        <div className="w-12 h-12 rounded-2xl bg-primary-500/10 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 flex items-center justify-center text-xl font-bold border border-primary-500/20 shadow-inner">
                                            {category.iconSymbol}
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight">
                                                {category.title}
                                            </h2>
                                            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
                                                {category.description}
                                            </p>
                                        </div>
                                    </div>
                                    <span className="self-start sm:self-center px-3 py-1 rounded-full text-xs font-semibold bg-zinc-100 dark:bg-dark-700 text-zinc-600 dark:text-zinc-300 border border-zinc-200/60 dark:border-white/10">
                                        {category.skills.length} Technologies
                                    </span>
                                </div>

                                {/* Skills Grid */}
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5">
                                    {category.skills.map((skill, index) => (
                                        <SkillCard key={skill.name} skill={skill} index={index} />
                                    ))}
                                </div>
                            </motion.section>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
