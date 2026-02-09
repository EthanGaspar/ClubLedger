# Contributing to RollCall

Thank you for considering contributing to RollCall! This document provides guidelines for contributing to the project.

## Development Workflow

### Branch Naming
Use descriptive feature names for branches:
- `feature/add-user-profile-edit`
- `fix/login-validation-bug`
- `docs/update-api-documentation`

### Pull Requests
1. Create a feature branch from `main`
2. Make your changes with clear, focused commits
3. Test your changes locally
4. Submit a pull request with a clear description of the changes
5. Wait for review and address any feedback

## Code Style

### General Guidelines
- Follow existing code patterns in the repository
- Write clear, self-documenting code
- Add comments only when necessary to explain complex logic
- Keep functions focused and single-purpose

### Frontend (React)
- Use functional components with hooks
- Follow the existing component structure in `/frontend/src/components/`
- Use TailwindCSS utility classes for styling
- Maintain consistent theme support (light/dark mode)

### Backend (Express)
- Use ES modules (`import`/`export`)
- Follow RESTful API conventions
- Add appropriate error handling
- Use middleware for cross-cutting concerns

## Testing

Before submitting a PR:
1. Test the frontend: `cd frontend && npm run dev`
2. Test the backend: `cd backend && npm run dev`
3. Run linting: `cd frontend && npm run lint`
4. Verify your changes work in both development and production builds

## Environment Setup

See the main [README.md](README.md) for setup instructions.

### Development Notes

**Email Service**: The current implementation uses Ethereal (fake SMTP) for development. When moving to production, replace the email configuration in `/backend/src/config/email.js` with a real email service (e.g., SendGrid, AWS SES, Mailgun).

**Logging**: Console.log statements are acceptable for development but consider replacing with a proper logging library (Winston, Pino) for production deployments.

## Security

- Never commit `.env` files or sensitive credentials
- Use environment variables for all secrets
- Follow password validation requirements
- Test rate limiting on API endpoints
- Report security vulnerabilities privately to the repository owner

## Questions?

Feel free to open an issue for questions or clarifications about contributing to the project.
