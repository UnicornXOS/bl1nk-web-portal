import { describe, it, expect } from 'vitest';
import {
  ContentCardSchema,
  CreateContentCardSchema,
  ContentCardFilterSchema,
  BatchContentCardsSchema,
} from '../contentCard.schema';

describe('ContentCard Schemas', () => {
  describe('ContentCardSchema', () => {
    it('validates a valid content card', () => {
      const validCard = {
        id: 'card-1',
        title: 'My Repository',
        description: 'A great project',
        source: 'github' as const,
        url: 'https://github.com/user/repo',
        tags: ['typescript', 'react'],
        featured: true,
      };

      const result = ContentCardSchema.safeParse(validCard);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.id).toBe('card-1');
      }
    });

    it('rejects card without required fields', () => {
      const invalidCard = {
        id: 'card-1',
        title: 'My Repository',
        // missing description, source, url
      };

      const result = ContentCardSchema.safeParse(invalidCard);
      expect(result.success).toBe(false);
    });

    it('rejects card with empty title', () => {
      const invalidCard = {
        id: 'card-1',
        title: '',
        description: 'A great project',
        source: 'github' as const,
        url: 'https://github.com/user/repo',
      };

      const result = ContentCardSchema.safeParse(invalidCard);
      expect(result.success).toBe(false);
    });

    it('rejects card with invalid URL', () => {
      const invalidCard = {
        id: 'card-1',
        title: 'My Repository',
        description: 'A great project',
        source: 'github' as const,
        url: 'not-a-valid-url',
      };

      const result = ContentCardSchema.safeParse(invalidCard);
      expect(result.success).toBe(false);
    });

    it('rejects card with more than 10 tags', () => {
      const invalidCard = {
        id: 'card-1',
        title: 'My Repository',
        description: 'A great project',
        source: 'github' as const,
        url: 'https://github.com/user/repo',
        tags: ['tag1', 'tag2', 'tag3', 'tag4', 'tag5', 'tag6', 'tag7', 'tag8', 'tag9', 'tag10', 'tag11'],
      };

      const result = ContentCardSchema.safeParse(invalidCard);
      expect(result.success).toBe(false);
    });

    it('validates card with default values', () => {
      const minimalCard = {
        id: 'card-1',
        title: 'My Repository',
        description: 'A great project',
        source: 'github' as const,
        url: 'https://github.com/user/repo',
      };

      const result = ContentCardSchema.safeParse(minimalCard);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.tags).toEqual([]);
        expect(result.data.featured).toBe(false);
      }
    });
  });

  describe('CreateContentCardSchema', () => {
    it('validates card creation without ID', () => {
      const newCard = {
        title: 'My Repository',
        description: 'A great project',
        source: 'github' as const,
        url: 'https://github.com/user/repo',
      };

      const result = CreateContentCardSchema.safeParse(newCard);
      expect(result.success).toBe(true);
    });

    it('rejects card creation with ID', () => {
      const newCard = {
        id: 'card-1',
        title: 'My Repository',
        description: 'A great project',
        source: 'github' as const,
        url: 'https://github.com/user/repo',
      };

      const result = CreateContentCardSchema.safeParse(newCard);
      expect(result.success).toBe(false);
    });
  });

  describe('ContentCardFilterSchema', () => {
    it('validates filter with all fields', () => {
      const filter = {
        source: 'github' as const,
        tags: ['typescript'],
        searchQuery: 'react',
        featured: true,
      };

      const result = ContentCardFilterSchema.safeParse(filter);
      expect(result.success).toBe(true);
    });

    it('validates empty filter', () => {
      const filter = {};

      const result = ContentCardFilterSchema.safeParse(filter);
      expect(result.success).toBe(true);
    });

    it('validates filter with partial fields', () => {
      const filter = {
        source: 'gitbook' as const,
        featured: false,
      };

      const result = ContentCardFilterSchema.safeParse(filter);
      expect(result.success).toBe(true);
    });
  });

  describe('BatchContentCardsSchema', () => {
    it('validates batch create operation', () => {
      const batch = {
        cards: [
          {
            id: 'card-1',
            title: 'Repo 1',
            description: 'First repo',
            source: 'github' as const,
            url: 'https://github.com/user/repo1',
          },
          {
            id: 'card-2',
            title: 'Repo 2',
            description: 'Second repo',
            source: 'github' as const,
            url: 'https://github.com/user/repo2',
          },
        ],
        action: 'create' as const,
      };

      const result = BatchContentCardsSchema.safeParse(batch);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.cards).toHaveLength(2);
      }
    });

    it('validates batch delete operation', () => {
      const batch = {
        cards: [
          {
            id: 'card-1',
            title: 'Repo 1',
            description: 'First repo',
            source: 'github' as const,
            url: 'https://github.com/user/repo1',
          },
        ],
        action: 'delete' as const,
      };

      const result = BatchContentCardsSchema.safeParse(batch);
      expect(result.success).toBe(true);
    });

    it('rejects batch with invalid action', () => {
      const batch = {
        cards: [],
        action: 'invalid' as any,
      };

      const result = BatchContentCardsSchema.safeParse(batch);
      expect(result.success).toBe(false);
    });
  });
});
