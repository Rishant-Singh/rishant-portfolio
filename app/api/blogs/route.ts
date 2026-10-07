/**
 * GET  /api/blogs      - List all published blogs (with optional ?tag= filter)
 * POST /api/blogs      - Create a new blog post (admin only)
 */
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Blog from "@/models/Blog";
import { getAdminUser } from "@/lib/auth";
import slugify from "slugify";

export async function GET(req: NextRequest) {
    try {
        await connectDB();
        const { searchParams } = new URL(req.url);
        const tag = searchParams.get("tag");
        const category = searchParams.get("category");
        const all = searchParams.get("all"); // admin: include unpublished

        const admin = await getAdminUser();
        const query: Record<string, unknown> = {};
        if (!admin || all !== "true") query.published = true;
        if (tag) query.tags = { $in: [tag] };
        if (category) query.category = category;

        const blogs = await Blog.find(query)
            .select("-content") // Don't return full content in list
            .sort({ createdAt: -1 });
        return NextResponse.json({ success: true, data: blogs });
    } catch {
        return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const admin = await getAdminUser();
        if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        await connectDB();
        const body = await req.json();
        const slug = slugify(body.title, { lower: true, strict: true });

        const blog = await Blog.create({ ...body, slug });
        return NextResponse.json({ success: true, data: blog }, { status: 201 });
    } catch (err: any) {
        if (err.code === 11000) {
            return NextResponse.json({ error: "Blog with this title already exists" }, { status: 409 });
        }
        return NextResponse.json({ error: "Failed to create blog" }, { status: 500 });
    }
}
