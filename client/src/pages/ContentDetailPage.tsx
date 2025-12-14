import { useLocation, useRoute } from 'wouter';
import { useState } from 'react';
import { ArrowLeft, ExternalLink, Copy, Heart, Share2, Edit2, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

import { toast } from 'sonner';

interface ContentCardDetail {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  source: 'github' | 'gitbook' | 'notion';
  url: string;
  tags: string[];
  featured: boolean;
  author?: string;
  stars?: number;
  forks?: number;
  lastUpdated?: string;
  language?: string;
  license?: string;
  topics?: string[];
  imageUrl?: string;
}

export default function ContentDetailPage() {
  const [, params] = useRoute('/content/:id');
  const [, navigate] = useLocation();
  const [isEditing, setIsEditing] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  // Mock data - replace with actual API call
  const mockContent: ContentCardDetail = {
    id: params?.id || 'default',
    title: 'bl1nk Web Portal',
    description: 'A modern web portal for managing content from GitHub, GitBook, and Notion',
    longDescription: `bl1nk Web Portal is a comprehensive web application that serves as a unified hub for content management. 
    It provides seamless integration with GitHub repositories, GitBook documentation, and Notion workspaces.
    
    Features include:
    - Unified content management across multiple platforms
    - AI-powered content organization
    - Real-time collaboration
    - Advanced search and filtering
    - Customizable dashboards
    
    Built with Next.js 15, React 19, and TypeScript for maximum performance and type safety.`,
    source: 'github',
    url: 'https://github.com/billlzzz10/bl1nk-web-portal',
    tags: ['nextjs', 'react', 'typescript', 'tailwind', 'web-portal'],
    featured: true,
    author: 'Doll Awit Chidjai',
    stars: 1250,
    forks: 340,
    lastUpdated: '2024-11-11T10:30:00Z',
    language: 'TypeScript',
    license: 'MIT',
    topics: ['web-development', 'content-management', 'ai-integration'],
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(mockContent.url);
    toast.success('URL copied to clipboard!');
  };

  const handleShare = () => {
    const text = `Check out "${mockContent.title}" - ${mockContent.description}\n${mockContent.url}`;
    if (navigator.share) {
      navigator.share({
        title: mockContent.title,
        text: mockContent.description,
        url: mockContent.url,
      });
    } else {
      navigator.clipboard.writeText(text);
      toast.success('Share text copied!');
    }
  };

  const handleToggleFavorite = () => {
    setIsFavorited(!isFavorited);
    toast.success(isFavorited ? 'Removed from favorites' : 'Added to favorites');
  };

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

  return (
    <div className="min-h-screen flex flex-col bg-slate-950">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/home')}
          className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors mb-6"
        >
          <ArrowLeft size={20} />
          Back to Dashboard
        </button>

        {/* Header Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {/* Title and Source */}
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h1 className="text-4xl font-bold text-white mb-3">
                      {mockContent.title}
                    </h1>
                    <p className="text-lg text-gray-300">
                      {mockContent.description}
                    </p>
                  </div>
                  <Badge className={`${getSourceColor(mockContent.source)} border`}>
                    {mockContent.source}
                  </Badge>
                </div>

                {/* Featured Badge */}
                {mockContent.featured && (
                  <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 border w-fit">
                    ⭐ Featured
                  </Badge>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <Button
                  onClick={() => window.open(mockContent.url, '_blank')}
                  className="bg-cyan-600 hover:bg-cyan-700 text-white"
                >
                  <ExternalLink size={18} className="mr-2" />
                  Open Source
                </Button>
                <Button
                  onClick={handleCopyUrl}
                  variant="outline"
                  className="border-cyan-500/30 hover:bg-cyan-500/10"
                >
                  <Copy size={18} className="mr-2" />
                  Copy Link
                </Button>
                <Button
                  onClick={handleShare}
                  variant="outline"
                  className="border-cyan-500/30 hover:bg-cyan-500/10"
                >
                  <Share2 size={18} className="mr-2" />
                  Share
                </Button>
                <Button
                  onClick={handleToggleFavorite}
                  variant="outline"
                  className={`border-cyan-500/30 hover:bg-cyan-500/10 ${
                    isFavorited ? 'bg-cyan-500/20 text-cyan-400' : ''
                  }`}
                >
                  <Heart size={18} className="mr-2" fill={isFavorited ? 'currentColor' : 'none'} />
                  {isFavorited ? 'Favorited' : 'Favorite'}
                </Button>
                <Button
                  onClick={() => setIsEditing(true)}
                  variant="outline"
                  className="border-cyan-500/30 hover:bg-cyan-500/10"
                >
                  <Edit2 size={18} className="mr-2" />
                  Edit
                </Button>
              </div>

              {/* Long Description */}
              <Card className="bg-slate-900/50 border-slate-800 p-6">
                <h2 className="text-xl font-semibold text-white mb-4">About</h2>
                <p className="text-gray-300 whitespace-pre-line leading-relaxed">
                  {mockContent.longDescription}
                </p>
              </Card>

              {/* Tags */}
              {mockContent.tags.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-white">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {mockContent.tags.map((tag) => (
                      <Badge
                        key={tag}
                        className="bg-slate-800 text-cyan-400 border-slate-700 border hover:bg-slate-700 cursor-pointer transition-colors"
                      >
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Topics */}
              {mockContent.topics && mockContent.topics.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-white">Topics</h3>
                  <div className="flex flex-wrap gap-2">
                    {mockContent.topics.map((topic) => (
                      <Badge
                        key={topic}
                        className="bg-purple-500/20 text-purple-400 border-purple-500/30 border"
                      >
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="bg-slate-900/50 border-slate-800 p-6 sticky top-20 space-y-6">
              {/* Stats */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Statistics</h3>

                {mockContent.stars !== undefined && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Stars</span>
                    <span className="text-white font-semibold">
                      {mockContent.stars.toLocaleString()}
                    </span>
                  </div>
                )}

                {mockContent.forks !== undefined && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Forks</span>
                    <span className="text-white font-semibold">
                      {mockContent.forks.toLocaleString()}
                    </span>
                  </div>
                )}

                {mockContent.language && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Language</span>
                    <span className="text-white font-semibold">{mockContent.language}</span>
                  </div>
                )}

                {mockContent.license && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">License</span>
                    <span className="text-white font-semibold">{mockContent.license}</span>
                  </div>
                )}
              </div>

              {/* Last Updated */}
              {mockContent.lastUpdated && (
                <div className="pt-4 border-t border-slate-700">
                  <p className="text-sm text-gray-400">
                    Last updated{' '}
                    {new Date(mockContent.lastUpdated).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              )}

              {/* Author */}
              {mockContent.author && (
                <div className="pt-4 border-t border-slate-700">
                  <p className="text-sm text-gray-400 mb-2">Author</p>
                  <p className="text-white font-semibold">{mockContent.author}</p>
                </div>
              )}
            </Card>
          </div>
        </div>

        {/* Related Content */}
        <div className="space-y-4 mb-12">
          <h2 className="text-2xl font-bold text-white">Related Content</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Placeholder for related content */}
            {[1, 2, 3].map((i) => (
              <Card
                key={i}
                className="bg-slate-900/50 border-slate-800 p-4 hover:border-cyan-500/50 transition-colors cursor-pointer"
              >
                <h3 className="text-white font-semibold mb-2">Related Item {i}</h3>
                <p className="text-gray-400 text-sm mb-3">Related content description</p>
                <Badge className="bg-slate-800 text-cyan-400 border-slate-700 border">
                  related
                </Badge>
              </Card>
            ))}
          </div>
        </div>
      </main>

      {/* Card Editor Modal - Placeholder */}
      {isEditing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="bg-slate-900 border-slate-800 w-full max-w-md">
            <div className="p-6">
              <h2 className="text-xl font-bold text-white mb-4">Edit Card</h2>
              <p className="text-gray-400 mb-6">Card editor interface would appear here</p>
              <div className="flex gap-3">
                <Button
                  onClick={() => {
                    setIsEditing(false);
                    toast.success('Card updated!');
                  }}
                  className="flex-1 bg-cyan-600 hover:bg-cyan-700"
                >
                  Save
                </Button>
                <Button
                  onClick={() => setIsEditing(false)}
                  variant="outline"
                  className="flex-1 border-cyan-500/30"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      <Footer />
    </div>
  );
}
