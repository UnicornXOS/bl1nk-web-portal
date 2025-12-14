import { useState } from "react";
import ContentCard, { ContentSource } from "@/components/ContentCard";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

export interface ContentItem {
  id: string;
  title: string;
  description: string;
  source: ContentSource;
  url: string;
  tags?: string[];
  lastUpdated?: string;
  featured?: boolean;
}

interface ContentSectionProps {
  title: string;
  description?: string;
  items: ContentItem[];
  collapsible?: boolean;
  defaultExpanded?: boolean;
  onEditCard?: (card: ContentItem) => void;
  onToggleFavorite?: (id: string) => void;
  onDeleteCard?: (id: string) => void;
  favoritedIds?: Set<string>;
  isLoadingFavorite?: boolean;
  isLoadingDelete?: boolean;
}

export default function ContentSection({
  title,
  description,
  items,
  collapsible = false,
  defaultExpanded = true,
  onEditCard,
  onToggleFavorite,
  onDeleteCard,
  favoritedIds = new Set(),
  isLoadingFavorite = false,
  isLoadingDelete = false,
}: ContentSectionProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  // Separate featured and regular items
  const featuredItems = items.filter((item) => item.featured);
  const regularItems = items.filter((item) => !item.featured);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white">{title}</h2>
          {description && <p className="text-gray-400 mt-2">{description}</p>}
        </div>
        {collapsible && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-cyan-400 hover:bg-cyan-500/10"
          >
            <ChevronDown
              size={20}
              className={`transition-transform ${isExpanded ? "rotate-180" : ""}`}
            />
          </Button>
        )}
      </div>

      {/* Content */}
      {isExpanded && (
        <div className="space-y-6">
          {/* Featured Items */}
          {featuredItems.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-cyan-400 mb-4 uppercase tracking-wide">
                Featured
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {featuredItems.map((item) => (
                  <ContentCard
                    key={item.id}
                    {...item}
                    onEdit={onEditCard}
                    onToggleFavorite={onToggleFavorite}
                    onDelete={onDeleteCard}
                    isFavorited={favoritedIds.has(item.id)}
                    isLoadingFavorite={isLoadingFavorite}
                    isLoadingDelete={isLoadingDelete}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Regular Items */}
          {regularItems.length > 0 && (
            <div>
              {featuredItems.length > 0 && (
                <h3 className="text-sm font-semibold text-gray-400 mb-4 uppercase tracking-wide">
                  All Items
                </h3>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {regularItems.map((item) => (
                  <ContentCard
                    key={item.id}
                    {...item}
                    onEdit={onEditCard}
                    onToggleFavorite={onToggleFavorite}
                    onDelete={onDeleteCard}
                    isFavorited={favoritedIds.has(item.id)}
                    isLoadingFavorite={isLoadingFavorite}
                    isLoadingDelete={isLoadingDelete}
                  />
                ))}
              </div>
            </div>
          )}

          {items.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400">No content available yet.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
