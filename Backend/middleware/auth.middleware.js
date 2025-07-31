<<<<<<< HEAD
import userModel from '../models/user.models.js';
import jwt from 'jsonwebtoken';
import blacklistTokenModel from '../models/blacklistToken.model.js';
import captainModel from '../models/captain.model.js';


export const authUser = async(req, res, next)=> {
=======
const userModel = require('../models/user.models');
const jwt = require('jsonwebtoken');
const blacklistTokenModel = require('../models/blacklistToken.model');
const captainModel = require('../models/captain.model');


module.exports.authUser = async(req, res, next)=> {
>>>>>>> 45f6ed8015be2c9e3625d45edec2e9519015f56b

    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized access" });
    }
   
    // Check if the token is blacklisted
     const isBlacklisted = await blacklistTokenModel.findOne({ token:token });
     if (isBlacklisted) {
         return res.status(401).json({ message: "Token is blacklisted" });
     }


    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);
        console.log("Authenticated user:", user,decoded._id);
        req.user = user;
        return next();
    }
    catch (error) {
        console.error("Authentication error:", error);
        return res.status(401).json({ message: "Invalid token" });
    }

}
<<<<<<< HEAD
export const authCaptain = async(req, res, next)=> {
=======
module.exports.authCaptain = async(req, res, next)=> {
>>>>>>> 45f6ed8015be2c9e3625d45edec2e9519015f56b

    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized access" });
    }
   
    // Check if the token is blacklisted
     const isBlacklisted = await blacklistTokenModel.findOne({ token:token });
     if (isBlacklisted) {
         return res.status(401).json({ message: "Token is blacklisted" });
     }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const captain = await captainModel.findById(decoded._id);
        console.log("Authenticated captain:", captain,decoded._id);
        req.captain = captain;
        return next();
    }
    catch (error) {
        console.error("Authentication error:", error);
        return res.status(401).json({ message: "Invalid token" });
    }

}