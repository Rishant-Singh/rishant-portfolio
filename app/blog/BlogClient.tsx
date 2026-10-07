"use client";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { format } from "date-fns";
import { FiClock, FiEye, FiTag, FiArrowRight } from "react-icons/fi";

interface Blog {
    _id: string; title: string; slug: string; excerpt: string;
    tags: string[]; category: string; coverImage: string;
    views: number; createdAt: string;
}

export default function BlogClient({ initialBlogs }: { initialBlogs: Blog[] }) {
    const [selectedTag, setSelectedTag] = useState("All");
    const [search, setSearch] = useState("");

    const allTags = useMemo(() => {
        const set = new Set<string>();
        initialBlogs.forEach(b => b.tags.forEach(t => set.add(t)));
        return ["All", ...Array.from(set)];
    }, [initialBlogs]);

    const filtered = useMemo(() => {
        return initialBlogs.filter(b => {
            const matchSearch = b.title.toLowerCase().includes(search.toLowerCase());
            const matchTag = selectedTag === "All" || b.tags.includes(selectedTag);
            return matchSearch && matchTag;
        });
    }, [initialBlogs, search, selectedTag]);

    return (
        <div className="pt-20 min-h-screen">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col items-center text-center mb-16"
                >
                    <span className="tag mb-4 shadow-sm">Journal</span>
                    <h1 className="text-5xl font-black text-zinc-900 dark:text-white tracking-tight">Writing</h1>
                    <p className="text-zinc-500 dark:text-zinc-400 mt-4 max-w-xl text-lg font-medium leading-relaxed">
                        Thoughts, tutorials, and technical deep-dives into the world of development.
                    </p>
                </motion.div>

                <div className="flex flex-col sm:flex-row gap-6 mb-16 items-center justify-between">
                    <div className="relative group w-full max-w-xs">
                        <input
                            type="text"
                            placeholder="Search posts…"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="w-full bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl px-5 py-3 text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all placeholder:text-zinc-500"
                        />
                    </div>
                    <div className="flex flex-wrap justify-center gap-2">
                        {allTags.map(tag => (
                            <button
                                key={tag}
                                onClick={() => setSelectedTag(tag)}
                                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 ${selectedTag === tag
                                        ? "bg-primary-500 text-white shadow-glow"
                                        : "bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:border-primary-500/50"
                                    }`}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>

                {filtered.length === 0 ? (
                    <div className="text-center py-32 text-zinc-400">
                        <p className="text-6xl mb-6 grayscale">📝</p>
                        <p className="text-xl font-medium tracking-tight">No posts match your search.</p>
                    </div>
                ) : (
                    <div className="space-y-8">
                        {filtered.map((blog, i) => (
                            <motion.article
                                key={blog._id}
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.05 }}
                                className="glass-card p-8 flex flex-col md:flex-row gap-8 group hover:-translate-y-1.5 transition-all duration-500"
                            >
                                {blog.coverImage && (
                                    <div className="w-full md:w-56 h-40 rounded-2xl overflow-hidden shrink-0 bg-zinc-100 dark:bg-zinc-900">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={blog.coverImage} alt={blog.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                    </div>
                                )}
                                <div className="flex-1 min-w-0">
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {blog.tags.slice(0, 3).map(t => (
                                            <span key={t} className="text-[10px] font-black uppercase tracking-widest text-primary-500/70">{t}</span>
                                        ))}
                                    </div>
                                    <Link href={`/blog/${blog.slug}`}>
                                        <h2 className="text-2xl font-black mb-3 text-zinc-900 dark:text-white tracking-tight group-hover:text-primary-500 transition-colors line-clamp-2">
                                            {blog.title}
                                        </h2>
                                    </Link>
                                    <p className="text-sm text-zinc-500 dark:text-zinc-400 line-clamp-2 mb-6 font-medium leading-relaxed">{blog.excerpt}</p>
                                    
                                    <div className="flex items-center gap-6 text-[10px] font-bold uppercase tracking-widest text-zinc-400 border-t border-zinc-100 dark:border-zinc-800/50 pt-6">
                                        <span className="flex items-center gap-2">
                                            <FiClock className="text-primary-500" /> {format(new Date(blog.createdAt), "MMM d, yyyy")}
                                        </span>
                                        <span className="flex items-center gap-2">
                                            <FiEye className="text-primary-500" /> {blog.views} views
                                        </span>
                                        <Link href={`/blog/${blog.slug}`} className="ml-auto text-primary-500 hover:text-primary-400 transition-colors flex items-center gap-2">
                                            Read More <FiArrowRight />
                                        </Link>
                                    </div>
                                </div>
                            </motion.article>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
