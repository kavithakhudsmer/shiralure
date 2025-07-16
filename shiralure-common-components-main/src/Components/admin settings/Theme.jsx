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
    <div className="theme-container27">
      <h2 className="theme-title27">Theme</h2>
      
      <div className="theme-grid27">
        {/* Logo Section */}
        <div className="theme-section27">
          <label className="section-label27">LOGO (128PX,43PX)</label>
          <div className="upload-area27" onClick={() => handleFileUpload('logo')}>
            <div className="upload-icon27">📁</div>
            <span className="upload-text27">No File Chosen</span>
          </div>
          {logoFile && (
            <div className="preview-container27">
              <img src={logoFile} alt="Logo preview" className="logo-preview27" />
            </div>
          )}
          {!logoFile && (
            <div className="default-logo27">
              <span className="logo-text27">SL</span>
            </div>
          )}
        </div>

        {/* Favicon Section */}
        <div className="theme-section27">
          <label className="section-label27">FAV ICON (120PX,120PX)</label>
          <div className="upload-area27" onClick={() => handleFileUpload('favicon')}>
            <div className="upload-icon27">📁</div>
            <span className="upload-text27">No File Chosen</span>
          </div>
          {favIconFile && (
            <div className="preview-container27">
              <img src={favIconFile} alt="Favicon preview" className="favicon-preview27" />
            </div>
          )}
          {!favIconFile && (
            <div className="default-favicon27">
              <span className="logo-text27">SL</span>
            </div>
          )}
        </div>

        {/* Footer Logo Section */}
        <div className="theme-section27">
          <label className="section-label27">FOOTER LOGO (144PX,48PX)</label>
          <div className="upload-area27" onClick={() => handleFileUpload('footer')}>
            <div className="upload-icon27">📁</div>
            <span className="upload-text27">No File Chosen</span>
          </div>
          {footerLogoFile && (
            <div className="preview-container27">
              <img src={footerLogoFile} alt="Footer logo preview" className="footer-logo-preview27" />
            </div>
          )}
          {!footerLogoFile && (
            <div className="default-footer-logo27">
              <span className="logo-text27">SL</span>
            </div>
          )}
        </div>
      </div>

      {/* Save Button */}
      <button className="save-button27" onClick={handleSave}>
        <Save size={16} /> Save
      </button>

      {/* Upload Modal */}
      {uploadModalOpen && (
        <div className="modal-overlay27">
          <div className="modal-content27">
            <div className="modal-header27">
              <h3>Upload Logo</h3>
              <button className="close-button27" onClick={closeUploadModal}>✕</button>
            </div>
            <div className="modal-body27">
              <div className="user-info27">
                <div className="avatar-placeholder27">
                  <span className="logo-text27">SL</span>
                </div>
                <div className="user-details27">
                  <h4>John Doe</h4>
                  <span className="admin-badge27">Admin</span>
                </div>
              </div>
              <button className="choose-file-button27" onClick={() => handleFileUpload('logo')}>
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