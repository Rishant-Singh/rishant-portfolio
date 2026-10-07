"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiGithub, FiStar, FiGitBranch, FiExternalLink } from "react-icons/fi";

interface Repo {
    id: number;
    name: string;
    description: string | null;
    html_url: string;
    stargazers_count: number;
    forks_count: number;
    language: string | null;
    topics: string[];
}

const LANG_COLORS: Record<string, string> = {
    TypeScript: "#3178c6", JavaScript: "#f7df1e", Python: "#3572A5",
    Rust: "#dea584", Go: "#00ADD8", CSS: "#563d7c", HTML: "#e34c26",
};

export default function GitHubSection() {
    const [repos, setRepos] = useState<Repo[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/github").then(r => r.json()).then(d => {
            setRepos(d.data || []);
            setLoading(false);
        }).catch(() => setLoading(false));
    }, []);

    return (
        <section className="py-24 bg-white dark:bg-dark-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="tag mb-4">Open Source</span>
                    <h2 className="section-title flex items-center justify-center gap-3">
                        <FiGithub /> Latest GitHub Activity
                    </h2>
                </motion.div>

                {loading ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="card p-5 animate-pulse h-40">
                                <div className="h-4 bg-gray-200 dark:bg-dark-600 rounded mb-3 w-3/4" />
                                <div className="h-3 bg-gray-200 dark:bg-dark-600 rounded w-full mb-2" />
                                <div className="h-3 bg-gray-200 dark:bg-dark-600 rounded w-2/3" />
                            </div>
                        ))}
                    </div>
                ) : repos.length === 0 ? (
                    <p className="text-center text-gray-400">GitHub data unavailable. Please configure GITHUB_USERNAME in .env.local</p>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {repos.map((repo, i) => (
                            <motion.a
                                key={repo.id}
                                href={repo.html_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.06 }}
                                className="glass-card p-6 hover:-translate-y-1.5 transition-all duration-300 block group"
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <h3 className="font-bold text-sm tracking-tight group-hover:text-primary-400 transition-colors truncate">
                                        {repo.name}
                                    </h3>
                                    <FiExternalLink size={14} className="shrink-0 text-zinc-500 opacity-0 group-hover:opacity-100 transition-opacity ml-2" />
                                </div>
                                <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 mb-4 leading-relaxed h-8">
                                    {repo.description || "No description provided"}
                                </p>
                                <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                                    {repo.language && (
                                        <span className="flex items-center gap-1">
                                            <span
                                                className="w-2.5 h-2.5 rounded-full"
                                                style={{ background: LANG_COLORS[repo.language] || "#888" }}
                                            />
                                            {repo.language}
                                        </span>
                                    )}
                                    <span className="flex items-center gap-1"><FiStar size={12} />{repo.stargazers_count}</span>
                                    <span className="flex items-center gap-1"><FiGitBranch size={12} />{repo.forks_count}</span>
                                </div>
                            </motion.a>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
