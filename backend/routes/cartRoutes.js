const express = require('express');
const mongoose = require('mongoose'); // Import for ObjectId validation
const Cart = require('../models/cart');
const { protect } = require('../middleware/authMiddleware'); // Import middleware
const router = express.Router();

// Get cart for the authenticated user
router.get('/', protect, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user }).populate('items.productId');
    res.json(cart || { items: [] });
  } catch (err) {
    console.error('Error fetching cart:', err);
    res.status(500).json({ error: 'Failed to fetch cart' });
  }
});

// Add item to the authenticated user's cart
router.post('/', protect, async (req, res) => {
  const { productId, quantity } = req.body;

  // Validate productId format
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({ error: 'Invalid productId format' });
  }

  try {
    let cart = await Cart.findOne({ userId: req.user });
    if (!cart) {
      cart = new Cart({ userId: req.user, items: [] });
    }

    // Check if the product already exists in the cart
    const existingItem = cart.items.find((item) => item.productId.equals(productId));
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (err) {
    console.error('Error updating cart:', err);
    res.status(500).json({ error: 'Failed to update cart' });
  }
});

// Clear cart for the authenticated user
router.post('/checkout', protect, async (req, res) => {
  try {
    await Cart.deleteOne({ userId: req.user });
    res.json({ message: 'Checkout successful!' });
  } catch (err) {
    console.error('Error during checkout:', err);
    res.status(500).json({ error: 'Failed to checkout' });
  }
});

module.exports = router;
