import { z } from "zod";

/**
 * User Favorite Schema
 * Validates user favorite items for content cards
 */

export const UserFavoriteSchema = z.object({
  id: z.number().optional(),
  userId: z.number(),
  contentId: z.string(),
  contentType: z.enum(["github", "gitbook", "notion", "other"]),
  contentTitle: z.string(),
  contentUrl: z.string().url(),
  contentDescription: z.string().optional().nullable(),
  contentImage: z.string().url().optional().nullable(),
  tags: z.array(z.string()).optional().nullable(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const CreateUserFavoriteSchema = z.object({
  contentId: z.string(),
  contentType: z.enum(["github", "gitbook", "notion", "other"]),
  contentTitle: z.string(),
  contentUrl: z.string().url(),
  contentDescription: z.string().optional(),
  contentImage: z.string().url().optional(),
  tags: z.array(z.string()).optional(),
});

export const UpdateUserFavoriteSchema = z.object({
  contentDescription: z.string().optional(),
  contentImage: z.string().url().optional(),
  tags: z.array(z.string()).optional(),
});

export const DeleteUserFavoriteSchema = z.object({
  userId: z.number(),
  contentId: z.string(),
});

export const GetUserFavoritesSchema = z.object({
  userId: z.number(),
  contentType: z.enum(["github", "gitbook", "notion", "other"]).optional(),
  limit: z.number().min(1).max(100).optional().default(50),
  offset: z.number().min(0).optional().default(0),
});

export type UserFavorite = z.infer<typeof UserFavoriteSchema>;
export type CreateUserFavorite = z.infer<typeof CreateUserFavoriteSchema>;
export type UpdateUserFavorite = z.infer<typeof UpdateUserFavoriteSchema>;
export type DeleteUserFavorite = z.infer<typeof DeleteUserFavoriteSchema>;
export type GetUserFavorites = z.infer<typeof GetUserFavoritesSchema>;
