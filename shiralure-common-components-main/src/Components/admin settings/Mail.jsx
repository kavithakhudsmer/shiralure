import React, { useState } from 'react';
import { FaCheck } from "react-icons/fa";
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
    <div className="mail-container8">
      <h2 className="mail-title8">Mail</h2>
      
      <div className="form-row8">
        <div className="form-group8">
          <label className="form-label8">
            MAIL HOST <span className="required8">*</span>
          </label>
          <input
            type="text"
            name="mailHost"
            value={formData.mailHost}
            onChange={handleInputChange}
            className="form-input8"
          />
        </div>
        
        <div className="form-group8">
          <label className="form-label8">
            MAIL PORT <span className="required8">*</span>
          </label>
          <input
            type="text"
            name="mailPort"
            value={formData.mailPort}
            onChange={handleInputChange}
            className="form-input8"
          />
        </div>
      </div>
      
      <div className="form-row8">
        <div className="form-group8">
          <label className="form-label8">
            MAIL USERNAME <span className="required8">*</span>
          </label>
          <input
            type="text"
            name="mailUsername"
            value={formData.mailUsername}
            onChange={handleInputChange}
            className="form-input8"
          />
        </div>
        
        <div className="form-group8">
          <label className="form-label8">MAIL PASSWORD</label>
          <input
            type="password"
            name="mailPassword"
            value={formData.mailPassword}
            onChange={handleInputChange}
            className="form-input8"
          />
        </div>
      </div>
      
      <div className="form-row8">
        <div className="form-group8">
          <label className="form-label8">
            MAIL FROM NAME <span className="required8">*</span>
          </label>
          <input
            type="text"
            name="mailFromName"
            value={formData.mailFromName}
            onChange={handleInputChange}
            className="form-input8"
          />
        </div>
        
        <div className="form-group8">
          <label className="form-label8">
            MAIL FROM EMAIL <span className="required8">*</span>
          </label>
          <select
            name="mailFromEmail"
            value={formData.mailFromEmail}
            onChange={handleInputChange}
            className="form-select8"
          >
            <option value="">--</option>
            <option value="example@email.com">example@email.com</option>
          </select>
        </div>
      </div>
      
      <div className="form-group-full8">
        <label className="form-label8">
          MAIL ENCRYPTION <span className="required8">*</span>
        </label>
        <div className="radio-group8">
          <label className="radio-label8">
            <input
              type="radio"
              name="mailEncryption"
              value="SSL"
              checked={formData.mailEncryption === 'SSL'}
              onChange={handleInputChange}
              className="radio-input8"
            />
            <span className="radio-custom8"></span>
            SSL
          </label>
          <label className="radio-label8">
            <input
              type="radio"
              name="mailEncryption"
              value="TLS"
              checked={formData.mailEncryption === 'TLS'}
              onChange={handleInputChange}
              className="radio-input8"
            />
            <span className="radio-custom8"></span>
            TLS
          </label>
        </div>
      </div>
      
      <button className="save-button8" onClick={handleSave}>
        <FaCheck size={16} />
        Save
      </button>
    </div>
  );
};

export default Mail;