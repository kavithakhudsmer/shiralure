
import React, { useState } from 'react';
import {Save} from 'lucide-react';
<div className="some-style">Hello</div>
const NotificationComponent= () => {
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
    <div className="notification-container9">
      {/* Notification Section */}
      <div className="notification-section9">
        <h2 className="notification-title9">Notification</h2>
        
        <div className="form-grid9">
          <div className="form-group9">
            <label className="form-label9">
              FIREBASE PUBLIC VAPID KEY (KEY PAIR) <span className="required9">*</span>
            </label>
            <input
              type="text"
              className="form-input9"
              value={formData.firebasePublicVapidKey}
              onChange={(e) => handleInputChange('firebasePublicVapidKey', e.target.value)}
            />
          </div>

          <div className="form-group9">
            <label className="form-label9">
              FIREBASE API KEY <span className="required9">*</span>
            </label>
            <input
              type="text"
              className="form-input9"
              value={formData.firebaseApiKey}
              onChange={(e) => handleInputChange('firebaseApiKey', e.target.value)}
            />
          </div>

          <div className="form-group9">
            <label className="form-label9">
              FIREBASE AUTH DOMAIN <span className="required9">*</span>
            </label>
            <input
              type="text"
              className="form-input9"
              value={formData.firebaseAuthDomain}
              onChange={(e) => handleInputChange('firebaseAuthDomain', e.target.value)}
            />
          </div>

          <div className="form-group9">
            <label className="form-label9">
              FIREBASE PROJECT ID <span className="required9">*</span>
            </label>
            <input
              type="text"
              className="form-input9"
              value={formData.firebaseProjectId}
              onChange={(e) => handleInputChange('firebaseProjectId', e.target.value)}
            />
          </div>

          <div className="form-group9">
            <label className="form-label9">
              FIREBASE STORAGE BUCKET <span className="required9">*</span>
            </label>
            <input
              type="text"
              className="form-input9"
              value={formData.firebaseStorageBucket}
              onChange={(e) => handleInputChange('firebaseStorageBucket', e.target.value)}
            />
          </div>

          <div className="form-group9">
            <label className="form-label9">
              FIREBASE MESSAGE SENDER ID <span className="required9">*</span>
            </label>
            <input
              type="text"
              className="form-input9"
              value={formData.firebaseMessageSenderId}
              onChange={(e) => handleInputChange('firebaseMessageSenderId', e.target.value)}
            />
          </div>

          <div className="form-group9">
            <label className="form-label9">
              FIREBASE APP ID <span className="required9">*</span>
            </label>
            <input
              type="text"
              className="form-input9"
              value={formData.firebaseAppId}
              onChange={(e) => handleInputChange('firebaseAppId', e.target.value)}
            />
          </div>

          <div className="form-group9">
            <label className="form-label9">
              FIREBASE MEASUREMENT ID <span className="required9">*</span>
            </label>
            <input
              type="text"
              className="form-input9"
              value={formData.firebaseMeasurementId}
              onChange={(e) => handleInputChange('firebaseMeasurementId', e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* File Upload Section */}
      <div className="file-section9">
        <div className="form-group9">
          <label className="form-label9">
            FILE (JSON) <span className="required9">*</span>
          </label>
          <div className="file-input-container9">
            <input
              type="file"
              accept=".json"
              onChange={handleFileChange}
              className="file-input9"
              id="file-upload9"
            />
            <label htmlFor="file-upload9" className="file-button9">
              Choose File
            </label>
            <span className="file-status9">
              {formData.file ? formData.file.name : 'No File Chosen'}
            </span>
          </div>
        </div>
        
        <button className="save-button9" onClick={handleSave}>
          <Save size={16} />
          Save
        </button>
      </div>

      <style jsx>{`
        .notification-container9 {
          max-width: 1200px;
          margin: 0 auto;
          padding: 24px;
          background-color: #ffffff;
          min-height: 100vh;
          font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        }

        .file-section9 {
          background: white;
          border-radius: 8px;
          padding: 0;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          margin-bottom: 24px;
          max-width: 1200px;
          margin-left: auto;
          margin-right: auto;
        }

        .notification-section9 {
          background-color: #ffffff;
          border: none;
          padding: 0;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          max-width: 1200px;
          margin: 0 auto;
        }

        .notification-title9 {
          font-size: 24px;
          font-weight: 600;
          color: #333;
          margin: 0 0 32px 0;
          padding-bottom: 16px;
          border-bottom: 1px solid #e5e7eb;
        }

        .form-grid9 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }

        .form-group9 {
          margin-bottom: 0;
        }

        .form-label9 {
          display: block;
          font-size: 12px;
          font-weight: 500;
          color: #6b7280;
          margin-bottom: 8px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .required9 {
          color: #ef4444;
        }

        .form-input9 {
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

        .form-input9:focus {
          outline: none;
          border-color: #6366f1;
          box-shadow: 0 0 0 1px rgba(99, 102, 241, 0.1);
        }

        .form-input9:hover {
          border-color: #9ca3af;
        }

        .file-input-container9 {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .file-input9 {
          display: none;
        }

        .file-button9 {
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

        .file-button9:hover {
          background: #e5e7eb;
        }

        .file-status9 {
          font-size: 14px;
          color: #6b7280;
          flex: 1;
        }

        .save-button9 {
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

        .save-button9:hover {
          background: #5855eb;
        }

        .save-button9:active {
          background: #4f46e5;
        }

        .save-icon9 {
          font-size: 16px;
        }

        @media (max-width: 768px) {
          .notification-container9 {
            padding: 16px;
          }
          
          .file-section9,
          .notification-section9 {
            padding: 0;
            max-width: 100%;
          }

          .form-grid9 {
            grid-template-columns: 1fr;
            gap: 16px;
          }

          .file-input-container9 {
            flex-direction: column;
            align-items: stretch;
            gap: 8px;
          }

          .file-button9 {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
};

export default NotificationComponent;