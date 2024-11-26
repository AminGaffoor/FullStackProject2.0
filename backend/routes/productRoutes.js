const express = require('express');
const Product = require('../models/product');
const router = express.Router();

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Add sample products (for testing)
router.post('/init', async (req, res) => {
  const sampleProducts = [
    {
      name: 'Sample Product 1',
      price: 19.99,
      description: 'A sample product',
      image: 'https://via.placeholder.com/150',
    },
    {
      name: 'Sample Product 2',
      price: 29.99,
      description: 'Another sample product',
      image: 'https://via.placeholder.com/150',
    },
  ];

  try {
    await Product.insertMany(sampleProducts);
    res.json({ message: 'Sample products added' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add sample products' });
  }
});

module.exports = router;
