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

export default router;