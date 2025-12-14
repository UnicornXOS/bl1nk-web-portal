import { useState, useMemo } from "react";
import { Search, Filter } from "lucide-react";
import AIAgentCard from "@/components/AIAgentCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { trpc } from "@/lib/trpc";
import { Loader2 } from "lucide-react";

type LanguageFilter = "all" | "js" | "ts" | "python" | "uv" | "json" | "yaml";

const LANGUAGE_OPTIONS: { value: LanguageFilter; label: string }[] = [
  { value: "all", label: "All Languages" },
  { value: "ts", label: "TypeScript" },
  { value: "js", label: "JavaScript" },
  { value: "python", label: "Python" },
  { value: "uv", label: "UV" },
  { value: "json", label: "JSON" },
  { value: "yaml", label: "YAML" },
];

export default function AgentStore() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageFilter>("all");
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch agents from database
  const { data: agentsData, isLoading, error } = trpc.agents.list.useQuery({
    page: currentPage,
    limit: 12,
    search: searchQuery || undefined,
    language: selectedLanguage !== "all" ? (selectedLanguage as any) : undefined,
  });

  const { mutate: incrementDownloads } = trpc.agents.incrementDownloads.useMutation();

  const agents = agentsData?.agents || [];

  // Parse JSON fields
  const parsedAgents = agents.map((agent) => ({
    ...agent,
    tools: agent.tools ? JSON.parse(agent.tools) : [],
    tags: agent.tags ? JSON.parse(agent.tags) : [],
    dependencies: agent.dependencies ? JSON.parse(agent.dependencies) : [],
  }));

  const handleDownload = (id: number) => {
    incrementDownloads({ id });
    // In a real app, this would trigger download/installation
  };

  const handleViewDetails = (id: number) => {
    // In a real app, this would navigate to agent detail page
    console.log("View details for agent:", id);
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <div className="relative overflow-hidden border-b border-white/10 bg-gradient-to-b from-blue-600/10 via-black to-black px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h1 className="mb-4 text-4xl font-bold text-white sm:text-5xl">
            Agent Store
          </h1>
          <p className="mb-8 max-w-2xl text-lg text-gray-300">
            Discover and use pre-built AI agents. Browse our collection of agents across different programming languages and use cases.
          </p>

          {/* Search and Filter */}
          <div className="space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search agents by name..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="border-white/10 bg-white/5 pl-10 text-white placeholder:text-gray-500"
              />
            </div>

            {/* Language Filter */}
            <div className="flex flex-wrap gap-2">
              <Filter className="h-5 w-5 text-gray-400" />
              {LANGUAGE_OPTIONS.map((option) => (
                <Button
                  key={option.value}
                  variant={selectedLanguage === option.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    setSelectedLanguage(option.value);
                    setCurrentPage(1);
                  }}
                  className={
                    selectedLanguage === option.value
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "border-white/10 text-gray-300 hover:bg-white/5"
                  }
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Agents Grid */}
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
          </div>
        ) : error ? (
          <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-4 text-red-300">
            Failed to load agents. Please try again later.
          </div>
        ) : agents.length === 0 ? (
          <div className="rounded-lg border border-white/10 bg-white/5 p-8 text-center">
            <p className="text-gray-300">No agents found. Try adjusting your search or filters.</p>
          </div>
        ) : (
          <>
            <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {parsedAgents.map((agent) => (
                <AIAgentCard
                  key={agent.id}
                  id={agent.id}
                  name={agent.name}
                  version={agent.version}
                  description={agent.description || undefined}
                  language={agent.language as any}
                  tools={agent.tools}
                  author={agent.author || undefined}
                  downloadCount={agent.downloadCount}
                  rating={agent.rating}
                  tags={agent.tags}
                  onDownload={handleDownload}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>

            {/* Pagination */}
            {agents.length > 0 && (
              <div className="flex items-center justify-center gap-2 border-t border-white/10 pt-8">
                <Button
                  variant="outline"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className="border-white/10 text-white hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </Button>
                <span className="text-gray-400">Page {currentPage}</span>
                <Button
                  variant="outline"
                  disabled={agents.length < 12}
                  onClick={() => setCurrentPage((p) => p + 1)}
                  className="border-white/10 text-white hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
