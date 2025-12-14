import { useState, useMemo } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DashboardStats from "@/components/DashboardStats";
import QuickActions from "@/components/QuickActions";
import SearchFilter from "@/components/SearchFilter";
import FavoritesSection from "@/components/FavoritesSection";
import RecommendationsSection from "@/components/RecommendationsSection";
import ContentSection, { ContentItem } from "@/components/ContentSection";
import AgentSkillsSection from "@/components/AgentSkillsSection";
import MermaidRenderer from "@/components/MermaidRenderer";
import CardEditor from "@/components/CardEditor";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Settings, Loader2 } from "lucide-react";
import { agentSkillsData } from "@/data/agentSkillsData";
import { toast } from "sonner";
import { useGitHubRepositories } from "@/hooks/useGitHubRepositories";
import { useFavorites } from "@/hooks/useFavorites";
import TaskTracker from "@/components/TaskTracker";
import { CraftDocumentsSection } from "@/components/CraftDocumentsSection";

// Mock Content Data for GitBook and Notion
const mockContentData = {
  gitbook: [
    {
      id: "gitbook-1",
      title: "Getting Started Guide",
      description: "Complete guide to get started with bl1nk. Installation, configuration, and first steps.",
      source: "gitbook" as const,
      url: "https://docs.bl1nk.dev/getting-started",
      tags: ["Documentation", "Setup", "Tutorial"],
      lastUpdated: "3 days ago",
      featured: true,
    },
    {
      id: "gitbook-2",
      title: "API Reference",
      description: "Complete API documentation with examples and code snippets for all endpoints.",
      source: "gitbook" as const,
      url: "https://docs.bl1nk.dev/api",
      tags: ["API", "Reference", "Documentation"],
      lastUpdated: "5 days ago",
    },
  ],
  notion: [
    {
      id: "notion-1",
      title: "Project Roadmap",
      description: "Detailed roadmap for bl1nk development. Features, milestones, and timeline.",
      source: "notion" as const,
      url: "https://notion.so/bl1nk-roadmap",
      tags: ["Planning", "Roadmap", "Strategy"],
      lastUpdated: "4 days ago",
      featured: true,
    },
    {
      id: "notion-2",
      title: "Team Knowledge Base",
      description: "Shared knowledge base for the team. Best practices, patterns, and solutions.",
      source: "notion" as const,
      url: "https://notion.so/bl1nk-kb",
      tags: ["Knowledge", "Team", "Best Practices"],
      lastUpdated: "1 day ago",
    },
  ],
};

export default function HomePage() {
  const { user, isAuthenticated } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [editingCard, setEditingCard] = useState<ContentItem | null>(null);
  const [deletingCardId, setDeletingCardId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [displayedContent, setDisplayedContent] = useState({
    gitbook: mockContentData.gitbook,
    notion: mockContentData.notion,
  });

  // Fetch GitHub repositories - only enabled after auth check
  const { items: githubItems, isLoading: isLoadingGitHub, error: githubError } = useGitHubRepositories({
    username: "billlzzz10",
    enabled: true, // GitHub API is public, no auth needed
  });

  // Manage favorites - only enabled if user is authenticated
  const {
    favoritedIds,
    isAdding: isAddingFavorite,
    isRemoving: isRemovingFavorite,
    toggleFavorite,
  } = useFavorites({ enabled: isAuthenticated });

  // Filter content based on search and filters
  const filterContent = (items: ContentItem[]) => {
    return items.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesFilters =
        selectedFilters.length === 0 ||
        selectedFilters.includes(item.source) ||
        (selectedFilters.includes("favorite") && favoritedIds.has(item.id));

      return matchesSearch && matchesFilters;
    });
  };

  const handleToggleFavorite = async (cardId: string, item: ContentItem) => {
    if (!isAuthenticated) {
      toast.error("Please log in to save favorites");
      return;
    }

    const success = await toggleFavorite(
      cardId,
      item.source,
      item.title,
      item.url,
      item.description
    );

    if (success) {
      const isFav = favoritedIds.has(cardId);
      toast.success(isFav ? "Removed from favorites" : "Added to favorites!");
    } else {
      toast.error("Failed to update favorite");
    }
  };

  const handleDeleteCard = async (cardId: string) => {
    setDeletingCardId(cardId);
    setIsDeleting(true);

    try {
      // Simulate delete operation
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Remove from displayed content
      setDisplayedContent((prev) => ({
        gitbook: prev.gitbook.filter((item) => item.id !== cardId),
        notion: prev.notion.filter((item) => item.id !== cardId),
      }));

      toast.success("Card deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete card");
    } finally {
      setIsDeleting(false);
      setDeletingCardId(null);
    }
  };

  const allContent = [
    ...githubItems,
    ...displayedContent.gitbook,
    ...displayedContent.notion,
  ];

  const favoriteItems = useMemo(() => {
    return allContent.filter((item) => favoritedIds.has(item.id));
  }, [allContent, favoritedIds]);

  const isLoadingFavorites = isAddingFavorite || isRemovingFavorite;

  return (
    <div className="min-h-screen flex flex-col bg-slate-950">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-12">
        {/* Welcome Section */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-white">
            Welcome back, {user?.name || "User"}! 👋
          </h1>
          <p className="text-gray-400">
            Here's your personalized dashboard with all your content and recommendations
          </p>
        </div>

        {/* Dashboard Stats */}
        <section>
          <DashboardStats />
        </section>

        {/* Quick Actions */}
        <section>
          <QuickActions />
        </section>

        {/* Search & Filter */}
        <section>
          <SearchFilter
            onSearch={setSearchQuery}
            onFilterChange={setSelectedFilters}
          />
        </section>

        {/* Favorites Section */}
        {isAuthenticated && favoriteItems.length > 0 && (
          <section>
            <FavoritesSection
              items={favoriteItems.map((item) => ({
                id: item.id,
                title: item.title,
                description: item.description,
                source: item.source,
                url: item.url,
                addedDate: new Date().toISOString(),
              }))}
              onRemove={(id) => {
                const item = allContent.find((i) => i.id === id);
                if (item) {
                  handleToggleFavorite(id, item);
                }
              }}
            />
          </section>
        )}

        {/* Recommendations Section */}
        <section>
          <RecommendationsSection
            onAdd={(id) => {
              const item = allContent.find((i) => i.id === id);
              if (item) {
                handleToggleFavorite(id, item);
              }
            }}
          />
        </section>

        {/* GitHub Content */}
        {githubError && (
          <Card className="bg-red-500/10 border-red-500/30 p-4">
            <p className="text-red-300">
              Failed to load GitHub repositories: {githubError}
            </p>
          </Card>
        )}

        {isLoadingGitHub ? (
          <Card className="bg-slate-900/50 border-slate-800 p-12 flex items-center justify-center">
            <div className="flex items-center gap-3">
              <Loader2 className="animate-spin" size={20} />
              <span className="text-gray-400">Loading GitHub repositories...</span>
            </div>
          </Card>
        ) : filterContent(githubItems).length > 0 ? (
          <section>
            <ContentSection
              title="GitHub Repositories"
              description={`Your favorite GitHub projects and repositories (${githubItems.length} found)`}
              items={filterContent(githubItems)}
              onEditCard={setEditingCard}
              onToggleFavorite={(id) => {
                const item = githubItems.find((i) => i.id === id);
                if (item) handleToggleFavorite(id, item);
              }}
              onDeleteCard={handleDeleteCard}
              favoritedIds={favoritedIds}
              isLoadingFavorite={isLoadingFavorites}
              isLoadingDelete={isDeleting && deletingCardId !== null}
            />
          </section>
        ) : null}

        {/* GitBook Content */}
        {filterContent(displayedContent.gitbook).length > 0 && (
          <section>
            <ContentSection
              title="GitBook Documentation"
              description="Documentation and guides from GitBook"
              items={filterContent(displayedContent.gitbook)}
              onEditCard={setEditingCard}
              onToggleFavorite={(id) => {
                const item = displayedContent.gitbook.find((i) => i.id === id);
                if (item) handleToggleFavorite(id, item);
              }}
              onDeleteCard={handleDeleteCard}
              favoritedIds={favoritedIds}
              isLoadingFavorite={isLoadingFavorites}
              isLoadingDelete={isDeleting && deletingCardId !== null}
            />
          </section>
        )}

        {/* Notion Content */}
        {filterContent(displayedContent.notion).length > 0 && (
          <section>
            <ContentSection
              title="Notion Workspaces"
              description="Shared workspaces and notes from Notion"
              items={filterContent(displayedContent.notion)}
              onEditCard={setEditingCard}
              onToggleFavorite={(id) => {
                const item = displayedContent.notion.find((i) => i.id === id);
                if (item) handleToggleFavorite(id, item);
              }}
              onDeleteCard={handleDeleteCard}
              favoritedIds={favoritedIds}
              isLoadingFavorite={isLoadingFavorites}
              isLoadingDelete={isDeleting && deletingCardId !== null}
            />
          </section>
        )}

        {/* Craft Documents */}
        <section>
          <CraftDocumentsSection favoritedIds={favoritedIds} />
        </section>

        {/* AI Agent Skills */}
        <section>
          <AgentSkillsSection agents={agentSkillsData} />
        </section>

        {/* Diagram Example - Temporarily Disabled */}
        {/* 
        <section>
          <Card className="bg-slate-900/50 border-slate-800 p-6">
            <h2 className="text-2xl font-bold text-white mb-4">Diagram Example</h2>
            <p className="text-gray-400 mb-6">
              Here is an example of a Mermaid diagram. You can edit, export, and share diagrams.
            </p>
            <MermaidRenderer
              code={`graph LR
    A[Start] --> B[Process]
    B --> C[End]`}
              title="Sample Workflow"
              diagramType="flowchart"
            />
          </Card>
        </section>
        */}

        {/* No Results Message */}
        {filterContent(allContent).length === 0 && !isLoadingGitHub && (
          <Card className="bg-slate-900/50 border-slate-800 p-12 text-center">
            <p className="text-gray-400 text-lg">
              No content found matching your search criteria
            </p>
            <Button
              onClick={() => {
                setSearchQuery("");
                setSelectedFilters([]);
              }}
              className="mt-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
            >
              Clear Filters
            </Button>
          </Card>
        )}
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1 h-fit">
            <TaskTracker />
          </aside>
        </div>
      </main>

      {/* Card Editor Modal */}
      {editingCard && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="bg-slate-900 border-slate-800 w-full max-w-md">
            <div className="p-6">
              <h2 className="text-xl font-bold text-white mb-4">Edit Card</h2>
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Title</label>
                  <input
                    type="text"
                    defaultValue={editingCard.title}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Description</label>
                  <textarea
                    defaultValue={editingCard.description}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 h-24 resize-none"
                  />
                </div>
              </div>
              <div className="flex gap-3">
                <Button
                  onClick={() => {
                    setEditingCard(null);
                    toast.success("Card updated!");
                  }}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                >
                  Save
                </Button>
                <Button
                  onClick={() => setEditingCard(null)}
                  variant="outline"
                  className="flex-1 border-white/10 text-white hover:bg-white/10"
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
