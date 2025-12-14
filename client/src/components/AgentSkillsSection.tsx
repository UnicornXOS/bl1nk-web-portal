import { useState } from "react";
import AgentCard, { AgentProfile } from "@/components/AgentCard";
import AgentSkillCard from "@/components/AgentSkillCard";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";

interface AgentSkillsSectionProps {
  agents: AgentProfile[];
}

export default function AgentSkillsSection({ agents }: AgentSkillsSectionProps) {
  const [selectedAgent, setSelectedAgent] = useState<AgentProfile | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTrack, setSelectedTrack] = useState<string | null>(null);

  // Get unique tracks
  const tracks = Array.from(new Set(agents.map((a) => a.Track)));

  // Filter agents
  const filteredAgents = agents.filter((agent) => {
    const matchesSearch =
      agent.Agent_Profile.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.Agent_ID.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.Skills.some((skill) =>
        skill.Skill_Name.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesTrack = !selectedTrack || agent.Track === selectedTrack;

    return matchesSearch && matchesTrack;
  });

  return (
    <section className="py-20 bg-gradient-to-b from-slate-950 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">AI Agent Skills</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Explore specialized skills and capabilities of our AI agents. Each agent is equipped with multiple skills to handle different tasks.
          </p>
        </div>

        {/* Search & Filter */}
        <div className="space-y-4 mb-12">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <Input
              placeholder="Search agents or skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-slate-800 border-slate-700 text-white placeholder:text-gray-500"
            />
          </div>

          {/* Track Filter */}
          <div className="flex flex-wrap gap-2">
            <Button
              onClick={() => setSelectedTrack(null)}
              variant={selectedTrack === null ? "default" : "outline"}
              className={
                selectedTrack === null
                  ? "bg-cyan-500 hover:bg-cyan-600"
                  : "border-slate-600 text-gray-400 hover:bg-slate-800"
              }
            >
              All Tracks
            </Button>
            {tracks.map((track) => (
              <Button
                key={track}
                onClick={() => setSelectedTrack(track)}
                variant={selectedTrack === track ? "default" : "outline"}
                className={
                  selectedTrack === track
                    ? "bg-cyan-500 hover:bg-cyan-600"
                    : "border-slate-600 text-gray-400 hover:bg-slate-800"
                }
              >
                {track}
              </Button>
            ))}
          </div>
        </div>

        {/* Agents Grid */}
        {filteredAgents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAgents.map((agent) => (
              <AgentCard
                key={agent.Agent_ID}
                agent={agent}
                onViewSkills={setSelectedAgent}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400 mb-2">No agents found</p>
            <p className="text-gray-500 text-sm">Try adjusting your search or filter criteria</p>
          </div>
        )}

        {/* Skills Detail Modal */}
        {selectedAgent && (
          <Dialog open={!!selectedAgent} onOpenChange={() => setSelectedAgent(null)}>
            <DialogContent className="bg-slate-900 border-cyan-500/30 text-white max-w-4xl max-h-96 overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-white text-2xl">
                  {selectedAgent.Agent_Profile} - Skills
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-4 py-4">
                {selectedAgent.Skills.map((skill) => (
                  <AgentSkillCard
                    key={skill.Skill_ID}
                    skill={skill}
                    agentName={selectedAgent.Agent_Profile}
                  />
                ))}
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </section>
  );
}
