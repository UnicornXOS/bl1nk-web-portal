import { Plus, MessageSquare, Settings, Upload, Share2, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { useLocation } from 'wouter';

interface QuickAction {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  color: string;
  description?: string;
}

interface QuickActionsProps {
  actions?: QuickAction[];
}

export default function QuickActions({ actions }: QuickActionsProps) {
  const [, navigate] = useLocation();

  const defaultActions: QuickAction[] = [
    {
      label: 'New Content',
      icon: <Plus size={20} />,
      onClick: () => {
        toast.info('Create new content feature coming soon');
      },
      color: 'from-blue-500 to-blue-600',
      description: 'Add new content card',
    },
    {
      label: 'Start Chat',
      icon: <MessageSquare size={20} />,
      onClick: () => navigate('/chat'),
      color: 'from-purple-500 to-purple-600',
      description: 'Chat with AI assistant',
    },
    {
      label: 'Upload File',
      icon: <Upload size={20} />,
      onClick: () => {
        toast.info('File upload feature coming soon');
      },
      color: 'from-green-500 to-green-600',
      description: 'Upload documents',
    },
    {
      label: 'Share',
      icon: <Share2 size={20} />,
      onClick: () => {
        toast.info('Share feature coming soon');
      },
      color: 'from-pink-500 to-pink-600',
      description: 'Share content',
    },
    {
      label: 'Export',
      icon: <Download size={20} />,
      onClick: () => {
        toast.info('Export feature coming soon');
      },
      color: 'from-orange-500 to-orange-600',
      description: 'Export data',
    },
    {
      label: 'Settings',
      icon: <Settings size={20} />,
      onClick: () => navigate('/profile'),
      color: 'from-cyan-500 to-cyan-600',
      description: 'Manage settings',
    },
  ];

  const displayActions = actions || defaultActions;

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-white">Quick Actions</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {displayActions.map((action, index) => (
          <Button
            key={index}
            onClick={action.onClick}
            className={`h-auto flex flex-col items-center justify-center gap-2 py-4 px-3 bg-gradient-to-br ${action.color} hover:shadow-lg hover:shadow-${action.color.split('-')[1]}-500/50 transition-all group`}
            title={action.description}
          >
            <div className="group-hover:scale-110 transition-transform">
              {action.icon}
            </div>
            <span className="text-xs font-semibold text-center line-clamp-2">
              {action.label}
            </span>
          </Button>
        ))}
      </div>
    </div>
  );
}
