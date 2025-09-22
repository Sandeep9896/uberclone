import express from 'express';
import * as rideController from '../controller/ride.controller.js';
import * as authMiddleware from '../middleware/auth.middleware.js';
import { body, query } from 'express-validator';

const router = express.Router();

router.post('/create-ride', [
    authMiddleware.authUser,  // Make sure this is here!
    body('pickupLocation').notEmpty().withMessage('Pickup location is required'),
    body('dropLocation').notEmpty().withMessage('Drop location is required'),
    body('vehicleType').notEmpty().withMessage('Vehicle type is required'),
], rideController.createRide);

router.get('/get-fares',
    authMiddleware.authUser, [
    query('pickupLocation').notEmpty().withMessage('Pickup location is required'),
    query('dropLocation').notEmpty().withMessage('Drop location is required'),
], rideController.getFares);

router.post('/confirm',
    authMiddleware.authCaptain,
    body('rideId').notEmpty().withMessage('Ride ID is required'),
    body('captainId').notEmpty().withMessage('Captain ID is required'),
    rideController.confirmRide);

router.post('/available-rides',
    authMiddleware.authCaptain,
    rideController.getAvailableRides);

router.get('/start-ride',
    authMiddleware.authUser,
    query('rideId').notEmpty().withMessage('Ride ID is required'),
    query('otp').notEmpty().withMessage('OTP is required'),
    rideController.startRide);
router.post('/end-ride',
    authMiddleware.authCaptain,
    body('rideId').notEmpty().withMessage('Ride ID is required'),
    rideController.endRide);

router.post('/live-route',
        authMiddleware.authCaptain,
        body('rideId').notEmpty().withMessage('Ride ID is required'),
    rideController.liveRoute);

 router.post('/submit-rating',
    authMiddleware.authUser,
        body('rating').isFloat({ min: 0, max: 5 }).withMessage('Rating must be between 0 and 5'),
    rideController.submitRating);   

 router.post('/captain-update-stats',
        authMiddleware.authCaptain,
        // body('earnings').isFloat({ min: 0 }).withMessage('Earnings must be a positive number'),
        // body('distance').isFloat({ min: 0 }).withMessage('Distance must be a positive number'),
        // body('hoursOnline').isFloat({ min: 0 }).withMessage('Hours online must be a positive number'),
    rideController.updateCaptainStats);

export default router;