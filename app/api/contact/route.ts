/**
 * POST /api/contact   - Save a contact message to the database
 * GET  /api/contact   - Retrieve all messages (admin only)
 * PUT  /api/contact?id=... - Mark message as read (admin only)
 */
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Contact from "@/models/Contact";
import { getAdminUser } from "@/lib/auth";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
    try {
        await connectDB();
        
        // Rate limit contact messages (3 per hour)
        const ip = req.headers.get("x-forwarded-for") || "127.0.0.1";
        const { success } = rateLimit(ip, { limit: 3, windowMs: 60 * 60 * 1000 });
        if (!success) {
            return NextResponse.json({ error: "Too many messages. Please try again later." }, { status: 429 });
        }

        const body = await req.json();
        const { name, email, subject, message } = body;

        if (!name || !email || !subject || !message) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }

        const contact = await Contact.create({ name, email, subject, message });
        return NextResponse.json({ success: true, data: contact }, { status: 201 });
    } catch {
        return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
    }
}

export async function GET() {
    try {
        const admin = await getAdminUser();
        if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        await connectDB();
        const messages = await Contact.find().sort({ createdAt: -1 });
        return NextResponse.json({ success: true, data: messages });
    } catch {
        return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    try {
        const admin = await getAdminUser();
        if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        await connectDB();
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");
        const msg = await Contact.findByIdAndUpdate(id, { read: true }, { returnDocument: "after" });
        return NextResponse.json({ success: true, data: msg });
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
        if (!id) return NextResponse.json({ error: "ID is required" }, { status: 400 });

        await Contact.findByIdAndDelete(id);
        return NextResponse.json({ success: true, message: "Deleted" });
    } catch {
        return NextResponse.json({ error: "Delete failed" }, { status: 500 });
    }
}

