import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, BookOpen, Code, Zap } from "lucide-react";

interface DocsSectionProps {
  onExplore?: () => void;
}

export default function DocsSection({ onExplore }: DocsSectionProps) {
  return (
    <section id="docs" className="py-20 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Comprehensive Documentation</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Everything you need to get started, from high-level concepts to detailed API references. Our documentation is a living resource, continuously updated.
          </p>
        </div>

        {/* Documentation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Getting Started */}
          <Card className="bg-slate-800/50 border-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300 rounded-2xl">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <Zap size={24} className="text-cyan-400" />
                <CardTitle className="text-white">Getting Started</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-400 mb-4">
                Quick setup guide to get bl1nk running in minutes. Learn the basics and create your first automation.
              </CardDescription>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-center gap-2">
                  <span className="text-cyan-400">→</span> Installation
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-cyan-400">→</span> First Steps
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-cyan-400">→</span> Configuration
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* API Reference */}
          <Card className="bg-slate-800/50 border-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300 rounded-2xl">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <Code size={24} className="text-cyan-400" />
                <CardTitle className="text-white">API Reference</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-400 mb-4">
                Complete API documentation with examples. Learn how to integrate bl1nk with your applications.
              </CardDescription>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-center gap-2">
                  <span className="text-cyan-400">→</span> REST API
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-cyan-400">→</span> WebSocket
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-cyan-400">→</span> Webhooks
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Guides & Tutorials */}
          <Card className="bg-slate-800/50 border-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300 rounded-2xl">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <BookOpen size={24} className="text-cyan-400" />
                <CardTitle className="text-white">Guides & Tutorials</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-400 mb-4">
                In-depth guides and tutorials for advanced use cases. Build custom agents and plugins.
              </CardDescription>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-center gap-2">
                  <span className="text-cyan-400">→</span> Building Agents
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-cyan-400">→</span> Creating Plugins
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-cyan-400">→</span> Best Practices
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button
            onClick={onExplore}
            size="lg"
            className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white border-0 text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-cyan-500/50 transition-all gap-2"
          >
            Explore GitBook Docs
            <ArrowRight size={20} />
          </Button>
        </div>

        {/* Info */}
        <div className="mt-12 p-6 rounded-2xl bg-slate-800/50 border border-cyan-500/20 backdrop-blur-sm">
          <p className="text-gray-400 text-center">
            📚 <span className="text-white font-semibold">Documentation Status:</span> Continuously updated with the latest features and best practices.
          </p>
        </div>
      </div>
    </section>
  );
}
