// src/pages/WishlistPage/index.jsx
import React from 'react';
import WishlistItem from '../../components/wishitem/index';
import './styles.css';
import Poco from "../../assets/poco.jpg"
import Shirt from "../../assets/shirt.png"
import PDrive from "../../assets/pdrive.jpg"
import Hoodie from "../../assets/hoodie.jpg"

const WishlistPage = () => {
  const wishlistItems = [
    {
      id: 1,
      image: Poco,
      name: 'POCO M6 Pro 5G (Power Black, 128 GB)',
      details: '6 GB RAM',
      price: 20000
    },
    {
      id: 2,
      image: Shirt,
      name: 'Try This Men Checkered Casual Green Shirt',
      details: 'Size: M',
      price: 158
    },
    {
      id: 3,
      image: PDrive,
      name: 'HP v220 128 GB Pen Drive',
      details: 'Silver',
      price: 600
    },
    {
      id: 4,
      image: Hoodie,
      name: 'Men Printed Hooded Neck Cotton Blend Black T-Shirt',
      details: 'Size: XL',
      price: 268
    }
  ];

  return (
    <div className="wishlist-page">      
      <div className="wishlist-container">
      <h1>My wishlist (<span className="item-count">{wishlistItems.length} Items</span>)</h1>
        {wishlistItems.map(item => (
          <WishlistItem key={item.id} item={item} />
        ))}
      </div>
      
      {/* <NewsletterSignup /> */}
    </div>
  );
};

export default WishlistPage;