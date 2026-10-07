"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { format } from "date-fns";
import { FiArrowLeft, FiClock, FiEye } from "react-icons/fi";

export default function BlogPost({ blog }: { blog: any }) {
    return (
        <div className="pt-20 min-h-screen bg-white dark:bg-dark-900">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-primary-400 transition-colors mb-8">
                        <FiArrowLeft /> Back to Blog
                    </Link>

                    {blog.coverImage && (
                        <div className="rounded-2xl overflow-hidden h-64 bg-dark-800 mb-8">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={blog.coverImage} alt={blog.title} className="w-full h-full object-cover" />
                        </div>
                    )}

                    <div className="flex flex-wrap gap-2 mb-4">
                        {blog.tags.map((t: string) => <span key={t} className="tag text-xs">{t}</span>)}
                    </div>

                    <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-4">{blog.title}</h1>

                    <div className="flex items-center gap-4 text-sm text-gray-400 mb-10 pb-8 border-b border-gray-100 dark:border-white/10">
                        <span className="flex items-center gap-1"><FiClock size={14} />{format(new Date(blog.createdAt), "MMMM d, yyyy")}</span>
                        <span className="flex items-center gap-1"><FiEye size={14} />{blog.views} views</span>
                    </div>

                    <div className="prose-portfolio">
                        <ReactMarkdown>{blog.content}</ReactMarkdown>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
