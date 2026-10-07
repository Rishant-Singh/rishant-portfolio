/**
 * JWT Authentication helpers.
 */
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in .env.local");
}
const JWT_SECRET = process.env.JWT_SECRET as string;
const COOKIE_NAME = "portfolio_admin_token";

export interface JWTPayload {
    userId: string;
    email: string;
    role: string;
}

/** Sign a JWT token */
export function signToken(payload: JWTPayload): string {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

/** Verify and decode a JWT token */
export function verifyToken(token: string): JWTPayload | null {
    try {
        return jwt.verify(token, JWT_SECRET) as JWTPayload;
    } catch {
        return null;
    }
}

/** Get the current admin user from the request cookie (Server Component) */
export async function getAdminUser(): Promise<JWTPayload | null> {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (!token) return null;
    return verifyToken(token);
}

export { COOKIE_NAME };
