import express from "express"
import {
    getSettings,
    updateRoles,
    renameRole,
    deleteRole,
    getRoleMemberCount
} from "../controllers/settingsController.js"

import requireAuth from "../middleware/requireAuth.js"

const router = express.Router();

router.use(requireAuth)

router.get("/", getSettings)
router.put("/roles", updateRoles)
router.patch("/roles/rename", renameRole)
router.delete("/roles", deleteRole)
router.get("/roles/count", getRoleMemberCount)

export default router
