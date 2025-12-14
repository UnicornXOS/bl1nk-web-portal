# bl1nk Web Portal

**The Agentic IDE Web Platform** - A modern, feature-rich web portal for managing content from GitHub, GitBook, and Notion, powered by AI agents and built with Next.js 15.

![BLinkOS Logo](./client/public/bl1nk-logo.png)

## Overview

bl1nk Web Portal is a comprehensive web application that serves as a unified hub for:

- 📚 **Content Management** - Organize content from GitHub, GitBook, and Notion
- 🤖 **AI Agent Skills** - Showcase and manage AI agent capabilities
- 📊 **Diagram Rendering** - Create and display Mermaid diagrams
- ✏️ **Content Editing** - Edit and manage content cards
- 🔄 **Drag & Drop** - Reorder content with intuitive drag-and-drop
- 📋 **Markdown Export** - Share content as formatted Markdown
- 🔐 **Universal Authentication** - Secure login with Google and GitHub OAuth
- ✅ **Comprehensive Testing** - Unit tests, E2E tests, and visual regression testing

## Screenshots

### Landing Page
![Landing Page](./docs/screenshots/01-landing-page.png)

### Hero Section
![Hero Section](./docs/screenshots/02-hero-section.png)

### Content Cards
![Content Cards](./docs/screenshots/03-content-cards.png)

## Feature Demos

### Drag & Drop Reordering
![Drag & Drop Demo](./docs/gifs/01-drag-and-drop-demo.gif)

### Card Editor
![Card Editor Demo](./docs/gifs/02-card-editor-demo.gif)

## Features

### Core Features

✅ **Universal Login System**
- Google OAuth integration
- GitHub OAuth integration
- Secure JWT-based sessions
- Automatic user profile management

✅ **Content Management**
- GitHub repository integration
- GitBook documentation support
- Notion workspace integration
- Source filtering and organization
- Tag-based categorization
- Featured content highlighting

✅ **Card Editor**
- Edit card properties
- Manage tags
- Update URLs and descriptions
- Save/cancel functionality

✅ **Drag & Drop Reordering**
- Intuitive card reordering
- Visual feedback during drag
- Persistent order storage

✅ **Share as Markdown**
- One-click markdown export
- Clipboard integration
- Formatted output with links

✅ **Mermaid Diagram Rendering**
- 8 diagram types supported
- Live rendering and preview
- SVG/PNG export
- Error handling

✅ **AI Agent Skills System**
- 4 specialized AI agents
- Skill showcase with parameters
- Track-based filtering
- Search functionality
- Detail modals

✅ **Data Validation**
- Zod schema validation
- Type-safe data handling
- Client and server-side validation

✅ **Comprehensive Testing**
- Unit tests with Vitest
- E2E tests with Playwright
- Visual regression testing
- Code coverage reporting

### Advanced Features

🔄 **User Preferences** (In Progress)
- Theme customization
- Content source preferences
- Workspace settings
- Notification management

🔄 **API Integration** (Planned)
- Live GitHub data fetching
- GitBook content synchronization
- Notion workspace integration

🔄 **QR Code Sharing** (Planned)
- Generate QR codes for cards
- Mobile-friendly sharing
- Link tracking

## Tech Stack

### Frontend
- **Framework:** Next.js 15 with React 19
- **Styling:** Tailwind CSS 4
- **UI Components:** shadcn/ui
- **State Management:** React Hooks + tRPC
- **Drag & Drop:** react-beautiful-dnd
- **Diagrams:** Mermaid
- **Validation:** Zod

### Backend
- **Runtime:** Node.js
- **Server:** Express.js 4
- **API:** tRPC 11
- **Database:** MySQL/TiDB
- **ORM:** Drizzle ORM
- **Authentication:** Manus OAuth

### Testing
- **Unit Tests:** Vitest
- **E2E Tests:** Playwright
- **Component Testing:** React Testing Library
- **Coverage:** V8

### DevTools
- **Build:** Vite 7 (dev server only, no build)
- **Package Manager:** pnpm
- **Type Checking:** TypeScript
- **Linting:** ESLint

## Quick Start

### Prerequisites

- Node.js 18+
- pnpm (or npm/yarn)
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/billlzzz10/bl1nk-web-portal.git
cd bl1nk-web-portal

# Install dependencies
pnpm install

# Install Playwright browsers
npx playwright install chromium

# Set up environment variables
cp .env.example .env.local

# Start the development server
pnpm dev
```

### Environment Variables

```env
# Database
DATABASE_URL=mysql://user:password@localhost/bl1nk

# OAuth
VITE_APP_ID=your_app_id
OAUTH_SERVER_URL=https://api.manus.im
VITE_OAUTH_PORTAL_URL=https://login.manus.im

# API Keys
GITHUB_API_TOKEN=your_github_token
GITBOOK_API_TOKEN=your_gitbook_token
NOTION_API_TOKEN=your_notion_token

# Application
VITE_APP_TITLE=bl1nk Web Portal
JWT_SECRET=your_jwt_secret
```

### Development

```bash
# Start dev server (runs on http://localhost:3000)
pnpm dev

# Run type checking
pnpm typecheck

# Run linting
pnpm lint

# Format code
pnpm format
```

## Testing

### Unit Tests

```bash
# Run all unit tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run with coverage
pnpm test:coverage

# Open test UI
pnpm test:ui
```

### E2E Tests

```bash
# Run all E2E tests
pnpm e2e

# Run in headed mode (see browser)
pnpm e2e:headed

# Debug mode
pnpm e2e:debug

# View test report
pnpm e2e:report
```

### Test Files

- **Unit Tests:** `client/src/components/__tests__/`, `shared/schemas/__tests__/`
- **E2E Tests:** `e2e/*.spec.ts`
- **Test Guide:** [TESTING_GUIDE.md](./TESTING_GUIDE.md)

## Project Structure

```
bl1nk-web-portal/
├── client/                    # Frontend application
│   ├── public/               # Static assets
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── pages/           # Page components
│   │   ├── data/            # Mock data and constants
│   │   ├── lib/             # Utilities and helpers
│   │   ├── hooks/           # Custom React hooks
│   │   ├── contexts/        # React contexts
│   │   └── App.tsx          # Main app component
│   └── index.html           # HTML entry point
├── server/                    # Backend application
│   ├── routers.ts           # tRPC procedure definitions
│   ├── db.ts                # Database queries
│   └── _core/               # Core server utilities
├── shared/                    # Shared code
│   ├── schemas/             # Zod validation schemas
│   └── const.ts             # Shared constants
├── drizzle/                   # Database schema
│   └── schema.ts            # Table definitions
├── e2e/                       # E2E tests
│   ├── landing-page.spec.ts
│   └── home-page.spec.ts
├── test/                      # Test configuration
│   └── vitest.setup.ts
├── docs/                      # Documentation
│   ├── screenshots/          # Visual screenshots
│   └── gifs/                 # Feature demos
└── docs/                      # Documentation files
    ├── ARCHITECTURE_GUIDE.md
    ├── COMPONENTS_GUIDE.md
    ├── SCHEMA_DOCUMENTATION.md
    ├── FEATURES.md
    ├── API_INTEGRATION_GUIDE.md
    └── TESTING_GUIDE.md
```

## Documentation

### Getting Started
- [Architecture Guide](./ARCHITECTURE_GUIDE.md) - Project structure and setup
- [Components Guide](./COMPONENTS_GUIDE.md) - Component documentation and usage

### Development
- [Schema Documentation](./SCHEMA_DOCUMENTATION.md) - Zod validation schemas
- [Features Guide](./FEATURES.md) - Complete feature list and status
- [API Integration Guide](./API_INTEGRATION_GUIDE.md) - External API integration
- [Testing Guide](./TESTING_GUIDE.md) - Unit tests, E2E tests, and Playwright

### Progress
- [TODO](./todo.md) - Development progress and checklist

## Key Components

### Pages
- **LandingPage** - Public landing page with hero section
- **HomePage** - Authenticated dashboard with content management

### Layout
- **Navbar** - Navigation with user profile
- **Footer** - Footer with links and social media

### Content
- **ContentCard** - Individual content card display
- **ContentSection** - Grid layout for content cards
- **DraggableContentSection** - Drag-and-drop enabled content grid

### Editors
- **CardEditor** - Modal for editing card properties
- **MermaidRenderer** - Diagram rendering and export

### Agents
- **AgentCard** - AI agent profile display
- **AgentSkillCard** - Individual skill display
- **AgentSkillsSection** - Agent grid with filtering

## API Routes

### Authentication
- `POST /api/oauth/callback` - OAuth callback handler
- `GET /api/trpc/auth.me` - Get current user
- `POST /api/trpc/auth.logout` - Logout user

### Content
- `GET /api/trpc/content.list` - List content cards
- `POST /api/trpc/content.create` - Create card
- `PUT /api/trpc/content.update` - Update card
- `DELETE /api/trpc/content.delete` - Delete card

### Agents
- `GET /api/trpc/agents.list` - List AI agents
- `GET /api/trpc/agents.getSkills` - Get agent skills

## Database Schema

### Users Table
```sql
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  openId VARCHAR(64) UNIQUE NOT NULL,
  name TEXT,
  email VARCHAR(320),
  loginMethod VARCHAR(64),
  role ENUM('user', 'admin') DEFAULT 'user',
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  lastSignedIn TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Styling

### Design System
- **Theme:** Dark mode with cyan accents (Once UI)
- **Colors:** Slate 950-900 backgrounds, cyan 400-500 accents
- **Typography:** System fonts with Tailwind CSS
- **Spacing:** 4px base unit with Tailwind scale
- **Shadows:** Subtle shadows with cyan glow effects

### Responsive Breakpoints
- **Mobile:** < 640px
- **Tablet:** 640px - 1024px
- **Desktop:** > 1024px

## Performance

### Optimization Strategies
- Component lazy loading
- Efficient re-renders with React hooks
- CSS optimization with Tailwind
- Image optimization
- Caching strategies for API calls

### Metrics
- First Contentful Paint (FCP): < 2s
- Largest Contentful Paint (LCP): < 2.5s
- Cumulative Layout Shift (CLS): < 0.1

## Security

### Authentication
- OAuth 2.0 with Manus platform
- JWT-based session management
- Secure cookie handling
- CSRF protection

### Data Protection
- Input validation with Zod
- SQL injection prevention via ORM
- XSS protection via React
- Environment variable security

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Development Workflow

### Adding a New Feature

1. **Update TODO** - Add feature to `todo.md`
2. **Create Schema** - Define Zod schema in `shared/schemas/`
3. **Build Backend** - Add tRPC procedure in `server/routers.ts`
4. **Build Frontend** - Create component in `client/src/components/`
5. **Write Tests** - Add unit and E2E tests
6. **Test** - Verify functionality in dev server
7. **Document** - Update relevant documentation
8. **Checkpoint** - Save progress with `webdev_save_checkpoint`

### Code Style

- **TypeScript** - Strict mode enabled
- **Formatting** - Prettier with 2-space indents
- **Linting** - ESLint with recommended rules
- **Components** - Functional components with hooks
- **Naming** - PascalCase for components, camelCase for functions

## Troubleshooting

### Common Issues

**Dev server won't start**
```bash
# Clear node_modules and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install
pnpm dev
```

**TypeScript errors**
```bash
# Run type check
pnpm typecheck

# Check for schema issues
cd shared/schemas && pnpm typecheck
```

**Database connection issues**
```bash
# Verify DATABASE_URL in .env.local
# Check database is running
# Run migrations: pnpm db:push
```

**Tests failing**
```bash
# Run tests in watch mode
pnpm test:watch

# Check test coverage
pnpm test:coverage

# Debug specific test
pnpm e2e:debug
```

## Roadmap

### Phase 1: Foundation ✅
- [x] Basic project setup
- [x] Authentication system
- [x] Content management UI
- [x] Comprehensive testing infrastructure

### Phase 2: Advanced Features ✅
- [x] Card editor
- [x] Drag & drop
- [x] Markdown export
- [x] Mermaid diagrams
- [x] Agent skills
- [x] Zod validation

### Phase 3: Integration 🔄
- [ ] GitHub API integration
- [ ] GitBook API integration
- [ ] Notion API integration
- [ ] User preferences storage

### Phase 4: Enhancement
- [ ] QR code sharing
- [ ] Advanced filtering
- [ ] Collaboration features
- [ ] Analytics dashboard

### Phase 5: Polish
- [ ] Performance optimization
- [ ] Mobile app
- [ ] Offline support
- [ ] Advanced search

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please:
1. Check the [documentation](./docs/)
2. Open an issue on GitHub
3. Contact the development team

## Authors

- **Doll Awit Chidjai** - Lead Developer
- **bl1nk Team** - Contributors

## Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [shadcn/ui](https://ui.shadcn.com/) - Component library
- [tRPC](https://trpc.io/) - Type-safe RPC
- [Mermaid](https://mermaid.js.org/) - Diagram rendering
- [Zod](https://zod.dev/) - Schema validation
- [Vitest](https://vitest.dev/) - Unit testing
- [Playwright](https://playwright.dev/) - E2E testing

---

**Made with ❤️ by the bl1nk team**
