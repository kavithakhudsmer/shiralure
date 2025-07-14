import React, { useState } from 'react';
import { Save } from 'lucide-react';
import './Mail.css';

const Mail = () => {
  const [formData, setFormData] = useState({
    mailHost: '',
    mailPort: '',
    mailUsername: '',
    mailPassword: '',
    mailFromName: '',
    mailFromEmail: '',
    mailEncryption: 'SSL'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    console.log('Form data:', formData);
  };

  return (
    <div className="mail-container">
      <h2 className="mail-title">Mail</h2>
      
      <div className="form-row">
        <div className="form-group">
          <label className="form-label">
            MAIL HOST <span className="required">*</span>
          </label>
          <input
            type="text"
            name="mailHost"
            value={formData.mailHost}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">
            MAIL PORT <span className="required">*</span>
          </label>
          <input
            type="text"
            name="mailPort"
            value={formData.mailPort}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>
      </div>
      
      <div className="form-row">
        <div className="form-group">
          <label className="form-label">
            MAIL USERNAME <span className="required">*</span>
          </label>
          <input
            type="text"
            name="mailUsername"
            value={formData.mailUsername}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">MAIL PASSWORD</label>
          <input
            type="password"
            name="mailPassword"
            value={formData.mailPassword}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>
      </div>
      
      <div className="form-row">
        <div className="form-group">
          <label className="form-label">
            MAIL FROM NAME <span className="required">*</span>
          </label>
          <input
            type="text"
            name="mailFromName"
            value={formData.mailFromName}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">
            MAIL FROM EMAIL <span className="required">*</span>
          </label>
          <select
            name="mailFromEmail"
            value={formData.mailFromEmail}
            onChange={handleInputChange}
            className="form-select"
          >
            <option value="">--</option>
            <option value="example@email.com">example@email.com</option>
          </select>
        </div>
      </div>
      
      <div className="form-group-full">
        <label className="form-label">
          MAIL ENCRYPTION <span className="required">*</span>
        </label>
        <div className="radio-group">
          <label className="radio-label">
            <input
              type="radio"
              name="mailEncryption"
              value="SSL"
              checked={formData.mailEncryption === 'SSL'}
              onChange={handleInputChange}
              className="radio-input"
            />
            <span className="radio-custom"></span>
            SSL
          </label>
          <label className="radio-label">
            <input
              type="radio"
              name="mailEncryption"
              value="TLS"
              checked={formData.mailEncryption === 'TLS'}
              onChange={handleInputChange}
              className="radio-input"
            />
            <span className="radio-custom"></span>
            TLS
          </label>
        </div>
      </div>
      
      <button className="save-button" onClick={handleSave}>
        <Save size={16} />
        Save
      </button>
    </div>
  );
};

export default Mail;