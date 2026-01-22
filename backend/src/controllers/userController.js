//login user
import User from "../models/userModel.js"; 
import jwt from "jsonwebtoken";

const createToken = (_id) => {
    return jwt.sign({ _id: _id, }, process.env.SECRET_KEY_JWT, { expiresIn: "15m" });
}


const loginUser = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.status(200).json({message: "User logged in successfully", email, user, token});

    } catch (error) {
        console.error("Error in loginUser() in userController:", error);
        return res.status(400).json({error:`Login Failed: ${error.message}`});
    }
}

//signup user
const signupUser = async (req, res) => {
    const {email, password} = req.body;
    try {
        //call signup to avoid duplicates and hash
        const user = await User.signup(email, password);
        await user.save();

        const token = createToken(user._id);

        res.status(201).json({message: "User signed up successfully", email, user, token});
    } catch (error) {
        console.error("Error in signupUser() in userController:", error);
        return res.status(400).json({error:`Signup Failed: ${error.message}`});
    } 
}

export { loginUser, signupUser };