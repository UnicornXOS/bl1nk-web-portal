import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Github, Mail } from "lucide-react";
import { getLoginUrl } from "@/const";

interface LoginCardProps {
  title?: string;
  description?: string;
  onClose?: () => void;
}

export default function LoginCard({
  title = "Sign in to your Account",
  description = "Access all bl1nk features and manage your workspace",
  onClose,
}: LoginCardProps) {
  const handleGoogleLogin = () => {
    // This would typically redirect to your OAuth provider
    window.location.href = getLoginUrl();
  };

  const handleGithubLogin = () => {
    // This would typically redirect to GitHub OAuth
    window.location.href = getLoginUrl();
  };

  return (
    <Card className="w-full max-w-md bg-slate-900 border-cyan-500/30 rounded-2xl shadow-2xl backdrop-blur-sm">
      <CardHeader className="space-y-2">
        <CardTitle className="text-2xl text-white">{title}</CardTitle>
        <CardDescription className="text-gray-400">{description}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Google Login */}
        <Button
          onClick={handleGoogleLogin}
          variant="outline"
          className="w-full border-cyan-500/30 text-white hover:bg-cyan-500/10 hover:border-cyan-500/50 transition-all"
        >
          <Mail className="mr-2 h-4 w-4" />
          Sign in with Google
        </Button>

        {/* GitHub Login */}
        <Button
          onClick={handleGithubLogin}
          variant="outline"
          className="w-full border-cyan-500/30 text-white hover:bg-cyan-500/10 hover:border-cyan-500/50 transition-all"
        >
          <Github className="mr-2 h-4 w-4" />
          Sign in with GitHub
        </Button>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-cyan-500/20" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-slate-900 text-gray-400">or</span>
          </div>
        </div>

        {/* Email Login (Future) */}
        <Button
          disabled
          variant="outline"
          className="w-full border-cyan-500/20 text-gray-500 cursor-not-allowed opacity-50"
        >
          Continue with Email (Coming Soon)
        </Button>

        {/* Terms */}
        <p className="text-xs text-gray-500 text-center">
          By signing in, you agree to our{" "}
          <a href="#" className="text-cyan-400 hover:underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-cyan-400 hover:underline">
            Privacy Policy
          </a>
        </p>
      </CardContent>
    </Card>
  );
}
