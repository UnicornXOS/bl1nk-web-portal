import { useState, useMemo } from "react";
import { ChevronDown, CheckCircle2, Circle, AlertCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface Task {
  id: string;
  title: string;
  status: "completed" | "pending" | "in-progress";
  phase: number;
  timestamp: Date;
}

export default function TaskTracker() {
  const [isExpanded, setIsExpanded] = useState(true);

  // Mock data: Last 5 phases with their tasks
  const mockTasks: Task[] = [
    // Phase 33: Profile Page
    { id: "33-1", title: "Create Profile component/page", status: "completed", phase: 33, timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000) },
    { id: "33-2", title: "Display user information", status: "completed", phase: 33, timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000) },
    { id: "33-3", title: "Show user statistics", status: "completed", phase: 33, timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000) },

    // Phase 32: Settings Page
    { id: "32-1", title: "Create Settings component/page", status: "completed", phase: 32, timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000) },
    { id: "32-2", title: "Add user preference settings", status: "completed", phase: 32, timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000) },
    { id: "32-3", title: "Add API key management", status: "completed", phase: 32, timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000) },

    // Phase 31: Fix Navbar
    { id: "31-1", title: "Update Navbar to use routing", status: "completed", phase: 31, timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000) },
    { id: "31-2", title: "Add Profile dropdown menu", status: "completed", phase: 31, timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000) },

    // Phase 30: Animations
    { id: "30-1", title: "Add fadeIn animation", status: "completed", phase: 30, timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000) },
    { id: "30-2", title: "Add slideUpFade animation", status: "completed", phase: 30, timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000) },

    // Phase 29: Interactive UI
    { id: "29-1", title: "Add Copy Link button", status: "completed", phase: 29, timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000) },
    { id: "29-2", title: "Add Delete button", status: "completed", phase: 29, timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000) },

    // Current Phase: UI Improvements
    { id: "34-1", title: "Add Noto Sans Fonts", status: "completed", phase: 34, timestamp: new Date() },
    { id: "35-1", title: "Implement Lobe AI Icons", status: "in-progress", phase: 35, timestamp: new Date() },
    { id: "36-1", title: "Redesign Cards with Glassmorphism", status: "pending", phase: 36, timestamp: new Date() },
  ];

  // Group tasks by phase (last 5 phases)
  const groupedTasks = useMemo(() => {
    const grouped: Record<number, Task[]> = {};
    mockTasks.forEach((task) => {
      if (!grouped[task.phase]) {
        grouped[task.phase] = [];
      }
      grouped[task.phase].push(task);
    });
    return Object.entries(grouped)
      .sort(([phaseA], [phaseB]) => Number(phaseB) - Number(phaseA))
      .slice(0, 5);
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 size={16} className="text-green-500" />;
      case "in-progress":
        return <AlertCircle size={16} className="text-yellow-500 animate-pulse" />;
      case "pending":
        return <Circle size={16} className="text-gray-400" />;
      default:
        return <Circle size={16} className="text-gray-400" />;
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <Card className="bg-slate-900/50 border-slate-800 border-l-2 border-l-cyan-500 sticky top-4">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
          <div>
            <CardTitle className="text-white text-base">Task Tracker</CardTitle>
            <CardDescription>Last 5 phases</CardDescription>
          </div>
          <ChevronDown
            size={20}
            className={`text-cyan-400 transition-transform ${isExpanded ? "rotate-180" : ""}`}
          />
        </div>
      </CardHeader>

      {isExpanded && (
        <CardContent className="space-y-4 max-h-96 overflow-y-auto">
          {groupedTasks.map(([phaseNum, tasks]) => (
            <div key={phaseNum} className="space-y-2">
              {/* Phase Header */}
              <div className="flex items-center gap-2 px-2 py-1 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
                <span className="text-xs font-bold text-cyan-400">Phase {phaseNum}</span>
                <span className="text-xs text-gray-400">
                  {tasks.filter((t) => t.status === "completed").length}/{tasks.length}
                </span>
              </div>

              {/* Tasks */}
              <div className="space-y-1 pl-2">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-start gap-2 p-2 rounded-lg hover:bg-slate-800/50 transition-colors group"
                  >
                    {getStatusIcon(task.status)}
                    <div className="flex-1 min-w-0">
                      <p
                        className={`text-xs truncate ${
                          task.status === "completed"
                            ? "text-gray-400 line-through"
                            : "text-gray-300"
                        }`}
                      >
                        {task.title}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">{formatTime(task.timestamp)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Summary */}
          <div className="pt-3 border-t border-slate-800">
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-2 bg-green-500/10 rounded-lg">
                <p className="text-lg font-bold text-green-400">
                  {mockTasks.filter((t) => t.status === "completed").length}
                </p>
                <p className="text-xs text-gray-400">Completed</p>
              </div>
              <div className="p-2 bg-yellow-500/10 rounded-lg">
                <p className="text-lg font-bold text-yellow-400">
                  {mockTasks.filter((t) => t.status === "in-progress").length}
                </p>
                <p className="text-xs text-gray-400">In Progress</p>
              </div>
              <div className="p-2 bg-gray-500/10 rounded-lg">
                <p className="text-lg font-bold text-gray-400">
                  {mockTasks.filter((t) => t.status === "pending").length}
                </p>
                <p className="text-xs text-gray-400">Pending</p>
              </div>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
}
