import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './db/db.js';
import userRoutes from './routes/user.routes.js';
import captainRoutes from './routes/captain.routes.js';
import mapRoutes from './routes/map.routes.js';
import rideRoutes from './routes/ride.route.js';
import paymentRoutes from './routes/payment.routes.js';

dotenv.config();
const app = express();

// Single CORS + preflight handler — FIRST
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin) {
    let ok = false;
    try {
      const { host } = new URL(origin);
      ok =
        host === 'localhost:5173' ||
        host === 'localhost:3000' ||
        /\.devtunnels\.ms$/i.test(host) ||
        /\.ngrok(-free)?\.app$/i.test(host);
    } catch {}
    if (ok) {
      res.header('Access-Control-Allow-Origin', origin);
      res.header('Vary', 'Origin');
      res.header('Access-Control-Allow-Credentials', 'true');
      res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');

      const reqHeaders = req.headers['access-control-request-headers'];
      // allow whatever the browser plans to send, plus our custom header
      const allow = reqHeaders
        ? `${reqHeaders}, ngrok-skip-browser-warning`
        : 'Authorization,Content-Type,ngrok-skip-browser-warning';
      res.header('Access-Control-Allow-Headers', allow);
    }
  }
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Connect to the database
connectDB();

// Routes
app.get('/', (req, res) => {
    res.send('Hello World');
});
app.use('/api/users', userRoutes);
app.use('/api/captains', captainRoutes);
app.use('/api/maps', mapRoutes);
app.use('/api/rides', rideRoutes);
app.use('/api/payment', paymentRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: err.message || 'Something went wrong!'
    });
});


export default app;
// This is the main application file for the Express.js server.