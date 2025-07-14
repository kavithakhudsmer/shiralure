import React, { useState } from 'react';
import { Eye, Edit, Trash2, X, Clock, Plus } from 'lucide-react';

const ProductAttributes = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedAttribute, setSelectedAttribute] = useState(null);
  const [editName, setEditName] = useState('');
  const [editValues, setEditValues] = useState('');
  const [addName, setAddName] = useState('');
  const [addValues, setAddValues] = useState('');

  const attributes = [
    { id: 1, name: 'Size', values: ['Small', 'Medium', 'Large'] },
    { id: 2, name: 'Color', values: ['Red', 'Green', 'Blue'] },
    { id: 3, name: 'Material', values: ['Cotton', 'Polyester', 'Silk'] },
    { id: 4, name: 'Weight', values: ['Light', 'Medium', 'Heavy'] },
    { id: 5, name: 'Brand', values: ['Nike', 'Adidas', 'Puma'] },
    { id: 6, name: 'Style', values: ['Casual', 'Formal', 'Sport'] }
  ];

  const handleAdd = () => {
    setAddName('');
    setAddValues('');
    setShowAddModal(true);
  };

  const handleView = (attribute) => {
    setSelectedAttribute(attribute);
    setShowViewModal(true);
  };

  const handleEdit = (attribute) => {
    setSelectedAttribute(attribute);
    setEditName(attribute.name);
    setEditValues(attribute.values.join(', '));
    setShowEditModal(true);
  };

  const handleDelete = (attribute) => {
    setSelectedAttribute(attribute);
    setShowDeleteModal(true);
  };

  const handleSaveAdd = () => {
    setShowAddModal(false);
    // Handle add logic here
  };

  const handleSave = () => {
    setShowEditModal(false);
    // Handle save logic here
  };

  const handleConfirmDelete = () => {
    setShowDeleteModal(false);
    // Handle delete logic here
  };

  return (
    <div className="product-attributes-container">
      <div className="product-attributes-card">
        <div className="product-attributes-header">
          <h2 className="product-attributes-title">Product Attributes</h2>
          <button 
            className="product-attributes-add-btn"
            onClick={handleAdd}
          >
            <Plus size={16} />
            Add
          </button>
        </div>
        
        <div className="product-attributes-table-container">
          <table className="product-attributes-table">
            <thead className="product-attributes-thead">
              <tr>
                <th className="product-attributes-th-name">Name</th>
                <th className="product-attributes-th-action">Action</th>
              </tr>
            </thead>
            <tbody className="product-attributes-tbody">
              {attributes.map((attribute) => (
                <tr key={attribute.id} className="product-attributes-row">
                  <td className="product-attributes-cell-name">{attribute.name}</td>
                  <td className="product-attributes-cell-action">
                    <div className="product-attributes-action-buttons">
                      <button 
                        className="product-attributes-action-btn product-attributes-view-btn"
                        onClick={() => handleView(attribute)}
                      >
                        <Eye size={14} color="#dc3545" /> {/* Red for view */}
                      </button>
                      <button 
                        className="product-attributes-action-btn product-attributes-edit-btn"
                        onClick={() => handleEdit(attribute)}
                      >
                        <Edit size={14} color="#28a745" /> {/* Green for edit */}
                      </button>
                      <button 
                        className="product-attributes-action-btn product-attributes-delete-btn"
                        onClick={() => handleDelete(attribute)}
                      >
                        <Trash2 size={14} color="#f0ad4e" /> {/* Orange for delete */}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="product-attributes-footer">
          Showing 1 to 6 of 6 entries
        </div>
      </div>

      {/* Add Attribute Modal */}
      {showAddModal && (
        <div className="product-attributes-modal-overlay">
          <div className="product-attributes-modal product-attributes-add-modal">
            <div className="product-attributes-modal-header">
              <h3 className="product-attributes-modal-title">Add Attribute</h3>
              <button 
                className="product-attributes-modal-close"
                onClick={() => setShowAddModal(false)}
              >
                <X size={20} />
              </button>
            </div>
            <div className="product-attributes-modal-content">
              <div className="product-attributes-field-group">
                <label className="product-attributes-field-label">Name</label>
                <input 
                  type="text" 
                  className="product-attributes-input"
                  value={addName}
                  onChange={(e) => setAddName(e.target.value)}
                  placeholder="Enter attribute name"
                />
              </div>
              <div className="product-attributes-field-group">
                <label className="product-attributes-field-label">Values</label>
                <input 
                  type="text" 
                  className="product-attributes-input"
                  value={addValues}
                  onChange={(e) => setAddValues(e.target.value)}
                  placeholder="Enter values separated by commas"
                />
              </div>
            </div>
            <div className="product-attributes-modal-footer">
              <button 
                className="product-attributes-btn product-attributes-save-btn"
                onClick={handleSaveAdd}
              >
                Save
              </button>
              <button 
                className="product-attributes-btn product-attributes-cancel-btn"
                onClick={() => setShowAddModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Attribute Modal */}
      {showViewModal && (
        <div className="product-attributes-modal-overlay">
          <div className="product-attributes-modal product-attributes-view-modal">
            <div className="product-attributes-modal-header">
              <h3 className="product-attributes-modal-title">View Attribute</h3>
              <button 
                className="product-attributes-modal-close"
                onClick={() => setShowViewModal(false)}
              >
                <X size={20} />
              </button>
            </div>
            <div className="product-attributes-modal-content">
              <div className="product-attributes-field-group">
                <label className="product-attributes-field-label">Name: {selectedAttribute?.name}</label>
              </div>
              <div className="product-attributes-field-group">
                <label className="product-attributes-field-label">Values:</label>
                <div className="product-attributes-values-list">
                  {selectedAttribute?.values.map((value, index) => (
                    <span key={index} className="product-attributes-value-tag">
                      {value}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Attribute Modal */}
      {showEditModal && (
        <div className="product-attributes-modal-overlay">
          <div className="product-attributes-modal product-attributes-edit-modal">
            <div className="product-attributes-modal-header">
              <h3 className="product-attributes-modal-title">Edit Attribute</h3>
              <button 
                className="product-attributes-modal-close"
                onClick={() => setShowEditModal(false)}
              >
                <X size={20} />
              </button>
            </div>
            <div className="product-attributes-modal-content">
              <div className="product-attributes-field-group">
                <label className="product-attributes-field-label">Name</label>
                <input 
                  type="text" 
                  className="product-attributes-input"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                />
              </div>
              <div className="product-attributes-field-group">
                <label className="product-attributes-field-label">Values</label>
                <input 
                  type="text" 
                  className="product-attributes-input"
                  value={editValues}
                  onChange={(e) => setEditValues(e.target.value)}
                  placeholder="Enter values separated by commas"
                />
              </div>
            </div>
            <div className="product-attributes-modal-footer">
              <button 
                className="product-attributes-btn product-attributes-save-btn"
                onClick={handleSave}
              >
                Save
              </button>
              <button 
                className="product-attributes-btn product-attributes-cancel-btn"
                onClick={() => setShowEditModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="product-attributes-modal-overlay">
          <div className="product-attributes-modal product-attributes-delete-modal">
            <div className="product-attributes-delete-content">
              <div className="product-attributes-delete-icon">
                <Clock size={40} className="product-attributes-clock-icon" />
              </div>
              <h3 className="product-attributes-delete-title">Are you sure ?</h3>
              <p className="product-attributes-delete-message">
                You will not be able to recover the deleted record!
              </p>
              <div className="product-attributes-delete-buttons">
                <button 
                  className="product-attributes-btn product-attributes-delete-confirm-btn"
                  onClick={handleConfirmDelete}
                >
                  Yes, Delete it !
                </button>
                <button 
                  className="product-attributes-btn product-attributes-delete-cancel-btn"
                  onClick={() => setShowDeleteModal(false)}
                >
                  No, Cancel !
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .product-attributes-container {
          padding: 20px;
          background-color: #f5f7fa;
          min-height: 100vh;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .product-attributes-card {
          background: white;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          max-width: 800px;
          margin: 0 auto;
        }

        .product-attributes-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 24px;
          border-bottom: 1px solid #e5e7eb;
        }

        .product-attributes-title {
          font-size: 18px;
          font-weight: 600;
          color: #1f2937;
          margin: 0;
        }

        .product-attributes-add-btn {
          background: #4f46e5;
          color: white;
          border: none;
          border-radius: 6px;
          padding: 8px 16px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 500;
        }

        .product-attributes-add-btn:hover {
          background: #4338ca;
        }

        .product-attributes-table-container {
          overflow-x: auto;
        }

        .product-attributes-table {
          width: 100%;
          border-collapse: collapse;
        }

        .product-attributes-thead {
          background-color: #f9fafb;
        }

        .product-attributes-th-name,
        .product-attributes-th-action {
          padding: 12px 24px;
          text-align: left;
          font-weight: 500;
          color: #374151;
          border-bottom: 1px solid #e5e7eb;
        }

        .product-attributes-th-action {
          text-align: center;
          width: 200px;
        }

        .product-attributes-tbody {
          background: white;
        }

        .product-attributes-row:hover {
          background-color: #f9fafb;
        }

        .product-attributes-cell-name {
          padding: 16px 24px;
          color: #1f2937;
          border-bottom: 1px solid #e5e7eb;
        }

        .product-attributes-cell-action {
          padding: 16px 24px;
          text-align: center;
          border-bottom: 1px solid #e5e7eb;
        }

        .product-attributes-action-buttons {
          display: flex;
          gap: 8px;
          justify-content: center;
        }

        .product-attributes-action-btn {
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

        .product-attributes-view-btn {
          background: #f8d7da; /* Light red background */
        }

        .product-attributes-view-btn:hover {
          background: #f1aeb5;
          transform: scale(1.05);
        }

        .product-attributes-edit-btn {
          background: #d1e7dd; /* Light green background */
        }

        .product-attributes-edit-btn:hover {
          background: #a3cfbb;
          transform: scale(1.05);
        }

        .product-attributes-delete-btn {
          background: #fff3cd; /* Light orange background */
        }

        .product-attributes-delete-btn:hover {
          background: #ffeaa7;
          transform: scale(1.05);
        }

        .product-attributes-footer {
          padding: 16px 24px;
          color: #6b7280;
          font-size: 14px;
          border-top: 1px solid #e5e7eb;
        }

        .product-attributes-modal-overlay {
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

        .product-attributes-modal {
          background: white;
          border-radius: 8px;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
          max-width: 500px;
          width: 90%;
          max-height: 90vh;
          overflow-y: auto;
        }

        .product-attributes-modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 24px;
          border-bottom: 1px solid #e5e7eb;
        }

        .product-attributes-modal-title {
          font-size: 18px;
          font-weight: 600;
          color: #1f2937;
          margin: 0;
        }

        .product-attributes-modal-close {
          background: none;
          border: none;
          cursor: pointer;
          color: #6b7280;
          padding: 4px;
        }

        .product-attributes-modal-close:hover {
          color: #1f2937;
        }

        .product-attributes-modal-content {
          padding: 24px;
        }

        .product-attributes-field-group {
          margin-bottom: 20px;
        }

        .product-attributes-field-label {
          display: block;
          font-weight: 500;
          color: #374151;
          margin-bottom: 8px;
        }

        .product-attributes-input {
          width: 100%;
          padding: 10px 12px;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          font-size: 14px;
          background-color: #f9fafb;
        }

        .product-attributes-input:focus {
          outline: none;
          border-color: #4f46e5;
          background-color: white;
        }

        .product-attributes-values-list {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 8px;
        }

        .product-attributes-value-tag {
          background: #f3f4f6;
          color: #374151;
          padding: 4px 12px;
          border-radius: 16px;
          font-size: 14px;
        }

        .product-attributes-modal-footer {
          padding: 16px 24px;
          border-top: 1px solid #e5e7eb;
          display: flex;
          gap: 12px;
          justify-content: flex-end;
        }

        .product-attributes-btn {
          border: none;
          border-radius: 6px;
          padding: 10px 20px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }

        .product-attributes-save-btn {
          background: #4f46e5;
          color: white;
        }

        .product-attributes-save-btn:hover {
          background: #4338ca;
        }

        .product-attributes-cancel-btn {
          background: #6b7280;
          color: white;
        }

        .product-attributes-cancel-btn:hover {
          background: #374151;
        }

        .product-attributes-delete-modal {
          max-width: 400px;
        }

        .product-attributes-delete-content {
          padding: 32px 24px;
          text-align: center;
        }

        .product-attributes-delete-icon {
          margin-bottom: 16px;
        }

        .product-attributes-clock-icon {
          color: #f59e0b;
        }

        .product-attributes-delete-title {
          font-size: 20px;
          font-weight: 600;
          color: #1f2937;
          margin: 0 0 8px 0;
        }

        .product-attributes-delete-message {
          color: #6b7280;
          margin: 0 0 24px 0;
          font-size: 14px;
        }

        .product-attributes-delete-buttons {
          display: flex;
          gap: 12px;
          justify-content: center;
        }

        .product-attributes-delete-confirm-btn {
          background: #4f46e5;
          color: white;
        }

        .product-attributes-delete-confirm-btn:hover {
          background: #4338ca;
        }

        .product-attributes-delete-cancel-btn {
          background: #6b7280;
          color: white;
        }

        .product-attributes-delete-cancel-btn:hover {
          background: #374151;
        }
      `}</style>
    </div>
  );
};

export default ProductAttributes;