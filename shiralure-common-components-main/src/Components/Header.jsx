import React, { useState } from 'react';
import './styles/Header.css';
import logo from './img/SL.png';
import Navbar from './Navbar';
import Searchbar from './Searchbar';
import { useNavigate } from 'react-router-dom';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="header">
      <div className="header-container">
        <div className="logo">
          <img src={logo} alt="ShiraLure Logo" />
        </div>
        <Searchbar/>
        <div className="menu-icon" onClick={toggleMenu}>
          <i className={isMenuOpen ? 'fas fa-times' : 'fas fa-bars'}></i>
        </div>
        <div className={`user-actions ${isMenuOpen ? 'open' : ''}`}>
          <button className="user-icon" onClick={() => navigate('/Profile')}>
            <i className="fas fa-circle-user"></i>
          </button>
          <button className="cart-icon" onClick={() => navigate('/CartPage')}>
            <i className="fas fa-cart-shopping"></i>
          </button>

          <button className="wishlist-icon" onClick={() => navigate('/WishlistPage')}>
            <i className="fas fa-heart"></i>
          </button>
        </div>
      </div>
      <Navbar/>
    </div>
  );
}

export default Header;