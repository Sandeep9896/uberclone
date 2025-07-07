const express=require('express');
const router=express.Router();
const {body}= require("express-validator");
const userController=require('../controller/user.controller');

router.post('/register',[
    body('email').isEmail().withMessage('Invalid email format'),
    body('fullname.firstname').isLength({min:3}).withMessage('First name must be at least 3 characters long'),
    body('password').isLength({min:6}).withMessage('Password must be at least 6 characters long'),
],userController.registerUser);

router.get('/login',(req,res)=>{
    res.send('Login route not implemented yet');
})





module.exports=router;// This code sets up an Express.js router for user-related routes. It imports the necessary modules and