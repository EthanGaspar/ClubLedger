import Settings from "../models/SettingsModel.js";
import Member from "../models/MemberModel.js";
import { MAX_ROLES, MAX_ROLE_LENGTH } from "../constants.js";

const DEFAULT_ROLES = ["Member", "Officer", "President", "Advisor", "Guest"];

// Validate a roles array
const validateRolesArray = (roles) => {
    if (!Array.isArray(roles)) {
        return "Roles must be an array";
    }
    if (roles.length === 0) {
        return "At least one role is required";
    }
    if (roles.length > MAX_ROLES) {
        return `Maximum of ${MAX_ROLES} roles allowed`;
    }
    for (const role of roles) {
        if (typeof role !== "string" || role.trim().length === 0) {
            return "Role names cannot be empty";
        }
        if (role.trim().length > MAX_ROLE_LENGTH) {
            return `Role names must be ${MAX_ROLE_LENGTH} characters or fewer`;
        }
    }
    // Check for case-insensitive duplicates
    const lowerRoles = roles.map(r => r.trim().toLowerCase());
    const uniqueRoles = new Set(lowerRoles);
    if (uniqueRoles.size !== lowerRoles.length) {
        return "Duplicate role names are not allowed";
    }
    return null;
};

export const getSettings = async (req, res) => {
    try {
        const user_id = req.user._id;
        let settings = await Settings.findOne({ user_id });

        if (!settings) {
            settings = new Settings({ user_id, roles: DEFAULT_ROLES });
            await settings.save();
        }
        res.status(200).json(settings);
    } catch (error) {
        console.error("Error in getSettings:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const updateRoles = async (req, res) => {
    try {
        const user_id = req.user._id;
        const { roles } = req.body;

        const validationError = validateRolesArray(roles);
        if (validationError) {
            return res.status(400).json({ message: validationError });
        }

        const trimmedRoles = roles.map(r => r.trim());

        const settings = await Settings.findOneAndUpdate(
            { user_id },
            { roles: trimmedRoles },
            { new: true, upsert: true }
        );

        res.status(200).json(settings);
    } catch (error) {
        console.error("Error in updateRoles:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const renameRole = async (req, res) => {
    try {
        const user_id = req.user._id;
        const { oldName, newName } = req.body;

        if (!oldName || !newName || newName.trim().length === 0) {
            return res.status(400).json({ message: "Old name and new name are required" });
        }

        const trimmedNew = newName.trim();

        if (trimmedNew.length > MAX_ROLE_LENGTH) {
            return res.status(400).json({ message: `Role names must be ${MAX_ROLE_LENGTH} characters or fewer` });
        }

        const settings = await Settings.findOne({ user_id });
        if (!settings) {
            return res.status(404).json({ message: "Settings not found" });
        }

        const roleIndex = settings.roles.indexOf(oldName);
        if (roleIndex === -1) {
            return res.status(400).json({ message: `Role "${oldName}" not found` });
        }

        // Check for case-insensitive duplicate (excluding the old name)
        const isDuplicate = settings.roles.some(
            (r, i) => i !== roleIndex && r.toLowerCase() === trimmedNew.toLowerCase()
        );
        if (isDuplicate) {
            return res.status(400).json({ message: `Role "${trimmedNew}" already exists` });
        }

        // Update the role in settings
        settings.roles[roleIndex] = trimmedNew;
        await settings.save();

        // Bulk update all members with the old role name
        const result = await Member.updateMany(
            { user_id, role: oldName },
            { role: trimmedNew }
        );

        res.status(200).json({
            settings,
            membersUpdated: result.modifiedCount
        });
    } catch (error) {
        console.error("Error in renameRole:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const deleteRole = async (req, res) => {
    try {
        const user_id = req.user._id;
        const { roleName } = req.body;

        if (!roleName) {
            return res.status(400).json({ message: "Role name is required" });
        }

        const settings = await Settings.findOne({ user_id });
        if (!settings) {
            return res.status(404).json({ message: "Settings not found" });
        }

        if (!settings.roles.includes(roleName)) {
            return res.status(400).json({ message: `Role "${roleName}" not found` });
        }

        if (settings.roles.length <= 1) {
            return res.status(400).json({ message: "Cannot delete the last role" });
        }

        // Remove the role from settings
        settings.roles = settings.roles.filter(r => r !== roleName);
        await settings.save();

        // Clear role from affected members
        const result = await Member.updateMany(
            { user_id, role: roleName },
            { role: "" }
        );

        res.status(200).json({
            settings,
            membersAffected: result.modifiedCount
        });
    } catch (error) {
        console.error("Error in deleteRole:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const getRoleMemberCount = async (req, res) => {
    try {
        const user_id = req.user._id;
        const { roleName } = req.query;

        if (!roleName) {
            return res.status(400).json({ message: "roleName query parameter is required" });
        }

        const count = await Member.countDocuments({ user_id, role: roleName });
        res.status(200).json({ count });
    } catch (error) {
        console.error("Error in getRoleMemberCount:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
