# Banhos Energéticos Sales Landing Page

## Overview

This is a high-converting sales landing page for a digital product selling energetic bath recipes ("Banhos Energéticos"). The application follows the ClickFunnels/Russell Brunson conversion psychology approach with a spiritual/mystical aesthetic. It features a single-page sales funnel with multiple pricing tiers, upsell modals, and a checkout flow designed to maximize conversions through psychological triggers like urgency, scarcity, and social proof.

The tech stack is a modern full-stack TypeScript application with React frontend, Express backend, and PostgreSQL database (via Drizzle ORM).

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React 18 with TypeScript for type safety
- Vite as the build tool and dev server for fast HMR and optimized production builds
- Wouter for lightweight client-side routing (landing page, checkout page, 404)
- Single-page application architecture with route-based code splitting

**UI Component System**
- Shadcn UI component library (Radix UI primitives + Tailwind styling)
- "New York" style variant configured in components.json
- Dark mode by default with mystical color scheme (golden/purple accents)
- Tailwind CSS for utility-first styling with custom design tokens

**State Management**
- TanStack Query (React Query) for server state management and API calls
- Local React state for UI interactions (modals, form inputs)
- No global state management library - component composition preferred

**Design System**
- Typography: Montserrat for headlines, Open Sans for body text (via Google Fonts)
- Spacing: Tailwind scale (4, 6, 8, 12, 16, 24)
- Color system: CSS custom properties with HSL values for theme consistency
- Responsive: Mobile-first approach with single-column stacking layout

### Backend Architecture

**Server Framework**
- Express.js as the HTTP server
- TypeScript throughout for type safety
- ESM modules (type: "module" in package.json)

**API Structure**
- RESTful endpoints under `/api` prefix
- POST `/api/checkout` - Create new checkout session
- GET `/api/checkout/:id` - Retrieve checkout details
- Request/response validation using Zod schemas from shared directory

**Data Storage**
- Currently using in-memory storage (MemStorage class) for development
- Designed to be swapped with PostgreSQL implementation via IStorage interface
- Drizzle ORM configured for PostgreSQL with migrations directory
- Schema defined in shared/schema.ts for type sharing between frontend/backend

**Development vs Production**
- Vite dev server with HMR in development mode
- Static file serving from dist/public in production
- Build process: Client (Vite) + Server (esbuild) → dist directory

### External Dependencies

**UI Component Libraries**
- @radix-ui/* - Unstyled, accessible component primitives (dialogs, accordions, dropdowns, etc.)
- class-variance-authority - Component variant management
- tailwindcss - Utility-first CSS framework
- lucide-react - Icon library

**Form Handling**
- react-hook-form - Form state management
- @hookform/resolvers - Form validation
- zod - Schema validation (shared between client/server)
- drizzle-zod - Zod schema generation from Drizzle schemas

**Database & ORM**
- @neondatabase/serverless - Serverless PostgreSQL driver for Neon
- drizzle-orm - TypeScript ORM
- drizzle-kit - Schema management and migrations
- connect-pg-simple - PostgreSQL session store for Express

**Development Tools**
- @replit/vite-plugin-* - Replit-specific dev tooling (error overlay, cartographer, dev banner)
- tsx - TypeScript execution for development server
- esbuild - Fast JavaScript bundler for production server build

**Utility Libraries**
- date-fns - Date manipulation
- clsx + tailwind-merge - Conditional className utility
- nanoid - Unique ID generation
- wouter - Minimalist router (~1.2KB)

### Key Architectural Decisions

**Shared Schema Pattern**
The `shared/` directory contains Zod schemas and TypeScript types used by both frontend and backend, ensuring type safety across the full stack. This prevents API contract mismatches.

**Storage Abstraction**
The IStorage interface allows swapping storage implementations without changing business logic. Current MemStorage is suitable for development; PostgreSQL implementation can be added by implementing the same interface.

**Conversion-Focused Design**
The entire UI is built around conversion psychology principles from the design_guidelines.md:
- Visual hierarchy emphasizing premium plan
- Urgency/scarcity messaging
- Pain → Agitation → Solution flow
- Trust-building elements (guarantees, testimonials)

**Component-First Architecture**
Heavy use of Shadcn UI components provides consistent, accessible UI patterns while maintaining flexibility through composition rather than configuration.

**API Request Pattern**
Centralized API request utility in `lib/queryClient.ts` handles fetch logic, error handling, and unauthorized states consistently across all endpoints.