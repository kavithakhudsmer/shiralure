import React, { useState, useEffect } from 'react';
import './Adminis.css';
 
import { IoPersonSharp, IoLocationSharp, IoCloseSharp } from "react-icons/io5";
import { MdLock } from "react-icons/md";
import { FaCheck } from 'react-icons/fa';
import { IoMdAddCircleOutline } from "react-icons/io";
import { RiCameraAiFill } from "react-icons/ri";
import {FiEdit2,FiTrash2 } from "react-icons/fi";
import { IoEyeOutline } from "react-icons/io5";
import { RiErrorWarningLine } from 'react-icons/ri';
 
function Adminis({ admin, onClose }) {
  const [activeTab, setActiveTab] = useState('profile');
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [addressList, setAddressList] = useState([]);
  const [avatar, setAvatar] = useState('/avatar.png');
  const [editAddressData, setEditAddressData] = useState(null);
  const [showAddressDeleteConfirm, setShowAddressDeleteConfirm] = useState(false);
  const [addressToDelete, setAddressToDelete] = useState(null);
  // New states for Address Detail View
  const [showAddressDetailView, setShowAddressDetailView] = useState(false);
  const [selectedAddressDetail, setSelectedAddressDetail] = useState(null);
 
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    countryCode: '+91', // Default for new address
    street: '',
    country: '',
    state: '',
    city: '',
    zip: ''
  });
 
  // Fetch initial address data (simulated)
  useEffect(() => {
    fetch('/address.json')
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setAddressList(Array.isArray(data) ? data : []);
      })
      .catch((error) => {
        console.error("Failed to fetch address data:", error);
      });
  }, []);
 
  // Cleanup for image URL
  useEffect(() => {
    return () => {
      if (avatar !== '/avatar.png') {
        URL.revokeObjectURL(avatar);
      }
    };
  }, [avatar]);
 
  // Handle input changes for both Add and Edit forms
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
 
  // Function to reset formData for a new address entry
  const resetAddressForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      countryCode: '+91',
      street: '',
      country: '',
      state: '',
      city: '',
      zip: ''
    });
  };
 
  // Handles submitting the Add/Edit Address form
  const handleSaveAddress = (e) => {
    e.preventDefault();
 
    // Basic validation
    if (!formData.name || !formData.email || !formData.phone ||
        !formData.street || !formData.country || !formData.state ||
        !formData.city || !formData.zip) {
      console.error('Please fill all required fields');
      return;
    }
 
    const newAddressData = {
      ...formData,
      adminId: admin.id,
      phone: `${formData.countryCode} ${formData.phone}`
    };
 
    if (editAddressData) {
      // Logic for updating an existing address
      setAddressList(prevList =>
        prevList.map(addr =>
          addr === editAddressData ? newAddressData : addr
        )
      );
      setEditAddressData(null);
      setShowAddressModal(false);
    } else {
      // Logic for adding a new address
      setAddressList(prevList => [...prevList, newAddressData]);
      setShowAddressModal(false);
    }
    resetAddressForm();
  };
 
  // Handles clicking the "Add Address" button
  const handleOpenAddAddressModal = () => {
    resetAddressForm();
    setEditAddressData(null);
    setShowAddressModal(true);
  };
 
  // Handles clicking the "Edit" icon for an address
  const handleEditAddressClick = (addressToEdit) => {
    const phoneParts = addressToEdit.phone.split(' ');
    setFormData({
      name: addressToEdit.name,
      email: addressToEdit.email,
      phone: phoneParts.length > 1 ? phoneParts[1] : addressToEdit.phone,
      countryCode: phoneParts.length > 1 ? phoneParts[0] : '+91',
      street: addressToEdit.street,
      country: addressToEdit.country,
      state: addressToEdit.state,
      city: addressToEdit.city,
      zip: addressToEdit.zip
    });
    setEditAddressData(addressToEdit);
    setShowAddressModal(true);
  };
 
  // Handles clicking the "Delete" icon for an address
  const handleDeleteAddressClick = (address) => {
    setAddressToDelete(address);
    setShowAddressDeleteConfirm(true);
  };
 
  // Confirms deletion of an address
  const confirmDeleteAddress = () => {
    setAddressList(prevList => prevList.filter(addr => addr !== addressToDelete));
    setShowAddressDeleteConfirm(false);
    setAddressToDelete(null);
  };
 
  // Cancels deletion of an address
  const cancelDeleteAddress = () => {
    setShowAddressDeleteConfirm(false);
    setAddressToDelete(null);
  };
 
  // Handles clicking the "View" icon for an address
  const handleViewAddressDetails = (address) => {
    setSelectedAddressDetail(address);
    setShowAddressDetailView(true);
  };
 
  // Closes the address detail view
  const closeAddressDetailView = () => {
    setShowAddressDetailView(false);
    setSelectedAddressDetail(null);
  };
 
 
  return (
    <div className="sraj-admin-profile sraj-fullscreen-profile">
      <div className="sraj-admin-header">
        <h1>Employees</h1>
        <div className="sraj-breadcrumb">
          <h2>
            <span className="sraj-home-link" onClick={onClose}>Home</span> &gt;&gt; <span>Employees</span>
          </h2>
        </div>
      </div>
      <div className="sraj-profile-container">
        <div className="sraj-profile-header">
          <img src={avatar} alt="Avatar" className="sraj-avatar" />
          <div>
            <h2>{admin.name}</h2>
            <p><span className="sraj-role">Admin</span></p>
            <input
              type="file"
              accept="image/*"
              id="sraj-upload-photo"
              style={{ display: 'none' }}
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  if (avatar !== '/avatar.png') {
                    URL.revokeObjectURL(avatar);
                  }
                  const imageUrl = URL.createObjectURL(file);
                  setAvatar(imageUrl);
                }
              }}
            />
            <button
              className="sraj-upload-btn"
              onClick={() => document.getElementById('sraj-upload-photo').click()}
            >
              <RiCameraAiFill style={{ marginRight: '8px' }} />
              Upload Photo
            </button>
          </div>
        </div>
      </div>
 
      <div className="sraj-tabs">
        <button
          className={activeTab === 'profile' ? 'sraj-active' : ''}
          onClick={() => setActiveTab('profile')}
        >
          <IoPersonSharp style={{ marginRight: '8px' }} />
          Profile
        </button>
        <button
          className={activeTab === 'security' ? 'sraj-active' : ''}
          onClick={() => setActiveTab('security')}
        >
          <MdLock style={{ marginRight: '8px' }} />
          Security
        </button>
        <button
          className={activeTab === 'address' ? 'sraj-active' : ''}
          onClick={() => setActiveTab('address')}
        >
          <IoLocationSharp style={{ marginRight: '8px' }} />
          Address
        </button>
      </div>
 
      {activeTab === 'profile' && (
        <div className="sraj-info-box">
          <div className="sraj-info-title-container">
            <h3 className="sraj-info-title">Basic Information</h3>
          </div>
          <div className="sraj-info-details-container">
            <div className="sraj-info-grid">
              <div className="sraj-info-row">
                <span className="sraj-info-label">Email</span>
                <span className="sraj-info-value">{admin.email}</span>
              </div>
              <div className="sraj-info-row">
                <span className="sraj-info-label">Phone</span>
                <span className="sraj-info-value">{admin.phone}</span>
              </div>
              <div className="sraj-info-row">
                <span className="sraj-info-label">Status</span>
                <span className={`sraj-info-value ${admin.status === 'Active' ? 'sraj-status-active' : 'sraj-status-inactive'}`}>
                  {admin.status}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
 
      {activeTab === 'security' && (
        <div className="sraj-info-box1">
          <div className="sraj-info-title-container1">
            <h3 className="sraj-info-title1">Change Password</h3>
          </div>
          <div className="sraj-info-details-container1">
            <div className="sraj-employee-form-groups1">
              <label>
                Password <span className="sraj-required">*</span>
              </label>
              <input type="password" placeholder=" " required />
            </div>
            <div className="sraj-employee-form-groups1">
              <label>
                Confirmation Password <span className="sraj-required">*</span>
              </label>
              <input type="password" placeholder=" " required />
            </div>
          </div>
          <div className="sraj-button-container">
            <button className="sraj-save-btn"><FaCheck style={{ marginRight: '8px' }} />Save</button>
          </div>
        </div>
      )}
 
      {activeTab === 'address' && (
        <div className="sraj-info-box2">
          <div className="sraj-info-title-container2">
            <div className="sraj-address-header">
              <h3>Address</h3>
              <button onClick={handleOpenAddAddressModal} className="sraj-add-address-btn">
                <IoMdAddCircleOutline style={{ marginRight: '8px' }} /> Add Address
              </button>
            </div>
          </div>
 
          <div className="sraj-info-details-container2">
            <table className="sraj-address-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Street</th>
                  <th>Country</th>
                  <th>State</th>
                  <th>City</th>
                  <th>Zip</th>
                  <th className="sraj-no-print">Action</th>
                </tr>
              </thead>
              <tbody>
                {addressList
                  .filter(item => item.adminId === admin.id)
                  .map((item, index) => (
                    <tr key={index}>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.phone}</td>
                      <td>{item.street}</td>
                      <td>{item.country}</td>
                      <td>{item.state}</td>
                      <td>{item.city}</td>
                      <td>{item.zip}</td>
                      <td className="sraj-address-actions">
                        <div className="sraj-address-action-buttons">
                          <button
                            title="View Details"
                            onClick={() => handleViewAddressDetails(item)}
                            className="sraj-address-icon-action-btn sraj-address-view-btn" // Added view button
                          >
                            <IoEyeOutline />
                          </button>
                          <button
                            title="Edit"
                            onClick={() => handleEditAddressClick(item)}
                            className="sraj-address-icon-action-btn sraj-address-edit-btn"
                          >
                            <FiEdit2 />
                          </button>
                          <button
                            title="Delete"
                            onClick={() => handleDeleteAddressClick(item)}
                            className="sraj-address-icon-action-btn sraj-address-delete-btn"
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                {addressList.filter(item => item.adminId === admin.id).length === 0 && (
                    <tr>
                        <td colSpan="9" className="sraj-address-no-entries">No address entries found.</td>
                    </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
 
      {/* Add/Edit Address Modal */}
      {(showAddressModal) && (
        <div className="sraj-modal-overlay">
          <div className="sraj-modal">
            <h3>{editAddressData ? 'Edit Address' : 'Add Address'}</h3>
            <div className="sraj-divider-line"></div>
            <form onSubmit={handleSaveAddress}>
              <div className="sraj-form-grid">
                {/* Row 1 */}
                <div className="sraj-form-group">
                  <label>Full Name<span className="sraj-required">*</span></label>
                  <input
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="sraj-form-group">
                  <label>Email<span className="sraj-required">*</span></label>
                  <input
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
                {/* Row 2 */}
                <div className="sraj-form-group">
                  <label>Phone Number<span className="sraj-required">*</span></label>
                  <div className="sraj-phone-input">
                    <input
                      name="phone"
                      type="text"
                      required
                      placeholder=" "
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="sraj-form-group">
                  <label>Street Address<span className="sraj-required">*</span></label>
                  <input
                    name="street"
                    type="text"
                    required
                    value={formData.street}
                    onChange={handleInputChange}
                  />
                </div>
                {/* Row 3 */}
                <div className="sraj-form-group1">
                  <label>Country<span className="sraj-required">*</span></label>
                  <select
                    name="country"
                    required
                    value={formData.country}
                    onChange={handleInputChange}
                  >
                    <option value="">--</option>
                    <option value="India">India</option>
                    <option value="USA">USA</option>
                  </select>
                </div>
                <div className="sraj-form-group1">
                  <label>State<span className="sraj-required">*</span></label>
                  <select
                    name="state"
                    required
                    value={formData.state}
                    onChange={handleInputChange}
                  >
                    <option value="">--</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="California">California</option>
                  </select>
                </div>
                {/* Row 4 */}
                <div className="sraj-form-group1">
                  <label>City<span className="sraj-required">*</span></label>
                  <select
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleInputChange}
                  >
                    <option value="">--</option>
                    <option value="Chennai">Chennai</option>
                    <option value="Los Angeles">Los Angeles</option>
                  </select>
                </div>
                <div className="sraj-form-group">
                  <label>Zip Code<span className="sraj-required">*</span></label>
                  <input
                    name="zip"
                    type="text"
                    required
                    value={formData.zip}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="sraj-modal-actions">
                <button type="button" onClick={() => { setShowAddressModal(false); resetAddressForm(); setEditAddressData(null); }}>
                  <IoCloseSharp style={{ marginRight: '8px' }} />Cancel
                </button>
                <button type="submit">
                  <FaCheck style={{ marginRight: '8px' }} />Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
 
      {/* Delete Confirmation Modal (for Address) */}
      {showAddressDeleteConfirm && (
        <div className="sraj-employee-delete-modal">
          <div className="sraj-employee-delete-box">
            <div className="sraj-employee-delete-icon"><RiErrorWarningLine size={80} color="#d4af37" /></div>
            <h2>Are you sure?</h2>
            <p className="sraj-employee-subtext">You will not be able to recover the deleted record!</p>
            <div className="sraj-employee-delete-buttons">
              <button className="sraj-yes" onClick={confirmDeleteAddress}>Yes, Delete it!</button>
              <button className="sraj-no" onClick={cancelDeleteAddress}>No, Cancel</button>
            </div>
          </div>
        </div>
      )}
 
      {/* Address Detail View Modal */}
      {showAddressDetailView && selectedAddressDetail && (
        <div className="sraj-address-detail-overlay"> {/* New overlay class */}
          <div className="sraj-address-detail-box"> {/* New box class */}
            <div className="sraj-address-detail-header"> {/* New header class */}
              <h2 className="sraj-address-detail-name">{selectedAddressDetail.name}</h2> {/* Display Name */}
              <button onClick={closeAddressDetailView} className="sraj-address-detail-back-btn">
                &larr; Back
              </button>
            </div>
            <div className="sraj-address-detail-content"> {/* New content container */}
              <div className="sraj-address-detail-row">
                <span className="sraj-address-detail-label">NAME</span>
                <span className="sraj-address-detail-value">: {selectedAddressDetail.name}</span>
              </div>
              <div className="sraj-address-detail-row">
                <span className="sraj-address-detail-label">EMAIL</span>
                <span className="sraj-address-detail-value">: {selectedAddressDetail.email}</span>
              </div>
              <div className="sraj-address-detail-row">
                <span className="sraj-address-detail-label">PHONE</span>
                <span className="sraj-address-detail-value">: {selectedAddressDetail.phone}</span>
              </div>
              <div className="sraj-address-detail-row">
                <span className="sraj-address-detail-label">ADDRESS</span>
                <span className="sraj-address-detail-value">: {selectedAddressDetail.street}</span>
              </div>
              <div className="sraj-address-detail-row">
                <span className="sraj-address-detail-label">CITY</span>
                <span className="sraj-address-detail-value">: {selectedAddressDetail.city}</span>
              </div>
              <div className="sraj-address-detail-row">
                <span className="sraj-address-detail-label">STATE</span>
                <span className="sraj-address-detail-value">: {selectedAddressDetail.state}</span>
              </div>
              <div className="sraj-address-detail-row">
                <span className="sraj-address-detail-label">ZIP CODE</span>
                <span className="sraj-address-detail-value">: {selectedAddressDetail.zip}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
 
export default Adminis;