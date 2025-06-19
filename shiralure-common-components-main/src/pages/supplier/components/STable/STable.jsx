// SuppliersTable.jsx
import React, { useState } from 'react';
import './STable.css';
import AddButton from "../../assets/add (1).png";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { FaRegCircleCheck } from "react-icons/fa6";
import { GrView } from "react-icons/gr";
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";

const SuppliersTable = ({ onViewSupplier }) => {
  const [suppliers, setSuppliers] = useState([
    {
      id: 1,
      company: 'Wella',
      name: 'Chela',
      email: 'wella@gmail.com',
      phone: '+91 7845337261',
      country: 'India',
      state: 'Tamilnadu',
      city: 'Chennai',
      zipCode: '',
      address: 'India'
    }
  ]);

  const [showPopup, setShowPopup] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [supplierToDelete, setSupplierToDelete] = useState(null);
  const [formData, setFormData] = useState({
    company: '',
    name: '',
    email: '',
    phone: '',
    country: '',
    state: '',
    city: '',
    zipCode: '',
    address: '',
    image: null
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      image: e.target.files[0]
    }));
  };

  const handleSubmit = () => {
    const newSupplier = {
      id: suppliers.length + 1,
      company: formData.company,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      country: formData.country,
      state: formData.state,
      city: formData.city,
      zipCode: formData.zipCode,
      address: formData.address,
      image: formData.image
    };
    
    setSuppliers([...suppliers, newSupplier]);
    setShowPopup(false);
    setFormData({
      company: '',
      name: '',
      email: '',
      phone: '',
      country: '',
      state: '',
      city: '',
      zipCode: '',
      address: '',
      image: null
    });
  };

  const handleClose = () => {
    setShowPopup(false);
    setFormData({
      company: '',
      name: '',
      email: '',
      phone: '',
      country: '',
      state: '',
      city: '',
      zipCode: '',
      address: '',
      image: null
    });
  };

  const handleViewSupplier = (supplier) => {
    if (onViewSupplier) {
      onViewSupplier(supplier);
    }
  };

  const handleEditSupplier = (supplier) => {
    // TODO: Implement edit functionality
    console.log('Edit supplier:', supplier);
  };

  const handleDeleteClick = (supplier) => {
    setSupplierToDelete(supplier);
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = () => {
    if (supplierToDelete) {
      setSuppliers(suppliers.filter(supplier => supplier.id !== supplierToDelete.id));
      setShowDeleteConfirm(false);
      setSupplierToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirm(false);
    setSupplierToDelete(null);
  };

  return (
    <div className="suppliers-container">
      <div className="suppliers-header">
        <div className="add-button">
          <button className="btn-add" onClick={() => setShowPopup(true)}>
            <img className='add-btn-img' src={AddButton} alt="Add Supplier" />
          </button>
        </div>
      </div>

      <div className="suppliers-table-container">
        <table className="suppliers-table">
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
            {suppliers.map((supplier) => (
              <tr key={supplier.id}>
                <td>{supplier.company}</td>
                <td>{supplier.name}</td>
                <td className="email-cell">{supplier.email}</td>
                <td>{supplier.phone}</td>
                <td>
                  <div className="action-buttons">
                    <button 
                      className="action-btn view-btn"
                      title="View"
                      onClick={() => handleViewSupplier(supplier)}
                    >
                      <span className="action-icon"><GrView/></span>
                    </button>
                    <button 
                      className="action-btn edit-btn"
                      title="Edit"
                      onClick={() => handleEditSupplier(supplier)}
                    >
                      <span className="action-icon">
                        <i class="fa-solid fa-pen-to-square"></i>
                      </span>
                    </button>
                    <button 
                      className="action-btn delete-btn"
                      title="Delete"
                      onClick={() => handleDeleteClick(supplier)}
                    >
                      <span className="action-icon"><RiDeleteBin6Line/></span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="table-footer">
        <span className="entries-info">Showing 1 to {suppliers.length} of {suppliers.length} entries</span>
      </div>

      {/* Add Supplier Popup Form */}
      {showPopup && (
        <div className="supplier-form-popup-overlay" onClick={handleClose}>
          <div className="supplier-form-popup-content" onClick={(e) => e.stopPropagation()}>
            <div className="supplier-form-header">
              <h2>Add New Supplier</h2>
            </div>
            
            <div className="supplier-form-body">
              <div className="supplier-form-row">
                <div className="supplier-form-group">
                  <label>
                    Company <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    name="company"
                    className="supplier-form-control"
                    value={formData.company}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="supplier-form-group">
                  <label>
                    Name <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    className="supplier-form-control"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="supplier-form-row">
                <div className="supplier-form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    className="supplier-form-control"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="supplier-form-group">
                  <label>Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    className="supplier-form-control"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="supplier-form-row">
                <div className="supplier-form-group">
                  <label>Country</label>
                  <input
                    type="text"
                    name="country"
                    className="supplier-form-control"
                    value={formData.country}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="supplier-form-group">
                  <label>State</label>
                  <input
                    type="text"
                    name="state"
                    className="supplier-form-control"
                    value={formData.state}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="supplier-form-row">
                <div className="supplier-form-group">
                  <label>City</label>
                  <input
                    type="text"
                    name="city"
                    className="supplier-form-control"
                    value={formData.city}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="supplier-form-group">
                  <label>Zip Code</label>
                  <input
                    type="text"
                    name="zipCode"
                    className="supplier-form-control"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="supplier-form-row">
                <div className="supplier-form-group full-width">
                  <label>Image</label>
                  <div className="supplier-file-input-container">
                    <input
                      type="file"
                      name="image"
                      className="supplier-file-input"
                      onChange={handleFileChange}
                      accept="image/*"
                    />
                    <div className="supplier-file-placeholder">
                      {formData.image ? formData.image.name : 'No file chosen'}
                    </div>
                  </div>
                </div>
              </div>

              <div className="supplier-form-row">
                <div className="supplier-form-group full-width">
                  <label>Address</label>
                  <textarea
                    name="address"
                    className="supplier-textarea-control"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Enter address..."
                  />
                </div>
              </div>
            </div>

            <div className="supplier-form-footer">
              <button 
                type="button" 
                className="supplier-form-btn secondary"
                onClick={handleClose}
              >
                <IoIosCloseCircleOutline className='close-circle'/>Close
              </button>
              <button 
                type="button" 
                className="supplier-form-btn primary"
                onClick={handleSubmit}
              >
                <FaRegCircleCheck className='save-circle'/>Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Popup */}
      {showDeleteConfirm && (
        <div className="delete-confirm-overlay" onClick={handleCancelDelete}>
          <div className="delete-confirm-popup" onClick={(e) => e.stopPropagation()}>
            <div className="delete-confirm-icon">
              <div className="warning-circle">
                <span className="warning-exclamation">!</span>
              </div>
            </div>
            
            <div className="delete-confirm-content">
              <h3 className="delete-confirm-title">Are you sure ?</h3>
              <p className="delete-confirm-message">
                You will not be able to recover the deleted record!
              </p>
            </div>
            
            <div className="delete-confirm-buttons">
              <button 
                className="delete-confirm-btn delete-btn-confirm"
                onClick={handleConfirmDelete}
              >
                Yes, Delete it !
              </button>
              <button 
                className="delete-confirm-btn cancel-btn-confirm"
                onClick={handleCancelDelete}
              >
                No, Cancel !
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuppliersTable;