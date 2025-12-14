import { Heart, ExternalLink } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface FavoriteItem {
  id: string;
  title: string;
  description: string;
  source: 'github' | 'gitbook' | 'notion';
  url: string;
  addedDate: string;
}

interface FavoritesSectionProps {
  items?: FavoriteItem[];
  onRemove?: (id: string) => void;
}

export default function FavoritesSection({ items, onRemove }: FavoritesSectionProps) {
  const defaultItems: FavoriteItem[] = [
    {
      id: '1',
      title: 'React Documentation',
      description: 'Official React documentation and guides',
      source: 'gitbook',
      url: 'https://react.dev',
      addedDate: '2024-11-10',
    },
    {
      id: '2',
      title: 'Next.js Repository',
      description: 'Next.js framework source code',
      source: 'github',
      url: 'https://github.com/vercel/next.js',
      addedDate: '2024-11-09',
    },
    {
      id: '3',
      title: 'Project Notes',
      description: 'Shared project documentation',
      source: 'notion',
      url: 'https://notion.so',
      addedDate: '2024-11-08',
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

  if (displayItems.length === 0) {
    return (
      <Card className="bg-slate-900/50 border-slate-800 p-8">
        <div className="text-center">
          <Heart size={48} className="text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400">No favorites yet</p>
          <p className="text-sm text-gray-500 mt-2">Add items to your favorites to see them here</p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-white flex items-center gap-2">
        <Heart size={20} className="text-red-400" fill="currentColor" />
        Your Favorites
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayItems.map((item) => (
          <Card
            key={item.id}
            className="bg-slate-900/50 border-slate-800 p-4 hover:border-cyan-500/50 transition-colors group"
          >
            <div className="flex items-start justify-between mb-3">
              <Badge className={`${getSourceColor(item.source)} border capitalize`}>
                {item.source}
              </Badge>
              <button
                onClick={() => onRemove?.(item.id)}
                className="opacity-0 group-hover:opacity-100 transition-opacity text-red-400 hover:text-red-300"
              >
                <Heart size={18} fill="currentColor" />
              </button>
            </div>

            <h4 className="text-white font-semibold mb-2 group-hover:text-cyan-400 transition-colors">
              {item.title}
            </h4>
            <p className="text-gray-400 text-sm mb-4 line-clamp-2">{item.description}</p>

            <div className="flex items-center justify-between">
              <p className="text-xs text-gray-500">
                Added {new Date(item.addedDate).toLocaleDateString()}
              </p>
              <Button
                onClick={() => window.open(item.url, '_blank')}
                size="sm"
                className="bg-cyan-600 hover:bg-cyan-700"
              >
                <ExternalLink size={14} className="mr-1" />
                Open
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
