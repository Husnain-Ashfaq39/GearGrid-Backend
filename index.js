const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./config/dbconfig');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes'); // Import userRoutes
const auth = require('./middlewares/auth'); // Import auth middleware


const cors = require('cors');


// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(express.json()); // Parse incoming JSON requests

// Middleware to log incoming requests
app.use((req, res, next) => {
    console.log("Incoming request:", req.method, req.url);
    next();
});

app.use(cors({
    origin: '*',  // Allow requests from any origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Allow these HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization']  // Allow these headers
  }));


// Apply Routes
app.use('/api/auth', authRoutes);
app.use('/user',auth,userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
