import mongoose from "mongoose"

const settingsSchema = new mongoose.Schema(
    {
        roles: {
            type: [String],
            default: ["Member", "Officer", "President", "Advisor", "Guest"]
        }
    }
);

const Settings = mongoose.model("Settings", settingsSchema);f 

export default Settings
