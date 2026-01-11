//login user
import User from "../models/userModel.js"; 


const loginUser = async (req, res) => {
    res.json({message: "Login user endpoint"});  
}

//signup user

const signupUser = async (req, res) => {
    res.json({message: "Signup user endpoint"});  
}

export { loginUser, signupUser };