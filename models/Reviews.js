const mongoose = require('mongoose');

const ReviewsSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    productId: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5 },
    review: { type: String },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Reviews', ReviewsSchema);
