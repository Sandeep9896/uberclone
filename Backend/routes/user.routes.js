<<<<<<< HEAD
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

export default router;
=======
const express=require('express');
const router=express.Router();
const {body}= require("express-validator");
const userController=require('../controller/user.controller');
const authMiddleware=require('../middleware/auth.middleware');

router.post('/register',[
    body('email').isEmail().withMessage('Invalid email format'),
    body('fullname.firstname').isLength({min:3}).withMessage('First name must be at least 3 characters long'),
    body('password').isLength({min:6}).withMessage('Password must be at least 6 characters long'),
],userController.registerUser);

router.post('/login',[
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').isLength({min:6}).withMessage('Password must be at least 6 characters long'),
],userController.loginUser);

router.get('/profile', authMiddleware.authUser, userController.getUserProfile);



router.get('/logout', authMiddleware.authUser, userController.logoutUser);



module.exports=router;// This code sets up an Express.js router for user-related routes. It imports the necessary modules and
>>>>>>> 45f6ed8015be2c9e3625d45edec2e9519015f56b
