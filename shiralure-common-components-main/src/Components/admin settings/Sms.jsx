import React, { useState } from 'react';
import {Save} from 'lucide-react';
const SmsGateway = () => {
  const [activeTab, setActiveTab] = useState('TWILLIO');
  
  // Gateway configurations matching your exact UI
  const gatewayConfigs = {
    TWILLIO: {
      name: 'TWILLIO',
      fields: [
        { name: 'accountSid', label: 'TWILLIO ACCOUNT SID', type: 'text', row: 1, col: 1 },
        { name: 'authToken', label: 'TWILLIO AUTH TOKEN', type: 'text', row: 1, col: 2 },
        { name: 'from', label: 'TWILLIO FROM', type: 'text', row: 2, col: 1 },
        { name: 'status', label: 'TWILLIO STATUS', type: 'select', row: 2, col: 2, options: ['Active', 'Inactive'] }
      ]
    },
    BULKSMS: {
      name: 'BULKSMS',
      fields: [
        { name: 'username', label: 'BULKSMS USERNAME', type: 'text', row: 1, col: 1 },
        { name: 'password', label: 'BULKSMS PASSWORD', type: 'text', row: 1, col: 2 },
        { name: 'status', label: 'BULKSMS STATUS', type: 'select', row: 2, col: 1, options: ['Active', 'Inactive'] }
      ]
    },
    MSG91: {
      name: 'MSG91',
      fields: [
        { name: 'authKey', label: 'MSG91 AUTH KEY', type: 'text', row: 1, col: 1 },
        { name: 'senderId', label: 'MSG91 SENDER ID', type: 'text', row: 1, col: 2 },
        { name: 'route', label: 'MSG91 ROUTE', type: 'select', row: 2, col: 1, options: ['Transactional', 'Promotional'] },
        { name: 'status', label: 'MSG91 STATUS', type: 'select', row: 2, col: 2, options: ['Active', 'Inactive'] }
      ]
    },
    '2FACTOR': {
      name: '2FACTOR',
      fields: [
        { name: 'apiKey', label: '2FACTOR API KEY', type: 'text', row: 1, col: 1 },
        { name: 'templateId', label: '2FACTOR TEMPLATE ID', type: 'text', row: 1, col: 2 },
        { name: 'status', label: '2FACTOR STATUS', type: 'select', row: 2, col: 1, options: ['Active', 'Inactive'] }
      ]
    },
    BULKSMSSID: {
      name: 'BULKSMSSID',
      fields: [
        { name: 'username', label: 'BULKSMSSID USERNAME', type: 'text', row: 1, col: 1 },
        { name: 'password', label: 'BULKSMSSID PASSWORD', type: 'text', row: 1, col: 2 },
        { name: 'senderId', label: 'BULKSMSSID SENDER ID', type: 'text', row: 2, col: 1 },
        { name: 'status', label: 'BULKSMSSID STATUS', type: 'select', row: 2, col: 2, options: ['Active', 'Inactive'] }
      ]
    },
    TELESIGN: {
      name: 'TELESIGN',
      fields: [
        { name: 'customerId', label: 'TELESIGN CUSTOMER ID', type: 'text', row: 1, col: 1 },
        { name: 'apiKey', label: 'TELESIGN API KEY', type: 'text', row: 1, col: 2 },
        { name: 'messageType', label: 'TELESIGN MESSAGE TYPE', type: 'select', row: 2, col: 1, options: ['ARN', 'MKT', 'OTP'] },
        { name: 'status', label: 'TELESIGN STATUS', type: 'select', row: 2, col: 2, options: ['Active', 'Inactive'] }
      ]
    },
    CLICKATELL: {
      name: 'CLICKATELL',
      fields: [
        { name: 'apiKey', label: 'CLICKATELL API KEY', type: 'text', row: 1, col: 1 },
        { name: 'from', label: 'CLICKATELL FROM', type: 'text', row: 1, col: 2 },
        { name: 'messageType', label: 'CLICKATELL MESSAGE TYPE', type: 'select', row: 2, col: 1, options: ['Text', 'Unicode'] },
        { name: 'status', label: 'CLICKATELL STATUS', type: 'select', row: 2, col: 2, options: ['Active', 'Inactive'] }
      ]
    },
    NEXMO: {
      name: 'NEXMO',
      fields: [
        { name: 'apiKey', label: 'NEXMO API KEY', type: 'text', row: 1, col: 1 },
        { name: 'apiSecret', label: 'NEXMO API SECRET', type: 'text', row: 1, col: 2 },
        { name: 'from', label: 'NEXMO FROM', type: 'text', row: 2, col: 1 },
        { name: 'status', label: 'NEXMO STATUS', type: 'select', row: 2, col: 2, options: ['Active', 'Inactive'] }
      ]
    }
  };

  const moreGatewayOptions = ['MSG91', '2FACTOR', 'BULKSMSSID', 'TELESIGN', 'CLICKATELL', 'NEXMO'];

  const [formData, setFormData] = useState(() => {
    const initialData = {};
    Object.keys(gatewayConfigs).forEach(gateway => {
      initialData[gateway] = {};
      gatewayConfigs[gateway].fields.forEach(field => {
        initialData[gateway][field.name] = '';
      });
    });
    return initialData;
  });

  const handleInputChange = (gateway, field, value) => {
    setFormData(prev => ({
      ...prev,
      [gateway]: {
        ...prev[gateway],
        [field]: value
      }
    }));
  };

  const handleDropdownChange = (e) => {
    const selectedGateway = e.target.value;
    if (selectedGateway && selectedGateway !== '') {
      setActiveTab(selectedGateway);
    }
  };

  const renderFormFields = () => {
    const config = gatewayConfigs[activeTab];
    if (!config) return null;

    // Group fields by row
    const fieldsByRow = {};
    config.fields.forEach(field => {
      if (!fieldsByRow[field.row]) {
        fieldsByRow[field.row] = [];
      }
      fieldsByRow[field.row].push(field);
    });

    return Object.keys(fieldsByRow).map(rowNum => (
      <div key={rowNum} className="form-row">
        {fieldsByRow[rowNum].map(field => (
          <div key={field.name} className="form-group">
            <label className="form-label">{field.label}</label>
            {field.type === 'select' ? (
              <select 
                className="form-select"
                value={formData[activeTab]?.[field.name] || ''}
                onChange={(e) => handleInputChange(activeTab, field.name, e.target.value)}
              >
                <option value="">Select {field.label.split(' ').pop()}</option>
                {field.options.map(option => (
                  <option key={option} value={option.toLowerCase()}>{option}</option>
                ))}
              </select>
            ) : (
              <input 
                type="text"
                className="form-input"
                value={formData[activeTab]?.[field.name] || ''}
                onChange={(e) => handleInputChange(activeTab, field.name, e.target.value)}
              />
            )}
          </div>
        ))}
      </div>
    ));
  };

  return (
    <div className="sms-gateway-container">
      {/* Header Tabs */}
      <div className="header-tabs">
        <button 
          className={`tab-button ${activeTab === 'TWILLIO' ? 'active' : ''}`}
          onClick={() => setActiveTab('TWILLIO')}
        >
          TWILLIO
        </button>
        <button 
          className={`tab-button ${activeTab === 'BULKSMS' ? 'active' : ''}`}
          onClick={() => setActiveTab('BULKSMS')}
        >
          BULKSMS
        </button>
        <div className="dropdown-container">
          <select 
            className="gateway-dropdown"
            onChange={handleDropdownChange}
            value=""
          >
            <option value="">▼ MORE GATEWAY</option>
            {moreGatewayOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="section-title">{activeTab}</div>
        
        <div className="form-container">
          {renderFormFields()}
        </div>

        <button className="save-button">
          {/* <span className="save-icon">💾</span> */}
          <Save size={16} /> Save
        </button>
      </div>

      <style jsx>{`
        .sms-gateway-container {
          width: 100%;
          max-width: 600px;
          background-color: #f5f5f5;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .header-tabs {
          display: flex;
          align-items: center;
          background-color: #f5f5f5;
          padding: 0;
          border-bottom: 1px solid #e0e0e0;
        }

        .tab-button {
          padding: 12px 24px;
          border: none;
          background-color: transparent;
          color: #666;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          border-radius: 0;
        }

        .tab-button:hover {
          background-color: #e8e8e8;
        }

        .tab-button.active {
          background-color:#4752c4;
          color: white;
        }

        .dropdown-container {
          margin-left: auto;
          padding: 0 16px;
        }

        .gateway-dropdown {
          border: none;
          background-color: transparent;
          color: #666;
          font-size: 14px;
          cursor: pointer;
          outline: none;
          padding: 8px 4px;
        }

        .gateway-dropdown:hover {
          color: #333;
        }

        .main-content {
          background-color: white;
          padding: 32px;
        }

        .section-title {
          font-size: 18px;
          font-weight: 600;
          color: #333;
          margin-bottom: 32px;
          padding-bottom: 8px;
          border-bottom: 1px solid #f0f0f0;
        }

        .form-container {
          margin-bottom: 32px;
        }

        .form-row {
          display: flex;
          gap: 24px;
          margin-bottom: 24px;
        }

        .form-group {
          flex: 1;
        }

        .form-label {
          display: block;
          margin-bottom: 8px;
          font-size: 12px;
          font-weight: 500;
          color: #888;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .form-input {
          width: 100%;
          padding: 12px 16px;
          border: 2px solid #e5e5e5;
          border-radius: 4px;
          font-size: 14px;
          background-color: white;
          transition: border-color 0.2s ease;
          box-sizing: border-box;
        }

        .form-input:focus {
          outline: none;
          border-color:#4752c4;
        }

        .form-select {
          width: 100%;
          padding: 12px 16px;
          border: 2px solid #e5e5e5;
          border-radius: 4px;
          font-size: 14px;
          background-color: white;
          cursor: pointer;
          transition: border-color 0.2s ease;
          box-sizing: border-box;
          appearance: none;
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
          background-position: right 12px center;
          background-repeat: no-repeat;
          background-size: 16px;
          padding-right: 40px;
        }

        .form-select:focus {
          outline: none;
          border-color: #4752c4;
        }

        .save-button {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          background-color: #4752c4;
          color: white;
          border: none;
          border-radius: 4px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }

        .save-button:hover {
          background-color: #4752c4;
        }

        .save-icon {
          font-size: 16px;
        }

        @media (max-width: 640px) {
          .form-row {
            flex-direction: column;
            gap: 16px;
          }
          
          .main-content {
            padding: 24px 16px;
          }
          
          .header-tabs {
            flex-wrap: wrap;
          }
          
          .dropdown-container {
            width: 100%;
            margin-left: 0;
            padding: 8px 16px;
            border-top: 1px solid #e0e0e0;
          }
        }
      `}</style>
    </div>
  );
};

export default SmsGateway;