/**
 * Express Server Entry Point
 * 
 * Main server file that configures and starts the Express application.
 * Features:
 * - MongoDB connection with Mongoose
 * - CORS configuration for frontend communication
 * - Cookie parsing middleware
 * - JSON body parsing
 * - Authentication routes
 */

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

// Environment variables
const { MONGODB_URL, PORT } = process.env;
const authRoute = require('./Routes/AuthRoute');

const app = express();
const port = PORT || 4000;

// MongoDB connection with error handling
mongoose.connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    })
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection error:', err)
);

// CORS configuration - Allow frontend to communicate with backend
app.use(cors({
    origin: 'http://localhost:3000', // Frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

// Middleware setup
app.use(cookieParser()); // Parse cookies from requests
app.use(express.json()); // Parse JSON request bodies

// Routes
app.use("/", authRoute);

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});