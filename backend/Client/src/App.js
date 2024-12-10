import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import ProductList from "./components/ProductList";
import CartList from "./components/CartList";
import ProductDetails from "./components/ProductDetails";
import Login from "./components/Login";
import Register from "./components/Register";
import { generateProducts } from "./utils/data";
import { fetchCart } from "./utils/api"; // Fetch cart data from backend
import "./App.css";

const App = () => {
  const [cart, setCart] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const products = generateProducts(12);

  // Check if user is logged in and load cart
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
      loadCart();
    }
  }, []);

  // Fetch cart data from backend
  const loadCart = async () => {
    try {
      const { data } = await fetchCart();
      setCart(data.items || []);
    } catch (err) {
      console.error("Error fetching cart:", err.response?.data?.error || err.message);
    }
  };

  // Add or update cart functionality
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
            element={<ProductDetails products={products} addToCart={addToCart} />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Route */}
          <Route
            path="/cart"
            element={
              isAuthenticated ? (
                <CartList
                  cart={cart}
                  updateQuantity={() => {}} // Replace or enhance as needed
                  removeFromCart={() => {}} // Replace or enhance as needed
                />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
