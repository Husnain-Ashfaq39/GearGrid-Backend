const mongoose = require('mongoose');

const ServicesSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  image_id: { type: String, required: true },
});

module.exports = mongoose.model('Services', ServicesSchema);
