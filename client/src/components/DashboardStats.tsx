import { TrendingUp, Users, FileText, Zap, Clock, Target } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface StatItem {
  label: string;
  value: string | number;
  change?: number;
  icon: React.ReactNode;
  color: string;
}

interface DashboardStatsProps {
  stats?: StatItem[];
}

export default function DashboardStats({ stats }: DashboardStatsProps) {
  const defaultStats: StatItem[] = [
    {
      label: 'Total Content',
      value: 24,
      change: 12,
      icon: <FileText size={24} />,
      color: 'from-blue-500 to-blue-600',
    },
    {
      label: 'Active Sessions',
      value: 5,
      change: 3,
      icon: <Users size={24} />,
      color: 'from-purple-500 to-purple-600',
    },
    {
      label: 'Favorites',
      value: 8,
      change: 2,
      icon: <Target size={24} />,
      color: 'from-yellow-500 to-yellow-600',
    },
    {
      label: 'API Calls',
      value: '1.2K',
      change: 24,
      icon: <Zap size={24} />,
      color: 'from-green-500 to-green-600',
    },
    {
      label: 'Avg Response',
      value: '245ms',
      change: -8,
      icon: <Clock size={24} />,
      color: 'from-cyan-500 to-cyan-600',
    },
    {
      label: 'Growth Rate',
      value: '24%',
      change: 5,
      icon: <TrendingUp size={24} />,
      color: 'from-pink-500 to-pink-600',
    },
  ];

  const displayStats = stats || defaultStats;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {displayStats.map((stat, index) => (
        <div
          key={index}
          className="glass-card p-6 group"
        >
          <div className="flex items-start justify-between mb-4">
            <div className={`p-3 rounded-lg bg-gradient-to-br ${stat.color} text-white group-hover:scale-110 transition-transform`}>
              {stat.icon}
            </div>
            {stat.change !== undefined && (
              <div
                className={`text-sm font-semibold px-2 py-1 rounded ${
                  stat.change >= 0
                    ? 'bg-green-500/20 text-green-400'
                    : 'bg-red-500/20 text-red-400'
                }`}
              >
                {stat.change >= 0 ? '+' : ''}{stat.change}%
              </div>
            )}
          </div>

          <div className="space-y-2">
            <p className="text-gray-400 text-sm font-medium">{stat.label}</p>
            <p className="text-3xl font-bold text-white">{stat.value}</p>
          </div>

          <div className="mt-4 h-1 bg-slate-700 rounded-full overflow-hidden">
            <div
              className={`h-full bg-gradient-to-r ${stat.color}`}
              style={{ width: `${Math.min(100, (typeof stat.value === 'number' ? stat.value : 0) * 4)}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
}
