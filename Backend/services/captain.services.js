<<<<<<< HEAD
import captainModel from '../models/captain.model.js';

export const createCaptain = async ({
=======
const captainModel = require('../models/captain.model');

module.exports.createCaptain = async ({
>>>>>>> 45f6ed8015be2c9e3625d45edec2e9519015f56b
    fullname,
    email,
    password,
    vehicle,
    status
}) => {
    if (!fullname || !email || !password || !vehicle) {
        throw new Error('All fields are required');
    }

<<<<<<< HEAD
=======

>>>>>>> 45f6ed8015be2c9e3625d45edec2e9519015f56b
    const captain = await captainModel.create({
        fullname: {
            firstname: fullname.firstname,
            lastname: fullname.lastname
        },
        email,
        password,
        vehicle,
        status: status || 'inactive' // Default status to 'inactive' if not provided
    });

    return captain;
}
