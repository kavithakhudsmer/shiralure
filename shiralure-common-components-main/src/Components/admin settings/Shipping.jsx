import React, { useState } from 'react';
import './Shipping.css';
import { Save } from 'lucide-react';
const ShippingSetup = () => {
  const [selectedMethod, setSelectedMethod] = useState('PRODUCT_WISE');
  const [flatRateCost, setFlatRateCost] = useState('');
  const [defaultShippingCost, setDefaultShippingCost] = useState('');

  const handleMethodChange = (method) => {
    setSelectedMethod(method);
  };

  const handleSave = () => {
    const shippingData = {
      method: selectedMethod,
      ...(selectedMethod === 'FLAT_RATE_WISE' && { flatRateCost }),
      ...(selectedMethod === 'AREA_WISE' && { defaultShippingCost })
    };
    console.log('Shipping data:', shippingData);
    // Handle save logic here
  };

  return (
    <div className="shipping-setup">
      <h2 className="shipping-title">Shipping Setup</h2>
      
      <div className="shipping-form">
        <div className="form-group">
          <label className="form-label">
            SELECT SHIPPING METHOD <span className="required">*</span>
          </label>
          
          <div className="radio-group">
            <label className="radio-option">
              <input
                type="radio"
                name="shippingMethod"
                value="PRODUCT_WISE"
                checked={selectedMethod === 'PRODUCT_WISE'}
                onChange={() => handleMethodChange('PRODUCT_WISE')}
              />
              <span className="radio-text">PRODUCT WISE</span>
            </label>
            
            <label className="radio-option">
              <input
                type="radio"
                name="shippingMethod"
                value="FLAT_RATE_WISE"
                checked={selectedMethod === 'FLAT_RATE_WISE'}
                onChange={() => handleMethodChange('FLAT_RATE_WISE')}
              />
              <span className="radio-text">FLAT RATE WISE</span>
            </label>
            
            <label className="radio-option">
              <input
                type="radio"
                name="shippingMethod"
                value="AREA_WISE"
                checked={selectedMethod === 'AREA_WISE'}
                onChange={() => handleMethodChange('AREA_WISE')}
              />
              <span className="radio-text">AREA WISE</span>
            </label>
          </div>
        </div>
        
        <button className="save-btn primary" onClick={handleSave}>
          <Save size={16} />Save
        </button>
      </div>

      {selectedMethod === 'FLAT_RATE_WISE' && (
        <div className="conditional-section">
          <h3 className="section-title">Flat Rate Wise</h3>
          <div className="form-group">
            <label className="form-label">
              SHIPPING COST <span className="required">*</span>
            </label>
            <input
              type="text"
              className="form-input"
              value={flatRateCost}
              onChange={(e) => setFlatRateCost(e.target.value)}
              placeholder="Enter shipping cost"
            />
          </div>
          <button className="save-btn primary" onClick={handleSave}>
            <Save size={16} /> Save
          </button>
        </div>
      )}

      {selectedMethod === 'AREA_WISE' && (
        <div className="conditional-section">
          <h3 className="section-title">Area Wise</h3>
          <div className="form-group">
            <label className="form-label">
              DEFAULT SHIPPING COST <span className="required">*</span>
            </label>
            <input
              type="text"
              className="form-input"
              value={defaultShippingCost}
              onChange={(e) => setDefaultShippingCost(e.target.value)}
              placeholder="Enter default shipping cost"
            />
          </div>
          <button className="save-btn primary" onClick={handleSave}>
            <Save size={16} /> Save
          </button>
        </div>
      )}
    </div>
  );
};

export default ShippingSetup;