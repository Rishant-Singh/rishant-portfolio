/**
 * GET  /api/projects       - List all projects (with optional ?tech= filter)
 * POST /api/projects       - Create a new project (admin only)
 */
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Project from "@/models/Project";
import { getAdminUser } from "@/lib/auth";
import { rateLimit } from "@/lib/rate-limit";
import slugify from "slugify";

export async function GET(req: NextRequest) {
    try {
        await connectDB();
        const { searchParams } = new URL(req.url);
        const tech = searchParams.get("tech");
        const featured = searchParams.get("featured");

        const query: Record<string, unknown> = {};
        if (tech) query.techStack = { $in: [tech] };
        if (featured === "true") query.featured = true;

        const projects = await Project.find(query).sort({ order: 1, createdAt: -1 });
        return NextResponse.json({ success: true, data: projects });
    } catch (err) {
        return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const admin = await getAdminUser();
        if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        await connectDB();
        
        // Rate limit creation (10 per hour)
        const ip = req.headers.get("x-forwarded-for") || "127.0.0.1";
        const { success } = rateLimit(ip, { limit: 10, windowMs: 60 * 60 * 1000 });
        if (!success) return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });

        const body = await req.json();
        
        // Basic validation
        if (!body.title || !body.description) {
            return NextResponse.json({ error: "Title and description are required" }, { status: 400 });
        }
        const slug = slugify(body.title, { lower: true, strict: true });

        const project = await Project.create({ ...body, slug });
        return NextResponse.json({ success: true, data: project }, { status: 201 });
    } catch (err: any) {
        if (err.code === 11000) {
            return NextResponse.json({ error: "Project with this title already exists" }, { status: 409 });
        }
        return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
    }
}
