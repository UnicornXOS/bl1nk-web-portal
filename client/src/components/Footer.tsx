import { Github, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black/80 border-t border-white/10 mt-20 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-12">
          {/* Company Info */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">bl1nk</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Agentic IDE that transforms natural language into transparent, user-controlled execution plans.
            </p>
          </div>

          {/* Documentation */}
          <div>
            <h4 className="text-white font-semibold mb-6 text-sm uppercase tracking-wide">Documentation</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li>
                <a href="#docs" className="hover:text-white transition-colors">
                  Getting Started
                </a>
              </li>
              <li>
                <a href="#docs" className="hover:text-white transition-colors">
                  API Reference
                </a>
              </li>
              <li>
                <a href="#docs" className="hover:text-white transition-colors">
                  Architecture
                </a>
              </li>
            </ul>
          </div>

          {/* Cookbook */}
          <div>
            <h4 className="text-white font-semibold mb-6 text-sm uppercase tracking-wide">Cookbook</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Code Examples
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Recipes
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Patterns
                </a>
              </li>
            </ul>
          </div>

          {/* Templates & Learn */}
          <div>
            <h4 className="text-white font-semibold mb-6 text-sm uppercase tracking-wide">Resources</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Templates
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Learn
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Solutions & Social */}
          <div>
            <h4 className="text-white font-semibold mb-6 text-sm uppercase tracking-wide">Solutions</h4>
            <ul className="space-y-3 text-sm text-gray-300 mb-6">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Enterprise
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Developers
                </a>
              </li>
            </ul>
            <div className="flex gap-4">
              <a
                href="https://github.com/billlzzz10/bl1nk"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <Github size={18} />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <Twitter size={18} />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-400">
            <p>&copy; {currentYear} bl1nk. All rights reserved.</p>
            <div className="flex gap-8 mt-6 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
