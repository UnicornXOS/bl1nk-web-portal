import { APP_LOGO, APP_TITLE } from "@/const";

interface BrandLogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  className?: string;
}

export default function BrandLogo({ size = "md", showText = true, className = "" }: BrandLogoProps) {
  const sizeMap = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  };

  const textSizeMap = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Brand Logo */}
      <div className={`${sizeMap[size]} rounded-lg bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-500 flex items-center justify-center shadow-lg`}>
        <img
          src={APP_LOGO}
          alt={APP_TITLE}
          className="w-full h-full object-contain p-1"
        />
      </div>

      {/* Brand Text */}
      {showText && (
        <div className="flex flex-col">
          <span className={`font-bold text-foreground ${textSizeMap[size]}`}>
            {APP_TITLE}
          </span>
          <span className="text-xs text-muted-foreground">AI Portal</span>
        </div>
      )}
    </div>
  );
}
