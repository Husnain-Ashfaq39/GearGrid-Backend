const mongoose = require('mongoose');

const WishlistSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  productIds: { type: [String], required: true },
});

module.exports = mongoose.model('Wishlist', WishlistSchema);
