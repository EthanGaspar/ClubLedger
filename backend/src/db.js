import "dotenv/config"
import mongoose from "mongoose"

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

export default connectDB
