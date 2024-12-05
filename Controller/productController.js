const { uploadImagesToCloudinary } = require('../cloudinaryServices');
const Product = require('../models/Products'); // Adjust path as needed

// Controller function to handle adding a new product
const addProduct = async (req, res) => {
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
};

// Controller function to get all products with pagination
const getAllProducts = async (req, res) => {
  try {
    // Get pagination parameters from query with defaults
    const page = parseInt(req.query.page) || 1; // Default to first page
    const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page
    
    // Calculate skip value for pagination
    const skip = (page - 1) * limit;

    // Get total count of products
    const totalProducts = await Product.countDocuments();
    
    // Calculate total pages
    const totalPages = Math.ceil(totalProducts / limit);

    // Fetch paginated products
    const products = await Product.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 }); // Optional: sort by creation date, newest first

    // Return paginated response
    return res.status(200).json({
      products,
      pagination: {
        currentPage: page,
        totalPages,
        pageSize: limit,
        totalItems: totalProducts,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      }
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return res.status(500).json({ message: 'Failed to fetch products', error: error.message });
  }
};

// Controller function to update a product
const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
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
      images
    } = req.body;

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

   

    // Calculate final price including tax
    const taxAmount = (parseFloat(taxExclusivePrice) * parseFloat(tax)) / 100;
    const finalPrice = parseFloat(taxExclusivePrice) + taxAmount;

    // Update product data
    product.name = name || product.name;
    product.description = description || product.description;
    product.price = finalPrice || product.price;
    product.discountPrice = discountPrice || product.discountPrice;
    product.stockQuantity = parseInt(stockQuantity, 10) || product.stockQuantity;
    product.categoryId = categoryId || product.categoryId;
    product.images = images;
    product.tags = tags ? tags.split(',').map((tag) => tag.trim()) : product.tags;
    product.isOnSale = isOnSale !== undefined ? isOnSale === 'true' : product.isOnSale;
    product.barcode = barcode || product.barcode;
    product.taxExclusivePrice = parseFloat(taxExclusivePrice) || product.taxExclusivePrice;
    product.tax = parseFloat(tax) || product.tax;
    product.bannerLabel = bannerLabel || product.bannerLabel;
    product.lowStockAlert = lowStockAlert ? parseInt(lowStockAlert, 10) : product.lowStockAlert;
  

    // Save updated product
    await product.save();
    
    return res.status(200).json({ message: 'Product updated successfully', product });
  } catch (error) {
    console.error('Error updating product:', error);
    return res.status(500).json({ message: 'Failed to update product', error: error.message });
  }
};

// Controller function to delete a product
const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    
    // Find and delete the product by ID
    const product = await Product.findByIdAndDelete(productId);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    return res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    return res.status(500).json({ message: 'Failed to delete product', error: error.message });
  }
};

// Controller function to get a product by its ID
const getProductById = async (req, res) => {
  try {
    const productId = req.params.id;

    // Find product by ID
    const product = await Product.findById(productId);
    
    // If product not found
    if (!product) {
      console.log('Product not found');
      return res.status(404).json({ message: 'Product not found' });
    }
    console.log('Product fetched successfully');
    return res.status(200).json(product);
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    return res.status(500).json({ message: 'Failed to fetch product', error: error.message });
  }
};

// Controller function to get related products by category ID
const getRelatedProducts = async (req, res) => {
  try {
    const productId = req.params.id;

    // Validate product ID
    if (!productId) {
      return res.status(400).json({ message: 'Product ID is required' });
    }

    // Find the product by ID to get its category ID
    const product = await Product.findById(productId);

    // If product not found
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Find other products in the same category
    const relatedProducts = await Product.find({ categoryId: product.categoryId, _id: { $ne: productId } });

    return res.status(200).json(relatedProducts);
  } catch (error) {
    if (error.name === 'CastError') {
      console.error('Invalid product ID format:', error);
      return res.status(400).json({ message: 'Invalid product ID format', error: error.message });
    }
    console.error('Error fetching related products:', error);
    return res.status(500).json({ message: 'Failed to fetch related products', error: error.message });
  }
};


module.exports = { addProduct, getAllProducts, updateProduct, deleteProduct, getProductById ,getRelatedProducts};
