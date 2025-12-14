import { z } from "zod";
import { publicProcedure, protectedProcedure, router } from "../_core/trpc";
import { getDb } from "../db";
import { agents } from "../../drizzle/schema";
import { eq, like, desc } from "drizzle-orm";

/**
 * Agent Store Router
 * Manages AI agent profiles and metadata
 */

// Validation schemas
const AgentToolSchema = z.object({
  name: z.string(),
  description: z.string(),
});

const CreateAgentSchema = z.object({
  name: z.string().min(1).max(255),
  version: z.string().default("1.0.0"),
  description: z.string().optional(),
  language: z.enum(["js", "ts", "python", "uv", "json", "yaml"]).default("ts"),
  tools: z.array(AgentToolSchema).optional(),
  endpoint: z.string().min(1).max(255),
  dependencies: z.array(z.string()).optional(),
  autoLoad: z.boolean().default(false),
  author: z.string().optional(),
  authorUrl: z.string().optional(),
  repositoryUrl: z.string().optional(),
  documentationUrl: z.string().optional(),
  tags: z.array(z.string()).optional(),
  isPublic: z.boolean().default(true),
});

const UpdateAgentSchema = CreateAgentSchema.partial();

export const agentsRouter = router({
  /**
   * List all public agents
   */
  list: publicProcedure
    .input(
      z.object({
        page: z.number().default(1),
        limit: z.number().default(20),
        search: z.string().optional(),
        language: z.enum(["js", "ts", "python", "uv", "json", "yaml"]).optional(),
      })
    )
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return { agents: [], total: 0 };

      try {
        const offset = (input.page - 1) * input.limit;
        let conditions = [eq(agents.isPublic, 1)];

        if (input.search) {
          conditions.push(like(agents.name, `%${input.search}%`));
        }

        if (input.language) {
          conditions.push(eq(agents.language, input.language));
        }

        const results = await db
          .select()
          .from(agents)
          .where(conditions.length > 1 ? conditions[0] : eq(agents.isPublic, 1))
          .orderBy(desc(agents.downloadCount))
          .limit(input.limit)
          .offset(offset);

        return {
          agents: results,
          total: results.length,
        };
      } catch (error) {
        console.error("Failed to list agents:", error);
        return { agents: [], total: 0 };
      }
    }),

  /**
   * Get a single agent by ID
   */
  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return null;

      try {
        const result = await db
          .select()
          .from(agents)
          .where(eq(agents.id, input.id))
          .limit(1);

        return result[0] || null;
      } catch (error) {
        console.error("Failed to get agent:", error);
        return null;
      }
    }),

  /**
   * Search agents by name or description
   */
  search: publicProcedure
    .input(z.object({ query: z.string() }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return [];

      try {
        const results = await db
          .select()
          .from(agents)
          .where(like(agents.name, `%${input.query}%`))
          .limit(50);

        return results;
      } catch (error) {
        console.error("Failed to search agents:", error);
        return [];
      }
    }),

  /**
   * Create a new agent (admin only)
   */
  create: protectedProcedure
    .input(CreateAgentSchema)
    .mutation(async ({ input, ctx }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      // Only admins can create agents
      if (ctx.user?.role !== "admin") {
        throw new Error("Unauthorized: Only admins can create agents");
      }

      try {
        await db.insert(agents).values({
          name: input.name,
          version: input.version,
          description: input.description || null,
          language: input.language,
          tools: input.tools ? JSON.stringify(input.tools) : null,
          endpoint: input.endpoint,
          dependencies: input.dependencies ? JSON.stringify(input.dependencies) : null,
          autoLoad: input.autoLoad ? 1 : 0,
          author: input.author || null,
          authorUrl: input.authorUrl || null,
          repositoryUrl: input.repositoryUrl || null,
          documentationUrl: input.documentationUrl || null,
          tags: input.tags ? JSON.stringify(input.tags) : null,
          isPublic: input.isPublic ? 1 : 0,
        });

        return { success: true };
      } catch (error) {
        console.error("Failed to create agent:", error);
        throw error;
      }
    }),

  /**
   * Update an agent (admin only)
   */
  update: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        data: UpdateAgentSchema,
      })
    )
    .mutation(async ({ input, ctx }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      // Only admins can update agents
      if (ctx.user?.role !== "admin") {
        throw new Error("Unauthorized: Only admins can update agents");
      }

      try {
        const updateData: any = {};

        if (input.data.name) updateData.name = input.data.name;
        if (input.data.version) updateData.version = input.data.version;
        if (input.data.description !== undefined)
          updateData.description = input.data.description;
        if (input.data.language) updateData.language = input.data.language;
        if (input.data.tools)
          updateData.tools = JSON.stringify(input.data.tools);
        if (input.data.endpoint) updateData.endpoint = input.data.endpoint;
        if (input.data.dependencies)
          updateData.dependencies = JSON.stringify(input.data.dependencies);
        if (input.data.autoLoad !== undefined)
          updateData.autoLoad = input.data.autoLoad ? 1 : 0;
        if (input.data.author !== undefined) updateData.author = input.data.author;
        if (input.data.authorUrl !== undefined)
          updateData.authorUrl = input.data.authorUrl;
        if (input.data.repositoryUrl !== undefined)
          updateData.repositoryUrl = input.data.repositoryUrl;
        if (input.data.documentationUrl !== undefined)
          updateData.documentationUrl = input.data.documentationUrl;
        if (input.data.tags) updateData.tags = JSON.stringify(input.data.tags);
        if (input.data.isPublic !== undefined)
          updateData.isPublic = input.data.isPublic ? 1 : 0;

        await db.update(agents).set(updateData).where(eq(agents.id, input.id));

        return { success: true };
      } catch (error) {
        console.error("Failed to update agent:", error);
        throw error;
      }
    }),

  /**
   * Delete an agent (admin only)
   */
  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input, ctx }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      // Only admins can delete agents
      if (ctx.user?.role !== "admin") {
        throw new Error("Unauthorized: Only admins can delete agents");
      }

      try {
        await db.delete(agents).where(eq(agents.id, input.id));
        return { success: true };
      } catch (error) {
        console.error("Failed to delete agent:", error);
        throw error;
      }
    }),

  /**
   * Increment download count
   */
  incrementDownloads: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      try {
        const agent = await db
          .select()
          .from(agents)
          .where(eq(agents.id, input.id))
          .limit(1);

        if (!agent[0]) throw new Error("Agent not found");

        await db
          .update(agents)
          .set({ downloadCount: (agent[0].downloadCount || 0) + 1 })
          .where(eq(agents.id, input.id));

        return { success: true };
      } catch (error) {
        console.error("Failed to increment downloads:", error);
        throw error;
      }
    }),
});
