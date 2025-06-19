import React from 'react';
import { useNavigate } from 'react-router-dom'; // Add this import
import './Login.css';
import logoImg from "../../assets/image--9-.png";
import BG1 from "../../assets/image--12-.jpg";
import BG2 from "../../assets/image--8-.png";
import FB from "../../assets/FB.png";
import GG from "../../assets/GG.png";
import X from "../../assets/X.png"

const Login = () => {
  const navigate = useNavigate(); // Initialize the navigate function
  
  // Function to handle navigation to verification page
  const goToVerificationPage = () => {
    navigate('/using-email'); // This should match your route path for VerificationPage
  };
  
  return (
    <div className='login-container'>
      <div className='left-section'>
        <div className='logo-container'>
          <img src={logoImg} alt="ShiraLure Logo" className="logo-img" />
        </div>
        <div className='models-container'>
          <img src={BG1} alt="Models shopping" className="models-img" />
        </div>
      </div>
      <div className='right-section'>
        <img src={BG2} className='bg-curves' alt="" />
        <div className='brand-title'>ShiraLure</div>
        <div className='login-form'>
          <h2>Login In quickly using</h2>
          <div className='social-login'>
            <button className='social-btn google'>
              <img src={GG} alt="G" className='GG'/>
            </button>
            <button className='social-btn facebook'>
              <img src={FB} alt="f" />
            </button>
            <button className='social-btn twitter'>
              <img src={X} alt="X" />
            </button>
          </div>
          <div className='divider'>
            <span className='line'></span>
            <span className='or-text'>or using your E-mail</span>
            <span className='line'></span>
          </div>
          <form className='form-inputs'>
            <input type="email" placeholder="Username or Email" className="input-field" />
            <input type="password" placeholder="Password" className="input-field" />
            <div className='forgot-password' onClick={goToVerificationPage} style={{ cursor: 'pointer' }}>
              Forgot your details?
            </div>
            <button type="submit" className="login-btn">Login</button>
          </form>
          <a href="/signup" ><div className='signup-prompt'>
            Don`t have an account ? <span className='sign-in-link'>SIGN UP</span>
          </div></a>
        </div>
      </div>
    </div>
  );
};

export default Login;