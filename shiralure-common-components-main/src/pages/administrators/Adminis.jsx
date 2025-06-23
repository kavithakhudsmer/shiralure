import React, { useState, useEffect } from 'react';
import './Adminis.css';

import { IoPersonSharp, IoLocationSharp, IoCloseSharp } from "react-icons/io5";
import { MdLock } from "react-icons/md";
import { FaCheck } from 'react-icons/fa';
import { IoMdAddCircleOutline } from "react-icons/io";
import { RiCameraAiFill } from "react-icons/ri";

function Adminis({ admin, onClose }) {
const [activeTab, setActiveTab] = useState('profile');
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [addressList, setAddressList] = useState([]);
  const [avatar, setAvatar] = useState('/avatar.png');
  const [formData, setFormData] = useState({
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

useEffect(() => {
  fetch('/addadd.json')
    .then((res) => {
      console.log('Raw response:', res);
      return res.json();
    })
    .then((data) => {
      console.log("Parsed address data:", data);
      setAddressList(data);
    })
    .catch((error) => {
      console.error("Fetch error:", error);
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

  const handleAddAddress = (e) => {
    e.preventDefault();
    const newAddress = {
      name: formData.name,
      email: formData.email,
      phone: `${formData.countryCode} ${formData.phone}`,
      street: formData.street,
      country: formData.country,
      state: formData.state,
      city: formData.city,
      zip: formData.zip
    };

    // Basic validation
    if (!formData.name || !formData.email || !formData.phone || 
        !formData.street || !formData.country || !formData.state || 
        !formData.city || !formData.zip) {
      alert('Please fill all required fields');
      return;
    }

    setAddressList([...addressList, newAddress]);
    setShowAddressModal(false);
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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

      <button onClick={onClose} className="kvclose-btn"><IoCloseSharp /></button>

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
              className="kvupload-btn"
              onClick={() => document.getElementById('upload-photo').click()}
            >
              <RiCameraAiFill style={{ marginRight: '8px' }} />
              Upload Photo
            </button>
          </div>
        </div>
      </div>

      <div className="kvtabs">
        <button
          className={activeTab === 'profile' ? 'active' : ''}
          onClick={() => setActiveTab('profile')}
        >
          <IoPersonSharp style={{ marginRight: '8px' }} />
          Profile
        </button>
        <button
          className={activeTab === 'security' ? 'active' : ''}
          onClick={() => setActiveTab('security')}
        >
          <MdLock style={{ marginRight: '8px' }} />
          Security
        </button>
        <button
          className={activeTab === 'address' ? 'active' : ''}
          onClick={() => setActiveTab('address')}
        >
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
              <label>
                New Password <span className="required">*</span>
              </label>
              <input type="password" placeholder="Enter new password" required />
            </div>
            <div className="kvform-group">
              <label>
                Confirm Password <span className="required">*</span>
              </label>
              <input type="password" placeholder="Confirm new password" required />
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
            <button onClick={() => setShowAddressModal(true)} className="kvadd-address-btn">
              
              <IoMdAddCircleOutline style={{ marginRight: '8px' }} /> Add Address
            </button>
          </div>

         <table className="kvaddress-table">
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
      </tr>
    ))}
  </tbody>
</table>

        </div>
      )}

      {showAddressModal && (
        <div className="kvmodal-overlay">
          <div className="kvmodal">
            <h3>Add Address</h3>
            <div className="kvdivider-line"></div>
            <form onSubmit={handleAddAddress}>
              <div className="kvform-grid">
                <div className="kvform-group">
                  <label>Full Name<span className="required">*</span></label>
                  <input 
                    name="name" 
                    type="text" 
                    required 
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="kvform-group">
                  <label>Email<span className="required">*</span></label>
                  <input 
                    name="email" 
                    type="email" 
                    required 
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="kvform-group">
                  <label>Phone Number<span className="required">*</span></label>
                  <div className="kvphone-input">
                    <select 
                      name="countryCode" 
                      value={formData.countryCode}
                      onChange={handleInputChange}
                    >
                      <option value="+91">IN +91</option>
                      <option value="+1">US +1</option>
                    </select>
                    <input 
                      name="phone" 
                      type="text" 
                      required 
                      placeholder="Enter phone number" 
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="kvform-group">
                  <label>Country<span className="required">*</span></label>
                  <select 
                    name="country" 
                    required
                    value={formData.country}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Country</option>
                    <option value="India">India</option>
                    <option value="USA">USA</option>
                  </select>
                </div>
                <div className="kvform-group">
                  <label>State<span className="required">*</span></label>
                  <select 
                    name="state" 
                    required
                    value={formData.state}
                    onChange={handleInputChange}
                  >
                    <option value="">Select State</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="California">California</option>
                  </select>
                </div>
                <div className="kvform-group">
                  <label>City<span className="required">*</span></label>
                  <select 
                    name="city" 
                    required
                    value={formData.city}
                    onChange={handleInputChange}
                  >
                    <option value="">Select City</option>
                    <option value="Chennai">Chennai</option>
                    <option value="Los Angeles">Los Angeles</option>
                  </select>
                </div>
                <div className="kvform-group">
                  <label>Zip Code<span className="required">*</span></label>
                  <input 
                    name="zip" 
                    type="text" 
                    required 
                    value={formData.zip}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="kvform-group">
                  <label>Street Address<span className="required">*</span></label>
                  <input 
                    name="street" 
                    type="text" 
                    required 
                    value={formData.street}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="kvmodal-actions">
                <button type="button" onClick={() => setShowAddressModal(false)}>
                  <IoCloseSharp style={{ marginRight: '8px' }} />Close
                </button>
                <button type="submit">
                  <FaCheck style={{ marginRight: '8px' }} />Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Adminis;