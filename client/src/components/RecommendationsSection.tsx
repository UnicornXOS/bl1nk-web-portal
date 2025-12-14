import { Lightbulb, ExternalLink, Plus } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface Recommendation {
  id: string;
  title: string;
  description: string;
  reason: string;
  source: 'github' | 'gitbook' | 'notion';
  url: string;
  relevanceScore: number;
  tags: string[];
}

interface RecommendationsSectionProps {
  items?: Recommendation[];
  onAdd?: (id: string) => void;
}

export default function RecommendationsSection({ items, onAdd }: RecommendationsSectionProps) {
  const defaultItems: Recommendation[] = [
    {
      id: '1',
      title: 'TypeScript Best Practices',
      description: 'Comprehensive guide to TypeScript patterns and best practices',
      reason: 'Based on your recent activity with TypeScript projects',
      source: 'gitbook',
      url: 'https://example.com',
      relevanceScore: 95,
      tags: ['typescript', 'best-practices', 'web-dev'],
    },
    {
      id: '2',
      title: 'React Performance Optimization',
      description: 'Advanced techniques for optimizing React applications',
      reason: 'You frequently work with React components',
      source: 'github',
      url: 'https://example.com',
      relevanceScore: 88,
      tags: ['react', 'performance', 'optimization'],
    },
    {
      id: '3',
      title: 'Database Design Patterns',
      description: 'Scalable database architecture and design patterns',
      reason: 'Complements your database integration work',
      source: 'notion',
      url: 'https://example.com',
      relevanceScore: 82,
      tags: ['database', 'architecture', 'design-patterns'],
    },
  ];

  const displayItems = items || defaultItems;

  const getSourceColor = (source: string) => {
    switch (source) {
      case 'github':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'gitbook':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'notion':
        return 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getRelevanceColor = (score: number) => {
    if (score >= 90) return 'bg-green-500/20 text-green-400';
    if (score >= 80) return 'bg-yellow-500/20 text-yellow-400';
    return 'bg-orange-500/20 text-orange-400';
  };

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-white flex items-center gap-2">
        <Lightbulb size={20} className="text-yellow-400" />
        Recommended for You
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayItems.map((item) => (
          <Card
            key={item.id}
            className="bg-gradient-to-br from-slate-900/50 to-slate-800/30 border-slate-800 p-4 hover:border-cyan-500/50 transition-colors group"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <Badge className={`${getSourceColor(item.source)} border capitalize text-xs`}>
                {item.source}
              </Badge>
              <Badge className={`${getRelevanceColor(item.relevanceScore)} border text-xs`}>
                {item.relevanceScore}% match
              </Badge>
            </div>

            {/* Title and Description */}
            <h4 className="text-white font-semibold mb-2 group-hover:text-cyan-400 transition-colors line-clamp-2">
              {item.title}
            </h4>
            <p className="text-gray-400 text-sm mb-3 line-clamp-2">{item.description}</p>

            {/* Reason */}
            <div className="bg-slate-800/50 rounded-lg p-2 mb-3">
              <p className="text-xs text-gray-300 italic">{item.reason}</p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1 mb-4">
              {item.tags.slice(0, 3).map((tag) => (
                <Badge
                  key={tag}
                  className="bg-slate-700 text-gray-300 border-slate-600 border text-xs"
                >
                  #{tag}
                </Badge>
              ))}
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <Button
                onClick={() => window.open(item.url, '_blank')}
                size="sm"
                className="flex-1 bg-cyan-600 hover:bg-cyan-700 text-white"
              >
                <ExternalLink size={14} className="mr-1" />
                View
              </Button>
              <Button
                onClick={() => onAdd?.(item.id)}
                size="sm"
                variant="outline"
                className="flex-1 border-cyan-500/30 hover:bg-cyan-500/10"
              >
                <Plus size={14} className="mr-1" />
                Add
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
