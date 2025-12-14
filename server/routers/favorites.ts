import { z } from "zod";
import { protectedProcedure, router } from "../_core/trpc";
import { getDb } from "../db";
import { userFavorites } from "../../drizzle/schema";
import { eq, and } from "drizzle-orm";
import {
  CreateUserFavoriteSchema,
  DeleteUserFavoriteSchema,
  GetUserFavoritesSchema,
} from "../../shared/schemas/userFavorite.schema";

/**
 * Favorites Router
 * Handles user favorite items management
 */

export const favoritesRouter = router({
  /**
   * Get all favorites for the current user
   * Protected procedure - requires authentication
   */
  getMyFavorites: protectedProcedure
    .input(
      GetUserFavoritesSchema.omit({ userId: true }).optional()
    )
    .query(async ({ ctx, input }) => {
      try {
        const db = await getDb();
        if (!db) {
          return {
            success: false,
            error: "Database not available",
            data: [],
            count: 0,
          };
        }

        const limit = input?.limit || 50;
        const offset = input?.offset || 0;

        let whereClause = eq(userFavorites.userId, ctx.user.id);

        if (input?.contentType) {
          whereClause = and(
            eq(userFavorites.userId, ctx.user.id),
            eq(userFavorites.contentType, input.contentType)
          )!;
        }

        const favorites = await db
          .select()
          .from(userFavorites)
          .where(whereClause)
          .limit(limit)
          .offset(offset);

        return {
          success: true,
          data: favorites.map((fav) => ({
            ...fav,
            tags: fav.tags ? JSON.parse(fav.tags) : [],
          })),
          count: favorites.length,
        };
      } catch (error) {
        console.error("Failed to get favorites:", error);
        return {
          success: false,
          error: error instanceof Error ? error.message : "Unknown error",
          data: [],
          count: 0,
        };
      }
    }),

  /**
   * Add a new favorite for the current user
   * Protected procedure - requires authentication
   */
  addFavorite: protectedProcedure
    .input(CreateUserFavoriteSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const db = await getDb();
        if (!db) {
          return {
            success: false,
            error: "Database not available",
          };
        }

        // Check if already favorited
        const existing = await db
          .select()
          .from(userFavorites)
          .where(
            and(
              eq(userFavorites.userId, ctx.user.id),
              eq(userFavorites.contentId, input.contentId)
            )
          )
          .limit(1);

        if (existing.length > 0) {
          return {
            success: false,
            error: "Already added to favorites",
          };
        }

        // Add to favorites
        await db.insert(userFavorites).values({
          userId: ctx.user.id,
          contentId: input.contentId,
          contentType: input.contentType,
          contentTitle: input.contentTitle,
          contentUrl: input.contentUrl,
          contentDescription: input.contentDescription || null,
          contentImage: input.contentImage || null,
          tags: input.tags ? JSON.stringify(input.tags) : null,
        });

        return {
          success: true,
          message: "Added to favorites",
        };
      } catch (error) {
        console.error("Failed to add favorite:", error);
        return {
          success: false,
          error: error instanceof Error ? error.message : "Unknown error",
        };
      }
    }),

  /**
   * Remove a favorite for the current user
   * Protected procedure - requires authentication
   */
  removeFavorite: protectedProcedure
    .input(z.object({
      contentId: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      try {
        const db = await getDb();
        if (!db) {
          return {
            success: false,
            error: "Database not available",
          };
        }

        await db
          .delete(userFavorites)
          .where(
            and(
              eq(userFavorites.userId, ctx.user.id),
              eq(userFavorites.contentId, input.contentId)
            )
          );

        return {
          success: true,
          message: "Removed from favorites",
        };
      } catch (error) {
        console.error("Failed to remove favorite:", error);
        return {
          success: false,
          error: error instanceof Error ? error.message : "Unknown error",
        };
      }
    }),

  /**
   * Check if a content is favorited by the current user
   * Protected procedure - requires authentication
   */
  isFavorited: protectedProcedure
    .input(
      z.object({
        contentId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      try {
        const db = await getDb();
        if (!db) {
          return {
            success: false,
            isFavorited: false,
          };
        }

        const result = await db
          .select()
          .from(userFavorites)
          .where(
            and(
              eq(userFavorites.userId, ctx.user.id),
              eq(userFavorites.contentId, input.contentId)
            )!
          )
          .limit(1);

        return {
          success: true,
          isFavorited: result.length > 0,
        };
      } catch (error) {
        console.error("Failed to check favorite:", error);
        return {
          success: false,
          isFavorited: false,
        };
      }
    }),

  /**
   * Get favorite count for the current user
   * Protected procedure - requires authentication
   */
  getFavoriteCount: protectedProcedure.query(async ({ ctx }) => {
    try {
      const db = await getDb();
      if (!db) {
        return {
          success: false,
          count: 0,
        };
      }

      const result = await db
        .select()
        .from(userFavorites)
        .where(eq(userFavorites.userId, ctx.user.id))!;

      return {
        success: true,
        count: result.length,
      };
    } catch (error) {
      console.error("Failed to get favorite count:", error);
      return {
        success: false,
        count: 0,
      };
    }
  }),

  /**
   * Delete a favorite for the current user
   * Protected procedure - requires authentication
   */
  deleteFavorite: protectedProcedure
    .input(z.object({
      contentId: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      try {
        const db = await getDb();
        if (!db) {
          return {
            success: false,
            error: "Database not available",
          };
        }

        await db
          .delete(userFavorites)
          .where(
            and(
              eq(userFavorites.userId, ctx.user.id),
              eq(userFavorites.contentId, input.contentId)
            )
          );

        return {
          success: true,
          message: "Deleted from favorites",
        };
      } catch (error) {
        console.error("Failed to delete favorite:", error);
        return {
          success: false,
          error: error instanceof Error ? error.message : "Unknown error",
        };
      }
    }),
});
