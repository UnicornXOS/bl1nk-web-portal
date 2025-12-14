import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { AgentSkill } from "@/components/AgentSkillCard";

export interface AgentProfile {
  Agent_Profile: string;
  Agent_ID: string;
  Track: string;
  Skills: AgentSkill[];
}

interface AgentCardProps {
  agent: AgentProfile;
  onViewSkills?: (agent: AgentProfile) => void;
}

const trackColors = {
  Builder: "bg-blue-500/20 text-blue-300",
  Analyzer: "bg-purple-500/20 text-purple-300",
  Designer: "bg-pink-500/20 text-pink-300",
  Developer: "bg-green-500/20 text-green-300",
  Optimizer: "bg-yellow-500/20 text-yellow-300",
  Tester: "bg-red-500/20 text-red-300",
};

export default function AgentCard({ agent, onViewSkills }: AgentCardProps) {
  const trackColor = trackColors[agent.Track as keyof typeof trackColors] || "bg-gray-500/20 text-gray-300";

  return (
    <Card className="bg-slate-800/50 border-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300 rounded-2xl overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-3xl">🤖</span>
              <Badge className={`${trackColor} border-0`}>{agent.Track}</Badge>
            </div>
            <CardTitle className="text-white text-xl">{agent.Agent_Profile}</CardTitle>
            <CardDescription className="text-gray-400 text-sm mt-1">
              ID: {agent.Agent_ID}
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Skills Summary */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
            Skills ({agent.Skills.length})
          </p>
          <div className="space-y-1">
            {agent.Skills.slice(0, 3).map((skill) => (
              <div
                key={skill.Skill_ID}
                className="flex items-start justify-between gap-2 p-2 bg-slate-900/50 rounded border border-slate-700/50"
              >
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-300 line-clamp-1">
                    {skill.Skill_Name}
                  </p>
                  <p className="text-xs text-gray-500">{skill.Skill_ID}</p>
                </div>
              </div>
            ))}
            {agent.Skills.length > 3 && (
              <p className="text-xs text-gray-400 px-2 py-1">
                +{agent.Skills.length - 3} more skills
              </p>
            )}
          </div>
        </div>

        {/* Action Button */}
        <Button
          onClick={() => onViewSkills?.(agent)}
          className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white border-0 gap-2"
        >
          View All Skills
          <ChevronRight size={16} />
        </Button>
      </CardContent>
    </Card>
  );
}
