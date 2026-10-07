"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { FiLock, FiMail, FiEye, FiEyeOff } from "react-icons/fi";

export default function AdminLoginPage() {
    const router = useRouter();
    const [form, setForm] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [showPw, setShowPw] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch("/api/auth", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            const data = await res.json();
            if (data.success) {
                toast.success("Welcome back!");
                router.push("/admin/dashboard");
                router.refresh();
            } else {
                toast.error(data.error || "Invalid credentials");
            }
        } catch {
            toast.error("Login failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-dark-900 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md"
            >
                <div className="text-center mb-8">
                    <span className="text-3xl font-black gradient-text">{"<Admin/>"}</span>
                    <p className="text-gray-400 mt-2">Sign in to your dashboard</p>
                </div>

                <form onSubmit={handleSubmit} className="card p-8 space-y-5">
                    <div>
                        <label className="block text-sm font-medium mb-1.5">Email</label>
                        <div className="relative">
                            <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                            <input type="email" required placeholder="admin@portfolio.com" value={form.email}
                                onChange={e => setForm({ ...form, email: e.target.value })}
                                className="input pl-10" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1.5">Password</label>
                        <div className="relative">
                            <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                            <input type={showPw ? "text" : "password"} required placeholder="••••••••" value={form.password}
                                onChange={e => setForm({ ...form, password: e.target.value })}
                                className="input pl-10 pr-10" />
                            <button type="button" onClick={() => setShowPw(!showPw)}
                                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200">
                                {showPw ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                            </button>
                        </div>
                    </div>
                    <button type="submit" disabled={loading} className="btn-primary w-full justify-center">
                        {loading ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : "Sign In"}
                    </button>
                </form>
            </motion.div>
        </div>
    );
}
