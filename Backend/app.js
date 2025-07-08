const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const cookies = require('cookie-parser');

app.use(cookies()); // Use cookie-parser middleware to parse cookies

// Middleware
app.use(cors(
    {
        origin: process.env.CORS_ORIGIN || 'http://localhost:3000', // Default to localhost if not set
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true // Allow credentials if needed
    }
));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const connectDB = require('./db/db');
const userRoutes = require('./routes/user.routes');

// Connect to the database
connectDB();

// Routes
app.get('/', (req, res) => {
    res.send('Hello World');
});
app.use('/api/users', userRoutes); // Changed the path to include 'api'

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: err.message || 'Something went wrong!'
    });
});

module.exports = app;
// This is the main application file for the Express.js server.