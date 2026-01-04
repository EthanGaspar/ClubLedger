require("dotenv").config()

const mongoose = require("mongoose");
const connectDB = async () => {
    try {
        const uri = process.env.MONGO_URI
        await mongoose.connect(uri)
        console.log("MONGODB CONNECTED SUCCESSFULLY")
    } catch (error) {
        console.error("UNABLE CONNECT TO MONGODB", error)
        process.exit(1) //1 specifies a  failure
    }
}

module.exports = connectDB