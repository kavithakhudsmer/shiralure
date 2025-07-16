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
    <div className="product-attributes-container16">
      <div className="product-attributes-card16">
        <div className="product-attributes-header16">
          <h2 className="product-attributes-title16">Product Attributes</h2>
          <button 
            className="product-attributes-add-btn16"
            onClick={handleAdd}
          >
            <Plus size={16} />
            Add
          </button>
        </div>
        
        <div className="product-attributes-table-container16">
          <table className="product-attributes-table16">
            <thead className="product-attributes-thead16">
              <tr>
                <th className="product-attributes-th-name16">Name</th>
                <th className="product-attributes-th-action16">Action</th>
              </tr>
            </thead>
            <tbody className="product-attributes-tbody16">
              {attributes.map((attribute) => (
                <tr key={attribute.id} className="product-attributes-row16">
                  <td className="product-attributes-cell-name16">{attribute.name}</td>
                  <td className="product-attributes-cell-action16">
                    <div className="product-attributes-action-buttons16">
                      <button 
                        className="product-attributes-action-btn16 product-attributes-view-btn16"
                        onClick={() => handleView(attribute)}
                      >
                        <Eye size={14} color="#dc3545" />
                      </button>
                      <button 
                        className="product-attributes-action-btn16 product-attributes-edit-btn16"
                        onClick={() => handleEdit(attribute)}
                      >
                        <Edit size={14} color="#28a745" />
                      </button>
                      <button 
                        className="product-attributes-action-btn16 product-attributes-delete-btn16"
                        onClick={() => handleDelete(attribute)}
                      >
                        <Trash2 size={14} color="#f0ad4e" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="product-attributes-footer16">
          Showing 1 to 6 of 6 entries
        </div>
      </div>

      {/* Add Attribute Modal */}
      {showAddModal && (
        <div className="product-attributes-modal-overlay16">
          <div className="product-attributes-modal16 product-attributes-add-modal16">
            <div className="product-attributes-modal-header16">
              <h3 className="product-attributes-modal-title16">Add Attribute</h3>
              <button 
                className="product-attributes-modal-close16"
                onClick={() => setShowAddModal(false)}
              >
                <X size={20} />
              </button>
            </div>
            <div className="product-attributes-modal-content16">
              <div className="product-attributes-field-group16">
                <label className="product-attributes-field-label16">Name</label>
                <input 
                  type="text" 
                  className="product-attributes-input16"
                  value={addName}
                  onChange={(e) => setAddName(e.target.value)}
                  placeholder="Enter attribute name"
                />
              </div>
              <div className="product-attributes-field-group16">
                <label className="product-attributes-field-label16">Values</label>
                <input 
                  type="text" 
                  className="product-attributes-input16"
                  value={addValues}
                  onChange={(e) => setAddValues(e.target.value)}
                  placeholder="Enter values separated by commas"
                />
              </div>
            </div>
            <div className="product-attributes-modal-footer16">
              <button 
                className="product-attributes-btn16 product-attributes-save-btn16"
                onClick={handleSaveAdd}
              >
                Save
              </button>
              <button 
                className="product-attributes-btn16 product-attributes-cancel-btn16"
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
        <div className="product-attributes-modal-overlay16">
          <div className="product-attributes-modal16 product-attributes-view-modal16">
            <div className="product-attributes-modal-header16">
              <h3 className="product-attributes-modal-title16">View Attribute</h3>
              <button 
                className="product-attributes-modal-close16"
                onClick={() => setShowViewModal(false)}
              >
                <X size={20} />
              </button>
            </div>
            <div className="product-attributes-modal-content16">
              <div className="product-attributes-field-group16">
                <label className="product-attributes-field-label16">Name: {selectedAttribute?.name}</label>
              </div>
              <div className="product-attributes-field-group16">
                <label className="product-attributes-field-label16">Values:</label>
                <div className="product-attributes-values-list16">
                  {selectedAttribute?.values.map((value, index) => (
                    <span key={index} className="product-attributes-value-tag16">
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
        <div className="product-attributes-modal-overlay16">
          <div className="product-attributes-modal16 product-attributes-edit-modal16">
            <div className="product-attributes-modal-header16">
              <h3 className="product-attributes-modal-title16">Edit Attribute</h3>
              <button 
                className="product-attributes-modal-close16"
                onClick={() => setShowEditModal(false)}
              >
                <X size={20} />
              </button>
            </div>
            <div className="product-attributes-modal-content16">
              <div className="product-attributes-field-group16">
                <label className="product-attributes-field-label16">Name</label>
                <input 
                  type="text" 
                  className="product-attributes-input16"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                />
              </div>
              <div className="product-attributes-field-group16">
                <label className="product-attributes-field-label16">Values</label>
                <input 
                  type="text" 
                  className="product-attributes-input16"
                  value={editValues}
                  onChange={(e) => setEditValues(e.target.value)}
                  placeholder="Enter values separated by commas"
                />
              </div>
            </div>
            <div className="product-attributes-modal-footer16">
              <button 
                className="product-attributes-btn16 product-attributes-save-btn16"
                onClick={handleSave}
              >
                Save
              </button>
              <button 
                className="product-attributes-btn16 product-attributes-cancel-btn16"
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
        <div className="product-attributes-modal-overlay16">
          <div className="product-attributes-modal16 product-attributes-delete-modal16">
            <div className="product-attributes-delete-content16">
              <div className="product-attributes-delete-icon16">
                <Clock size={40} className="product-attributes-clock-icon16" />
              </div>
              <h3 className="product-attributes-delete-title16">Are you sure ?</h3>
              <p className="product-attributes-delete-message16">
                You will not be able to recover the deleted record!
              </p>
              <div className="product-attributes-delete-buttons16">
                <button 
                  className="product-attributes-btn16 product-attributes-delete-confirm-btn16"
                  onClick={handleConfirmDelete}
                >
                  Yes, Delete it !
                </button>
                <button 
                  className="product-attributes-btn16 product-attributes-delete-cancel-btn16"
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
        .product-attributes-container16 {
          padding: 20px;
          background-color: #f5f7fa;
          min-height: 100vh;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .product-attributes-card16 {
          background: white;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          max-width: 800px;
          margin: 0 auto;
        }

        .product-attributes-header16 {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 24px;
          border-bottom: 1px solid #e5e7eb;
        }

        .product-attributes-title16 {
          font-size: 18px;
          font-weight: 600;
          color: #1f2937;
          margin: 0;
        }

        .product-attributes-add-btn16 {
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

        .product-attributes-add-btn16:hover {
          background: #4338ca;
        }

        .product-attributes-table-container16 {
          overflow-x: auto;
        }

        .product-attributes-table16 {
          width: 100%;
          border-collapse: collapse;
        }

        .product-attributes-thead16 {
          background-color: #f9fafb;
        }

        .product-attributes-th-name16,
        .product-attributes-th-action16 {
          padding: 12px 24px;
          text-align: left;
          font-weight: 500;
          color: #374151;
          border-bottom: 1px solid #e5e7eb;
        }

        .product-attributes-th-action16 {
          text-align: center;
          width: 200px;
        }

        .product-attributes-tbody16 {
          background: white;
        }

        .product-attributes-row16:hover {
          background-color: #f9fafb;
        }

        .product-attributes-cell-name16 {
          padding: 16px 24px;
          color: #1f2937;
          border-bottom: 1px solid #e5e7eb;
        }

        .product-attributes-cell-action16 {
          padding: 16px 24px;
          text-align: center;
          border-bottom: 1px solid #e5e7eb;
        }

        .product-attributes-action-buttons16 {
          display: flex;
          gap: 8px;
          justify-content: center;
        }

        .product-attributes-action-btn16 {
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

        .product-attributes-view-btn16 {
          background: #f8d7da;
        }

        .product-attributes-view-btn16:hover {
          background: #f1aeb5;
          transform: scale(1.05);
        }

        .product-attributes-edit-btn16 {
          background: #d1e7dd;
        }

        .product-attributes-edit-btn16:hover {
          background: #a3cfbb;
          transform: scale(1.05);
        }

        .product-attributes-delete-btn16 {
          background: #fff3cd;
        }

        .product-attributes-delete-btn16:hover {
          background: #ffeaa7;
          transform: scale(1.05);
        }

        .product-attributes-footer16 {
          padding: 16px 24px;
          color: #6b7280;
          font-size: 14px;
          border-top: 1px solid #e5e7eb;
        }

        .product-attributes-modal-overlay16 {
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

        .product-attributes-modal16 {
          background: white;
          border-radius: 8px;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
          max-width: 500px;
          width: 90%;
          max-height: 90vh;
          overflow-y: auto;
        }

        .product-attributes-modal-header16 {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 24px;
          border-bottom: 1px solid #e5e7eb;
        }

        .product-attributes-modal-title16 {
          font-size: 18px;
          font-weight: 600;
          color: #1f2937;
          margin: 0;
        }

        .product-attributes-modal-close16 {
          background: none;
          border: none;
          cursor: pointer;
          color: #6b7280;
          padding: 4px;
        }

        .product-attributes-modal-close16:hover {
          color: #1f2937;
        }

        .product-attributes-modal-content16 {
          padding: 24px;
        }

        .product-attributes-field-group16 {
          margin-bottom: 20px;
        }

        .product-attributes-field-label16 {
          display: block;
          font-weight: 500;
          color: #374151;
          margin-bottom: 8px;
        }

        .product-attributes-input16 {
          width: 100%;
          padding: 10px 12px;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          font-size: 14px;
          background-color: #f9fafb;
        }

        .product-attributes-input16:focus {
          outline: none;
          border-color: #4f46e5;
          background-color: white;
        }

        .product-attributes-values-list16 {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 8px;
        }

        .product-attributes-value-tag16 {
          background: #f3f4f6;
          color: #374151;
          padding: 4px 12px;
          border-radius: 16px;
          font-size: 14px;
        }

        .product-attributes-modal-footer16 {
          padding: 16px 24px;
          border-top: 1px solid #e5e7eb;
          display: flex;
          gap: 12px;
          justify-content: flex-end;
        }

        .product-attributes-btn16 {
          border: none;
          border-radius: 6px;
          padding: 10px 20px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }

        .product-attributes-save-btn16 {
          background: #4f46e5;
          color: white;
        }

        .product-attributes-save-btn16:hover {
          background: #4338ca;
        }

        .product-attributes-cancel-btn16 {
          background: #6b7280;
          color: white;
        }

        .product-attributes-cancel-btn16:hover {
          background: #374151;
        }

        .product-attributes-delete-modal16 {
          max-width: 400px;
        }

        .product-attributes-delete-content16 {
          padding: 32px 24px;
          text-align: center;
        }

        .product-attributes-delete-icon16 {
          margin-bottom: 16px;
        }

        .product-attributes-clock-icon16 {
          color: #f59e0b;
        }

        .product-attributes-delete-title16 {
          font-size: 20px;
          font-weight: 600;
          color: #1f2937;
          margin: 0 0 8px 0;
        }

        .product-attributes-delete-message16 {
          color: #6b7280;
          margin: 0 0 24px 0;
          font-size: 14px;
        }

        .product-attributes-delete-buttons16 {
          display: flex;
          gap: 12px;
          justify-content: center;
        }

        .product-attributes-delete-confirm-btn16 {
          background: #4f46e5;
          color: white;
        }

        .product-attributes-delete-confirm-btn16:hover {
          background: #4338ca;
        }

        .product-attributes-delete-cancel-btn16 {
          background: #6b7280;
          color: white;
        }

        .product-attributes-delete-cancel-btn16:hover {
          background: #374151;
        }
      `}</style>
    </div>
  );
};

export default ProductAttributes;