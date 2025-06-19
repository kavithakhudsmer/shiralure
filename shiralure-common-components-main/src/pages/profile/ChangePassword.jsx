import React from 'react';
import './changePassword.css';
import { useState } from 'react';


const ChangePasswordPage = () => {
  const [formData, setFormData] = useState({ oldPassword: '', newPassword: '' });

  const handleSubmit = () => {
    // event.preventDefault();
    if (!formData.oldPassword || !formData.newPassword) {
      console.error("Passwords can't be empty");
      return;
    }
  };

  return (
    <div className="change-password-form-container">
      <h1><img src="/icons/asterisk.png" alt="asterisk" className="asterisk-pic" />Change Password</h1>
      <form className="change-password-form" onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Current Password"
          value={formData.CurrentPassword}
          onChange={e => setFormData({ ...formData, CurrentPassword: e.target.value })}
        />
        <input
          type="password"
          placeholder="New Password"
          value={formData.newPassword}
          onChange={e => setFormData({ ...formData, newPassword: e.target.value })}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={formData.ConfirmPassword}
          onChange={e => setFormData({ ...formData, ConfirmPassword: e.target.value })}
        />
        <button type="submit" className="update-btn">Update</button>
      </form>
    </div>
  );
};

export default ChangePasswordPage;
