// src/components/WishlistItem/index.jsx
import React from 'react';
import './styles.css';

const WishlistItem = ({ item }) => {
  return (
    <div className="wishlist-item-wishlist">
  <div className="image-wrapper-wishlist">
    <img src={item.image} alt={item.name} className="item-image-wishlist" />
  </div>
      <div className="item-details-wishlist">
        <h3>{item.name}</h3>
        <p>{item.details}</p>
        <span className="item-price-wishlist">₹{item.price.toLocaleString()}</span>
      </div>
      <div className="item-actions-wishlist">
        <button className="switch-to-cart-btn">Switch to Cart</button>
        <button className="delete-item-btn">
          <i className="icon-trash"></i>
        </button>
      </div>
    </div>
  );
};

export default WishlistItem;