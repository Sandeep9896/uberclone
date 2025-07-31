import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const rideSchema = new mongoose.Schema({
    pickupLocation: {
        type: String,
        required: true
    },
    dropLocation: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    captain: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'captain',

    },
    vehicleType: {
        type: String,
        enum: ['car', 'bike', 'auto'], // Define possible vehicle types
        required: true
    },
    fare: {
        type: Number,
        required: true,
        min: [0, 'Fare must be a positive number'] // Ensure fare is non-negative
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'completed', 'cancelled'], // Define possible statuses
        default: 'pending' // Default status
    },
    duration: {
        type: Number, //in seconds
      
        min: [0, 'Duration must be a positive number'] // Ensure duration is non-negative
    },
    distance: {
        type: Number, //in meter
       
        min: [0, 'Distance must be a positive number'] // Ensure distance is non-negative
    },
    paymentID: {
        type: String,
       
    },
    orderID: {
        type: String,
        
    },
    signature: {
        type: String,

    },
    otp:{
        type: Number,
        required: true,
        min: [100000, 'OTP must be a 6-digit number'], // Ensure OTP is a 6-digit number
        max: [999999, 'OTP must be a 6-digit number'] // Ensure OTP is a 6-digit number
    },
    createdAt: {
        type: Date,
        default: Date.now
        }
    });

const Ridemodel = mongoose.model('Ride', rideSchema);

export default Ridemodel;
