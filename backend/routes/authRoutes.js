require('dotenv').config();
const express = require('express');
const User = require('../models/User'); // Ensure User model is defined and correctly imported
const jwt = require('jsonwebtoken');
const router = express.Router();

// Route: Register a New User
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  // Validate input fields
  if (!username || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email is already in use' });
    }

    // Create a new user instance
    const newUser = new User({ username, email, password });

    // Save user to the database
    await newUser.save();

    // Respond with success message (excluding sensitive info)
    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Route: Login a User
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Validate input fields
  if (!email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the password is valid
    const isPasswordMatch = await user.matchPassword(password);
    if (!isPasswordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET, // Make sure JWT_SECRET is defined in your .env file
      { expiresIn: '1h' } // Token expiration time
    );

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
