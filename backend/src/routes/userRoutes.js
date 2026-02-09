import express from 'express';
import { signupUser, loginUser, logoutUser, getMe, forgotPassword, resetPassword } from '../controllers/userController.js';
import requireAuth from '../middleware/requireAuth.js';

const router = express.Router();

// Public routes
router.post('/login', loginUser);
router.post('/signup', signupUser);
router.post('/logout', logoutUser);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);

// Protected routes
router.get('/me', requireAuth, getMe);

export default router;
