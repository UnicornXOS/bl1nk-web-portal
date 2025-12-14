import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useGitHubRepositories } from "../useGitHubRepositories";
import { trpc } from "@/lib/trpc";

// Mock trpc
vi.mock("@/lib/trpc", () => ({
  trpc: {
    github: {
      getRepositories: {
        useQuery: vi.fn(),
      },
    },
  },
}));

describe("useGitHubRepositories", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return empty items when data is not available", () => {
    vi.mocked(trpc.github.getRepositories.useQuery).mockReturnValue({
      data: undefined,
      isLoading: false,
      error: null,
    } as any);

    const { result } = renderHook(() =>
      useGitHubRepositories({
        username: "testuser",
      })
    );

    expect(result.current.items).toEqual([]);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("should convert GitHub repos to ContentItem format", () => {
    const mockRepos = {
      success: true,
      data: [
        {
          id: 1,
          name: "test-repo",
          description: "A test repository",
          url: "https://github.com/test/repo",
          stars: 150,
          language: "TypeScript",
          topics: ["react", "typescript"],
          updatedAt: "2024-01-15T10:00:00Z",
        },
      ],
      count: 1,
    };

    vi.mocked(trpc.github.getRepositories.useQuery).mockReturnValue({
      data: mockRepos,
      isLoading: false,
      error: null,
    } as any);

    const { result } = renderHook(() =>
      useGitHubRepositories({
        username: "testuser",
      })
    );

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0]).toEqual({
      id: "github-1",
      title: "test-repo",
      description: "A test repository",
      source: "github",
      url: "https://github.com/test/repo",
      tags: ["react", "typescript"],
      lastUpdated: expect.any(String),
      featured: true, // 150 stars > 100
    });
  });

  it("should mark repos with 100+ stars as featured", () => {
    const mockRepos = {
      success: true,
      data: [
        {
          id: 1,
          name: "popular-repo",
          description: "Popular repository",
          url: "https://github.com/test/popular",
          stars: 500,
          language: "JavaScript",
          topics: [],
          updatedAt: "2024-01-15T10:00:00Z",
        },
        {
          id: 2,
          name: "small-repo",
          description: "Small repository",
          url: "https://github.com/test/small",
          stars: 10,
          language: "Python",
          topics: [],
          updatedAt: "2024-01-15T10:00:00Z",
        },
      ],
      count: 2,
    };

    vi.mocked(trpc.github.getRepositories.useQuery).mockReturnValue({
      data: mockRepos,
      isLoading: false,
      error: null,
    } as any);

    const { result } = renderHook(() =>
      useGitHubRepositories({
        username: "testuser",
      })
    );

    expect(result.current.items[0].featured).toBe(true);
    expect(result.current.items[1].featured).toBe(false);
  });

  it("should use language as tag when topics are empty", () => {
    const mockRepos = {
      success: true,
      data: [
        {
          id: 1,
          name: "lang-repo",
          description: "Repository with language",
          url: "https://github.com/test/lang",
          stars: 50,
          language: "Go",
          topics: [],
          updatedAt: "2024-01-15T10:00:00Z",
        },
      ],
      count: 1,
    };

    vi.mocked(trpc.github.getRepositories.useQuery).mockReturnValue({
      data: mockRepos,
      isLoading: false,
      error: null,
    } as any);

    const { result } = renderHook(() =>
      useGitHubRepositories({
        username: "testuser",
      })
    );

    expect(result.current.items[0].tags).toEqual(["Go"]);
  });

  it("should handle API errors gracefully", () => {
    vi.mocked(trpc.github.getRepositories.useQuery).mockReturnValue({
      data: {
        success: false,
        error: "API rate limit exceeded",
        data: [],
        count: 0,
      },
      isLoading: false,
      error: new Error("API rate limit exceeded"),
    } as any);

    const { result } = renderHook(() =>
      useGitHubRepositories({
        username: "testuser",
      })
    );

    expect(result.current.items).toEqual([]);
    expect(result.current.error).toBe("API rate limit exceeded");
    expect(result.current.count).toBe(0);
  });

  it("should respect enabled flag", () => {
    vi.mocked(trpc.github.getRepositories.useQuery).mockReturnValue({
      data: undefined,
      isLoading: false,
      error: null,
    } as any);

    renderHook(() =>
      useGitHubRepositories({
        username: "testuser",
        enabled: false,
      })
    );

    expect(trpc.github.getRepositories.useQuery).toHaveBeenCalledWith(
      { username: "testuser", token: undefined },
      { enabled: false }
    );
  });

  it("should pass token to API when provided", () => {
    vi.mocked(trpc.github.getRepositories.useQuery).mockReturnValue({
      data: undefined,
      isLoading: false,
      error: null,
    } as any);

    renderHook(() =>
      useGitHubRepositories({
        username: "testuser",
        token: "test-token-123",
      })
    );

    expect(trpc.github.getRepositories.useQuery).toHaveBeenCalledWith(
      { username: "testuser", token: "test-token-123" },
      expect.any(Object)
    );
  });
});
