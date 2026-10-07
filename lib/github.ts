/**
 * GitHub API integration - fetches latest public repositories.
 */
const GITHUB_USERNAME = process.env.GITHUB_USERNAME || "your-github-username";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

export interface GitHubRepo {
    id: number;
    name: string;
    full_name: string;
    description: string | null;
    html_url: string;
    homepage: string | null;
    stargazers_count: number;
    forks_count: number;
    language: string | null;
    topics: string[];
    updated_at: string;
}

export async function fetchGitHubRepos(count = 6): Promise<GitHubRepo[]> {
    try {
        const headers: Record<string, string> = {
            Accept: "application/vnd.github+json",
        };
        if (GITHUB_TOKEN) {
            headers["Authorization"] = `Bearer ${GITHUB_TOKEN}`;
        }

        const res = await fetch(
            `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=${count}&type=public`,
            { headers, next: { revalidate: 3600 } } // cache for 1 hour
        );

        if (!res.ok) throw new Error("GitHub API error");
        return res.json();
    } catch (err) {
        console.error("Failed to fetch GitHub repos:", err);
        return [];
    }
}
