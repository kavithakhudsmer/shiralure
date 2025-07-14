import React, { useState } from 'react';
import {Save} from 'lucide-react';
const PaymentGateway = () => {
  const [activeTab, setActiveTab] = useState('RAZORPAY');
  const [showDropdown, setShowDropdown] = useState(false);
  const [razorpayData, setRazorpayData] = useState({
    key: '',
    secret: '',
    status: '',
    mode: ''
  });
  const [phonePeData, setPhonePeData] = useState({
    merchantId: '',
    merchantUserId: '',
    phoneKeyIndex: '',
    phonePeKey: '',
    status: '',
    mode: ''
  });
  const [paytmData, setPaytmData] = useState({
    merchantId: '',
    merchantKey: '',
    merchantWebsite: '',
    channel: '',
    industryType: '',
    mode: '',
    status: ''
  });

  const paymentProviders = [
    'PAYSTACK', 'SSLCOMMERZ', 'MOLLIE', 'SENANGPAY', 'BCASH', 'MERCADOPAGO', 
    'CASHFREE', 'PAYFAST', 'SKRILL', 'IYZICO', 'TELR', 'PESAPAL', 'MIDTRANS'
  ];

  const handleMoreGatewayClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleDropdownItemClick = (provider) => {
    setActiveTab(provider);
    setShowDropdown(false);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'RAZORPAY':
        return (
          <div className="tab-content">
            <h2>RAZORPAY</h2>
            <div className="form-grid">
              <div className="form-group">
                <label>RAZORPAY KEY</label>
                <input
                  type="text"
                  value={razorpayData.key}
                  onChange={(e) => setRazorpayData({...razorpayData, key: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>RAZORPAY SECRET</label>
                <input
                  type="text"
                  value={razorpayData.secret}
                  onChange={(e) => setRazorpayData({...razorpayData, secret: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>RAZORPAY STATUS</label>
                <div className="select-wrapper">
                  <select
                    value={razorpayData.status}
                    onChange={(e) => setRazorpayData({...razorpayData, status: e.target.value})}
                  >
                    <option value="">Select Status</option>
                    <option value="Enable">Enable</option>
                    <option value="Disable">Disable</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>RAZORPAY MODE</label>
                <div className="select-wrapper">
                  <select
                    value={razorpayData.mode}
                    onChange={(e) => setRazorpayData({...razorpayData, mode: e.target.value})}
                  >
                    <option value="">Select Mode</option>
                    <option value="Sandbox">Sandbox</option>
                    <option value="Live">Live</option>
                  </select>
                </div>
              </div>
            </div>
            <button className="save-btn">
              <Save size={16} />  Save
            </button>
          </div>
        );

      case 'PHONEPE':
        return (
          <div className="tab-content">
            <h2>PHONEPE</h2>
            <div className="form-grid">
              <div className="form-group">
                <label>PHONEPE MERCHANT ID</label>
                <input
                  type="text"
                  value={phonePeData.merchantId}
                  onChange={(e) => setPhonePeData({...phonePeData, merchantId: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>PHONEPE MERCHANT USER ID</label>
                <input
                  type="text"
                  value={phonePeData.merchantUserId}
                  onChange={(e) => setPhonePeData({...phonePeData, merchantUserId: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>PHONE KEY INDEX</label>
                <input
                  type="text"
                  value={phonePeData.phoneKeyIndex}
                  onChange={(e) => setPhonePeData({...phonePeData, phoneKeyIndex: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>PHONEPE KEY</label>
                <input
                  type="text"
                  value={phonePeData.phonePeKey}
                  onChange={(e) => setPhonePeData({...phonePeData, phonePeKey: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>PHONEPE STATUS</label>
                <div className="select-wrapper">
                  <select
                    value={phonePeData.status}
                    onChange={(e) => setPhonePeData({...phonePeData, status: e.target.value})}
                  >
                    <option value="">Select Status</option>
                    <option value="Enable">Enable</option>
                    <option value="Disable">Disable</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>PHONEPE MODE</label>
                <div className="select-wrapper">
                  <select
                    value={phonePeData.mode}
                    onChange={(e) => setPhonePeData({...phonePeData, mode: e.target.value})}
                  >
                    <option value="">Select Mode</option>
                    <option value="Sandbox">Sandbox</option>
                    <option value="Live">Live</option>
                  </select>
                </div>
              </div>
            </div>
            <button className="save-btn">
              <Save size={16} />  Save
            </button>
          </div>
        );

      case 'PAYTM':
        return (
          <div className="tab-content">
            <h2>PAYTM</h2>
            <div className="form-grid">
              <div className="form-group">
                <label>PAYTM MERCHANT ID</label>
                <input
                  type="text"
                  value={paytmData.merchantId}
                  onChange={(e) => setPaytmData({...paytmData, merchantId: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>PAYTM MERCHANT KEY</label>
                <input
                  type="text"
                  value={paytmData.merchantKey}
                  onChange={(e) => setPaytmData({...paytmData, merchantKey: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>PAYTM MERCHANT WEBSITE</label>
                <input
                  type="text"
                  value={paytmData.merchantWebsite}
                  onChange={(e) => setPaytmData({...paytmData, merchantWebsite: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>PAYTM CHANNEL</label>
                <input
                  type="text"
                  value={paytmData.channel}
                  onChange={(e) => setPaytmData({...paytmData, channel: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>PAYTM INDUSTRY TYPE</label>
                <input
                  type="text"
                  value={paytmData.industryType}
                  onChange={(e) => setPaytmData({...paytmData, industryType: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>PAYTM MODE</label>
                <div className="select-wrapper">
                  <select
                    value={paytmData.mode}
                    onChange={(e) => setPaytmData({...paytmData, mode: e.target.value})}
                  >
                    <option value="">Select Mode</option>
                    <option value="Sandbox">Sandbox</option>
                    <option value="Live">Live</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>PAYTM STATUS</label>
                <div className="select-wrapper">
                  <select
                    value={paytmData.status}
                    onChange={(e) => setPaytmData({...paytmData, status: e.target.value})}
                  >
                    <option value="">Select Status</option>
                    <option value="Enable">Enable</option>
                    <option value="Disable">Disable</option>
                  </select>
                </div>
              </div>
            </div>
            <button className="save-btn">
              <Save size={16} />  Save
            </button>
          </div>
        );

      case 'SSLCOMMERZ':
        return (
          <div className="tab-content">
            <h2>SSLCOMMERZ</h2>
            <div className="form-grid">
              <div className="form-group">
                <label>SSLCOMMERZ STORE NAME</label>
                <input type="text" />
              </div>
              <div className="form-group">
                <label>SSLCOMMERZ STORE ID</label>
                <input type="text" />
              </div>
              <div className="form-group">
                <label>SSLCOMMERZ STORE PASSWORD</label>
                <input type="text" />
              </div>
              <div className="form-group">
                <label>SSLCOMMERZ MODE</label>
                <div className="select-wrapper">
                  <select>
                    <option value="">Select Mode</option>
                    <option value="Sandbox">Sandbox</option>
                    <option value="Live">Live</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>SSLCOMMERZ STATUS</label>
                <div className="select-wrapper">
                  <select>
                    <option value="">Select Status</option>
                    <option value="Enable">Enable</option>
                    <option value="Disable">Disable</option>
                  </select>
                </div>
              </div>
            </div>
            <button className="save-btn">
              <Save size={16} /> Save
            </button>
          </div>
        );

      case 'SENANGPAY':
        return (
          <div className="tab-content">
            <h2>SENANGPAY</h2>
            <div className="form-grid">
              <div className="form-group">
                <label>SENANGPAY MERCHANT ID</label>
                <input type="text" />
              </div>
              <div className="form-group">
                <label>SENANGPAY SECRET KEY</label>
                <input type="text" />
              </div>
              <div className="form-group">
                <label>SENANGPAY STATUS</label>
                <div className="select-wrapper">
                  <select>
                    <option value="">Select Status</option>
                    <option value="Enable">Enable</option>
                    <option value="Disable">Disable</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>SENANGPAY MODE</label>
                <div className="select-wrapper">
                  <select>
                    <option value="">Select Mode</option>
                    <option value="Sandbox">Sandbox</option>
                    <option value="Live">Live</option>
                  </select>
                </div>
              </div>
            </div>
            <button className="save-btn">
              <Save size={16} /> Save
            </button>
          </div>
        );

      default:
        return (
          <div className="tab-content">
            <h2>{activeTab}</h2>
            <div className="form-grid">
              <div className="form-group">
                <label>{activeTab} API KEY</label>
                <input type="text" />
              </div>
              <div className="form-group">
                <label>{activeTab} SECRET KEY</label>
                <input type="text" />
              </div>
              <div className="form-group">
                <label>{activeTab} STATUS</label>
                <div className="select-wrapper">
                  <select>
                    <option value="">Select Status</option>
                    <option value="Enable">Enable</option>
                    <option value="Disable">Disable</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>{activeTab} MODE</label>
                <div className="select-wrapper">
                  <select>
                    <option value="">Select Mode</option>
                    <option value="Sandbox">Sandbox</option>
                    <option value="Live">Live</option>
                  </select>
                </div>
              </div>
            </div>
            <button className="save-btn"><Save size={16} /> Save</button>
          </div>
        );
    }
  };

  return (
    <div className="payment-gateway-container">
      <div className="tabs-header">
        <button
          className={`tab ${activeTab === 'RAZORPAY' ? 'active' : ''}`}
          onClick={() => setActiveTab('RAZORPAY')}
        >
          RAZORPAY
        </button>
        <button
          className={`tab ${activeTab === 'PHONEPE' ? 'active' : ''}`}
          onClick={() => setActiveTab('PHONEPE')}
        >
          PHONEPE
        </button>
        <button
          className={`tab ${activeTab === 'PAYTM' ? 'active' : ''}`}
          onClick={() => setActiveTab('PAYTM')}
        >
          PAYTM
        </button>
        <div className="dropdown-container">
          <button
            className={`tab dropdown-tab ${paymentProviders.includes(activeTab) ? 'active' : ''}`}
            onClick={handleMoreGatewayClick}
          >
            <span className="dropdown-arrow">▼</span> MORE GATEWAY
          </button>
          
          {showDropdown && (
            <div className="dropdown-menu">
              {paymentProviders.map((provider, index) => (
                <button
                  key={index}
                  className={`dropdown-item ${activeTab === provider ? 'active' : ''}`}
                  onClick={() => handleDropdownItemClick(provider)}
                >
                  {provider}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      {renderTabContent()}
      
      <style jsx>{`
        .payment-gateway-container {
          width: 100%;
          max-width: 800px;
          margin: 0 auto;
          background: #f5f6fa;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
          position: relative;
        }

        .tabs-header {
          display: flex;
          background: #f5f6fa;
          border-bottom: 1px solid #ddd;
          padding: 0;
          position: relative;
        }

        .tab {
          flex: 1;
          padding: 14px 20px;
          background: transparent;
          border: none;
          cursor: pointer;
          font-size: 13px;
          font-weight: 500;
          color: #666;
          transition: all 0.2s ease;
          border-bottom: 2px solid transparent;
          position: relative;
        }

        .tab:hover {
          background: #eee;
          color: #333;
        }

        .tab.active {
          background: #4752c4;
          color: white;
          border-bottom: 2px solid #4752c4;
        }

        .dropdown-container {
          position: relative;
        }

        .dropdown-tab {
          flex: 1;
          padding: 14px 20px;
          background: transparent;
          border: none;
          cursor: pointer;
          font-size: 13px;
          font-weight: 500;
          color: #666;
          transition: all 0.2s ease;
          border-bottom: 2px solid transparent;
          position: relative;
        }

        .dropdown-tab:hover {
          background: #eee;
          color: #333;
        }

        .dropdown-tab.active {
          background: #4752c4;
          color: white;
          border-bottom: 2px solid #4752c4;
        }

        .dropdown-arrow {
          font-size: 10px;
          margin-right: 6px;
        }

        .dropdown-menu {
          position: absolute;
          top: 100%;
          right: 0;
          background: white;
          border: 1px solid #ddd;
          border-radius: 4px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          z-index: 1000;
          min-width: 180px;
          max-height: 300px;
          overflow-y: auto;
        }

        .dropdown-item {
          display: block;
          width: 100%;
          padding: 10px 15px;
          background: white;
          border: none;
          cursor: pointer;
          font-size: 12px;
          color: #666;
          text-align: left;
          transition: all 0.2s ease;
          border-bottom: 1px solid #f0f0f0;
        }

        .dropdown-item:hover {
          background: #f8f9fa;
          color: #333;
        }

        .dropdown-item.active {
          background: #4752c4;
          color: white;
        }

        .dropdown-item:last-child {
          border-bottom: none;
        }

        .tab-content {
          padding: 30px;
          background: white;
          min-height: 400px;
        }

        .tab-content h2 {
          font-size: 20px;
          font-weight: 600;
          color: #333;
          margin: 0 0 30px 0;
          padding-bottom: 10px;
          border-bottom: 1px solid #e9ecef;
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 30px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        .form-group label {
          font-size: 12px;
          font-weight: 500;
          color: #6c757d;
          margin-bottom: 8px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .form-group input {
          padding: 10px 12px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 13px;
          background: white;
          transition: border-color 0.2s ease;
          color: #333;
        }

        .form-group input:focus {
          outline: none;
          border-color: #4752c4;
          box-shadow: 0 0 0 1px rgba(124, 77, 255, 0.2);
        }

        .select-wrapper {
          position: relative;
        }

        .select-wrapper select {
          width: 100%;
          padding: 10px 12px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 13px;
          background: white;
          cursor: pointer;
          appearance: none;
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23999' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
          background-position: right 8px center;
          background-repeat: no-repeat;
          background-size: 12px;
          padding-right: 30px;
          color: #333;
        }

        .select-wrapper select:focus {
          outline: none;
          border-color: #4752c4;
          box-shadow: 0 0 0 1px rgba(124, 77, 255, 0.2);
        }

        .save-btn {
          background: #4752c4;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 4px;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.2s ease;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .save-btn:hover {
          background: #3d47b3;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .payment-gateway-container {
            margin: 10px;
            border-radius: 8px;
          }
          
          .tabs-header {
            flex-wrap: wrap;
          }
          
          .tab, .dropdown-tab {
            min-width: 120px;
            font-size: 12px;
            padding: 10px 15px;
          }
          
          .tab-content {
            padding: 20px;
          }
          
          .form-grid {
            grid-template-columns: 1fr;
            gap: 15px;
          }
          
          .dropdown-menu {
            right: 0;
            left: auto;
          }
        }

        @media (max-width: 480px) {
          .tab, .dropdown-tab {
            font-size: 11px;
            padding: 8px 12px;
          }
          
          .tab-content {
            padding: 15px;
          }
          
          .tab-content h2 {
            font-size: 18px;
          }
        }
      `}</style>
    </div>
  );
};

export default PaymentGateway;