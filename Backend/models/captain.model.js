import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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
    },
    earnings: {
        type: Number,
        default: 0, // Default earnings to 0
    },
    hoursOnline: {
        type: Number,
        default: 0, // Default hours online to 0
    },
    rating: {
        type: Number,
        default: 0, // Default rating to 0
    },
    distanceCovered: {
        type: Number,
        default: 0, // Default distance covered to 0
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
export default captainModel;
