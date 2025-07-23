/* 
  Add this to your public/index.html <head> to import Inter font:
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;700&display=swap" rel="stylesheet">
*/

import React, { useState } from 'react';
import { FaCheck } from "react-icons/fa";
const Company = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    website: '',
    state: '',
    latitude: '',
    longitude: '',
    email: '',
    city: '',
    countryCode: '',
    zipCode: '',
    address: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Company data:', formData);
    // Handle form submission here
  };

  const styles = {
    companyContainer: {
      padding: '24px',
      backgroundColor: '#ffffff',
      minHeight: '100vh',
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    },
    companyTitle: {
      fontSize: '24px',
      fontWeight: '600',
      color: '#1a1a1a',
      marginBottom: '32px',
      borderBottom: 'none',
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    },
    companyForm: {
      maxWidth: '1200px'
    },
    formRow: {
      display: 'flex',
      gap: '24px',
      marginBottom: '24px',
      '@media (max-width: 768px)': {
        flexDirection: 'column',
        gap: '16px'
      }
    },
    formRowFullWidth: {
      display: 'flex',
      gap: '24px',
      marginBottom: '24px',
      width: '100%'
    },
    formGroup: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column'
    },
    formLabel: {
      fontSize: '12px',
      fontWeight: '500',
      color: '#666666',
      marginBottom: '8px',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    },
    required: {
      color: '#ef4444',
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    },
    formInput: {
      padding: '12px 16px',
      border: '1px solid #e5e7eb',
      borderRadius: '6px',
      fontSize: '14px',
      color: '#1a1a1a',
      backgroundColor: '#ffffff',
      transition: 'border-color 0.2s ease',
      outline: 'none',
      minHeight: '44px',
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    },
    formInputFocus: {
      borderColor: '#6366f1',
      boxShadow: '0 0 0 3px rgba(99, 102, 241, 0.1)',
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    },
    formSelect: {
      padding: '12px 16px',
      border: '1px solid #e5e7eb',
      borderRadius: '6px',
      fontSize: '14px',
      color: '#1a1a1a',
      backgroundColor: '#ffffff',
      transition: 'border-color 0.2s ease',
      outline: 'none',
      minHeight: '44px',
      cursor: 'pointer',
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    },
    coordinateInputs: {
      display: 'flex',
      gap: '12px'
    },
    coordinateInput: {
      flex: 1,
      padding: '12px 16px',
      border: '1px solid #e5e7eb',
      borderRadius: '6px',
      fontSize: '14px',
      color: '#1a1a1a',
      backgroundColor: '#ffffff',
      transition: 'border-color 0.2s ease',
      outline: 'none',
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    },
    zipInput: {
      maxWidth: '200px',
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    },
    formTextarea: {
      padding: '12px 16px',
      border: '1px solid #e5e7eb',
      borderRadius: '6px',
      fontSize: '14px',
      color: '#1a1a1a',
      backgroundColor: '#ffffff',
      transition: 'border-color 0.2s ease',
      outline: 'none',
      resize: 'vertical',
      minHeight: '100px',
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    },
    formActions: {
      marginTop: '32px',
      display: 'flex',
      justifyContent: 'flex-start'
    },
    saveButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '12px 24px',
      backgroundColor: '#6366f1',
      color: '#ffffff',
      border: 'none',
      borderRadius: '6px',
      fontSize: '14px',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'background-color 0.2s ease',
      outline: 'none',
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    },
    saveButtonHover: {
      backgroundColor: '#5348e8',
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    },
    checkmark: {
      fontSize: '16px',
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    },
    '@media (max-width: 768px)': {
      companyContainer: {
        padding: '16px'
      },
      formRow: {
        flexDirection: 'column',
        gap: '16px'
      }
    }
  };

  return (
    <div style={styles.companyContainer}>
      <h2 style={styles.companyTitle}>Company</h2>
      
      <div style={styles.companyForm}>
        <div style={window.innerWidth <= 768 ? {...styles.formRow, flexDirection: 'column', gap: '16px'} : styles.formRow}>
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>
              NAME <span style={styles.required}>*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              style={styles.formInput}
              required
            />
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>LATITUDE/LONGITUDE</label>
            <div style={styles.coordinateInputs}>
              <input
                type="text"
                name="latitude"
                value={formData.latitude}
                onChange={handleInputChange}
                style={styles.coordinateInput}
                placeholder="12.2565000"
              />
              <input
                type="text"
                name="longitude"
                value={formData.longitude}
                onChange={handleInputChange}
                style={styles.coordinateInput}
                placeholder="80.2115000"
              />
            </div>
          </div>
        </div>

        <div style={window.innerWidth <= 768 ? {...styles.formRow, flexDirection: 'column', gap: '16px'} : styles.formRow}>
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>
              PHONE <span style={styles.required}>*</span>
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              style={styles.formInput}
              required
            />
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>
              EMAIL <span style={styles.required}>*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              style={styles.formInput}
              required
            />
          </div>
        </div>

        <div style={window.innerWidth <= 768 ? {...styles.formRow, flexDirection: 'column', gap: '16px'} : styles.formRow}>
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>WEBSITE</label>
            <input
              type="url"
              name="website"
              value={formData.website}
              onChange={handleInputChange}
              style={styles.formInput}
            />
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>
              CITY <span style={styles.required}>*</span>
            </label>
            <select
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              style={styles.formSelect}
              required
            >
              <option value="">Select City</option>
              <option value="mumbai">Mumbai</option>
              <option value="delhi">Delhi</option>
              <option value="bangalore">Bangalore</option>
              <option value="kolkata">Kolkata</option>
              <option value="chennai">Chennai</option>
            </select>
          </div>
        </div>

        <div style={window.innerWidth <= 768 ? {...styles.formRow, flexDirection: 'column', gap: '16px'} : styles.formRow}>
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>
              STATE <span style={styles.required}>*</span>
            </label>
            <select
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              style={styles.formSelect}
              required
            >
              <option value="">Select State</option>
              <option value="maharashtra">Maharashtra</option>
              <option value="delhi">Delhi</option>
              <option value="karnataka">Karnataka</option>
              <option value="west-bengal">West Bengal</option>
              <option value="tamil-nadu">Tamil Nadu</option>
            </select>
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>
              COUNTRY CODE <span style={styles.required}>*</span>
            </label>
            <select
              name="countryCode"
              value={formData.countryCode}
              onChange={handleInputChange}
              style={styles.formSelect}
              দেওয়া
            >
              <option value="">Select Country Code</option>
              <option value="+91">+91 (India)</option>
              <option value="+1">+1 (USA)</option>
              <option value="+44">+44 (UK)</option>
              <option value="+86">+86 (China)</option>
            </select>
          </div>
        </div>

        <div style={styles.formRowFullWidth}>
          <div style={{...styles.formGroup, maxWidth: '300px'}}>
            <label style={styles.formLabel}>ZIP CODE</label>
            <input
              type="text"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleInputChange}
              style={{...styles.formInput, ...styles.zipInput}}
            />
          </div>
        </div>

        <div style={styles.formRowFullWidth}>
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>
              ADDRESS <span style={styles.required}>*</span>
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              style={styles.formTextarea}
              rows="4"
              required
            />
          </div>
        </div>

        <div style={styles.formActions}>
          <button 
            type="button" 
            style={styles.saveButton}
            onClick={handleSubmit}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#5A66F1'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#5A66F1'}
          >
            <FaCheck size={16} />
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Company;