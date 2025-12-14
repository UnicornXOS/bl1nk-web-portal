import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useFavorites } from "../useFavorites";
import { trpc } from "@/lib/trpc";

// Mock trpc
vi.mock("@/lib/trpc", () => ({
  trpc: {
    favorites: {
      getMyFavorites: {
        useQuery: vi.fn(),
      },
      getFavoriteCount: {
        useQuery: vi.fn(),
      },
      addFavorite: {
        useMutation: vi.fn(),
      },
      removeFavorite: {
        useMutation: vi.fn(),
      },
    },
    useUtils: vi.fn(),
  },
}));

const createMockMutation = (mutateAsync: any) => ({
  mutateAsync,
  isPending: false,
  isError: false,
  isSuccess: false,
  data: undefined,
  error: null,
});

describe("useFavorites", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    // Mock useUtils
    vi.mocked(trpc.useUtils).mockReturnValue({
      favorites: {
        getMyFavorites: { invalidate: vi.fn() },
        getFavoriteCount: { invalidate: vi.fn() },
      },
    } as any);
  });

  it("should initialize with empty favorites", () => {
    vi.mocked(trpc.favorites.getMyFavorites.useQuery).mockReturnValue({
      data: { success: true, data: [] },
      isLoading: false,
      error: null,
    } as any);

    vi.mocked(trpc.favorites.getFavoriteCount.useQuery).mockReturnValue({
      data: { success: true, count: 0 },
      isLoading: false,
      error: null,
    } as any);

    vi.mocked(trpc.favorites.addFavorite.useMutation).mockReturnValue(
      createMockMutation(vi.fn()) as any
    );

    vi.mocked(trpc.favorites.removeFavorite.useMutation).mockReturnValue(
      createMockMutation(vi.fn()) as any
    );

    const { result } = renderHook(() => useFavorites());

    expect(result.current.favorites).toEqual([]);
    expect(result.current.favoriteCount).toBe(0);
    expect(result.current.favoritedIds.size).toBe(0);
  });

  it("should load favorites from API", () => {
    const mockFavorites = [
      {
        id: 1,
        userId: 1,
        contentId: "github-1",
        contentType: "github" as const,
        contentTitle: "Test Repo",
        contentUrl: "https://github.com/test/repo",
        contentDescription: "Test description",
        contentImage: null,
        tags: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    vi.mocked(trpc.favorites.getMyFavorites.useQuery).mockReturnValue({
      data: { success: true, data: mockFavorites },
      isLoading: false,
      error: null,
    } as any);

    vi.mocked(trpc.favorites.getFavoriteCount.useQuery).mockReturnValue({
      data: { success: true, count: 1 },
      isLoading: false,
      error: null,
    } as any);

    vi.mocked(trpc.favorites.addFavorite.useMutation).mockReturnValue(
      createMockMutation(vi.fn()) as any
    );

    vi.mocked(trpc.favorites.removeFavorite.useMutation).mockReturnValue(
      createMockMutation(vi.fn()) as any
    );

    const { result } = renderHook(() => useFavorites());

    expect(result.current.favorites).toHaveLength(1);
    expect(result.current.favoritedIds.has("github-1")).toBe(true);
    expect(result.current.favoriteCount).toBe(1);
  });

  it("should check if content is favorited", () => {
    const mockFavorites = [
      {
        id: 1,
        userId: 1,
        contentId: "github-1",
        contentType: "github" as const,
        contentTitle: "Test Repo",
        contentUrl: "https://github.com/test/repo",
        contentDescription: null,
        contentImage: null,
        tags: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    vi.mocked(trpc.favorites.getMyFavorites.useQuery).mockReturnValue({
      data: { success: true, data: mockFavorites },
      isLoading: false,
      error: null,
    } as any);

    vi.mocked(trpc.favorites.getFavoriteCount.useQuery).mockReturnValue({
      data: { success: true, count: 1 },
      isLoading: false,
      error: null,
    } as any);

    vi.mocked(trpc.favorites.addFavorite.useMutation).mockReturnValue(
      createMockMutation(vi.fn()) as any
    );

    vi.mocked(trpc.favorites.removeFavorite.useMutation).mockReturnValue(
      createMockMutation(vi.fn()) as any
    );

    const { result } = renderHook(() => useFavorites());

    expect(result.current.isFavorited("github-1")).toBe(true);
    expect(result.current.isFavorited("github-2")).toBe(false);
  });

  it("should add favorite", async () => {
    const mockMutate = vi.fn().mockResolvedValue({ success: true });

    vi.mocked(trpc.favorites.getMyFavorites.useQuery).mockReturnValue({
      data: { success: true, data: [] },
      isLoading: false,
      error: null,
    } as any);

    vi.mocked(trpc.favorites.getFavoriteCount.useQuery).mockReturnValue({
      data: { success: true, count: 0 },
      isLoading: false,
      error: null,
    } as any);

    vi.mocked(trpc.favorites.addFavorite.useMutation).mockReturnValue(
      createMockMutation(mockMutate) as any
    );

    vi.mocked(trpc.favorites.removeFavorite.useMutation).mockReturnValue(
      createMockMutation(vi.fn()) as any
    );

    const { result } = renderHook(() => useFavorites());

    let success = false;
    await act(async () => {
      success = await result.current.addFavorite(
        "github-1",
        "github",
        "Test Repo",
        "https://github.com/test/repo",
        "Test description"
      );
    });

    expect(success).toBe(true);
    expect(mockMutate).toHaveBeenCalledWith({
      contentId: "github-1",
      contentType: "github",
      contentTitle: "Test Repo",
      contentUrl: "https://github.com/test/repo",
      contentDescription: "Test description",
    });
  });

  it("should remove favorite", async () => {
    const mockMutate = vi.fn().mockResolvedValue({ success: true });

    vi.mocked(trpc.favorites.getMyFavorites.useQuery).mockReturnValue({
      data: { success: true, data: [] },
      isLoading: false,
      error: null,
    } as any);

    vi.mocked(trpc.favorites.getFavoriteCount.useQuery).mockReturnValue({
      data: { success: true, count: 0 },
      isLoading: false,
      error: null,
    } as any);

    vi.mocked(trpc.favorites.removeFavorite.useMutation).mockReturnValue(
      createMockMutation(mockMutate) as any
    );

    vi.mocked(trpc.favorites.addFavorite.useMutation).mockReturnValue(
      createMockMutation(vi.fn()) as any
    );

    const { result } = renderHook(() => useFavorites());

    let success = false;
    await act(async () => {
      success = await result.current.removeFavorite("github-1");
    });

    expect(success).toBe(true);
    expect(mockMutate).toHaveBeenCalledWith({ contentId: "github-1" });
  });

  it("should toggle favorite - add when not favorited", async () => {
    const mockAddMutate = vi.fn().mockResolvedValue({ success: true });

    vi.mocked(trpc.favorites.getMyFavorites.useQuery).mockReturnValue({
      data: { success: true, data: [] },
      isLoading: false,
      error: null,
    } as any);

    vi.mocked(trpc.favorites.getFavoriteCount.useQuery).mockReturnValue({
      data: { success: true, count: 0 },
      isLoading: false,
      error: null,
    } as any);

    vi.mocked(trpc.favorites.addFavorite.useMutation).mockReturnValue(
      createMockMutation(mockAddMutate) as any
    );

    vi.mocked(trpc.favorites.removeFavorite.useMutation).mockReturnValue(
      createMockMutation(vi.fn()) as any
    );

    const { result } = renderHook(() => useFavorites());

    let success = false;
    await act(async () => {
      success = await result.current.toggleFavorite(
        "github-1",
        "github",
        "Test Repo",
        "https://github.com/test/repo"
      );
    });

    expect(success).toBe(true);
    expect(mockAddMutate).toHaveBeenCalled();
  });

  it("should handle API errors", async () => {
    const mockMutate = vi.fn().mockRejectedValue(new Error("API error"));

    vi.mocked(trpc.favorites.getMyFavorites.useQuery).mockReturnValue({
      data: { success: true, data: [] },
      isLoading: false,
      error: null,
    } as any);

    vi.mocked(trpc.favorites.getFavoriteCount.useQuery).mockReturnValue({
      data: { success: true, count: 0 },
      isLoading: false,
      error: null,
    } as any);

    vi.mocked(trpc.favorites.addFavorite.useMutation).mockReturnValue(
      createMockMutation(mockMutate) as any
    );

    vi.mocked(trpc.favorites.removeFavorite.useMutation).mockReturnValue(
      createMockMutation(vi.fn()) as any
    );

    const { result } = renderHook(() => useFavorites());

    let success = false;
    await act(async () => {
      success = await result.current.addFavorite(
        "github-1",
        "github",
        "Test Repo",
        "https://github.com/test/repo"
      );
    });

    expect(success).toBe(false);
  });

  it("should track loading states", () => {
    vi.mocked(trpc.favorites.getMyFavorites.useQuery).mockReturnValue({
      data: { success: true, data: [] },
      isLoading: true,
      error: null,
    } as any);

    vi.mocked(trpc.favorites.getFavoriteCount.useQuery).mockReturnValue({
      data: { success: true, count: 0 },
      isLoading: false,
      error: null,
    } as any);

    vi.mocked(trpc.favorites.addFavorite.useMutation).mockReturnValue({
      mutateAsync: vi.fn(),
      isPending: true,
      isError: false,
      isSuccess: false,
      data: undefined,
      error: null,
    } as any);

    vi.mocked(trpc.favorites.removeFavorite.useMutation).mockReturnValue(
      createMockMutation(vi.fn()) as any
    );

    const { result } = renderHook(() => useFavorites());

    expect(result.current.isLoading).toBe(true);
    expect(result.current.isAdding).toBe(true);
  });
});
