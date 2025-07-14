import React, { useState } from 'react';
import './Theme.css';
import {Save} from 'lucide-react';

const ThemeComponent = () => {
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [logoFile, setLogoFile] = useState(null);
  const [favIconFile, setFavIconFile] = useState(null);
  const [footerLogoFile, setFooterLogoFile] = useState(null);

  const handleFileUpload = (fileType) => {
    // Simulate file upload
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (fileType === 'logo') {
            setLogoFile(e.target.result);
          } else if (fileType === 'favicon') {
            setFavIconFile(e.target.result);
          } else if (fileType === 'footer') {
            setFooterLogoFile(e.target.result);
          }
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const openUploadModal = () => {
    setUploadModalOpen(true);
  };

  const closeUploadModal = () => {
    setUploadModalOpen(false);
  };

  const handleSave = () => {
    // Handle save logic here
    console.log('Theme saved');
  };

  return (
    <div className="theme-container">
      <h2 className="theme-title">Theme</h2>
      
      <div className="theme-grid">
        {/* Logo Section */}
        <div className="theme-section">
          <label className="section-label">LOGO (128PX,43PX)</label>
          <div className="upload-area" onClick={() => handleFileUpload('logo')}>
            <div className="upload-icon">📁</div>
            <span className="upload-text">No File Chosen</span>
          </div>
          {logoFile && (
            <div className="preview-container">
              <img src={logoFile} alt="Logo preview" className="logo-preview" />
            </div>
          )}
          {!logoFile && (
            <div className="default-logo">
              <span className="logo-text">SL</span>
            </div>
          )}
        </div>

        {/* Favicon Section */}
        <div className="theme-section">
          <label className="section-label">FAV ICON (120PX,120PX)</label>
          <div className="upload-area" onClick={() => handleFileUpload('favicon')}>
            <div className="upload-icon">📁</div>
            <span className="upload-text">No File Chosen</span>
          </div>
          {favIconFile && (
            <div className="preview-container">
              <img src={favIconFile} alt="Favicon preview" className="favicon-preview" />
            </div>
          )}
          {!favIconFile && (
            <div className="default-favicon">
              <span className="logo-text">SL</span>
            </div>
          )}
        </div>

        {/* Footer Logo Section */}
        <div className="theme-section">
          <label className="section-label">FOOTER LOGO (144PX,48PX)</label>
          <div className="upload-area" onClick={() => handleFileUpload('footer')}>
            <div className="upload-icon">📁</div>
            <span className="upload-text">No File Chosen</span>
          </div>
          {footerLogoFile && (
            <div className="preview-container">
              <img src={footerLogoFile} alt="Footer logo preview" className="footer-logo-preview" />
            </div>
          )}
          {!footerLogoFile && (
            <div className="default-footer-logo">
              <span className="logo-text">SL</span>
            </div>
          )}
        </div>
      </div>

      {/* Save Button */}
      <button className="save-button" onClick={handleSave}>
        <Save size={16} /> Save
      </button>

      {/* Upload Modal */}
      {uploadModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Upload Logo</h3>
              <button className="close-button" onClick={closeUploadModal}>✕</button>
            </div>
            <div className="modal-body">
              <div className="user-info">
                <div className="avatar-placeholder">
                  <span className="logo-text">SL</span>
                </div>
                <div className="user-details">
                  <h4>John Doe</h4>
                  <span className="admin-badge">Admin</span>
                </div>
              </div>
              <button className="choose-file-button" onClick={() => handleFileUpload('logo')}>
                📁 Choose File
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemeComponent;