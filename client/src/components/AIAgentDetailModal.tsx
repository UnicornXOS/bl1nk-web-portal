import { useEffect } from "react";
import { X, Copy, Download, ExternalLink, Code2, Package, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface Tool {
  name: string;
  description: string;
}

interface AIAgent {
  id: number;
  name: string;
  version: string;
  description: string;
  language: string;
  tools: Tool[];
  endpoint: string;
  dependencies: string[];
  autoLoad: boolean;
  author?: string;
  authorUrl?: string;
  repositoryUrl?: string;
  documentationUrl?: string;
  tags?: string[];
  downloadCount: number;
  rating: number;
}

interface AIAgentDetailModalProps {
  agent: AIAgent | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function AIAgentDetailModal({
  agent,
  isOpen,
  onClose,
}: AIAgentDetailModalProps) {
  if (!isOpen || !agent) return null;

  const handleCopyEndpoint = () => {
    navigator.clipboard.writeText(agent.endpoint);
    toast.success("Endpoint copied to clipboard!");
  };

  const handleDownload = () => {
    toast.success(`Downloading ${agent.name} v${agent.version}...`);
    // In a real app, this would trigger a download
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  // Add/remove keyboard listener
  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const languageColors: Record<string, string> = {
    ts: "bg-blue-500/20 text-blue-300",
    js: "bg-yellow-500/20 text-yellow-300",
    python: "bg-green-500/20 text-green-300",
    uv: "bg-purple-500/20 text-purple-300",
    json: "bg-orange-500/20 text-orange-300",
    yaml: "bg-red-500/20 text-red-300",
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="relative max-h-[90vh] w-full max-w-2xl overflow-hidden rounded-lg border border-white/10 bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl shadow-2xl shadow-purple-500/20">
          {/* Header */}
          <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-black/50 backdrop-blur-xl px-6 py-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-xl font-bold text-white truncate">{agent.name}</h2>
                <span className="text-sm text-gray-400">v{agent.version}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 rounded text-xs font-medium ${languageColors[agent.language] || "bg-gray-500/20 text-gray-300"}`}>
                  {agent.language.toUpperCase()}
                </span>
                {agent.rating > 0 && (
                  <span className="text-xs text-yellow-400">★ {agent.rating}/5</span>
                )}
              </div>
            </div>

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

          {/* Content */}
          <div className="overflow-y-auto max-h-[calc(90vh-80px)] p-6 space-y-6">
            {/* Description */}
            {agent.description && (
              <div>
                <h3 className="text-sm font-semibold text-gray-300 mb-2">Description</h3>
                <p className="text-gray-400">{agent.description}</p>
              </div>
            )}

            {/* Tools */}
            {agent.tools && agent.tools.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
                  <Code2 className="h-4 w-4" />
                  Tools ({agent.tools.length})
                </h3>
                <div className="space-y-2">
                  {agent.tools.map((tool, idx) => (
                    <div key={idx} className="rounded-lg border border-white/10 bg-white/5 p-3">
                      <p className="font-medium text-white">{tool.name}</p>
                      <p className="text-sm text-gray-400">{tool.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Dependencies */}
            {agent.dependencies && agent.dependencies.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
                  <Package className="h-4 w-4" />
                  Dependencies
                </h3>
                <div className="flex flex-wrap gap-2">
                  {agent.dependencies.map((dep, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-full bg-white/10 text-sm text-gray-300 border border-white/10"
                    >
                      {dep}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Tags */}
            {agent.tags && agent.tags.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
                  <Tag className="h-4 w-4" />
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {agent.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-full bg-purple-500/20 text-sm text-purple-300 border border-purple-500/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Endpoint */}
            <div>
              <h3 className="text-sm font-semibold text-gray-300 mb-2">Endpoint</h3>
              <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 p-3">
                <code className="flex-1 text-sm text-gray-300 font-mono truncate">{agent.endpoint}</code>
                <Button
                  onClick={handleCopyEndpoint}
                  size="sm"
                  variant="ghost"
                  className="text-gray-300 hover:text-white"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Metadata */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
              <div>
                <p className="text-xs text-gray-500 mb-1">Downloads</p>
                <p className="text-lg font-semibold text-white">{agent.downloadCount.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Auto Load</p>
                <p className="text-lg font-semibold text-white">{agent.autoLoad ? "Yes" : "No"}</p>
              </div>
            </div>

            {/* Links */}
            <div className="flex gap-2 pt-4 border-t border-white/10">
              {agent.repositoryUrl && (
                <a
                  href={agent.repositoryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1"
                >
                  <Button
                    variant="outline"
                    className="w-full border-white/10 text-white hover:bg-white/10"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Repository
                  </Button>
                </a>
              )}
              {agent.documentationUrl && (
                <a
                  href={agent.documentationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1"
                >
                  <Button
                    variant="outline"
                    className="w-full border-white/10 text-white hover:bg-white/10"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Docs
                  </Button>
                </a>
              )}
            </div>

            {/* Download Button */}
            <Button
              onClick={handleDownload}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
            >
              <Download className="h-4 w-4 mr-2" />
              Download Agent
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
