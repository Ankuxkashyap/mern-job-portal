import express from 'express';
import {protect } from '../middlewares/authMiddleware.js'
const router = express.Router();
import { registerUser, loginUser,roleselction } from '../controllers/authController.js';

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/role-selection',protect,roleselction)

export default router; 