import userModel from '../models/user.models.js';
import jwt from 'jsonwebtoken';
import blacklistTokenModel from '../models/blacklistToken.model.js';
import captainModel from '../models/captain.model.js';


export const authUser = async(req, res, next)=> {

    const token =req.headers.authorization?.split(' ')[1];
    console.log("Token from auth middleware:", req.headers.authorization);
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
export const authCaptain = async(req, res, next)=> {

    const token = req.headers.authorization?.split(' ')[1];
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