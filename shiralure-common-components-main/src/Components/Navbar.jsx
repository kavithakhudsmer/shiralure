// Navbar.jsx
import React from 'react';
import './styles/Navbar.css';

function Navbar() {
  const categories = [
    'Men',
    'Women',
    'Kids',
    'Electronics',
    'Home Appliances',
    'Footwear',
    'Books',
    'Bags',
    'Sports',
    'Kitchen',
    'Automobiles',
  ];

  const handleScrollLeft = () => {
    const categoryList = document.querySelector('.category-list');
    categoryList.scrollBy({ left: -150, behavior: 'smooth' });
  };

  const handleScrollRight = () => {
    const categoryList = document.querySelector('.category-list');
    categoryList.scrollBy({ left: 150, behavior: 'smooth' });
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <button className="scroll-arrow left-arrow" onClick={handleScrollLeft}>
          <i className="fas fa-chevron-left"></i>
        </button>
        <ul className="category-list">
          {categories.map((category, index) => (
            <li key={index} className="category-item">
              <a href={`#${category.toLowerCase()}`} className="category-link">
                {category}
              </a>
            </li>
          ))}
        </ul>
        <button className="scroll-arrow right-arrow" onClick={handleScrollRight}>
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;