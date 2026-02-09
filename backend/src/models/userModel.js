import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";
import crypto from "crypto";

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
        },
        resetPasswordToken: {
            type: String,
            default: null
        },
        resetPasswordExpires: {
            type: Date,
            default: null
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

//static request password reset method
userSchema.statics.requestPasswordReset = async function (email) {
    if (!email) {
        throw Error("Email is required")
    }

    const user = await this.findOne({ email })

    // Return null if user not found (don't reveal whether email exists)
    if (!user) {
        return null
    }

    // Generate 32-byte random token
    const rawToken = crypto.randomBytes(32).toString("hex")

    // Hash with SHA-256 before storing
    const hashedToken = crypto.createHash("sha256").update(rawToken).digest("hex")

    user.resetPasswordToken = hashedToken
    user.resetPasswordExpires = new Date(Date.now() + 15 * 60 * 1000) // 15 minutes
    await user.save()

    return rawToken
}

//static reset password method
userSchema.statics.resetPassword = async function (token, newPassword) {
    if (!token || !newPassword) {
        throw Error("Token and new password are required")
    }

    // Hash the incoming token to compare against stored hash
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex")

    const user = await this.findOne({
        resetPasswordToken: hashedToken,
        resetPasswordExpires: { $gt: new Date() }
    })

    if (!user) {
        throw Error("Invalid or expired reset token")
    }

    // Validate new password with same rules as signup
    if (newPassword.length > 64) {
        throw Error("Password too long")
    }
    if (!validator.isStrongPassword(newPassword)) {
        throw Error("Password not strong enough")
    }

    // Hash and save new password
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(newPassword, salt)

    // Clear reset token fields (single-use)
    user.resetPasswordToken = null
    user.resetPasswordExpires = null

    await user.save()
    return user
}

const User = mongoose.model("User", userSchema);

export default User;
