"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function DynamicBackground() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return <div className="fixed inset-0 bg-white dark:bg-zinc-950 -z-10" />;

    return (
        <div className="fixed inset-0 overflow-hidden -z-10 pointer-events-none">
            {/* Base Background */}
            <div className="absolute inset-0 bg-white dark:bg-zinc-950 transition-colors duration-700" />

            {/* Gradient Blobs */}
            <motion.div
                style={{ willChange: "transform, opacity" }}
                animate={{
                    scale: [1, 1.1, 1],
                    x: ["0%", "10%", "0%"],
                    y: ["0%", "5%", "0%"],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear",
                }}
                className="absolute -top-[10%] -left-[5%] w-[60%] h-[60%] rounded-full bg-primary-500/10 dark:bg-primary-500/5 blur-[80px] transform-gpu"
            />
            <motion.div
                style={{ willChange: "transform, opacity" }}
                animate={{
                    scale: [1.1, 1, 1.1],
                    x: ["0%", "-10%", "0%"],
                    y: ["0%", "8%", "0%"],
                }}
                transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "linear",
                }}
                className="absolute top-[15%] -right-[5%] w-[50%] h-[50%] rounded-full bg-accent-500/10 dark:bg-accent-500/5 blur-[70px] transform-gpu"
            />
            <motion.div
                style={{ willChange: "transform, opacity" }}
                animate={{
                    scale: [1, 1.2, 1],
                    x: ["0%", "5%", "0%"],
                    y: ["0%", "-10%", "0%"],
                }}
                transition={{
                    duration: 28,
                    repeat: Infinity,
                    ease: "linear",
                }}
                className="absolute -bottom-[5%] left-[15%] w-[40%] h-[40%] rounded-full bg-indigo-500/10 dark:bg-indigo-500/5 blur-[75px] transform-gpu"
            />

            {/* Noise Overlay */}
            <div className="absolute inset-0 noise-overlay opacity-[0.015] dark:opacity-[0.02] mix-blend-overlay" />
        </div>
    );
}
