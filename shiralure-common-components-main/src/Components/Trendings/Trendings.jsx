// Trends.jsx
import React, { useState } from 'react';
import './Trendings.css';
import productData from '../../data/products.json';
import imageMap from '../../utils/imageMap';
import { FaHeart } from 'react-icons/fa';

function Trends() {
  const section = productData.sections.find((sec) => sec.title === 'Trends');
  const [clickedIndex, setClickedIndex] = useState(null);
  const [heartedIndex, setHeartedIndex] = useState(null);

  const handleClick = (index) => {
    setClickedIndex(index);
  };

  const handleHeartClick = (index) => {
    setHeartedIndex(heartedIndex === index ? null : index);
  };

  return (
    <section className="trends">
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
                  e.stopPropagation();
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

export default Trends;