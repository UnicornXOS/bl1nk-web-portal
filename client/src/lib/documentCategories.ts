/**
 * Document Category Detection and Styling
 * Automatically categorizes Craft documents based on title and content
 */

export type DocumentCategory = 
  | "dashboard"
  | "wiki"
  | "architecture"
  | "project"
  | "meeting"
  | "proposal"
  | "template"
  | "guide"
  | "other";

export interface CategoryConfig {
  label: string;
  color: string;
  bgColor: string;
  borderColor: string;
  icon: string;
  keywords: string[];
}

export const CATEGORY_CONFIG: Record<DocumentCategory, CategoryConfig> = {
  dashboard: {
    label: "Dashboard",
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/30",
    icon: "📊",
    keywords: ["dashboard", "client dashboard", "status", "overview"],
  },
  wiki: {
    label: "Wiki",
    color: "text-purple-400",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/30",
    icon: "📚",
    keywords: ["wiki", "knowledge", "company wiki", "documentation"],
  },
  architecture: {
    label: "Architecture",
    color: "text-orange-400",
    bgColor: "bg-orange-500/10",
    borderColor: "border-orange-500/30",
    icon: "🏗️",
    keywords: ["architecture", "system", "backend", "diagram"],
  },
  project: {
    label: "Project",
    color: "text-green-400",
    bgColor: "bg-green-500/10",
    borderColor: "border-green-500/30",
    icon: "📋",
    keywords: ["project", "plan", "roadmap", "timeline"],
  },
  meeting: {
    label: "Meeting",
    color: "text-pink-400",
    bgColor: "bg-pink-500/10",
    borderColor: "border-pink-500/30",
    icon: "💬",
    keywords: ["meeting", "notes", "agenda", "discussion"],
  },
  proposal: {
    label: "Proposal",
    color: "text-cyan-400",
    bgColor: "bg-cyan-500/10",
    borderColor: "border-cyan-500/30",
    icon: "💡",
    keywords: ["proposal", "suggestion", "idea", "request"],
  },
  template: {
    label: "Template",
    color: "text-indigo-400",
    bgColor: "bg-indigo-500/10",
    borderColor: "border-indigo-500/30",
    icon: "🎨",
    keywords: ["template", "showcase", "sample"],
  },
  guide: {
    label: "Guide",
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/30",
    icon: "📖",
    keywords: ["guide", "how to", "tutorial", "instructions"],
  },
  other: {
    label: "Document",
    color: "text-gray-400",
    bgColor: "bg-gray-500/10",
    borderColor: "border-gray-500/30",
    icon: "📄",
    keywords: [],
  },
};

/**
 * Detect document category based on title
 * @param title - Document title
 * @returns Document category
 */
export function detectDocumentCategory(title: string): DocumentCategory {
  const lowerTitle = title.toLowerCase();

  // Check each category's keywords
  for (const [category, config] of Object.entries(CATEGORY_CONFIG)) {
    if (category === "other") continue; // Skip default category

    for (const keyword of config.keywords) {
      if (lowerTitle.includes(keyword.toLowerCase())) {
        return category as DocumentCategory;
      }
    }
  }

  // Default to 'other' if no match found
  return "other";
}

/**
 * Get category configuration
 * @param category - Document category
 * @returns Category configuration with colors and label
 */
export function getCategoryConfig(category: DocumentCategory): CategoryConfig {
  return CATEGORY_CONFIG[category];
}

/**
 * Get all available categories
 * @returns Array of all document categories
 */
export function getAllCategories(): DocumentCategory[] {
  return Object.keys(CATEGORY_CONFIG).filter(
    (cat) => cat !== "other"
  ) as DocumentCategory[];
}
