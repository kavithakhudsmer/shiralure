// src/components/NewsletterSignup/index.jsx
import React, { useState } from 'react';
import './styles.css';

const NewsletterSignup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Newsletter signup:', { name, email });
  };

  return (
    <div className="newsletter-signup">
      <h3>Subscribe to News Letter</h3>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Enter your name" 
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input 
          type="email" 
          placeholder="Enter your Mail" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">
          <i className="icon-send"></i>
        </button>
      </form>
    </div>
  );
};

export default NewsletterSignup;