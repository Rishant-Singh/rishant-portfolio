/**
 * MongoDB connection utility using Mongoose.
 * Caches the connection across hot reloads in development.
 * Optimized for Vercel serverless — adds database name and connection timeouts.
 */
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable in .env.local");
}

// Inject database name "portfolio" if not already present in URI
function buildMongoUri(uri: string): string {
  try {
    const url = new URL(uri);
    // If pathname is "/" or empty, add the database name
    if (url.pathname === "/" || url.pathname === "") {
      url.pathname = "/portfolio";
    }
    return url.toString();
  } catch {
    return uri; // fallback: return original
  }
}

const MONGO_URI_WITH_DB = buildMongoUri(MONGODB_URI);

// Global cache to persist connection across module reloads (dev hot-reload + Vercel)
let cached = (global as any).mongoose as {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export async function connectDB(): Promise<typeof mongoose> {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGO_URI_WITH_DB, {
        bufferCommands: false,
        serverSelectionTimeoutMS: 10000, // 10s timeout (important for serverless cold starts)
        socketTimeoutMS: 45000,
      })
      .catch((err) => {
        cached.promise = null; // reset so next request retries
        console.error("[MongoDB] Connection error:", err);
        throw err;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
