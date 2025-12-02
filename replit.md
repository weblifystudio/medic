# Café Pavillon - Replit Configuration

## Overview

Café Pavillon is a one-page website for an elegant Parisian café. The site showcases the café's offerings, atmosphere, and services through a sophisticated, warm design inspired by contemporary Parisian salon aesthetics. The application is a full-stack TypeScript project featuring a React frontend with shadcn/ui components and an Express backend with PostgreSQL database integration.

**Primary Purpose**: Marketing and customer engagement for a high-end Parisian café, enabling table reservations, event inquiries, and newsletter subscriptions.

**Target Audience**: Café patrons seeking refined coffee, pastries, and a warm gathering space in Saint-Germain, Paris.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React 18 with TypeScript, using Vite as the build tool and development server.

**UI Component Library**: shadcn/ui (Radix UI primitives) configured with the "new-york" style preset. Components are installed locally in `client/src/components/ui/` for full customization.

**Styling Strategy**: 
- Tailwind CSS with custom design tokens matching the Café Pavillon brand
- CSS custom properties defined in `client/src/index.css` for theming
- Design system enforces specific color palette: Charcoal (#1F2937), Warm Sand (#C49B6E), Soft Cream (#F6F3EE), Terracotta (#A83E2E), White (#FFFFFF)
- Typography: Playfair Display (serif headings) and Inter (sans-serif body text)

**State Management**: React Query (@tanstack/react-query) for server state management and API interactions. No global client state library; component-level state via React hooks.

**Routing**: Wouter for lightweight client-side routing (single-page application with smooth anchor scrolling for navigation).

**Form Handling**: React Hook Form with Zod schema validation for type-safe form submissions (reservations, contact forms, newsletter).

**Page Structure**: Single-page layout with sectioned components:
- Header (sticky navigation)
- Hero (full-screen with call-to-action)
- About (vision statement)
- Menu (curated menu items)
- Gallery (image lightbox)
- Privatisations (event booking form)
- Reservation (table booking form)
- Contact (location and contact information)
- Footer (newsletter signup, social links)

### Backend Architecture

**Framework**: Express.js with TypeScript running on Node.js.

**API Design**: RESTful endpoints under `/api` namespace:
- POST `/api/reservations` - Create table reservation
- POST `/api/contact` - Submit contact/quote request
- POST `/api/newsletter` - Newsletter subscription

**Request Processing**:
- JSON body parsing with raw body preservation for webhook validation
- URL-encoded form data support
- Custom logging middleware for request/response tracking

**Error Handling**: Zod schema validation on API endpoints with structured error responses including field-level errors.

**Development vs Production**:
- Development: Vite middleware integration for hot module replacement
- Production: Serves static compiled frontend from `dist/public`

**Build Process**: Custom esbuild script bundles server code with selective dependency bundling (allowlist strategy) to optimize cold start times.

### Data Storage Solutions

**Database**: PostgreSQL accessed via Neon serverless driver (@neondatabase/serverless).

**ORM**: Drizzle ORM for type-safe database queries and schema management.

**Schema Structure** (defined in `shared/schema.ts`):

1. **reservations** table:
   - id (UUID primary key)
   - name, phone, email (customer contact)
   - date, time, partySize (reservation details)
   - notes (optional special requests)
   - createdAt (timestamp)

2. **contactRequests** table:
   - id (UUID primary key)
   - name, email, phone (contact info)
   - subject, message (inquiry details)
   - eventType, eventDate, guestCount (optional event fields)
   - createdAt (timestamp)

3. **newsletterSubscriptions** table:
   - id (UUID primary key)
   - email (unique)
   - createdAt (timestamp)

**Storage Abstraction**: IStorage interface allows swapping between in-memory storage (MemStorage for development) and PostgreSQL (DbStorage for production) without changing business logic.

**Validation**: Drizzle-zod integration generates Zod schemas from database schema for consistent validation across client and server.

### Authentication and Authorization

**Current Implementation**: No authentication system. The application is a public-facing marketing site.

**Rationale**: All features (viewing content, submitting forms) are intended for public access. Future admin panel for managing reservations would require adding authentication.

### Deployment Architecture

**Build Output**:
- Client: Compiled to `dist/public` via Vite
- Server: Bundled to `dist/index.cjs` via esbuild

**Static Asset Handling**: Express serves client build output with SPA fallback to `index.html`.

**Environment Configuration**:
- `DATABASE_URL` required for database connection
- `NODE_ENV` determines development vs production behavior

**Server Startup**: HTTP server created via Node's `http` module wrapping Express app (enables WebSocket upgrade support if needed).

## External Dependencies

### Third-Party Services

**Database**: Neon Serverless PostgreSQL - managed PostgreSQL with serverless connection pooling.

**Fonts**: Google Fonts CDN for Playfair Display and Inter typography.

**Maps**: Integrated map component in Contact section (implementation accepts either Leaflet or Google Maps embed as per design brief).

### Key NPM Packages

**UI Framework**:
- `react`, `react-dom` - UI library
- `@radix-ui/*` - Unstyled accessible component primitives (20+ packages)
- `tailwindcss` - Utility-first CSS framework
- `class-variance-authority`, `clsx`, `tailwind-merge` - Styling utilities

**Data Layer**:
- `drizzle-orm` - TypeScript ORM
- `drizzle-zod` - Schema-to-Zod validator
- `@neondatabase/serverless` - PostgreSQL driver
- `@tanstack/react-query` - Server state management

**Forms & Validation**:
- `react-hook-form` - Form state management
- `zod` - Schema validation
- `@hookform/resolvers` - React Hook Form + Zod integration

**Server**:
- `express` - Web framework
- `vite` - Development server with HMR

**Utilities**:
- `date-fns` - Date manipulation
- `lucide-react` - Icon library (Feather-style icons per design guidelines)
- `embla-carousel-react` - Carousel/gallery functionality
- `wouter` - Lightweight routing

### Development Tools

- `tsx` - TypeScript execution for development
- `esbuild` - Fast bundler for production server code
- `drizzle-kit` - Database migration tool
- `typescript` - Type checking
- `@replit/vite-plugin-*` - Replit-specific development enhancements

### Asset Management

**Static Images**: Stored in `attached_assets/stock_images/` directory with semantic filenames. Images imported as ES modules in components via Vite's asset handling.

**Image Strategy**: Stock photography following design guidelines (warm palette, shallow depth of field, professional food/café photography).