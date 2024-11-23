const mongoose = require('mongoose');

const TestimonialsSchema = new mongoose.Schema({
    name: { type: String, required: true },
    designation: { type: String },
    message: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5 },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Testimonials', TestimonialsSchema);
