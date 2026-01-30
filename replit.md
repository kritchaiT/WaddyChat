# ChatApp

## Overview

A social messaging mobile application built with React Native and Expo that combines direct chat functionality with content discovery through posts and reels. The app enables users to connect through conversations and shared moments, featuring a soft/pastel aesthetic with bold accents.

The app follows a tab-based navigation pattern with four main sections (Chats, Services, Reels, Profile) plus floating action buttons for content creation.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React Native with Expo SDK 54, using the new architecture (`newArchEnabled: true`) and React Compiler experimental feature.

**Navigation**: React Navigation v7 with a hybrid approach:
- Bottom tab navigator for main sections
- Native stack navigators nested within each tab
- Root stack for modal screens (ChatDetail, Settings)

**State Management**: 
- TanStack React Query for server state and API data fetching
- Local React state for UI-specific state
- No global state management library (app complexity doesn't require it)

**Styling Approach**:
- StyleSheet API for component styling
- Centralized theme constants in `client/constants/theme.ts`
- Custom `useTheme` hook for dark/light mode support
- Reanimated for animations with spring physics

**Key UI Patterns**:
- Transparent headers with blur effects on iOS
- Keyboard-aware views using `react-native-keyboard-controller`
- Haptic feedback on user interactions via `expo-haptics`
- Glass effects with `expo-glass-effect` where available

### Backend Architecture

**Server**: Express.js v5 with TypeScript, serving as a REST API backend.

**API Structure**: Routes registered through `server/routes.ts`, all API endpoints prefixed with `/api`.

**Database**: PostgreSQL with Drizzle ORM for type-safe database operations.

**Storage Layer**: Abstract `IStorage` interface in `server/storage.ts` with in-memory implementation (MemStorage) for development. Designed to be swapped with database-backed implementation.

### Path Aliases

- `@/*` maps to `./client/*`
- `@shared/*` maps to `./shared/*`

Configured in both `tsconfig.json` and `babel.config.js` for TypeScript and Metro bundler compatibility.

### Build System

- Development: Separate processes for Expo dev server and Express backend
- Production: Expo static web build + esbuild for server bundling
- Custom build script in `scripts/build.js` handles deployment domain configuration

## External Dependencies

### Database
- **PostgreSQL**: Primary database, configured via `DATABASE_URL` environment variable
- **Drizzle ORM**: Type-safe SQL query builder with Zod schema validation

### Authentication (Planned)
- Apple Sign-In and Google Sign-In via SSO (per design guidelines, not yet implemented)

### APIs and Services
- **Expo Services**: Font loading, splash screen, haptics, image handling, linear gradients
- Custom REST API at `/api` endpoints served by Express backend

### Key Runtime Dependencies
- `expo-image`: Optimized image component
- `expo-haptics`: Touch feedback
- `expo-blur` / `expo-glass-effect`: Visual effects
- `react-native-reanimated`: Performant animations
- `react-native-gesture-handler`: Touch gestures
- `react-native-keyboard-controller`: Keyboard handling
- `@tanstack/react-query`: Data fetching and caching

### Environment Variables
- `DATABASE_URL`: PostgreSQL connection string
- `EXPO_PUBLIC_DOMAIN`: API server domain for client requests
- `REPLIT_DEV_DOMAIN` / `REPLIT_DOMAINS`: Replit-specific deployment domains