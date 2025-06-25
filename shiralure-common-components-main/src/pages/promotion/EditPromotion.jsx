import React, { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';
import { MdOutlineClear } from "react-icons/md";
import { BsCheckLg } from "react-icons/bs";
import './EditPromotion.css';


const EditPromotionModal = ({ promotion, onClose, onSave }) => {
  const [editedPromotion, setEditedPromotion] = useState(promotion);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setEditedPromotion(promotion);
  }, [promotion]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedPromotion({
      ...editedPromotion,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!editedPromotion.name) newErrors.name = 'Name is required';
    if (!editedPromotion.type) newErrors.type = 'Type is required';
    if (!editedPromotion.status) newErrors.status = 'Status is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSave(editedPromotion);
  };

  return (
    <div className="edit-modal-overlay">
      <div className="edit-modal-container">
        <div className="edit-modal-header">
          <h2 className="edit-modal-title">Edit Promotion</h2>
          <button className="edit-modal-close-btn" onClick={onClose}>
            <FiX />
          </button>
        </div>

        <form className="edit-promotion-form" onSubmit={handleSubmit}>
          <div className="edit-form-group">
            <label className="edit-form-label" htmlFor="name">
              Name<span className="edit-required">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="edit-form-input"
              value={editedPromotion.name || ''}
              onChange={handleChange}
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          <div className="edit-form-group">
            <label className="edit-form-label" htmlFor="type">
              Type<span className="edit-required">*</span>
            </label>
            <select
              id="type"
              name="type"
              className="edit-form-input"
              value={editedPromotion.type || ''}
              onChange={handleChange}
            >
              <option value="">Select Type</option>
              <option value="Small">Small</option>
              <option value="Big">Big</option>
            </select>
            {errors.type && <span className="error-message">{errors.type}</span>}
          </div>

          <div className="edit-form-group">
            <label className="edit-form-label" htmlFor="status">
              Status<span className="edit-required">*</span>
            </label>
            <div className="edit-radio-group">
              <label className="edit-radio-label">
                <input
                  type="radio"
                  name="status"
                  value="Active"
                  className="edit-radio-input"
                  checked={editedPromotion.status === 'Active'}
                  onChange={handleChange}
                />
                Active
              </label>
              <label className="edit-radio-label">
                <input
                  type="radio"
                  name="status"
                  value="Inactive"
                  className="edit-radio-input"
                  checked={editedPromotion.status === 'Inactive'}
                  onChange={handleChange}
                />
                Inactive
              </label>
            </div>
            {errors.status && <span className="error-message">{errors.status}</span>}
          </div>

          <div className="edit-form-group">
            <label className="edit-form-label" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              className="edit-form-input"
              rows={3}
              value={editedPromotion.description || ''}
              onChange={handleChange}
            />
          </div>

          <div className="edit-modal-actions">
            <button
              type="button"
              className="edit-clear-btn"
              onClick={onClose}
            >
              <MdOutlineClear className="icon1" size={20} />Clear
            </button>
            <button type="submit" className="edit-save-btn">
             <BsCheckLg className="icon1" size={20} />Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPromotionModal;
