// SupplierDetails.jsx
import React from 'react';
import './SDetails.css';

const SupplierDetails = ({ supplier, onBack }) => {
  // Default avatar using the provided emoji image
  const defaultAvatar = "https://images.emojiterra.com/microsoft/fluent-emoji/15.1/3d/1f9d4-1f3fb_3d.png";

  return (
    <div className="supplier-details-container">
      {/* Header with back button */}
      <div className="supplier-details-header">
        <button className="back-button" onClick={onBack}>
          <span className="back-arrow">←</span>
          Back to Suppliers
        </button>
        {/* <div className="supplier-header-actions">
          <button className="edit-supplier-btn">
            <span className="edit-icon">✏️</span>
            Edit Supplier
          </button>
        </div> */}
      </div>

      {/* Main content */}
      <div className="supplier-details-content">
        {/* Profile Section */}
        <div className="supplier-profile-section">
          <div className="supplier-avatar-container">
            <img
              src={supplier.image || defaultAvatar}
              alt={supplier.name}
              className="supplier-avatar"
            />
          </div>
          <div className="supplier-basic-info">
            <h3 className="supplier-name">{supplier.name}</h3>
            {/* <p className="supplier-company">{supplier.company}</p> */}<br/>
            <span className="supplier-badge">Active Supplier</span>
          </div>
        </div>

        {/* Information Grid */}
        <div className="supplier-info-section">
          <h4 className="info-section-title">Contact Information</h4>
          
          <div className="info-grid">
            <div className="info-card">
              {/* <div className="info-icon">📧</div> */}
              <div className="info-content">
                <label className="info-label">Email Address</label>
                <span className="info-value">{supplier.email || 'Not provided'}</span>
              </div>
            </div>

            <div className="info-card">
              {/* <div className="info-icon">📞</div> */}
              <div className="info-content">
                <label className="info-label">Phone Number</label>
                <span className="info-value">{supplier.phone || 'Not provided'}</span>
              </div>
            </div>

            <div className="info-card">
              {/* <div className="info-icon">🏢</div> */}
              <div className="info-content">
                <label className="info-label">Company</label>
                <span className="info-value">{supplier.company || 'Not provided'}</span>
              </div>
            </div>

            <div className="info-card">
              {/* <div className="info-icon">🌍</div> */}
              <div className="info-content">
                <label className="info-label">Country</label>
                <span className="info-value">{supplier.country || 'Not provided'}</span>
              </div>
            </div>

            <div className="info-card">
              {/* <div className="info-icon">🏛️</div> */}
              <div className="info-content">
                <label className="info-label">State/Province</label>
                <span className="info-value">{supplier.state || 'Not provided'}</span>
              </div>
            </div>

            <div className="info-card">
              {/* <div className="info-icon">🏙️</div> */}
              <div className="info-content">
                <label className="info-label">City</label>
                <span className="info-value">{supplier.city || 'Not provided'}</span>
              </div>
            </div>

            <div className="info-card">
              {/* <div className="info-icon">📮</div> */}
              <div className="info-content">
                <label className="info-label">Zip Code</label>
                <span className="info-value">{supplier.zipCode || 'Not provided'}</span>
              </div>
            </div>

            <div className="info-card full-width">
              {/* <div className="info-icon">📍</div> */}
              <div className="info-content">
                <label className="info-label">Full Address</label>
                <span className="info-value address-value">{supplier.address || 'Not provided'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierDetails;