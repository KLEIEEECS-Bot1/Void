# Overview

This is an AI-powered Investment Scam Detector web application built with React and Express. The app allows users to submit investment pitches or offers and uses OpenAI's GPT-5 model to analyze the text for potential scam indicators, red flags, and risk levels. It provides detailed analysis including risk scores, explanations, and recommendations to help users make informed investment decisions.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **React with TypeScript**: Modern React application using functional components and hooks
- **Vite Build System**: Fast development server and optimized production builds
- **UI Framework**: Shadcn/ui component library built on Radix UI primitives for accessible, customizable components
- **Styling**: TailwindCSS with CSS custom properties for theming and responsive design
- **State Management**: TanStack Query (React Query) for server state management and caching
- **Routing**: Wouter for lightweight client-side routing
- **Form Handling**: React Hook Form with Zod validation for type-safe form management

## Backend Architecture
- **Express.js Server**: RESTful API built with Express and TypeScript
- **Modular Route System**: Organized route handlers in separate modules for maintainability
- **Request Logging**: Custom middleware for API request logging and performance monitoring
- **Error Handling**: Centralized error handling middleware with structured error responses
- **Development Tools**: Vite integration for hot module replacement during development

## Data Storage Solutions
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Schema Management**: Drizzle migrations for database schema versioning
- **Fallback Storage**: In-memory storage implementation for development/testing scenarios
- **Database Provider**: Neon serverless PostgreSQL for cloud deployment

## Authentication and Authorization
Currently implements basic session-based architecture foundation, though specific auth mechanisms are not yet implemented in the codebase.

## API Design
- **RESTful Endpoints**: 
  - `POST /api/analyze` - Analyze investment text for scams
  - `GET /api/analyses/:id` - Retrieve specific analysis results
  - `GET /api/analyses` - Get recent analyses with pagination
  - `GET /api/statistics` - Get platform usage statistics
- **Request Validation**: Zod schemas for runtime type checking and validation
- **Response Format**: Consistent JSON responses with proper HTTP status codes

## Component Architecture
- **Atomic Design**: Reusable UI components following atomic design principles
- **Feature Components**: Higher-level components for specific features (analysis form, results display)
- **Layout Components**: Shared layout components for consistent page structure
- **Custom Hooks**: Reusable logic extracted into custom React hooks

# External Dependencies

## AI/ML Services
- **OpenAI GPT-5**: Primary AI service for investment scam detection and analysis
- **API Integration**: Structured prompts for consistent analysis output format

## Database Services
- **Neon Database**: Serverless PostgreSQL hosting for production deployments
- **Connection Management**: Environment variable-based configuration

## UI/UX Libraries
- **Radix UI**: Headless, accessible component primitives
- **Lucide React**: Icon library for consistent iconography
- **TailwindCSS**: Utility-first CSS framework
- **Class Variance Authority**: Type-safe component variant management

## Development Tools
- **TypeScript**: Static type checking across frontend and backend
- **Drizzle Kit**: Database migration and schema management tools
- **ESBuild**: Fast JavaScript bundler for production builds
- **TSX**: TypeScript execution engine for development

## Deployment Platform
- **Replit**: Primary deployment platform with integrated development tools
- **Vite Plugins**: Replit-specific plugins for error overlays and development banners