import { z } from "zod";

/**
 * Content Card Schema
 * Used for validating content card data across client and server
 */

export const ContentSourceEnum = z.enum(["github", "gitbook", "notion"]);
export type ContentSource = z.infer<typeof ContentSourceEnum>;

export const ContentCardSchema = z.object({
  id: z.string().min(1, "ID is required"),
  title: z.string().min(1, "Title is required").max(200, "Title must be less than 200 characters"),
  description: z.string().min(1, "Description is required").max(1000, "Description must be less than 1000 characters"),
  source: ContentSourceEnum,
  url: z.string().url("Invalid URL format"),
  tags: z.array(z.string().max(50, "Tag must be less than 50 characters")).max(10, "Maximum 10 tags allowed").default([]),
  lastUpdated: z.string().optional(),
  featured: z.boolean().default(false),
});

export type ContentCard = z.infer<typeof ContentCardSchema>;

/**
 * Create/Update Content Card Schema
 * Used when creating or updating cards (without ID)
 */
export const CreateContentCardSchema = ContentCardSchema.omit({ id: true }).strict();
export type CreateContentCard = z.infer<typeof CreateContentCardSchema>;

/**
 * Content Card Filter Schema
 * Used for filtering content cards
 */
export const ContentCardFilterSchema = z.object({
  source: ContentSourceEnum.optional(),
  tags: z.array(z.string()).optional(),
  searchQuery: z.string().optional(),
  featured: z.boolean().optional(),
});

export type ContentCardFilter = z.infer<typeof ContentCardFilterSchema>;

/**
 * Batch Content Card Schema
 * Used for handling multiple cards at once
 */
export const BatchContentCardsSchema = z.object({
  cards: z.array(ContentCardSchema),
  action: z.enum(["create", "update", "delete", "reorder"]),
});

export type BatchContentCards = z.infer<typeof BatchContentCardsSchema>;
