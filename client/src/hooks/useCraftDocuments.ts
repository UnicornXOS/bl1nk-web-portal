import { useEffect, useState } from "react";
import { trpc } from "@/lib/trpc";

export interface CraftDocument {
  id: string;
  title: string;
  isDeleted: boolean;
}

export interface CraftBlock {
  id: string;
  type: string;
  textStyle?: string;
  markdown?: string;
  content?: CraftBlock[];
}

export interface CraftDocumentItem extends CraftDocument {
  blocks?: CraftBlock | null;
}

/**
 * Hook to fetch Craft documents and their content
 * Automatically fetches all documents and their blocks
 */
export function useCraftDocuments() {
  const [documents, setDocuments] = useState<CraftDocumentItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Fetch all documents
  const documentsQuery = trpc.craft.getDocuments.useQuery();

  // Fetch blocks for each document
  useEffect(() => {
    const fetchAllDocuments = async () => {
      try {
        setIsLoading(true);
        setError(null);

        if (!documentsQuery.data || documentsQuery.data.length === 0) {
          setDocuments([]);
          return;
        }

        // For now, just return documents without blocks to avoid hook issues
        // The blocks can be fetched on-demand using useCraftDocumentBlocks hook
        const documentsWithoutBlocks = documentsQuery.data.filter(
          (doc) => !doc.isDeleted
        );

        setDocuments(documentsWithoutBlocks);
      } catch (err) {
        const error = err instanceof Error ? err : new Error("Unknown error");
        setError(error);
        console.error("Failed to fetch Craft documents:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (documentsQuery.data) {
      fetchAllDocuments();
    }
  }, [documentsQuery.data]);

  return {
    documents,
    isLoading: isLoading || documentsQuery.isLoading,
    error: error || documentsQuery.error,
  };
}

/**
 * Hook to search across Craft documents
 */
export function useCraftSearch(query: string, enabled = true) {
  const searchQuery = trpc.craft.searchDocuments.useQuery(
    {
      query,
    },
    {
      enabled: enabled && query.length > 0,
    }
  );

  return {
    results: searchQuery.data || [],
    isLoading: searchQuery.isLoading,
    error: searchQuery.error,
  };
}

/**
 * Hook to fetch Craft collections
 */
export function useCraftCollections() {
  const collectionsQuery = trpc.craft.getCollections.useQuery({
    documentIds: undefined,
  });

  return {
    collections: collectionsQuery.data || [],
    isLoading: collectionsQuery.isLoading,
    error: collectionsQuery.error,
  };
}

/**
 * Hook to fetch a specific document's blocks
 */
export function useCraftDocumentBlocks(documentId: string | null, enabled = true) {
  const blocksQuery = trpc.craft.getBlocks.useQuery(
    {
      id: documentId || "",
      maxDepth: -1, // Fetch all descendants
      fetchMetadata: true,
    },
    {
      enabled: enabled && !!documentId,
    }
  );

  return {
    blocks: blocksQuery.data,
    isLoading: blocksQuery.isLoading,
    error: blocksQuery.error,
  };
}
