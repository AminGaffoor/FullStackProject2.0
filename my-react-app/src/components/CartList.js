import React, { useState } from 'react'; // Ensure useState is included here
import CartItem from './CartItem'; // Adjust the path if CartItem is in a different folder



const CartList = ({ cart, setCart, updateQuantity, removeFromCart, checkout }) => {
    const [orderComplete, setOrderComplete] = useState(null); // Store total in state when order is complete
  
    const handleCheckout = () => {
      const totalBeforeCheckout = cart.reduce(
        (sum, item) => sum + item.quantity * item.price,
        0
      ).toFixed(2); // Calculate total before clearing cart
  
      if (checkout()) { // Confirm checkout
        setOrderComplete(totalBeforeCheckout); // Set the order total
      }
    };
  
    if (orderComplete) {
      // Render order summary if checkout is complete
      return (
        <div className="checkout-summary">
          <h2>Thank you for your purchase!</h2>
          <p>Your order was successfully placed.</p>
          <p>Total: ${orderComplete}</p>
        </div>
      );
    }
  
    const totalPrice = cart.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0
    );
  
    return (
      <div className="cart-list">
        <h2>Your Cart</h2>
        {cart.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            updateQuantity={updateQuantity}
            removeFromCart={removeFromCart}
          />
        ))}
        <h3>Total: ${totalPrice.toFixed(2)}</h3>
        <button onClick={handleCheckout}>Check Out</button>
      </div>
    );
  };
  
  export default CartList;
  