const products = require("../Models/ProductSchema")
const fs = require('fs');
const path = require('path');


// POST /products — Add New Product
exports.addProduct = async (req, res) => {
  try {
    const { productname, description, price,productType } = req.body;

    // Ensure image is uploaded
    if (!req.file) {
      return res.status(400).json({ error: 'Product image is required' });
    }

    const productImage = req.file.filename;

    const newProduct = new products({
      productname,
      description,
      price,
      productImage,
      productType
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

    // 
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

// edit products

exports.EditProducts = async (req, res) => {
  try {
    const { id } = req.params;
    const { productname, description, price, productType } = req.body;
    let updatedData = { productname, description, price, productType };

    if (req.file) {
      // If a new image is uploaded, delete the old image file
      const oldProduct = await products.findById(id);
      if (oldProduct && oldProduct.productImage) {
        const oldImagePath = path.join(__dirname, "../uploads/products", oldProduct.productImage);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }

      // Add new image filename to updated data
      updatedData.productImage = req.file.filename;
    }

    const updatedProduct = await products.findByIdAndUpdate(id, updatedData, { new: true });

    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json({ message: "Product updated", product: updatedProduct });
  } catch (err) {
    console.error("Error editing product:", err);
    res.status(500).json({ error: "Server error while updating product" });
  }
};