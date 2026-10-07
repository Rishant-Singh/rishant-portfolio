/**
 * Proxy: Protects /admin routes. Redirects to /admin/login if not authenticated.
 * Renamed from middleware.ts → proxy.ts for Next.js 16 compatibility.
 */
import { NextRequest, NextResponse } from "next/server";
import { verifyToken, COOKIE_NAME } from "@/lib/auth";

export function proxy(req: NextRequest) {
    const { pathname } = req.nextUrl;

    // Protect /admin routes (except login page)
    if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
        const token = req.cookies.get(COOKIE_NAME)?.value;
        const user = token ? verifyToken(token) : null;

        if (!user) {
            const loginUrl = new URL("/admin/login", req.url);
            loginUrl.searchParams.set("redirect", pathname);
            return NextResponse.redirect(loginUrl);
        }
    }

    // If already logged in admin tries to visit login, redirect to dashboard
    if (pathname === "/admin/login") {
        const token = req.cookies.get(COOKIE_NAME)?.value;
        const user = token ? verifyToken(token) : null;
        if (user) {
            return NextResponse.redirect(new URL("/admin/dashboard", req.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*"],
};

