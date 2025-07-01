import React, { useState, useEffect } from 'react';
import './Adminis1.css'; // Assuming you will have a Userprofile.css file for styling

import { IoPersonSharp, IoLocationSharp, IoCloseSharp } from "react-icons/io5";
import { MdLock } from "react-icons/md";
import { FaCheck } from 'react-icons/fa';
import { IoMdAddCircleOutline } from "react-icons/io";
import { RiCameraAiFill } from "react-icons/ri";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { IoEyeOutline } from "react-icons/io5";
import { RiErrorWarningLine } from 'react-icons/ri';
import { MdOutlineLocalShipping } from "react-icons/md"; // Icon for My Orders

function Userprofile({ user, onClose }) {
  const [activeTab, setActiveTab] = useState('profile');
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [addressList, setAddressList] = useState([]);
  const [orderList, setOrderList] = useState([]);
  const [avatar, setAvatar] = useState('/avatar.png'); // Default avatar
  const [editAddressData, setEditAddressData] = useState(null);
  const [showAddressDeleteConfirm, setShowAddressDeleteConfirm] = useState(false);
  const [addressToDelete, setAddressToDelete] = useState(null);
  const [showAddressDetailView, setShowAddressDetailView] = useState(false);
  const [selectedAddressDetail, setSelectedAddressDetail] = useState(null);

  const [showOrderDetailView, setShowOrderDetailView] = useState(false);
  const [selectedOrderDetail, setSelectedOrderDetail] = useState(null);

  // New states for Order Edit and Delete
  const [showOrderEditModal, setShowOrderEditModal] = useState(false);
  const [editOrderData, setEditOrderData] = useState(null);
  const [showOrderDeleteConfirm, setShowOrderDeleteConfirm] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState(null);
  // State for order form data
  const [orderFormData, setOrderFormData] = useState({
    item: '',
    quantities: '',
    prices: '',
    shippingAddress: '',
    orderDate: ''
  });


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

  // Fetch initial data (simulated from JSON files for the user)
  useEffect(() => {
    // Fetch address data for the user
    fetch('/user_addresses.json') // Assuming a generic JSON for user addresses
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        // Filter addresses to only show those belonging to the current user
        setAddressList(Array.isArray(data) ? data.filter(addr => addr.userId === user.id) : []);
      })
      .catch((error) => {
        console.error("Failed to fetch user address data:", error);
      });

    // Fetch order data for the user
    fetch('/user_orders.json') // Assuming a generic JSON for user orders
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        // Filter orders to only show those belonging to the current user
        setOrderList(Array.isArray(data) ? data.filter(order => order.userId === user.id) : []);
      })
      .catch((error) => {
        console.error("Failed to fetch user order data:", error);
      });

  }, [user.id]); // Re-run effect if user ID changes

  // Cleanup for image URL
  useEffect(() => {
    return () => {
      if (avatar !== '/avatar.png') {
        URL.revokeObjectURL(avatar);
      }
    };
  }, [avatar]);

  // Handle input changes for both Add and Edit forms (Address)
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
      // Generate a unique ID for the address (for simulation)
      id: editAddressData ? editAddressData.id : Math.max(...addressList.map(a => a.id || 0), 0) + 1,
      ...formData,
      userId: user.id, // Associate address with current user
      phone: `${formData.countryCode} ${formData.phone}` // Store phone with country code
    };

    if (editAddressData) {
      // Logic for updating an existing address
      setAddressList(prevList =>
        prevList.map(addr =>
          addr.id === newAddressData.id ? newAddressData : addr
        )
      );
    } else {
      // Logic for adding a new address
      setAddressList(prevList => [...prevList, newAddressData]);
    }
    setEditAddressData(null);
    setShowAddressModal(false);
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
    // Split phone into country code and number if present, otherwise default
    const phoneParts = addressToEdit.phone.match(/^(\+\d{1,3})?\s*(.*)$/);
    const countryCode = phoneParts && phoneParts[1] ? phoneParts[1] : '+91';
    const phoneNumber = phoneParts && phoneParts[2] ? phoneParts[2] : addressToEdit.phone;

    setFormData({
      name: addressToEdit.name,
      email: addressToEdit.email,
      phone: phoneNumber,
      countryCode: countryCode,
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
    setAddressList(prevList => prevList.filter(addr => addr.id !== addressToDelete.id));
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

  // Placeholder for viewing order details (can be implemented similar to address details)
  const handleViewOrderDetails = (order) => {
    setSelectedOrderDetail(order);
    setShowOrderDetailView(true);
  };

  const closeOrderDetailView = () => {
    setShowOrderDetailView(false);
    setSelectedOrderDetail(null);
  };

  // --- New functions for Order Editing and Deletion ---

  // Handle input changes for Order Edit form
  const handleOrderInputChange = (e) => {
    const { name, value } = e.target;
    setOrderFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handles clicking the "Edit" icon for an order
  const handleEditOrder = (orderToEdit) => {
    setEditOrderData(orderToEdit);
    setOrderFormData({
      item: orderToEdit.item,
      quantities: orderToEdit.quantities,
      prices: orderToEdit.prices,
      shippingAddress: orderToEdit.shippingAddress,
      orderDate: orderToEdit.orderDate
    });
    setShowOrderEditModal(true);
  };

  // Handles saving the edited order
  const handleSaveOrder = (e) => {
    e.preventDefault();

    // Basic validation for order fields
    if (!orderFormData.item || !orderFormData.quantities || !orderFormData.prices ||
        !orderFormData.shippingAddress || !orderFormData.orderDate) {
        console.error('Please fill all required order fields');
        return;
    }

    const updatedOrder = {
        ...editOrderData, // Keep existing ID and other properties
        ...orderFormData, // Apply updated form data
        prices: parseFloat(orderFormData.prices) // Ensure price is a number
    };

    setOrderList(prevList =>
        prevList.map(order =>
            order.id === updatedOrder.id ? updatedOrder : order
        )
    );
    setShowOrderEditModal(false);
    setEditOrderData(null);
    setOrderFormData({ // Reset form data
      item: '', quantities: '', prices: '', shippingAddress: '', orderDate: ''
    });
  };

  // Handles canceling the order edit
  const handleCancelOrderEdit = () => {
    setShowOrderEditModal(false);
    setEditOrderData(null);
    setOrderFormData({ // Reset form data
      item: '', quantities: '', prices: '', shippingAddress: '', orderDate: ''
    });
  };

  // Handles clicking the "Delete" icon for an order
  const handleDeleteOrder = (order) => {
    setOrderToDelete(order);
    setShowOrderDeleteConfirm(true);
  };

  // Confirms deletion of an order
  const confirmDeleteOrder = () => {
    setOrderList(prevList => prevList.filter(order => order.id !== orderToDelete.id));
    setShowOrderDeleteConfirm(false);
    setOrderToDelete(null);
  };

  // Cancels deletion of an order
  const cancelDeleteOrder = () => {
    setShowOrderDeleteConfirm(false);
    setOrderToDelete(null);
  };


  return (
    <div className="skumari-user-profile skumari-fullscreen-profile">
      <div className="skumari-sremployee-header-section">
                <div className="skumari-employee-header-left">
                    <h1 className="skumari-employee-title">Customers</h1> {/* Changed title */}
                </div>
                <div className="skumari-employee-header-right">
                    <h6 className="skumari-employee-breadcrumb">
                        <a href="/" className="skumari-employee-breadcrumb-link">Home</a> &gt;&gt; <span className="skumari-employee-current-page">Customers</span> {/* Updated breadcrumb */}
                    </h6>
                </div>
            </div>
      <div className="skumari-profile-container">
        <div className="skumari-profile-header">
          <img src={avatar} alt="Avatar" className="skumari-avatar" />
          <div>
            <h2>{user.name}</h2>
            <p><span className="skumari-role">{user.role ? user.role.toUpperCase() : 'USER'}</span></p>
            <input
              type="file"
              accept="image/*"
              id="skumari-user-upload-photo"
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
              className="skumari-upload-btn"
              onClick={() => document.getElementById('skumari-user-upload-photo').click()}
            >
              <RiCameraAiFill style={{ marginRight: '8px' }} />
              Upload Photo
            </button>
          </div>
        </div>
      </div>

      <div className="skumari-tabs">
        <button
          className={activeTab === 'profile' ? 'skumari-active' : ''}
          onClick={() => setActiveTab('profile')}
        >
          <IoPersonSharp style={{ marginRight: '8px' }} />
          Profile
        </button>
        <button
          className={activeTab === 'security' ? 'skumari-active' : ''}
          onClick={() => setActiveTab('security')}
        >
          <MdLock style={{ marginRight: '8px' }} />
          Security
        </button>
        <button
          className={activeTab === 'address' ? 'skumari-active' : ''}
          onClick={() => setActiveTab('address')}
        >
          <IoLocationSharp style={{ marginRight: '8px' }} />
          Address
        </button>
        <button
          className={activeTab === 'orders' ? 'skumari-active' : ''}
          onClick={() => setActiveTab('orders')}
        >
          <MdOutlineLocalShipping style={{ marginRight: '8px' }} />
          My Orders
        </button>
      </div>

      {activeTab === 'profile' && (
        <div className="skumari-info-box">
          <div className="skumari-info-title-container">
            <h3 className="skumari-info-title">Basic Information</h3>
          </div>
          <div className="skumari-info-details-container">
            <div className="skumari-info-grid">
              <div className="skumari-info-row">
                <span className="skumari-info-label">Email</span>
                <span className="skumari-info-value">{user.email}</span>
              </div>
              <div className="skumari-info-row">
                <span className="skumari-info-label">Phone</span>
                <span className="skumari-info-value">{user.phone}</span>
              </div>
              <div className="skumari-info-row">
                <span className="skumari-info-label">Status</span>
                <span className={`skumari-info-value ${user.status === 'Active' ? 'skumari-status-active' : 'skumari-status-inactive'}`}>
                  {user.status}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'security' && (
        <div className="skumari-info-box1">
          <div className="skumari-info-title-container1">
            <h3 className="skumari-info-title1">Change Password</h3>
          </div>
          <div className="skumari-info-details-container1">
            <div className="skumari-user-form-groups1">
              <label>
                Password <span className="skumari-required">*</span>
              </label>
              <input type="password" placeholder=" " required />
            </div>
            <div className="skumari-user-form-groups1">
              <label>
                Confirmation Password <span className="skumari-required">*</span>
              </label>
              <input type="password" placeholder=" " required />
            </div>
          </div>
          <div className="skumari-button-container">
            <button className="skumari-save-btn"><FaCheck style={{ marginRight: '8px' }} />Save</button>
          </div>
        </div>
      )}

      {activeTab === 'address' && (
        <div className="skumari-info-box2">
          <div className="skumari-info-title-container2">
            <div className="skumari-address-header">
              <h3>Address</h3>
              <button onClick={handleOpenAddAddressModal} className="skumari-add-address-btn">
                <IoMdAddCircleOutline style={{ marginRight: '8px' }} /> Add Address
              </button>
            </div>
          </div>

          <div className="skumari-info-details-container2">
            <table className="skumari-address-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Address</th>
                  <th>State</th>
                  <th>City</th>
                  <th>Zip</th>
                  <th className="skumari-no-print">Action</th>
                </tr>
              </thead>
              <tbody>
                {addressList.length > 0 ? (
                  addressList.map((item, index) => (
                    <tr key={item.id || index}>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.phone}</td>
                      <td>{item.street}</td>
                      <td>{item.state}</td>
                      <td>{item.city}</td>
                      <td>{item.zip}</td>
                      <td className="skumari-address-actions">
                        <div className="skumari-address-action-buttons">
                          <button
                            title="View Details"
                            onClick={() => handleViewAddressDetails(item)}
                            className="skumari-address-icon-action-btn skumari-address-view-btn"
                          >
                            <IoEyeOutline />
                          </button>
                          <button
                            title="Edit"
                            onClick={() => handleEditAddressClick(item)}
                            className="skumari-address-icon-action-btn skumari-address-edit-btn"
                          >
                            <FiEdit2 />
                          </button>
                          <button
                            title="Delete"
                            onClick={() => handleDeleteAddressClick(item)}
                            className="skumari-address-icon-action-btn skumari-address-delete-btn"
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="skumari-address-no-entries">No address entries found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* My Orders Tab Content */}
      {activeTab === 'orders' && (
        <div className="skumari-info-box3">
          <div className="skumari-info-title-container3">
            <div className="skumari-orders-header">
              <h3>ORDERS</h3>
            </div>
          </div>

          <div className="skumari-info-details-container3">
            <table className="skumari-orders-table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Quantities</th>
                  <th>Prices</th>
                  <th>Shipping Address</th>
                  <th>Order Date</th>
                  <th className="skumari-no-print">ACTION</th>
                </tr>
              </thead>
              <tbody>
                {orderList.length > 0 ? (
                  orderList.map((order, index) => (
                    <tr key={order.id || index}>
                      <td>{order.item}</td>
                      <td>{order.quantities}</td>
                      <td>${order.prices.toFixed(2)}</td>
                      <td>{order.shippingAddress}</td>
                      <td>{order.orderDate}</td>
                      <td className="skumari-order-actions">
                        <div className="skumari-address-action-buttons">
                          <button
                            title="View Details"
                            className="skumari-address-icon-action-btn skumari-address-view-btn"
                            onClick={() => handleViewOrderDetails(order)}
                          >
                            <IoEyeOutline />
                          </button>
                          <button
                            title="Edit"
                            className="skumari-address-icon-action-btn skumari-address-edit-btn"
                            onClick={() => handleEditOrder(order)}
                          >
                            <FiEdit2 />
                          </button>
                          <button
                            title="Delete"
                            className="skumari-address-icon-action-btn skumari-address-delete-btn"
                            onClick={() => handleDeleteOrder(order)}
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="skumari-orders-no-entries">No orders found.</td>
                  </tr>
                )}
              </tbody>
            </table>
            <div className="skumari-orders-footer">
              Showing {orderList.length > 0 ? 1 : 0} to {orderList.length} of {orderList.length} entries
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Address Modal */}
      {showAddressModal && (
        <div className="skumari-modal-overlay">
          <div className="skumari-modal">
            <h3>{editAddressData ? 'Edit Address' : 'Add Address'}</h3>
            <div className="skumari-divider-line"></div>
            <form onSubmit={handleSaveAddress}>
              <div className="skumari-form-grid">
                {/* Row 1 */}
                <div className="skumari-form-group">
                  <label>Full Name<span className="skumari-required">*</span></label>
                  <input
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="skumari-form-group">
                  <label>Email<span className="skumari-required">*</span></label>
                  <input
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
                {/* Row 2 */}
                <div className="skumari-form-group">
                  <label>Phone Number<span className="skumari-required">*</span></label>
                  <div className="skumari-phone-input">
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
                <div className="skumari-form-group">
                  <label>Street Address<span className="skumari-required">*</span></label>
                  <input
                    name="street"
                    type="text"
                    required
                    value={formData.street}
                    onChange={handleInputChange}
                  />
                </div>
                {/* Row 3 */}
                <div className="skumari-form-group1">
                  <label>Country<span className="skumari-required">*</span></label>
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
                <div className="skumari-form-group1">
                  <label>State<span className="skumari-required">*</span></label>
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
                <div className="skumari-form-group1">
                  <label>City<span className="skumari-required">*</span></label>
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
                <div className="skumari-form-group">
                  <label>Zip Code<span className="skumari-required">*</span></label>
                  <input
                    name="zip"
                    type="text"
                    required
                    value={formData.zip}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="skumari-modal-actions">
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
        <div className="skumari-employee-delete-modal">
          <div className="skumari-employee-delete-box">
            <div className="skumari-employee-delete-icon"><RiErrorWarningLine size={80} color="#d4af37" /></div>
            <h2>Are you sure?</h2>
            <p className="skumari-employee-subtext">You will not be able to recover the deleted record!</p>
            <div className="skumari-employee-delete-buttons">
              <button className="skumari-yes" onClick={confirmDeleteAddress}>Yes, Delete it!</button>
              <button className="skumari-no" onClick={cancelDeleteAddress}>No, Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Address Detail View Modal */}
      {showAddressDetailView && selectedAddressDetail && (
        <div className="skumari-address-detail-overlay">
          <div className="skumari-address-detail-box">
            <div className="skumari-address-detail-header">
              <h2 className="skumari-address-detail-name">{selectedAddressDetail.name}</h2>
              <button onClick={closeAddressDetailView} className="skumari-address-detail-back-btn">
                &larr; Back
              </button>
            </div>
            <div className="skumari-address-detail-content">
              <div className="skumari-address-detail-row">
                <span className="skumari-address-detail-label">NAME</span>
                <span className="skumari-address-detail-value">: {selectedAddressDetail.name}</span>
              </div>
              <div className="skumari-address-detail-row">
                <span className="skumari-address-detail-label">EMAIL</span>
                <span className="skumari-address-detail-value">: {selectedAddressDetail.email}</span>
              </div>
              <div className="skumari-address-detail-row">
                <span className="skumari-address-detail-label">PHONE</span>
                <span className="skumari-address-detail-value">: {selectedAddressDetail.phone}</span>
              </div>
              <div className="skumari-address-detail-row">
                <span className="skumari-address-detail-label">ADDRESS</span>
                <span className="skumari-address-detail-value">: {selectedAddressDetail.street}</span>
              </div>
              <div className="skumari-address-detail-row">
                <span className="skumari-address-detail-label">CITY</span>
                <span className="skumari-address-detail-value">: {selectedAddressDetail.city}</span>
              </div>
              <div className="skumari-address-detail-row">
                <span className="skumari-address-detail-label">STATE</span>
                <span className="skumari-address-detail-value">: {selectedAddressDetail.state}</span>
              </div>
              <div className="skumari-address-detail-row">
                <span className="skumari-address-detail-label">ZIP CODE</span>
                <span className="skumari-address-detail-value">: {selectedAddressDetail.zip}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Order Detail View Modal */}
      {showOrderDetailView && selectedOrderDetail && (
        <div className="skumari-order-detail-overlay">
          <div className="skumari-order-detail-box">
            <div className="skumari-order-detail-header">
              <h2 className="skumari-order-detail-name">Order Details (Item: {selectedOrderDetail.item})</h2>
              <button onClick={closeOrderDetailView} className="skumari-order-detail-back-btn">
                &larr; Back
              </button>
            </div>
            <div className="skumari-order-detail-content">
              <div className="skumari-order-detail-row">
                <span className="skumari-order-detail-label">ITEM</span>
                <span className="skumari-order-detail-value">: {selectedOrderDetail.item}</span>
              </div>
              <div className="skumari-order-detail-row">
                <span className="skumari-order-detail-label">QUANTITIES</span>
                <span className="skumari-order-detail-value">: {selectedOrderDetail.quantities}</span>
              </div>
              <div className="skumari-order-detail-row">
                <span className="skumari-order-detail-label">PRICES</span>
                <span className="skumari-order-detail-value">: ${selectedOrderDetail.prices.toFixed(2)}</span>
              </div>
              <div className="skumari-order-detail-row">
                <span className="skumari-order-detail-label">SHIPPING ADDRESS</span>
                <span className="skumari-order-detail-value">: {selectedOrderDetail.shippingAddress}</span>
              </div>
              <div className="skumari-order-detail-row">
                <span className="skumari-order-detail-label">ORDER DATE</span>
                <span className="skumari-order-detail-value">: {selectedOrderDetail.orderDate}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Order Edit Modal (New) */}
      {showOrderEditModal && editOrderData && (
        <div className="skumari-modal-overlay">
          <div className="skumari-order-edit-modal">
            <h3>ORDERS</h3>
            <div className="skumari-divider-line"></div>
            <form onSubmit={handleSaveOrder}>
              <div className="skumari-form-group">
                <label>Item<span className="skumari-required">*</span></label>
                <input
                  name="item"
                  type="text"
                  required
                  value={orderFormData.item}
                  onChange={handleOrderInputChange}
                />
              </div>
              <div className="skumari-form-group">
                <label>Quantities<span className="skumari-required">*</span></label>
                <input
                  name="quantities"
                  type="number"
                  required
                  value={orderFormData.quantities}
                  onChange={handleOrderInputChange}
                />
              </div>
              <div className="skumari-form-group">
                <label>Prices<span className="skumari-required">*</span></label>
                <input
                  name="prices"
                  type="number"
                  step="0.01" // For decimal prices
                  required
                  value={orderFormData.prices}
                  onChange={handleOrderInputChange}
                />
              </div>
              <div className="skumari-form-group">
                <label>Shipping Address<span className="skumari-required">*</span></label>
                <input
                  name="shippingAddress"
                  type="text"
                  required
                  value={orderFormData.shippingAddress}
                  onChange={handleOrderInputChange}
                />
              </div>
              <div className="skumari-form-group">
                <label>Order Date<span className="skumari-required">*</span></label>
                <input
                  name="orderDate"
                  type="text" // Or type="date" if you want a date picker
                  required
                  value={orderFormData.orderDate}
                  onChange={handleOrderInputChange}
                />
              </div>
              <div className="skumari-modal-actions">
                <button type="button" onClick={handleCancelOrderEdit}>
                  <IoCloseSharp style={{ marginRight: '8px' }} />CLEAR
                </button>
                <button type="submit">
                  <FaCheck style={{ marginRight: '8px' }} />SAVE
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Order Delete Confirmation Modal (New) */}
      {showOrderDeleteConfirm && (
        <div className="skumari-employee-delete-modal"> {/* Reusing employee delete modal styles */}
          <div className="skumari-employee-delete-box">
            <div className="skumari-employee-delete-icon"><RiErrorWarningLine size={80} color="#d4af37" /></div>
            <h2>Are you sure?</h2>
            <p className="skumari-employee-subtext">You will not be able to recover the deleted record!</p>
            <div className="skumari-employee-delete-buttons">
              <button className="skumari-yes" onClick={confirmDeleteOrder}>Yes, Delete it!</button>
              <button className="skumari-no" onClick={cancelDeleteOrder}>No, Cancel</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default Userprofile;