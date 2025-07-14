import React, { useState } from 'react';
import { 
  Plus, 
  Upload, 
  Printer, 
  FileText, 
  Edit, 
  Eye, 
  Trash2, 
  X, 
  Save, 
  RotateCcw,
  AlertTriangle 
} from 'lucide-react';

const ProductCategoriesComponent = () => {
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: 'RAMYA',
      parentCategory: 'SHIRTS',
      status: 'Active',
      image: null,
      description: 'Category for shirts and related items'
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    parentCategory: '',
    status: 'Active',
    image: null,
    description: ''
  });

  const handleAdd = () => {
    setCurrentCategory(null);
    setFormData({
      name: '',
      parentCategory: '',
      status: 'Active',
      image: null,
      description: ''
    });
    setShowAddModal(true);
  };

  const handleEdit = (category) => {
    setCurrentCategory(category);
    setFormData({
      name: category.name,
      parentCategory: category.parentCategory,
      status: category.status,
      image: category.image,
      description: category.description
    });
    setShowEditModal(true);
  };

  const handleView = (category) => {
    setCurrentCategory(category);
    setShowViewModal(true);
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setCategories(categories.filter(c => c.id !== deleteId));
    setShowDeleteModal(false);
    setDeleteId(null);
  };

  const handleSave = () => {
    if (currentCategory) {
      setCategories(categories.map(c => 
        c.id === currentCategory.id 
          ? { ...c, ...formData }
          : c
      ));
      setShowEditModal(false);
    } else {
      const newCategory = {
        id: Date.now(),
        ...formData
      };
      setCategories([...categories, newCategory]);
      setShowAddModal(false);
    }
  };

  const handleClear = () => {
    setFormData({
      name: '',
      parentCategory: '',
      status: 'Active',
      image: null,
      description: ''
    });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({...formData, image: file.name});
    }
  };

  return (
    <div className="product-categories-container">
      <div className="product-categories-header">
        <h2 className="product-categories-title">PRODUCT CATEGORIES</h2>
        <div className="product-categories-actions">
          <button className="pc-btn-primary" onClick={handleAdd}>
            <Plus size={16} />Add
          </button>
          <button className="pc-btn-secondary">
            <Upload size={16} />
          </button>
          <div className="pc-dropdown-container">
            <button 
              className="pc-btn-secondary"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <Printer size={16} />
            </button>
            {showDropdown && (
              <div className="pc-dropdown-menu">
                <div className="pc-dropdown-item">
                  <Printer size={14} />
                  Print
                </div>
                <div className="pc-dropdown-item">
                  <FileText size={14} />
                  XLS
                </div>
              </div>
            )}
          </div>
          <button className="pc-btn-secondary">
            <FileText size={16} />
          </button>
        </div>
      </div>

      <div className="product-categories-table">
        <div className="pc-table-header">
          <div className="pc-col-name">NAME</div>
          <div className="pc-col-parent">PARENT CATEGORY</div>
          <div className="pc-col-status">STATUS</div>
          <div className="pc-col-action">ACTION</div>
        </div>

        {categories.map((category) => (
          <div key={category.id} className="pc-table-row">
            <div className="pc-col-name">{category.name}</div>
            <div className="pc-col-parent">{category.parentCategory}</div>
            <div className="pc-col-status">
              <span className={`pc-status ${category.status.toLowerCase()}`}>
                {category.status}
              </span>
            </div>
            <div className="pc-col-action">
              <button 
                className="pc-action-btn pc-view-btn" 
                onClick={() => handleView(category)}
              >
                <Eye size={16} color="#dc3545" /> {/* Red for view */}
              </button>
              <button 
                className="pc-action-btn pc-edit-btn" 
                onClick={() => handleEdit(category)}
              >
                <Edit size={16} color="#28a745" /> {/* Green for edit */}
              </button>
              <button 
                className="pc-action-btn pc-delete-btn" 
                onClick={() => handleDelete(category.id)}
              >
                <Trash2 size={16} color="#f0ad4e" /> {/* Orange for delete */}
              </button>
            </div>
          </div>
        ))}

        <div className="pc-table-footer">
          Showing 1 out of {categories.length} entries
        </div>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="pc-modal-overlay">
          <div className="pc-modal">
            <div className="pc-modal-header">
              <h3 className="pc-modal-title">PRODUCT CATEGORIES</h3>
              <button className="pc-close-btn" onClick={() => setShowAddModal(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="pc-modal-body">
              <div className="pc-form-group">
                <label className="pc-form-label">NAME <span className="pc-required">*</span></label>
                <input
                  type="text"
                  className="pc-form-input"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>

              <div className="pc-form-row">
                <div className="pc-form-group">
                  <label className="pc-form-label">PARENT CATEGORY</label>
                  <input
                    type="text"
                    className="pc-form-input"
                    value={formData.parentCategory}
                    onChange={(e) => setFormData({...formData, parentCategory: e.target.value})}
                  />
                </div>
                <div className="pc-form-group">
                  <label className="pc-form-label">STATUS <span className="pc-required">*</span></label>
                  <div className="pc-radio-group">
                    <label className="pc-radio-label">
                      <input
                        type="radio"
                        name="status"
                        checked={formData.status === 'Active'}
                        onChange={() => setFormData({...formData, status: 'Active'})}
                      />
                      <span>Active</span>
                    </label>
                    <label className="pc-radio-label">
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
              </div>

              <div className="pc-form-group">
                <label className="pc-form-label">IMAGE</label>
                <div className="pc-file-upload">
                  <input
                    type="file"
                    id="fileUpload"
                    className="pc-file-input"
                    onChange={handleFileUpload}
                  />
                  <label htmlFor="fileUpload" className="pc-file-label">
                    Choose File
                  </label>
                  <span className="pc-file-name">
                    {formData.image || 'No File Chosen'}
                  </span>
                </div>
              </div>

              <div className="pc-form-group">
                <label className="pc-form-label">DESCRIPTION</label>
                <textarea
                  className="pc-form-textarea"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
              </div>
            </div>

            <div className="pc-modal-footer">
              <button className="pc-btn-primary" onClick={handleSave}>
                <Save size={16} />
                SAVE
              </button>
              <button className="pc-btn-secondary" onClick={handleClear}>
                <RotateCcw size={16} />
                CLEAR
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <div className="pc-modal-overlay">
          <div className="pc-modal">
            <div className="pc-modal-header">
              <h3 className="pc-modal-title">PRODUCT CATEGORIES</h3>
              <button className="pc-close-btn" onClick={() => setShowEditModal(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="pc-modal-body">
              <div className="pc-form-group">
                <label className="pc-form-label">NAME <span className="pc-required">*</span></label>
                <input
                  type="text"
                  className="pc-form-input"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>

              <div className="pc-form-row">
                <div className="pc-form-group">
                  <label className="pc-form-label">PARENT CATEGORY</label>
                  <input
                    type="text"
                    className="pc-form-input"
                    value={formData.parentCategory}
                    onChange={(e) => setFormData({...formData, parentCategory: e.target.value})}
                  />
                </div>
                <div className="pc-form-group">
                  <label className="pc-form-label">STATUS <span className="pc-required">*</span></label>
                  <div className="pc-radio-group">
                    <label className="pc-radio-label">
                      <input
                        type="radio"
                        name="editStatus"
                        checked={formData.status === 'Active'}
                        onChange={() => setFormData({...formData, status: 'Active'})}
                      />
                      <span>Active</span>
                    </label>
                    <label className="pc-radio-label">
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
              </div>

              <div className="pc-form-group">
                <label className="pc-form-label">IMAGE</label>
                <div className="pc-file-upload">
                  <input
                    type="file"
                    id="editFileUpload"
                    className="pc-file-input"
                    onChange={handleFileUpload}
                  />
                  <label htmlFor="editFileUpload" className="pc-file-label">
                    Choose File
                  </label>
                  <span className="pc-file-name">
                    {formData.image || 'No File Chosen'}
                  </span>
                </div>
              </div>

              <div className="pc-form-group">
                <label className="pc-form-label">DESCRIPTION</label>
                <textarea
                  className="pc-form-textarea"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
              </div>
            </div>

            <div className="pc-modal-footer">
              <button className="pc-btn-primary" onClick={handleSave}>
                <Save size={16} />
                SAVE
              </button>
              <button className="pc-btn-secondary" onClick={handleClear}>
                <RotateCcw size={16} />
                CLEAR
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Modal */}
      {showViewModal && currentCategory && (
        <div className="pc-modal-overlay">
          <div className="pc-view-modal">
            <div className="pc-modal-header">
              <h3 className="pc-modal-title">PRODUCT CATEGORIES</h3>
              <button className="pc-close-btn" onClick={() => setShowViewModal(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="pc-view-body">
              <div className="pc-view-row">
                <span className="pc-view-label">NAME</span>
                <span className="pc-view-value">{currentCategory.name}</span>
              </div>
              <div className="pc-view-row">
                <span className="pc-view-label">PARENT CATEGORY</span>
                <span className="pc-view-value">{currentCategory.parentCategory}</span>
              </div>
              <div className="pc-view-row">
                <span className="pc-view-label">STATUS</span>
                <span className={`pc-view-value pc-status ${currentCategory.status.toLowerCase()}`}>
                  {currentCategory.status}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="pc-modal-overlay">
          <div className="pc-delete-modal">
            <div className="pc-delete-icon">
              <AlertTriangle size={48} color="#f59e0b" />
            </div>
            <h3 className="pc-delete-title">Are you sure ?</h3>
            <p className="pc-delete-message">You will not be able to recover the deleted record!</p>
            <div className="pc-delete-actions">
              <button className="pc-btn-danger" onClick={confirmDelete}>
                Yes, Delete it !
              </button>
              <button className="pc-btn-cancel" onClick={() => setShowDeleteModal(false)}>
                No, Cancel !
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .product-categories-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
          font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; /* Updated font stack */
          background: #f8fafc;
          min-height: 100vh;
        }

        .product-categories-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .product-categories-title {
          margin: 0;
          font-size: 20px; /* Increased from 18px */
          font-weight: 600;
          color: #1f2937;
          font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; /* Consistent font */
        }

        .product-categories-actions {
          display: flex;
          gap: 10px;
          align-items: center;
        }

        .pc-btn-primary {
          background: #6366f1;
          color: white;
          border: none;
          padding: 10px 12px;
          border-radius: 6px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 15px; /* Increased from 14px */
          font-weight: 500;
          font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; /* Consistent font */
        }

        .pc-btn-primary:hover {
          background: #5855e7;
        }

        .pc-btn-secondary {
          background: #6366f1;
          color: white;
          border: none;
          padding: 10px 12px;
          border-radius: 6px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 15px; /* Increased from 14px */
          font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; /* Consistent font */
        }

        .pc-btn-secondary:hover {
          background: #5855e7;
        }

        .pc-dropdown-container {
          position: relative;
        }

        .pc-dropdown-menu {
          position: absolute;
          top: 100%;
          right: 0;
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 6px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          z-index: 100;
          min-width: 120px;
          margin-top: 4px;
        }

        .pc-dropdown-item {
          padding: 10px 12px;
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          font-size: 15px; /* Increased from 14px */
          color: #374151;
          font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; /* Consistent font */
        }

        .pc-dropdown-item:hover {
          background: #f3f4f6;
        }

        .product-categories-table {
          background: white;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .pc-table-header {
          display: grid;
          grid-template-columns: 2fr 2fr 1fr 1fr;
          gap: 20px;
          padding: 16px 20px;
          background: #f9fafb;
          border-bottom: 1px solid #e5e7eb;
          font-weight: 600;
          font-size: 13px; /* Increased from 12px */
          color: #374151;
          text-transform: uppercase;
          font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; /* Consistent font */
        }

        .pc-table-row {
          display: grid;
          grid-template-columns: 2fr 2fr 1fr 1fr;
          gap: 20px;
          padding: 16px 20px;
          border-bottom: 1fr solid #f3f4f6;
          align-items: center;
        }

        .pc-table-row:hover {
          background: #f9fafb;
        }

        .pc-status {
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 13px; /* Increased from 12px */
          font-weight: 500;
          font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; /* Consistent font */
        }

        .pc-status.active {
          background: #dcfce7;
          color: #16a34a;
        }

        .pc-status.inactive {
          background: #fee2e2;
          color: #dc2626;
        }

        .pc-col-action {
          display: flex;
          gap: 8px;
        }

        .pc-action-btn {
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

        .pc-view-btn {
          background: #f8d7da; /* Light red background */
        }

        .pc-view-btn:hover {
          background: #f1aeb5;
          transform: scale(1.05);
        }

        .pc-edit-btn {
          background: #d1e7dd; /* Light green background */
        }

        .pc-edit-btn:hover {
          background: #a3cfbb;
          transform: scale(1.05);
        }

        .pc-delete-btn {
          background: #fff3cd; /* Light orange background */
        }

        .pc-delete-btn:hover {
          background: #ffeaa7;
          transform: scale(1.05);
        }

        .pc-table-footer {
          padding: 16px 20px;
          font-size: 15px; /* Increased from 14px */
          color: #6b7280;
          background: #f9fafb;
          font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; /* Consistent font */
        }

        .pc-modal-overlay {
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

        .pc-modal {
          background: white;
          border-radius: 8px;
          width: 600px;
          max-width: 90vw;
          max-height: 90vh;
          overflow: auto;
        }

        .pc-view-modal {
          background: white;
          border-radius: 8px;
          width: 400px;
          max-width: 90vw;
        }

        .pc-modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px;
          border-bottom: 1px solid #e5e7eb;
        }

        .pc-modal-title {
          margin: 0;
          font-size: 20px; /* Increased from 18px */
          font-weight: 600;
          color: #1f2937;
          font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; /* Consistent font */
        }

        .pc-close-btn {
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
          color: #6b7280;
          font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; /* Consistent font */
        }

        .pc-close-btn:hover {
          color: #374151;
        }

        .pc-modal-body {
          padding: 20px;
        }

        .pc-form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        .pc-form-group {
          margin-bottom: 20px;
        }

        .pc-form-label {
          display: block;
          font-size: 13px; /* Increased from 12px */
          font-weight: 600;
          color: #374151;
          margin-bottom: 8px;
          text-transform: uppercase;
          font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; /* Consistent font */
        }

        .pc-required {
          color: #ef4444;
          font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; /* Consistent font */
        }

        .pc-form-input {
          width: 100%;
          padding: 12px;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          font-size: 15px; /* Increased from 14px */
          box-sizing: border-box;
          font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; /* Consistent font */
        }

        .pc-form-input:focus {
          outline: none;
          border-color: #6366f1;
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
        }

        .pc-form-textarea {
          width: 100%;
          padding: 12px;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          font-size: 15px; /* Increased from 14px */
          min-height: 80px;
          resize: vertical;
          box-sizing: border-box;
          font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; /* Consistent font */
        }

        .pc-form-textarea:focus {
          outline: none;
          border-color: #6366f1;
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
        }

        .pc-radio-group {
          display: flex;
          gap: 20px;
          margin-top: 8px;
        }

        .pc-radio-label {
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          font-size: 15px; /* Increased from 14px */
          text-transform: none;
          font-weight: normal;
          font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; /* Consistent font */
        }

        .pc-radio-label input[type="radio"] {
          margin: 0;
        }

        .pc-file-upload {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .pc-file-input {
          display: none;
        }

        .pc-file-label {
          padding: 12px 16px;
          background: #f3f4f6;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          cursor: pointer;
          font-size: 15px; /* Increased from 14px */
          color: #374151;
          font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; /* Consistent font */
        }

        .pc-file-label:hover {
          background: #e5e7eb;
        }

        .pc-file-name {
          font-size: 15px; /* Increased from 14px */
          color: #6b7280;
          font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; /* Consistent font */
        }

        .pc-modal-footer {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          padding: 20px;
          border-top: 1px solid #e5e7eb;
        }

        .pc-view-body {
          padding: 20px;
        }

        .pc-view-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 0;
          border-bottom: 1px solid #f3f4f6;
        }

        .pc-view-row:last-child {
          border-bottom: none;
        }

        .pc-view-label {
          font-size: 13px; /* Increased from 12px */
          font-weight: 600;
          color: #6b7280;
          text-transform: uppercase;
          font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; /* Consistent font */
        }

        .pc-view-value {
          font-size: 15px; /* Increased from 14px */
          color: #1f2937;
          font-weight: 500;
          font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; /* Consistent font */
        }

        .pc-delete-modal {
          background: white;
          border-radius: 8px;
          padding: 40px;
          text-align: center;
          width: 400px;
          max-width: 90vw;
        }

        .pc-delete-icon {
          margin-bottom: 20px;
        }

        .pc-delete-title {
          margin: 0 0 10px 0;
          font-size: 20px; /* Increased from 20px */
          color: #1f2937;
          font-weight: 600;
          font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; /* Consistent font */
        }

        .pc-delete-message {
          margin: 0 0 30px 0;
          color: #6b7280;
          font-size: 15px; /* Increased from 14px */
          font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; /* Consistent font */
        }

        .pc-delete-actions {
          display: flex;
          gap: 12px;
          justify-content: center;
        }

        .pc-btn-danger {
          background: #6366f1;
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 15px; /* Increased from 14px */
          font-weight: 500;
          font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; /* Consistent font */
        }

        .pc-btn-danger:hover {
          background: #5855e7;
        }

        .pc-btn-cancel {
          background: #6b7280;
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 15px; /* Increased from 14px */
          font-weight: 500;
          font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; /* Consistent font */
        }

        .pc-btn-cancel:hover {
          background: #4b5563;
        }
      `}</style>
    </div>
  );
};

export default ProductCategoriesComponent;