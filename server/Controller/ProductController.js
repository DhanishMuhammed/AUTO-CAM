const products = require("../Models/ProductSchema")
const fs = require('fs');
const path = require('path');


// POST /products — Add New Product
exports.addProduct = async (req, res) => {
  try {
    const { productname, description, price } = req.body;

    // Ensure image is uploaded
    if (!req.file) {
      return res.status(400).json({ error: 'Product image is required' });
    }

    const productImage = req.file.filename;

    const newProduct = new products({
      productname,
      description,
      price,
      productImage
    });

    await newProduct.save();

    res.status(201).json({
      message: 'Product added successfully',
      product: newProduct
    });
  } catch (error) {
    console.error('Add product error:', error);
    res.status(500).json({ error: 'Server error while adding product' });
  }
};

// GET /products — Get All Products
exports.getAllProducts = async (req, res) => {
  try {
    const allProducts = await products.find();
    res.status(200).json(allProducts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

// DELETE /products/:id — Delete Product
exports.deleteProduct = async (req, res) => {
  try {
    const deleted = await products.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // ✅ Delete the uploaded image file from server
    const imagePath = path.join(__dirname, '../uploads/products', deleted.productImage);
    fs.unlink(imagePath, (err) => {
      if (err) {
        console.error("Image deletion error:", err);
      }
    });

    res.status(200).json({ message: 'Product deleted successfully', deleted });

  } catch (error) {
    console.error("Delete product error:", error);
    res.status(500).json({ error: 'Failed to delete product' });
  }
};