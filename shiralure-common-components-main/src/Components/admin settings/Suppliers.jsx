import React, { useState } from 'react';
import { Download, Eye, Edit, Trash2, X, Upload, AlertTriangle, Plus } from 'lucide-react';

const SupplierComponent = () => {
  const [showModal, setShowModal] = useState(null);
  const [formData, setFormData] = useState({
    company: '',
    name: '',
    email: '',
    phone: '',
    country: '',
    state: '',
    city: '',
    zipCode: ''
  });

  const supplierData = {
    company: 'Wella',
    name: 'Chela',
    email: 'chelawella@gmail.com',
    phone: '+1 11-23984436',
    country: 'United States',
    state: 'California',
    city: 'Los Angeles',
    zipCode: '90210'
  };

  const openModal = (type) => {
    if (type === 'edit') {
      setFormData(supplierData);
    } else if (type === 'add') {
      setFormData({
        company: '',
        name: '',
        email: '',
        phone: '',
        country: '',
        state: '',
        city: '',
        zipCode: ''
      });
    }
    setShowModal(type);
  };

  const closeModal = () => {
    setShowModal(null);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    console.log('Saving supplier data:', formData);
    closeModal();
  };

  const handleDelete = () => {
    console.log('Deleting supplier');
    closeModal();
  };

  return (
    <div className="supplier-container">
      <div className="supplier-header">
        <h2>Supplier</h2>
        <div className="header-actions">
          <button className="add-btn" onClick={() => openModal('add')}>
            <Plus size={16} />Add
          </button>
        </div>
      </div>

      <div className="supplier-table">
        <table>
          <thead>
            <tr>
              <th>Company</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Wella</td>
              <td>Chela</td>
              <td>chelawella@gmail.com</td>
              <td>+1 11-23984436</td>
              <td>
                <div className="action-buttons">
                  <button className="action-btn view-btn" onClick={() => openModal('view')}>
                    <Eye size={14} color="#dc3545" /> {/* Red for view */}
                  </button>
                  <button className="action-btn edit-btn" onClick={() => openModal('edit')}>
                    <Edit size={14} color="#28a745" /> {/* Green for edit */}
                  </button>
                  <button className="action-btn delete-btn" onClick={() => openModal('delete')}>
                    <Trash2 size={14} color="#f0ad4e" /> {/* Orange for delete */}
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="table-footer">
          <span>Showing 1 to1 of 1 entries</span>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {(showModal === 'add' || showModal === 'edit') && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{showModal === 'add' ? 'Add Supplier' : 'Edit Supplier'}</h3>
              <button className="close-btn" onClick={closeModal}>
                <X size={20} />
              </button>
            </div>
            <div className="modal-body">
              <div className="form-section">
                <div className="form-row">
                  <div className="form-group">
                    <label>Company</label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="Company"
                    />
                  </div>
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Name"
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Email"
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Phone"
                    />
                  </div>
                </div>
              </div>

              <div className="form-section">
                <div className="form-row">
                  <div className="form-group">
                    <label>Country</label>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      placeholder="Country"
                    />
                  </div>
                  <div className="form-group">
                    <label>State</label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      placeholder="State"
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>City</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="City"
                    />
                  </div>
                  <div className="form-group">
                    <label>Zip Code</label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      placeholder="Zip Code"
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group full-width">
                    <label>Upload File</label>
                    <div className="file-upload">
                      <Upload size={16} />
                      <span>Select file to upload</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={closeModal}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleSave}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Modal */}
      {showModal === 'view' && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content view-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>VIEW</h3>
              <button className="close-btn" onClick={closeModal}>
                <X size={20} />
              </button>
            </div>
            <div className="modal-body">
              <div className="profile-section">
                <div className="profile-avatar">
                  <div className="avatar-circle">
                    <span>JD</span>
                  </div>
                  <div className="profile-info">
                    <h4>John Doe</h4>
                    <span className="profile-badge">Member</span>
                  </div>
                </div>
              </div>
              <div className="info-section">
                <h4>Basic Information</h4>
                <div className="info-grid">
                  <div className="info-row">
                    <span className="info-label">Company:</span>
                    <span className="info-value">{supplierData.company}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Email:</span>
                    <span className="info-value">{supplierData.email}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Name:</span>
                    <span className="info-value">{supplierData.name}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Phone:</span>
                    <span className="info-value">{supplierData.phone}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">State:</span>
                    <span className="info-value">{supplierData.state}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Zip Code:</span>
                    <span className="info-value">{supplierData.zipCode}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Country:</span>
                    <span className="info-value">{supplierData.country}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showModal === 'delete' && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content delete-modal" onClick={(e) => e.stopPropagation()}>
            <div className="delete-content">
              <div className="delete-icon">
                <div className="warning-icon">!</div>
              </div>
              <h3>Are you sure ?</h3>
              <p>You will not be able to recover this selected record!</p>
              <div className="delete-actions">
                <button className="btn btn-confirm" onClick={handleDelete}>
                  Yes, Delete it!
                </button>
                <button className="btn btn-cancel" onClick={closeModal}>
                  No, Cancel!
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .supplier-container {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .supplier-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .supplier-header h2 {
          margin: 0;
          font-size: 24px;
          font-weight: 600;
          color: #1f2937;
        }

        .header-actions {
          display: flex;
          gap: 12px;
        }

        .add-btn {
          background: #8b5cf6;
          color: white;
          border: none;
          padding: 8px 12px;
          border-radius: 6px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .add-btn:hover {
          background: #7c3aed;
        }

        .export-btn {
          background: #3b82f6;
          color: white;
          border: none;
          padding: 8px 12px;
          border-radius: 6px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .export-btn:hover {
          background: #2563eb;
        }

        .supplier-table {
          background: white;
          border-radius: 8px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }

        table {
          width: 100%;
          border-collapse: collapse;
        }

        th, td {
          padding: 12px 16px;
          text-align: left;
          border-bottom: 1px solid #e5e7eb;
        }

        th {
          background: #f9fafb;
          font-weight: 600;
          color: #374151;
          font-size: 14px;
        }

        td {
          color: #6b7280;
          font-size: 14px;
        }

        .action-buttons {
          display: flex;
          gap: 8px;
        }

        .action-btn {
          width: 32px;
          height: 32px;
          border: none;
          border-radius: 50%; /* Circular shape */
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
          opacity: 0.9;
        }

        .view-btn {
          background: #f8d7da; /* Light red background */
        }

        .view-btn:hover {
          background: #f1aeb5;
          transform: scale(1.05);
        }

        .edit-btn {
          background: #d1e7dd; /* Light green background */
        }

        .edit-btn:hover {
          background: #a3cfbb;
          transform: scale(1.05);
        }

        .delete-btn {
          background: #fff3cd; /* Light orange background */
        }

        .delete-btn:hover {
          background: #ffeaa7;
          transform: scale(1.05);
        }

        .table-footer {
          padding: 12px 16px;
          background: #f9fafb;
          border-top: 1px solid #e5e7eb;
          font-size: 14px;
          color: #6b7280;
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .modal-content {
          background: white;
          border-radius: 8px;
          width: 90%;
          max-width: 600px;
          max-height: 90vh;
          overflow: auto;
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px;
          border-bottom: 1px solid #e5e7eb;
        }

        .modal-header h3 {
          margin: 0;
          font-size: 18px;
          font-weight: 600;
          color: #1f2937;
        }

        .close-btn {
          background: none;
          border: none;
          cursor: pointer;
          color: #6b7280;
          padding: 4px;
          border-radius: 4px;
        }

        .close-btn:hover {
          background: #f3f4f6;
        }

        .modal-body {
          padding: 20px;
        }

        .form-section {
          margin-bottom: 24px;
        }

        .form-section:last-child {
          margin-bottom: 0;
        }

        .form-row {
          display: flex;
          gap: 16px;
          margin-bottom: 16px;
        }

        .form-row:last-child {
          margin-bottom: 0;
        }

        .form-group {
          flex: 1;
        }

        .form-group.full-width {
          flex: none;
          width: 100%;
        }

        .form-group label {
          display: block;
          margin-bottom: 6px;
          font-size: 14px;
          font-weight: 500;
          color: #374151;
        }

        .form-group input {
          width: 100%;
          padding: 8px 12px;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          font-size: 14px;
          color: #1f2937;
          background: #f9fafb;
        }

        .form-group input:focus {
          outline: none;
          border-color: #3b82f6;
          background: white;
        }

        .form-group input::placeholder {
          color: #9ca3af;
        }

        .file-upload {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          background: #f9fafb;
          cursor: pointer;
          font-size: 14px;
          color: #6b7280;
        }

        .file-upload:hover {
          background: #f3f4f6;
        }

        .modal-footer {
          display: flex;
          gap: 12px;
          justify-content: flex-end;
          padding: 20px;
          border-top: 1px solid #e5e7eb;
        }

        .btn {
          padding: 8px 16px;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          border: none;
          transition: all 0.2s;
        }

        .btn-primary {
          background: #3b82f6;
          color: white;
        }

        .btn-primary:hover {
          background: #2563eb;
        }

        .btn-secondary {
          background: #6b7280;
          color: white;
        }

        .btn-secondary:hover {
          background: #4b5563;
        }

        .btn-confirm {
          background: #8b5cf6;
          color: white;
        }

        .btn-confirm:hover {
          background: #7c3aed;
        }

        .btn-cancel {
          background: #6b7280;
          color: white;
        }

        .btn-cancel:hover {
          background: #4b5563;
        }

        .view-modal {
          max-width: 500px;
        }

        .profile-section {
          margin-bottom: 24px;
        }

        .profile-avatar {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .avatar-circle {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: #3b82f6;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 600;
          font-size: 18px;
        }

        .profile-info h4 {
          margin: 0 0 4px 0;
          font-size: 16px;
          font-weight: 600;
          color: #1f2937;
        }

        .profile-badge {
          background: #fbbf24;
          color: white;
          padding: 2px 8px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 500;
        }

        .info-section h4 {
          margin: 0 0 16px 0;
          font-size: 16px;
          font-weight: 600;
          color: #1f2937;
        }

        .info-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .info-row {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .info-label {
          font-size: 12px;
          font-weight: 500;
          color: #6b7280;
          text-transform: uppercase;
        }

        .info-value {
          font-size: 14px;
          color: #1f2937;
        }

        .delete-modal {
          max-width: 400px;
        }

        .delete-content {
          padding: 40px;
          text-align: center;
        }

        .delete-icon {
          margin-bottom: 16px;
        }

        .warning-icon {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: #fbbf24;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 32px;
          font-weight: bold;
          margin: 0 auto;
        }

        .delete-content h3 {
          margin: 0 0 8px 0;
          font-size: 20px;
          font-weight: 600;
          color: #1f2937;
        }

        .delete-content p {
          margin: 0 0 24px 0;
          font-size: 14px;
          color: #6b7280;
        }

        .delete-actions {
          display: flex;
          gap: 12px;
          justify-content: center;
        }
      `}</style>
    </div>
  );
};

export default SupplierComponent;