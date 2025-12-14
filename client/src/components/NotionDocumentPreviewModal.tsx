import { useState, useEffect } from "react";
import { X, Copy, Share2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { Streamdown } from "streamdown";
import { toast } from "sonner";

interface NotionDocumentPreviewModalProps {
  pageId: string;
  title: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function NotionDocumentPreviewModal({
  pageId,
  title,
  isOpen,
  onClose,
}: NotionDocumentPreviewModalProps) {
  const [content, setContent] = useState<string>("");

  // Fetch page content from Notion API
  const { data: pageData, isLoading, error } = trpc.notion.getPageContent.useQuery(
    { pageId },
    { enabled: isOpen && !!pageId }
  ) as any;

  useEffect(() => {
    if (pageData) {
      // Convert blocks array to markdown-like content
      const contentText = Array.isArray(pageData)
        ? pageData.map((block: any) => block.text || "").join("\n\n")
        : pageData.content || "";
      setContent(contentText);
    }
  }, [pageData]);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const handleCopyLink = () => {
    const url = `${window.location.origin}?notion=${pageId}`;
    navigator.clipboard.writeText(url);
    toast.success("Link copied to clipboard!");
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: title,
        text: `Check out this documentation: ${title}`,
        url: window.location.href,
      });
    } else {
      handleCopyLink();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="relative max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-lg border border-white/10 bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl shadow-2xl shadow-purple-500/20">
          {/* Header */}
          <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-black/50 backdrop-blur-xl px-6 py-4">
            <div className="flex-1 min-w-0">
              <h2 className="text-xl font-bold text-white truncate">{title}</h2>
            </div>

            <div className="flex items-center gap-2 ml-4">
              <Button
                onClick={handleCopyLink}
                size="sm"
                variant="ghost"
                className="text-gray-300 hover:text-white"
                title="Copy link"
              >
                <Copy className="h-4 w-4" />
              </Button>

              <Button
                onClick={handleShare}
                size="sm"
                variant="ghost"
                className="text-gray-300 hover:text-white"
                title="Share"
              >
                <Share2 className="h-4 w-4" />
              </Button>

              <Button
                onClick={onClose}
                size="sm"
                variant="ghost"
                className="text-gray-300 hover:text-white"
                title="Close (ESC)"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Content */}
          <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-purple-500" />
              </div>
            ) : error ? (
              <div className="p-6">
                <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-4 text-red-300">
                  Failed to load document content. Please try again.
                </div>
              </div>
            ) : content ? (
              <div className="p-6 space-y-4 text-gray-300">
                {content ? (
                  <Streamdown>{content}</Streamdown>
                ) : (
                  <p>No content available</p>
                )}
              </div>
            ) : (
              <div className="p-6 text-center text-gray-400">
                No content available for this document.
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
