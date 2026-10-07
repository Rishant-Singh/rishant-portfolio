"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { FiPlus, FiEdit2, FiTrash2 } from "react-icons/fi";

interface Skill { _id: string; name: string; category: string; level: number; icon: string; }
const emptySkill = { name: "", category: "Frontend", level: 80, icon: "" };
const CATEGORIES = ["Frontend", "Backend", "Database", "DevOps", "Mobile", "AI", "Tools", "Other"];

export default function AdminSkills() {
    const [skills, setSkills] = useState<Skill[]>([]);
    const [loading, setLoading] = useState(true);
    const [modal, setModal] = useState(false);
    const [editing, setEditing] = useState<string | null>(null);
    const [form, setForm] = useState<typeof emptySkill>(emptySkill);

    const load = () => { fetch("/api/skills").then(r => r.json()).then(d => { setSkills(d.data || []); setLoading(false); }); };
    useEffect(() => { load(); }, []);

    const grouped = skills.reduce<Record<string, Skill[]>>((acc, s) => { acc[s.category] = acc[s.category] || []; acc[s.category].push(s); return acc; }, {});

    const openAdd = () => { setEditing(null); setForm(emptySkill); setModal(true); };
    const openEdit = (s: Skill) => { setEditing(s._id); setForm({ name: s.name, category: s.category, level: s.level, icon: s.icon }); setModal(true); };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        const url = editing ? `/api/skills?id=${editing}` : "/api/skills";
        const method = editing ? "PUT" : "POST";
        const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
        const data = await res.json();
        if (data.success) { toast.success(editing ? "Skill updated!" : "Skill added!"); setModal(false); load(); }
        else toast.error(data.error || "Failed");
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this skill?")) return;
        await fetch(`/api/skills?id=${id}`, { method: "DELETE" });
        toast.success("Deleted"); load();
    };

    return (
        <div className="p-6 lg:p-8">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-black text-white">Skills</h1>
                    <p className="text-gray-400 text-sm mt-1">Manage your skills and proficiency levels</p>
                </div>
                <button onClick={openAdd} className="btn-primary text-sm py-2"><FiPlus /> Add Skill</button>
            </div>

            {loading ? (
                <div className="grid md:grid-cols-2 gap-4">{[...Array(4)].map((_, i) => <div key={i} className="h-40 rounded-xl bg-dark-700 animate-pulse" />)}</div>
            ) : Object.keys(grouped).length === 0 ? (
                <div className="text-center py-20 text-gray-400"><p className="text-4xl mb-3">⭐</p><p>No skills yet. Add your first skill!</p></div>
            ) : (
                <div className="grid md:grid-cols-2 gap-6">
                    {Object.entries(grouped).map(([category, skillList]) => (
                        <div key={category} className="admin-card">
                            <h2 className="font-bold text-primary-400 mb-4">{category}</h2>
                            <div className="space-y-3">
                                {skillList.map(s => (
                                    <div key={s._id} className="flex items-center gap-3">
                                        {s.icon && <span className="text-lg">{s.icon}</span>}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between text-sm mb-1">
                                                <span className="font-medium text-white truncate">{s.name}</span>
                                                <span className="text-gray-400">{s.level}%</span>
                                            </div>
                                            <div className="skill-bar">
                                                <div className="skill-bar-fill" style={{ width: `${s.level}%` }} />
                                            </div>
                                        </div>
                                        <div className="flex gap-1 shrink-0">
                                            <button onClick={() => openEdit(s)} className="p-1.5 rounded-lg text-gray-400 hover:text-primary-400 hover:bg-primary-900/20 transition-all"><FiEdit2 size={13} /></button>
                                            <button onClick={() => handleDelete(s._id)} className="p-1.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-900/20 transition-all"><FiTrash2 size={13} /></button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <AnimatePresence>
                {modal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                            className="admin-card w-full max-w-md">
                            <h2 className="text-lg font-bold text-white mb-5">{editing ? "Edit" : "Add"} Skill</h2>
                            <form onSubmit={handleSave} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div><label className="block text-sm font-medium mb-1.5">Name</label>
                                        <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="input" placeholder="React" /></div>
                                    <div><label className="block text-sm font-medium mb-1.5">Icon (emoji)</label>
                                        <input value={form.icon} onChange={e => setForm({ ...form, icon: e.target.value })} className="input" placeholder="⚛️" /></div>
                                </div>
                                <div><label className="block text-sm font-medium mb-1.5">Category</label>
                                    <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="input">
                                        {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1.5">Proficiency: {form.level}%</label>
                                    <input type="range" min={1} max={100} value={form.level} onChange={e => setForm({ ...form, level: +e.target.value })} className="w-full accent-indigo-500" />
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
