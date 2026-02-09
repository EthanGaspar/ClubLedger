# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

RollCall is a user-friendly attendance tracking and member management platform. MERN stack application with a monorepo structure containing separate frontend (React/Vite) and backend (Express/MongoDB) directories.

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
- Routes: `/` (HomePage), `/create` (CreatePage), `/member/:id` (MemberDetailPage), `/settings` (SettingsPage), `/login` (LoginPage), `/signup` (SignupPage), `/forgot-password` (ForgotPasswordPage), `/reset-password/:token` (ResetPasswordPage)
- API calls via Axios instance in `src/lib/axios.js` (auto-switches between dev localhost:5001 and prod `/api`)
- Components in `src/components/`, pages in `src/pages/`

### Theme System
- Dark/Light mode toggle in Navbar
- Light mode: DaisyUI `emerald` theme
- Dark mode: DaisyUI `forest` theme
- Theme persisted to localStorage
- In light mode, use `text-primary-focus` for slightly darker primary text when needed

### Frontend Authentication
- AuthContext in `src/context/AuthContext.jsx` wraps app in `main.jsx`
- useReducer pattern with LOGIN/LOGOUT actions
- Custom hooks in `src/hooks/`:
  - `useAuthContext.jsx` - access auth state and dispatch
  - `useSignUp.jsx` - signup logic with loading/error states
  - `useForgotPassword.jsx` - forgot password request with loading/error/success states
  - `useResetPassword.jsx` - reset password with token, loading/error states

### Backend (`/backend`)
- Express server on port 5001
- MongoDB with Mongoose ODM
- Upstash Redis for rate limiting (10 requests/20 seconds per IP)
- In production, serves frontend static files from `frontend/dist`

### API Endpoints

#### Members (`/api/members`)
- `GET /` - List all members
- `GET /:id` - Get member by ID
- `POST /` - Create member
- `PUT /:id` - Update member
- `DELETE /:id` - Delete member

#### Authentication (`/api/auth/users`)
- `POST /signup` - Create new user account (returns JWT)
- `POST /login` - Authenticate user (returns JWT)
- `POST /forgot-password` - Request password reset email
- `POST /reset-password/:token` - Reset password with token

### Schemas

#### Member Schema
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

#### User Schema
```javascript
{
  email: String (required, unique),
  password: String (required, hashed),
  resetPasswordToken: String (SHA-256 hashed, default null),
  resetPasswordExpires: Date (default null),
  createdAt: Date,
  updatedAt: Date
}
```

### Authentication System
- JWT-based authentication with 15-minute token expiry
- Passwords hashed with bcrypt (salt rounds: 10)
- Validation via `validator` package:
  - Email: must be valid format, max 128 characters
  - Password: min 8 chars, 1 lowercase, 1 uppercase, 1 number, 1 symbol, max 64 characters
- Token payload contains user `_id`
- Auth files: `userModel.js`, `userController.js`, `userRoutes.js`

## Environment Variables

Backend requires `.env` with:
- MongoDB connection string
- Upstash Redis credentials (UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN)
- SECRET_KEY_JWT - Secret key for signing JWT tokens
- CLIENT_URL - Frontend origin for password reset links (e.g., http://localhost:5173)

## Module Systems

- Frontend: ES Modules (`"type": "module"`)
- Backend: ES Modules (`"type": "module"`)

## Security Notes

- JWT authentication implemented for user signup/login (auth branch)
- Member endpoints not yet protected by authentication middleware
- Passwords hashed with bcrypt before storage
- Rate limiting via Upstash Redis (10 requests/20 seconds per IP)
- Password reset via email with secure, single-use, time-limited tokens (15 min expiry, SHA-256 hashed in DB)
- Password reset endpoint does not reveal whether an email exists (prevents enumeration)
