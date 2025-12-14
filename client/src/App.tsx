import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { useAuth } from "@/_core/hooks/useAuth";
import LandingPage from "./pages/LandingPage";
import HomePage from "./pages/HomePage";
import ContentDetailPage from "./pages/ContentDetailPage";
import AIAssistant from "./components/AIAssistant";
import UserDashboard from "./components/UserDashboard";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";
import PricingPage from "./pages/PricingPage";
import DeveloperDocsPage from "./pages/DeveloperDocsPage";
import APIKeysPage from "./pages/APIKeysPage";
import AgentStore from "./pages/AgentStore";
import NotionDocuments from "./pages/NotionDocuments";

function Router() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path={"/"} component={isAuthenticated ? HomePage : LandingPage} />
      <Route path={"/home"} component={HomePage} />
      <Route path={"/content/:id"} component={ContentDetailPage} />
      <Route path={"/chat"} component={AIAssistant} />
      <Route path={"/profile"} component={ProfilePage} />
      <Route path={"/settings"} component={SettingsPage} />
      <Route path={"/pricing"} component={PricingPage} />
      <Route path={"/docs"} component={DeveloperDocsPage} />
      <Route path={"/api-keys"} component={APIKeysPage} />
      <Route path={"/agents"} component={AgentStore} />
      <Route path={"/docs-company"} component={NotionDocuments} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="dark"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
