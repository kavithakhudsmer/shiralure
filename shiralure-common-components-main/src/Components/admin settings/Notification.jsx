
import React, { useState } from 'react';
import {Save} from 'lucide-react';
const Notification = () => {
  const [formData, setFormData] = useState({
    file: null,
    firebasePublicVapidKey: '',
    firebaseApiKey: '',
    firebaseAuthDomain: '',
    firebaseProjectId: '',
    firebaseStorageBucket: '',
    firebaseMessageSenderId: '',
    firebaseAppId: '',
    firebaseMeasurementId: ''
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, file });
  };

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSave = () => {
    console.log('Saving notification settings:', formData);
  };

  return (
    <div className="notification-container">
      {/* Notification Section */}
      <div className="notification-section">
        <h2 className="notification-title">Notification</h2>
        
        <div className="form-grid">
          <div className="form-group">
            <label className="form-label">
              FIREBASE PUBLIC VAPID KEY (KEY PAIR) <span className="required">*</span>
            </label>
            <input
              type="text"
              className="form-input"
              value={formData.firebasePublicVapidKey}
              onChange={(e) => handleInputChange('firebasePublicVapidKey', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              FIREBASE API KEY <span className="required">*</span>
            </label>
            <input
              type="text"
              className="form-input"
              value={formData.firebaseApiKey}
              onChange={(e) => handleInputChange('firebaseApiKey', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              FIREBASE AUTH DOMAIN <span className="required">*</span>
            </label>
            <input
              type="text"
              className="form-input"
              value={formData.firebaseAuthDomain}
              onChange={(e) => handleInputChange('firebaseAuthDomain', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              FIREBASE PROJECT ID <span className="required">*</span>
            </label>
            <input
              type="text"
              className="form-input"
              value={formData.firebaseProjectId}
              onChange={(e) => handleInputChange('firebaseProjectId', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              FIREBASE STORAGE BUCKET <span className="required">*</span>
            </label>
            <input
              type="text"
              className="form-input"
              value={formData.firebaseStorageBucket}
              onChange={(e) => handleInputChange('firebaseStorageBucket', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              FIREBASE MESSAGE SENDER ID <span className="required">*</span>
            </label>
            <input
              type="text"
              className="form-input"
              value={formData.firebaseMessageSenderId}
              onChange={(e) => handleInputChange('firebaseMessageSenderId', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              FIREBASE APP ID <span className="required">*</span>
            </label>
            <input
              type="text"
              className="form-input"
              value={formData.firebaseAppId}
              onChange={(e) => handleInputChange('firebaseAppId', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              FIREBASE MEASUREMENT ID <span className="required">*</span>
            </label>
            <input
              type="text"
              className="form-input"
              value={formData.firebaseMeasurementId}
              onChange={(e) => handleInputChange('firebaseMeasurementId', e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* File Upload Section */}
      <div className="file-section">
        <div className="form-group">
          <label className="form-label">
            FILE (JSON) <span className="required">*</span>
          </label>
          <div className="file-input-container">
            <input
              type="file"
              accept=".json"
              onChange={handleFileChange}
              className="file-input"
              id="file-upload"
            />
            <label htmlFor="file-upload" className="file-button">
              Choose File
            </label>
            <span className="file-status">
              {formData.file ? formData.file.name : 'No File Chosen'}
            </span>
          </div>
        </div>
        
        <button className="save-button" onClick={handleSave}>
          <Save size={16} />
          Save
        </button>
      </div>

      <style jsx>{`
        .notification-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 24px;
          background-color: #ffffff;
          min-height: 100vh;
          font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        }

        .file-section {
          background: white;
          border-radius: 8px;
          padding: 0; /* Removed padding to match Company, handled by main container */
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          margin-bottom: 24px; /* Updated to match formRow margin */
          max-width: 1200px;
          margin-left: auto;
          margin-right: auto;
        }

        .notification-section {
          background-color: #ffffff;
          border:none;
          
          padding: 0; /* Removed padding to match Company */
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          max-width: 1200px;
          margin: 0 auto;
        }

        .notification-title {
          font-size: 24px;
          font-weight: 600;
          color: #333;
          margin: 0 0 32px 0;
          padding-bottom: 16px;
          border-bottom: 1px solid #e5e7eb;
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }

        .form-group {
          margin-bottom: 0;
        }

        .form-label {
          display: block;
          font-size: 12px;
          font-weight: 500; /* Updated to match Company */
          color: #6b7280;
          margin-bottom: 8px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .required {
          color: #ef4444;
        }

        .form-input {
          width: 100%;
          height: 48px;
          padding: 0 16px;
          border: 1px solid #d1d5db;
          border-radius: 4px;
          background: white;
          font-size: 14px;
          color: #374151;
          transition: border-color 0.2s ease;
        }

        .form-input:focus {
          outline: none;
          border-color: #6366f1;
          box-shadow: 0 0 0 1px rgba(99, 102, 241, 0.1);
        }

        .form-input:hover {
          border-color: #9ca3af;
        }

        .file-input-container {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .file-input {
          display: none;
        }

        .file-button {
          background: #f3f4f6;
          border: 1px solid #d1d5db;
          padding: 12px 20px;
          border-radius: 4px;
          font-size: 14px;
          color: #374151;
          cursor: pointer;
          transition: background-color 0.2s ease;
          height: 48px;
          display: flex;
          align-items: center;
        }

        .file-button:hover {
          background: #e5e7eb;
        }

        .file-status {
          font-size: 14px;
          color: #6b7280;
          flex: 1;
        }

        .save-button {
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
          margin-top: 32px; /* Updated to match Company */
          height: 40px;
        }

        .save-button:hover {
          background: #5855eb;
        }

        .save-button:active {
          background: #4f46e5;
        }

        .save-icon {
          font-size: 16px;
        }

        @media (max-width: 768px) {
          .notification-container {
            padding: 16px;
          }
          
          .file-section,
          .notification-section {
            padding: 0; /* Removed padding to match Company */
            max-width: 100%;
          }

          .form-grid {
            grid-template-columns: 1fr;
            gap: 16px; /* Updated to match Company mobile gap */
          }

          .file-input-container {
            flex-direction: column;
            align-items: stretch;
            gap: 8px;
          }

          .file-button {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
};

export default Notification;