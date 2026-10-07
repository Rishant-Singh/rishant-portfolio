import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import DynamicBackground from "@/components/layout/DynamicBackground";
import { Toaster } from "react-hot-toast";
import ChatbotWidget from "@/components/chatbot/ChatbotWidget";

const inter = Inter({ subsets: ["latin"], display: "swap" });
const baseUrl = process.env.NEXT_PUBLIC_APP_URL || (process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://yourportfolio.com');

export const metadata: Metadata = {
    metadataBase: new URL(baseUrl),
    title: {
        default: "Rishant Kumar Singh | Full-Stack Developer",
        template: "%s | Rishant Kumar Singh",
    },
    description:
        "Full-Stack Developer specializing in Python, React, FastAPI, Node.js, and modern databases. Explore projects, skills, and articles.",
    keywords: ["portfolio", "developer", "full-stack", "react", "fastapi", "nodejs", "python"],
    authors: [{ name: "Rishant Kumar Singh" }],
    creator: "Rishant Kumar Singh",
    openGraph: {
        type: "website",
        locale: "en_US",
        url: process.env.NEXT_PUBLIC_APP_URL,
        siteName: "Rishant Kumar Singh Portfolio",
        images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    },
    twitter: {
        card: "summary_large_image",
        creator: "@singhrishant123",
    },
    robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={inter.className}>
                <ThemeProvider>
                    <DynamicBackground />
                    <div className="relative z-10 flex flex-col min-h-screen">
                        <Navbar />
                        <main className="flex-1">{children}</main>
                        <Footer />
                    </div>
                    <Toaster
                        position="bottom-right"
                        toastOptions={{
                            className: "dark:bg-dark-700 dark:text-white",
                            duration: 4000,
                        }}
                    />
                    <ChatbotWidget />
                </ThemeProvider>
            </body>
        </html>
    );
}
