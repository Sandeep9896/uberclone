const captainModel = require('../models/captain.model');
const { validationResult } = require('express-validator');
const captainService = require('../services/captain.services');


module.exports.registerCaptain = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { fullname, email, password, vehicle,status } = req.body;

        // Check if the captain already exists
        const existingCaptain = await captainModel.findOne({ email });
        if (existingCaptain) {
            return res.status(400).json({ message: 'Captain already exists' });
        }

        // Create a new captain
        const captain = await captainService.createCaptain({
            fullname,
            email,
            password,
            vehicle,status
        });

        res.status(201).json({
            success: true,
            message: 'Captain registered successfully',
            captain
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message || 'Something went wrong!'
        });
    }
}

