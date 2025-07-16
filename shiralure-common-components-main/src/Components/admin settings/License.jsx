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
   <div className="license-container6">
  <div className="license-card6">
    <h2 className="license-title6">License</h2>
    
    <div className="license-form6">
      <label htmlFor="licenseKey" className="license-label6">
        License Key
      </label>
      <input
        type="text"
        id="licenseKey"
        value={licenseKey}
        onChange={(e) => setLicenseKey(e.target.value)}
        className="license-input6"
        placeholder="Enter your license key"
      />
    </div>
    
    <div className="license-actions6">
      <button onClick={handleSave} className="save-button6">
        <Save size={16} />
        Save
      </button>
    </div>
  </div>
</div>
  );
};

export default License;