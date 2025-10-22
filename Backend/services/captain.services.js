import captainModel from '../models/captain.model.js';

export const createCaptain = async ({
    fullname,
    email,
    password,
    vehicle,
    status
}) => {
    if (!fullname || !email || !password || !vehicle) {
        throw new Error('All fields are required');
    }

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
