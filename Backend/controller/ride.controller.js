import { validationResult } from 'express-validator';
import { createRideService, confirmRideService, startRideService, endRideService, liveRouteService } from '../services/ride.services.js';
import { getFare } from '../services/ride.services.js';
import { getCaptainwithinRadiusService, getCoordinatesService } from '../services/map.service.js';
import { sendMessage, sendMessageToSocket } from '../socketIO.js';
import Ridemodel from '../models/ride.model.js';
import captainModel from '../models/captain.model.js';


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

        const captainsInRadius = await getCaptainwithinRadiusService(pickupCoords.lat, pickupCoords.lng, 2000); // Assuming 500 meters radius

        ride.otp = null; // Remove OTP from the response

        const rideWithUser = await Ridemodel.findOne({ _id: ride._id }).populate('user');

        captainsInRadius.map(async (captain) => {
            console.log(`Captain ${captain.name} found within radius:`, captain.location);
            // Here you can emit a socket event to notify the captain about the new ride
            sendMessageToSocket(captain.socketId, 'new-ride', rideWithUser);
            
        });
        sendMessage("ride-notification", { count: 1 });

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
    const { userType, captainId } = req.body;
    console.log('Get available rides request body:', req.body);
    try {
        const captain = await captainModel.findById(captainId);
        const rides = await Ridemodel.find({ status: 'pending' }).populate('user');
        res.status(200).json({
            success: true,
            rides
        });
        sendMessageToSocket(captain.socketId, 'AvailableRides', rides);

    } catch (error) {
        console.error('Get available rides error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Something went wrong!'
        });
    }
}
export const startRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { rideId, otp } = req.query;
    try {
        const ride = await startRideService(rideId, otp);
        res.status(200).json({
            success: true,
            ride
        });

    } catch (error) {
        console.error('Start ride error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Something went wrong!'
        });
    }
}

export const endRide = async (req, res) => {
    console.log("Headers:", req.headers);
    console.log("Body:", req.body);
    console.log("Captain/User:", req.captain || req.user);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { rideId } = req.body;
    try {
        const ride = await endRideService(rideId, req.captain);
        res.status(200).json({
            success: true,
            ride
        });

        sendMessageToSocket(ride.user.socketId, 'ride-ended', ride);

    } catch (error) {
        console.error('End ride error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Something went wrong!'
        });
    }
}

export const liveRoute = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { rideId, captainId, dropLocation } = req.body;

    try {
        const ride = await liveRouteService(rideId, captainId, dropLocation);
        res.status(200).json({
            success: true,
            ride: ride.liveroute
        });
        sendMessageToSocket(ride.ride.user.socketId, 'live-route', { ride: ride.liveroute });

    } catch (error) {
        console.error('Live route error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Something went wrong!'
        });
    }
}