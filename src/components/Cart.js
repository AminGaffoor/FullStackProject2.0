import React, { useState, useEffect } from "react";
import { fetchCart, addToCart, checkout } from "../utils/api"; // Import cart APIs

const Cart = () => {
  const [cart, setCart] = useState([]);

  // Load the cart data
  const loadCart = async () => {
    try {
      const { data } = await fetchCart();
      setCart(data.items || []);
    } catch (err) {
      console.error("Error fetching cart:", err.response?.data?.error);
    }
  };

  const handleCheckout = async () => {
    try {
      await checkout();
      alert("Checkout successful!");
      setCart([]); // Clear the cart on success
    } catch (err) {
      console.error("Checkout failed:", err.response?.data?.error);
    }
  };

  useEffect(() => {
    loadCart(); // Fetch cart data on component mount
  }, []);

  return (
    <div>
      <h2>Your Cart</h2>
      {cart.map((item) => (
        <div key={item.productId}>
          <p>Product: {item.productId}</p>
          <p>Quantity: {item.quantity}</p>
        </div>
      ))}
      <button onClick={handleCheckout}>Checkout</button>
    </div>
  );
};

export default Cart;
