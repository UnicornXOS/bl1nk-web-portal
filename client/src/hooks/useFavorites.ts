import { trpc } from "@/lib/trpc";
import { useCallback, useMemo } from "react";

interface UseFavoritesOptions {
  enabled?: boolean;
}

/**
 * Hook to manage user favorites
 * Provides methods to add, remove, and check favorites
 */
export function useFavorites(options?: UseFavoritesOptions) {
  const utils = trpc.useUtils();
  const { enabled = true } = options || {};

  // Get all favorites
  const { data: favoritesData, isLoading: isLoadingFavorites } =
    trpc.favorites.getMyFavorites.useQuery(undefined, { enabled });

  // Get favorite count
  const { data: countData } = trpc.favorites.getFavoriteCount.useQuery(undefined, { enabled });

  // Add favorite mutation
  const addFavoriteMutation = trpc.favorites.addFavorite.useMutation({
    onSuccess: () => {
      if (enabled) {
        utils.favorites.getMyFavorites.invalidate();
        utils.favorites.getFavoriteCount.invalidate();
      }
    },
  });

  // Remove favorite mutation
  const removeFavoriteMutation = trpc.favorites.removeFavorite.useMutation({
    onSuccess: () => {
      if (enabled) {
        utils.favorites.getMyFavorites.invalidate();
        utils.favorites.getFavoriteCount.invalidate();
      }
    },
  });

  // Check if content is favorited (using query instead of mutation)
  // This is handled through the favoritedIds Set

  // Get list of favorited content IDs
  const favoritedIds = useMemo(() => {
    if (!enabled || !favoritesData?.success || !favoritesData?.data) {
      return new Set<string>();
    }
    return new Set(favoritesData.data.map((fav) => fav.contentId));
  }, [favoritesData, enabled]);

  // Add to favorites
  const addFavorite = useCallback(
    async (
      contentId: string,
      contentType: "github" | "gitbook" | "notion" | "other",
      contentTitle: string,
      contentUrl: string,
      contentDescription?: string
    ) => {
      if (!enabled) return false;

      try {
        await addFavoriteMutation.mutateAsync({
          contentId,
          contentType,
          contentTitle,
          contentUrl,
          contentDescription,
        });
        return true;
      } catch (error) {
        console.error("Failed to add favorite:", error);
        return false;
      }
    },
    [addFavoriteMutation, enabled]
  );

  // Remove from favorites
  const removeFavorite = useCallback(
    async (contentId: string) => {
      if (!enabled) return false;

      try {
        await removeFavoriteMutation.mutateAsync({ contentId });
        return true;
      } catch (error) {
        console.error("Failed to remove favorite:", error);
        return false;
      }
    },
    [removeFavoriteMutation, enabled]
  );

  // Toggle favorite
  const toggleFavorite = useCallback(
    async (
      contentId: string,
      contentType: "github" | "gitbook" | "notion" | "other",
      contentTitle: string,
      contentUrl: string,
      contentDescription?: string
    ) => {
      if (!enabled) return false;

      const isFav = favoritedIds.has(contentId);

      if (isFav) {
        return removeFavorite(contentId);
      } else {
        return addFavorite(contentId, contentType, contentTitle, contentUrl, contentDescription);
      }
    },
    [favoritedIds, addFavorite, removeFavorite, enabled]
  );

  // Check if specific content is favorited
  const isFavorited = useCallback(
    (contentId: string) => {
      return favoritedIds.has(contentId);
    },
    [favoritedIds]
  );

  return {
    favorites: enabled ? (favoritesData?.data || []) : [],
    favoritedIds,
    favoriteCount: enabled ? (countData?.count || 0) : 0,
    isLoading: enabled ? isLoadingFavorites : false,
    isAdding: addFavoriteMutation.isPending,
    isRemoving: removeFavoriteMutation.isPending,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorited,
  };
}
