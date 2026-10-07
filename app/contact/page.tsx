"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { FiSend, FiMail, FiMapPin, FiCopy, FiCheck } from "react-icons/fi";
import { FaGithub, FaLinkedin, FaXTwitter, FaDiscord } from "react-icons/fa6";

export default function ContactPage() {
    const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
    const [loading, setLoading] = useState(false);
    const [copiedDiscord, setCopiedDiscord] = useState(false);

    const handleCopyDiscord = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        navigator.clipboard.writeText("thebeast8828");
        setCopiedDiscord(true);
        toast.success("Discord username (thebeast8828) copied to clipboard!");
        setTimeout(() => setCopiedDiscord(false), 2500);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            const data = await res.json();
            if (data.success) {
                toast.success("Message sent! I'll get back to you soon.");
                setForm({ name: "", email: "", subject: "", message: "" });
            } else {
                toast.error(data.error || "Something went wrong.");
            }
        } catch {
            toast.error("Failed to send. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="pt-20 min-h-screen">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col items-center text-center mb-16"
                >
                    <span className="tag mb-4 shadow-sm">Available for work</span>
                    <h1 className="text-5xl font-black text-zinc-900 dark:text-white tracking-tight">Let&apos;s Connect</h1>
                    <p className="text-zinc-500 dark:text-zinc-400 mt-4 max-w-xl text-lg font-medium leading-relaxed">
                        Have a project in mind, looking to collaborate, or open to full-time/hybrid roles? I&apos;d love to hear from you.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    {/* Contact Info Column */}
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }} 
                        animate={{ opacity: 1, x: 0 }} 
                        transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                        className="space-y-6"
                    >
                        {/* Email Card */}
                        <a 
                            href="mailto:singhrishant440@gmail.com"
                            className="glass-card p-7 flex items-center gap-6 group hover:border-primary-500/30 transition-all block"
                        >
                            <div className="w-14 h-14 rounded-2xl bg-primary-500/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                                <FiMail className="text-primary-500 text-xl" />
                            </div>
                            <div className="min-w-0">
                                <h3 className="font-bold text-zinc-900 dark:text-white mb-0.5 tracking-tight">Email</h3>
                                <p className="text-sm font-semibold text-primary-500 hover:text-primary-400 transition-colors truncate">
                                    singhrishant440@gmail.com
                                </p>
                            </div>
                        </a>

                        {/* Location Card */}
                        <div className="glass-card p-7 flex items-center gap-6 group hover:border-primary-500/30 transition-all">
                            <div className="w-14 h-14 rounded-2xl bg-primary-500/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                                <FiMapPin className="text-primary-500 text-xl" />
                            </div>
                            <div>
                                <h3 className="font-bold text-zinc-900 dark:text-white mb-0.5 tracking-tight">Location</h3>
                                <p className="text-sm font-semibold text-zinc-700 dark:text-zinc-200">
                                    Jhumri Telaiya, Koderma
                                </p>
                                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                                    Open to Hybrid &amp; Remote Opportunities
                                </p>
                            </div>
                        </div>

                        {/* Discord Card */}
                        <div className="glass-card p-7 flex items-center justify-between gap-4 group hover:border-[#5865F2]/40 transition-all">
                            <div className="flex items-center gap-6 min-w-0">
                                <div className="w-14 h-14 rounded-2xl bg-[#5865F2]/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                                    <FaDiscord className="text-[#5865F2] text-2xl" />
                                </div>
                                <div className="min-w-0">
                                    <h3 className="font-bold text-zinc-900 dark:text-white mb-0.5 tracking-tight">Discord</h3>
                                    <a
                                        href="https://discord.com/users/516275094457417730"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm font-semibold text-[#5865F2] hover:underline truncate block"
                                    >
                                        @thebeast8828
                                    </a>
                                    <p className="text-[11px] text-zinc-400 font-mono">ID: 516275094457417730</p>
                                </div>
                            </div>
                            <button
                                onClick={handleCopyDiscord}
                                type="button"
                                title="Copy Discord username"
                                className="p-2.5 rounded-xl bg-zinc-100 dark:bg-dark-700 text-zinc-600 dark:text-zinc-300 hover:text-white hover:bg-[#5865F2] transition-colors shrink-0 flex items-center gap-1.5 text-xs font-semibold"
                            >
                                {copiedDiscord ? (
                                    <>
                                        <FiCheck size={14} className="text-green-500" />
                                        <span>Copied</span>
                                    </>
                                ) : (
                                    <>
                                        <FiCopy size={14} />
                                        <span>Copy</span>
                                    </>
                                )}
                            </button>
                        </div>

                        {/* Social Networks Links */}
                        <div className="pt-6">
                            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400 mb-6 flex items-center gap-4">
                                Social Networks <div className="h-px bg-zinc-200 dark:bg-zinc-800 flex-1" />
                            </h3>
                            <div className="flex flex-wrap gap-4">
                                {[
                                    { href: "https://github.com/Rishant-Singh", icon: FaGithub, label: "GitHub", hoverColor: "hover:text-white hover:bg-zinc-900 dark:hover:bg-white dark:hover:text-black" },
                                    { href: "https://www.linkedin.com/in/rishantkrsingh/", icon: FaLinkedin, label: "LinkedIn", hoverColor: "hover:text-white hover:bg-[#0A66C2]" },
                                    { href: "https://x.com/singhrishant123", icon: FaXTwitter, label: "X (Twitter)", hoverColor: "hover:text-white hover:bg-zinc-900 dark:hover:bg-white dark:hover:text-black" },
                                    { href: "https://discord.com/users/516275094457417730", icon: FaDiscord, label: "Discord", hoverColor: "hover:text-white hover:bg-[#5865F2]" },
                                ].map(({ href, icon: Icon, label, hoverColor }) => (
                                    <a 
                                        key={href} 
                                        href={href} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        aria-label={label}
                                        title={label}
                                        className={`w-14 h-14 rounded-2xl glass-card flex items-center justify-center text-zinc-500 dark:text-zinc-400 transition-all hover:-translate-y-1 shadow-sm ${hoverColor}`}
                                    >
                                        <Icon size={20} />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Form Column */}
                    <motion.form
                        onSubmit={handleSubmit}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="glass-card p-10 space-y-6"
                    >
                        <div className="grid sm:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Your Name</label>
                                <input 
                                    type="text" 
                                    required 
                                    placeholder="John Doe" 
                                    value={form.name}
                                    onChange={e => setForm({ ...form, name: e.target.value })} 
                                    className="w-full bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all placeholder:text-zinc-500" 
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Email Address</label>
                                <input 
                                    type="email" 
                                    required 
                                    placeholder="john@example.com" 
                                    value={form.email}
                                    onChange={e => setForm({ ...form, email: e.target.value })} 
                                    className="w-full bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all placeholder:text-zinc-500" 
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Subject</label>
                            <input 
                                type="text" 
                                required 
                                placeholder="Project Inquiry / Job Opportunity" 
                                value={form.subject}
                                onChange={e => setForm({ ...form, subject: e.target.value })} 
                                className="w-full bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all placeholder:text-zinc-500" 
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Message</label>
                            <textarea 
                                required 
                                rows={5} 
                                placeholder="Tell me about your project or opportunity…" 
                                value={form.message}
                                onChange={e => setForm({ ...form, message: e.target.value })} 
                                className="w-full bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all placeholder:text-zinc-500 resize-none" 
                            />
                        </div>
                        <button 
                            type="submit" 
                            disabled={loading} 
                            className="btn-primary w-full py-4 rounded-2xl text-base shadow-glow flex items-center justify-center gap-3"
                        >
                            {loading ? (
                                <><span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Sending...</>
                            ) : (
                                <><FiSend /> Send Message</>
                            )}
                        </button>
                    </motion.form>
                </div>
            </div>
        </div>
    );
}
