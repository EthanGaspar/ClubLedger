import express from "express"
import {
    getAllMembers,
    getMemberById,
    createMember,
    updateMember,
    deleteMember,
} from "../controllers/memberController.js"

import requireAuth from "../middleware/requireAuth.js"

//require auth for all member routes
const router = express.Router();

router.use(requireAuth)

router.get("/", getAllMembers)

router.get("/:id", getMemberById)

router.post("/", createMember)

router.put("/:id", updateMember)

router.delete("/:id", deleteMember)

export default router
