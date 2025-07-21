import React, { useState, useEffect } from 'react';
import './Adminis.css';

import { IoPersonSharp, IoLocationSharp, IoCloseSharp } from 'react-icons/io5';
import { MdLock } from 'react-icons/md';
import { FaCheck } from 'react-icons/fa';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { RiCameraAiFill, RiErrorWarningLine ,RiCloseLargeFill } from 'react-icons/ri';
import { FiEye, FiEdit2, FiTrash2 } from 'react-icons/fi';

function Adminis({ admin, onClose }) {
  const emptyForm = {
    name: '',
    email: '',
    phone: '',
    countryCode: '+91',
    street: '',
    country: '',
    state: '',
    city: '',
    zip: '',
  };

  const [activeTab, setActiveTab] = useState('profile');
  const [addressList, setAddressList] = useState([]);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [formData, setFormData] = useState(emptyForm);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [avatar, setAvatar] = useState('/avatar.png');

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [addressToDeleteIndex, setAddressToDeleteIndex] = useState(null);

  useEffect(() => {
    fetch('/addadd.json')
      .then((r) => r.json())
      .then(setAddressList)
      .catch((err) => console.error('Fetch error:', err));
  }, []);

  useEffect(() => {
    return () => {
      if (avatar !== '/avatar.png') URL.revokeObjectURL(avatar);
    };
  }, [avatar]);

  const handleViewClick = (addr) => setSelectedAddress(addr);

  const handleEditClick = (addr, idx) => {
    setEditingIndex(idx);
    setFormData({
      name: addr.name,
      email: addr.email,
      phone: addr.phone.split(' ').pop(),
      countryCode: addr.phone.split(' ')[0],
      street: addr.street,
      country: addr.country,
      state: addr.state,
      city: addr.city,
      zip: addr.zip,
    });
    setShowAddressModal(true);
  };

  const handleDeleteClick = (index) => {
    setAddressToDeleteIndex(index);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    setAddressList(prev => prev.filter((_, i) => i !== addressToDeleteIndex));
    setShowDeleteConfirm(false);
    setAddressToDeleteIndex(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveAddress = (e) => {
    e.preventDefault();
    if (Object.values(formData).some((v) => v === '')) {
      alert('Please fill all fields');
      return;
    }

    const newAddress = {
      adminId: admin.id,
      name: formData.name,
      email: formData.email,
      phone: `${formData.countryCode} ${formData.phone}`,
      street: formData.street,
      country: formData.country,
      state: formData.state,
      city: formData.city,
      zip: formData.zip,
    };

    setAddressList((prev) => {
      if (editingIndex !== null) {
        const copy = [...prev];
        copy[editingIndex] = newAddress;
        return copy;
      }
      return [...prev, newAddress];
    });

    setShowAddressModal(false);
    setEditingIndex(null);
    setFormData(emptyForm);
  };

  return (
    
    
    <div className="kvadmin-profile fullscreen-profile">
      
      <div className="kvadmin-header">
        <h1>Administrators</h1>
        <div className="kvbreadcrumb">
          <h2>
            <span className="kvactive">Home</span> &gt;&gt; <span>Administrators</span>
          </h2>
        </div>
      </div>

      <button onClick={onClose} className="kvclose-btn">
        <RiCloseLargeFill />
      </button>

      <div className="kvprofile-container">
        <div className="kvprofile-header">
          <img src={avatar} alt="Avatar" className="kvavatar" />
          <div>
            <h2>{admin.name}</h2>
            <p><span className="kvrole">Admin</span></p>
            <input
              type="file"
              accept="image/*"
              id="upload-photo"
              hidden
              onChange={(e) => {
                const file = e.target.files[0];
                if (!file) return;
                if (avatar !== '/avatar.png') URL.revokeObjectURL(avatar);
                setAvatar(URL.createObjectURL(file));
              }}
            />
            <button className="kvupload-btn" onClick={() => document.getElementById('upload-photo').click()}>
              <RiCameraAiFill style={{ marginRight: '8px' }} />
              Upload Photo
            </button>
          </div>
        </div>
      </div>

      <div className="kvtabs">
        <button className={activeTab === 'profile' ? 'active' : ''} onClick={() => setActiveTab('profile')}>
          <IoPersonSharp style={{ marginRight: '8px' }} />
          Profile
        </button>
        <button className={activeTab === 'security' ? 'active' : ''} onClick={() => setActiveTab('security')}>
          <MdLock style={{ marginRight: '8px' }} />
          Security
        </button>
        <button className={activeTab === 'address' ? 'active' : ''} onClick={() => setActiveTab('address')}>
          <IoLocationSharp style={{ marginRight: '8px' }} />
          Address
        </button>
      </div>

      {activeTab === 'profile' && (
        <div className="kvinfo-box">
          <h3>Basic Information</h3>
          <p><strong>Email:</strong> {admin.email}</p>
          <p><strong>Phone:</strong> {admin.phone}</p>
          <p><strong>Status:</strong> <span className={`kv-status-${admin.status.toLowerCase()}`}>{admin.status}</span></p>
        </div>
      )}

      {activeTab === 'security' && (
        <div className="kvinfo-box">
          <h3>Change Password</h3>
          <div className="kvpassword-row">
            <div className="kvform-group">
              <label>New Password <span className="required">*</span></label>
              <input type="password" required />
            </div>
            <div className="kvform-group">
              <label>Confirm Password <span className="required">*</span></label>
              <input type="password" required />
            </div>
          </div>
          <div className="kvbutton-container">
            <button className="kvsave-btn"><FaCheck style={{ marginRight: '8px' }} />Save</button>
          </div>
        </div>
      )}

      {activeTab === 'address' && (
        <div className="kvinfo-box">
          <div className="kvaddress-header">
            <h3>Address</h3>
            <button className="kvadd-address-btn" onClick={() => {
              setEditingIndex(null);
              setFormData(emptyForm);
              setShowAddressModal(true);
            }}>
              <IoMdAddCircleOutline style={{ marginRight: '8px' }} />Add Address
            </button>
          </div>

          <table className="kvaddress-table">
            <thead>
              <tr>
                <th>Name</th><th>Email</th><th>Phone</th><th>Street</th><th>Country</th>
                <th>State</th><th>City</th><th>Zip</th><th className="no-print">Actions</th>
              </tr>
            </thead>
            <tbody>
              {addressList.map((addr, i) => addr.adminId === admin.id && (
                <tr key={i}>
                  <td>{addr.name}</td>
                  <td>{addr.email}</td>
                  <td>{addr.phone}</td>
                  <td>{addr.street}</td>
                  <td>{addr.country}</td>
                  <td>{addr.state}</td>
                  <td>{addr.city}</td>
                  <td>{addr.zip}</td>
                  <td className="kvactions no-print">
                    <div className="kvicon-button">
                      <button onClick={() => handleViewClick(addr)} className="kvicon-button kvview-btn" title="View"><FiEye /></button>
                      <button onClick={() => handleEditClick(addr, i)} className="kvicon-button kvedit-btn" title="Edit"><FiEdit2 /></button>
                      <button onClick={() => handleDeleteClick(i)} className="kvicon-button kvdelete-btn" title="Delete"><FiTrash2 /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showAddressModal && (
        <div className="kvmodal-overlay">
          <div className="kvmodal" onClick={(e) => e.stopPropagation()}>
            <h3>{editingIndex === null ? 'Add Address' : 'Edit Address'}</h3>
            <div className="kvdivider-line"></div>
            <form onSubmit={handleSaveAddress}>
              <div className="kvform-grid">
                {['name', 'email', 'zip', 'street'].map(field => (
                  <div className="kvform-group" key={field}>
                    <label>{field.charAt(0).toUpperCase() + field.slice(1)}<span className="required">*</span></label>
                    <input name={field} required value={formData[field]} onChange={handleInputChange} />
                  </div>
                ))}
                <div className="kvform-group full-width">
                  <label>Phone<span className="required">*</span></label>
                  <div className="kvphone-input">
                    <select name="countryCode" value={formData.countryCode} onChange={handleInputChange}>
                      <option value="+91">IN +91</option>
                      <option value="+1">US +1</option>
                    </select>
                    <input name="phone" type="text" required value={formData.phone} onChange={handleInputChange} />
                  </div>
                </div>
                {['country', 'state', 'city'].map(field => (
                  <div className="kvform-group" key={field}>
                    <label>{field.charAt(0).toUpperCase() + field.slice(1)}<span className="required">*</span></label>
                    <select name={field} required value={formData[field]} onChange={handleInputChange}>
                      <option value="">Select {field}</option>
                      <option value={field === 'country' ? 'India' : field === 'state' ? 'Tamil Nadu' : 'Chennai'}>
                        {field === 'country' ? 'India' : field === 'state' ? 'Tamil Nadu' : 'Chennai'}
                      </option>
                    </select>
                  </div>
                ))}
              </div>
              <div className="kvmodal-actions">
                <button type="button" onClick={() => { setShowAddressModal(false); setEditingIndex(null); }}>
                  <IoCloseSharp style={{ marginRight: '8px' }} /> Close
                </button>
                <button type="submit">
                  <FaCheck style={{ marginRight: '8px' }} /> {editingIndex === null ? 'Save' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {selectedAddress && (
        <div className="kvmodal-overlay" onClick={() => setSelectedAddress(null)}>
          <div className="kvmodal" onClick={(e) => e.stopPropagation()}>
            <h3>Address Details</h3>
            <div className="kvdivider-line"></div>
            <div className="kvaddress-detail-view">
              {Object.entries(selectedAddress).map(([key, val]) => (
                <p key={key}><strong>{key}:</strong> {val}</p>
              ))}
            </div>
            <button className="kvclose-btn" onClick={() => setSelectedAddress(null)}><IoCloseSharp /></button>
          </div>
        </div>
      )}

      {showDeleteConfirm && (
        <div className="kvdelete-modal">
          <div className="kvdelete-box">
            <div className="kvdelete-icon"><RiErrorWarningLine size={80} color="#d4af37" /></div>
            <h2>Are you sure?</h2>
            <p className="kvsubtext">You will not be able to recover the deleted record!</p>
            <div className="kvdelete-buttons">
              <button className="yes" onClick={confirmDelete}>Yes, Delete it!</button>
              <button className="no" onClick={() => setShowDeleteConfirm(false)}>No, Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
     
    
  );
}

export default Adminis;
