import React from 'react';
import './Footer.css';
import { FaPaperPlane, FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import slLogo from '../assets/images/SL.png'; // Replace with the actual path to your SL logo image

function Footer2() {
  return (
    <footer className="footer">
      {/* Newsletter Section (Top) */}
      <div className="newsletter-top">
        {/* Left Side */}
        <div className="newsletter-left">
          <div className="newsletter-heading-section">
            <FaEnvelope className="contact-icon" />
            <h3 className="footer-heading" style={{paddingBottom:'6 px'}}>SUBSCRIBE TO OUR NEWS LETTER</h3>
          </div>
          <div className="newsletter-form-section">
            <form className="newsletter-form">
              <input type="text" placeholder="Enter your name" className="newsletter-input" />
              <input type="email" placeholder="Enter your Mail" className="newsletter-input" />
              <button type="submit" className="newsletter-button">
                <FaPaperPlane />
              </button>
            </form>
          </div>
        </div>
        {/* Right Side */}
        <div className="newsletter-right">
          <img src={slLogo} alt="SL Logo" className="logo-image" />
          <span className="logo-text" style={{font:'poppins',fontSize:'25px'}}>ShiraLure</span>
        </div>
      </div>

      {/* Other Sections */}
      <div className="footer-container">
        {/* Support Links */}
        <div className="footer-section support">
          <h3 className="footer-heading">SUPPORT</h3>
          <ul className="footer-links">
            <li><a href="#">Cancellation & Refund</a></li>
            <li><a href="#">Shipping & Delivery</a></li>
            <li><a href="#">Grievance Redressal Mechanism</a></li>
          </ul>
        </div>

        {/* Legal Links */}
        <div className="footer-section legal">
          <h3 className="footer-heading">LEGAL</h3>
          <ul className="footer-links">
            <li><a href="#">About Us</a></li>
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">Cookies Policy</a></li>
          </ul>
        </div>

        {/* Contact Information */}
        <div className="footer-section contact">
          <h3 className="footer-heading">CONTACT</h3>
          <p className="contact-info"><FaMapMarkerAlt className="contact-icon" /> India</p>
          <p className="contact-info"><FaEnvelope className="contact-icon" /> Support@shiralure.com</p>
          <p className="contact-info"><FaPhoneAlt className="contact-icon" /> 7845373261</p>
        </div>
      </div>

      {/* Social Media and Bottom Links */}
      <div className="footer-bottom">
        <div className="footer-bottom-left">
          <p className="footer-copyright">© 2025, ALL RIGHTS RESERVED - ShiraLure</p>
        </div>
        <div className="footer-bottom-center">
          <ul className="social-icons">
            <li><a href="#"><FaFacebookF /></a></li>
            <li><a href="#"><FaInstagram /></a></li>
            <li><a href="#"><FaTwitter /></a></li>
            <li><a href="#"><FaLinkedinIn /></a></li>
          </ul>
        </div>
        <div className="footer-bottom-right">
          <ul className="bottom-links">
            <li><a href="#">TERMS & CONDITIONS</a></li>
            <li><a href="#">PRIVACY POLICY</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer2;