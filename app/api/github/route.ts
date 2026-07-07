import { NextResponse } from "next/server";

export const runtime = "nodejs";

interface GithubStatsResult {
  repos: number;
  weeklyCommits: number;
  totalStars: number;
  contributionStreak: number;
}

// In-memory cache (per server instance) as a lightweight backstop.
// Note: on serverless platforms (Vercel) this cache does NOT reliably persist
// across invocations — real caching is handled via `next: { revalidate }` below.
let cachedGithubData: GithubStatsResult | null = null;
let lastCacheTime = 0;
const CACHE_TTL_MS = 3600 * 1000;

const GITHUB_USER = "Abdulgeni";

function buildHeaders(): HeadersInit {
  const headers: Record<string, string> = {
    "User-Agent": "abdulgeni-portfolio-console",
    Accept: "application/vnd.github+json",
  };
  if (process.env.GITHUB_TOKEN) {
    headers["Authorization"] = `Bearer ${process.env.GITHUB_TOKEN}`;
  } else {
    console.warn(
      "GITHUB_TOKEN is not set — requests will be rate-limited to 60/hour per IP and will likely fall back to placeholder values."
    );
  }
  return headers;
}

async function fetchGithubStats(): Promise<GithubStatsResult> {
  const headers = buildHeaders();

  try {
    // ---- Public repo count ----
    const userRes = await fetch(`https://api.github.com/users/${GITHUB_USER}`, {
      headers,
      next: { revalidate: 3600 },
    });

    let repos = 15; // fallback
    if (userRes.ok) {
      const userData = (await userRes.json()) as { public_repos?: number };
      repos = userData.public_repos ?? repos;
    } else {
      console.error(
        "GitHub /users request failed:",
        userRes.status,
        await userRes.text()
      );
    }

    // ---- Total stars across repos ----
    let totalStars = 12; // fallback
    try {
      const reposRes = await fetch(
        `https://api.github.com/users/${GITHUB_USER}/repos?per_page=100`,
        { headers, next: { revalidate: 3600 } }
      );
      if (reposRes.ok) {
        const reposData = (await reposRes.json()) as Array<{ stargazers_count?: number }>;
        if (Array.isArray(reposData)) {
          totalStars = reposData.reduce((acc, r) => acc + (r.stargazers_count || 0), 0);
        }
      } else {
        console.error(
          "GitHub /repos request failed:",
          reposRes.status,
          await reposRes.text()
        );
      }
    } catch (err) {
      console.error("Error fetching repo list for stars:", err);
    }

    // ---- Weekly commits + contribution streak (derived from public events) ----
    const eventsRes = await fetch(
      `https://api.github.com/users/${GITHUB_USER}/events/public?per_page=100`,
      { headers, next: { revalidate: 3600 } }
    );

    let weeklyCommits = 24; // fallback
    let contributionStreak = 6; // fallback

    if (eventsRes.ok) {
      const events = (await eventsRes.json()) as Array<{
        type: string;
        created_at?: string;
        payload?: { commits?: unknown[] };
      }>;

      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

      let commitCount = 0;
      const activeDates = new Set<string>();

      for (const event of events) {
        if (event.type === "PushEvent" && event.created_at) {
          const eventDate = new Date(event.created_at);
          if (eventDate >= sevenDaysAgo && event.payload?.commits) {
            commitCount += event.payload.commits.length;
          }
          const dateStr = event.created_at.substring(0, 10); // YYYY-MM-DD
          activeDates.add(dateStr);
        }
      }

      // Only overwrite the fallback once we have real signal.
      // (Leaving commitCount === 0 as-is would misreport a quiet week as "no data".)
      weeklyCommits = commitCount;

      // Calculate consecutive active days streak from events.
      // Note: /events/public only returns the last ~90 days / 300 events max,
      // so long streaks may be undercounted — this is a REST API limitation.
      let streak = 0;
      const checkDate = new Date();
      for (let i = 0; i < 15; i++) {
        const dateStr = checkDate.toISOString().substring(0, 10);
        if (activeDates.has(dateStr)) {
          streak++;
        } else if (i === 0) {
          // Allow today to be empty if yesterday had a commit
          checkDate.setDate(checkDate.getDate() - 1);
          continue;
        } else {
          break;
        }
        checkDate.setDate(checkDate.getDate() - 1);
      }
      contributionStreak = streak; // no artificial floor
    } else {
      console.error(
        "GitHub /events/public request failed:",
        eventsRes.status,
        await eventsRes.text()
      );
    }

    return { repos, weeklyCommits, totalStars, contributionStreak };
  } catch (error) {
    console.error("Error fetching live GitHub stats:", error);
    return { repos: 15, weeklyCommits: 24, totalStars: 12, contributionStreak: 6 };
  }
}

export async function GET() {
  const now = Date.now();
  if (cachedGithubData && now - lastCacheTime < CACHE_TTL_MS) {
    return NextResponse.json(cachedGithubData);
  }

  const stats = await fetchGithubStats();
  cachedGithubData = stats;
  lastCacheTime = now;

  return NextResponse.json(stats, {
    headers: { "Cache-Control": "public, max-age=3600, stale-while-revalidate=600" },
  });
}