const Testimonials = require('../models/Testimonials');
const { uploadImagesToCloudinary } = require('../cloudinaryServices'); // Import image upload service

// Create a new testimonial
const create = async (req, res) => {
    try {
        let uploadedImages = [];
        if (req.files && req.files.length > 0) {
            uploadedImages = await uploadImagesToCloudinary(req.files);
        }

        let uploadedProfilePics = [];
        if (req.profilePics && req.profilePics.length > 0) {
            uploadedProfilePics = await uploadImagesToCloudinary(req.profilePics);
        }

        const testimonial = new Testimonials({
            ...req.body,
            image: uploadedImages.length > 0 ? uploadedImages : null,
            profilePic: uploadedProfilePics.length > 0 ? uploadedProfilePics : null,
        });
        await testimonial.save();
        res.status(201).json(testimonial);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update a testimonial by ID
const update = async (req, res) => {
    try {
        const { id } = req.params;
        let uploadedImages = [];
        if (req.files && req.files.length > 0) {
            uploadedImages = await uploadImagesToCloudinary(req.files);
        }

        let uploadedProfilePics = [];
        if (req.profilePics && req.profilePics.length > 0) {
            uploadedProfilePics = await uploadImagesToCloudinary(req.profilePics);
        }

        const testimonial = await Testimonials.findByIdAndUpdate(id, {
            ...req.body,
            image: uploadedImages.length > 0 ? uploadedImages : undefined, // Update images if uploaded
            profilePic: uploadedProfilePics.length > 0 ? uploadedProfilePics : undefined, // Update profile pictures if uploaded
        }, { new: true });
        if (!testimonial) {
            return res.status(404).json({ message: 'Testimonial not found' });
        }
        res.json(testimonial);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get a testimonial by ID
const getById = async (req, res) => {
    try {
        const { id } = req.params;
        const testimonial = await Testimonials.findById(id);
        if (!testimonial) {
            return res.status(404).json({ message: 'Testimonial not found' });
        }
        res.json(testimonial);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all testimonials
const getAll = async (req, res) => {
    try {
        const testimonials = await Testimonials.find();
        res.json(testimonials);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a testimonial by ID
const deleteTestimonial = async (req, res) => {
    try {
        const { id } = req.params;
        const testimonial = await Testimonials.findByIdAndDelete(id);
        if (!testimonial) {
            return res.status(404).json({ message: 'Testimonial not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Exporting the controller methods
module.exports = {
    create,
    update,
    getById,
    getAll,
    delete: deleteTestimonial,
}; 