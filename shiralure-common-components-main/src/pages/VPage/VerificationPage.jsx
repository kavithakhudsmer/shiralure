import React, { useState } from 'react';
import '../VNumber/VerificationPage.css'; 
import logoImage from "../../assets/images/SL.png"; 
import leftBgImage from "../../assets/images/shop.png";
import { useNavigate } from 'react-router-dom';


const VerificationPage = () => {
  const [verificationCode, setVerificationCode] = useState('');
  
  const handleVerify = (e) => {
    e.preventDefault();

  };
  const navigate = useNavigate(); // Initialize the navigate function
  
  // Function to handle navigation to verification page
  const goToVerificationPage = () => {
    navigate('/'); // This should match your route path for VerificationPage
  };
  return (
    <div className="verification-container">
      {/* Top-left logo */}
      <div className="logo-container-top">
        <img src={logoImage} alt="ShiraLure Logo" className="logo-top" />
      </div>
      
      {/* Left Section - Man shopping */}
      <div className="left-section">
        <img src={leftBgImage} alt="" className="left-bg-image" />
      </div>
      {/* Right Section - White background with gold streaks */}
      <div className="right-section">
      {/* <img src={BG} alt="" className="right-bg-image" /> */}
        <div className="right-content">
          {/* ShiraLure brand name */}
          <h1 className="brand-name">ShiraLure</h1>
          {/* Verification form container */}
          <div className="verification-form-container">
            <h2 className="verify-title">Verify Email</h2>
            
            <p className="instruction">Enter the code we sent to your mail</p>
            
            <input
              type="text"
              className="code-input"
              placeholder="Enter The Code"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
            />
            
            <div className="resend-row">
              <span>If you didn't receive a code!</span>
              <button className="resend-btn">Resend Code</button>
            </div>
            
            <button className="verify-btn" onClick={handleVerify}>Verify</button>
            
            <div className="back-link-container">
              <a style={{cursor:'pointer'}}onClick={goToVerificationPage} className="back-link">Back To Sign In</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerificationPage;