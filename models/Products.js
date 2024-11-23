const mongoose = require('mongoose');

const ProductsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  discountPrice: { type: Number, required: false },
  stockQuantity: { type: Number, required: true },
  categoryId: { type: String, required: true },
  images: { type: [String], required: false },
  tags: { type: [String], required: false },
  isOnSale: { type: Boolean, required: false },
  barcode: { type: String, required: false },
  taxExclusivePrice: { type: Number, required: false },
  tax: { type: Number, required: false },
  bannerLabel: { type: String, required: false },
  lowStockAlert: { type: Number, required: false },
});

module.exports = mongoose.model('Products', ProductsSchema);
