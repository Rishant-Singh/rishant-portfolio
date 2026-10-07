/**
 * POST /api/auth/login  - Admin login (returns JWT cookie)
 * POST /api/auth/logout - Clears auth cookie
 */
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { signToken, COOKIE_NAME } from "@/lib/auth";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
    try {
        const { email, password, action } = await req.json();

        // Rate limit login attempts (5 per 15 mins)
        if (action !== "logout") {
            const ip = req.headers.get("x-forwarded-for") || "127.0.0.1";
            const { success } = rateLimit(ip, { limit: 5, windowMs: 15 * 60 * 1000 });
            if (!success) {
                return NextResponse.json({ error: "Too many login attempts. Try again later." }, { status: 429 });
            }
        }

        // Handle logout
        if (action === "logout") {
            const res = NextResponse.json({ success: true });
            res.cookies.delete(COOKIE_NAME);
            return res;
        }

        if (!email || !password) {
            return NextResponse.json({ error: "Email and password required" }, { status: 400 });
        }

        await connectDB();
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }

        const valid = await user.comparePassword(password);
        if (!valid) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }

        const token = signToken({ userId: user._id.toString(), email: user.email, role: user.role });

        const response = NextResponse.json({ success: true, user: { name: user.name, email: user.email } });
        response.cookies.set(COOKIE_NAME, token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 7, // 7 days
            path: "/",
        });
        return response;
    } catch (err) {
        console.error("Auth error:", err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
