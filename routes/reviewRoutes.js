const express = require('express');
const reviewController = require('../Controller/reviewController');

const router = express.Router();

// Get all reviews (for debugging and admin purposes)
// GET /reviews/all
router.get('/all', reviewController.getAllReviews);

// Get reviews for a specific product
// GET /reviews/getReviews/:productId
router.get('/getReviews/:productId', reviewController.getReviewsByProductId);

// Create a new review
// POST /reviews/create
// Required body: { userId, productId, rating }
// Optional body: { review }
router.post('/create', reviewController.createReview);

// Define the route to delete a specific review by its ID
// The route is /deleteReview/:id, where :id is the review ID to be deleted
//router.delete('/deleteReview/:id', reviewController.deleteReviewById);

module.exports = router;
