import express from 'express';
import * as authMiddleware from '../middleware/auth.middleware.js';
import * as mapController from '../controller/map.controller.js';
import { query } from 'express-validator';

const router = express.Router();

router.get('/get-coordinates', [
    query('address').notEmpty().withMessage('Address is required')
], mapController.getcordinate);

router.get('/get-distance-time',authMiddleware.authUser, [
    query('origin').notEmpty().withMessage('Origin is required'),
    query('destination').notEmpty().withMessage('Destination is required')
], mapController.getDistanceTime);

router.get('/get-suggestions', authMiddleware.authUser, [
    query('input').notEmpty().withMessage('Query is required')
],mapController.getSuggestions);

export default router;