import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bell, Lock, Palette, Key, Database, Shield } from "lucide-react";
import { toast } from "sonner";

export default function SettingsPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("general");
  const [settings, setSettings] = useState({
    email: user?.email || "",
    name: user?.name || "",
    notifications: true,
    theme: "dark",
    apiKey: "",
  });

  const handleSave = async () => {
    try {
      // Simulate save operation
      await new Promise((resolve) => setTimeout(resolve, 500));
      toast.success("Settings saved successfully!");
    } catch (error) {
      toast.error("Failed to save settings");
    }
  };

  const settingsTabs = [
    { id: "general", label: "General", icon: <Palette size={20} /> },
    { id: "notifications", label: "Notifications", icon: <Bell size={20} /> },
    { id: "security", label: "Security", icon: <Shield size={20} /> },
    { id: "api", label: "API Keys", icon: <Key size={20} /> },
    { id: "storage", label: "Storage", icon: <Database size={20} /> },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-950">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Settings</h1>
          <p className="text-gray-400">Manage your account and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Settings Tabs */}
          <div className="lg:col-span-1">
            <Card className="bg-slate-900/50 border-slate-800">
              <CardContent className="p-0">
                <div className="space-y-2">
                  {settingsTabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                        activeTab === tab.id
                          ? "bg-cyan-500/20 text-cyan-400 border-l-2 border-cyan-500"
                          : "text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/10"
                      }`}
                    >
                      {tab.icon}
                      <span className="text-sm font-medium">{tab.label}</span>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Settings Content */}
          <div className="lg:col-span-3">
            {/* General Settings */}
            {activeTab === "general" && (
              <Card className="bg-slate-900/50 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-white">General Settings</CardTitle>
                  <CardDescription>Manage your basic account information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Full Name
                    </label>
                    <Input
                      value={settings.name}
                      onChange={(e) => setSettings({ ...settings, name: e.target.value })}
                      className="bg-slate-800 border-slate-700 text-white"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email
                    </label>
                    <Input
                      value={settings.email}
                      onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                      className="bg-slate-800 border-slate-700 text-white"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Theme
                    </label>
                    <select
                      value={settings.theme}
                      onChange={(e) => setSettings({ ...settings, theme: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500"
                    >
                      <option value="dark">Dark</option>
                      <option value="light">Light</option>
                      <option value="auto">Auto</option>
                    </select>
                  </div>
                  <Button
                    onClick={handleSave}
                    className="bg-cyan-600 hover:bg-cyan-700 text-white w-full"
                  >
                    Save Changes
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Notifications Settings */}
            {activeTab === "notifications" && (
              <Card className="bg-slate-900/50 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-white">Notification Preferences</CardTitle>
                  <CardDescription>Choose how you receive notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    {[
                      { id: "email", label: "Email Notifications", description: "Receive updates via email" },
                      { id: "push", label: "Push Notifications", description: "Get browser notifications" },
                      { id: "updates", label: "Product Updates", description: "New features and improvements" },
                      { id: "security", label: "Security Alerts", description: "Important security notifications" },
                    ].map((notif) => (
                      <div key={notif.id} className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
                        <div>
                          <p className="text-sm font-medium text-gray-300">{notif.label}</p>
                          <p className="text-xs text-gray-400">{notif.description}</p>
                        </div>
                        <input
                          type="checkbox"
                          defaultChecked
                          className="w-5 h-5 rounded cursor-pointer"
                        />
                      </div>
                    ))}
                  </div>
                  <Button
                    onClick={handleSave}
                    className="bg-cyan-600 hover:bg-cyan-700 text-white w-full"
                  >
                    Save Preferences
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Security Settings */}
            {activeTab === "security" && (
              <Card className="bg-slate-900/50 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-white">Security Settings</CardTitle>
                  <CardDescription>Manage your account security</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="p-4 bg-slate-800/50 rounded-lg">
                    <div className="flex items-center gap-3 mb-4">
                      <Lock size={20} className="text-cyan-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-300">Change Password</p>
                        <p className="text-xs text-gray-400">Update your password regularly</p>
                      </div>
                    </div>
                    <Button className="bg-cyan-600 hover:bg-cyan-700 text-white">
                      Change Password
                    </Button>
                  </div>
                  <div className="p-4 bg-slate-800/50 rounded-lg">
                    <div className="flex items-center gap-3 mb-4">
                      <Shield size={20} className="text-cyan-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-300">Two-Factor Authentication</p>
                        <p className="text-xs text-gray-400">Add an extra layer of security</p>
                      </div>
                    </div>
                    <Button className="bg-cyan-600 hover:bg-cyan-700 text-white">
                      Enable 2FA
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* API Keys Settings */}
            {activeTab === "api" && (
              <Card className="bg-slate-900/50 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-white">API Keys</CardTitle>
                  <CardDescription>Manage your API keys for integrations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      GitHub API Key
                    </label>
                    <Input
                      type="password"
                      value={settings.apiKey}
                      onChange={(e) => setSettings({ ...settings, apiKey: e.target.value })}
                      className="bg-slate-800 border-slate-700 text-white"
                      placeholder="Enter your GitHub API key"
                    />
                    <p className="text-xs text-gray-400 mt-2">
                      Your API keys are encrypted and never shared
                    </p>
                  </div>
                  <div className="space-y-3">
                    <Button className="w-full bg-cyan-600 hover:bg-cyan-700 text-white">
                      Add GitBook API Key
                    </Button>
                    <Button className="w-full bg-cyan-600 hover:bg-cyan-700 text-white">
                      Add Notion API Key
                    </Button>
                  </div>
                  <Button
                    onClick={handleSave}
                    className="bg-cyan-600 hover:bg-cyan-700 text-white w-full"
                  >
                    Save API Keys
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Storage Settings */}
            {activeTab === "storage" && (
              <Card className="bg-slate-900/50 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-white">Storage</CardTitle>
                  <CardDescription>Manage your storage usage</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium text-gray-300">Storage Used</span>
                        <span className="text-sm text-gray-400">2.5 GB / 10 GB</span>
                      </div>
                      <div className="w-full bg-slate-800 rounded-full h-2">
                        <div className="bg-cyan-500 h-2 rounded-full" style={{ width: "25%" }}></div>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 pt-4">
                      <div className="p-3 bg-slate-800/50 rounded-lg text-center">
                        <p className="text-2xl font-bold text-cyan-400">1.2 GB</p>
                        <p className="text-xs text-gray-400">Documents</p>
                      </div>
                      <div className="p-3 bg-slate-800/50 rounded-lg text-center">
                        <p className="text-2xl font-bold text-cyan-400">0.8 GB</p>
                        <p className="text-xs text-gray-400">Images</p>
                      </div>
                      <div className="p-3 bg-slate-800/50 rounded-lg text-center">
                        <p className="text-2xl font-bold text-cyan-400">0.5 GB</p>
                        <p className="text-xs text-gray-400">Other</p>
                      </div>
                    </div>
                  </div>
                  <Button className="w-full bg-cyan-600 hover:bg-cyan-700 text-white">
                    Upgrade Storage
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
