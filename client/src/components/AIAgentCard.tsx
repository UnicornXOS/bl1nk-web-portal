import { useState } from "react";
import { Download, ExternalLink, Star, Code2 } from "lucide-react";
import { Button } from "./ui/button";
import AIAgentDetailModal from "./AIAgentDetailModal";

interface Tool {
  name: string;
  description: string;
}

interface AIAgentCardProps {
  id: number;
  name: string;
  version: string;
  description?: string;
  language: "js" | "ts" | "python" | "uv" | "json" | "yaml";
  tools?: Tool[];
  author?: string;
  downloadCount?: number;
  rating?: number;
  tags?: string[];
  endpoint?: string;
  dependencies?: string[];
  autoLoad?: boolean;
  repositoryUrl?: string;
  documentationUrl?: string;
  onDownload?: (id: number) => void;
  onViewDetails?: (id: number) => void;
}

const LANGUAGE_COLORS: Record<string, { bg: string; text: string; icon: string }> = {
  js: { bg: "bg-yellow-500/10", text: "text-yellow-400", icon: "JS" },
  ts: { bg: "bg-blue-500/10", text: "text-blue-400", icon: "TS" },
  python: { bg: "bg-cyan-500/10", text: "text-cyan-400", icon: "PY" },
  uv: { bg: "bg-purple-500/10", text: "text-purple-400", icon: "UV" },
  json: { bg: "bg-green-500/10", text: "text-green-400", icon: "JSON" },
  yaml: { bg: "bg-pink-500/10", text: "text-pink-400", icon: "YAML" },
};

export default function AIAgentCard({
  id,
  name,
  version,
  description,
  language,
  tools = [],
  author,
  downloadCount = 0,
  rating = 0,
  tags = [],
  endpoint = "",
  dependencies = [],
  autoLoad = false,
  repositoryUrl,
  documentationUrl,
  onDownload,
  onViewDetails,
}: AIAgentCardProps) {
  const [showDetailModal, setShowDetailModal] = useState(false);
  const langConfig = LANGUAGE_COLORS[language] || LANGUAGE_COLORS.ts;

  return (
    <div className="relative group overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl hover:border-white/20 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 transition-all duration-300" />

      <div className="relative z-10 p-5">
        {/* Header */}
        <div className="mb-4 flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-lg font-semibold text-white truncate">{name}</h3>
              <span className="text-xs text-gray-400">v{version}</span>
            </div>
            {author && <p className="text-xs text-gray-400">by {author}</p>}
          </div>
          <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${langConfig.bg} flex-shrink-0`}>
            <span className={`text-xs font-bold ${langConfig.text}`}>{langConfig.icon}</span>
          </div>
        </div>

        {/* Description */}
        {description && (
          <p className="mb-4 line-clamp-2 text-sm text-gray-300">{description}</p>
        )}

        {/* Tools */}
        {tools && tools.length > 0 && (
          <div className="mb-4">
            <p className="text-xs text-gray-400 mb-2">Tools ({tools.length})</p>
            <div className="flex flex-wrap gap-1">
              {tools.slice(0, 3).map((tool, idx) => (
                <span
                  key={idx}
                  className="inline-block rounded-full bg-white/5 px-2 py-1 text-xs text-gray-300 border border-white/10"
                  title={tool.description}
                >
                  {tool.name}
                </span>
              ))}
              {tools.length > 3 && (
                <span className="inline-block rounded-full bg-white/5 px-2 py-1 text-xs text-gray-400">
                  +{tools.length - 3}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-1">
            {tags.slice(0, 3).map((tag, idx) => (
              <span
                key={idx}
                className="inline-block rounded-full bg-cyan-500/10 px-2 py-1 text-xs text-cyan-300 border border-cyan-500/20"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Stats */}
        <div className="mb-4 flex items-center gap-4 border-t border-white/10 pt-3">
          <div className="flex items-center gap-1">
            <Download className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-300">{downloadCount.toLocaleString()}</span>
          </div>
          {rating > 0 && (
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm text-gray-300">{rating.toFixed(1)}</span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 border-white/10 text-gray-300 hover:bg-white/5 hover:text-white"
            onClick={() => setShowDetailModal(true)}
          >
            <ExternalLink className="h-4 w-4 mr-1" />
            Details
          </Button>
          <Button
            size="sm"
            className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
            onClick={() => onDownload?.(id)}
          >
            <Code2 className="h-4 w-4 mr-1" />
            Use
          </Button>
        </div>
      </div>

      {/* Detail Modal */}
      <AIAgentDetailModal
        agent={{
          id,
          name,
          version,
          description: description || "",
          language,
          tools: tools || [],
          endpoint,
          dependencies,
          autoLoad,
          author,
          repositoryUrl,
          documentationUrl,
          tags,
          downloadCount,
          rating,
        }}
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
      />
    </div>
  );
}
