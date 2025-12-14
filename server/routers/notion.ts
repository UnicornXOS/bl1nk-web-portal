import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";
import { ENV } from "../_core/env";

/**
 * Notion API Integration
 * Fetches company documentation from Notion
 */

const NOTION_API_BASE = "https://api.notion.com/v1";
const NOTION_VERSION = "2022-06-28";

interface NotionPage {
  id: string;
  created_time: string;
  last_edited_time: string;
  created_by: { id: string };
  last_edited_by: { id: string };
  cover: unknown;
  icon: unknown;
  parent: { type: string; database_id?: string; page_id?: string };
  archived: boolean;
  properties: Record<string, unknown>;
  url: string;
}

interface NotionBlock {
  object: string;
  id: string;
  parent: { type: string; page_id?: string };
  created_time: string;
  last_edited_time: string;
  created_by: { id: string };
  last_edited_by: { id: string };
  has_children: boolean;
  archived: boolean;
  type: string;
  [key: string]: unknown;
}

interface NotionDatabase {
  object: string;
  id: string;
  created_time: string;
  last_edited_time: string;
  created_by: { id: string };
  last_edited_by: { id: string };
  title: Array<{ type: string; text: { content: string } }>;
  description: Array<unknown>;
  icon: unknown;
  cover: unknown;
  properties: Record<string, unknown>;
  parent: { type: string; workspace: boolean };
  url: string;
  is_inline: boolean;
  public_url: string | null;
}

/**
 * Helper function to make requests to Notion API
 */
async function notionApiRequest<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const url = `${NOTION_API_BASE}${endpoint}`;
  const notionToken = ENV.notionToken;

  if (!notionToken) {
    throw new Error("Notion token not configured");
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        Authorization: `Bearer ${notionToken}`,
        "Notion-Version": NOTION_VERSION,
        "Content-Type": "application/json",
        ...options?.headers,
      },
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(
        `Notion API error: ${response.status} ${response.statusText} - ${error}`
      );
    }

    return response.json() as Promise<T>;
  } catch (error) {
    console.error(`Notion API request failed for ${endpoint}:`, error);
    throw error;
  }
}

/**
 * Extract plain text from Notion blocks
 */
function extractTextFromBlock(block: NotionBlock): string {
  const type = block.type as string;

  switch (type) {
    case "paragraph":
      const paragraphBlock = block as any;
      return paragraphBlock.paragraph?.rich_text
        ?.map((rt: any) => rt.plain_text)
        .join("") || "";
    case "heading_1":
    case "heading_2":
    case "heading_3":
      const headingBlock = block as any;
      return headingBlock[type]?.rich_text
        ?.map((rt: any) => rt.plain_text)
        .join("") || "";
    case "bulleted_list_item":
    case "numbered_list_item":
      const listBlock = block as any;
      return listBlock[type]?.rich_text
        ?.map((rt: any) => rt.plain_text)
        .join("") || "";
    default:
      return "";
  }
}

export const notionRouter = router({
  /**
   * Get all pages from the Notion database
   */
  getPages: publicProcedure.query(async () => {
    try {
      const databaseId = ENV.notionDatabaseId;
      if (!databaseId) {
        throw new Error("Notion database ID not configured");
      }

      const response = await notionApiRequest<{
        results: NotionPage[];
        next_cursor?: string;
        has_more: boolean;
      }>(`/databases/${databaseId}/query`, {
        method: "POST",
        body: JSON.stringify({
          page_size: 100,
        }),
      });

      return response.results.map((page) => ({
        id: page.id,
        title: extractPageTitle(page),
        created_time: page.created_time,
        last_edited_time: page.last_edited_time,
        url: page.url,
        archived: page.archived,
      }));
    } catch (error) {
      console.error("Failed to fetch Notion pages:", error);
      return [];
    }
  }),

  /**
   * Get content (blocks) from a specific page
   */
  getPageContent: publicProcedure
    .input(z.object({ pageId: z.string() }))
    .query(async ({ input }) => {
      try {
        const response = await notionApiRequest<{
          results: NotionBlock[];
          next_cursor?: string;
          has_more: boolean;
        }>(`/blocks/${input.pageId}/children?page_size=100`);

        return response.results.map((block) => ({
          id: block.id,
          type: block.type,
          text: extractTextFromBlock(block),
          has_children: block.has_children,
        }));
      } catch (error) {
        console.error("Failed to fetch Notion page content:", error);
        return [];
      }
    }),

  /**
   * Search pages in the database
   */
  searchPages: publicProcedure
    .input(z.object({ query: z.string() }))
    .query(async ({ input }) => {
      try {
        const databaseId = ENV.notionDatabaseId;
        if (!databaseId) {
          throw new Error("Notion database ID not configured");
        }

        const response = await notionApiRequest<{
          results: NotionPage[];
          next_cursor?: string;
          has_more: boolean;
        }>(`/databases/${databaseId}/query`, {
          method: "POST",
          body: JSON.stringify({
            filter: {
              property: "Name",
              rich_text: {
                contains: input.query,
              },
            },
            page_size: 50,
          }),
        });

        return response.results.map((page) => ({
          id: page.id,
          title: extractPageTitle(page),
          created_time: page.created_time,
          last_edited_time: page.last_edited_time,
          url: page.url,
          archived: page.archived,
        }));
      } catch (error) {
        console.error("Failed to search Notion pages:", error);
        return [];
      }
    }),

  /**
   * Get database info
   */
  getDatabaseInfo: publicProcedure.query(async () => {
    try {
      const databaseId = ENV.notionDatabaseId;
      if (!databaseId) {
        throw new Error("Notion database ID not configured");
      }

      const response = await notionApiRequest<NotionDatabase>(
        `/databases/${databaseId}`
      );

      return {
        id: response.id,
        title: response.title
          .map((t) => (t.type === "text" ? t.text.content : ""))
          .join(""),
        url: response.url,
        created_time: response.created_time,
        last_edited_time: response.last_edited_time,
      };
    } catch (error) {
      console.error("Failed to fetch Notion database info:", error);
      return null;
    }
  }),
});

/**
 * Extract page title from Notion page properties
 */
function extractPageTitle(page: NotionPage): string {
  const properties = page.properties as Record<string, any>;

  // Try to find title property
  for (const [key, prop] of Object.entries(properties)) {
    if (prop.type === "title" && prop.title?.length > 0) {
      return prop.title.map((t: any) => t.plain_text).join("");
    }
  }

  // Fallback to first text property
  for (const [key, prop] of Object.entries(properties)) {
    if (prop.type === "rich_text" && prop.rich_text?.length > 0) {
      return prop.rich_text.map((t: any) => t.plain_text).join("");
    }
  }

  return "Untitled";
}
