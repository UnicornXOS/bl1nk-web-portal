import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";

/**
 * GitHub API Router
 * Handles GitHub repository fetching and related operations
 */

// Zod schemas for GitHub data validation
const GitHubRepoSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().nullable(),
  url: z.string(),
  stars: z.number(),
  language: z.string().nullable(),
  topics: z.array(z.string()),
  updatedAt: z.string(),
});

const GitHubUserSchema = z.object({
  login: z.string(),
  name: z.string().nullable(),
  avatar_url: z.string(),
  bio: z.string().nullable(),
  public_repos: z.number(),
});

export type GitHubRepo = z.infer<typeof GitHubRepoSchema>;
export type GitHubUser = z.infer<typeof GitHubUserSchema>;

/**
 * Fetch repositories from GitHub API
 * Uses the user's GitHub OAuth token for authentication
 */
async function fetchGitHubRepositories(
  username: string,
  token?: string
): Promise<GitHubRepo[]> {
  try {
    const headers: HeadersInit = {
      Accept: "application/vnd.github.v3+json",
    };

    if (token) {
      headers.Authorization = `token ${token}`;
    }

    const response = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=30`,
      { headers }
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.statusText}`);
    }

    const data = await response.json();

    return data.map((repo: any) => ({
      id: repo.id,
      name: repo.name,
      description: repo.description,
      url: repo.html_url,
      stars: repo.stargazers_count,
      language: repo.language,
      topics: repo.topics || [],
      updatedAt: repo.updated_at,
    }));
  } catch (error) {
    console.error("Failed to fetch GitHub repositories:", error);
    throw error;
  }
}

/**
 * Fetch GitHub user information
 */
async function fetchGitHubUser(
  username: string,
  token?: string
): Promise<GitHubUser> {
  try {
    const headers: HeadersInit = {
      Accept: "application/vnd.github.v3+json",
    };

    if (token) {
      headers.Authorization = `token ${token}`;
    }

    const response = await fetch(`https://api.github.com/users/${username}`, {
      headers,
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.statusText}`);
    }

    const data = await response.json();

    return {
      login: data.login,
      name: data.name,
      avatar_url: data.avatar_url,
      bio: data.bio,
      public_repos: data.public_repos,
    };
  } catch (error) {
    console.error("Failed to fetch GitHub user:", error);
    throw error;
  }
}

export const githubRouter = router({
  /**
   * Get repositories for a GitHub user
   * Public procedure - no authentication required
   */
  getRepositories: publicProcedure
    .input(
      z.object({
        username: z.string().min(1),
        token: z.string().optional(),
      })
    )
    .query(async ({ input }) => {
      try {
        const repos = await fetchGitHubRepositories(input.username, input.token);
        return {
          success: true,
          data: repos,
          count: repos.length,
        };
      } catch (error) {
        return {
          success: false,
          error: error instanceof Error ? error.message : "Unknown error",
          data: [],
          count: 0,
        };
      }
    }),

  /**
   * Get GitHub user information
   * Public procedure - no authentication required
   */
  getUser: publicProcedure
    .input(
      z.object({
        username: z.string().min(1),
        token: z.string().optional(),
      })
    )
    .query(async ({ input }) => {
      try {
        const user = await fetchGitHubUser(input.username, input.token);
        return {
          success: true,
          data: user,
        };
      } catch (error) {
        return {
          success: false,
          error: error instanceof Error ? error.message : "Unknown error",
          data: null,
        };
      }
    }),

  /**
   * Search GitHub repositories
   * Public procedure - searches across GitHub
   */
  searchRepositories: publicProcedure
    .input(
      z.object({
        query: z.string().min(1),
        language: z.string().optional(),
        sort: z.enum(["stars", "forks", "updated"]).optional(),
        token: z.string().optional(),
      })
    )
    .query(async ({ input }) => {
      try {
        const headers: HeadersInit = {
          Accept: "application/vnd.github.v3+json",
        };

        if (input.token) {
          headers.Authorization = `token ${input.token}`;
        }

        let searchQuery = input.query;
        if (input.language) {
          searchQuery += ` language:${input.language}`;
        }

        const response = await fetch(
          `https://api.github.com/search/repositories?q=${encodeURIComponent(searchQuery)}&sort=${input.sort || "stars"}&per_page=30`,
          { headers }
        );

        if (!response.ok) {
          throw new Error(`GitHub API error: ${response.statusText}`);
        }

        const data = await response.json();

        return {
          success: true,
          data: data.items.map((repo: any) => ({
            id: repo.id,
            name: repo.name,
            description: repo.description,
            url: repo.html_url,
            stars: repo.stargazers_count,
            language: repo.language,
            topics: repo.topics || [],
            updatedAt: repo.updated_at,
          })),
          count: data.total_count,
        };
      } catch (error) {
        return {
          success: false,
          error: error instanceof Error ? error.message : "Unknown error",
          data: [],
          count: 0,
        };
      }
    }),
});
