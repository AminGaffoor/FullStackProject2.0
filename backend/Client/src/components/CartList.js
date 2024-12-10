import React, { useState } from 'react';
import CartItem from './CartItem';

const CartList = ({ cart, updateQuantity, removeFromCart, checkout }) => {
  const [successMessage, setSuccessMessage] = useState('');

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  ).toFixed(2);

  const handleCheckout = () => {
    if (cart.length === 0) {
      setSuccessMessage('Your cart is already empty!');
      return;
    }
    checkout(); // Clear the cart
    setSuccessMessage('Thank you for your purchase! Your order was successful.');
  };

  return (
    <div className="cart-list">
      <h2>Your Cart</h2>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {cart.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          updateQuantity={updateQuantity}
          removeFromCart={removeFromCart}
        />
      ))}
      <div className="cart-total">
        <h3>Total: ${total}</h3>
        <button className="checkout-button" onClick={handleCheckout}>
          Check Out
        </button>
      </div>
    </div>
  );
};

export default CartList;
