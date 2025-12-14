# Zod Schema Documentation

This document describes all Zod schemas used in the bl1nk Web Portal application for runtime type validation and data integrity.

## Overview

Zod schemas are used to validate data at both client and server boundaries, ensuring type safety and data consistency throughout the application. All schemas are located in the `shared/schemas/` directory and can be imported from `shared/schemas/index.ts`.

---

## Content Card Schemas

### ContentSourceEnum
Defines the valid content sources for cards.

```typescript
type ContentSource = "github" | "gitbook" | "notion"
```

### ContentCardSchema
Main schema for validating content card objects.

```typescript
interface ContentCard {
  id: string;                    // Unique identifier (min 1 char)
  title: string;                 // Card title (1-200 chars)
  description: string;           // Card description (1-1000 chars)
  source: ContentSource;         // github, gitbook, or notion
  url: string;                   // Valid URL format
  tags?: string[];              // Array of tags (max 10, each max 50 chars)
  lastUpdated?: string;         // ISO date string
  featured?: boolean;           // Whether card is featured (default: false)
}
```

**Usage:**
```typescript
import { ContentCardSchema } from "shared/schemas";

// Validate data
const result = ContentCardSchema.parse(data);

// Safe parsing with error handling
const parsed = ContentCardSchema.safeParse(data);
if (!parsed.success) {
  console.error(parsed.error);
}
```

### CreateContentCardSchema
Schema for creating new cards (without ID).

```typescript
type CreateContentCard = Omit<ContentCard, "id">
```

### ContentCardFilterSchema
Schema for filtering content cards.

```typescript
interface ContentCardFilter {
  source?: ContentSource;
  tags?: string[];
  searchQuery?: string;
  featured?: boolean;
}
```

### BatchContentCardsSchema
Schema for batch operations on multiple cards.

```typescript
interface BatchContentCards {
  cards: ContentCard[];
  action: "create" | "update" | "delete" | "reorder";
}
```

---

## Agent Skill Schemas

### ParameterDataTypeEnum
Defines valid parameter data types for agent skills.

```typescript
type ParameterDataType = 
  | "Text"
  | "Number"
  | "Select"
  | "Multi-select"
  | "Boolean"
  | "Date"
  | "File"
  | "URL"
```

### SkillParameterSchema
Schema for individual skill parameters.

```typescript
interface SkillParameter {
  Param_Name: string;        // Parameter name
  Data_Type: ParameterDataType;
  Scope_Format: string;      // Format specification (e.g., "Range: 1-100")
  Description: string;       // Parameter description
}
```

### AgentSkillSchema
Schema for individual agent skills.

```typescript
interface AgentSkill {
  Skill_Name: string;        // Skill name
  Skill_ID: string;          // Unique skill identifier
  Parameters: SkillParameter[];  // Array of parameters (default: [])
}
```

### TrackEnum
Defines agent tracks/categories.

```typescript
type Track = "Builder" | "Analyzer" | "Designer" | "Optimizer" | "Integrator"
```

### AgentProfileSchema
Main schema for AI agent profiles.

```typescript
interface AgentProfile {
  Agent_Profile: string;     // Agent name/profile
  Agent_ID: string;          // Unique agent identifier
  Track: Track;              // Agent track/category
  Skills: AgentSkill[];      // Array of skills (min 1)
}
```

### AgentSkillFilterSchema
Schema for filtering agents and skills.

```typescript
interface AgentSkillFilter {
  track?: Track;
  searchQuery?: string;
  skillName?: string;
}
```

### AgentSkillRequestSchema
Schema for requesting skill execution.

```typescript
interface AgentSkillRequest {
  agentId: string;           // Agent identifier
  skillId: string;           // Skill identifier
  parameters?: Record<string, any>;  // Skill parameters
}
```

### BatchAgentSkillsSchema
Schema for batch operations on agent skills.

```typescript
interface BatchAgentSkills {
  agents: AgentProfile[];
  action: "create" | "update" | "delete";
}
```

---

## User Preference Schemas

### UserPreferenceSchema
Main schema for user preferences.

```typescript
interface UserPreference {
  userId: string;                    // User identifier
  theme: "dark" | "light";          // UI theme (default: "dark")
  enabledSources: ContentSource[];   // Enabled content sources
  cardOrder: string[];              // Custom card order (IDs)
  favoriteAgents: string[];         // Favorite agent IDs
  favoriteCards: string[];          // Favorite card IDs
  notificationsEnabled: boolean;    // Notifications toggle (default: true)
  autoRefresh: boolean;             // Auto-refresh toggle (default: false)
  autoRefreshInterval: number;      // Refresh interval in ms (default: 300000)
  createdAt?: Date;
  updatedAt?: Date;
}
```

### UpdateUserPreferenceSchema
Schema for partial user preference updates.

```typescript
type UpdateUserPreference = Partial<Omit<UserPreference, "userId" | "createdAt">>
```

### UserContentSourcePreferenceSchema
Schema for managing individual content source preferences.

```typescript
interface UserContentSourcePreference {
  userId: string;
  source: ContentSource;
  enabled: boolean;
  lastSyncedAt?: Date;
  apiToken?: string;  // OAuth tokens
}
```

### UserWorkspaceSettingsSchema
Schema for workspace-specific user settings.

```typescript
interface UserWorkspaceSettings {
  userId: string;
  workspaceId: string;
  defaultView: "grid" | "list" | "kanban";  // (default: "grid")
  itemsPerPage: number;                      // (default: 12)
  sortBy: "title" | "date" | "source" | "custom";  // (default: "custom")
  filterByFeatured: boolean;                 // (default: false)
}
```

---

## Usage Examples

### Validating Content Card Data

```typescript
import { ContentCardSchema, CreateContentCardSchema } from "shared/schemas";

// Validate existing card
const card = {
  id: "card-1",
  title: "My Repository",
  description: "A great project",
  source: "github",
  url: "https://github.com/user/repo",
  tags: ["typescript", "react"],
  featured: true,
};

try {
  const validated = ContentCardSchema.parse(card);
  console.log("Valid card:", validated);
} catch (error) {
  console.error("Validation failed:", error);
}

// Validate new card creation (without ID)
const newCard = {
  title: "New Repository",
  description: "Another great project",
  source: "github",
  url: "https://github.com/user/repo2",
  tags: ["typescript"],
};

const validated = CreateContentCardSchema.safeParse(newCard);
if (validated.success) {
  // Use validated.data
} else {
  // Handle validation errors
  validated.error.errors.forEach((err) => {
    console.error(`${err.path.join(".")}: ${err.message}`);
  });
}
```

### Validating Agent Skills

```typescript
import { AgentProfileSchema } from "shared/schemas";

const agent = {
  Agent_Profile: "Full Stack Engineer",
  Agent_ID: "FSE-001",
  Track: "Builder",
  Skills: [
    {
      Skill_Name: "Code Generation",
      Skill_ID: "FSE-001-S1",
      Parameters: [
        {
          Param_Name: "language",
          Data_Type: "Select",
          Scope_Format: "[JavaScript, TypeScript, Python]",
          Description: "Programming language",
        },
      ],
    },
  ],
};

const result = AgentProfileSchema.safeParse(agent);
if (result.success) {
  console.log("Valid agent:", result.data);
}
```

### Validating User Preferences

```typescript
import { UserPreferenceSchema, UpdateUserPreferenceSchema } from "shared/schemas";

// Create new preference
const pref = {
  userId: "user-123",
  theme: "dark",
  enabledSources: ["github", "gitbook"],
  cardOrder: [],
  favoriteAgents: ["ASA-001", "FSE-002"],
};

const validated = UserPreferenceSchema.parse(pref);

// Update preference (partial)
const update = {
  theme: "light",
  enabledSources: ["github", "notion"],
};

const updateValidated = UpdateUserPreferenceSchema.parse(update);
```

---

## Best Practices

### 1. Always Use Safe Parsing in User-Facing Code

```typescript
// ✅ Good - handles errors gracefully
const result = ContentCardSchema.safeParse(userInput);
if (!result.success) {
  showErrorMessage(result.error.message);
}

// ❌ Avoid - throws uncaught errors
const data = ContentCardSchema.parse(userInput);
```

### 2. Use Type Inference for Type Safety

```typescript
import { type ContentCard } from "shared/schemas";

// TypeScript automatically infers the type
const card: ContentCard = {
  // ... properties
};
```

### 3. Validate at API Boundaries

```typescript
// Server-side tRPC procedure
import { ContentCardSchema } from "shared/schemas";

export const updateCard = protectedProcedure
  .input(ContentCardSchema)
  .mutation(async ({ input, ctx }) => {
    // input is guaranteed to be valid ContentCard
    await db.updateCard(input);
  });
```

### 4. Create Reusable Validation Functions

```typescript
export function validateCard(data: unknown) {
  const result = ContentCardSchema.safeParse(data);
  if (!result.success) {
    throw new Error(`Invalid card: ${result.error.message}`);
  }
  return result.data;
}
```

---

## Error Handling

Zod provides detailed error information:

```typescript
const result = ContentCardSchema.safeParse(data);

if (!result.success) {
  // result.error is a ZodError
  result.error.errors.forEach((error) => {
    console.log(error.path);     // ["title"]
    console.log(error.message);  // "Title is required"
    console.log(error.code);     // "too_small"
  });

  // Get formatted error message
  console.log(result.error.message);
}
```

---

## Schema Updates

When modifying schemas:

1. Update the schema definition in `shared/schemas/*.schema.ts`
2. Update this documentation with the new structure
3. Run TypeScript check to ensure no breaking changes
4. Update any dependent code that uses the schema
5. Create a new checkpoint after significant schema changes

---

## Related Files

- `shared/schemas/contentCard.schema.ts` - Content card validation
- `shared/schemas/agentSkill.schema.ts` - Agent skill validation
- `shared/schemas/userPreference.schema.ts` - User preference validation
- `shared/schemas/index.ts` - Central export point
- `server/routers.ts` - tRPC procedures using schemas
- `client/src/pages/HomePage.tsx` - Client-side validation examples
