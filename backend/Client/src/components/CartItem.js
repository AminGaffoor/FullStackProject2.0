// src/components/CartItem.js
import React from 'react';

const CartItem = ({ item, updateQuantity, removeFromCart }) => {
  return (
    <div className="cart-item">
      <img src={item.image} alt={item.name} className="cart-item-image" />
      <div className="cart-item-details">
        <h3>{item.name}</h3>
        <p>${item.price}</p>
      </div>
      <div className="cart-item-actions">
        <label>
          Qty:
          <input
            type="number"
            value={item.quantity}
            min="1"
            onChange={(e) => updateQuantity(item.id, parseInt(e.target.value, 10))}
          />
        </label>
        <button className="remove-button" onClick={() => removeFromCart(item.id)}>
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;
