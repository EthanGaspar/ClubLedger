import express from "express"
import { MAX_MEMBERS_PER_ACCOUNT, MAX_USERS, MAX_ROLES, MAX_ROLE_LENGTH, MAX_NAME_LENGTH } from "../constants.js"

const router = express.Router();

router.get("/", (req, res) => {
    res.json({
        MAX_MEMBERS_PER_ACCOUNT,
        MAX_USERS,
        MAX_ROLES,
        MAX_ROLE_LENGTH,
        MAX_NAME_LENGTH,
    })
})

export default router
