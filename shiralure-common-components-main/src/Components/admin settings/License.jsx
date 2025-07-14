import React, { useState } from 'react';
import './License.css';
import { Save } from 'lucide-react';

const License = () => {
  const [licenseKey, setLicenseKey] = useState('Shiralure');

  const handleSave = () => {
    console.log('License key saved:', licenseKey);
    // Add your save logic here
  };

  return (
    <div className="license-container">
      <div className="license-card">
        <h2 className="license-title">License</h2>
        
        <div className="license-form">
          <label htmlFor="licenseKey" className="license-label">
            License Key
          </label>
          <input
            type="text"
            id="licenseKey"
            value={licenseKey}
            onChange={(e) => setLicenseKey(e.target.value)}
            className="license-input"
            placeholder="Enter your license key"
          />
        </div>
        
        <div className="license-actions">
          <button onClick={handleSave} className="save-button">
            <Save size={16} />
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default License;