import express from 'express';
import { signupUser, loginUser, logoutUser, getMe } from '../controllers/userController.js';
import requireAuth from '../middleware/requireAuth.js';

const router = express.Router();

// Public routes
router.post('/login', loginUser);
router.post('/signup', signupUser);
router.post('/logout', logoutUser);

// Protected routes
router.get('/me', requireAuth, getMe);

export default router;
