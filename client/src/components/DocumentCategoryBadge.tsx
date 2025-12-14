import {
  DocumentCategory,
  getCategoryConfig,
  detectDocumentCategory,
} from "@/lib/documentCategories";

interface DocumentCategoryBadgeProps {
  title: string;
  category?: DocumentCategory;
  size?: "sm" | "md" | "lg";
  showIcon?: boolean;
}

export function DocumentCategoryBadge({
  title,
  category,
  size = "md",
  showIcon = true,
}: DocumentCategoryBadgeProps) {
  // Auto-detect category if not provided
  const detectedCategory = category || detectDocumentCategory(title);
  const config = getCategoryConfig(detectedCategory);

  const sizeClasses = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1.5 text-sm",
    lg: "px-4 py-2 text-base",
  };

  const iconSizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  return (
    <div
      className={`
        inline-flex items-center gap-1.5 rounded-full
        ${config.bgColor} ${config.borderColor}
        border backdrop-blur-sm
        transition-all duration-200 hover:shadow-md
        ${sizeClasses[size]}
      `}
    >
      {showIcon && (
        <span className={`flex-shrink-0 ${iconSizeClasses[size]}`}>
          {config.icon}
        </span>
      )}
      <span className={`font-medium ${config.color}`}>
        {config.label}
      </span>
    </div>
  );
}
