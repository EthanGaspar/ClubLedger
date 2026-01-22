import { set } from "mongoose";
import Settings from "../models/Settings.js";

const DEFAULT_ROLES = ["Member", "Officer", "President", "Advisor", "Guest"];

export const getSettings = async (_, res) => {
    try {
        let settings = await Settings.findOne();

        if (!settings) {
            settings = new Settings({roles: DEFAULT_ROLES});
            await settings.save();
        }
        res.status(200).json(settings);

    } catch (error) {
        console.error("Error in getSetting() in settingsController:", error);
        res.status(500).json({message: "Internal Server Error"});
    }
}