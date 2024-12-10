const express = require('express');
const router = express.Router();
const testimonialController = require('../Controller/testimonialController');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Create a new testimonial
router.post(
  '/',
  upload.fields([
    { name: 'image', maxCount: 10 },
    { name: 'profilePics', maxCount: 1 },
  ]),
  testimonialController.create
);

// Update a testimonial by ID
router.put(
  '/:id',
  upload.fields([
    { name: 'image', maxCount: 10 },
    { name: 'profilePics', maxCount: 1 },
  ]),
  testimonialController.update
);

// Get a testimonial by ID
router.get('/:id', testimonialController.getById);

// Get all testimonials
router.get('/', testimonialController.getAll);

// Delete a testimonial by ID
router.delete('/:id', testimonialController.delete);

module.exports = router; 