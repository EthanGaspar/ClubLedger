import express from "express"
import {
    getAllMembers,
    getMemberById,
    createMember,
    updateMember,
    deleteMember
} from "../controllers/memberController.js"
import requireAuth from "../middleware/requireAuth.js"

const router = express.Router();

// Require authentication for all member routes
router.use(requireAuth);

router.get("/", getAllMembers)

router.get("/:id", getMemberById)

router.post("/", createMember)

router.put("/:id", updateMember)

router.delete("/:id", deleteMember)

export default router
