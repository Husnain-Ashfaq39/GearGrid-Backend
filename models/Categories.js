const mongoose = require('mongoose');

const CategoriesSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: false },
  image: { type: [String], required: false },
  parentCategoryId: { type: String, required: false },
});

module.exports = mongoose.model('Categories', CategoriesSchema);
