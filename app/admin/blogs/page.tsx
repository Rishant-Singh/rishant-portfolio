"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { FiPlus, FiEdit2, FiTrash2, FiEye, FiEyeOff } from "react-icons/fi";
import dynamic from "next/dynamic";
import { format } from "date-fns";

// Lazy load the markdown editor (large bundle)
const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

interface Blog { _id: string; title: string; excerpt: string; tags: string[]; published: boolean; views: number; createdAt: string; }
const emptyBlog = { title: "", excerpt: "", content: "", tags: "", category: "General", coverImage: "", published: false };

export default function AdminBlogs() {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);
    const [modal, setModal] = useState(false);
    const [editing, setEditing] = useState<string | null>(null);
    const [form, setForm] = useState<typeof emptyBlog>(emptyBlog);
    const [content, setContent] = useState("");

    const load = () => {
        fetch("/api/blogs?all=true").then(r => r.json()).then(d => { setBlogs(d.data || []); setLoading(false); });
    };
    useEffect(() => { load(); }, []);

    const openAdd = () => { setEditing(null); setForm(emptyBlog); setContent(""); setModal(true); };
    const openEdit = (b: Blog) => {
        setEditing(b._id);
        setForm({ title: b.title, excerpt: b.excerpt, content: "", tags: b.tags.join(", "), category: "General", coverImage: "", published: b.published });
        fetch(`/api/blogs/${b._id}`).then(r => r.json()).then(d => setContent(d.data?.content || ""));
        setModal(true);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        const payload = { ...form, content, tags: form.tags.split(",").map(t => t.trim()).filter(Boolean) };
        const url = editing ? `/api/blogs/${editing}` : "/api/blogs";
        const method = editing ? "PUT" : "POST";
        const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
        const data = await res.json();
        if (data.success) { toast.success(editing ? "Post updated!" : "Post created!"); setModal(false); load(); }
        else toast.error(data.error || "Failed");
    };

    const togglePublish = async (b: Blog) => {
        await fetch(`/api/blogs/${b._id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ published: !b.published }) });
        toast.success(b.published ? "Unpublished" : "Published"); load();
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this post?")) return;
        await fetch(`/api/blogs/${id}`, { method: "DELETE" });
        toast.success("Deleted"); load();
    };

    return (
        <div className="p-6 lg:p-8">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-black text-white">Blog Posts</h1>
                    <p className="text-gray-400 text-sm mt-1">Write and manage your blog posts</p>
                </div>
                <button onClick={openAdd} className="btn-primary text-sm py-2"><FiPlus /> New Post</button>
            </div>

            {loading ? (
                <div className="space-y-3">{[...Array(3)].map((_, i) => <div key={i} className="h-16 rounded-xl bg-dark-700 animate-pulse" />)}</div>
            ) : blogs.length === 0 ? (
                <div className="text-center py-20 text-gray-400"><p className="text-4xl mb-3">📝</p><p>No posts yet. Write your first article!</p></div>
            ) : (
                <div className="space-y-3">
                    {blogs.map(b => (
                        <div key={b._id} className="admin-card flex items-center gap-4">
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                    <h3 className="font-semibold text-white truncate">{b.title}</h3>
                                    <span className={`px-2 py-0.5 rounded text-xs ${b.published ? "bg-green-900/40 text-green-400" : "bg-gray-700 text-gray-400"}`}>
                                        {b.published ? "Published" : "Draft"}
                                    </span>
                                </div>
                                <p className="text-xs text-gray-400">{format(new Date(b.createdAt), "MMM d, yyyy")} · {b.views} views</p>
                            </div>
                            <div className="flex gap-2 shrink-0">
                                <button onClick={() => togglePublish(b)} title={b.published ? "Unpublish" : "Publish"}
                                    className="p-2 rounded-lg text-gray-400 hover:text-green-400 hover:bg-green-900/20 transition-all">
                                    {b.published ? <FiEyeOff size={15} /> : <FiEye size={15} />}
                                </button>
                                <button onClick={() => openEdit(b)} className="p-2 rounded-lg text-gray-400 hover:text-primary-400 hover:bg-primary-900/20 transition-all"><FiEdit2 size={15} /></button>
                                <button onClick={() => handleDelete(b._id)} className="p-2 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-900/20 transition-all"><FiTrash2 size={15} /></button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Blog Editor Modal */}
            <AnimatePresence>
                {modal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                            className="admin-card w-full max-w-4xl max-h-[92vh] flex flex-col">
                            <div className="flex items-center justify-between mb-4 shrink-0">
                                <h2 className="text-lg font-bold text-white">{editing ? "Edit Post" : "New Post"}</h2>
                                <button onClick={() => setModal(false)} className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-dark-600 transition-all">✕</button>
                            </div>
                            <form onSubmit={handleSave} className="flex flex-col flex-1 gap-4 overflow-hidden">
                                <div className="grid grid-cols-2 gap-4 shrink-0">
                                    <div><label className="block text-sm font-medium mb-1">Title</label>
                                        <input required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="input" /></div>
                                    <div><label className="block text-sm font-medium mb-1">Tags (comma separated)</label>
                                        <input value={form.tags} onChange={e => setForm({ ...form, tags: e.target.value })} className="input" placeholder="react, nextjs" /></div>
                                </div>
                                <div className="shrink-0">
                                    <label className="block text-sm font-medium mb-1">Excerpt</label>
                                    <textarea rows={2} required value={form.excerpt} onChange={e => setForm({ ...form, excerpt: e.target.value })} className="input resize-none" />
                                </div>
                                <div className="flex-1 min-h-0" data-color-mode="dark">
                                    <label className="block text-sm font-medium mb-1">Content (Markdown)</label>
                                    <MDEditor value={content} onChange={v => setContent(v || "")} height={280} />
                                </div>
                                <div className="flex items-center justify-between shrink-0 pt-2">
                                    <div className="flex items-center gap-3">
                                        <input type="checkbox" id="published" checked={form.published} onChange={e => setForm({ ...form, published: e.target.checked })} className="w-4 h-4 accent-indigo-500" />
                                        <label htmlFor="published" className="text-sm">Publish immediately</label>
                                    </div>
                                    <div className="flex gap-3">
                                        <button type="button" onClick={() => setModal(false)} className="btn-secondary text-sm py-2">Cancel</button>
                                        <button type="submit" className="btn-primary text-sm py-2">Save Post</button>
                                    </div>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
