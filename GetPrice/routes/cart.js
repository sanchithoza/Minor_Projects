// routes/cart.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const Cart = require('../models/Cart');
const Product = require('../models/Product');

// Route to add a product to the user's cart
router.post('/add', authMiddleware, async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.userData.userId;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({ user: userId, products: [] });
    }

    const existingProductIndex = cart.products.findIndex(
      (item) => item.product.toString() === productId
    );

    if (existingProductIndex !== -1) {
      cart.products[existingProductIndex].quantity += quantity;
    } else {
      cart.products.push({ product: productId, quantity });
    }

    await cart.save();
    res.json({ message: 'Product added to cart' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to view the user's cart
router.get('/view', authMiddleware, async (req, res) => {
    try {
      const userId = req.userData.userId;
  
      const cart = await Cart.findOne({ user: userId }).populate('products.product');
  
      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }
  
      res.json(cart);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Route to update the quantity of a product in the user's cart
router.put('/update/:productId', authMiddleware, async (req, res) => {
    try {
      const { quantity } = req.body;
      const userId = req.userData.userId;
      const productId = req.params.productId;
  
      const cart = await Cart.findOne({ user: userId });
  
      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }
  
      const existingProductIndex = cart.products.findIndex(
        (item) => item.product.toString() === productId
      );
  
      if (existingProductIndex !== -1) {
        cart.products[existingProductIndex].quantity = quantity;
        await cart.save();
        return res.json({ message: 'Cart updated successfully' });
      }
  
      res.status(404).json({ message: 'Product not found in cart' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Route to delete a product from the user's cart
router.delete('/delete/:productId', authMiddleware, async (req, res) => {
    try {
      const userId = req.userData.userId;
      const productId = req.params.productId;
  
      const cart = await Cart.findOne({ user: userId });
  
      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }
  
      const existingProductIndex = cart.products.findIndex(
        (item) => item.product.toString() === productId
      );
  
      if (existingProductIndex !== -1) {
        cart.products.splice(existingProductIndex, 1);
        await cart.save();
        return res.json({ message: 'Product removed from cart' });
      }
  
      res.status(404).json({ message: 'Product not found in cart' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
// ... Other cart routes for viewing, updating, and deleting products from the cart

module.exports = router;
