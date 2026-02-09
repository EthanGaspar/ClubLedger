import nodemailer from "nodemailer";

let transporter;

const getTransporter = async () => {
    if (transporter) return transporter;

    // Create Ethereal test account (fake SMTP for development)
    const testAccount = await nodemailer.createTestAccount();

    transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        auth: {
            user: testAccount.user,
            pass: testAccount.pass,
        },
    });

    return transporter;
};

export const sendPasswordResetEmail = async (toEmail, resetToken) => {
    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
    const transport = await getTransporter();

    const mailOptions = {
        from: '"RollCall" <noreply@rollcall.dev>',
        to: toEmail,
        subject: "Reset Your Password - RollCall",
        html: `
            <h2>Password Reset Request</h2>
            <p>You requested a password reset for your RollCall account.</p>
            <p>Click the link below to reset your password. This link expires in 15 minutes.</p>
            <a href="${resetUrl}">${resetUrl}</a>
            <p>If you didn't request this, you can safely ignore this email.</p>
        `,
    };

    const info = await transport.sendMail(mailOptions);

    // Log the Ethereal preview URL so you can view the email in the browser
    console.log("Preview URL:", nodemailer.getTestMessageUrl(info));
};
