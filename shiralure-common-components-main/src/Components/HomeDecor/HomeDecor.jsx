// HomeDecor.jsx
import React, { useState } from 'react';
import './HomeDecor.css';
import productData from '../../data/products.json';
import imageMap from '../../utils/imageMap';

function HomeDecor() {
  const section = productData.sections.find((sec) => sec.title === 'Upto 60% Off.. Home Decor');
  const [clickedIndex, setClickedIndex] = useState(null);

  const handleClick = (index) => {
    setClickedIndex(index);
  };

  return (
    <section className="home-decor">
      <h2 className="section-title">{section.title}</h2>
      <div className="decor-grid">
        {section.products.map((product, index) => (
          <div
            key={index}
            className={`decor-card ${clickedIndex === index ? 'clicked' : ''}`}
            onClick={() => handleClick(index)}
          >
            <img src={imageMap[product.image]} alt={product.alt} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default HomeDecor;