import { publicProcedure, router } from "../_core/trpc";
import { z } from "zod";

/**
 * Craft iOS Multi-Document API Integration
 * API Server: https://connect.craft.do/links/2McInshMfLC/api/v1
 * No authentication required - direct API endpoint
 */

const CRAFT_API_BASE = "https://connect.craft.do/links/2McInshMfLC/api/v1";

// Type definitions for Craft API responses
interface CraftDocument {
  id: string;
  title: string;
  isDeleted: boolean;
}

interface CraftBlock {
  id: string;
  type: string;
  textStyle?: string;
  markdown?: string;
  content?: CraftBlock[];
}

interface CraftCollection {
  key: string;
  name: string;
  documentId: string;
  schema: {
    name: string;
    properties: unknown[];
  };
}

interface CraftSearchResult {
  documentId: string;
  markdown: string;
  blockId?: string;
  pageBlockPath?: Array<{
    id: string;
    content: string;
  }>;
}

/**
 * Helper function to make requests to Craft API
 */
async function craftApiRequest<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const url = `${CRAFT_API_BASE}${endpoint}`;

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
    });

    if (!response.ok) {
      throw new Error(
        `Craft API error: ${response.status} ${response.statusText}`
      );
    }

    return response.json() as Promise<T>;
  } catch (error) {
    console.error(`Craft API request failed for ${endpoint}:`, error);
    throw error;
  }
}

export const craftRouter = router({
  /**
   * Get all documents from Craft
   * GET /documents
   */
  getDocuments: publicProcedure.query(async () => {
    try {
      const response = await craftApiRequest<{ items: CraftDocument[] }>(
        "/documents"
      );
      return response.items || [];
    } catch (error) {
      console.error("Failed to fetch Craft documents:", error);
      return [];
    }
  }),

  /**
   * Get blocks from a specific document
   * GET /blocks?id={documentId}&maxDepth={depth}
   */
  getBlocks: publicProcedure
    .input(
      z.object({
        id: z.string().describe("Document or block ID"),
        maxDepth: z.number().optional().default(-1),
        fetchMetadata: z.boolean().optional().default(false),
      })
    )
    .query(async ({ input }) => {
      try {
        const params = new URLSearchParams({
          id: input.id,
          maxDepth: input.maxDepth.toString(),
          fetchMetadata: input.fetchMetadata.toString(),
        });

        const response = await craftApiRequest<CraftBlock>(
          `/blocks?${params.toString()}`
        );
        return response;
      } catch (error) {
        console.error("Failed to fetch Craft blocks:", error);
        return null;
      }
    }),

  /**
   * Search across all documents
   * GET /documents/search?include={query}&documentIds={ids}&documentFilterMode={mode}
   */
  searchDocuments: publicProcedure
    .input(
      z.object({
        query: z.string().describe("Search query"),
        documentIds: z.array(z.string()).optional(),
        documentFilterMode: z.enum(["include", "exclude"]).optional().default("include"),
      })
    )
    .query(async ({ input }) => {
      try {
        const params = new URLSearchParams({
          include: input.query,
          documentFilterMode: input.documentFilterMode,
        });

        if (input.documentIds && input.documentIds.length > 0) {
          input.documentIds.forEach((id) => {
            params.append("documentIds", id);
          });
        }

        const response = await craftApiRequest<{ items: CraftSearchResult[] }>(
          `/documents/search?${params.toString()}`
        );
        return response.items || [];
      } catch (error) {
        console.error("Failed to search Craft documents:", error);
        return [];
      }
    }),

  /**
   * Search within a single document
   * GET /blocks/search?documentId={id}&pattern={pattern}
   */
  searchBlocks: publicProcedure
    .input(
      z.object({
        documentId: z.string(),
        pattern: z.string(),
        caseSensitive: z.boolean().optional().default(false),
        beforeBlockCount: z.number().optional().default(1),
        afterBlockCount: z.number().optional().default(1),
      })
    )
    .query(async ({ input }) => {
      try {
        const params = new URLSearchParams({
          documentId: input.documentId,
          pattern: input.pattern,
          caseSensitive: input.caseSensitive.toString(),
          beforeBlockCount: input.beforeBlockCount.toString(),
          afterBlockCount: input.afterBlockCount.toString(),
        });

        const response = await craftApiRequest<{ items: CraftSearchResult[] }>(
          `/blocks/search?${params.toString()}`
        );
        return response.items || [];
      } catch (error) {
        console.error("Failed to search Craft blocks:", error);
        return [];
      }
    }),

  /**
   * Get all collections across documents
   * GET /collections
   */
  getCollections: publicProcedure
    .input(
      z.object({
        documentIds: z.array(z.string()).optional(),
        documentFilterMode: z.enum(["include", "exclude"]).optional().default("include"),
      })
    )
    .query(async ({ input }) => {
      try {
        const params = new URLSearchParams({
          documentFilterMode: input.documentFilterMode,
        });

        if (input.documentIds && input.documentIds.length > 0) {
          input.documentIds.forEach((id) => {
            params.append("documentIds", id);
          });
        }

        const response = await craftApiRequest<{ items: CraftCollection[] }>(
          `/collections?${params.toString()}`
        );
        return response.items || [];
      } catch (error) {
        console.error("Failed to fetch Craft collections:", error);
        return [];
      }
    }),

  /**
   * Get collection schema
   * GET /collections/{collectionId}/schema?format={format}
   */
  getCollectionSchema: publicProcedure
    .input(
      z.object({
        collectionId: z.string(),
        format: z.enum(["json-schema-items", "schema"]).optional().default("json-schema-items"),
      })
    )
    .query(async ({ input }) => {
      try {
        const params = new URLSearchParams({
          format: input.format,
        });

        const response = await craftApiRequest<unknown>(
          `/collections/${input.collectionId}/schema?${params.toString()}`
        );
        return response;
      } catch (error) {
        console.error("Failed to fetch Craft collection schema:", error);
        return null;
      }
    }),

  /**
   * Get collection items
   * GET /collections/{collectionId}/items
   */
  getCollectionItems: publicProcedure
    .input(
      z.object({
        collectionId: z.string(),
        maxDepth: z.number().optional().default(-1),
      })
    )
    .query(async ({ input }) => {
      try {
        const params = new URLSearchParams({
          maxDepth: input.maxDepth.toString(),
        });

        const response = await craftApiRequest<{ items: unknown[] }>(
          `/collections/${input.collectionId}/items?${params.toString()}`
        );
        return response.items || [];
      } catch (error) {
        console.error("Failed to fetch Craft collection items:", error);
        return [];
      }
    }),
});
