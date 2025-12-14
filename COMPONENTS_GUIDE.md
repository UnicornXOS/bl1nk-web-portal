# Components Guide

Complete guide to all custom components in bl1nk Web Portal.

## Table of Contents

1. [Layout Components](#layout-components)
2. [Content Components](#content-components)
3. [Editor Components](#editor-components)
4. [Agent Components](#agent-components)
5. [Utility Components](#utility-components)

---

## Layout Components

### Navbar

Navigation bar component with branding, menu, and authentication buttons.

**Location:** `client/src/components/Navbar.tsx`

**Props:**
```typescript
interface NavbarProps {
  // No required props - uses useAuth() hook internally
}
```

**Features:**
- Sticky positioning
- Logo and branding
- Navigation menu
- User profile dropdown
- Login/Logout buttons
- Responsive mobile menu

**Usage:**
```typescript
import Navbar from "@/components/Navbar";

export default function Layout() {
  return (
    <>
      <Navbar />
      {/* Page content */}
    </>
  );
}
```

### Footer

Footer component with links, social media, and copyright.

**Location:** `client/src/components/Footer.tsx`

**Props:**
```typescript
interface FooterProps {
  // No required props
}
```

**Features:**
- Multiple link sections
- Social media icons
- Copyright information
- Responsive grid layout

**Usage:**
```typescript
import Footer from "@/components/Footer";

export default function Layout() {
  return (
    <>
      {/* Page content */}
      <Footer />
    </>
  );
}
```

---

## Content Components

### ContentCard

Individual card displaying content from GitHub, GitBook, or Notion.

**Location:** `client/src/components/ContentCard.tsx`

**Props:**
```typescript
interface ContentCardProps {
  id: string;
  title: string;
  description: string;
  source: "github" | "gitbook" | "notion";
  url: string;
  tags?: string[];
  icon?: React.ReactNode;
  lastUpdated?: string;
  featured?: boolean;
  onEdit?: (card: ContentCardProps) => void;
}
```

**Features:**
- Source-specific styling and icons
- Featured badge
- Tag display
- Edit button (optional)
- Share as Markdown button
- External link button
- Hover effects

**Usage:**
```typescript
import ContentCard from "@/components/ContentCard";

<ContentCard
  id="card-1"
  title="My Repository"
  description="A great project"
  source="github"
  url="https://github.com/user/repo"
  tags={["typescript", "react"]}
  featured={true}
  onEdit={(card) => console.log("Edit:", card)}
/>
```

### ContentSection

Grid layout for displaying multiple content cards with grouping.

**Location:** `client/src/components/ContentSection.tsx`

**Props:**
```typescript
interface ContentSectionProps {
  title: string;
  description?: string;
  items: ContentItem[];
  collapsible?: boolean;
  defaultExpanded?: boolean;
  onEditCard?: (card: ContentItem) => void;
}
```

**Features:**
- Featured items section
- Regular items section
- Collapsible header
- Empty state handling
- Responsive grid

**Usage:**
```typescript
import ContentSection from "@/components/ContentSection";

<ContentSection
  title="GitHub Repositories"
  description="Your connected repositories"
  items={githubCards}
  onEditCard={handleEditCard}
/>
```

### DraggableContentSection

Enhanced ContentSection with drag-and-drop reordering.

**Location:** `client/src/components/DraggableContentSection.tsx`

**Props:**
```typescript
interface DraggableContentSectionProps {
  title: string;
  description?: string;
  items: ContentItem[];
  collapsible?: boolean;
  defaultExpanded?: boolean;
  onEditCard?: (card: ContentItem) => void;
  onReorder?: (items: ContentItem[]) => void;
}
```

**Features:**
- Drag-and-drop reordering
- Visual feedback during drag
- Drop zones with styling
- Grip handle icons
- Reorder callback

**Usage:**
```typescript
import DraggableContentSection from "@/components/DraggableContentSection";

<DraggableContentSection
  title="My Content"
  items={cards}
  onReorder={(reorderedCards) => {
    // Save new order to database
  }}
/>
```

---

## Editor Components

### CardEditor

Modal dialog for editing content card properties.

**Location:** `client/src/components/CardEditor.tsx`

**Props:**
```typescript
interface CardEditorProps {
  isOpen: boolean;
  card: ContentItem;
  onClose: () => void;
  onSave: (card: ContentItem) => void;
}
```

**Features:**
- Modal dialog
- Title editing
- Description editing
- Tag management
- Source selection
- URL input
- Save/Cancel buttons
- Form validation

**Usage:**
```typescript
import CardEditor from "@/components/CardEditor";

const [editingCard, setEditingCard] = useState<ContentItem | null>(null);

<CardEditor
  isOpen={!!editingCard}
  card={editingCard!}
  onClose={() => setEditingCard(null)}
  onSave={(card) => {
    // Save to database
    setEditingCard(null);
  }}
/>
```

### MermaidRenderer

Component for rendering and exporting Mermaid diagrams.

**Location:** `client/src/components/MermaidRenderer.tsx`

**Props:**
```typescript
interface MermaidRendererProps {
  code: string;
  title?: string;
  description?: string;
  diagramType?: "flowchart" | "sequence" | "class" | "state" | "ER" | "user journey" | "gantt" | "pie";
}
```

**Features:**
- Live diagram rendering
- Multiple diagram types
- SVG/PNG export
- Error handling
- Responsive sizing
- Code display toggle

**Supported Diagram Types:**
- `flowchart` - Flowcharts and decision trees
- `sequence` - Sequence diagrams
- `class` - Class diagrams
- `state` - State diagrams
- `ER` - Entity relationship diagrams
- `user journey` - User journey maps
- `gantt` - Gantt charts
- `pie` - Pie charts

**Usage:**
```typescript
import MermaidRenderer from "@/components/MermaidRenderer";

const diagramCode = `graph TD
  A[Start] --> B{Decision}
  B -->|Yes| C[Process]
  B -->|No| D[Skip]
`;

<MermaidRenderer
  code={diagramCode}
  title="Workflow"
  description="A simple workflow diagram"
  diagramType="flowchart"
/>
```

---

## Agent Components

### AgentCard

Card displaying AI agent profile with skills summary.

**Location:** `client/src/components/AgentCard.tsx`

**Props:**
```typescript
interface AgentCardProps {
  agent: AgentProfile;
  onViewSkills: (agent: AgentProfile) => void;
}
```

**Features:**
- Agent profile display
- Track badge
- Skills count
- View skills button
- Responsive layout

**Usage:**
```typescript
import AgentCard from "@/components/AgentCard";

<AgentCard
  agent={agentProfile}
  onViewSkills={(agent) => {
    // Show skills modal
  }}
/>
```

### AgentSkillCard

Card displaying individual agent skill with parameters.

**Location:** `client/src/components/AgentSkillCard.tsx`

**Props:**
```typescript
interface AgentSkillCardProps {
  skill: AgentSkill;
  agentName: string;
}
```

**Features:**
- Skill name and ID
- Parameter list
- Parameter types
- Scope format display
- Description

**Usage:**
```typescript
import AgentSkillCard from "@/components/AgentSkillCard";

<AgentSkillCard
  skill={agentSkill}
  agentName="Full Stack Engineer"
/>
```

### AgentSkillsSection

Full-featured section displaying all agents with filtering and search.

**Location:** `client/src/components/AgentSkillsSection.tsx`

**Props:**
```typescript
interface AgentSkillsSectionProps {
  agents: AgentProfile[];
}
```

**Features:**
- Search functionality
- Track filtering
- Agent grid display
- Skills detail modal
- Responsive layout

**Usage:**
```typescript
import AgentSkillsSection from "@/components/AgentSkillsSection";
import { agentSkillsData } from "@/data/agentSkillsData";

<AgentSkillsSection agents={agentSkillsData} />
```

---

## Utility Components

### HeroSection

Hero section for landing pages with CTA buttons.

**Location:** `client/src/components/HeroSection.tsx`

**Props:**
```typescript
interface HeroSectionProps {
  title: string;
  subtitle: string;
  features: string[];
  primaryCTA: {
    text: string;
    href: string;
  };
  secondaryCTA?: {
    text: string;
    href: string;
  };
}
```

**Features:**
- Large headline
- Subtitle text
- Feature list
- Call-to-action buttons
- Gradient background

**Usage:**
```typescript
import HeroSection from "@/components/HeroSection";

<HeroSection
  title="Welcome to bl1nk"
  subtitle="The Agentic IDE for modern development"
  features={["AI-powered", "Collaborative", "Open source"]}
  primaryCTA={{ text: "Get Started", href: "/signup" }}
/>
```

### LoginCard

Universal login modal supporting multiple OAuth providers.

**Location:** `client/src/components/LoginCard.tsx`

**Props:**
```typescript
interface LoginCardProps {
  isOpen: boolean;
  onClose: () => void;
}
```

**Features:**
- Modal dialog
- Google OAuth button
- GitHub OAuth button
- Loading states
- Error handling

**Usage:**
```typescript
import LoginCard from "@/components/LoginCard";

const [isLoginOpen, setIsLoginOpen] = useState(false);

<LoginCard
  isOpen={isLoginOpen}
  onClose={() => setIsLoginOpen(false)}
/>
```

---

## Component Styling

All components use:
- **Tailwind CSS** for styling
- **shadcn/ui** components for consistency
- **Dark theme** with cyan accents (Once UI style)
- **Responsive design** (mobile-first)

### Color Palette

- **Background:** `bg-slate-950`, `bg-slate-900`
- **Text:** `text-white`, `text-gray-400`
- **Accent:** `text-cyan-400`, `bg-cyan-500`
- **Borders:** `border-slate-700`, `border-cyan-500/30`

### Common Patterns

**Hover Effects:**
```typescript
className="hover:shadow-lg hover:shadow-cyan-500/20 transition-all"
```

**Responsive Grid:**
```typescript
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
```

**Glassmorphism:**
```typescript
className="bg-slate-900/50 backdrop-blur border border-slate-700/50"
```

---

## Best Practices

### 1. Use Type-Safe Props

```typescript
// ✅ Good
interface MyComponentProps {
  title: string;
  onAction: (id: string) => void;
}

// ❌ Avoid
function MyComponent(props: any) {}
```

### 2. Handle Loading States

```typescript
// ✅ Good - show skeleton or spinner
{isLoading ? <Skeleton /> : <Content />}

// ❌ Avoid - no feedback
{content}
```

### 3. Provide Fallbacks

```typescript
// ✅ Good - empty state
{items.length > 0 ? <Grid items={items} /> : <EmptyState />}

// ❌ Avoid - crash on empty
<Grid items={items} />
```

### 4. Use Callbacks for Actions

```typescript
// ✅ Good - callback pattern
<Button onClick={() => onDelete(id)}>Delete</Button>

// ❌ Avoid - direct mutation
<Button onClick={() => setItems(items.filter(i => i.id !== id))}>Delete</Button>
```

---

## Component Composition

### Example: Full Page Layout

```typescript
import Navbar from "@/components/Navbar";
import ContentSection from "@/components/ContentSection";
import AgentSkillsSection from "@/components/AgentSkillsSection";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <ContentSection
          title="GitHub Repositories"
          items={githubCards}
        />
        
        <AgentSkillsSection agents={agentSkillsData} />
      </main>
      
      <Footer />
    </div>
  );
}
```

---

## Related Documentation

- [SCHEMA_DOCUMENTATION.md](./SCHEMA_DOCUMENTATION.md) - Data validation schemas
- [ARCHITECTURE_GUIDE.md](./ARCHITECTURE_GUIDE.md) - Project structure and setup
- [client/src/components/](./client/src/components/) - Component source files
