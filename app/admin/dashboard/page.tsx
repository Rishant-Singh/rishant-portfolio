"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiFolder, FiFileText, FiStar, FiMessageSquare, FiEye } from "react-icons/fi";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { format } from "date-fns";

const COLORS = ["#6366f1", "#8b5cf6", "#a78bfa", "#c4b5fd", "#ddd6fe"];

export default function AdminDashboard() {
    const [stats, setStats] = useState({ projects: 0, blogs: 0, skills: 0, messages: 0 });
    const [recentMessages, setRecentMessages] = useState<any[]>([]);
    const [blogViews, setBlogViews] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([
            fetch("/api/projects").then(r => r.json()),
            fetch("/api/blogs?all=true").then(r => r.json()),
            fetch("/api/skills").then(r => r.json()),
            fetch("/api/contact").then(r => r.json()),
        ]).then(([projects, blogs, skills, messages]) => {
            setStats({
                projects: projects.data?.length || 0,
                blogs: blogs.data?.length || 0,
                skills: skills.data?.length || 0,
                messages: messages.data?.length || 0,
            });
            setRecentMessages((messages.data || []).slice(0, 5));
            setBlogViews((blogs.data || []).slice(0, 6).map((b: any) => ({ name: b.title.slice(0, 20) + "…", views: b.views })));
            setLoading(false);
        });
    }, []);

    const statCards = [
        { label: "Projects", value: stats.projects, icon: FiFolder, color: "from-blue-600/20 to-blue-600/5", textColor: "text-blue-400" },
        { label: "Blog Posts", value: stats.blogs, icon: FiFileText, color: "from-purple-600/20 to-purple-600/5", textColor: "text-purple-400" },
        { label: "Skills", value: stats.skills, icon: FiStar, color: "from-amber-600/20 to-amber-600/5", textColor: "text-amber-400" },
        { label: "Messages", value: stats.messages, icon: FiMessageSquare, color: "from-green-600/20 to-green-600/5", textColor: "text-green-400" },
    ];

    if (loading) {
        return (
            <div className="p-8">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-pulse">
                    {[...Array(4)].map((_, i) => <div key={i} className="h-28 rounded-2xl bg-dark-700" />)}
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 lg:p-8">
            <div className="mb-8">
                <h1 className="text-2xl font-black text-white">Dashboard</h1>
                <p className="text-gray-400 text-sm mt-1">Welcome back! Here&apos;s what&apos;s going on.</p>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {statCards.map(({ label, value, icon: Icon, color, textColor }, i) => (
                    <motion.div key={label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                        className={`admin-card bg-gradient-to-br ${color}`}>
                        <div className={`text-3xl font-black mb-1 ${textColor}`}>{value}</div>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                            <Icon size={14} /> {label}
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                {/* Blog Views Chart */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                    className="admin-card">
                    <h2 className="font-bold mb-4 flex items-center gap-2"><FiEye /> Blog Performance</h2>
                    {blogViews.length === 0 ? (
                        <p className="text-gray-400 text-sm">No blog posts yet.</p>
                    ) : (
                        <ResponsiveContainer width="100%" height={200}>
                            <BarChart data={blogViews}>
                                <XAxis dataKey="name" tick={{ fontSize: 10, fill: "#9ca3af" }} />
                                <YAxis tick={{ fontSize: 10, fill: "#9ca3af" }} />
                                <Tooltip contentStyle={{ background: "#1a1a27", border: "1px solid rgba(255,255,255,.1)", borderRadius: 8 }} />
                                <Bar dataKey="views" radius={[4, 4, 0, 0]}>
                                    {blogViews.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    )}
                </motion.div>

                {/* Recent Messages */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                    className="admin-card">
                    <h2 className="font-bold mb-4 flex items-center gap-2"><FiMessageSquare /> Recent Messages</h2>
                    {recentMessages.length === 0 ? (
                        <p className="text-gray-400 text-sm">No messages yet.</p>
                    ) : (
                        <div className="space-y-3">
                            {recentMessages.map(msg => (
                                <div key={msg._id} className="flex items-start gap-3 p-3 rounded-xl bg-dark-700/50">
                                    <div className="w-8 h-8 rounded-lg bg-primary-600/20 flex items-center justify-center shrink-0 text-primary-400 font-bold text-sm">
                                        {msg.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-sm font-medium text-white truncate">{msg.name}</p>
                                        <p className="text-xs text-gray-400 truncate">{msg.subject}</p>
                                    </div>
                                    <span className="text-xs text-gray-500 shrink-0">
                                        {format(new Date(msg.createdAt), "MMM d")}
                                    </span>
                                    {!msg.read && <span className="w-2 h-2 rounded-full bg-primary-500 shrink-0 mt-1.5" />}
                                </div>
                            ))}
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
}
