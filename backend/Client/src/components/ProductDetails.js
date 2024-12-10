import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ProductDetails = ({ products, addToCart }) => {
  const { id } = useParams(); // Get the product ID from the URL
  const navigate = useNavigate();
  
  // Find the product based on the ID
  const product = products.find((item) => item.id === id);

  if (!product) {
    return <p>Product not found!</p>; // Fallback if product doesn't exist
  }

  return (
    <div className="product-details">
      <img src={product.image} alt={product.name} className="product-image" />
      <div className="product-info">
        <h1>{product.name}</h1>
        <p>${product.price}</p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vel
          leo non justo gravida vestibulum. Nullam convallis eros sit amet
          sapien faucibus tincidunt.
        </p>
        <button onClick={() => addToCart(product)}>Add to Cart</button>
        <button onClick={() => navigate(-1)} style={{ marginLeft: '10px' }}>
          Back to Products
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
