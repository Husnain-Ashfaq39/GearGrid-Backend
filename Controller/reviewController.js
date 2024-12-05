const Review = require('../models/Reviews');
const mongoose = require('mongoose');
const Product = require('../models/Products');

const getReviewsByProductId = async (req, res) => {
    try {
      console.log("Request params:", req.params);
      console.log("Request query:", req.query);
      console.log("Request path:", req.path);
      
      const { productId } = req.params;
      console.log("Product ID received:", productId);
  
      // Validate productId
      if (!productId) {
        console.log("No product ID provided");
        return res.status(400).json({ message: 'Product ID is required' });
      }

      // Validate if productId is a valid ObjectId
      if (!mongoose.Types.ObjectId.isValid(productId)) {
        console.log("Invalid ObjectId format:", productId);
        return res.status(400).json({ message: 'Invalid product ID format' });
      }
  
      // Fetch reviews with user data
      console.log("Attempting to find reviews for product:", productId);
      const reviews = await Review.find({ productId })
        .populate({
          path: 'userId',
          select: 'name profilePictureUrl',
          model: 'User',
        })
        .select('rating review createdAt');

      console.log("Found reviews:", reviews);
  
      if (!reviews || reviews.length === 0) {
        console.log("No reviews found for product:", productId);
        return res.status(200).json({ message: 'No reviews found for this product', reviews: [] });
      }

      // Format the response
      const response = reviews.map((review) => ({
        name: review.userId?.name || 'Anonymous',
        profilePictureUrl: review.userId?.profilePictureUrl || null,
        rating: review.rating,
        review: review.review,
        createdAt: review.createdAt,
      }));

      console.log("Formatted response:", response);
      res.status(200).json(response);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
};

// New function to get all reviews
const getAllReviews = async (req, res) => {
    try {
        console.log("Request params:", req.params);
        console.log("Request query:", req.query);
        console.log("Request path:", req.path);
        
        console.log("Fetching all reviews");
        
        // Fetch all reviews with user and product data
        console.log("Attempting to find all reviews");
        const reviews = await Review.find()
            .populate({
                path: 'userId',
                select: 'name profilePictureUrl',
                model: 'User',
            })
            .populate({
                path: 'productId',
                select: 'title images', 
                model: 'Products',
            })
            .select('rating review createdAt');

        console.log("Total reviews found:", reviews.length);

        if (!reviews || reviews.length === 0) {
            console.log("No reviews found");
            return res.status(200).json({ message: 'No reviews found', reviews: [] });
        }

        // Format the response with both user and product information
        const response = reviews.map((review) => ({
            reviewId: review._id,
            productInfo: {
                id: review.productId?._id,
                title: review.productId?.title || 'Unknown Product',
                image: review.productId?.images?.[0] || null,
            },
            userInfo: {
                name: review.userId?.name || 'Anonymous',
                profilePictureUrl: review.userId?.profilePictureUrl || null,
            },
            rating: review.rating,
            review: review.review,
            createdAt: review.createdAt,
        }));

        console.log("Formatted all reviews response");
        res.status(200).json(response);
    } catch (error) {
        console.error('Error fetching all reviews:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Create a new review
const createReview = async (req, res) => {
    try {
        console.log("Creating new review with data:", req.body);
        
        const { userId, productId, rating, review } = req.body;

        // Validate required fields
        if (!userId || !productId || !rating) {
            console.log("Missing required fields");
            return res.status(400).json({ 
                message: 'Missing required fields',
                required: ['userId', 'productId', 'rating']
            });
        }

        // Validate rating range
        if (rating < 1 || rating > 5) {
            console.log("Invalid rating value:", rating);
            return res.status(400).json({ 
                message: 'Rating must be between 1 and 5' 
            });
        }

        // Validate ObjectIds
        if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(productId)) {
            console.log("Invalid userId or productId format");
            return res.status(400).json({ 
                message: 'Invalid userId or productId format' 
            });
        }

        // Create new review
        const newReview = new Review({
            userId,
            productId,
            rating,
            review: review || '', // Make review text optional
            createdAt: new Date()
        });

        // Save the review
        await newReview.save();
        console.log("Review saved successfully:", newReview);

        // Fetch the saved review with populated user data
        const populatedReview = await Review.findById(newReview._id)
            .populate({
                path: 'userId',
                select: 'name profilePictureUrl',
                model: 'User',
            })
            .populate({
                path: 'productId',
                select: 'name images', 
                model: 'Products',
            });

        // Format the response
        const response = {
            reviewId: populatedReview._id,
            productInfo: {
                id: populatedReview.productId?._id,
                title: populatedReview.productId?.name || 'Unknown Product',
                image: populatedReview.productId?.images?.[0] || null,
            },
            userInfo: {
                name: populatedReview.userId?.name || 'Anonymous',
                profilePictureUrl: populatedReview.userId?.profilePictureUrl || null,
            },
            rating: populatedReview.rating,
            review: populatedReview.review,
            createdAt: populatedReview.createdAt,
        };

        res.status(201).json(response);
    } catch (error) {
        console.error('Error creating review:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Export the controller functions
module.exports = {
    getReviewsByProductId,
    getAllReviews,
    createReview
};