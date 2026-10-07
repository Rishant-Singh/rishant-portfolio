import { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogPost from "./BlogPost";
import { connectDB } from "@/lib/db";
import Blog from "@/models/Blog";

interface Props { params: Promise<{ slug: string }> }

async function getBlog(slug: string) {
    try {
        await connectDB();
        const blog = await Blog.findOneAndUpdate({ slug }, { $inc: { views: 1 } }, { returnDocument: "after" }).lean();
        return blog ? JSON.parse(JSON.stringify(blog)) : null;
    } catch {
        return null;
    }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const blog = await getBlog(slug);
    if (!blog) return { title: "Post Not Found" };
    return { title: `${blog.title} | Rishant Kumar Singh`, description: blog.excerpt };
}

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params;
    const blog = await getBlog(slug);
    if (!blog) notFound();
    return <BlogPost blog={blog} />;
}
