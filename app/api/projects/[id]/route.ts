/**
 * GET    /api/projects/[id] - Get single project by id or slug
 * PUT    /api/projects/[id] - Update project (admin only)
 * DELETE /api/projects/[id] - Delete project (admin only)
 */
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Project from "@/models/Project";
import { getAdminUser } from "@/lib/auth";
import slugify from "slugify";
import mongoose from "mongoose";

type Params = { params: Promise<{ id: string }> };

export async function GET(_: NextRequest, { params }: Params) {
    try {
        await connectDB();
        const { id } = await params;
        const query = mongoose.isValidObjectId(id) ? { _id: id } : { slug: id };
        const project = await Project.findOne(query);
        if (!project) return NextResponse.json({ error: "Not found" }, { status: 404 });
        return NextResponse.json({ success: true, data: project });
    } catch {
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}

export async function PUT(req: NextRequest, { params }: Params) {
    try {
        const admin = await getAdminUser();
        if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        await connectDB();
        const { id } = await params;
        const body = await req.json();
        if (body.title) body.slug = slugify(body.title, { lower: true, strict: true });

        const project = await Project.findByIdAndUpdate(id, body, { returnDocument: "after" });
        if (!project) return NextResponse.json({ error: "Not found" }, { status: 404 });
        return NextResponse.json({ success: true, data: project });
    } catch {
        return NextResponse.json({ error: "Update failed" }, { status: 500 });
    }
}

export async function DELETE(_: NextRequest, { params }: Params) {
    try {
        const admin = await getAdminUser();
        if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        await connectDB();
        const { id } = await params;
        await Project.findByIdAndDelete(id);
        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json({ error: "Delete failed" }, { status: 500 });
    }
}
