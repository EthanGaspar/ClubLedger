//login user
import User from "../models/userModel.js"; 


const loginUser = async (req, res) => {
    res.json({message: "Login user endpoint"});  
}

//signup user
const signupUser = async (req, res) => {
    const {email, password} = req.body;
    try {
        //call signup to avoid duplicates and hash
        const user = await User.signup(email, password);
        await user.save();

        res.status(201).json({message: "User signed up successfully", email, user});
    } catch (error) {
        console.error("Error in signupUser() in userController:", error);
        return res.status(400).json({error:`Signup Failed: ${error.message}`});
    }
    res.json({message: "Signup user endpoint"});  
}

export { loginUser, signupUser };