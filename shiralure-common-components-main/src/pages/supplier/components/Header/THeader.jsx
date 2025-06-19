import React, { useState } from 'react';
import './THeader.css';
import logo from '../../assets/brnd-logo.png';
import { useNavigate } from 'react-router-dom';

function THeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navigate = useNavigate();
  const CartNV = () =>{
    navigate('/cart')
  }
  const WishNV = () =>{
    navigate('/wishlist')
  }
  const HomeNV = ()=>{
    navigate('/home')
  }
  const AccNv = () =>{
    navigate('/accnt');
  } 
  return (
    <div className="header">
      <div className="header-container">
        <div className="logo">
          <img src={logo} alt="ShiraLure Logo" onClick={HomeNV}/>
        </div>
        <div className="search">
          <div className="search-container">
            <i className="fas fa-search search-icon"></i>
            <input type="text" placeholder="Search" />
          </div>
        </div>
        <div className="menu-icon" onClick={toggleMenu}>
          <i className={isMenuOpen ? 'fas fa-times' : 'fas fa-bars'}></i>
        </div>
        <div className={`user-actions ${isMenuOpen ? 'open' : ''}`}>
          <button className="user-icon" onClick={AccNv}>
            <i className="fas fa-circle-user"></i>
          </button>
          <button className="cart-icon" onClick={CartNV}>
            <i className="fas fa-cart-shopping"></i>
          </button>
          <button className="wishlist-icon" onClick={WishNV}>
            <i className="fas fa-heart"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default THeader;