import React, { useState } from 'react';
import { FiX, FiCheck } from 'react-icons/fi';
import './AddProductModal.css';

const AddProductModal = ({ isOpen, onClose, onAdd, productOptions }) => {
  const [selectedProduct, setSelectedProduct] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(selectedProduct);
    setSelectedProduct('');
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3 className="modal-title">Products</h3>
          <button 
            className="modal-close"
            onClick={onClose}
          >
            <FiX />
          </button>
        </div>
        <div className="modal-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label required">Product</label>
              <select
                className="form-select"
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(e.target.value)}
                required
              >
                <option value="">Select a product</option>
                {productOptions.map(product => (
                  <option key={product.id} value={product.id}>
                    {product.name} (₹{product.price})
                  </option>
                ))}
              </select>
            </div>
          </form>
        </div>
        <div className="modal-footer">
          <button 
            className="modal-button modal-button-secondary"
            onClick={onClose}
          >
            <FiX /> Close
          </button>
          <button 
            className="modal-button modal-button-primary"
            onClick={() => onAdd(selectedProduct)}
            disabled={!selectedProduct}
          >
            <FiCheck /> Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProductModal;
