import { Server } from 'socket.io';
import userModel from './models/user.models.js';
import captainModel from './models/captain.model.js';
import Ridemodel from './models/ride.model.js';

'use strict';

/*
    Basic Socket.IO setup for a ride-hailing style backend.
    Usage:
        const httpServer = app.listen(PORT);
        initSocket(httpServer);
*/

let io = null;

export const initSocket = (httpServer, opts = {}) => {
    if (!httpServer) throw new Error('httpServer is required to init Socket.IO');
    if (io) return io;

    io = new Server(httpServer, {
        cors: {
            origin: opts.corsOrigin || '*',
            methods: ['GET', 'POST'],
            credentials: true,
        },
        path: opts.path || '/socket.io',
        ...opts.ioOptions,
    });

    io.on('connection', (socket) => {
        console.log(`Socket connected: ${socket.id}`);

        socket.on('disconnect', () => {
            console.log(`Socket disconnected: ${socket.id}`);
        });

        socket.on('join', async ({ userType, userId }) => {
            if (!userId || !userType) {
                console.error('Invalid join payload:', { userType, userId });
                socket.emit('join-error', { message: 'Invalid join payload' });
                return;
            }
            if (userType === 'user') {
                console.log(`User ${userId} joined as ${socket.id}`);
                try {
                    const user = await userModel.findByIdAndUpdate(
                        userId,
                        { $set: { socketId: socket.id } },
                        { new: true }
                    );
                    console.log('Updated user sockets:', user);
                    socket.emit('join-success', { userType: 'user', userId, socketId: socket.id });
                } catch (error) {
                    console.error('Error updating user sockets:', error);
                    socket.emit('join-error', { message: 'Failed to join', error: error.message });
                }
            } else if (userType === 'captain') {
                console.log(`Captain ${userId} joined as ${socket.id}`);
                try {
                    const captain = await captainModel.findByIdAndUpdate(
                        userId,
                        { $set: { socketId: socket.id } },
                        { new: true }
                    );

                    socket.emit('join-success', { userType: 'captain', userId, socketId: socket.id });

                    // Uncomment if you want to send pending rides
                    // const pendingRides = await Ridemodel.find({ status: 'pending' });
                    // socket.emit('AvailableRides', pendingRides);

                } catch (error) {
                    console.error('Error updating captain sockets:', error);
                    socket.emit('join-error', { message: 'Failed to join', error: error.message });
                }
            }
        });


        socket.on('update-location-user', async (data) => {
            console.log('Received update-location-user event:', data);

            const { userType, userId, location } = data;
            if (userType !== 'user' || !userId || !location || !location.lat || !location.lng) {
                console.error('Invalid update-location payload:', data);
                return;
            }

            const { lat, lng } = location;
            try {
                const user = await userModel.findByIdAndUpdate(
                    userId,
                    { $set: { location: { type: 'Point', coordinates: [lng, lat] } } },
                    { new: true }
                );
                console.log('Updated user location:', user);
            } catch (error) {
                console.error('Error updating user location:', error);
            }
        });
        socket.on('update-location-captain', async (data) => {
            console.log('Received update-location-captain event:', data);

            const { userType, userId, location } = data;
            if (userType !== 'captain' || !userId || !location || !location.lat || !location.lng) {
                console.error('Invalid update-location payload:', data);
                return;
            }

            const { lat, lng } = location;
            try {
                const captain = await captainModel.findByIdAndUpdate(
                    userId,
                    { $set: { location: { type: 'Point', coordinates: [lng, lat] } } },
                    { new: true }
                );
                console.log('Updated captain location:', captain);
            } catch (error) {
                console.error('Error updating captain location:', error);
            }
        });
        socket.on('payment_success', async (data) => {
            console.log('Received payment_success event:', data);
            // Handle payment success (e.g., update ride status, notify users)
            const { rideId } = data;
            if (!rideId) {
                console.error('Invalid payment_success payload:', data);
                return;
            }
            try {
                const ride = await Ridemodel.findByIdAndUpdate(
                    rideId,
                    { $set: { status: 'completed' } },
                    { new: true }
                ).populate('user').populate('captain');
                io.to(ride.user.socketId).emit('send_payment_success', ride);
                io.to(ride.captain.socketId).emit('send_payment_success', ride);
            } catch (error) {
                console.error('Error updating ride status:', error);
            }
        });
    });

        return io;
    };

    // Function to send a message to a specific socket ID
    export const sendMessageToSocket = (socketId, eventName, message) => {
        if (!io) {
            console.error("Socket.IO is not initialized");
            return;
        }
        io.to(socketId).emit(eventName, message);
        console.log(`Message sent to socket ${socketId}:`, { eventName, message });
    };
    // function to send message
    export const sendMessage = (eventName, message) => {
        if (!io) {
            console.error("Socket.IO is not initialized");
            return;
        }
        io.emit(eventName, message);
        console.log(`Message sent to all sockets:`, { eventName, message });
    };
