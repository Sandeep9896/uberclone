import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const MAPBOX_BASE_URL = 'https://api.mapbox.com/geocoding/v5/mapbox.places';
const DIRECTIONS_BASE_URL = 'https://api.mapbox.com/directions/v5/mapbox/driving';

const API_KEY = process.env.MAPBOX_API_KEY || 'YOUR_MAPBOX_ACCESS_TOKEN'; // fallback

export const getCoordinatesService = async (address) => {
    try {
        const url = `${MAPBOX_BASE_URL}/${encodeURIComponent(address)}.json`;
        const response = await axios.get(url, {
            params: {
                access_token: API_KEY,
                limit: 1
            }
        });

        if (!response.data || !response.data.features || response.data.features.length === 0) {
            throw new Error('No coordinates found for the given address.');
        }

        const [lng, lat] = response.data.features[0].center;
        return { lng, lat };
    } catch (error) {
        console.error('Geocoding error:', error.response?.data || error.message);
        throw new Error('Error fetching coordinates: ' + error.message);
    }
};

export const getDistanceAndTimeService = async (origin, destination) => {
    try {
        // First check if we received strings (addresses) or coordinates
        let originCoords, destCoords;

        // If we received addresses, convert them to coordinates
        if (typeof origin === 'string') {
            originCoords = await getCoordinatesService(origin);
        } else {
            originCoords = origin; // Already coordinates object
        }

        if (typeof destination === 'string') {
            destCoords = await getCoordinatesService(destination);
        } else {
            destCoords = destination; // Already coordinates object
        }

        // Format coordinates properly for the API (longitude,latitude)
        const originStr = `${originCoords.lng},${originCoords.lat}`;
        const destStr = `${destCoords.lng},${destCoords.lat}`;
        
        // Build the correct URL with coordinates in longitude,latitude format
        const url = `${DIRECTIONS_BASE_URL}/${originStr};${destStr}`;
        
        console.log('Debug - Request URL:', url);

        const response = await axios.get(url, {
            params: {
                access_token: API_KEY,
                geometries: 'geojson',
                overview: 'full'
            }
        });

        if (!response.data || !response.data.routes || response.data.routes.length === 0) {
            throw new Error('No route found.');
        }

        const route = response.data.routes[0];
        const hours = Math.floor(route.duration / 3600);
        const minutes = Math.floor((route.duration % 3600) / 60);
        return {
            distance: route.distance, // meters
            duration: route.duration, // seconds
            distanceKm: (route.distance / 1000).toFixed(2) + ' km',
            durationFormatted: `${hours}h ${minutes}m`
        };
    } catch (error) {
        console.error('Routing error:', error.response?.data || error.message);
        console.error('Origin:', JSON.stringify(origin));
        console.error('Destination:', JSON.stringify(destination));
        throw new Error('Error fetching distance and time: ' + error.message);
    }
};
export const getSuggestionsService = async (query) => {
    try {
        const url = `${MAPBOX_BASE_URL}/${encodeURIComponent(query)}.json`;
        const response = await axios.get(url, {
            params: {
                access_token: API_KEY,
                limit: 20, // Limit to 5 suggestions
                 
            }
        });

        if (!response.data || !response.data.features || response.data.features.length === 0) {
            throw new Error('No suggestions found for the given query.');
        }

        return response.data.features.map(feature => ({
            name: feature.place_name,
            address: feature.place_name,
            coordinates: feature.center,
            
        }));
    } catch (error) {
        console.error('Suggestions error:', error.response?.data || error.message);
        throw new Error('Error fetching suggestions: ' + error.message);
    }
};
