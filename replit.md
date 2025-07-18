# FRC 10390 Team Website

## Overview

This is a full-stack web application for FRC (FIRST Robotics Competition) Team 10390 "GOOGIRL", an all-female robotics team. The application serves as the team's official website, showcasing their robots, awards, team information, and providing contact functionality. The site is built with a modern React frontend and an Express.js backend, designed to be bilingual (Chinese and English) to serve both local and international audiences.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

The application follows a monorepo structure with clear separation between client and server code:

### Frontend Architecture
- **Framework**: React with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Radix UI with shadcn/ui component library
- **State Management**: React Context for language switching, TanStack Query for server state
- **Routing**: Wouter for client-side routing
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Session Management**: Built-in session handling with connect-pg-simple
- **Development**: Hot reload with Vite integration

## Key Components

### Client-Side Components
1. **Language System**: Full bilingual support (Chinese/English) with context-based translation
2. **UI Components**: Comprehensive component library including modals, forms, navigation, and responsive layouts
3. **Page Structure**: Single-page application with sections for Home, About, Robots, Awards, Sponsors, and Contact
4. **Responsive Design**: Mobile-first approach with adaptive layouts

### Server-Side Components
1. **API Routes**: RESTful API structure with `/api` prefix
2. **Database Layer**: Drizzle ORM with PostgreSQL for data persistence
3. **Storage Interface**: Abstracted storage layer supporting both memory and database implementations
4. **Static File Serving**: Integrated static file serving for production builds

### Shared Components
1. **Schema Definitions**: Centralized database schema using Drizzle with Zod validation
2. **Type Definitions**: Shared TypeScript types between client and server

## Data Flow

1. **User Interaction**: Users interact with React components in the browser
2. **API Requests**: Client makes HTTP requests to Express.js backend via TanStack Query
3. **Data Processing**: Server processes requests and interacts with PostgreSQL database through Drizzle ORM
4. **Response Handling**: Data flows back to client and updates UI state
5. **Language Support**: All content is filtered through the translation system based on user language preference

## External Dependencies

### Frontend Dependencies
- **UI Framework**: React ecosystem (react, react-dom, react-router via wouter)
- **Styling**: Tailwind CSS with PostCSS processing
- **Component Library**: Radix UI primitives with shadcn/ui components
- **State Management**: TanStack Query for server state, React Context for client state
- **Form Handling**: React Hook Form with Zod validation
- **Utilities**: clsx, date-fns, lucide-react for icons

### Backend Dependencies
- **Server Framework**: Express.js with middleware for JSON parsing and logging
- **Database**: PostgreSQL with Neon serverless driver
- **ORM**: Drizzle ORM with Drizzle Kit for migrations
- **Session Management**: express-session with connect-pg-simple
- **Development Tools**: tsx for TypeScript execution, esbuild for production builds

### Development Dependencies
- **Build Tools**: Vite for frontend, esbuild for backend
- **TypeScript**: Full TypeScript support across the stack
- **Development Experience**: Hot reload, error overlays, and Replit integration

## Deployment Strategy

### Development Environment
- **Frontend**: Vite dev server with hot module replacement
- **Backend**: tsx with nodemon-like file watching
- **Database**: PostgreSQL connection via environment variables
- **Integration**: Vite proxy configuration for seamless API integration

### Production Build
- **Frontend**: Vite builds static assets to `dist/public`
- **Backend**: esbuild bundles server code to `dist/index.js`
- **Database**: Drizzle migrations applied via `db:push` command
- **Deployment**: Single Node.js process serving both static files and API endpoints

### Environment Configuration
- **DATABASE_URL**: PostgreSQL connection string (required)
- **NODE_ENV**: Environment detection (development/production)
- **ADMIN_PASSWORD**: Admin panel password (default: "FRC10390admin")
- **Session Configuration**: Secure session management with database persistence

## Recent Changes: Latest modifications with dates

### 2025-07-18 - Database Integration and Security
- **Database**: Added PostgreSQL database with Drizzle ORM
- **Data Persistence**: Contact messages now stored in database permanently
- **Admin Security**: Added password protection for admin panel (`/admin`)
- **Authentication**: Simple token-based authentication system
- **Default Password**: `FRC10390admin` (changeable via ADMIN_PASSWORD env var)

### Visual and UX Improvements
- **Language Toggle**: Enhanced visibility with darker background and border
- **Hero Background**: Changed from gradient to photo with 50% opacity overlay
- **Contact Form**: Added real-time submission with loading states and toast notifications

The application is designed to be deployed on platforms like Replit, Vercel, or traditional hosting providers, with the database connection being the primary external dependency. The build process creates a self-contained application that can run as a single Node.js process.