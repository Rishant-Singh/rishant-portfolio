"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import {
    FiHome, FiFolder, FiFileText, FiStar, FiMessageSquare,
    FiLogOut, FiMenu, FiX, FiBarChart2
} from "react-icons/fi";

const adminLinks = [
    { href: "/admin/dashboard", label: "Dashboard", icon: FiHome },
    { href: "/admin/projects", label: "Projects", icon: FiFolder },
    { href: "/admin/blogs", label: "Blogs", icon: FiFileText },
    { href: "/admin/skills", label: "Skills", icon: FiStar },
    { href: "/admin/messages", label: "Messages", icon: FiMessageSquare },
];

export default function AdminSidebar() {
    const pathname = usePathname();
    const [collapsed, setCollapsed] = useState(false);

    const handleLogout = async () => {
        await fetch("/api/auth", { method: "POST", body: JSON.stringify({ action: "logout" }) });
        window.location.href = "/admin/login";
    };

    return (
        <motion.aside
            animate={{ width: collapsed ? 64 : 240 }}
            transition={{ duration: 0.3 }}
            className="fixed left-0 top-0 h-screen bg-dark-900 border-r border-white/5 flex flex-col z-50 overflow-hidden"
        >
            {/* Header */}
            <div className="h-16 flex items-center justify-between px-4 border-b border-white/5 shrink-0">
                {!collapsed && (
                    <span className="text-lg font-black gradient-text">{"<Admin/>"}</span>
                )}
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors ml-auto"
                >
                    {collapsed ? <FiMenu size={18} /> : <FiX size={18} />}
                </button>
            </div>

            {/* Nav Links */}
            <nav className="flex-1 py-4 flex flex-col gap-1 px-2 overflow-y-auto">
                {adminLinks.map(({ href, label, icon: Icon }) => (
                    <Link
                        key={href}
                        href={href}
                        title={label}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${pathname === href
                                ? "bg-primary-600/20 text-primary-400"
                                : "text-gray-400 hover:text-white hover:bg-white/5"
                            }`}
                    >
                        <Icon size={18} className="shrink-0" />
                        {!collapsed && <span>{label}</span>}
                    </Link>
                ))}
            </nav>

            {/* Logout */}
            <div className="p-2 border-t border-white/5">
                <button
                    onClick={handleLogout}
                    title="Logout"
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-red-400 hover:bg-red-900/10 transition-all"
                >
                    <FiLogOut size={18} className="shrink-0" />
                    {!collapsed && <span>Logout</span>}
                </button>
            </div>
        </motion.aside>
    );
}
