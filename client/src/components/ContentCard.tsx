import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, BookOpen, Database, Edit2, Share2, Heart, Trash2, Copy } from "lucide-react";
import { toast } from "sonner";

export type ContentSource = "github" | "gitbook" | "notion";

interface ContentCardProps {
  id: string;
  title: string;
  description: string;
  source: ContentSource;
  url: string;
  tags?: string[];
  icon?: React.ReactNode;
  lastUpdated?: string;
  featured?: boolean;
  onEdit?: (card: ContentCardProps) => void;
  isFavorited?: boolean;
  onToggleFavorite?: (id: string) => void;
  isLoadingFavorite?: boolean;
  onDelete?: (id: string) => void;
  isLoadingDelete?: boolean;
}

const sourceConfig = {
  github: {
    icon: Github,
    color: "bg-gray-500/10 border-gray-500/30",
    badge: "GitHub",
    badgeColor: "bg-gray-500/20 text-gray-300",
  },
  gitbook: {
    icon: BookOpen,
    color: "bg-blue-500/10 border-blue-500/30",
    badge: "GitBook",
    badgeColor: "bg-blue-500/20 text-blue-300",
  },
  notion: {
    icon: Database,
    color: "bg-purple-500/10 border-purple-500/30",
    badge: "Notion",
    badgeColor: "bg-purple-500/20 text-purple-300",
  },
};

export default function ContentCard({
  id,
  title,
  description,
  source,
  url,
  tags = [],
  icon,
  lastUpdated,
  featured = false,
  onEdit,
  isFavorited = false,
  onToggleFavorite,
  isLoadingFavorite = false,
  onDelete,
  isLoadingDelete = false,
}: ContentCardProps) {
  const config = sourceConfig[source];
  const IconComponent = config.icon;

  const handleShareAsMarkdown = () => {
    const markdown = `## ${title}\n\n${description}\n\n**Source:** ${source}\n**URL:** ${url}\n**Tags:** ${tags.join(", ")}\n\n[View on ${source}](${url})`;
    navigator.clipboard.writeText(markdown);
    toast.success("Markdown copied to clipboard!");
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(url);
    toast.success("Link copied to clipboard!");
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      onDelete?.(id);
    }
  };

  return (
    <Card
      className={`glass-card overflow-hidden transition-all duration-300 animate-slide-up-fade ${
        featured ? "border-cyan-500/50 bg-cyan-500/5" : ""
      }`}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <IconComponent size={18} className="text-cyan-400" />
              <Badge className={`${config.badgeColor} border-0`}>{config.badge}</Badge>
              {featured && <Badge className="bg-cyan-500/20 text-cyan-300 border-0">Featured</Badge>}
            </div>
            <CardTitle className="text-lg text-white hover:text-cyan-400 transition-colors">
              {title}
            </CardTitle>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <CardDescription className="text-gray-400 line-clamp-2">{description}</CardDescription>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="bg-slate-700/50 text-gray-300 border-slate-600/50 text-xs"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-700/50">
          <div className="text-xs text-gray-500">
            {lastUpdated && <span>Updated {lastUpdated}</span>}
          </div>
          <div className="flex gap-1">
            {onToggleFavorite && (
              <Button
                onClick={() => onToggleFavorite(id)}
                variant="ghost"
                size="sm"
                disabled={isLoadingFavorite}
                className={`button-hover transition-colors ${
                  isFavorited
                    ? "text-red-400 hover:text-red-300 hover:bg-red-500/10"
                    : "text-gray-400 hover:text-red-300 hover:bg-red-500/10"
                }`}
                title={isFavorited ? "Remove from favorites" : "Add to favorites"}
              >
                <Heart size={14} fill={isFavorited ? "currentColor" : "none"} />
              </Button>
            )}
            {onEdit && (
              <Button
                onClick={() => onEdit({ id, title, description, source, url, tags, lastUpdated, featured })}
                variant="ghost"
                size="sm"
                className="button-hover text-gray-400 hover:text-cyan-300 hover:bg-cyan-500/10"
                title="Edit card"
              >
                <Edit2 size={14} />
              </Button>
            )}
            <Button
              onClick={handleCopyLink}
              variant="ghost"
              size="sm"
              className="button-hover text-gray-400 hover:text-cyan-300 hover:bg-cyan-500/10"
              title="Copy link"
            >
              <Copy size={14} />
            </Button>
            <Button
              onClick={handleShareAsMarkdown}
              variant="ghost"
              size="sm"
              className="button-hover text-gray-400 hover:text-cyan-300 hover:bg-cyan-500/10"
              title="Share as Markdown"
            >
              <Share2 size={14} />
            </Button>
            {onDelete && (
              <Button
                onClick={handleDelete}
                variant="ghost"
                size="sm"
                disabled={isLoadingDelete}
                className="button-hover text-gray-400 hover:text-red-300 hover:bg-red-500/10"
                title="Delete card"
              >
                <Trash2 size={14} />
              </Button>
            )}
            <Button
              onClick={() => window.open(url, "_blank")}
              variant="ghost"
              size="sm"
              className="button-hover text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10 gap-2"
            >
              View
              <ExternalLink size={14} />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
