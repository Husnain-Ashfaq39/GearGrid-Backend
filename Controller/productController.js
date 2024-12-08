const { uploadImagesToCloudinary } = require('../cloudinaryServices');
const Product = require('../models/Products'); 
const Wishlist = require('../models/Wishlist'); // Adjust path as needed

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

// Get trending products based on order quantities
const getTrendingProducts = async (req, res) => {
  try {
    const OrderItems = require('../models/OrderItems');
    const Products = require('../models/Products');

    // Aggregate order items to get total quantities for each product
    const trendingProducts = await OrderItems.aggregate([
      {
        $group: {
          _id: '$productId',
          totalQuantity: { $sum: '$quantity' },
          productName: { $first: '$productName' }
        }
      },
      {
        $sort: { totalQuantity: -1 }
      },
      {
        $limit: 10 // Limit to top 10 trending products
      }
    ]);

    // Get full product details for the trending products
    const productIds = trendingProducts.map(item => item._id);
    const fullProductDetails = await Products.find({
      _id: { $in: productIds }
    });

    // Combine quantity data with full product details
    const result = fullProductDetails.map(product => {
      const trendingData = trendingProducts.find(
        item => item._id === product._id.toString()
      );
      return {
        ...product.toObject(),
        totalQuantitySold: trendingData.totalQuantity
      };
    });

    // Sort by quantity sold (highest to lowest)
    result.sort((a, b) => b.totalQuantitySold - a.totalQuantitySold);

    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching trending products',
      error: error.message
    });
  }
};

// Get highest rated products based on reviews
const getTopRatedProducts = async (req, res) => {
  try {
    const Reviews = require('../models/Reviews');
    const Products = require('../models/Products');

    // Aggregate reviews to calculate average rating for each product
    const topRatedProducts = await Reviews.aggregate([
      {
        $group: {
          _id: '$productId',
          averageRating: { $avg: '$rating' },
          totalReviews: { $sum: 1 }
        }
      },
      {
        $match: {
          totalReviews: { $gte: 3 }  // Only include products with at least 3 reviews
        }
      },
      {
        $project: {
          _id: 1,
          averageRating: { $round: ['$averageRating', 1] }  // Round to 1 decimal place
        }
      },
      {
        $sort: { averageRating: -1 }
      },
      {
        $limit: 10  // Limit to top 10 rated products
      }
    ]);

    // Get full product details for the top rated products
    const productIds = topRatedProducts.map(item => item._id);
    const fullProductDetails = await Products.find({
      _id: { $in: productIds }
    });

    // Combine rating data with full product details
    const result = fullProductDetails.map(product => {
      const ratingData = topRatedProducts.find(
        item => item._id.toString() === product._id.toString()
      );
      return {
        ...product.toObject(),
        averageRating: ratingData.averageRating
      };
    });

    // Sort by average rating
    result.sort((a, b) => b.averageRating - a.averageRating);

    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching top rated products',
      error: error.message
    });
  }
};

// Add product to wishlist
const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.body.userId; // Assuming user info is added by auth middleware
    console.log('userid', userId);
    console.log('productid', productId);

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Find user's wishlist or create new one
    let wishlist = await Wishlist.findOne({ userId });
    if (!wishlist) {
      wishlist = new Wishlist({ userId, productIds: [] });
    }

    // Convert productIds to strings for comparison
    const productIdString = productId.toString();
    const productIdsInWishlist = wishlist.productIds.map((id) => id.toString());

    // Check if product is already in wishlist
    if (productIdsInWishlist.includes(productIdString)) {
      return res.status(400).json({ message: 'Product already in wishlist' });
    }

    // Add product to wishlist
    wishlist.productIds.push(productId);
    await wishlist.save();

    res.status(200).json({ message: 'Product added to wishlist', wishlist });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding product to wishlist', error: error.message });
  }
};


// Remove product from wishlist
const removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.body.userId;  // Get userId from request body
    console.log("User ID:", userId);
    console.log("Product ID:", productId);

    const wishlist = await Wishlist.findOne({ userId });
    console.log("Wishlist found:", wishlist);
    if (!wishlist) {
      return res.status(404).json({ message: 'Wishlist not found' });
    }

    // Convert productIds to strings for comparison
    const productIdString = productId.toString();
    const updatedProductIds = wishlist.productIds.filter(id => id.toString() !== productIdString);
    wishlist.productIds = updatedProductIds;
    
    await wishlist.save();
    console.log("Updated wishlist:", wishlist);

    res.status(200).json({ message: 'Product removed from wishlist', wishlist });
  } catch (error) {
    console.error("Error in removeFromWishlist:", error);
    res.status(500).json({ message: 'Error removing product from wishlist', error: error.message });
  }
};

// Get all wishlist items
const getWishlistItems = async (req, res) => {
  try {
    // Return empty products array if no user is authenticated
   

    const userId = req.params.userId;
    console.log("User ID from request:", userId);

    const wishlist = await Wishlist.findOne({ userId });
    console.log("Wishlist found:", wishlist);

    if (!wishlist) {
      console.log("No wishlist found for user");
      return res.status(200).json({ products: [] });
    }

    console.log("Product IDs in wishlist:", wishlist.productIds);

    // Get all products in wishlist
    const products = await Product.find({ _id: { $in: wishlist.productIds } });
    console.log("Products found:", products.length);
    console.log("Full products data:", JSON.stringify(products, null, 2));

    res.status(200).json(JSON.stringify(products, null, 2));
  } catch (error) {
    console.error("Error in getWishlistItems:", error);
    res.status(400).json({ products: [] }); // Return empty array on error
  }
};

module.exports = {
  addProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  getProductById,
  getRelatedProducts,
  getTrendingProducts,
  getTopRatedProducts,
  addToWishlist,
  removeFromWishlist,
  getWishlistItems
};
