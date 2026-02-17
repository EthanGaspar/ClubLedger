ClubLedger:

An attendance tracking and member managment platform.
Site URL: https://club-ledger.com/

Current features:
- Secured user model, each user has isolated and conifgurable role and member models.
- Each user can have up to 10 custom roles (50 chars per role).
- Account creation and login (email/pass based), reset password logic implemented via SendGrid.
- 9 React pages, 7 hooks and 1 context (for reflecting auth state), toasts, and light/dark mode.
- Limiting user creation to 100 users and 100 members per user account (will circle back to make app
more scalable if demand requires)

TODO:
- Add email verifcation for account creation to prevent DB being bloated with fake accounts.
- Add ability to upload forms for user model and allow users to complete forms on site.
- Add "organizations" model allowing multiple users to be apart of multiple organizations of members.
- Add events model to allow for member attendance tracking based on events.
- Add membership metrics section on homepage to get data-driven insights on attendance.
