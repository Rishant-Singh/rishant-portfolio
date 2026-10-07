/**
 * GET    /api/skills         - Get all skills grouped by category
 * POST   /api/skills         - Create skill (admin only)
 * PUT    /api/skills?id=...  - Update skill (admin only)
 * DELETE /api/skills?id=...  - Delete skill (admin only)
 */
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Skill from "@/models/Skill";
import { getAdminUser } from "@/lib/auth";
import { rateLimit } from "@/lib/rate-limit";

export async function GET() {
    try {
        await connectDB();
        const skills = await Skill.find().sort({ category: 1, order: 1 });
        return NextResponse.json({ success: true, data: skills });
    } catch {
        return NextResponse.json({ error: "Failed to fetch skills" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const admin = await getAdminUser();
        if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        await connectDB();
        
        // Rate limit (10 per hour)
        const ip = req.headers.get("x-forwarded-for") || "127.0.0.1";
        const { success } = rateLimit(ip, { limit: 10, windowMs: 60 * 60 * 1000 });
        if (!success) return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });

        const body = await req.json();
        if (!body.name || !body.category) {
            return NextResponse.json({ error: "Name and category are required" }, { status: 400 });
        }
        const skill = await Skill.create(body);
        return NextResponse.json({ success: true, data: skill }, { status: 201 });
    } catch {
        return NextResponse.json({ error: "Failed to create skill" }, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    try {
        const admin = await getAdminUser();
        if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        await connectDB();
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");
        const body = await req.json();
        const skill = await Skill.findByIdAndUpdate(id, body, { returnDocument: "after" });
        if (!skill) return NextResponse.json({ error: "Not found" }, { status: 404 });
        return NextResponse.json({ success: true, data: skill });
    } catch {
        return NextResponse.json({ error: "Update failed" }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const admin = await getAdminUser();
        if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        await connectDB();
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");
        await Skill.findByIdAndDelete(id);
        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json({ error: "Delete failed" }, { status: 500 });
    }
}
