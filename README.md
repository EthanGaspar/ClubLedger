# RollCall

A user-friendly attendance tracking and member management platform built with the MERN stack.

## Features

- **Member Management**: Full CRUD operations for member records
- **Member Details**: Track member name, status (active/inactive), and role/position
- **User Authentication**: Secure signup/login with JWT-based authentication
- **Password Reset**: Forgot password and reset password functionality
- **Theme Support**: Toggle between dark and light themes
- **Data Isolation**: User-specific data access and management
- **Rate Limiting**: Built-in API rate limiting for security

## Tech Stack

### Frontend
- React 19
- Vite
- TailwindCSS
- DaisyUI
- React Router
- Axios

### Backend
- Node.js
- Express
- MongoDB (Mongoose ODM)
- JWT Authentication
- Upstash Redis (Rate Limiting)
- Nodemailer (Email)

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB instance
- Upstash Redis account (for rate limiting)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/EthanGaspar/RollCall.git
cd RollCall
```

2. Install dependencies:
```bash
npm run build
```

This will install dependencies for both frontend and backend.

3. Set up environment variables:

Create a `.env` file in the `/backend` directory with the following variables:

```env
MONGO_URI=your_mongodb_connection_string
SECRET_KEY_JWT=your_jwt_secret_key
UPSTASH_REDIS_REST_URL=your_upstash_redis_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token
CLIENT_URL=http://localhost:5173
```

See `.env.example` for more details.

### Development

Run the frontend and backend separately:

**Frontend** (from `/frontend`):
```bash
npm run dev
```
Runs on http://localhost:5173

**Backend** (from `/backend`):
```bash
npm run dev
```
Runs on http://localhost:5001

### Production

Build and start the application:

```bash
npm run build
npm run start
```

In production, the backend serves the built frontend from `/frontend/dist`.

## Project Structure

```
RollCall/
├── frontend/          # React frontend application
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── hooks/
│   │   └── lib/
│   └── package.json
├── backend/           # Express backend API
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   └── config/
│   └── package.json
└── package.json       # Root package.json
```

## API Endpoints

### Authentication
- `POST /api/auth/users/signup` - Create new user account
- `POST /api/auth/users/login` - Authenticate user
- `POST /api/auth/users/forgot-password` - Request password reset
- `POST /api/auth/users/reset-password/:token` - Reset password with token

### Members
- `GET /api/members` - List all members
- `GET /api/members/:id` - Get member by ID
- `POST /api/members` - Create new member
- `PUT /api/members/:id` - Update member
- `DELETE /api/members/:id` - Delete member

## Security

- Passwords are hashed with bcrypt
- JWT tokens expire after 15 minutes
- Rate limiting: 10 requests per 20 seconds per IP
- Password requirements: min 8 characters, 1 lowercase, 1 uppercase, 1 number, 1 symbol
- Password reset tokens are single-use and expire after 15 minutes

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[ISC](LICENSE)

## Roadmap

- [ ] User profile updates with data isolation
- [ ] Form upload and completion functionality
- [ ] Organizations model for multi-user/multi-organization management
- [ ] Enhanced reporting and analytics
