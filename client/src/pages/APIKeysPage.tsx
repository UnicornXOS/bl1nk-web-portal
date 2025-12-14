import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Copy, Eye, EyeOff, Trash2, Plus, Check } from "lucide-react";
import { toast } from "sonner";

interface APIKey {
  id: string;
  name: string;
  key: string;
  maskedKey: string;
  createdAt: string;
  lastUsed?: string;
  scopes: string[];
}

export default function APIKeysPage() {
  const [apiKeys, setApiKeys] = useState<APIKey[]>([
    {
      id: "key_1",
      name: "Production API Key",
      key: "bl1nk_prod_abc123def456ghi789jkl012mno345pqr",
      maskedKey: "bl1nk_prod_abc123...pqr",
      createdAt: "2024-01-15",
      lastUsed: "2 hours ago",
      scopes: ["agents:read", "agents:write", "webhooks:manage"],
    },
    {
      id: "key_2",
      name: "Development API Key",
      key: "bl1nk_dev_xyz789uvw456rst123opq890abc567def",
      maskedKey: "bl1nk_dev_xyz789...def",
      createdAt: "2024-01-10",
      lastUsed: "30 minutes ago",
      scopes: ["agents:read", "agents:write"],
    },
  ]);

  const [visibleKeys, setVisibleKeys] = useState<Set<string>>(new Set());
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newKeyName, setNewKeyName] = useState("");
  const [selectedScopes, setSelectedScopes] = useState<Set<string>>(new Set());

  const availableScopes = [
    "agents:read",
    "agents:write",
    "agents:delete",
    "webhooks:read",
    "webhooks:manage",
    "workspaces:read",
    "workspaces:write",
  ];

  const toggleKeyVisibility = (keyId: string) => {
    const newVisible = new Set(visibleKeys);
    if (newVisible.has(keyId)) {
      newVisible.delete(keyId);
    } else {
      newVisible.add(keyId);
    }
    setVisibleKeys(newVisible);
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard`);
  };

  const deleteKey = (keyId: string) => {
    setApiKeys(apiKeys.filter((k) => k.id !== keyId));
    toast.success("API key deleted");
  };

  const createNewKey = () => {
    if (!newKeyName.trim()) {
      toast.error("Please enter a key name");
      return;
    }

    if (selectedScopes.size === 0) {
      toast.error("Please select at least one scope");
      return;
    }

    const newKey: APIKey = {
      id: `key_${Date.now()}`,
      name: newKeyName,
      key: `bl1nk_${Math.random().toString(36).substr(2, 9)}_${Math.random().toString(36).substr(2, 9)}`,
      maskedKey: `bl1nk_...${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString().split("T")[0],
      scopes: Array.from(selectedScopes),
    };

    setApiKeys([newKey, ...apiKeys]);
    setNewKeyName("");
    setSelectedScopes(new Set());
    setShowCreateForm(false);
    toast.success("API key created successfully");
  };

  const toggleScope = (scope: string) => {
    const newScopes = new Set(selectedScopes);
    if (newScopes.has(scope)) {
      newScopes.delete(scope);
    } else {
      newScopes.add(scope);
    }
    setSelectedScopes(newScopes);
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-4xl font-bold text-foreground">API Keys</h1>
            <p className="text-muted-foreground mt-2">
              Manage your API keys and access tokens
            </p>
          </div>
          <Button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create New Key
          </Button>
        </div>
      </div>

      {/* Create New Key Form */}
      {showCreateForm && (
        <Card className="max-w-6xl mx-auto mb-8 p-6 border-cyan-500/30 bg-cyan-500/5">
          <h2 className="text-xl font-semibold text-foreground mb-6">
            Create New API Key
          </h2>

          <div className="space-y-6">
            {/* Key Name */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Key Name
              </label>
              <input
                type="text"
                value={newKeyName}
                onChange={(e) => setNewKeyName(e.target.value)}
                placeholder="e.g., Production API Key"
                className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-cyan-500"
              />
            </div>

            {/* Scopes */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-3">
                Permissions (Scopes)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {availableScopes.map((scope) => (
                  <label
                    key={scope}
                    className="flex items-center gap-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-cyan-500/5 transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={selectedScopes.has(scope)}
                      onChange={() => toggleScope(scope)}
                      className="w-4 h-4 accent-cyan-500"
                    />
                    <span className="text-foreground font-mono text-sm">
                      {scope}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <Button
                onClick={createNewKey}
                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white"
              >
                Create Key
              </Button>
              <Button
                onClick={() => setShowCreateForm(false)}
                variant="outline"
                className="border-border"
              >
                Cancel
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* API Keys List */}
      <div className="max-w-6xl mx-auto space-y-4">
        {apiKeys.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-muted-foreground mb-4">
              No API keys yet. Create one to get started.
            </p>
            <Button
              onClick={() => setShowCreateForm(true)}
              className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white"
            >
              Create Your First Key
            </Button>
          </Card>
        ) : (
          apiKeys.map((apiKey) => (
            <Card
              key={apiKey.id}
              className="p-6 hover:shadow-lg transition-all duration-300"
            >
              <div className="grid md:grid-cols-3 gap-6">
                {/* Key Info */}
                <div>
                  <h3 className="font-semibold text-foreground mb-1">
                    {apiKey.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Created: {apiKey.createdAt}
                  </p>
                  {apiKey.lastUsed && (
                    <p className="text-sm text-muted-foreground">
                      Last used: {apiKey.lastUsed}
                    </p>
                  )}
                </div>

                {/* Key Display */}
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-background border border-border rounded-lg px-3 py-2 font-mono text-sm">
                    {visibleKeys.has(apiKey.id) ? apiKey.key : apiKey.maskedKey}
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => toggleKeyVisibility(apiKey.id)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {visibleKeys.has(apiKey.id) ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(apiKey.key, "API Key")}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>

                {/* Scopes */}
                <div>
                  <p className="text-sm font-medium text-foreground mb-2">
                    Permissions:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {apiKey.scopes.map((scope) => (
                      <span
                        key={scope}
                        className="inline-flex items-center gap-1 px-2 py-1 bg-cyan-500/10 text-cyan-500 rounded text-xs font-mono"
                      >
                        <Check className="w-3 h-3" />
                        {scope}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Delete Button */}
                <div className="flex items-center justify-end md:col-span-3">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => deleteKey(apiKey.id)}
                    className="text-red-500 hover:text-red-600 hover:bg-red-500/10"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Security Notice */}
      <div className="max-w-6xl mx-auto mt-12">
        <Card className="p-6 border-amber-500/20 bg-amber-500/5">
          <h3 className="font-semibold text-amber-600 mb-2">Security Notice</h3>
          <ul className="text-sm text-amber-700 space-y-2">
            <li>
              • Never share your API keys with anyone or commit them to version
              control
            </li>
            <li>
              • Rotate your keys regularly and delete unused keys immediately
            </li>
            <li>
              • Use scoped keys with minimal permissions required for your use
              case
            </li>
            <li>
              • Monitor your API key usage and set up alerts for suspicious
              activity
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
