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
    <div className="supplier-container25">
      <div className="supplier-header25">
        <h2>Supplier</h2>
        <div className="header-actions25">
          <button className="add-btn25" onClick={() => openModal('add')}>
            <Plus size={16} />Add
          </button>
        </div>
      </div>

      <div className="supplier-table25">
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
                <div className="action-buttons25">
                  <button className="action-btn25 view-btn25" onClick={() => openModal('view')}>
                    <Eye size={14} color="#dc3545" />
                  </button>
                  <button className="action-btn25 edit-btn25" onClick={() => openModal('edit')}>
                    <Edit size={14} color="#28a745" />
                  </button>
                  <button className="action-btn25 delete-btn25" onClick={() => openModal('delete')}>
                    <Trash2 size={14} color="#f0ad4e" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="table-footer25">
          <span>Showing 1 to 1 of 1 entries</span>
        </div>
      </div>

      {(showModal === 'add' || showModal === 'edit') && (
        <div className="modal-overlay25" onClick={closeModal}>
          <div className="modal-content25" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header25">
              <h3>{showModal === 'add' ? 'Add Supplier' : 'Edit Supplier'}</h3>
              <button className="close-btn25" onClick={closeModal}>
                <X size={20} />
              </button>
            </div>
            <div className="modal-body25">
              <div className="form-section25">
                <div className="form-row25">
                  <div className="form-group25">
                    <label>Company</label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="Company"
                    />
                  </div>
                  <div className="form-group25">
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
                <div className="form-row25">
                  <div className="form-group25">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Email"
                    />
                  </div>
                  <div className="form-group25">
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

              <div className="form-section25">
                <div className="form-row25">
                  <div className="form-group25">
                    <label>Country</label>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      placeholder="Country"
                    />
                  </div>
                  <div className="form-group25">
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
                <div className="form-row25">
                  <div className="form-group25">
                    <label>City</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="City"
                    />
                  </div>
                  <div className="form-group25">
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
                <div className="form-row25">
                  <div className="form-group25 full-width25">
                    <label>Upload File</label>
                    <div className="file-upload25">
                      <Upload size={16} />
                      <span>Select file to upload</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer25">
              <button className="btn25 btn-secondary25" onClick={closeModal}>
                Cancel
              </button>
              <button className="btn25 btn-primary25" onClick={handleSave}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {showModal === 'view' && (
        <div className="modal-overlay25" onClick={closeModal}>
          <div className="modal-content25 view-modal25" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header25">
              <h3>VIEW</h3>
              <button className="close-btn25" onClick={closeModal}>
                <X size={20} />
              </button>
            </div>
            <div className="modal-body25">
              <div className="profile-section25">
                <div className="profile-avatar25">
                  <div className="avatar-circle25">
                    <span>JD</span>
                  </div>
                  <div className="profile-info25">
                    <h4>John Doe</h4>
                    <span className="profile-badge25">Member</span>
                  </div>
                </div>
              </div>
              <div className="info-section25">
                <h4>Basic Information</h4>
                <div className="info-grid25">
                  <div className="info-row25">
                    <span className="info-label25">Company:</span>
                    <span className="info-value25">{supplierData.company}</span>
                  </div>
                  <div className="info-row25">
                    <span className="info-label25">Email:</span>
                    <span className="info-value25">{supplierData.email}</span>
                  </div>
                  <div className="info-row25">
                    <span className="info-label25">Name:</span>
                    <span className="info-value25">{supplierData.name}</span>
                  </div>
                  <div className="info-row25">
                    <span className="info-label25">Phone:</span>
                    <span className="info-value25">{supplierData.phone}</span>
                  </div>
                  <div className="info-row25">
                    <span className="info-label25">State:</span>
                    <span className="info-value25">{supplierData.state}</span>
                  </div>
                  <div className="info-row25">
                    <span className="info-label25">Zip Code:</span>
                    <span className="info-value25">{supplierData.zipCode}</span>
                  </div>
                  <div className="info-row25">
                    <span className="info-label25">Country:</span>
                    <span className="info-value25">{supplierData.country}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showModal === 'delete' && (
        <div className="modal-overlay25" onClick={closeModal}>
          <div className="modal-content25 delete-modal25" onClick={(e) => e.stopPropagation()}>
            <div className="delete-content25">
              <div className="delete-icon25">
                <div className="warning-icon25">!</div>
              </div>
              <h3>Are you sure ?</h3>
              <p>You will not be able to recover this selected record!</p>
              <div className="delete-actions25">
                <button className="btn25 btn-confirm25" onClick={handleDelete}>
                  Yes, Delete it!
                </button>
                <button className="btn25 btn-cancel25" onClick={closeModal}>
                  No, Cancel!
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .supplier-container25 {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .supplier-header25 {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .supplier-header25 h2 {
          margin: 0;
          font-size: 24px;
          font-weight: 600;
          color: #1f2937;
        }

        .header-actions25 {
          display: flex;
          gap: 12px;
        }

        .add-btn25 {
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

        .add-btn25:hover {
          background: #7c3aed;
        }

        .export-btn25 {
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

        .export-btn25:hover {
          background: #2563eb;
        }

        .supplier-table25 {
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

        .action-buttons25 {
          display: flex;
          gap: 8px;
        }

        .action-btn25 {
          width: 32px;
          height: 32px;
          border: none;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
          opacity: 0.9;
        }

        .view-btn25 {
          background: #f8d7da;
        }

        .view-btn25:hover {
          background: #f1aeb5;
          transform: scale(1.05);
        }

        .edit-btn25 {
          background: #d1e7dd;
        }

        .edit-btn25:hover {
          background: #a3cfbb;
          transform: scale(1.05);
        }

        .delete-btn25 {
          background: #fff3cd;
        }

        .delete-btn25:hover {
          background: #ffeaa7;
          transform: scale(1.05);
        }

        .table-footer25 {
          padding: 12px 16px;
          background: #f9fafb;
          border-top: 1px solid #e5e7eb;
          font-size: 14px;
          color: #6b7280;
        }

        .modal-overlay25 {
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

        .modal-content25 {
          background: white;
          border-radius: 8px;
          width: 90%;
          max-width: 600px;
          max-height: 90vh;
          overflow: auto;
        }

        .modal-header25 {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px;
          border-bottom: 1px solid #e5e7eb;
        }

        .modal-header25 h3 {
          margin: 0;
          font-size: 18px;
          font-weight: 600;
          color: #1f2937;
        }

        .close-btn25 {
          background: none;
          border: none;
          cursor: pointer;
          color: #6b7280;
          padding: 4px;
          border-radius: 4px;
        }

        .close-btn25:hover {
          background: #f3f4f6;
        }

        .modal-body25 {
          padding: 20px;
        }

        .form-section25 {
          margin-bottom: 24px;
        }

        .form-section25:last-child {
          margin-bottom: 0;
        }

        .form-row25 {
          display: flex;
          gap: 16px;
          margin-bottom: 16px;
        }

        .form-row25:last-child {
          margin-bottom: 0;
        }

        .form-group25 {
          flex: 1;
        }

        .form-group25.full-width25 {
          flex: none;
          width: 100%;
        }

        .form-group25 label {
          display: block;
          margin-bottom: 6px;
          font-size: 14px;
          font-weight: 500;
          color: #374151;
        }

        .form-group25 input {
          width: 100%;
          padding: 8px 12px;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          font-size: 14px;
          color: #1f2937;
          background: #f9fafb;
        }

        .form-group25 input:focus {
          outline: none;
          border-color: #3b82f6;
          background: white;
        }

        .form-group25 input::placeholder {
          color: #9ca3af;
        }

        .file-upload25 {
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

        .file-upload25:hover {
          background: #f3f4f6;
        }

        .modal-footer25 {
          display: flex;
          gap: 12px;
          justify-content: flex-end;
          padding: 20px;
          border-top: 1px solid #e5e7eb;
        }

        .btn25 {
          padding: 8px 16px;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          border: none;
          transition: all 0.2s;
        }

        .btn-primary25 {
          background: #3b82f6;
          color: white;
        }

        .btn-primary25:hover {
          background: #2563eb;
        }

        .btn-secondary25 {
          background: #6b7280;
          color: white;
        }

        .btn-secondary25:hover {
          background: #4b5563;
        }

        .btn-confirm25 {
          background: #8b5cf6;
          color: white;
        }

        .btn-confirm25:hover {
          background: #7c3aed;
        }

        .btn-cancel25 {
          background: #6b7280;
          color: white;
        }

        .btn-cancel25:hover {
          background: #4b5563;
        }

        .view-modal25 {
          max-width: 500px;
        }

        .profile-section25 {
          margin-bottom: 24px;
        }

        .profile-avatar25 {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .avatar-circle25 {
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

        .profile-info25 h4 {
          margin: 0 0 4px 0;
          font-size: 16px;
          font-weight: 600;
          color: #1f2937;
        }

        .profile-badge25 {
          background: #fbbf24;
          color: white;
          padding: 2px 8px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 500;
        }

        .info-section25 h4 {
          margin: 0 0 16px 0;
          font-size: 16px;
          font-weight: 600;
          color: #1f2937;
        }

        .info-grid25 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .info-row25 {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .info-label25 {
          font-size: 12px;
          font-weight: 500;
          color: #6b7280;
          text-transform: uppercase;
        }

        .info-value25 {
          font-size: 14px;
          color: #1f2937;
        }

        .delete-modal25 {
          max-width: 400px;
        }

        .delete-content25 {
          padding: 40px;
          text-align: center;
        }

        .delete-icon25 {
          margin-bottom: 16px;
        }

        .warning-icon25 {
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

        .delete-content25 h3 {
          margin: 0 0 8px 0;
          font-size: 20px;
          font-weight: 600;
          color: #1f2937;
        }

        .delete-content25 p {
          margin: 0 0 24px 0;
          font-size: 14px;
          color: #6b7280;
        }

        .delete-actions25 {
          display: flex;
          gap: 12px;
          justify-content: center;
        }
      `}</style>
    </div>
  );
};

export default SupplierComponent;