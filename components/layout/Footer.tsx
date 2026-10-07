import Link from "next/link";
import { FiMail } from "react-icons/fi";
import { FaGithub, FaLinkedin, FaXTwitter, FaDiscord } from "react-icons/fa6";

const socials = [
    { href: "https://github.com/Rishant-Singh", icon: FaGithub, label: "GitHub" },
    { href: "https://www.linkedin.com/in/rishantkrsingh/", icon: FaLinkedin, label: "LinkedIn" },
    { href: "https://x.com/singhrishant123", icon: FaXTwitter, label: "X (Twitter)" },
    { href: "https://discord.com/users/516275094457417730", icon: FaDiscord, label: "Discord" },
    { href: "mailto:singhrishant440@gmail.com", icon: FiMail, label: "Email" },
];

const footerLinks = [
    { href: "/about", label: "About" },
    { href: "/projects", label: "Projects" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
];

export default function Footer() {
    return (
        <footer className="border-t border-gray-200 dark:border-white/10 bg-white dark:bg-dark-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                    {/* Brand */}
                    <div className="text-center md:text-left">
                        <span className="text-xl font-black gradient-text tracking-tight">Rishant Kumar Singh</span>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 max-w-xs">
                            Aspiring Software Engineer &amp; Full-Stack Developer
                        </p>
                    </div>

                    {/* Links */}
                    <nav className="flex gap-6">
                        {footerLinks.map(({ href, label }) => (
                            <Link
                                key={href}
                                href={href}
                                className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
                            >
                                {label}
                            </Link>
                        ))}
                    </nav>

                    {/* Socials */}
                    <div className="flex items-center gap-4">
                        {socials.map(({ href, icon: Icon, label }) => (
                            <a
                                key={href}
                                href={href}
                                target={href.startsWith("http") ? "_blank" : undefined}
                                rel="noopener noreferrer"
                                aria-label={label}
                                className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all"
                            >
                                <Icon size={18} />
                            </a>
                        ))}
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-100 dark:border-white/5 text-center text-sm text-gray-400">
                    © {new Date().getFullYear()} Developer Portfolio. Built with Next.js & TailwindCSS.
                </div>
            </div>
        </footer>
    );
}
