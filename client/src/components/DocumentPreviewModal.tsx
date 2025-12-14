import { useState, useEffect } from "react";
import { X, Copy, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { CraftDocumentItem, useCraftDocumentBlocks } from "@/hooks/useCraftDocuments";
import { Streamdown } from "streamdown";

interface DocumentPreviewModalProps {
  document: CraftDocumentItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export function DocumentPreviewModal({
  document: documentProp,
  isOpen,
  onClose,
}: DocumentPreviewModalProps) {
  const { blocks, isLoading, error } = useCraftDocumentBlocks(
    isOpen && documentProp ? documentProp.id : null
  );

  // Handle ESC key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
      return () => window.removeEventListener("keydown", handleEscape);
    }
  }, [isOpen, onClose]);

  if (!isOpen || !documentProp) return null;

  const handleCopyLink = () => {
    const url = `${window.location.origin}/craft/${documentProp.id}`;
    navigator.clipboard.writeText(url);
    toast.success("Link copied to clipboard!");
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: documentProp.title,
        text: `Check out this Craft document: ${documentProp.title}`,
        url: `${window.location.origin}/craft/${documentProp.id}`,
      });
    } else {
      handleCopyLink();
    }
  };

  const renderBlockContent = (block: any, depth = 0): React.ReactNode => {
    if (!block) return null;

    // Limit depth to prevent too deep nesting
    if (depth > 5) return null;

    const blockContent: React.ReactNode[] = [];

    // Render markdown content
    if (block.markdown) {
      blockContent.push(
        <div key={`${block.id}-markdown`} className="text-sm text-gray-300 mb-3">
          <Streamdown>{block.markdown}</Streamdown>
        </div>
      );
    }

    // Render nested content
    if (block.content && Array.isArray(block.content)) {
      block.content.forEach((childBlock: any, idx: number) => {
        blockContent.push(
          <div
            key={`${block.id}-child-${idx}`}
            className="ml-4 border-l border-cyan-500/20 pl-3 mb-2"
          >
            {renderBlockContent(childBlock, depth + 1)}
          </div>
        );
      });
    }

    return blockContent.length > 0 ? blockContent : null;
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="relative w-full max-w-2xl max-h-[90vh] bg-slate-900 border border-cyan-500/20 rounded-lg shadow-2xl overflow-hidden flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-cyan-500/10 bg-gradient-to-r from-slate-900 to-slate-800">
            <div className="flex-1 min-w-0">
              <h2 className="text-xl font-bold text-white truncate">
                {documentProp.title}
              </h2>
              <p className="text-xs text-gray-400 mt-1">Craft Document</p>
            </div>
            <button
              onClick={onClose}
              className="ml-4 p-2 hover:bg-cyan-500/10 rounded-lg transition-colors flex-shrink-0"
              title="Close (ESC)"
            >
              <X className="h-5 w-5 text-gray-400 hover:text-white" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {isLoading ? (
              <div className="space-y-3">
                <div className="h-4 bg-gradient-to-r from-cyan-500/20 to-transparent rounded animate-pulse" />
                <div className="h-4 bg-gradient-to-r from-cyan-500/20 to-transparent rounded animate-pulse w-5/6" />
                <div className="h-4 bg-gradient-to-r from-cyan-500/20 to-transparent rounded animate-pulse w-4/6" />
                <div className="h-4 bg-gradient-to-r from-cyan-500/20 to-transparent rounded animate-pulse w-3/4" />
              </div>
            ) : error ? (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded text-sm text-red-300">
                Failed to load document content. Please try again.
              </div>
            ) : blocks ? (
              <div className="prose prose-invert max-w-none">
                {renderBlockContent(blocks)}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-400">
                No content available
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center gap-2 p-4 border-t border-cyan-500/10 bg-gradient-to-r from-slate-900 to-slate-800">
            <Button
              variant="ghost"
              size="sm"
              className="hover:bg-cyan-500/10"
              onClick={handleCopyLink}
              title="Copy link"
            >
              <Copy className="h-4 w-4 mr-2" />
              Copy Link
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="hover:bg-cyan-500/10"
              onClick={handleShare}
              title="Share"
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>

            <div className="flex-1" />

            <Button
              variant="ghost"
              size="sm"
              className="hover:bg-cyan-500/10"
              onClick={onClose}
            >
              Close
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
