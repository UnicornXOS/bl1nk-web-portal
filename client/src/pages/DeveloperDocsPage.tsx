import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Code, BookOpen, Zap, Shield } from "lucide-react";

interface DocSection {
  title: string;
  description: string;
  icon: React.ReactNode;
  items: string[];
}

const docSections: DocSection[] = [
  {
    title: "Getting Started",
    description: "Learn the basics and set up your first AI Agent",
    icon: <Zap className="w-6 h-6" />,
    items: [
      "Installation & Setup",
      "Authentication",
      "Your First Agent",
      "Configuration",
    ],
  },
  {
    title: "API Reference",
    description: "Complete API documentation for all endpoints",
    icon: <Code className="w-6 h-6" />,
    items: [
      "REST API",
      "GraphQL API",
      "WebSocket API",
      "Rate Limiting",
    ],
  },
  {
    title: "Guides & Tutorials",
    description: "Step-by-step guides for common tasks",
    icon: <BookOpen className="w-6 h-6" />,
    items: [
      "Building Agents",
      "Integrations",
      "Webhooks",
      "Custom Plugins",
    ],
  },
  {
    title: "Security",
    description: "Security best practices and guidelines",
    icon: <Shield className="w-6 h-6" />,
    items: [
      "API Keys",
      "OAuth 2.0",
      "Data Encryption",
      "Compliance",
    ],
  },
];

const codeExamples = [
  {
    title: "Create an Agent",
    language: "typescript",
    code: `import { createAgent } from '@bl1nk/sdk';

const agent = await createAgent({
  name: 'My First Agent',
  description: 'A simple AI agent',
  model: 'gpt-4',
  tools: ['search', 'calculator'],
});

console.log(agent.id);`,
  },
  {
    title: "Call Agent API",
    language: "bash",
    code: `curl -X POST https://api.bl1nk.io/agents/invoke \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "agentId": "agent_123",
    "input": "What is 2 + 2?"
  }'`,
  },
  {
    title: "Setup Webhook",
    language: "typescript",
    code: `import { setupWebhook } from '@bl1nk/sdk';

await setupWebhook({
  url: 'https://your-domain.com/webhook',
  events: ['agent.executed', 'agent.failed'],
  secret: 'your_webhook_secret',
});`,
  },
];

export default function DeveloperDocsPage() {
  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
          Developer Documentation
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Everything you need to build with bl1nk. Comprehensive guides, API
          reference, and code examples.
        </p>

        {/* Quick Links */}
        <div className="flex flex-wrap gap-4">
          <Button className="bg-cyan-500 hover:bg-cyan-600 text-white">
            Get API Key
          </Button>
          <Button variant="outline" className="border-cyan-500/30">
            View GitHub
          </Button>
          <Button variant="outline" className="border-cyan-500/30">
            Join Community
          </Button>
        </div>
      </div>

      {/* Documentation Sections */}
      <div className="max-w-6xl mx-auto mb-16">
        <div className="grid md:grid-cols-2 gap-8">
          {docSections.map((section) => (
            <Card
              key={section.title}
              className="p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group hover:border-cyan-500/50"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-cyan-500/10 text-cyan-500 group-hover:bg-cyan-500/20 transition-colors">
                  {section.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {section.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {section.description}
                  </p>
                  <div className="space-y-2">
                    {section.items.map((item) => (
                      <div
                        key={item}
                        className="text-sm text-cyan-500 hover:text-cyan-400 cursor-pointer"
                      >
                        → {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Code Examples */}
      <div className="max-w-6xl mx-auto mb-16">
        <h2 className="text-3xl font-bold text-foreground mb-8">
          Code Examples
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {codeExamples.map((example) => (
            <Card
              key={example.title}
              className="p-6 bg-gradient-to-br from-slate-900/50 to-slate-800/50 border-slate-700/50"
            >
              <h3 className="text-lg font-semibold text-foreground mb-4">
                {example.title}
              </h3>
              <div className="bg-slate-950 rounded-lg p-4 overflow-x-auto">
                <pre className="text-sm text-cyan-400 font-mono">
                  <code>{example.code}</code>
                </pre>
              </div>
              <Button
                variant="ghost"
                className="w-full mt-4 text-cyan-500 hover:text-cyan-400 hover:bg-cyan-500/10"
              >
                Copy Code
              </Button>
            </Card>
          ))}
        </div>
      </div>

      {/* API Key Management Link */}
      <div className="max-w-4xl mx-auto">
        <Card className="p-8 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 border-cyan-500/20">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            API Key Management
          </h2>
          <p className="text-muted-foreground mb-6">
            Generate and manage your API keys securely. Each key can be scoped
            to specific resources and actions.
          </p>
          <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white">
            Go to API Keys
          </Button>
        </Card>
      </div>

      {/* Resources */}
      <div className="max-w-4xl mx-auto mt-16">
        <h2 className="text-3xl font-bold text-foreground mb-8">Resources</h2>

        <div className="space-y-4">
          {[
            {
              title: "API Reference",
              description: "Complete REST API documentation",
              link: "#",
            },
            {
              title: "SDK Documentation",
              description: "Official SDKs for Python, Node.js, and Go",
              link: "#",
            },
            {
              title: "Webhook Guide",
              description: "Learn how to set up and handle webhooks",
              link: "#",
            },
            {
              title: "Plugin Development",
              description: "Build custom plugins and extensions",
              link: "#",
            },
            {
              title: "Best Practices",
              description: "Security and performance guidelines",
              link: "#",
            },
            {
              title: "FAQ",
              description: "Common questions and answers",
              link: "#",
            },
          ].map((resource, index) => (
            <Card
              key={index}
              className="p-4 hover:bg-cyan-500/5 transition-colors cursor-pointer group"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-foreground group-hover:text-cyan-500 transition-colors">
                    {resource.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {resource.description}
                  </p>
                </div>
                <span className="text-cyan-500 group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Support */}
      <div className="max-w-4xl mx-auto mt-16 text-center">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          Need Help?
        </h2>
        <p className="text-muted-foreground mb-6">
          Our support team is here to help. Reach out via email, chat, or join
          our community Discord.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button variant="outline" className="border-cyan-500/30">
            Email Support
          </Button>
          <Button variant="outline" className="border-cyan-500/30">
            Live Chat
          </Button>
          <Button variant="outline" className="border-cyan-500/30">
            Join Discord
          </Button>
        </div>
      </div>
    </div>
  );
}
