const express = require('express');
const cloudinaryController = require('../Controller/cloudinaryController'); // Import the cloudinary controller

const router = express.Router();
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/upload',upload.array('image', 10), cloudinaryController.uploadImage);      // Upload image API
router.delete('/delete/:id', cloudinaryController.deleteImage); // Delete image API

module.exports = router;
