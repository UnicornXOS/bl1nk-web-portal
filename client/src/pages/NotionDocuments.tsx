import { useState } from "react";
import { Search, FileText, Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { trpc } from "@/lib/trpc";
import { Loader2 } from "lucide-react";
import NotionDocumentPreviewModal from "@/components/NotionDocumentPreviewModal";

interface NotionPage {
  id: string;
  title: string;
  last_edited_time?: string;
  created_time?: string;
  created_by?: {
    name: string;
  };
  url?: string;
}

export default function NotionDocuments() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPageId, setSelectedPageId] = useState<string | null>(null);
  const [selectedPageTitle, setSelectedPageTitle] = useState("");

  // Fetch pages from Notion API
  const { data: pages = [], isLoading, error } = trpc.notion.getPages.useQuery();

  // Filter pages by search query
  const filteredPages = pages.filter((page: any) =>
    page.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleViewPage = (pageId: string, title: string) => {
    setSelectedPageId(pageId);
    setSelectedPageTitle(title);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Unknown";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <div className="relative overflow-hidden border-b border-white/10 bg-gradient-to-b from-purple-600/10 via-black to-black px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h1 className="mb-4 text-4xl font-bold text-white sm:text-5xl">
            Company Documentation
          </h1>
          <p className="mb-8 max-w-2xl text-lg text-gray-300">
            Browse company documentation, wikis, and knowledge base articles from Notion.
          </p>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search documentation..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border-white/10 bg-white/5 pl-10 text-white placeholder:text-gray-500"
            />
          </div>
        </div>
      </div>

      {/* Documents List */}
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-purple-500" />
          </div>
        ) : error ? (
          <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-4 text-red-300">
            Failed to load documentation. Please try again later.
          </div>
        ) : filteredPages.length === 0 ? (
          <div className="rounded-lg border border-white/10 bg-white/5 p-8 text-center">
            <p className="text-gray-300">No documentation found. Try adjusting your search.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredPages.map((page: any) => (
              <div
                key={page.id}
                className="group relative overflow-hidden rounded-lg border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl hover:border-white/20 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 p-6"
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/5 group-hover:to-pink-500/5 transition-all duration-300" />

                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <FileText className="h-5 w-5 text-purple-400 flex-shrink-0" />
                        <h3 className="text-lg font-semibold text-white truncate">{page.title}</h3>
                      </div>
                    </div>
                  </div>

                  {/* Metadata */}
                  <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-4 border-t border-white/10 pt-4">
                    {page.created_time && (
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>Created: {formatDate(page.created_time)}</span>
                      </div>
                    )}
                    {page.last_edited_time && (
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>Updated: {formatDate(page.last_edited_time)}</span>
                      </div>
                    )}
                    {page.created_by?.name && (
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        <span>By: {page.created_by.name}</span>
                      </div>
                    )}
                  </div>

                  {/* Action Button */}
                  <Button
                    onClick={() => handleViewPage(page.id, page.title)}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                  >
                    View Documentation
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Preview Modal */}
      {selectedPageId && (
        <NotionDocumentPreviewModal
          pageId={selectedPageId}
          title={selectedPageTitle}
          isOpen={!!selectedPageId}
          onClose={() => setSelectedPageId(null)}
        />
      )}
    </div>
  );
}
