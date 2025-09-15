# Overview

This is a modern full-stack web application for a French medical practice (Dr. Martine Beaumont). Originally built as a single-page application, it has been successfully transformed into a comprehensive multi-page website with an integrated appointment booking system. The application features dedicated pages for services, about information, contact, and appointment scheduling. The tech stack includes React with Wouter routing for the frontend, Express.js for the backend, and PostgreSQL with Drizzle ORM for persistent data storage.

## Latest Changes (September 2025)

The website has been completely transformed from a single-page architecture to a true multi-page application:

- **Multi-page Navigation**: Replaced scroll-based navigation with Wouter-based routing across 5 main pages
- **Dedicated Pages**: Services, À propos, Contact, and Rendez-vous with comprehensive French medical content
- **Appointment Booking System**: Complete booking flow with calendar interface, time slot validation, and backend persistence
- **Database Integration**: PostgreSQL database with appointment management and contact form persistence
- **Enhanced Home Page**: Redesigned landing page with proper CTAs linking to dedicated pages

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
The frontend is built with React 18 using Vite as the build tool and bundler. The application follows a component-based architecture with:
- **UI Framework**: shadcn/ui components built on top of Radix UI primitives
- **Styling**: Tailwind CSS with custom design system variables for consistent theming
- **State Management**: TanStack React Query for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Form Handling**: React Hook Form with Zod validation
- **Type Safety**: Full TypeScript implementation throughout

The frontend is organized into logical sections including navigation, hero, services, about, contact, and footer components. The design implements a professional medical theme with custom fonts (Raleway and Source Sans Pro) and a cohesive color scheme.

## Backend Architecture
The backend uses Express.js with TypeScript in ESM module format. Key architectural decisions include:
- **API Structure**: RESTful API with `/api` prefix for all endpoints
- **Data Layer**: Abstracted storage interface (`IStorage`) with in-memory implementation (`MemStorage`) for development
- **Request Handling**: Middleware for JSON parsing, CORS, and request logging
- **Error Handling**: Centralized error handling with proper HTTP status codes
- **Validation**: Zod schemas for request validation shared between client and server

The server supports both development (with Vite integration) and production modes with different static file serving strategies.

## Data Storage Solutions
The application is configured for PostgreSQL using Drizzle ORM:
- **ORM**: Drizzle ORM with PostgreSQL dialect for type-safe database operations
- **Schema Management**: Shared TypeScript schema definitions between client and server
- **Database Provider**: Neon Database serverless PostgreSQL (@neondatabase/serverless)
- **Migrations**: Drizzle-kit for schema migrations and database management
- **Current Implementation**: In-memory storage for development with database schema ready for production deployment

## Authentication and Authorization
Currently, the application has a basic user schema defined but no active authentication system implemented. The database schema includes a users table with username/password fields, indicating preparation for future authentication features.

## External Dependencies

### Database Services
- **Neon Database**: Serverless PostgreSQL database service
- **Drizzle ORM**: Type-safe database toolkit for TypeScript
- **Drizzle Kit**: Schema management and migration tool

### UI and Styling
- **Radix UI**: Headless UI component primitives for accessibility
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: Pre-built component library based on Radix UI
- **Lucide React**: Icon library for consistent iconography

### Development and Build Tools
- **Vite**: Fast build tool and development server
- **TypeScript**: Static type checking and enhanced developer experience
- **ESBuild**: Fast JavaScript bundler for production builds
- **PostCSS**: CSS post-processing for Tailwind

### Frontend Libraries
- **TanStack React Query**: Server state management and caching
- **React Hook Form**: Form handling and validation
- **Wouter**: Lightweight client-side routing
- **Zod**: Runtime type validation and schema definition
- **date-fns**: Date manipulation utilities

### Backend Libraries
- **Express.js**: Web application framework for Node.js
- **connect-pg-simple**: PostgreSQL session store for Express
- **tsx**: TypeScript execution for development server

### Replit Integration
- **@replit/vite-plugin-runtime-error-modal**: Enhanced error reporting
- **@replit/vite-plugin-cartographer**: Development tooling integration