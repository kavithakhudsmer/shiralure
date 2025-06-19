// TopDeals.jsx
import React, { useState } from 'react';
import './TopDeals.css';
import productData from '../../data/products.json';
import imageMap from '../../utils/imageMap';
import { FaHeart } from 'react-icons/fa';

function TopDeals() {
  const section = productData.sections.find((sec) => sec.title === 'Top Deals');
  const [clickedIndex, setClickedIndex] = useState(null); // Track clicked card
  const [heartedIndex, setHeartedIndex] = useState(null); // Track hearted card

  const handleClick = (index) => {
    setClickedIndex(index);
  };

  const handleHeartClick = (index) => {
    setHeartedIndex(heartedIndex === index ? null : index); // Toggle heart state
  };

  return (
    <section className="top-deals">
      <h2 className="section-title">{section.title}</h2>
      <div className="product-grid">
        {section.products.map((product, index) => (
          <div
            key={index}
            className={`product-card ${clickedIndex === index ? 'clicked' : ''}`}
            onClick={() => handleClick(index)}
          >
            <div className="product-image">
              <img src={imageMap[product.image]} alt={product.alt} />
              <span
                className={`heart-icon ${heartedIndex === index ? 'hearted' : ''}`}
                onClick={(e) => {
                  e.stopPropagation(); // Prevent card click from triggering
                  handleHeartClick(index);
                }}
              >
                <FaHeart />
              </span>
            </div>
            <h3 className="product-title">{product.title}</h3>
            <p className="product-discount">{product.discount}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default TopDeals;