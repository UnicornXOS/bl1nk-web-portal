import { trpc } from "@/lib/trpc";
import { useMemo } from "react";

interface UseGitHubRepositoriesOptions {
  username: string;
  token?: string;
  enabled?: boolean;
}

/**
 * Hook to fetch GitHub repositories for a user
 * Converts GitHub API response to ContentItem format
 */
export function useGitHubRepositories({
  username,
  token,
  enabled = true,
}: UseGitHubRepositoriesOptions) {
  const { data, isLoading, error } = trpc.github.getRepositories.useQuery(
    { username, token },
    { enabled: enabled && !!username }
  );

  // Convert GitHub repos to ContentItem format
  const items = useMemo(() => {
    if (!data?.success || !data?.data) {
      return [];
    }

    return data.data.map((repo) => ({
      id: `github-${repo.id}`,
      title: repo.name,
      description: repo.description || "No description available",
      source: "github" as const,
      url: repo.url,
      tags: repo.topics.length > 0 ? repo.topics : (repo.language ? [repo.language] : []),
      lastUpdated: new Date(repo.updatedAt).toLocaleDateString(),
      featured: repo.stars > 100, // Mark repos with 100+ stars as featured
    }));
  }, [data]);

  return {
    items,
    isLoading,
    error: error?.message || (data?.success === false ? data?.error : null),
    count: data?.count || 0,
  };
}
