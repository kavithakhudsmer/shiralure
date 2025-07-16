
import React, { useState } from 'react';
import { ChevronDown,Save } from 'lucide-react';

const OTPComponent = () => {
  const [otpType, setOtpType] = useState('');
  const [otpDigitLimit, setOtpDigitLimit] = useState('');
  const [otpExpireTime, setOtpExpireTime] = useState('');

  const handleSave = () => {
    console.log('Saving OTP settings:', {
      otpType,
      otpDigitLimit,
      otpExpireTime
    });
  };

  return (
    <div className="otp-container11">
      <h2 className="otp-title11">OTP</h2>
      
      <div className="form-row11">
        <div className="form-group11">
          <label className="form-label11">
            OTP TYPE <span className="required11">*</span>
          </label>
          <div className="select-container11">
            <select 
              className="form-select11"
              value={otpType}
              onChange={(e) => setOtpType(e.target.value)}
            >
              <option value="">--</option>
              <option value="numeric">Numeric</option>
              <option value="alphanumeric">Alphanumeric</option>
              <option value="alphabetic">Alphabetic</option>
            </select>
            <ChevronDown className="select-icon11" size={16} />
          </div>
        </div>

        <div className="form-group11">
          <label className="form-label11">
            OTP DIGIT LIMIT <span className="required11">*</span>
          </label>
          <div className="select-container11">
            <select 
              className="form-select11"
              value={otpDigitLimit}
              onChange={(e) => setOtpDigitLimit(e.target.value)}
            >
              <option value="">--</option>
              <option value="4">4 digits</option>
              <option value="6">6 digits</option>
              <option value="8">8 digits</option>
            </select>
            <ChevronDown className="select-icon11" size={16} />
          </div>
        </div>
      </div>

      <div className="form-group11">
        <label className="form-label11">
          OTP EXPIRE TIME <span className="required11">*</span>
        </label>
        <div className="select-container11">
          <select 
            className="form-select11"
            value={otpExpireTime}
            onChange={(e) => setOtpExpireTime(e.target.value)}
          >
            <option value="">--</option>
            <option value="1">1 minute</option>
            <option value="2">2 minutes</option>
            <option value="5">5 minutes</option>
            <option value="10">10 minutes</option>
            <option value="15">15 minutes</option>
          </select>
          <ChevronDown className="select-icon11" size={16} />
        </div>
      </div>

      <button className="save-button11" onClick={handleSave}>
        <Save size={16} />
        Save
      </button>

      <style jsx>{`
        .otp-container11 {
          max-width: 1200px;
          margin: 0 auto;
          padding: 24px;
          background-color: #f8f9fa;
          min-height: 100vh;
          font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        }

        .otp-title11 {
          font-size: 24px;
          font-weight: 600;
          color: #333;
          margin: 0 0 32px 0;
          padding-bottom: 16px;
          border-bottom: 1px solid #e5e7eb;
        }

        .form-row11 {
          display: flex;
          gap: 24px;
          margin-bottom: 24px;
        }

        .form-group11 {
          margin-bottom: 0;
          flex: 1;
        }

        .form-label11 {
          display: block;
          font-size: 12px;
          font-weight: 500;
          color: #6b7280;
          margin-bottom: 8px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .required11 {
          color: #ef4444;
        }

        .select-container11 {
          position: relative;
          width: 100%;
        }

        .form-select11 {
          width: 100%;
          height: 48px;
          padding: 0 40px 0 16px;
          border: 1px solid #d1d5db;
          border-radius: 4px;
          background: white;
          font-size: 14px;
          color: #9ca3af;
          appearance: none;
          cursor: pointer;
          transition: border-color 0.2s ease;
        }

        .form-select11:focus {
          outline: none;
          border-color: #6366f1;
          box-shadow: 0 0 0 1px rgba(99, 102, 241, 0.1);
        }

        .form-select11:hover {
          border-color: #9ca3af;
        }

        .select-icon11 {
          position: absolute;
          right: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: #9ca3af;
          pointer-events: none;
        }

        .save-button11 {
          background: #6366f1;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 4px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: background-color 0.2s ease;
          margin-top: 32px;
          height: 40px;
        }

        .save-button11:hover {
          background: #5855eb;
        }

        .save-button11:active {
          background: #4f46e5;
        }

        .save-icon11 {
          font-size: 16px;
        }

        @media (max-width: 768px) {
          .otp-container11 {
            padding: 16px;
          }

          .form-row11 {
            flex-direction: column;
            gap: 16px;
          }

          .form-group11 {
            max-width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default OTPComponent;