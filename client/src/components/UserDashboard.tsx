import { useState } from 'react';
import { User, Mail, Calendar, Settings, LogOut, Edit2, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/_core/hooks/useAuth';
import { trpc } from '@/lib/trpc';

interface UserStats {
  totalCards: number;
  totalFavorites: number;
  totalSessions: number;
  lastActive: string;
}

export default function UserDashboard() {
  const { user, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [stats] = useState<UserStats>({
    totalCards: 24,
    totalFavorites: 8,
    totalSessions: 15,
    lastActive: new Date().toISOString(),
  });

  if (!user) {
    return (
      <div className="flex items-center justify-center p-8">
        <p className="text-gray-400">Please log in to view your dashboard</p>
      </div>
    );
  }

  const joinDate = new Date(user.createdAt || new Date());
  const lastSignIn = new Date(user.lastSignedIn || new Date());

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card className="bg-gradient-to-r from-slate-900/50 to-cyan-900/20 border-slate-800 overflow-hidden">
        <div className="p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            {/* Profile Info */}
            <div className="flex items-center gap-6 flex-1">
              {/* Avatar */}
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white text-3xl font-bold border-2 border-cyan-400/50">
                  {user.name?.charAt(0).toUpperCase() || 'U'}
                </div>
                <button className="absolute bottom-0 right-0 bg-cyan-600 hover:bg-cyan-700 rounded-full p-2 transition-colors">
                  <Upload size={16} className="text-white" />
                </button>
              </div>

              {/* User Info */}
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-white mb-2">{user.name || 'User'}</h2>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-300">
                    <Mail size={16} />
                    <span>{user.email || 'No email'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <User size={16} />
                    <span className="capitalize">{user.role || 'user'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <Calendar size={16} />
                    <span>
                      Joined {joinDate.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 w-full md:w-auto">
              <Button
                onClick={() => setIsEditing(!isEditing)}
                className="flex-1 md:flex-none bg-cyan-600 hover:bg-cyan-700 text-white"
              >
                <Edit2 size={18} className="mr-2" />
                Edit Profile
              </Button>
              <Button
                onClick={logout}
                variant="outline"
                className="flex-1 md:flex-none border-red-500/30 hover:bg-red-500/10 text-red-400"
              >
                <LogOut size={18} className="mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-slate-900/50 border-slate-800 p-6">
          <div className="space-y-2">
            <p className="text-gray-400 text-sm">Total Cards</p>
            <p className="text-3xl font-bold text-cyan-400">{stats.totalCards}</p>
            <p className="text-xs text-gray-500">Content items managed</p>
          </div>
        </Card>

        <Card className="bg-slate-900/50 border-slate-800 p-6">
          <div className="space-y-2">
            <p className="text-gray-400 text-sm">Favorites</p>
            <p className="text-3xl font-bold text-yellow-400">{stats.totalFavorites}</p>
            <p className="text-xs text-gray-500">Bookmarked items</p>
          </div>
        </Card>

        <Card className="bg-slate-900/50 border-slate-800 p-6">
          <div className="space-y-2">
            <p className="text-gray-400 text-sm">Chat Sessions</p>
            <p className="text-3xl font-bold text-purple-400">{stats.totalSessions}</p>
            <p className="text-xs text-gray-500">Active conversations</p>
          </div>
        </Card>

        <Card className="bg-slate-900/50 border-slate-800 p-6">
          <div className="space-y-2">
            <p className="text-gray-400 text-sm">Last Active</p>
            <p className="text-xl font-bold text-green-400">
              {lastSignIn.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </p>
            <p className="text-xs text-gray-500">
              {lastSignIn.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
        </Card>
      </div>

      {/* Activity Section */}
      <Card className="bg-slate-900/50 border-slate-800 p-6">
        <h3 className="text-xl font-semibold text-white mb-6">Recent Activity</h3>
        <div className="space-y-4">
          {[
            { action: 'Created new card', time: '2 hours ago', type: 'create' },
            { action: 'Edited GitHub Repository', time: '5 hours ago', type: 'edit' },
            { action: 'Started chat session', time: '1 day ago', type: 'chat' },
            { action: 'Favorited 3 items', time: '2 days ago', type: 'favorite' },
            { action: 'Updated API keys', time: '3 days ago', type: 'settings' },
          ].map((activity, index) => (
            <div key={index} className="flex items-center justify-between py-3 border-b border-slate-800 last:border-0">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
                <div>
                  <p className="text-white font-medium">{activity.action}</p>
                  <p className="text-sm text-gray-400">{activity.time}</p>
                </div>
              </div>
              <Badge className="bg-slate-800 text-cyan-400 border-slate-700 border capitalize">
                {activity.type}
              </Badge>
            </div>
          ))}
        </div>
      </Card>

      {/* Account Settings */}
      <Card className="bg-slate-900/50 border-slate-800 p-6">
        <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <Settings size={20} />
          Account Settings
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-slate-800">
            <div>
              <p className="text-white font-medium">Two-Factor Authentication</p>
              <p className="text-sm text-gray-400">Secure your account with 2FA</p>
            </div>
            <Badge className="bg-red-500/20 text-red-400 border-red-500/30 border">Disabled</Badge>
          </div>

          <div className="flex items-center justify-between py-3 border-b border-slate-800">
            <div>
              <p className="text-white font-medium">Email Notifications</p>
              <p className="text-sm text-gray-400">Receive updates about your account</p>
            </div>
            <Badge className="bg-green-500/20 text-green-400 border-green-500/30 border">Enabled</Badge>
          </div>

          <div className="flex items-center justify-between py-3">
            <div>
              <p className="text-white font-medium">Data Privacy</p>
              <p className="text-sm text-gray-400">Manage your data and privacy settings</p>
            </div>
            <Button variant="outline" className="border-cyan-500/30 hover:bg-cyan-500/10">
              Manage
            </Button>
          </div>
        </div>
      </Card>

      {/* Danger Zone */}
      <Card className="bg-red-950/20 border-red-900/30 p-6">
        <h3 className="text-xl font-semibold text-red-400 mb-6">Danger Zone</h3>
        <div className="space-y-3">
          <Button
            variant="outline"
            className="w-full border-red-500/30 hover:bg-red-500/10 text-red-400"
          >
            Reset Password
          </Button>
          <Button
            variant="outline"
            className="w-full border-red-500/30 hover:bg-red-500/10 text-red-400"
          >
            Delete Account
          </Button>
        </div>
      </Card>
    </div>
  );
}
