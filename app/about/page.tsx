import { Metadata } from "next";
import { motion } from "framer-motion";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
    title: "About Me",
    description: "Learn about my background, education, and professional experience.",
};

export default function AboutPage() {
    return <AboutClient />;
}
