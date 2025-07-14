import React, { useState } from 'react';
import { 
  Plus, 
  Edit, 
  Eye, 
  Trash2, 
  X, 
  Save,
  AlertTriangle 
} from 'lucide-react';

const ProductBrandsComponent = () => {
  const [brands, setBrands] = useState([
    {
      id: 1,
      name: 'Wella',
      description: 'Leading Professional Haircare and Beauty Brand',
      status: 'Active',
      image: 'wella-logo.png'
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentBrand, setCurrentBrand] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: 'Active',
    image: null
  });

  const handleAdd = () => {
    setCurrentBrand(null);
    setFormData({
      name: '',
      description: '',
      status: 'Active',
      image: null
    });
    setShowAddModal(true);
  };

  const handleEdit = (brand) => {
    setCurrentBrand(brand);
    setFormData({
      name: brand.name,
      description: brand.description,
      status: brand.status,
      image: brand.image
    });
    setShowEditModal(true);
  };

  const handleView = (brand) => {
    setCurrentBrand(brand);
    setShowViewModal(true);
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setBrands(brands.filter(b => b.id !== deleteId));
    setShowDeleteModal(false);
    setDeleteId(null);
  };

  const handleSave = () => {
    if (currentBrand) {
      setBrands(brands.map(b => 
        b.id === currentBrand.id 
          ? { ...b, ...formData }
          : b
      ));
      setShowEditModal(false);
    } else {
      const newBrand = {
        id: Date.now(),
        ...formData
      };
      setBrands([...brands, newBrand]);
      setShowAddModal(false);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({...formData, image: file.name});
    }
  };

  const closeModal = () => {
    setShowAddModal(false);
    setShowEditModal(false);
  };

  return (
    <div className="product-brands-container">
      <div className="pb-header">
        <h2 className="pb-title">Product Brands</h2>
        <button className="pb-add-btn" onClick={handleAdd}>
          <Plus size={16} />Add
        </button>
      </div>

      <div className="pb-table">
        <div className="pb-table-header">
          <div className="pb-col-name">Name</div>
          <div className="pb-col-description">Description</div>
          <div className="pb-col-status">Status</div>
          <div className="pb-col-action">Action</div>
        </div>

        {brands.map((brand) => (
          <div key={brand.id} className="pb-table-row">
            <div className="pb-col-name">{brand.name}</div>
            <div className="pb-col-description">{brand.description}</div>
            <div className="pb-col-status">
              <span className={`pb-status ${brand.status.toLowerCase()}`}>
                {brand.status}
              </span>
            </div>
            <div className="pb-col-action">
              <button 
                className="pb-action-btn pb-view-btn" 
                onClick={() => handleView(brand)}
              >
                <Eye size={16} color="#dc3545" /> {/* Red for view */}
              </button>
              <button 
                className="pb-action-btn pb-edit-btn" 
                onClick={() => handleEdit(brand)}
              >
                <Edit size={16} color="#28a745" /> {/* Green for edit */}
              </button>
              <button 
                className="pb-action-btn pb-delete-btn" 
                onClick={() => handleDelete(brand.id)}
              >
                <Trash2 size={16} color="#f0ad4e" /> {/* Orange for delete */}
              </button>
            </div>
          </div>
        ))}

        <div className="pb-table-footer">
          Showing 1 to 1 of {brands.length} entries
        </div>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="pb-modal-overlay">
          <div className="pb-modal">
            <div className="pb-modal-header">
              <h3 className="pb-modal-title">Product Brands</h3>
            </div>

            <div className="pb-modal-body">
              <div className="pb-form-group">
                <label className="pb-form-label">Name <span className="pb-required">*</span></label>
                <input
                  type="text"
                  className="pb-form-input"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>

              <div className="pb-form-group">
                <label className="pb-form-label">Status</label>
                <div className="pb-radio-group">
                  <label className="pb-radio-label">
                    <input
                      type="radio"
                      name="status"
                      checked={formData.status === 'Active'}
                      onChange={() => setFormData({...formData, status: 'Active'})}
                    />
                    <span>Active</span>
                  </label>
                  <label className="pb-radio-label">
                    <input
                      type="radio"
                      name="status"
                      checked={formData.status === 'Inactive'}
                      onChange={() => setFormData({...formData, status: 'Inactive'})}
                    />
                    <span>Inactive</span>
                  </label>
                </div>
              </div>

              <div className="pb-form-group">
                <label className="pb-form-label">Image (72px,72px)</label>
                <div className="pb-file-upload">
                  <input
                    type="file"
                    id="fileUpload"
                    className="pb-file-input"
                    onChange={handleFileUpload}
                  />
                  <label htmlFor="fileUpload" className="pb-file-label">
                    Choose File
                  </label>
                  <span className="pb-file-name">
                    {formData.image || 'No file chosen'}
                  </span>
                </div>
              </div>

              <div className="pb-form-group">
                <label className="pb-form-label">Description</label>
                <textarea
                  className="pb-form-textarea"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
              </div>
            </div>

            <div className="pb-modal-footer">
              <button className="pb-btn-close" onClick={closeModal}>
                Close
              </button>
              <button className="pb-btn-save" onClick={handleSave}>
                <Save size={16} />
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <div className="pb-modal-overlay">
          <div className="pb-modal">
            <div className="pb-modal-header">
              <h3 className="pb-modal-title">Product Brands</h3>
            </div>

            <div className="pb-modal-body">
              <div className="pb-form-group">
                <label className="pb-form-label">Name <span className="pb-required">*</span></label>
                <input
                  type="text"
                  className="pb-form-input"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>

              <div className="pb-form-group">
                <label className="pb-form-label">Status</label>
                <div className="pb-radio-group">
                  <label className="pb-radio-label">
                    <input
                      type="radio"
                      name="editStatus"
                      checked={formData.status === 'Active'}
                      onChange={() => setFormData({...formData, status: 'Active'})}
                    />
                    <span>Active</span>
                  </label>
                  <label className="pb-radio-label">
                    <input
                      type="radio"
                      name="editStatus"
                      checked={formData.status === 'Inactive'}
                      onChange={() => setFormData({...formData, status: 'Inactive'})}
                    />
                    <span>Inactive</span>
                  </label>
                </div>
              </div>

              <div className="pb-form-group">
                <label className="pb-form-label">Image (72px,72px)</label>
                <div className="pb-file-upload">
                  <input
                    type="file"
                    id="editFileUpload"
                    className="pb-file-input"
                    onChange={handleFileUpload}
                  />
                  <label htmlFor="editFileUpload" className="pb-file-label">
                    Choose File
                  </label>
                  <span className="pb-file-name">
                    {formData.image || 'No file chosen'}
                  </span>
                </div>
              </div>

              <div className="pb-form-group">
                <label className="pb-form-label">Description</label>
                <textarea
                  className="pb-form-textarea"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
              </div>
            </div>

            <div className="pb-modal-footer">
              <button className="pb-btn-close" onClick={closeModal}>
                Close
              </button>
              <button className="pb-btn-save" onClick={handleSave}>
                <Save size={16} />
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Modal */}
      {showViewModal && currentBrand && (
        <div className="pb-modal-overlay">
          <div className="pb-view-modal">
            <div className="pb-modal-header">
              <h3 className="pb-modal-title">Product Brands</h3>
              <button className="pb-close-btn" onClick={() => setShowViewModal(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="pb-view-body">
              <div className="pb-brand-display">
                <div className="pb-brand-logo">
                  <div className="pb-logo-placeholder">
                    <span className="pb-logo-text">WELLA</span>
                  </div>
                </div>
                <div className="pb-brand-info">
                  <h4 className="pb-brand-name">{currentBrand.name.toUpperCase()}</h4>
                  <span className={`pb-brand-status ${currentBrand.status.toLowerCase()}`}>
                    {currentBrand.status}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="pb-modal-overlay">
          <div className="pb-delete-modal">
            <div className="pb-delete-icon">
              <AlertTriangle size={48} color="#f59e0b" />
            </div>
            <h3 className="pb-delete-title">Are you sure ?</h3>
            <p className="pb-delete-message">You will not be able to recover the deleted record!</p>
            <div className="pb-delete-actions">
              <button className="pb-btn-danger" onClick={confirmDelete}>
                Yes, Delete it !
              </button>
              <button className="pb-btn-cancel" onClick={() => setShowDeleteModal(false)}>
                No, Cancel !
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .product-brands-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          background: #f8fafc;
          min-height: 100vh;
        }

        .pb-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .pb-title {
          margin: 0;
          font-size: 18px;
          font-weight: 600;
          color: #1f2937;
        }

        .pb-add-btn {
          background: #6366f1;
          color: white;
          border: none;
          padding: 10px;
          border-radius: 6px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .pb-add-btn:hover {
          background: #5855e7;
        }

        .pb-table {
          background: white;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .pb-table-header {
          display: grid;
          grid-template-columns: 1fr 3fr 1fr 1fr;
          gap: 20px;
          padding: 16px 20px;
          background: #f9fafb;
          border-bottom: 1px solid #e5e7eb;
          font-weight: 600;
          font-size: 14px;
          color: #374151;
        }

        .pb-table-row {
          display: grid;
          grid-template-columns: 1fr 3fr 1fr 1fr;
          gap: 20px;
          padding: 16px 20px;
          border-bottom: 1px solid #f3f4f6;
          align-items: center;
        }

        .pb-table-row:hover {
          background: #f9fafb;
        }

        .pb-status {
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 500;
        }

        .pb-status.active {
          background: #dcfce7;
          color: #16a34a;
        }

        .pb-status.inactive {
          background: #fee2e2;
          color: #dc2626;
        }

        .pb-col-action {
          display: flex;
          gap: 8px;
        }

        .pb-action-btn {
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

        .pb-view-btn {
          background: #f8d7da; /* Light red background */
        }

        .pb-view-btn:hover {
          background: #f1aeb5;
          transform: scale(1.05);
        }

        .pb-edit-btn {
          background: #d1e7dd; /* Light green background */
        }

        .pb-edit-btn:hover {
          background: #a3cfbb;
          transform: scale(1.05);
        }

        .pb-delete-btn {
          background: #fff3cd; /* Light orange background */
        }

        .pb-delete-btn:hover {
          background: #ffeaa7;
          transform: scale(1.05);
        }

        .pb-table-footer {
          padding: 16px 20px;
          font-size: 14px;
          color: #6b7280;
          background: #f9fafb;
        }

        .pb-modal-overlay {
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

        .pb-modal {
          background: white;
          border-radius: 8px;
          width: 500px;
          max-width: 90vw;
          max-height: 90vh;
          overflow: auto;
        }

        .pb-view-modal {
          background: white;
          border-radius: 8px;
          width: 400px;
          max-width: 90vw;
        }

        .pb-modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px;
          border-bottom: 1px solid #e5e7eb;
        }

        .pb-modal-title {
          margin: 0;
          font-size: 18px;
          font-weight: 600;
          color: #1f2937;
        }

        .pb-close-btn {
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
          color: #6b7280;
        }

        .pb-close-btn:hover {
          color: #374151;
        }

        .pb-modal-body {
          padding: 20px;
        }

        .pb-form-group {
          margin-bottom: 20px;
        }

        .pb-form-label {
          display: block;
          font-size: 14px;
          font-weight: 500;
          color: #374151;
          margin-bottom: 8px;
        }

        .pb-required {
          color: #ef4444;
        }

        .pb-form-input {
          width: 100%;
          padding: 12px;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          font-size: 14px;
          background: #f9fafb;
          box-sizing: border-box;
        }

        .pb-form-input:focus {
          outline: none;
          border-color: #6366f1;
          background: white;
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
        }

        .pb-form-textarea {
          width: 100%;
          padding: 12px;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          font-size: 14px;
          background: #f9fafb;
          min-height: 100px;
          resize: vertical;
          box-sizing: border-box;
        }

        .pb-form-textarea:focus {
          outline: none;
          border-color: #6366f1;
          background: white;
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
        }

        .pb-radio-group {
          display: flex;
          gap: 20px;
          margin-top: 8px;
        }

        .pb-radio-label {
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          font-size: 14px;
        }

        .pb-radio-label input[type="radio"] {
          margin: 0;
        }

        .pb-file-upload {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px;
          background: #f9fafb;
          border: 1px solid #d1d5db;
          border-radius: 6px;
        }

        .pb-file-input {
          display: none;
        }

        .pb-file-label {
          padding: 8px 16px;
          background: #e5e7eb;
          border: 1px solid #d1d5db;
          border-radius: 4px;
          cursor: pointer;
          font-size: 14px;
          color: #374151;
        }

        .pb-file-label:hover {
          background: #d1d5db;
        }

        .pb-file-name {
          font-size: 14px;
          color: #6b7280;
        }

        .pb-modal-footer {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          padding: 20px;
          border-top: 1px solid #e5e7eb;
        }

        .pb-btn-close {
          padding: 8px 16px;
          background: #6b7280;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 14px;
        }

        .pb-btn-close:hover {
          background: #4b5563;
        }

        .pb-btn-save {
          padding: 8px 16px;
          background: #6366f1;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 14px;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .pb-btn-save:hover {
          background: #5855e7;
        }

        .pb-view-body {
          padding: 20px;
        }

        .pb-brand-display {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .pb-brand-logo {
          width: 120px;
          height: 80px;
          background: #dc2626;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .pb-logo-placeholder {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .pb-logo-text {
          color: white;
          font-size: 18px;
          font-weight: bold;
        }

        .pb-brand-info {
          flex: 1;
        }

        .pb-brand-name {
          margin: 0 0 8px 0;
          font-size: 24px;
          font-weight: bold;
          color: #1f2937;
        }

        .pb-brand-status {
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 500;
        }

        .pb-brand-status.active {
          background: #dcfce7;
          color: #16a34a;
        }

        .pb-brand-status.inactive {
          background: #fee2e2;
          color: #dc2626;
        }

        .pb-delete-modal {
          background: white;
          border-radius: 8px;
          padding: 40px;
          text-align: center;
          width: 400px;
          max-width: 90vw;
        }

        .pb-delete-icon {
          margin-bottom: 20px;
        }

        .pb-delete-title {
          margin: 0 0 10px 0;
          font-size: 20px;
          color: #1f2937;
          font-weight: 600;
        }

        .pb-delete-message {
          margin: 0 0 30px 0;
          color: #6b7280;
          font-size: 14px;
        }

        .pb-delete-actions {
          display: flex;
          gap: 12px;
          justify-content: center;
        }

        .pb-btn-danger {
          background: #6366f1;
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 500;
        }

        .pb-btn-danger:hover {
          background: #5855e7;
        }

        .pb-btn-cancel {
          background: #6b7280;
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 500;
        }

        .pb-btn-cancel:hover {
          background: #4b5563;
        }
      `}</style>
    </div>
  );
};

export default ProductBrandsComponent;