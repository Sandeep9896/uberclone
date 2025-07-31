<<<<<<< HEAD
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
=======
const mongoose=require('mongoose');
const bcrypt =require('bcrypt');
const jwt = require('jsonwebtoken');
>>>>>>> 45f6ed8015be2c9e3625d45edec2e9519015f56b

const captainSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [3, 'First name must be at least 3 characters long'],
        },
        lastname: {
            type: String,
            minlength: [3, 'Last name must be at least 3 characters long'],
        },
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true, // Ensure email is stored in lowercase
        match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Please fill a valid email address'], // Validate email format
    },
    password: {
        type: String,
        required: true,
        select: false, // Exclude password from queries by default
        minlength: [6, 'Password must be at least 6 characters long'],
    },
    socketId: {
        type: String,
        default: null, // Default to null if not set
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'banned'], // Define possible statuses
        default: 'inactive', // Default status
    },
    vehicle:{
        color:{
            type: String,
            required: true,
            minlength: [3, 'Color must be at least 3 characters long'],
        },
        plate:{
            type: String,
            required: true,
            unique: true, // Ensure each plate is unique
            // match: [/^[A-Z0-9-]+$/, 'Please fill a valid vehicle plate'], // Validate plate format
        },
        capacity: {
            type: Number,
            required: true,
            min: [1, 'Capacity must be at least 1'], // Ensure capacity is a positive number
        },
        vechileType:{
            type: String,
            required: true,
            enum: ['car', 'bike', 'auto'], // Define possible vehicle types     
        },
        location:{
            lat:{
                type: Number,
            },
            lon:{
                type: Number,
            }
        }
    }
});

captainSchema.methods.generateAuthToken = async function () {
    const captain = this;
    const token = jwt.sign({ _id: captain._id.toString() }, process.env.JWT_SECRET, { expiresIn: '7d' });
    return token;
}
captainSchema.methods.comparePassword = async function (candidatePassword) {
    const captain = this;
    const isMatch = await bcrypt.compare(candidatePassword, captain.password);
    return isMatch;
}
captainSchema.statics.hashPassword = async function (password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
}

const captainModel = mongoose.model('captain', captainSchema);
<<<<<<< HEAD
export default captainModel;
=======
module.exports = captainModel;
>>>>>>> 45f6ed8015be2c9e3625d45edec2e9519015f56b
