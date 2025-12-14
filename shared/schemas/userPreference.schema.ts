import { z } from "zod";
import { ContentSourceEnum } from "./contentCard.schema";

/**
 * User Preference Schema
 * Used for validating user preference data
 */

export const UserPreferenceSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  theme: z.enum(["dark", "light"]).default("dark"),
  enabledSources: z.array(ContentSourceEnum).default(["github", "gitbook", "notion"]),
  cardOrder: z.array(z.string()).default([]),
  favoriteAgents: z.array(z.string()).default([]),
  favoriteCards: z.array(z.string()).default([]),
  notificationsEnabled: z.boolean().default(true),
  autoRefresh: z.boolean().default(false),
  autoRefreshInterval: z.number().int().positive().default(300000), // 5 minutes in ms
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type UserPreference = z.infer<typeof UserPreferenceSchema>;

/**
 * Update User Preference Schema
 * Used when updating user preferences (partial update)
 */
export const UpdateUserPreferenceSchema = UserPreferenceSchema.partial().omit({
  userId: true,
  createdAt: true,
});

export type UpdateUserPreference = z.infer<typeof UpdateUserPreferenceSchema>;

/**
 * User Content Source Preference Schema
 * Used for managing which content sources are enabled
 */
export const UserContentSourcePreferenceSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  source: ContentSourceEnum,
  enabled: z.boolean(),
  lastSyncedAt: z.date().optional(),
  apiToken: z.string().optional(), // For OAuth tokens
});

export type UserContentSourcePreference = z.infer<typeof UserContentSourcePreferenceSchema>;

/**
 * User Workspace Settings Schema
 * Used for workspace-specific settings
 */
export const UserWorkspaceSettingsSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  workspaceId: z.string().min(1, "Workspace ID is required"),
  defaultView: z.enum(["grid", "list", "kanban"]).default("grid"),
  itemsPerPage: z.number().int().positive().default(12),
  sortBy: z.enum(["title", "date", "source", "custom"]).default("custom"),
  filterByFeatured: z.boolean().default(false),
});

export type UserWorkspaceSettings = z.infer<typeof UserWorkspaceSettingsSchema>;
