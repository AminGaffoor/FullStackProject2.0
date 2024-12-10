const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const { protect } = require('./Middleware/authMiddleware'); // Middleware for authentication
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
require('dotenv').config();

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname,"./Client", 'build')));
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, "./Client",'build', 'index.html'));
});


// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((err) => console.error('Error connecting to MongoDB Atlas:', err));

// Routes
app.use('/api/auth', authRoutes); // Public auth routes
app.use('/api/products', productRoutes); // Public product routes

// Protected routes for cart
app.use('/api/cart', protect, cartRoutes);

// Health check route
// app.get('/', (req, res) => {
//   res.send('Backend is running...');
// });

// Start the Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
