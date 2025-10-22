import Ridemodel from "../models/ride.model.js";
import * as map from '../services/map.service.js';
import crypto, { verify } from 'crypto';
import { sendMessageToSocket } from "../socketIO.js";
// Assuming you have a map service for fare calculation
export const getFare = async (pickupLocation, dropLocation) => {
    if (!pickupLocation || !dropLocation) {
        throw new Error('Pickup location and drop location are required');
    }
    const { distance, duration } = await map.getDistanceAndTimeService(pickupLocation, dropLocation);
    console.log("vehicleTypee:", distance, duration);
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
    const otp = crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num) - 1);
    return otp;
};

export const createRideService = async (pickupLocation, dropLocation, userId, vehicleType) => {
    console.log("Creating ride with pickup:", pickupLocation, "drop:", dropLocation, "userId:", userId, "vehicleType:", vehicleType);
    const { distanceKm, durationFormatted,duration } = await map.getDistanceAndTimeService(pickupLocation, dropLocation);

    try {
        if (!pickupLocation || !dropLocation || !userId || !vehicleType) {
            throw new Error('Pickup location, drop location, user ID, and vehicle type are required');
        }

        const fare = await getFare(pickupLocation, dropLocation);
        console.log("Fare:", fare, vehicleType);
        const otp = await generateOTP(6);
        console.log('Generated OTP:', otp);

        const newRide = Ridemodel.create({
            pickupLocation,
            dropLocation,
            user: userId,
            fare: fare[vehicleType],
            otp,
            vehicleType: vehicleType,
            distance: distanceKm,
            duration: durationFormatted,
            durationInSeconds: duration
        });
        return newRide;
    } catch (error) {

        throw new Error('Error creating ride: ' + error.message);
    }
}

export const confirmRideService = async (rideId, captainId) => {
    try {
        if (!rideId || !captainId) {
            throw new Error('Ride ID and Captain ID are required');
        }

        await Ridemodel.findOneAndUpdate({ _id: rideId },
            { captain: captainId, status: 'accepted' });

        const ride = await Ridemodel.findById(rideId).populate('user').populate('captain');
        return ride;
    } catch (error) {
        throw new Error('Error confirming ride: ' + error.message);
    }
}
export const startRideService = async (rideId, otp) => {
    console.log("Starting ride with ID:", rideId, "and OTP:", otp);
    try {
        if (!rideId || !otp) {
            throw new Error('Ride ID and OTP are required');
        }

        // First fetch the ride without updating (to check OTP)
        const ride = await Ridemodel.findById(rideId);
        if (!ride) {
            throw new Error('Ride not found');
        }
        console.log("Ride found:", ride.otp);
        if (String(ride.otp) !== String(otp).trim()) {
            throw new Error('Invalid OTP');
        }

        // Update status and return updated ride with populated fields
        const updatedRide = await Ridemodel.findByIdAndUpdate(
            rideId,
            { status: 'ongoing' },
            { new: true } // returns the updated document
        ).populate('user').populate('captain');

        // Emit event with updated ride
        sendMessageToSocket(updatedRide.user.socketId, 'ride-started', updatedRide);

        return updatedRide;
    } catch (error) {
        throw new Error('Error starting ride: ' + error.message);
    }
};

export const endRideService = async (rideId,captain) => {
    try {
        if (!rideId && !captain) {
            throw new Error('Ride ID is required');
        }

        const ride = await Ridemodel.findOne({
            _id: rideId,
            captain: captain._id
        }).populate('user').populate('captain');

        if(!ride){
            throw new Error('Ride not found or you are not authorized to end this ride');
        }

        // Update ride status
        if(ride.status === 'ongoing'){
            ride.status = 'completed';
            await ride.save();
        }

        return ride;
    } catch (error) {
        throw new Error('Error ending ride: ' + error.message);
    }
};

export const liveRouteService = async (rideId, captain, dropLocation) => {
      console.log("Fetching live route for ride ID:", rideId, "and captain ID:", captain, "dropLocation:", dropLocation);
    try {
        if (!rideId || !captain || !dropLocation) {
            throw new Error('Ride ID, Captain, and Drop Location are required');
        }

        const ride = await Ridemodel.findById(rideId).populate('user').populate('captain');
        const captaincords = {
            lat: ride.captain.location.coordinates[1],
            lng: ride.captain.location.coordinates[0]
        };
        // const dropcoords = map.getCoordinatesService(dropLocation);
        const liveroute = await map.getDistanceAndTimeService(captaincords, dropLocation);
        if (!liveroute) {
            throw new Error('Route not found');
        }

        // Emit event with updated ride
        sendMessageToSocket(ride.user.socketId, 'live-route', liveroute);

        return {liveroute, ride};
    } catch (error) {
        throw new Error('Error fetching live route: ' + error.message);
    }
};