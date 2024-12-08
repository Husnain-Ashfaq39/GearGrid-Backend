const express = require('express');
const multer = require('multer');
const productController = require('../Controller/productController'); // Import the controller
const auth = require('../middlewares/auth'); // Import auth middleware

const router = express.Router();

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

/**
 * Product Routes
 */

// POST /api/products/add-product
// Add a new product with image upload support (up to 10 images)
router.post('/add-product', upload.array('images', 10), productController.addProduct);

// GET /api/products/all
// Fetch all products with pagination
// Query Parameters:
// - page (optional): Page number (default: 1)
// - limit (optional): Items per page (default: 10)
// Example: /api/products/all?page=1&limit=20
router.get('/all', productController.getAllProducts);

// PUT /api/products/update/:id
// Update a product by ID
router.put('/update/:id',  productController.updateProduct);

// DELETE /api/products/delete/:id
// Delete a product by ID
router.delete('/delete/:id', productController.deleteProduct);

// Wishlist Routes (Protected with auth middleware)
router.post('/add-to-wishlist/:productId',  productController.addToWishlist);
router.delete('/remove-from-wishlist/:productId',  productController.removeFromWishlist);
router.get('/get-wishlist/:userId',  productController.getWishlistItems);

// GET /api/products/trending
// Get trending products based on order quantities
router.get('/trending', productController.getTrendingProducts);

// GET /api/products/top-rated
// Get highest rated products based on reviews
router.get('/top-rated', productController.getTopRatedProducts);

// GET /api/products/related/:id
// Get related products for a specific product
router.get('/related/:id', productController.getRelatedProducts);

// GET /api/products/:id
// Get a single product by ID
router.get('/:id', productController.getProductById);

module.exports = router;
