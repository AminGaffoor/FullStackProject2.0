import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import ProductList from './components/ProductList';
import CartList from './components/CartList';
import ProductDetails from './components/ProductDetails';
import Login from './components/Login';
import Register from './components/Register';
import Cart from './components/Cart';
import { generateProducts } from './utils/data';
import { fetchCart } from './utils/api'; // Fetch cart data from backend
import './App.css';

const App = () => {
  const [cart, setCart] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const products = generateProducts(12);

  // Check if user is logged in by checking the token
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      loadCart(); // Load cart data from backend if authenticated
    }
  }, []);

  // Fetch cart data from backend
  const loadCart = async () => {
    try {
      const { data } = await fetchCart();
      setCart(data.items || []);
    } catch (err) {
      console.error('Error fetching cart:', err.response?.data?.error || err.message);
    }
  };

  const addToCart = (product) => {
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const updateQuantity = (id, quantity) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: quantity > 0 ? quantity : 1 } : item
      )
    );
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const checkout = () => {
    setCart([]); // Clear the cart
  };

  return (
    <Router>
      <div className="App">
        <Header cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)} />
        <Routes>
          {/* Public Routes */}
          <Route
            path="/"
            element={<ProductList products={products} addToCart={addToCart} />}
          />
          <Route
            path="/product/:id"
            element={
              <ProductDetails products={products} addToCart={addToCart} />
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Route */}
          {isAuthenticated && (
            <Route
              path="/cart"
              element={
                <CartList
                  cart={cart}
                  updateQuantity={updateQuantity}
                  removeFromCart={removeFromCart}
                  checkout={checkout} // Pass checkout function
                />
              }
            />
          )}

          {/* Use a cart component tied to backend */}
          {isAuthenticated && <Route path="/cart" element={<Cart />} />}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
