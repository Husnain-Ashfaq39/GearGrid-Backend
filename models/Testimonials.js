const mongoose = require('mongoose');

const TestimonialsSchema = new mongoose.Schema({
    name: { type: String, required: true },
    position: { type: String },
    content: { type: String, required: true },
    profilePic: { type: [String], required: false },
    image:{ type: [String], required: false },
    publishedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Testimonials', TestimonialsSchema);
