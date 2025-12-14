import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

interface HeroSectionProps {
  onGetStarted?: () => void;
  onLearnMore?: () => void;
}

export default function HeroSection({ onGetStarted, onLearnMore }: HeroSectionProps) {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 relative overflow-hidden pt-20">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/5 mb-8">
          <Sparkles size={16} className="text-cyan-400" />
          <span className="text-sm text-cyan-400 font-medium">Introducing bl1nk</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
          Beyond Automation
        </h1>

        {/* Subheadline */}
        <p className="text-xl sm:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
          Welcome to the unified platform for intelligent applications. Transform natural language commands into transparent, user-controlled execution plans. Log in once, access everything.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Button
            onClick={onGetStarted}
            size="lg"
            className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white border-0 text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-cyan-500/50 transition-all"
          >
            Get Started
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button
            onClick={onLearnMore}
            variant="outline"
            size="lg"
            className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-500/50 text-lg px-8 py-6 rounded-xl transition-all"
          >
            Read the Docs
          </Button>
        </div>

        {/* Feature highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <div className="p-6 rounded-xl bg-slate-800/50 border border-cyan-500/20 backdrop-blur-sm hover:border-cyan-500/50 transition-all">
            <div className="text-3xl mb-3">🔍</div>
            <h3 className="text-white font-semibold mb-2">Total Transparency</h3>
            <p className="text-gray-400 text-sm">See every step before execution. Approve, edit, or reject with full control.</p>
          </div>

          <div className="p-6 rounded-xl bg-slate-800/50 border border-cyan-500/20 backdrop-blur-sm hover:border-cyan-500/50 transition-all">
            <div className="text-3xl mb-3">🎯</div>
            <h3 className="text-white font-semibold mb-2">User in Control</h3>
            <p className="text-gray-400 text-sm">You decide what happens. AI assists, but you always have the final say.</p>
          </div>

          <div className="p-6 rounded-xl bg-slate-800/50 border border-cyan-500/20 backdrop-blur-sm hover:border-cyan-500/50 transition-all">
            <div className="text-3xl mb-3">🔌</div>
            <h3 className="text-white font-semibold mb-2">Infinitely Extensible</h3>
            <p className="text-gray-400 text-sm">Connect any tool or service. Build custom agents and plugins with ease.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
