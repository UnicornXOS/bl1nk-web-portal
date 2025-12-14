import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Zap } from "lucide-react";

interface AIAgent {
  id: string;
  name: string;
  description: string;
  capabilities: string[];
  status: "online" | "training" | "offline";
  action: string;
  actionUrl?: string;
  icon?: string;
}

interface AIAgentsSectionProps {
  agents: AIAgent[];
}

const statusConfig = {
  online: {
    color: "bg-green-500/20 text-green-300",
    label: "Online",
    dot: "bg-green-500",
  },
  training: {
    color: "bg-yellow-500/20 text-yellow-300",
    label: "Training",
    dot: "bg-yellow-500",
  },
  offline: {
    color: "bg-gray-500/20 text-gray-300",
    label: "Offline",
    dot: "bg-gray-500",
  },
};

export default function AIAgentsSection({ agents }: AIAgentsSectionProps) {
  return (
    <section id="agents" className="py-20 bg-gradient-to-b from-slate-950 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">AI Agents</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Specialized AI agents ready to assist with different tasks. Each agent is optimized for specific domains and can work together seamlessly.
          </p>
        </div>

        {/* Agents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {agents.map((agent) => {
            const statusInfo = statusConfig[agent.status];
            return (
              <Card
                key={agent.id}
                className="bg-slate-800/50 border-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20 rounded-2xl overflow-hidden"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl">{agent.icon || "🤖"}</span>
                        <Badge className={`${statusInfo.color} border-0`}>
                          <span className={`inline-block w-2 h-2 rounded-full mr-2 ${statusInfo.dot}`} />
                          {statusInfo.label}
                        </Badge>
                      </div>
                      <CardTitle className="text-xl text-white">{agent.name}</CardTitle>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <CardDescription className="text-gray-400">{agent.description}</CardDescription>

                  {/* Capabilities */}
                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                      Capabilities
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {agent.capabilities.map((capability) => (
                        <Badge
                          key={capability}
                          variant="secondary"
                          className="bg-slate-700/50 text-gray-300 border-slate-600/50 text-xs"
                        >
                          {capability}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Action Button */}
                  <Button
                    onClick={() => {
                      if (agent.actionUrl) {
                        window.open(agent.actionUrl, "_blank");
                      }
                    }}
                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white border-0 gap-2 mt-4"
                  >
                    <Zap size={16} />
                    {agent.action}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Info Box */}
        <div className="mt-16 p-6 rounded-2xl bg-cyan-500/5 border border-cyan-500/20 backdrop-blur-sm">
          <p className="text-gray-400 text-center">
            💡 <span className="text-cyan-400 font-semibold">Tip:</span> You can combine multiple agents to create powerful workflows. Each agent can pass data to the next, enabling complex automation.
          </p>
        </div>
      </div>
    </section>
  );
}
