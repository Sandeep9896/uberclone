const express=require('express');
const captainController=require('../controller/captain.controller');
const { body } = require('express-validator');
const router=express.Router();




router.post('/register', [
    body('email').isEmail().withMessage('Invalid email format'),
    body('fullname.firstname').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('vehicle.color').isLength({ min: 3 }).withMessage('Color must be at least 3 characters long'),
    body('vehicle.plate').isLength({ min: 3 }).withMessage('Plate must be at least 3 characters long'),
    body('vehicle.capacity').isInt({ min: 1 }).withMessage('Capacity must be a positive integer'),
    body('vehicle.vechileType').isIn(['car', 'bike', 'auto']).withMessage('Invalid vehicle type'),
], captainController.registerCaptain);



module.exports = router;