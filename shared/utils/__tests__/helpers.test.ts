import { describe, it, expect } from "vitest";

// Helper functions for testing
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function parseJSON<T>(json: string, fallback: T): T {
  try {
    return JSON.parse(json) as T;
  } catch {
    return fallback;
  }
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function capitalizeFirstLetter(text: string): string {
  if (text.length === 0) return text;
  return text.charAt(0).toUpperCase() + text.slice(1);
}

// Tests
describe("Helper Functions", () => {
  describe("truncateText", () => {
    it("should truncate text when exceeding max length", () => {
      const text = "This is a long text that should be truncated";
      const result = truncateText(text, 20);
      expect(result).toEqual("This is a long text ...");
      expect(result.length).toEqual(23);
    });

    it("should not truncate text when under max length", () => {
      const text = "Short text";
      const result = truncateText(text, 20);
      expect(result).toEqual("Short text");
    });

    it("should handle empty string", () => {
      const result = truncateText("", 10);
      expect(result).toEqual("");
    });

    it("should handle exact length", () => {
      const text = "Exact";
      const result = truncateText(text, 5);
      expect(result).toEqual("Exact");
    });
  });

  describe("slugify", () => {
    it("should convert text to slug format", () => {
      const text = "Hello World";
      const result = slugify(text);
      expect(result).toEqual("hello-world");
    });

    it("should remove special characters", () => {
      const text = "Hello! @World #2025";
      const result = slugify(text);
      expect(result).toEqual("hello-world-2025");
    });

    it("should handle multiple spaces", () => {
      const text = "Hello   World   Test";
      const result = slugify(text);
      expect(result).toEqual("hello-world-test");
    });

    it("should remove leading and trailing hyphens", () => {
      const text = "---hello world---";
      const result = slugify(text);
      expect(result).toEqual("hello-world");
    });

    it("should handle underscores", () => {
      const text = "hello_world_test";
      const result = slugify(text);
      expect(result).toEqual("hello-world-test");
    });
  });

  describe("parseJSON", () => {
    it("should parse valid JSON object", () => {
      const json = '{"name":"test","value":123}';
      const result = parseJSON(json, { name: "", value: 0 });
      expect(result).toEqual({ name: "test", value: 123 });
    });

    it("should return fallback for invalid JSON", () => {
      const json = "invalid json";
      const fallback = { name: "default", value: 0 };
      const result = parseJSON(json, fallback);
      expect(result).toEqual(fallback);
    });

    it("should handle empty string", () => {
      const fallback = { name: "default" };
      const result = parseJSON("", fallback);
      expect(result).toEqual(fallback);
    });

    it("should parse JSON arrays", () => {
      const json = '[{"id":1},{"id":2}]';
      const result = parseJSON(json, []);
      expect(result).toEqual([{ id: 1 }, { id: 2 }]);
    });

    it("should parse JSON primitives", () => {
      expect(parseJSON("123", 0)).toEqual(123);
      expect(parseJSON('"hello"', "")).toEqual("hello");
      expect(parseJSON("true", false)).toEqual(true);
    });
  });

  describe("validateEmail", () => {
    it("should validate correct email", () => {
      expect(validateEmail("test@example.com")).toBe(true);
      expect(validateEmail("user.name@domain.co.uk")).toBe(true);
    });

    it("should reject invalid email", () => {
      expect(validateEmail("invalid.email")).toBe(false);
      expect(validateEmail("@example.com")).toBe(false);
      expect(validateEmail("user@")).toBe(false);
      expect(validateEmail("user @example.com")).toBe(false);
    });

    it("should handle empty string", () => {
      expect(validateEmail("")).toBe(false);
    });
  });

  describe("capitalizeFirstLetter", () => {
    it("should capitalize first letter", () => {
      expect(capitalizeFirstLetter("hello")).toEqual("Hello");
      expect(capitalizeFirstLetter("world")).toEqual("World");
    });

    it("should handle already capitalized text", () => {
      expect(capitalizeFirstLetter("Hello")).toEqual("Hello");
    });

    it("should handle empty string", () => {
      expect(capitalizeFirstLetter("")).toEqual("");
    });

    it("should handle single character", () => {
      expect(capitalizeFirstLetter("a")).toEqual("A");
    });
  });
});
