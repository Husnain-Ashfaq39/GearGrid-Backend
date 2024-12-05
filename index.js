const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const connectDB = require('./config/dbconfig');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes'); // Import userRoutes
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const auth = require('./middlewares/auth'); // Import auth middleware
const cors = require('cors');
const cloudinaryRoutes= require('./routes/cloudinaryRoutes')
const generalDataRoutes= require('./routes/generalDataRoutes')
const subscriberRoutes = require('./routes/subscriberRoutes'); // Import the subscriber routes
const contactUsRoutes = require('./routes/contactUsRoutes');
const reviewRoutes = require('./routes/reviewRoutes');


// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();
// Enable CORS for all origins
app.use(cors({
    origin: '*',  // Allow requests from any origin
    methods: ['GET', 'POST', 'PUT', 'DELETE','PATCH'],  // Allow these HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization']  // Allow these headers
  }));
  
// Middleware
app.use(express.json()); // Parse incoming JSON requests

// Middleware to log incoming requests
app.use((req, res, next) => {
    console.log("Incoming request:", req.method, req.url);
    next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Apply Routes
app.use('/api/auth', authRoutes);
app.use('/categories', categoryRoutes);
app.use('/user',auth,userRoutes);
app.use('/cloudinary',cloudinaryRoutes);
app.use('/GeneralData',generalDataRoutes);
app.use('/api/products', productRoutes);
app.use('/subscribers', subscriberRoutes); // Use the subscriber routes
app.use('/contactus', contactUsRoutes);
app.use('/reviews', reviewRoutes); // Changed from /review to /reviews


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
