import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import ProductList from './components/ProductList';
import CartList from './components/CartList';
import ProductDetails from './components/ProductDetails';
import { generateProducts } from './utils/data';
import './App.css';

const App = () => {
  const [cart, setCart] = useState([]);
  const products = generateProducts(12);

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
        </Routes>
      </div>
    </Router>
  );
};

export default App;
