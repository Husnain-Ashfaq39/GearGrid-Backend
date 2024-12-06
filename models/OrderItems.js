const mongoose = require('mongoose');

// Define the schema for the order
const orderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
    unique: true
  },
  productId: {
    type: String,
    required: true
  },
  productName: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  price: {
    type: Number,
    required: true
  },
  subtotal: {
    type: Number,
    required: true
  },
  description: {
    type: String
  },
  discountPrice: {
    type: Number,
    default: 0
  },
  categoryId: {
    type: String,
    required: true
  },
  images: {
    type: [String],  // Array of strings (URLs or paths to images)
    default: []
  },
  tags: {
    type: [String],  // Array of strings for tags
    default: []
  },
  isOnSale: {
    type: Boolean,
    default: false
  }
}, { timestamps: true }); // Timestamps will automatically add createdAt and updatedAt fields


const OrderItem = mongoose.model('OrderItem', orderSchema);

module.exports = OrderItem;

