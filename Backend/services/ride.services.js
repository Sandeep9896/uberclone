import Ridemodel from "../models/ride.model.js";
import * as map from '../services/map.service.js';
import crypto, { verify } from 'crypto';
// Assuming you have a map service for fare calculation
export const getFare = async (pickupLocation, dropLocation) => {
    if (!pickupLocation || !dropLocation) {
        throw new Error('Pickup location and drop location are required');
    }
    const { distance, duration } = await map.getDistanceAndTimeService(pickupLocation, dropLocation);
    console.log("Data from map service:",  distance, duration );
    if (distance === undefined || duration === undefined) {
        throw new Error('Unable to calculate distance and time');
    }

    const baseFare = {
        auto: 20,
        bike: 10,
        car: 30
    }
    const farePerKm = {
        auto: 10,
        bike: 5,
        car: 15
    };
    const farePerMinute = {
        auto: 2,
        bike: 1,
        car: 3
    };

    const fare = {
        auto: Number((baseFare.auto + (farePerKm.auto * (distance / 1000)) + (farePerMinute.auto * (duration / 60))).toFixed(2)),
        bike: Number((baseFare.bike + (farePerKm.bike * (distance / 1000)) + (farePerMinute.bike * (duration / 60))).toFixed(2)),
        car: Number((baseFare.car + (farePerKm.car * (distance / 1000)) + (farePerMinute.car * (duration / 60))).toFixed(2))
    }
    return fare;
}

//generate otp function using by crypto 

export const generateOTP = async (num) => {
    const otp =  crypto.randomInt(Math.pow(10, num-1), Math.pow(10, num)-1);
    return otp;
};

export const createRideService = async (pickupLocation, dropLocation, userId, vechileType ) => {
    console.log("Creating ride with pickup:", pickupLocation, "drop:", dropLocation, "userId:", userId, "vehicleType:", vechileType);


    try {
        if (!pickupLocation || !dropLocation || !userId || !vechileType ) {
            throw new Error('Pickup location, drop location, user ID, and vehicle type are required');
        }

        const fare = await getFare(pickupLocation, dropLocation);
        console.log("Fare:", fare, vechileType );
        const otp = await generateOTP(6);
        console.log('Generated OTP:', otp);

        const newRide =  Ridemodel.create({
            pickupLocation,
            dropLocation,
            userId,
            fare: fare[vechileType ],
            otp,
            vehicleType: vechileType,
        });
        return newRide;
    } catch (error) {
       
        throw new Error('Error creating ride: ' + error.message);
    }
}