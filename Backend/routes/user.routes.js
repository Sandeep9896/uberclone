import express from 'express';
import { body } from 'express-validator';
import * as userController from '../controller/user.controller.js';
import * as authMiddleware from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/register', [
    body('email').isEmail().withMessage('Invalid email format'),
    body('fullname.firstname').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
], userController.registerUser);

router.post('/login', [
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
], userController.loginUser);

router.get('/profile', authMiddleware.authUser, userController.getUserProfile);
router.get('/logout', authMiddleware.authUser, userController.logoutUser);
router.get('/auth', authMiddleware.authUser, userController.auth);

export default router;
