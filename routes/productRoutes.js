// routes/productRoutes.js
const express = require('express');
const multer = require('multer');
const cloudinary = require('../config/cloudinaryConfig'); // Adjust path as needed
const Product = require('../models/Products'); // Adjust path as needed
const { uploadImagesToCloudinary } = require('../cloudinaryServices');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });


// POST route to add a new product
router.post('/add-product', upload.array('images', 10), async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      discountPrice,
      stockQuantity,
      categoryId,
      tags,
      isOnSale,
      barcode,
      taxExclusivePrice,
      tax,
      bannerLabel,
      lowStockAlert,
    } = req.body;

    // Check for required fields
    if (!name || !description || !price || !taxExclusivePrice) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Upload images to Cloudinary
    const uploadedImages = await uploadImagesToCloudinary(req.files);

    // Calculate final price including tax
    const taxAmount = (parseFloat(taxExclusivePrice) * parseFloat(tax)) / 100;
    const finalPrice = parseFloat(taxExclusivePrice) + taxAmount;

    // Prepare product data
    const productData = {
      name,
      description,
      price: finalPrice,
      discountPrice: discountPrice || null,
      stockQuantity: parseInt(stockQuantity, 10),
      categoryId,
      images: uploadedImages,
      tags: tags ? tags.split(',').map((tag) => tag.trim()) : [],
      isOnSale: isOnSale === 'true', // Convert string to boolean
      barcode,
      taxExclusivePrice: parseFloat(taxExclusivePrice),
      tax: parseFloat(tax),
      bannerLabel,
      lowStockAlert: lowStockAlert ? parseInt(lowStockAlert, 10) : null,
    };

    // Save product in MongoDB
    const product = new Product(productData);
    await product.save();

    return res.status(201).json({ message: 'Product created successfully', product });
  } catch (error) {
    console.error('Error creating product:', error);
    return res.status(500).json({ message: 'Failed to create product', error: error.message });
  }
});

module.exports = router;
