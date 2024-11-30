const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const connectDB = require('./config/dbconfig');
const productRoutes = require('./routes/product');
const cors = require('cors');
// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();
// Enable CORS for all origins
app.use(cors({
    origin: '*',  // Allow requests from any origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Allow these HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization']  // Allow these headers
  }));
// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/products', productRoutes);





const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
