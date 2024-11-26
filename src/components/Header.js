import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ cartCount }) => {
  return (
    <header className="App-header">
      <h1>My Fake Store</h1>
      <Link to="/cart" className="cart-link">
        <div className="cart-icon-container">
          <img
            src="https://icon-library.com/images/shopping-cart-icon/shopping-cart-icon-8.jpg"
            alt="Cart"
            width="30"
          />
          {cartCount > 0 && (
            <span className="cart-badge">{cartCount}</span>
          )}
        </div>
      </Link>
    </header>
  );
};

export default Header;
