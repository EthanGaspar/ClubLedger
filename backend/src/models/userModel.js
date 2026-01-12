import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
);

//static signup method
userSchema.statics.signup = async function (email, password) {
    //validation
    if (!email || !password) {
        throw Error("All fields must be filled")
    }

    //length checks
    if (email.length > 128 || password.length > 64) {
        throw Error("Email or password too long")
    }

    if (!validator.isEmail(email)) {
        throw Error("Email is not valid")
    }
    //min length 8, 1 lowercase, 1 uppercase, 1 number, 1 symbol
    if (!validator.isStrongPassword(password)) {
        throw Error("Password not strong enough")
    }
    
    const emailExists = await this.findOne({ email })
    //no duplicates
    if (emailExists) {
         //potentialy add reset password option later
        throw Error("Email already in use")
    }
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ email: email, password: hash })

    return user
}

userSchema.statics.login = async function (email, password) {
    if (!email || !password){
        throw Error("All fields must be filled")
    }

    const user = await this.findOne({ email })

    if (!user){
        throw Error("Invalid Email")
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match){
        throw Error("Incorrect password")
    }

    return user
}

const User = mongoose.model("User", userSchema);

export default User;
