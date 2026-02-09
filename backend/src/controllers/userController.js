import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { sendPasswordResetEmail } from "../config/email.js";

const createToken = (_id) => {
    return jwt.sign({ _id: _id, }, process.env.SECRET_KEY_JWT, { expiresIn: "15m" });
}

// Cookie options
const cookieOptions = {
    httpOnly: true, // Prevents JavaScript access
    secure: process.env.NODE_ENV === "production", // HTTPS only in production
    sameSite: "strict", // CSRF protection
    maxAge: 15 * 60 * 1000, // 15 minutes in milliseconds
};

const loginUser = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);

        // Set token as HttpOnly cookie
        res.cookie("token", token, cookieOptions);

        res.status(200).json({message: "User logged in successfully", email, user});

    } catch (error) {
        console.error("Error in loginUser() in userController:", error);
        // Use generic error message to prevent email enumeration
        return res.status(400).json({error: "Invalid email or password"});
    }
}

const signupUser = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.signup(email, password);
        await user.save();

        const token = createToken(user._id);

        // Set token as HttpOnly cookie
        res.cookie("token", token, cookieOptions);

        res.status(201).json({message: "User signed up successfully", email, user});
    } catch (error) {
        console.error("Error in signupUser() in userController:", error);
        // Only expose validation errors for signup, but sanitize sensitive ones
        let errorMessage = "Signup failed. Please check your input.";
        if (error.message && !error.message.includes("email")) {
            errorMessage = error.message;
        }
        return res.status(400).json({error: errorMessage});
    }
}

const logoutUser = async (req, res) => {
    // Clear the token cookie
    res.cookie("token", "", {
        httpOnly: true,
        expires: new Date(0), // Expire immediately
    });
    res.status(200).json({ message: "Logged out successfully" });
}

const getMe = async (req, res) => {
    // req.user is set by requireAuth middleware
    try {
        const user = await User.findById(req.user._id).select("-password");
        res.status(200).json({ user });
    } catch (error) {
        console.error("Error in getMe() in userController:", error);
        return res.status(500).json({ error: "Failed to get user info" });
    }
}

const forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const rawToken = await User.requestPasswordReset(email);

        // Only send email if user was found, but ALWAYS return same response
        if (rawToken) {
            await sendPasswordResetEmail(email, rawToken);
        }

        res.status(200).json({
            message: "If an account with that email exists, a password reset link has been sent.",
        });
    } catch (error) {
        console.error("Error in forgotPassword() in userController:", error);
        return res.status(500).json({ error: "Something went wrong. Please try again." });
    }
};

const resetPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;
    try {
        await User.resetPassword(token, password);
        res.status(200).json({ message: "Password has been reset successfully." });
    } catch (error) {
        console.error("Error in resetPassword() in userController:", error);
        return res.status(400).json({ error: error.message });
    }
};

export { loginUser, signupUser, logoutUser, getMe, forgotPassword, resetPassword };
