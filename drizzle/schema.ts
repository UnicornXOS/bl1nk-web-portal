import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * User Favorites table
 * Stores user's favorite content items (GitHub repos, GitBook docs, Notion pages, etc.)
 */
export const userFavorites = mysqlTable("user_favorites", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  contentId: varchar("contentId", { length: 255 }).notNull(),
  contentType: mysqlEnum("contentType", ["github", "gitbook", "notion", "other"])
    .notNull()
    .default("other"),
  contentTitle: text("contentTitle").notNull(),
  contentUrl: text("contentUrl").notNull(),
  contentDescription: text("contentDescription"),
  contentImage: text("contentImage"),
  tags: text("tags"), // JSON array stored as string
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type UserFavorite = typeof userFavorites.$inferSelect;
export type InsertUserFavorite = typeof userFavorites.$inferInsert;

/**
 * User Preferences table
 * Stores user's dashboard preferences, theme settings, etc.
 */
export const userPreferences = mysqlTable("user_preferences", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId")
    .notNull()
    .unique()
    .references(() => users.id, { onDelete: "cascade" }),
  theme: mysqlEnum("theme", ["light", "dark"]).default("dark").notNull(),
  language: varchar("language", { length: 10 }).default("en").notNull(),
  notificationsEnabled: int("notificationsEnabled").default(1).notNull(), // 0 = false, 1 = true
  emailNotifications: int("emailNotifications").default(1).notNull(),
  dashboardLayout: varchar("dashboardLayout", { length: 50 }).default("grid").notNull(),
  itemsPerPage: int("itemsPerPage").default(20).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type UserPreference = typeof userPreferences.$inferSelect;
export type InsertUserPreference = typeof userPreferences.$inferInsert;

/**
 * API Keys table
 * Stores encrypted API keys for third-party services (GitHub, Bedrock, etc.)
 */
export const apiKeys = mysqlTable("api_keys", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  provider: varchar("provider", { length: 50 }).notNull(), // github, bedrock, vercel, aws, etc.
  keyName: varchar("keyName", { length: 255 }).notNull(),
  encryptedKey: text("encryptedKey").notNull(), // Encrypted API key
  isActive: int("isActive").default(1).notNull(), // 0 = false, 1 = true
  lastUsed: timestamp("lastUsed"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type ApiKey = typeof apiKeys.$inferSelect;
export type InsertApiKey = typeof apiKeys.$inferInsert;


/**
 * Agents table
 * Stores AI agent profiles with metadata, tools, and configuration
 */
export const agents = mysqlTable("agents", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  version: varchar("version", { length: 50 }).notNull().default("1.0.0"),
  description: text("description"),
  language: mysqlEnum("language", ["js", "ts", "python", "uv", "json", "yaml"])
    .notNull()
    .default("ts"),
  tools: text("tools"), // JSON array stored as string
  endpoint: varchar("endpoint", { length: 255 }).notNull(), // relative path to entry file
  dependencies: text("dependencies"), // JSON array stored as string
  autoLoad: int("autoLoad").default(0).notNull(), // 0 = false, 1 = true
  author: varchar("author", { length: 255 }),
  authorUrl: text("authorUrl"),
  repositoryUrl: text("repositoryUrl"),
  documentationUrl: text("documentationUrl"),
  tags: text("tags"), // JSON array stored as string
  isPublic: int("isPublic").default(1).notNull(), // 0 = private, 1 = public
  downloadCount: int("downloadCount").default(0).notNull(),
  rating: int("rating").default(0).notNull(), // 0-5 stars
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Agent = typeof agents.$inferSelect;
export type InsertAgent = typeof agents.$inferInsert;


/**
 * Agent Profiles table
 * Stores agent profile information (Builder, Analyzer, Designer, etc.)
 * Separate from AI Agents table
 */
export const agentProfiles = mysqlTable("agent_profiles", {
  id: int("id").autoincrement().primaryKey(),
  agentProfile: varchar("agentProfile", { length: 255 }).notNull(), // e.g., "Builder", "Analyzer"
  agentId: varchar("agentId", { length: 255 }).notNull().unique(), // Unique identifier
  track: varchar("track", { length: 100 }).notNull(), // Track category
  description: text("description"),
  emoji: varchar("emoji", { length: 10 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type AgentProfile = typeof agentProfiles.$inferSelect;
export type InsertAgentProfile = typeof agentProfiles.$inferInsert;

/**
 * Agent Skills table
 * Stores skills/capabilities for each agent profile
 */
export const agentSkills = mysqlTable("agent_skills", {
  id: int("id").autoincrement().primaryKey(),
  agentProfileId: int("agentProfileId")
    .notNull()
    .references(() => agentProfiles.id, { onDelete: "cascade" }),
  skillId: varchar("skillId", { length: 255 }).notNull(),
  skillName: varchar("skillName", { length: 255 }).notNull(),
  skillDescription: text("skillDescription"),
  category: varchar("category", { length: 100 }),
  proficiencyLevel: mysqlEnum("proficiencyLevel", ["beginner", "intermediate", "advanced", "expert"])
    .default("intermediate")
    .notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type AgentSkill = typeof agentSkills.$inferSelect;
export type InsertAgentSkill = typeof agentSkills.$inferInsert;
