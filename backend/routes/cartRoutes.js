const express = require('express');
const Cart = require('../models/cart');
const router = express.Router();

// Get cart for a user
router.get('/:userId', async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId }).populate('items.productId');
    res.json(cart || { items: [] });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch cart' });
  }
});

// Add item to cart
router.post('/:userId', async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ userId: req.params.userId });
    if (!cart) {
      cart = new Cart({ userId: req.params.userId, items: [] });
    }

    const existingItem = cart.items.find((item) => item.productId.equals(productId));
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }

    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update cart' });
  }
});

// Clear cart
router.post('/:userId/checkout', async (req, res) => {
  try {
    await Cart.deleteOne({ userId: req.params.userId });
    res.json({ message: 'Checkout successful!' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to checkout' });
  }
});

module.exports = router;
