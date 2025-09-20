import {getCoordinatesService,getDistanceAndTimeService,getSuggestionsService} from '../services/map.service.js';
import { validationResult } from 'express-validator';

export const getcordinate = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    console.log('Coordinates request body:', req.body);
    

    try {
        // if (!req.body || !req.body.address) {
        //     return res.status(400).json({ message: 'Address is required' });
        // }
        const { address } = req.query;
        const coordinates = await getCoordinatesService(address);
        res.status(200).json({
            success: true,
            coordinates
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message || 'Something went wrong!'
        });
    }
};
export const getDistanceTime = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
  

    try {
        const { origin, destination } = req.query;
        const distanceAndTime = await getDistanceAndTimeService(origin, destination);
        res.status(200).json({
            success: true,
            distanceAndTime
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message || 'Something went wrong!'
        });
    }

}
export const getSuggestions = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { input, lng, lat } = req.query;
        console.log(lng,lat);
        // Assuming you have a service function to get suggestions
        const suggestions = await getSuggestionsService(input, lng, lat);
        // For now, just returning the input as a placeholder

        res.status(200).json({
            success: true,
            suggestions // Placeholder for actual suggestions
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message || 'Something went wrong!'
        });
    }

    
}
export const getcoords = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { address } = req.query;
        const coordinates = await getCoordinatesService(address);
        res.status(200).json({
            success: true,
            coordinates
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({  success: false, message: error.message || 'Something went wrong!' });   
    }
}