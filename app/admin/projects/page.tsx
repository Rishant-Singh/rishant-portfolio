"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { FiPlus, FiEdit2, FiTrash2, FiStar } from "react-icons/fi";

interface Project { _id: string; title: string; description: string; techStack: string[]; featured: boolean; category: string; githubUrl: string; liveUrl: string; }
const emptyProject = { title: "", description: "", content: "", techStack: "", githubUrl: "", liveUrl: "", category: "Web Development", featured: false };

export default function AdminProjects() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [modal, setModal] = useState(false);
    const [editing, setEditing] = useState<string | null>(null);
    const [form, setForm] = useState<typeof emptyProject>(emptyProject);

    const load = () => {
        fetch("/api/projects").then(r => r.json()).then(d => { setProjects(d.data || []); setLoading(false); });
    };
    useEffect(() => { load(); }, []);

    const openAdd = () => { setEditing(null); setForm(emptyProject); setModal(true); };
    const openEdit = (p: Project) => {
        setEditing(p._id);
        setForm({ title: p.title, description: p.description, content: "", techStack: p.techStack.join(", "), githubUrl: p.githubUrl, liveUrl: p.liveUrl, category: p.category, featured: p.featured });
        setModal(true);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        const payload = { ...form, techStack: form.techStack.split(",").map(t => t.trim()).filter(Boolean) };
        const url = editing ? `/api/projects/${editing}` : "/api/projects";
        const method = editing ? "PUT" : "POST";
        const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
        const data = await res.json();
        if (data.success) {
            toast.success(editing ? "Project updated!" : "Project created!");
            setModal(false); load();
        } else { toast.error(data.error || "Failed"); }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this project?")) return;
        await fetch(`/api/projects/${id}`, { method: "DELETE" });
        toast.success("Deleted"); load();
    };

    return (
        <div className="p-6 lg:p-8">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-black text-white">Projects</h1>
                    <p className="text-gray-400 text-sm mt-1">Manage your portfolio projects</p>
                </div>
                <button onClick={openAdd} className="btn-primary text-sm py-2"><FiPlus /> Add Project</button>
            </div>

            {loading ? (
                <div className="space-y-3">{[...Array(3)].map((_, i) => <div key={i} className="h-16 rounded-xl bg-dark-700 animate-pulse" />)}</div>
            ) : projects.length === 0 ? (
                <div className="text-center py-20 text-gray-400"><p className="text-4xl mb-3">📂</p><p>No projects yet. Add your first one!</p></div>
            ) : (
                <div className="space-y-3">
                    {projects.map(p => (
                        <div key={p._id} className="admin-card flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-primary-600/20 flex items-center justify-center text-primary-400 font-bold shrink-0">
                                {p.title.charAt(0)}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                    <h3 className="font-semibold text-white truncate">{p.title}</h3>
                                    {p.featured && <FiStar className="text-amber-400 shrink-0" size={14} />}
                                </div>
                                <p className="text-xs text-gray-400 truncate">{p.techStack.join(", ")}</p>
                            </div>
                            <div className="flex gap-2 shrink-0">
                                <button onClick={() => openEdit(p)} className="p-2 rounded-lg text-gray-400 hover:text-primary-400 hover:bg-primary-900/20 transition-all"><FiEdit2 size={15} /></button>
                                <button onClick={() => handleDelete(p._id)} className="p-2 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-900/20 transition-all"><FiTrash2 size={15} /></button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal */}
            <AnimatePresence>
                {modal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                            className="admin-card w-full max-w-xl max-h-[90vh] overflow-y-auto">
                            <h2 className="text-lg font-bold text-white mb-6">{editing ? "Edit" : "Add"} Project</h2>
                            <form onSubmit={handleSave} className="space-y-4">
                                <div><label className="block text-sm font-medium mb-1.5">Title</label>
                                    <input required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="input" placeholder="Project Name" /></div>
                                <div><label className="block text-sm font-medium mb-1.5">Description</label>
                                    <textarea required rows={3} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="input resize-none" /></div>
                                <div><label className="block text-sm font-medium mb-1.5">Tech Stack (comma separated)</label>
                                    <input value={form.techStack} onChange={e => setForm({ ...form, techStack: e.target.value })} className="input" placeholder="React, Node.js, MongoDB" /></div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div><label className="block text-sm font-medium mb-1.5">GitHub URL</label>
                                        <input value={form.githubUrl} onChange={e => setForm({ ...form, githubUrl: e.target.value })} className="input" placeholder="https://github.com/…" /></div>
                                    <div><label className="block text-sm font-medium mb-1.5">Live URL</label>
                                        <input value={form.liveUrl} onChange={e => setForm({ ...form, liveUrl: e.target.value })} className="input" placeholder="https://…" /></div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <input type="checkbox" id="featured" checked={form.featured} onChange={e => setForm({ ...form, featured: e.target.checked })} className="w-4 h-4 accent-indigo-500" />
                                    <label htmlFor="featured" className="text-sm">Mark as featured</label>
                                </div>
                                <div className="flex gap-3 pt-2">
                                    <button type="button" onClick={() => setModal(false)} className="btn-secondary flex-1 justify-center text-sm py-2">Cancel</button>
                                    <button type="submit" className="btn-primary flex-1 justify-center text-sm py-2">Save</button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
