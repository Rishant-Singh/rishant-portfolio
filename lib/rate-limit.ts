/**
 * Simple in-memory rate limiter for API routes.
 */

interface RateLimitOptions {
    limit: number;
    windowMs: number;
}

const cache = new Map<string, { count: number; expiresAt: number }>();

export function rateLimit(ip: string, options: RateLimitOptions) {
    const now = Date.now();
    const record = cache.get(ip);

    if (!record || now > record.expiresAt) {
        cache.set(ip, { count: 1, expiresAt: now + options.windowMs });
        return { success: true, remaining: options.limit - 1 };
    }

    if (record.count >= options.limit) {
        return { success: false, remaining: 0 };
    }

    record.count += 1;
    return { success: true, remaining: options.limit - record.count };
}

// Cleanup interval
setInterval(() => {
    const now = Date.now();
    cache.forEach((record, ip) => {
        if (now > record.expiresAt) {
            cache.delete(ip);
        }
    });
}, 60000); // Clean up every minute
