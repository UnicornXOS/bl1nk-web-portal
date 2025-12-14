import { describe, it, expect } from "vitest";
import {
  UserFavoriteSchema,
  CreateUserFavoriteSchema,
  GetUserFavoritesSchema,
  DeleteUserFavoriteSchema,
} from "../../../shared/schemas/userFavorite.schema";

describe("Favorites Router - Schema Validation", () => {
  describe("UserFavorite Schema", () => {
    it("should validate user favorite schema", () => {
      const validFavorite = {
        userId: 1,
        contentId: "repo-123",
        contentType: "github" as const,
        contentTitle: "Test Repository",
        contentUrl: "https://github.com/user/repo",
        contentDescription: "A test repository",
        tags: ["typescript", "testing"],
      };

      const result = UserFavoriteSchema.safeParse(validFavorite);
      expect(result.success).toBe(true);
    });

    it("should reject invalid content type", () => {
      const invalidFavorite = {
        userId: 1,
        contentId: "repo-123",
        contentType: "invalid",
        contentTitle: "Test Repository",
        contentUrl: "https://github.com/user/repo",
      };

      const result = UserFavoriteSchema.safeParse(invalidFavorite);
      expect(result.success).toBe(false);
    });

    it("should require valid URL format", () => {
      const invalidFavorite = {
        userId: 1,
        contentId: "repo-123",
        contentType: "github" as const,
        contentTitle: "Test Repository",
        contentUrl: "not-a-url",
      };

      const result = UserFavoriteSchema.safeParse(invalidFavorite);
      expect(result.success).toBe(false);
    });
  });

  describe("CreateUserFavorite Schema", () => {
    it("should validate create favorite input", () => {
      const createInput = {
        contentId: "repo-123",
        contentType: "github" as const,
        contentTitle: "Test Repository",
        contentUrl: "https://github.com/user/repo",
      };

      const result = CreateUserFavoriteSchema.safeParse(createInput);
      expect(result.success).toBe(true);
    });

    it("should accept optional fields", () => {
      const createInput = {
        contentId: "repo-123",
        contentType: "github" as const,
        contentTitle: "Test Repository",
        contentUrl: "https://github.com/user/repo",
        contentDescription: "Optional description",
        contentImage: "https://example.com/image.jpg",
        tags: ["test"],
      };

      const result = CreateUserFavoriteSchema.safeParse(createInput);
      expect(result.success).toBe(true);
    });
  });

  describe("GetUserFavorites Schema", () => {
    it("should validate get favorites input", () => {
      const getInput = {
        userId: 1,
        limit: 50,
        offset: 0,
      };

      const result = GetUserFavoritesSchema.safeParse(getInput);
      expect(result.success).toBe(true);
    });

    it("should have default values", () => {
      const getInput = {
        userId: 1,
      };

      const result = GetUserFavoritesSchema.safeParse(getInput);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.limit).toBe(50);
        expect(result.data.offset).toBe(0);
      }
    });

    it("should validate limit constraint", () => {
      const invalidInput = {
        userId: 1,
        limit: 1000, // exceeds max of 100
      };

      const result = GetUserFavoritesSchema.safeParse(invalidInput);
      expect(result.success).toBe(false);
    });

    it("should validate offset constraint", () => {
      const invalidInput = {
        userId: 1,
        offset: -1, // negative offset
      };

      const result = GetUserFavoritesSchema.safeParse(invalidInput);
      expect(result.success).toBe(false);
    });

    it("should accept optional contentType filter", () => {
      const getInput = {
        userId: 1,
        contentType: "github" as const,
      };

      const result = GetUserFavoritesSchema.safeParse(getInput);
      expect(result.success).toBe(true);
    });
  });

  describe("DeleteUserFavorite Schema", () => {
    it("should validate delete input", () => {
      const deleteInput = {
        userId: 1,
        contentId: "repo-123",
      };

      const result = DeleteUserFavoriteSchema.safeParse(deleteInput);
      expect(result.success).toBe(true);
    });

    it("should require both userId and contentId", () => {
      const incompleteInput = {
        userId: 1,
      };

      const result = DeleteUserFavoriteSchema.safeParse(incompleteInput);
      expect(result.success).toBe(false);
    });

    it("should reject missing userId", () => {
      const incompleteInput = {
        contentId: "repo-123",
      };

      const result = DeleteUserFavoriteSchema.safeParse(incompleteInput);
      expect(result.success).toBe(false);
    });
  });
});
