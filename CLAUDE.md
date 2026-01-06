# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

RollCall is a user-friendly attendance tracking and member management platform for martial arts. MERN stack application with a monorepo structure containing separate frontend (React/Vite) and backend (Express/MongoDB) directories.

## Git Workflow

- Use feature branches and pull requests when making changes
- Branch naming: descriptive feature names (e.g., `themeUpdate`)
- Main branch is the production branch

## Development Commands

### Frontend (from `/frontend`)
```bash
npm run dev      # Start Vite dev server on port 5173
npm run build    # Production build
npm run lint     # Run ESLint
npm run preview  # Preview production build
```

### Backend (from `/backend`)
```bash
npm run dev      # Start with nodemon on port 5001
npm run start    # Production start
```

### Root
```bash
npm run build    # Install deps and build both frontend and backend
npm run start    # Start backend (serves built frontend in production)
```

## Architecture

### Frontend (`/frontend`)
- React 19 with Vite, TailwindCSS, DaisyUI
- Entry: `src/main.jsx` → `src/App.jsx` (routes)
- Routes: `/` (HomePage), `/create` (CreatePage), `/member/:id` (MemberDetailPage)
- API calls via Axios instance in `src/lib/axios.js` (auto-switches between dev localhost:5001 and prod `/api`)
- Components in `src/components/`, pages in `src/pages/`

### Theme System
- Dark/Light mode toggle in Navbar
- Light mode: DaisyUI `emerald` theme
- Dark mode: DaisyUI `forest` theme
- Theme persisted to localStorage
- In light mode, use `text-primary-focus` for slightly darker primary text when needed

### Backend (`/backend`)
- Express server on port 5001
- MongoDB with Mongoose ODM
- Upstash Redis for rate limiting (10 requests/20 seconds per IP)
- In production, serves frontend static files from `frontend/dist`

### API Endpoints (`/api/members`)
- `GET /` - List all members
- `GET /:id` - Get member by ID
- `POST /` - Create member
- `PUT /:id` - Update member
- `DELETE /:id` - Delete member

### Member Schema
```javascript
{
  firstName: String (required),
  lastName: String (required),
  active: Boolean (required),
  role: String (required),
  createdAt: Date,
  updatedAt: Date
}
```

## Environment Variables

Backend requires `.env` with:
- MongoDB connection string
- Upstash Redis credentials (UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN)

## Module Systems

- Frontend: ES Modules (`"type": "module"`)
- Backend: CommonJS (`"type": "commonjs"`)

## Security Notes

- No authentication/authorization currently implemented
- All member data is publicly accessible (CRUD operations available to anyone)
- Rate limiting via Upstash Redis is the only access control mechanism
