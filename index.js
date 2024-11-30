const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./config/dbconfig');
const authRoutes = require('./routes/authRoutes');

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(express.json()); // Parse incoming JSON requests

// Apply Routes
app.use('/api/auth', authRoutes);






const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
