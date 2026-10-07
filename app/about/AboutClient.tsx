"use client";
import { motion } from "framer-motion";
import { FiMapPin, FiMail, FiDownload, FiAward, FiCheckCircle } from "react-icons/fi";

const projectsExperience = [
    {
        year: "Jun 2026",
        role: "CyberHawk — Threat Intelligence Platform",
        company: "Python · FastAPI · Kafka · Elasticsearch · Docker",
        desc: "Developed a scalable Cyber Threat Intelligence platform collecting and analyzing threat feeds from multiple security sources. Designed RESTful APIs using FastAPI for CVE management, integrated Kafka for asynchronous streaming, and Elasticsearch for real-time search. Fully containerized with Docker.",
    },
    {
        year: "Jan 2026",
        role: "QuickDesk — Real-Time Workspace Platform",
        company: "React · Node.js · Express.js · Socket.IO · MongoDB",
        desc: "Engineered a real-time bidirectional communication platform enabling instant messaging via WebSockets and Socket.IO. Implemented JWT authentication, RESTful APIs for workspace and messaging operations, and responsive MongoDB storage.",
    },
];

const education = [
    {
        year: "2024 – 2026",
        degree: "Master of Computer Applications (MCA)",
        institution: "RGPV, Bhopal",
        desc: "Specialized in scalable software systems, algorithms, distributed technologies, and software engineering.",
    },
    {
        year: "2021 – 2024",
        degree: "Bachelor of Computer Applications (BCA)",
        institution: "Chandigarh University, Mohali",
        desc: "Core focus on computer science foundations, full-stack web architectures, databases, and programming.",
    },
];

const certifications = [
    { name: "Generative AI Professional", issuer: "Oracle" },
    { name: "React JS", issuer: "Infosys Springboard" },
    { name: "Industry 4.0 IoT", issuer: "NPTEL" },
];

export default function AboutClient() {
    return (
        <div className="pt-20 min-h-screen">
            {/* Hero */}
            <section className="py-24 relative overflow-hidden">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="flex flex-col md:flex-row items-center gap-12"
                    >
                        {/* Avatar / Profile Image */}
                        <div className="w-40 h-40 md:w-56 md:h-56 rounded-[2.5rem] bg-gradient-to-br from-primary-600 to-accent-600 flex items-center justify-center text-white text-7xl font-black shrink-0 shadow-glow rotate-3 hover:rotate-0 transition-transform duration-500 overflow-hidden relative">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src="/profile.jpg"
                                alt="Rishant Kumar Singh"
                                onError={(e) => { (e.currentTarget as HTMLElement).style.display = "none"; }}
                                className="w-full h-full object-cover object-top absolute inset-0 z-10 transition-transform duration-500 group-hover:scale-105"
                            />
                            <span className="z-0 select-none">R</span>
                        </div>

                        <div className="text-center md:text-left">
                            <h1 className="text-4xl sm:text-5xl font-black text-zinc-900 dark:text-white mb-3 tracking-tight">
                                Rishant Kumar Singh
                            </h1>
                            <p className="text-primary-500 font-bold mb-5 tracking-wide uppercase text-sm">
                                Aspiring Software Engineer · Full-Stack Developer
                            </p>
                            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-xs font-bold text-zinc-400 mb-6 uppercase tracking-widest">
                                <span className="flex items-center gap-1.5"><FiMapPin size={14} className="text-primary-500" /> Jhumri Telaiya, Koderma</span>
                                <span className="flex items-center gap-1.5"><FiMail size={14} className="text-primary-500" /> singhrishant440@gmail.com</span>
                            </div>
                            <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-2xl text-base sm:text-lg font-medium">
                                Aspiring Software Engineer with a strong foundation in software development and problem-solving. Hands-on experience building full-stack applications using Python, React, FastAPI, SQL, Git, and Docker, with a keen interest in development of scalable software systems.
                            </p>
                            <div className="mt-8 flex justify-center md:justify-start gap-4">
                                <a href="/resume.pdf" download="Rishant_Kumar_Singh_Resume.pdf" className="btn-primary px-8 py-3.5 shadow-glow">
                                    <FiDownload /> Download Resume
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Experience / Key Projects */}
            <section className="py-20 border-t border-zinc-200/60 dark:border-white/5">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col items-center md:items-start mb-14">
                        <span className="tag mb-3">Portfolio Highlights</span>
                        <h2 className="text-3xl sm:text-4xl font-black text-zinc-900 dark:text-white tracking-tight">Key Projects &amp; Experience</h2>
                    </div>
                    
                    <div className="relative">
                        <div className="absolute left-0 md:left-28 top-0 bottom-0 w-px bg-zinc-200 dark:bg-zinc-800" />
                        <div className="space-y-10">
                            {projectsExperience.map((exp, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: i * 0.1 }}
                                    className="relative flex flex-col md:flex-row gap-6 pl-8 md:pl-40"
                                >
                                    <div className="absolute left-[-4px] md:left-[108px] top-6 w-2 h-2 rounded-full bg-primary-500 ring-4 ring-white dark:ring-zinc-950" />
                                    <div className="absolute left-0 md:left-0 top-6 text-[10px] font-black uppercase tracking-widest text-zinc-400 md:w-24 shrink-0 hidden md:block">
                                        {exp.year}
                                    </div>
                                    <div className="glass-card p-6 flex-1 hover:border-primary-500/30 transition-colors">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-primary-500 md:hidden block mb-2">{exp.year}</span>
                                        <h3 className="font-bold text-lg text-zinc-900 dark:text-white tracking-tight">{exp.role}</h3>
                                        <p className="text-xs font-semibold text-primary-500 dark:text-primary-400 mb-3">{exp.company}</p>
                                        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">{exp.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Education */}
                    <div className="flex flex-col items-center md:items-start mt-28 mb-14">
                        <span className="tag mb-3">Academic Background</span>
                        <h2 className="text-3xl sm:text-4xl font-black text-zinc-900 dark:text-white tracking-tight">Education</h2>
                    </div>
                    
                    <div className="space-y-6">
                        {education.map((edu, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="glass-card p-8 flex gap-6 sm:gap-8 items-start hover:border-primary-500/30 transition-all group"
                            >
                                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-primary-500/10 flex items-center justify-center shrink-0 text-2xl group-hover:scale-110 transition-transform">
                                    🎓
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-1.5">{edu.year}</p>
                                    <h3 className="font-bold text-xl text-zinc-900 dark:text-white mb-1 tracking-tight">{edu.degree}</h3>
                                    <p className="text-primary-500 font-bold text-sm mb-2">{edu.institution}</p>
                                    <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">{edu.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Certifications & Leadership */}
                    <div className="grid md:grid-cols-2 gap-8 mt-20">
                        {/* Certifications Card */}
                        <div className="glass-card p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-xl bg-primary-500/10 text-primary-500 flex items-center justify-center">
                                    <FiAward size={20} />
                                </div>
                                <h3 className="text-xl font-bold text-zinc-900 dark:text-white tracking-tight">Certifications</h3>
                            </div>
                            <div className="space-y-4">
                                {certifications.map((c, i) => (
                                    <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-zinc-50 dark:bg-dark-800/60 border border-zinc-200/50 dark:border-white/5">
                                        <span className="font-semibold text-sm text-zinc-800 dark:text-zinc-200">{c.name}</span>
                                        <span className="text-xs font-bold text-primary-500">{c.issuer}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Leadership & Activities */}
                        <div className="glass-card p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-xl bg-primary-500/10 text-primary-500 flex items-center justify-center text-lg">
                                    ⭐
                                </div>
                                <h3 className="text-xl font-bold text-zinc-900 dark:text-white tracking-tight">Leadership &amp; Achievements</h3>
                            </div>
                            <div className="space-y-3.5 text-sm text-zinc-600 dark:text-zinc-400 font-medium">
                                <div className="flex items-start gap-2.5">
                                    <FiCheckCircle className="text-primary-500 shrink-0 mt-0.5" />
                                    <span>Served as Coordinator for the annual college fest, organizing event activities and logistics.</span>
                                </div>
                                <div className="flex items-start gap-2.5">
                                    <FiCheckCircle className="text-primary-500 shrink-0 mt-0.5" />
                                    <span>Runner-up in the Department Cricket Tournament, demonstrating teamwork and sportsmanship.</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
