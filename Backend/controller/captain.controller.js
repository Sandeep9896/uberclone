<<<<<<< HEAD
import captainModel from '../models/captain.model.js';
import { validationResult } from 'express-validator';
import blacklistTokenModel from '../models/blacklistToken.model.js';
import {createCaptain} from '../services/captain.services.js';


export const registerCaptain = async (req, res) => {
=======
const captainModel = require('../models/captain.model');
const { validationResult } = require('express-validator');
const blacklistTokenModel = require('../models/blacklistToken.model');
const captainService = require('../services/captain.services');


module.exports.registerCaptain = async (req, res) => {
>>>>>>> 45f6ed8015be2c9e3625d45edec2e9519015f56b
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { fullname, email, password, vehicle,status } = req.body;

        // Check if the captain already exists
        const existingCaptain = await captainModel.findOne({ email });
        if (existingCaptain) {
            return res.status(400).json({ message: 'Captain already exists' });
        }
        
        const hashedPassword = await captainModel.hashPassword(password);
        // Create a new captain
<<<<<<< HEAD
        const captain = await createCaptain({
=======
        const captain = await captainService.createCaptain({
>>>>>>> 45f6ed8015be2c9e3625d45edec2e9519015f56b
            fullname,
            email,
            password: hashedPassword,
            vehicle,status
        });

        res.status(201).json({
            success: true,
            message: 'Captain registered successfully',
            captain
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message || 'Something went wrong!'
        });
    }
}

<<<<<<< HEAD
export const loginCaptain = async (req, res) => {
=======
module.exports.loginCaptain = async (req, res) => {
>>>>>>> 45f6ed8015be2c9e3625d45edec2e9519015f56b
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        // Find the captain by email
        const captain = await captainModel.findOne({ email }).select('+password');
        if (!captain) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Compare the password
        const isMatch = await captain.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate a token (if needed)
        const token = await captain.generateAuthToken();
        // Set the token in a cookie (optional)
        res.cookie('token', token);

        res.status(200).json({
            success: true,
            message: 'Captain logged in successfully',
            captain,
            token
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message || 'Something went wrong!'
        });
    }
}
<<<<<<< HEAD
export const getCaptainProfile = async (req, res) => {
=======
module.exports.getCaptainProfile = async (req, res) => {
>>>>>>> 45f6ed8015be2c9e3625d45edec2e9519015f56b
    try {
        const captain = req.captain; // Assuming the captain is set in the middleware
        res.status(200).json({
            success: true,
            message: 'Captain profile retrieved successfully',
            captain
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message || 'Something went wrong!'
        });
    }
}
<<<<<<< HEAD
export const logoutCaptain = async (req, res) => {
=======
module.exports.logoutCaptain = async (req, res) => {
>>>>>>> 45f6ed8015be2c9e3625d45edec2e9519015f56b
     const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
         if (!token) {
              return res.status(401).json({ message: "Unauthorized access" });
         }
    
         // Add the token to the blacklist
       await blacklistTokenModel.create({ token });
    
         // Clear the cookie
         res.clearCookie('token');
    
         return res.status(200).json({ message: 'Logged out successfully' });
}