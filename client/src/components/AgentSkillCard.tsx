import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronRight, Zap } from "lucide-react";

export interface SkillParameter {
  Param_Name: string;
  Data_Type: string;
  Scope_Format: string;
  Description: string;
}

export interface AgentSkill {
  Skill_Name: string;
  Skill_ID: string;
  Parameters?: SkillParameter[];
}

interface AgentSkillCardProps {
  skill: AgentSkill;
  agentName: string;
  onViewDetails?: (skill: AgentSkill) => void;
}

export default function AgentSkillCard({
  skill,
  agentName,
  onViewDetails,
}: AgentSkillCardProps) {
  const getParameterTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "text":
        return "bg-blue-500/20 text-blue-300";
      case "number":
        return "bg-green-500/20 text-green-300";
      case "select":
        return "bg-purple-500/20 text-purple-300";
      case "boolean":
        return "bg-yellow-500/20 text-yellow-300";
      case "file":
        return "bg-orange-500/20 text-orange-300";
      case "multi-select":
        return "bg-pink-500/20 text-pink-300";
      default:
        return "bg-gray-500/20 text-gray-300";
    }
  };

  return (
    <Card className="bg-slate-800/50 border-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300 rounded-2xl overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Zap size={18} className="text-cyan-400" />
              <Badge className="bg-cyan-500/20 text-cyan-300 border-0 text-xs">
                {skill.Skill_ID}
              </Badge>
            </div>
            <CardTitle className="text-white text-lg">{skill.Skill_Name}</CardTitle>
            <CardDescription className="text-gray-400 text-sm mt-1">
              Agent: {agentName}
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Parameters */}
        {skill.Parameters && skill.Parameters.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
              Parameters ({skill.Parameters.length})
            </p>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {skill.Parameters.map((param, index) => (
                <div
                  key={index}
                  className="p-2 bg-slate-900/50 rounded border border-slate-700/50"
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <span className="text-sm font-medium text-gray-300">
                      {param.Param_Name}
                    </span>
                    <Badge
                      className={`${getParameterTypeColor(
                        param.Data_Type
                      )} border-0 text-xs`}
                    >
                      {param.Data_Type}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-400 line-clamp-2">
                    {param.Description}
                  </p>
                  {param.Scope_Format && (
                    <p className="text-xs text-gray-500 mt-1 font-mono">
                      {param.Scope_Format}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Button */}
        <Button
          onClick={() => onViewDetails?.(skill)}
          className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white border-0 gap-2"
        >
          View Details
          <ChevronRight size={16} />
        </Button>
      </CardContent>
    </Card>
  );
}
