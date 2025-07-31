import { validationResult } from 'express-validator';
import { createRideService } from '../services/ride.services.js';
import { getFare } from '../services/ride.services.js';

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
