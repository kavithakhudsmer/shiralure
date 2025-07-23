import React, { useState } from 'react';
import './Shipping.css';
import { FaCheck } from "react-icons/fa";
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
    <div className="shipping-setup21">
      <h2 className="shipping-title21">Shipping Setup</h2>
      
      <div className="shipping-form21">
        <div className="form-group21">
          <label className="form-label21">
            SELECT SHIPPING METHOD <span className="required21">*</span>
          </label>
          
          <div className="radio-group21">
            <label className="radio-option21">
              <input
                type="radio"
                name="shippingMethod"
                value="PRODUCT_WISE"
                checked={selectedMethod === 'PRODUCT_WISE'}
                onChange={() => handleMethodChange('PRODUCT_WISE')}
              />
              <span className="radio-text21">PRODUCT WISE</span>
            </label>
            
            <label className="radio-option21">
              <input
                type="radio"
                name="shippingMethod"
                value="FLAT_RATE_WISE"
                checked={selectedMethod === 'FLAT_RATE_WISE'}
                onChange={() => handleMethodChange('FLAT_RATE_WISE')}
              />
              <span className="radio-text21">FLAT RATE WISE</span>
            </label>
            
            <label className="radio-option21">
              <input
                type="radio"
                name="shippingMethod"
                value="AREA_WISE"
                checked={selectedMethod === 'AREA_WISE'}
                onChange={() => handleMethodChange('AREA_WISE')}
              />
              <span className="radio-text21">AREA WISE</span>
            </label>
          </div>
        </div>
        
        <button className="save-btn21 primary21" onClick={handleSave}>
          <FaCheck size={16} />Save
        </button>
      </div>

      {selectedMethod === 'FLAT_RATE_WISE' && (
        <div className="conditional-section21">
          <h3 className="section-title21">Flat Rate Wise</h3>
          <div className="form-group21">
            <label className="form-label21">
              SHIPPING COST <span className="required21">*</span>
            </label>
            <input
              type="text"
              className="form-input21"
              value={flatRateCost}
              onChange={(e) => setFlatRateCost(e.target.value)}
              placeholder="Enter shipping cost"
            />
          </div>
          <button className="save-btn21 primary21" onClick={handleSave}>
            <FaCheck size={16} /> Save
          </button>
        </div>
      )}

      {selectedMethod === 'AREA_WISE' && (
        <div className="conditional-section21">
          <h3 className="section-title21">Area Wise</h3>
          <div className="form-group21">
            <label className="form-label21">
              DEFAULT SHIPPING COST <span className="required21">*</span>
            </label>
            <input
              type="text"
              className="form-input21"
              value={defaultShippingCost}
              onChange={(e) => setDefaultShippingCost(e.target.value)}
              placeholder="Enter default shipping cost"
            />
          </div>
          <button className="save-btn21 primary21" onClick={handleSave}>
            <FaCheck size={16} /> Save
          </button>
        </div>
      )}
    </div>
  );
};

export default ShippingSetup;