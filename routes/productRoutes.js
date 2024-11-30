const express = require('express');
const multer = require('multer');
const productController = require('../Controller/productController'); // Import the controller

const router = express.Router();

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// POST route to add a new product
router.post('/add-product', upload.array('images', 10), productController.addProduct);

// GET route to fetch all products
router.get('/all', productController.getAllProducts);

// PUT route to update a product
router.put('/update/:id', upload.array('images', 10), productController.updateProduct);

// DELETE route to delete a product
router.delete('/delete/:id', productController.deleteProduct);

module.exports = router;
