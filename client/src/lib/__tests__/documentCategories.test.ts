import { describe, it, expect } from "vitest";
import {
  detectDocumentCategory,
  getCategoryConfig,
  getAllCategories,
  CATEGORY_CONFIG,
} from "../documentCategories";

describe("documentCategories", () => {
  describe("detectDocumentCategory", () => {
    it("should detect dashboard category", () => {
      expect(detectDocumentCategory("Client Dashboard (Blue)")).toBe("dashboard");
      expect(detectDocumentCategory("Project Dashboard")).toBe("dashboard");
      expect(detectDocumentCategory("Status Dashboard")).toBe("dashboard");
    });

    it("should detect wiki category", () => {
      expect(detectDocumentCategory("Company Wiki Template")).toBe("wiki");
      expect(detectDocumentCategory("Knowledge Base")).toBe("wiki");
      expect(detectDocumentCategory("Documentation Wiki")).toBe("wiki");
    });

    it("should detect architecture category", () => {
      expect(detectDocumentCategory("Software architecture proposal")).toBe(
        "architecture"
      );
      expect(detectDocumentCategory("System Design")).toBe("architecture");
      expect(detectDocumentCategory("Backend Diagram")).toBe("architecture");
    });

    it("should detect project category", () => {
      expect(detectDocumentCategory("Project plan")).toBe("project");
      expect(detectDocumentCategory("Roadmap 2024")).toBe("project");
      expect(detectDocumentCategory("Timeline")).toBe("project");
    });

    it("should detect meeting category", () => {
      expect(detectDocumentCategory("Meeting Notes")).toBe("meeting");
      expect(detectDocumentCategory("Team Discussion")).toBe("meeting");
      expect(detectDocumentCategory("Agenda")).toBe("meeting");
    });

    it("should detect proposal category", () => {
      expect(detectDocumentCategory("New Feature Proposal")).toBe("proposal");
      expect(detectDocumentCategory("Suggestion Box")).toBe("proposal");
    });

    it("should detect template category", () => {
      expect(detectDocumentCategory("Design Showcase")).toBe("template");
      expect(detectDocumentCategory("Sample Template")).toBe("template");
    });

    it("should detect guide category", () => {
      expect(detectDocumentCategory("How to Get Started")).toBe("guide");
      expect(detectDocumentCategory("Tutorial")).toBe("guide");
    });

    it("should return 'other' for unknown categories", () => {
      expect(detectDocumentCategory("Random Document")).toBe("other");
      expect(detectDocumentCategory("Unknown Title")).toBe("other");
    });

    it("should be case-insensitive", () => {
      expect(detectDocumentCategory("CLIENT DASHBOARD")).toBe("dashboard");
      expect(detectDocumentCategory("company wiki")).toBe("wiki");
      expect(detectDocumentCategory("SOFTWARE ARCHITECTURE")).toBe("architecture");
    });
  });

  describe("getCategoryConfig", () => {
    it("should return config for valid category", () => {
      const config = getCategoryConfig("dashboard");
      expect(config).toBeDefined();
      expect(config.label).toBe("Dashboard");
      expect(config.icon).toBe("📊");
      expect(config.color).toBe("text-blue-400");
    });

    it("should have all required properties", () => {
      const config = getCategoryConfig("wiki");
      expect(config).toHaveProperty("label");
      expect(config).toHaveProperty("color");
      expect(config).toHaveProperty("bgColor");
      expect(config).toHaveProperty("borderColor");
      expect(config).toHaveProperty("icon");
      expect(config).toHaveProperty("keywords");
    });

    it("should have unique colors for each category", () => {
      const colors = Object.values(CATEGORY_CONFIG).map((config) => config.color);
      const uniqueColors = new Set(colors);
      expect(uniqueColors.size).toBe(colors.length);
    });
  });

  describe("getAllCategories", () => {
    it("should return array of categories", () => {
      const categories = getAllCategories();
      expect(Array.isArray(categories)).toBe(true);
      expect(categories.length).toBeGreaterThan(0);
    });

    it("should not include 'other' category", () => {
      const categories = getAllCategories();
      expect(categories).not.toContain("other");
    });

    it("should include all main categories", () => {
      const categories = getAllCategories();
      expect(categories).toContain("dashboard");
      expect(categories).toContain("wiki");
      expect(categories).toContain("architecture");
      expect(categories).toContain("project");
      expect(categories).toContain("meeting");
      expect(categories).toContain("proposal");
      expect(categories).toContain("template");
      expect(categories).toContain("guide");
    });
  });

  describe("CATEGORY_CONFIG", () => {
    it("should have config for all categories", () => {
      const categories = [
        "dashboard",
        "wiki",
        "architecture",
        "project",
        "meeting",
        "proposal",
        "template",
        "guide",
        "other",
      ];

      categories.forEach((category) => {
        expect(CATEGORY_CONFIG).toHaveProperty(category);
      });
    });

    it("should have valid Tailwind color classes", () => {
      Object.values(CATEGORY_CONFIG).forEach((config) => {
        expect(config.color).toMatch(/^text-\w+-\d+$/);
        expect(config.bgColor).toMatch(/^bg-\w+-\d+\/\d+$/);
        expect(config.borderColor).toMatch(/^border-\w+-\d+\/\d+$/);
      });
    });
  });
});
