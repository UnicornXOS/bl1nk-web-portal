import { useState } from "react";
import { FileText, ExternalLink, Copy, Heart, Trash2, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { CraftDocumentItem, useCraftDocumentBlocks } from "@/hooks/useCraftDocuments";
import { DocumentCategoryBadge } from "./DocumentCategoryBadge";
import { Streamdown } from "streamdown";

interface CraftDocumentCardProps {
  document: CraftDocumentItem;
  onFavorite?: (document: CraftDocumentItem) => void;
  onDelete?: (documentId: string) => void;
  isFavorited?: boolean;
}

export function CraftDocumentCard({
  document,
  onFavorite,
  onDelete,
  isFavorited = false,
}: CraftDocumentCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { blocks, isLoading, error } = useCraftDocumentBlocks(
    isExpanded ? document.id : null
  );

  const handleCopyLink = () => {
    const url = `${window.location.origin}/craft/${document.id}`;
    navigator.clipboard.writeText(url);
    toast.success("Link copied to clipboard!");
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: document.title,
        text: `Check out this Craft document: ${document.title}`,
        url: `${window.location.origin}/craft/${document.id}`,
      });
    } else {
      handleCopyLink();
    }
  };

  const getPreviewText = () => {
    if (!blocks) return "Click to view content";

    if (blocks.type === "page" && blocks.content) {
      const firstBlock = blocks.content[0];
      if (firstBlock && "markdown" in firstBlock) {
        return (firstBlock.markdown as string)
          .replace(/^#+\s+/, "")
          .substring(0, 100);
      }
    }

    if ("markdown" in blocks) {
      return (blocks.markdown as string)
        .replace(/^#+\s+/, "")
        .substring(0, 100);
    }

    return "Craft document";
  };

  const renderBlockContent = (block: any, depth = 0): React.ReactNode => {
    if (!block) return null;

    // Limit depth to prevent too deep nesting
    if (depth > 3) return null;

    const blockContent: React.ReactNode[] = [];

    // Render markdown content
    if (block.markdown) {
      blockContent.push(
        <div key={`${block.id}-markdown`} className="text-xs text-gray-300 mb-2">
          <Streamdown>{block.markdown}</Streamdown>
        </div>
      );
    }

    // Render nested content
    if (block.content && Array.isArray(block.content)) {
      block.content.forEach((childBlock: any, idx: number) => {
        blockContent.push(
          <div key={`${block.id}-child-${idx}`} className="ml-2 border-l border-cyan-500/20 pl-2">
            {renderBlockContent(childBlock, depth + 1)}
          </div>
        );
      });
    }

    return blockContent.length > 0 ? blockContent : null;
  };

  return (
    <div className="glass-card group relative overflow-hidden rounded-lg border border-cyan-500/10 bg-gradient-to-br from-slate-900/40 to-slate-800/40 backdrop-blur-sm transition-all duration-300 hover:border-cyan-500/20 hover:shadow-lg hover:shadow-cyan-500/10">
      {/* Background gradient on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative z-10 p-4">
        {/* Header */}
        <div className="mb-3 flex items-start justify-between">
          <div className="flex items-center gap-3 flex-1">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 flex-shrink-0">
              <FileText className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="truncate font-semibold text-white text-sm">
                {document.title}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <DocumentCategoryBadge title={document.title} size="sm" />
              </div>
            </div>
          </div>
        </div>

        {/* Preview or Expanded Content */}
        {!isExpanded ? (
          <p className="mb-4 line-clamp-2 text-xs text-gray-300">
            {getPreviewText()}
          </p>
        ) : isLoading ? (
          <div className="mb-4 space-y-2">
            <div className="h-3 bg-gradient-to-r from-cyan-500/20 to-transparent rounded animate-pulse" />
            <div className="h-3 bg-gradient-to-r from-cyan-500/20 to-transparent rounded animate-pulse w-5/6" />
            <div className="h-3 bg-gradient-to-r from-cyan-500/20 to-transparent rounded animate-pulse w-4/6" />
          </div>
        ) : error ? (
          <div className="mb-4 p-2 bg-red-500/10 border border-red-500/20 rounded text-xs text-red-300">
            Failed to load content
          </div>
        ) : blocks ? (
          <div className="mb-4 max-h-64 overflow-y-auto pr-2 space-y-2">
            {renderBlockContent(blocks)}
          </div>
        ) : null}

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 hover:bg-cyan-500/10"
            onClick={() => setIsExpanded(!isExpanded)}
            title={isExpanded ? "Collapse" : "Expand to view full content"}
          >
            <ChevronDown
              className={`h-4 w-4 text-gray-400 hover:text-cyan-400 transition-transform ${
                isExpanded ? "rotate-180" : ""
              }`}
            />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 hover:bg-cyan-500/10"
            onClick={() => onFavorite?.(document)}
            title={isFavorited ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart
              className={`h-4 w-4 ${
                isFavorited
                  ? "fill-pink-500 text-pink-500"
                  : "text-gray-400 hover:text-pink-500"
              }`}
            />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 hover:bg-cyan-500/10"
            onClick={handleCopyLink}
            title="Copy link"
          >
            <Copy className="h-4 w-4 text-gray-400 hover:text-cyan-400" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 hover:bg-cyan-500/10"
            onClick={handleShare}
            title="Share"
          >
            <ExternalLink className="h-4 w-4 text-gray-400 hover:text-cyan-400" />
          </Button>

          {onDelete && (
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 hover:bg-red-500/10"
              onClick={() => {
                if (
                  confirm(
                    `Are you sure you want to delete "${document.title}"?`
                  )
                ) {
                  onDelete(document.id);
                  toast.success("Document deleted");
                }
              }}
              title="Delete"
            >
              <Trash2 className="h-4 w-4 text-gray-400 hover:text-red-400" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
