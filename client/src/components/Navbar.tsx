import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Settings, LogOut, User } from "lucide-react";
import { getLoginUrl } from "@/const";
import { useAuth } from "@/_core/hooks/useAuth";
import { useLocation } from "wouter";
import BrandLogo from "./BrandLogo";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const { isAuthenticated, logout, user } = useAuth();
  const [, navigate] = useLocation();

  // Close profile dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    }

    if (isProfileOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isProfileOpen]);

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-black/80 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div
            className="cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => handleNavigation("/")}
          >
            <BrandLogo size="sm" showText={true} />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => handleNavigation("/")}
              className="text-gray-200 hover:text-white transition-colors text-sm font-medium"
            >
              Product
            </button>

            <button
              onClick={() => handleNavigation("/pricing")}
              className="text-gray-200 hover:text-white transition-colors text-sm font-medium"
            >
              Get Started
            </button>
            <button
              onClick={() => handleNavigation("/docs")}
              className="text-gray-200 hover:text-white transition-colors text-sm font-medium"
            >
              Doc
            </button>
          </div>

          {/* Auth Section */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-cyan-500/10 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center">
                    <User size={16} className="text-cyan-400" />
                  </div>
                  <span className="text-gray-300 text-sm font-medium">{user?.name}</span>
                </button>

                {/* Profile Dropdown */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-slate-800 border border-cyan-500/30 rounded-lg shadow-lg animate-slide-up-fade">
                    <div className="p-4 border-b border-cyan-500/20">
                      <p className="text-gray-300 text-sm font-medium">{user?.name}</p>
                      <p className="text-gray-400 text-xs">{user?.email}</p>
                    </div>
                    <button
                      onClick={() => {
                        handleNavigation("/profile");
                        setIsProfileOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-gray-300 hover:text-cyan-400 hover:bg-cyan-500/10 transition-colors flex items-center gap-2 text-sm"
                    >
                      <User size={16} />
                      Profile
                    </button>
                    <button
                      onClick={() => {
                        handleNavigation("/settings");
                        setIsProfileOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-gray-300 hover:text-cyan-400 hover:bg-cyan-500/10 transition-colors flex items-center gap-2 text-sm"
                    >
                      <Settings size={16} />
                      Settings
                    </button>
                    <button
                      onClick={() => {
                        handleNavigation("/api-keys");
                        setIsProfileOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-gray-300 hover:text-cyan-400 hover:bg-cyan-500/10 transition-colors flex items-center gap-2 text-sm"
                    >
                      <Settings size={16} />
                      API Keys
                    </button>
                    <button
                      onClick={() => {
                        logout();
                        setIsProfileOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-red-300 hover:text-red-200 hover:bg-red-500/10 transition-colors flex items-center gap-2 text-sm border-t border-cyan-500/20"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Button
                onClick={() => (window.location.href = getLoginUrl())}
                size="sm"
                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white border-0"
              >
                Login
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-cyan-400 transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t border-cyan-500/20 animate-slide-up-fade">
            <button
              onClick={() => handleNavigation("/")}
              className="block w-full text-left px-4 py-2 text-gray-300 hover:text-cyan-400 hover:bg-cyan-500/10 transition-colors text-sm"
            >
              Home
            </button>
            <button
              onClick={() => handleNavigation("/chat")}
              className="block w-full text-left px-4 py-2 text-gray-300 hover:text-cyan-400 hover:bg-cyan-500/10 transition-colors text-sm"
            >
              AI Agents
            </button>
            <button
              onClick={() => handleNavigation("/home")}
              className="block w-full text-left px-4 py-2 text-gray-300 hover:text-cyan-400 hover:bg-cyan-500/10 transition-colors text-sm"
            >
              Dashboard
            </button>
            <div className="px-4 py-2 border-t border-cyan-500/20 mt-2">
              {isAuthenticated ? (
                <>
                  <p className="text-gray-300 text-sm mb-3 font-medium">{user?.name}</p>
                  <button
                    onClick={() => handleNavigation("/profile")}
                    className="block w-full text-left px-3 py-2 text-gray-300 hover:text-cyan-400 hover:bg-cyan-500/10 transition-colors text-sm rounded mb-2 flex items-center gap-2"
                  >
                    <User size={16} />
                    Profile
                  </button>
                  <button
                    onClick={() => handleNavigation("/settings")}
                    className="block w-full text-left px-3 py-2 text-gray-300 hover:text-cyan-400 hover:bg-cyan-500/10 transition-colors text-sm rounded mb-2 flex items-center gap-2"
                  >
                    <Settings size={16} />
                    Settings
                  </button>
                  <Button
                    onClick={logout}
                    variant="outline"
                    size="sm"
                    className="w-full border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10"
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <Button
                  onClick={() => (window.location.href = getLoginUrl())}
                  size="sm"
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white border-0"
                >
                  Login
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
