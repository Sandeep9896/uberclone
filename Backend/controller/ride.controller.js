import { validationResult } from 'express-validator';
import { createRideService, confirmRideService } from '../services/ride.services.js';
import { getFare } from '../services/ride.services.js';
import { getCaptainwithinRadiusService, getCoordinatesService } from '../services/map.service.js';
import { sendMessageToSocket } from '../socketIO.js';
import Ridemodel from '../models/ride.model.js';

export const createRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // Check if user is authenticated
        if (!req.user || !req.user._id) {
            return res.status(401).json({
                success: false,
                message: 'User not authenticated or user ID not available'
            });
        }

        const { pickupLocation, dropLocation, vehicleType } = req.body;
        const userID = req.user._id;
        const ride = await createRideService(pickupLocation, dropLocation, userID, vehicleType);

        res.status(201).json({
            success: true,
            ride
        });
        const pickupCoords = await getCoordinatesService(pickupLocation);
        console.log("Pickup Coordinates:", pickupCoords);

        const captainsInRadius = await getCaptainwithinRadiusService(pickupCoords.lat, pickupCoords.lng, 1000); // Assuming 10 km radius
         
        ride.otp=null; // Remove OTP from the response

        const rideWithUser= await Ridemodel.findOne({_id: ride._id}).populate('user');

        captainsInRadius.map( async(captain) => {
            console.log(`Captain ${captain.name} found within radius:`, captain.location);
            // Here you can emit a socket event to notify the captain about the new ride
            sendMessageToSocket(captain.socketId, 'new-ride',  rideWithUser);
        });

    } catch (error) {
        console.error('Create ride error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Something went wrong!'
        });
    }
}

export const getFares = async (req, res) => {
    const errors = validationResult(req);
     const { pickupLocation, dropLocation } = req.query;
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    if (!pickupLocation || !dropLocation) {
        throw new Error('Pickup location and drop location are required');
    }

   try {
        
        const fare = await getFare(pickupLocation, dropLocation);
        return res.status(200).json({ fare });
    } catch (error) {
        throw new Error('Error fetching fare: ' + error.message);
    }

}

export const confirmRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {

        const ride = await confirmRideService(req.body.rideId, req.body.captainId);
        res.status(200).json({
            success: true,
            ride
        });


        // Notify the user that their ride has been accepted
        sendMessageToSocket(ride.user.socketId, 'confirm-ride', ride);

    } catch (error) {
        console.error('Confirm ride error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Something went wrong!'
        });
    }
}

export const getAvailableRides = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const rides = await Ridemodel.find({ status: 'pending' });
        res.status(200).json({
            success: true,
            rides
        });
            socket.emit('AvailableRides', rides);

    } catch (error) {
        console.error('Get available rides error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Something went wrong!'
        });
    }
}