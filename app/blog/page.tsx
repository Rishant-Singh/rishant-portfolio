import { Metadata } from "next";
import BlogClient from "./BlogClient";
import { connectDB } from "@/lib/db";
import Blog from "@/models/Blog";

export const metadata: Metadata = {
    title: "Blog",
    description: "Technical articles and engineering deep-dives by Rishant Kumar Singh.",
};

export const dynamic = "force-dynamic";

async function getBlogs() {
    try {
        await connectDB();
        const blogs = await Blog.find({ published: true }).sort({ createdAt: -1 }).lean();
        return JSON.parse(JSON.stringify(blogs));
    } catch {
        return [];
    }
}

export default async function BlogPage() {
    const blogs = await getBlogs();
    return <BlogClient initialBlogs={blogs} />;
}
