import React, { useState } from 'react'
import './Signup.css'
// import assets from '../assets/assets'
import UsingPhone from '../ForgotPassword/UsingPhone';
import UsingEmail from '../ForgotPassword/UsingEmail';

const Signup = () => {
  const [showOTP, setShowOTP] = useState(false);
  const [showPhoneOTP, setShowPhoneOTP] = useState(false);
  
  const handleEmailOTP = () => {
    setShowOTP(!showOTP);
  }
  
  const handlePhoneOTP = () => {
    setShowPhoneOTP(!showPhoneOTP);
  }
    
  return (
    <div className='signup-container'>
        <div className='signup-left-container'>
            <img src="/src/assets/image--11-.jpg" alt="image 11" />
            <img src='/src/assets/image--9-.png' alt='image 9' />
        </div>
        
        <div className='signup-right-container'>
          <img src="./src/assets/image--8-.png" alt="image 8" className='right-image'/>
          <div className="signup-logo">ShiraLure</div>
          
          <div className="signup-form-container">
            <h1 className="signup-form-title">Sign in to continue Shopping</h1>
            
            <div className="signup-form-group">
                <label className="signup-form-label">
                    <span>Firstname</span>
                    <span className="required">*</span>
                </label>
                <input type="text" className="signup-form-input" placeholder="Firstname" required />
            </div>

            <div className="signup-form-group">
                <label className="signup-form-label">
                    <span>Lastname</span>
                    <span className="required">*</span>
                </label>
                <input type="text" className="signup-form-input" placeholder="Lastname" required />
            </div>

            <div className="signup-form-group">
                <div className="signup-label-container">
                    <label className="signup-form-label">
                        <span>Email</span>
                        <span className="required">*</span>
                    </label>
                    <a onClick={handleEmailOTP} className="verify">Verify</a>
                </div>
                <input type="email" className="signup-form-input" placeholder="Email" required />
                {showOTP && <input type="number" className="signup-form-input" placeholder="Enter Email OTP" required style={{marginTop:"10px"}} />}
            </div>

            <div className="signup-form-group">
                <div className="label-container">
                    <label className="signup-form-label">
                        <span>Phone no</span>
                        <span className="required">*</span>
                    </label>
                    <a onClick={handlePhoneOTP} className="verify">Verify</a>
                </div>
                <input type="number" className="signup-form-input" placeholder="Phone no" required />
                {showPhoneOTP && <input type="number" className="signup-form-input" placeholder="Enter Phone No OTP" required style={{marginTop:"10px"}} />}
            </div>

            <div className="signup-form-group">
                <label className="signup-form-label">
                    <span>Password</span>
                    <span className="required">*</span>
                </label>
                <input type="password" className="signup-form-input" placeholder="Password" required />
            </div>

            <div className="remember-forgot">
                <label className="remember-me">
                    <input type="checkbox" />
                    <span>Remember Me</span>
                </label>
            </div>

            <button type="submit" className="sign-in-button">Sign In</button>

            <div className="login-link">
                <span>Already have an account? </span>
                <a href="/login">LOGIN</a>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Signup;
