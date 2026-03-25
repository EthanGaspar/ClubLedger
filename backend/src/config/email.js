import sgMail from "@sendgrid/mail";

export const sendPasswordResetEmail = async (toEmail, resetToken) => {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    //issue of hardcoding localhost into resetURL??
    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

    //specify email
    const msg = {
        to: toEmail,
        from: process.env.SENDER_EMAIL,
        subject: "Reset Your Password - ClubLedger",
        html: `
            <h2>Password Reset Request</h2>
            <p>You requested a password reset for your ClubLedger account.</p>
            <p>Click the link below to reset your password. This link expires in 15 minutes.</p>
            <a href="${resetUrl}">${resetUrl}</a>
            <p>If you didn't request this, you can safely ignore this email.</p>
        `,
    };

    await sgMail.send(msg);
};
