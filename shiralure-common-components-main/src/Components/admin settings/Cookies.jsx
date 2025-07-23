import React, { useState } from 'react';
import { FaCheck } from "react-icons/fa";
const Cookies = () => {
  const [cookiesData, setCookiesData] = useState({
    detailsPage: '',
    summary: ''
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleInputChange = (field, value) => {
    setCookiesData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    console.log('Cookies Data:', cookiesData);
    // Handle save logic here
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div style={{
      maxWidth: '768px',
      margin: '0 auto',
      padding: '24px',
      backgroundColor: 'white',
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    }}>
      <h2 style={{
        fontSize: '20px',
        fontWeight: '600',
        marginBottom: '24px',
        color: '#1f2937'
      }}>Cookies</h2>
      
      <div>
        {/* Cookies Details Page */}
        <div style={{ marginBottom: '24px' }}>
          <label style={{
            display: 'block',
            fontSize: '12px', // Updated to match your specification
            fontWeight: '500', // Updated to match your specification
            color: '#666666', // Updated to match your specification
            marginBottom: '8px'
          }}>
            COOKIES DETAILS PAGE <span style={{ color: '#ef4444' }}>*</span>
          </label>
          <div style={{ position: 'relative' }}>
            <button
              onClick={toggleDropdown}
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                backgroundColor: 'white',
                textAlign: 'left',
                outline: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '14px'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#5A66F1';
                e.target.style.boxShadow = '0 0 0 2px rgba(59, 130, 246, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#d1d5db';
                e.target.style.boxShadow = 'none';
              }}
            >
              <span style={{ color: '#6b7280' }}>
                {cookiesData.detailsPage || '--'}
              </span>
              <span style={{
                color: '#9ca3af',
                transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s',
                fontSize: '12px'
              }}>
                ▼
              </span>
            </button>
            
            {isDropdownOpen && (
              <div style={{
                position: 'absolute',
                zIndex: 10,
                width: '100%',
                marginTop: '4px',
                backgroundColor: 'white',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
              }}>
                <div style={{ padding: '4px 0' }}>
                  <button
                    onClick={() => {
                      handleInputChange('detailsPage', 'Privacy Policy');
                      setIsDropdownOpen(false);
                    }}
                    style={{
                      display: 'block',
                      width: '100%',
                      padding: '8px 12px',
                      textAlign: 'left',
                      border: 'none',
                      backgroundColor: 'transparent',
                      cursor: 'pointer',
                      fontSize: '14px',
                      color: '#374151'
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#f3f4f6'}
                    onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
                  >
                    Privacy Policy
                  </button>
                  <button
                    onClick={() => {
                      handleInputChange('detailsPage', 'Terms of Service');
                      setIsDropdownOpen(false);
                    }}
                    style={{
                      display: 'block',
                      width: '100%',
                      padding: '8px 12px',
                      textAlign: 'left',
                      border: 'none',
                      backgroundColor: 'transparent',
                      cursor: 'pointer',
                      fontSize: '14px',
                      color: '#374151'
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#f3f4f6'}
                    onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
                  >
                    Terms of Service
                  </button>
                  <button
                    onClick={() => {
                      handleInputChange('detailsPage', 'Cookie Policy');
                      setIsDropdownOpen(false);
                    }}
                    style={{
                      display: 'block',
                      width: '100%',
                      padding: '8px 12px',
                      textAlign: 'left',
                      border: 'none',
                      backgroundColor: 'transparent',
                      cursor: 'pointer',
                      fontSize: '14px',
                      color: '#374151'
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#f3f4f6'}
                    onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
                  >
                    Cookie Policy
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Cookies Summary */}
        <div style={{ marginBottom: '24px' }}>
          <label style={{
            display: 'block',
            fontSize: '12px', // Updated to match your specification
            fontWeight: '500', // Updated to match your specification
            color: '#666666', // Updated to match your specification
            marginBottom: '8px'
          }}>
            COOKIES SUMMARY <span style={{ color: '#ef4444' }}>*</span>
          </label>
          <textarea
            value={cookiesData.summary}
            onChange={(e) => handleInputChange('summary', e.target.value)}
            rows={6}
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              fontSize: '14px',
              outline: 'none',
              resize: 'none',
              fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
              boxSizing: 'border-box'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#5A66F1';
              e.target.style.boxShadow = '0 0 0 2px rgba(59, 130, 246, 0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#d1d5db';
              e.target.style.boxShadow = 'none';
            }}
          />
        </div>
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 24px',
          backgroundColor: '#5A66F1',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          fontSize: '14px',
          cursor: 'pointer',
          marginTop: '32px'
        }}
        onMouseOver={(e) => e.target.style.backgroundColor = '#5A66F1'}
        onMouseOut={(e) => e.target.style.backgroundColor = '#5A66F1'}
      >
         <FaCheck size={16} />
        Save
      </button>
    </div>
  );
};

export default Cookies;