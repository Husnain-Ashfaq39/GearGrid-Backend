const mongoose = require('mongoose');
const Reviews = require('./path/to/Reviews'); // Update path to the Reviews model
const User = require('./path/to/User'); // Update path to the User model

async function addReviews() {
    const userIds = [
        '674a92a5c910369a45cd3e77',
        '67506ff6391722652e69e0e1'
    ];

    const productIds = [
        '675027619591be546e3ac93f',
        '67502a189591be546e3ac962'
    ];

    const reviewsData = [
        {
            rating: 5,
            review: 'Excellent product, highly recommend!'
        },
        {
            rating: 4,
            review: 'Good product, met expectations.'
        },
        {
            rating: 3,
            review: 'Average product, room for improvement.'
        },
        {
            rating: 2,
            review: 'Not satisfied, could be better.'
        }
    ];

    try {
        // Connect to the database
        await mongoose.connect('your-mongodb-connection-string', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        // Loop through each user and product to add reviews
        for (const userId of userIds) {
            for (const [index, productId] of productIds.entries()) {
                const reviewData = reviewsData[index % reviewsData.length]; // Cycle through reviews

                // Check if a review already exists for this user-product pair
                const existingReview = await Reviews.findOne({ userId, productId });
                if (!existingReview) {
                    // Create a new review
                    const review = new Reviews({
                        userId,
                        productId,
                        rating: reviewData.rating,
                        review: reviewData.review
                    });

                    await review.save();
                    console.log(`Review added for userId: ${userId} and productId: ${productId}`);
                } else {
                    console.log(`Review already exists for userId: ${userId} and productId: ${productId}`);
                }
            }
        }

        console.log('All reviews added successfully.');
    } catch (error) {
        console.error('Error adding reviews:', error);
    } finally {
      
    }
}

// Call the function
addReviews();
