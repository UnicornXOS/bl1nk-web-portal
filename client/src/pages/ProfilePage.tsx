import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, Mail, Calendar, Github, BookOpen, Database, Activity, Award } from "lucide-react";
import { toast } from "sonner";

export default function ProfilePage() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: user?.name || "",
    email: user?.email || "",
    bio: "Full-stack developer passionate about AI and open source",
    location: "San Francisco, CA",
    website: "https://example.com",
    joinDate: "November 2024",
  });

  const handleSave = async () => {
    try {
      // Simulate save operation
      await new Promise((resolve) => setTimeout(resolve, 500));
      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      toast.error("Failed to update profile");
    }
  };

  const stats = [
    { icon: <Github size={20} />, label: "Repositories", value: "24", color: "bg-blue-500/20" },
    { icon: <BookOpen size={20} />, label: "Documentation", value: "12", color: "bg-purple-500/20" },
    { icon: <Database size={20} />, label: "Workspaces", value: "8", color: "bg-cyan-500/20" },
    { icon: <Activity size={20} />, label: "Active Sessions", value: "5", color: "bg-green-500/20" },
  ];

  const recentActivity = [
    { action: "Created repository", target: "bl1nk-portal", time: "2 hours ago" },
    { action: "Updated documentation", target: "API Guide", time: "5 hours ago" },
    { action: "Shared workspace", target: "Team Knowledge Base", time: "1 day ago" },
    { action: "Favorited content", target: "GitHub Trending", time: "2 days ago" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-950">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card className="bg-slate-900/50 border-slate-800">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center mb-4">
                    <User size={48} className="text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-1">{profile.name}</h2>
                  <p className="text-gray-400 text-sm mb-4">{profile.email}</p>
                  <p className="text-gray-300 text-sm mb-6">{profile.bio}</p>
                  <Button
                    onClick={() => setIsEditing(!isEditing)}
                    className="bg-cyan-600 hover:bg-cyan-700 text-white w-full"
                  >
                    {isEditing ? "Cancel" : "Edit Profile"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Stats Grid */}
          <div className="lg:col-span-2 grid grid-cols-2 gap-4">
            {stats.map((stat, index) => (
              <Card key={index} className="bg-slate-900/50 border-slate-800">
                <CardContent className="p-4">
                  <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center mb-3`}>
                    <div className="text-cyan-400">{stat.icon}</div>
                  </div>
                  <p className="text-gray-400 text-sm">{stat.label}</p>
                  <p className="text-3xl font-bold text-white">{stat.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Edit Profile Section */}
        {isEditing && (
          <Card className="bg-slate-900/50 border-slate-800 mb-8 animate-slide-up-fade">
            <CardHeader>
              <CardTitle className="text-white">Edit Profile</CardTitle>
              <CardDescription>Update your profile information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                  <Input
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="bg-slate-800 border-slate-700 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                  <Input
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="bg-slate-800 border-slate-700 text-white"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Bio</label>
                <textarea
                  value={profile.bio}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500 h-24 resize-none"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Location</label>
                  <Input
                    value={profile.location}
                    onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                    className="bg-slate-800 border-slate-700 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Website</label>
                  <Input
                    value={profile.website}
                    onChange={(e) => setProfile({ ...profile, website: e.target.value })}
                    className="bg-slate-800 border-slate-700 text-white"
                  />
                </div>
              </div>
              <div className="flex gap-3">
                <Button
                  onClick={handleSave}
                  className="flex-1 bg-cyan-600 hover:bg-cyan-700 text-white"
                >
                  Save Changes
                </Button>
                <Button
                  onClick={() => setIsEditing(false)}
                  variant="outline"
                  className="flex-1 border-cyan-500/30"
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="bg-slate-900/50 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white">Recent Activity</CardTitle>
                <CardDescription>Your recent actions and updates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start gap-4 pb-4 border-b border-slate-800 last:border-0">
                      <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                        <Activity size={16} className="text-cyan-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-300">
                          <span className="font-medium">{activity.action}</span>
                          {" "}
                          <span className="text-gray-400">{activity.target}</span>
                        </p>
                        <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Connected Services */}
          <div>
            <Card className="bg-slate-900/50 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white text-lg">Connected Services</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { name: "GitHub", connected: true, icon: "🐙" },
                  { name: "GitBook", connected: true, icon: "📖" },
                  { name: "Notion", connected: false, icon: "🔗" },
                ].map((service) => (
                  <div key={service.name} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{service.icon}</span>
                      <span className="text-sm text-gray-300">{service.name}</span>
                    </div>
                    <div className={`w-2 h-2 rounded-full ${service.connected ? "bg-green-500" : "bg-gray-500"}`}></div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Account Info */}
            <Card className="bg-slate-900/50 border-slate-800 mt-6">
              <CardHeader>
                <CardTitle className="text-white text-lg">Account Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-xs text-gray-400 mb-1">Member Since</p>
                  <p className="text-sm text-gray-300">{profile.joinDate}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1">Account Status</p>
                  <p className="text-sm text-green-400 font-medium">Active</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1">Storage Used</p>
                  <p className="text-sm text-gray-300">2.5 GB / 10 GB</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
