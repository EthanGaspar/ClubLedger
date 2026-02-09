# Production Deployment Checklist

Before deploying RollCall to production, ensure the following items are configured:

## Required Environment Variables

All environment variables must be set in the backend `.env` file:

```env
MONGO_URI=<your production MongoDB connection string>
SECRET_KEY_JWT=<strong random secret key for JWT signing>
UPSTASH_REDIS_REST_URL=<your Upstash Redis URL>
UPSTASH_REDIS_REST_TOKEN=<your Upstash Redis token>
CLIENT_URL=<your production frontend URL>
NODE_ENV=production
```

## Email Service Configuration

**CRITICAL**: The current email implementation uses Ethereal (a fake SMTP service) for development. This **MUST** be changed for production.

### Steps to Configure Production Email

1. Choose an email service provider:
   - SendGrid (recommended for beginners)
   - AWS SES (cost-effective at scale)
   - Mailgun
   - Postmark

2. Update `/backend/src/config/email.js`:
   - Replace the Ethereal test account creation with your production SMTP credentials
   - Use environment variables for SMTP settings:
     ```javascript
     const transporter = nodemailer.createTransport({
       host: process.env.SMTP_HOST,
       port: process.env.SMTP_PORT,
       auth: {
         user: process.env.SMTP_USER,
         pass: process.env.SMTP_PASS,
       },
     });
     ```

3. Add the new environment variables to `.env`:
   ```env
   SMTP_HOST=smtp.yourprovider.com
   SMTP_PORT=587
   SMTP_USER=your_smtp_username
   SMTP_PASS=your_smtp_password
   ```

4. Test password reset emails in production

## Security Checklist

- [ ] All environment variables are set with production values
- [ ] JWT secret is a strong, random string (at least 32 characters)
- [ ] MongoDB connection string uses authentication
- [ ] Email service is configured with production SMTP
- [ ] CLIENT_URL points to production frontend URL
- [ ] HTTPS is enabled on production server
- [ ] NODE_ENV is set to "production"
- [ ] Rate limiting is working (Upstash Redis configured)
- [ ] CORS is properly configured for production domain

## Post-Deployment Testing

1. Test user signup flow
2. Test login/logout
3. Test password reset email delivery
4. Test member CRUD operations
5. Verify rate limiting is working
6. Check that authentication is required for protected routes
7. Verify theme persistence
8. Test in both desktop and mobile browsers

## Monitoring Recommendations

Consider adding:
- Application monitoring (e.g., New Relic, Datadog)
- Error tracking (e.g., Sentry)
- Uptime monitoring (e.g., UptimeRobot, Pingdom)
- Log aggregation (e.g., LogDNA, Papertrail)

## Support

For issues or questions, please open an issue on the GitHub repository.
