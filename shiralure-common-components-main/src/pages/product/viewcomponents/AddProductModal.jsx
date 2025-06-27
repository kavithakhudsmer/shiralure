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
    <div className="aammmodal-overlay">
      <div className="aammmodal-content">
        <div className="aammmodal-header">
          <h3 className="aammmodal-title">Products</h3>
          <button 
            className="aammmodal-close"
            onClick={onClose}
          >
            <FiX />
          </button>
        </div>
        <div className="aammmodal-body">
          <form onSubmit={handleSubmit}>
            <div className="aammform-group">
              <label className="aammform-label aammrequired">Product</label>
              <select
                className="aammform-select"
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
        <div className="aammmodal-footer">
          <button 
            className="aammmodal-button aammmodal-button-secondary"
            onClick={onClose}
          >
            <FiX /> Close
          </button>
          <button 
            className="aammmodal-button aammmodal-button-primary"
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