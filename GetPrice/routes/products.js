// routes/products.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const Product = require('../models/Product');

// Protected route to create a new product
router.post('/', authMiddleware, async (req, res) => {
  try {
    const {
      productName,
      productCategory,
      manufacturedBy,
      modelNumber,
      costPrice,
      wholesalePrice,
      retailPrice,
    } = req.body;

    const newProduct = new Product({
      productName,
      productCategory,
      manufacturedBy,
      modelNumber,
      costPrice,
      wholesalePrice,
      retailPrice,
    });

    await newProduct.save();
    res.status(201).json({ message: 'Product created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Protected route to get all products
router.get('/', authMiddleware, async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Protected route to update a product
router.put('/:productId', authMiddleware, async (req, res) => {
  try {
    const {
      productName,
      productCategory,
      manufacturedBy,
      modelNumber,
      costPrice,
      wholesalePrice,
      retailPrice,
    } = req.body;

    const product = await Product.findById(req.params.productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    product.productName = productName;
    product.productCategory = productCategory;
    product.manufacturedBy = manufacturedBy;
    product.modelNumber = modelNumber;
    product.costPrice = costPrice;
    product.wholesalePrice = wholesalePrice;
    product.retailPrice = retailPrice;
    product.updatedDate = Date.now();

    await product.save();
    res.json({ message: 'Product updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Protected route to delete a product
router.delete('/:productId', authMiddleware, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
