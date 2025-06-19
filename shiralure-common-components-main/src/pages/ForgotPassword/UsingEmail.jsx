import React from 'react'
import './UsingEmail.css'
import { useNavigate } from 'react-router-dom'

const UsingEmail = () => {
  const navigate = useNavigate()
  
  // Function to handle navigation
  const gotoPhone = () => {
    navigate('/using-phone')
  }
  
  const gotoSignup = () => {
    navigate('/')
  }

  const gotoVerification = () => {
    navigate('/verification')
  }
  
  return (
    <div className='forgot-container'>
      <div className='forgot-left-container'>
        <img src="/src/assets/image--11-.jpg" alt="image 11" />
        <img src='/src/assets/image--9-.png' alt='image 9' />
      </div>
      
      <div className='forgot-right-container'>
        <img src="./src/assets/image--8-.png" alt="image 8" className='right-image'/>
        <div className="forgot-logo">ShiraLure</div>
        
        <div className="forgot-form-container">
          <h1 className="forgot-title">Forgot Password!</h1>
          
          <div className="form-group">
            <div className="forgot-label-container">
              <label className="forgot-label">
                <span>Email</span>
              </label>
              <a onClick={gotoPhone} className="use-phone">Use Phone Instead</a>
            </div>
            <input type="email" className="forgot-input" placeholder="Enter email" required />
            <p className='message'>We will send a link to reset your password</p>
          </div>
          
          <div className='form-group'>
            <button type="submit" className="forgot-button" onClick={gotoVerification}>Send Link</button>
          </div>
          
          <div className="back-link">
            <span onClick={gotoSignup} className="back">Back to signup</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UsingEmail;