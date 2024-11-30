const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./config/dbconfig');

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(express.json()); // Parse incoming JSON requests






const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
