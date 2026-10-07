/** GET /api/github - Returns latest public GitHub repositories */
import { NextResponse } from "next/server";
import { fetchGitHubRepos } from "@/lib/github";

export async function GET() {
    const repos = await fetchGitHubRepos(6);
    return NextResponse.json({ success: true, data: repos });
}
