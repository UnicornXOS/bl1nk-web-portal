import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AIAgentsSection from "@/components/AIAgentsSection";
import DocsSection from "@/components/DocsSection";
import Footer from "@/components/Footer";
import LoginCard from "@/components/LoginCard";
import { Dialog, DialogContent, DialogOverlay } from "@/components/ui/dialog";

// Mock AI Agents Data
const mockAgents = [
  {
    id: "ui-specialist",
    name: "UI Specialist",
    description: "Generates production-ready UI components from natural language descriptions.",
    capabilities: ["React", "Tailwind CSS", "shadcn/ui", "TypeScript"],
    status: "online" as const,
    action: "Generate Component",
    icon: "🎨",
  },
  {
    id: "flutter-dev",
    name: "Flutter Dev",
    description: "Creates cross-platform mobile app layouts and logic for iOS and Android.",
    capabilities: ["Flutter", "Dart", "Mobile UI", "State Management"],
    status: "online" as const,
    action: "Build Widget",
    icon: "📱",
  },
  {
    id: "clean-architect",
    name: "Clean Architect",
    description: "Designs and scaffolds Next.js projects with clean architecture patterns.",
    capabilities: ["Next.js", "TypeScript", "Clean Architecture", "API Design"],
    status: "training" as const,
    action: "Scaffold Project",
    icon: "🏗️",
  },
  {
    id: "backend-engineer",
    name: "Backend Engineer",
    description: "Builds robust backend services with proper error handling and documentation.",
    capabilities: ["Node.js", "Express", "PostgreSQL", "REST API"],
    status: "online" as const,
    action: "Create Service",
    icon: "⚙️",
  },
  {
    id: "data-scientist",
    name: "Data Scientist",
    description: "Analyzes data and creates visualizations with machine learning models.",
    capabilities: ["Python", "Pandas", "Matplotlib", "ML Models"],
    status: "online" as const,
    action: "Analyze Data",
    icon: "📊",
  },
  {
    id: "devops-engineer",
    name: "DevOps Engineer",
    description: "Sets up CI/CD pipelines and manages cloud infrastructure deployment.",
    capabilities: ["Docker", "Kubernetes", "GitHub Actions", "AWS"],
    status: "offline" as const,
    action: "Setup Pipeline",
    icon: "🚀",
  },
];

export default function LandingPage() {
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleGetStarted = () => {
    setShowLoginModal(true);
  };

  const handleLearnMore = () => {
    const docsSection = document.getElementById("docs");
    if (docsSection) {
      docsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleExplore = () => {
    // This would typically navigate to your GitBook documentation
    window.open("https://docs.bl1nk.dev", "_blank");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      {/* Main Content */}
      <main>
        <HeroSection onGetStarted={handleGetStarted} onLearnMore={handleLearnMore} />
        <AIAgentsSection agents={mockAgents} />
        <DocsSection onExplore={handleExplore} />
      </main>

      <Footer />

      {/* Login Modal */}
      <Dialog open={showLoginModal} onOpenChange={setShowLoginModal}>
        <DialogOverlay className="bg-black/50 backdrop-blur-sm" />
        <DialogContent className="border-0 bg-transparent p-0 shadow-none">
          <div className="flex justify-center items-center">
            <LoginCard onClose={() => setShowLoginModal(false)} />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
