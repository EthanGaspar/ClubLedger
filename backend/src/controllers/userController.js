import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

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
        return res.status(400).json({error:`Login Failed: ${error.message}`});
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
        return res.status(400).json({error:`Signup Failed: ${error.message}`});
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

export { loginUser, signupUser, logoutUser, getMe };
