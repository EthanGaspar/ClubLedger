import mongoose from "mongoose"

const settingsSchema = new mongoose.Schema(
    {
        user_id: {
            type: String,
            required: true,
            unique: true
        },
        roles: {
            type: [String],
            default: ["Member", "Officer", "President", "Advisor", "Guest"]
        }
    }
);

const Settings = mongoose.model("Settings", settingsSchema);

export default Settings
