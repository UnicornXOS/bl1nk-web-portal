# bl1nk Web Portal - Architecture & Implementation Guide

## Overview

The **bl1nk Web Portal** is a modern, responsive web application built with React, TypeScript, and Tailwind CSS. It serves three primary purposes:

1. **Landing Page:** Showcase the bl1nk project with compelling visuals, feature highlights, and AI agents
2. **Documentation Hub:** Centralized access to GitHub repositories, GitBook documentation, and Notion workspaces
3. **Universal Login System:** Secure authentication for all company applications

The design follows the **"Once UI"** philosophy: minimalist, dark-themed, with cyan accents and glassmorphism effects.

---

## Project Structure

```
client/src/
├── components/
│   ├── ui/                          # shadcn/ui base components
│   ├── Navbar.tsx                   # Sticky navigation with auth
│   ├── Footer.tsx                   # Footer with links and social
│   ├── LoginCard.tsx                # Universal login modal
│   ├── HeroSection.tsx              # Landing page hero
│   ├── AIAgentsSection.tsx          # AI agents showcase
│   ├── DocsSection.tsx              # Documentation overview
│   ├── ContentCard.tsx              # Individual content item card
│   ├── ContentSection.tsx           # Grid of content cards with grouping
│   └── ...
├── pages/
│   ├── LandingPage.tsx              # Public landing page
│   ├── HomePage.tsx                 # Authenticated user dashboard
│   └── ...
├── hooks/
│   └── useAuth.ts                   # Authentication hook
├── contexts/
│   └── ThemeContext.tsx             # Theme management
├── App.tsx                          # Main app component with routing
└── main.tsx                         # Entry point

server/
├── _core/
│   ├── index.ts                     # Server entry point
│   └── ...
└── ...

shared/
├── types.ts                         # Shared TypeScript types
└── ...
```

---

## Key Components

### 1. **Navbar Component** (`components/Navbar.tsx`)
- Sticky navigation bar with backdrop blur
- Logo and menu items (Home, AI Agents, Documentation)
- Authentication buttons (Login/Logout)
- Mobile hamburger menu
- Smooth scroll to sections

**Props:** None (uses `useAuth` hook internally)

**Features:**
- Responsive design (hidden menu on mobile)
- Cyan accent on hover
- Smooth transitions

### 2. **LoginCard Component** (`components/LoginCard.tsx`)
- Modal card for user authentication
- OAuth options: Google, GitHub
- Terms and privacy links
- Customizable title and description

**Props:**
```typescript
interface LoginCardProps {
  title?: string;
  description?: string;
  onClose?: () => void;
}
```

### 3. **HeroSection Component** (`components/HeroSection.tsx`)
- Large headline: "Beyond Automation"
- Subheadline with value proposition
- CTA buttons: "Get Started" and "Read the Docs"
- Feature highlights with icons
- Animated background elements

**Props:**
```typescript
interface HeroSectionProps {
  onGetStarted?: () => void;
  onLearnMore?: () => void;
}
```

### 4. **ContentCard Component** (`components/ContentCard.tsx`)
- Displays individual content items (GitHub, GitBook, Notion)
- Shows source icon, title, description, tags
- Last updated timestamp
- "View" button with external link
- Featured badge option

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
}
```

### 5. **ContentSection Component** (`components/ContentSection.tsx`)
- Grid layout for content cards
- Separates featured and regular items
- Collapsible sections (optional)
- Responsive grid (1 col mobile, 2 col tablet, 3 col desktop)

**Props:**
```typescript
interface ContentSectionProps {
  title: string;
  description?: string;
  items: ContentItem[];
  collapsible?: boolean;
  defaultExpanded?: boolean;
}
```

### 6. **AIAgentsSection Component** (`components/AIAgentsSection.tsx`)
- Showcase of AI agents with cards
- Status badges (Online, Training, Offline)
- Capabilities list
- Action buttons for each agent
- Info box with tips

**Props:**
```typescript
interface AIAgentsSectionProps {
  agents: AIAgent[];
}
```

### 7. **DocsSection Component** (`components/DocsSection.tsx`)
- Documentation overview with three categories
- Getting Started, API Reference, Guides & Tutorials
- Links to GitBook documentation
- CTA button to explore full docs

**Props:**
```typescript
interface DocsSectionProps {
  onExplore?: () => void;
}
```

---

## Pages

### 1. **LandingPage** (`pages/LandingPage.tsx`)
- Public-facing landing page
- Combines HeroSection, AIAgentsSection, DocsSection
- Login modal triggered by "Get Started" button
- Scroll-to-section navigation

**Features:**
- Mock AI agents data
- Responsive layout
- Smooth scrolling

### 2. **HomePage** (`pages/HomePage.tsx`)
- Protected dashboard for authenticated users
- Displays personalized greeting
- Filter buttons for GitHub, GitBook, Notion
- ContentSection components for each source
- Mock content data

**Features:**
- User authentication check
- Dynamic content filtering
- Add Content and Settings buttons (UI only, no backend yet)

---

## Styling & Design System

### Color Palette (Once UI)
```css
/* Primary Colors */
--bg-primary: #0D1117 (slate-950)
--bg-secondary: #1C2536 (slate-900)
--text-primary: #FFFFFF (white)
--text-secondary: #E6EDF3 (gray-100)
--accent: #00E0FF (cyan-400)

/* Semantic Colors */
--success: #10B981 (green-500)
--warning: #F59E0B (yellow-500)
--error: #EF4444 (red-500)
--info: #3B82F6 (blue-500)
```

### Tailwind Classes Used
- **Backgrounds:** `bg-slate-950`, `bg-slate-900`, `bg-slate-800`
- **Text:** `text-white`, `text-gray-400`, `text-cyan-400`
- **Borders:** `border-cyan-500/20`, `border-cyan-500/50`
- **Effects:** `backdrop-blur-sm`, `shadow-lg`, `shadow-cyan-500/50`
- **Transitions:** `transition-all`, `duration-300`
- **Gradients:** `bg-gradient-to-r`, `from-cyan-500`, `to-blue-500`

### Responsive Breakpoints
- **Mobile:** Default (< 640px)
- **Tablet:** `sm:` (640px), `md:` (768px)
- **Desktop:** `lg:` (1024px), `xl:` (1280px)

---

## Authentication Flow

### Current Implementation
- Uses built-in OAuth system (Google, GitHub)
- `useAuth()` hook provides:
  - `user`: Current user object
  - `isAuthenticated`: Boolean flag
  - `loading`: Loading state
  - `logout()`: Logout function
  - `error`: Error message if any

### Login Flow
1. User clicks "Login" or "Get Started"
2. LoginCard modal appears
3. User selects OAuth provider (Google or GitHub)
4. Redirects to `getLoginUrl()` (from constants)
5. After auth, redirects back to app
6. App detects `isAuthenticated` and shows HomePage

### Logout Flow
1. User clicks "Logout" button in Navbar
2. Calls `logout()` function
3. Clears auth state
4. Redirects to LandingPage

---

## Content Integration

### Content Sources
The app supports three content sources:

#### 1. **GitHub**
- Display repositories, issues, discussions
- Show README files, code snippets
- Link to GitHub profiles/organizations

**API Integration:**
```typescript
// Example: Fetch GitHub repos
const fetchGithubRepos = async (username: string) => {
  const response = await fetch(`https://api.github.com/users/${username}/repos`);
  return response.json();
};
```

#### 2. **GitBook**
- Display documentation pages
- Show table of contents
- Embed documentation content

**API Integration:**
```typescript
// Example: Fetch GitBook pages
const fetchGitbookPages = async (spaceId: string) => {
  const response = await fetch(`https://api.gitbook.com/v1/spaces/${spaceId}/pages`);
  return response.json();
};
```

#### 3. **Notion**
- Display Notion pages and databases
- Show page properties and content
- Link to Notion workspace

**API Integration:**
```typescript
// Example: Fetch Notion pages
const fetchNotionPages = async (databaseId: string, token: string) => {
  const response = await fetch(`https://api.notion.com/v1/databases/${databaseId}/query`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}` },
  });
  return response.json();
};
```

### Mock Data Structure
```typescript
interface ContentItem {
  id: string;
  title: string;
  description: string;
  source: "github" | "gitbook" | "notion";
  url: string;
  tags?: string[];
  lastUpdated?: string;
  featured?: boolean;
}
```

---

## Development Workflow

### Setup
```bash
cd /home/ubuntu/bl1nk-web-portal
pnpm install
pnpm dev
```

### Building
```bash
pnpm build
pnpm start
```

### Code Quality
```bash
pnpm check          # TypeScript check
pnpm format         # Format code
pnpm test           # Run tests
```

### Adding New Components
1. Create component file in `client/src/components/`
2. Define TypeScript interface for props
3. Implement component with Tailwind CSS
4. Export from component file
5. Import and use in pages/other components

### Adding New Pages
1. Create page file in `client/src/pages/`
2. Implement page component
3. Add route in `App.tsx` Router
4. Add navigation link in Navbar if needed

---

## Performance Optimization

### Current Optimizations
- Code splitting with React.lazy() for routes
- Memoization of expensive components
- Lazy loading of images
- Efficient CSS with Tailwind

### Future Optimizations
- Image optimization with next-gen formats
- Service worker for offline support
- Caching strategies for API calls
- Component virtualization for large lists

---

## Accessibility

### Guidelines Followed
- Semantic HTML (`<button>`, `<nav>`, `<footer>`)
- ARIA labels for icons and buttons
- Keyboard navigation support
- Color contrast compliance (WCAG AA)
- Focus indicators for interactive elements

### Best Practices
- Always provide alt text for images
- Use semantic heading hierarchy
- Test with keyboard navigation
- Ensure color is not the only indicator

---

## Deployment

### Build Output
- Frontend: Built with Vite, output to `dist/`
- Backend: Node.js server in `server/`

### Environment Variables
```env
VITE_APP_TITLE=bl1nk
VITE_APP_LOGO=https://...
VITE_OAUTH_PORTAL_URL=https://...
VITE_FRONTEND_FORGE_API_URL=https://...
```

### Hosting Options
- **Vercel:** Recommended for Next.js-like deployment
- **Netlify:** Good for static + serverless
- **Self-hosted:** Docker container or Node.js server

---

## Future Enhancements

### Phase 1 (Current)
- ✅ Landing page with hero section
- ✅ AI agents showcase
- ✅ Universal login system
- ✅ Documentation overview
- ✅ Content card components

### Phase 2 (Planned)
- [ ] Real GitHub API integration
- [ ] Real GitBook API integration
- [ ] Real Notion API integration
- [ ] User preferences/settings
- [ ] Content search and filtering

### Phase 3 (Future)
- [ ] Dark/Light theme toggle
- [ ] User workspace customization
- [ ] Advanced analytics
- [ ] Mobile app (React Native)
- [ ] Desktop app (Electron)

---

## Troubleshooting

### Common Issues

**Issue:** Login not working
- Check OAuth URLs in constants
- Verify environment variables
- Check browser console for errors

**Issue:** Content not loading
- Verify API endpoints
- Check CORS headers
- Review network tab in DevTools

**Issue:** Styling looks wrong
- Clear browser cache
- Rebuild Tailwind CSS
- Check Tailwind config

---

## Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)
- [Lucide Icons](https://lucide.dev)
- [Vite Documentation](https://vitejs.dev)

---

## Support

For questions or issues, refer to:
- Project documentation in `doc/`
- System Prompt in `SYSTEM_PROMPT_UI_SPECIALIST.md`
- Component examples in `client/src/components/`

---

**Built with ❤️ for the bl1nk community**
