import React, { useState, useEffect } from 'react';
import './Adminis1.css'; // Ensure this matches the CSS filename
// import AdminLayout from "../../Components/AdminLayout";

import { IoPersonSharp, IoLocationSharp, IoCloseSharp } from "react-icons/io5";
import { MdLock } from "react-icons/md";
import { FaCheck } from 'react-icons/fa';
import { IoMdAddCircleOutline } from "react-icons/io";
import { RiCameraAiFill } from "react-icons/ri";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { IoEyeOutline } from "react-icons/io5";
import { RiErrorWarningLine } from 'react-icons/ri';
import { HiOutlineArchiveBox } from "react-icons/hi2";
import { GrDeliver } from "react-icons/gr";

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
    const [selectedAddressForDetail, setSelectedAddressForDetail] = useState(null);
    const [showOrderDetailView, setShowOrderDetailView] = useState(false); // New state for full-screen order details
    const [selectedOrderDetail, setSelectedOrderDetail] = useState(null); // For order details data

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
        fetch('/user_addresses.json')
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then((data) => {
                // Ensure data is an array before filtering
                setAddressList(Array.isArray(data) ? data.filter(addr => addr.userId === user.id) : []);
            })
            .catch((error) => {
                console.error("Failed to fetch user address data:", error);
            });

        fetch('/user_orders.json')
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then((data) => {
                setOrderList(Array.isArray(data) ? data.filter(order => order.userId === user.id) : []);
            })
            .catch((error) => {
                console.error("Failed to fetch user order data:", error);
            });
    }, [user.id]);

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

        if (!formData.name || !formData.email || !formData.phone ||
            !formData.street || !formData.country || !formData.state ||
            !formData.city || !formData.zip) {
            console.error('Please fill all required fields');
            return;
        }

        const newAddressData = {
            id: editAddressData ? editAddressData.id : Math.max(...addressList.map(a => a.id || 0), 0) + 1,
            ...formData,
            userId: user.id,
            phone: `${formData.countryCode} ${formData.phone}`
        };

        if (editAddressData) {
            setAddressList(prevList =>
                prevList.map(addr =>
                    addr.id === newAddressData.id ? newAddressData : addr
                )
            );
        } else {
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

    const handleEditAddressClick = (addressToEdit) => {
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
    // const handleViewAddressDetails = (address) => {
    //     setSelectedAddressDetail(address);
    //     setShowAddressDetailView(true);
    // };
     const handleViewAddressDetails = (address) => {
        setSelectedAddressForDetail(address); // Set the address to display
    };

    // Closes the address detail view
    // const closeAddressDetailView = () => {
    //     setShowAddressDetailView(false);
    //     setSelectedAddressDetail(null);
    // };
     const handleCloseAddressDetails = () => {
        setSelectedAddressForDetail(null); // Clear the selected address
    };
    // Handles clicking "See Order Details"
       const handleSeeOrderDetails = (order) => {
        setSelectedOrderDetail(order); // Sets the state directly from the passed 'order' object
        setShowOrderDetailView(true); // Shows the full-screen detail view
    };

    // Function to close the order detail view
    const closeOrderDetailView = () => {
        setShowOrderDetailView(false);
        setSelectedOrderDetail(null);
        setActiveTab('orders'); // Ensure tab returns to "Orders"
    };

    const getStatusClass = (step, currentStatus) => {
    const statusOrder = [
        'Order Pending',
        'Order Confirmed',
        'Order On The Way',
        'Order Delivered'
    ];

    const currentStatusIndex = statusOrder.indexOf(currentStatus);
    const stepIndex = statusOrder.indexOf(step);

    if (stepIndex < currentStatusIndex) {
        return 'skumari-status-completed-past'; // For steps that are definitely in the past
    } else if (stepIndex === currentStatusIndex) {
        // This is the current status
        switch (currentStatus) {
            case 'Order Pending':
                return 'skumari-status-current-pending';
            case 'Order Confirmed':
                return 'skumari-status-current-confirmed';
            case 'Order On The Way':
                return 'skumari-status-current-on-the-way';
            case 'Order Delivered':
                return 'skumari-status-current-delivered'; // Delivered is also a completed state
            default:
                return '';
        }
    } else {
        return 'skumari-status-upcoming'; // For steps yet to happen
    }
}


    return (
        // <AdminLayout>
        <div className="skumari-user-profile skumari-fullscreen-profile">
                    <div className="skumari-sremployee-header-section">
                        <div className="skumari-employee-header-left">
                            <h1 className="skumari-employee-title">Customers</h1>
                        </div>
                        <div className="skumari-employee-header-right">
                            <h6 className="skumari-employee-breadcrumb">
                                <a href="customers" className="skumari-employee-breadcrumb-link">Home</a> {'>>'} <span className="skumari-employee-current-page">Customers</span>
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
                {!showOrderDetailView && (
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
                            <GrDeliver style={{ marginRight: '8px' }} />
                            My Orders
                        </button>
                    </div>
                )}

            {activeTab === 'profile' &&  (
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

            {activeTab === 'security' &&  (
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

            {activeTab === 'address' &&  (
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
                                        <td colSpan="8" className="skumari-address-no-entries"> </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {activeTab === 'orders' && !showOrderDetailView &&  (
                <div className="skumari-info-box3">
                    <div className="skumari-info-title-container3">
                        <div className="skumari-orders-header">
                            <h3>Orders</h3>
                        </div>
                    </div>

                    <div className="skumari-info-details-container3">
                        {orderList.length > 0 ? orderList.map((order, index) => (
                            <div className="skumari-order-card" key={order.id || index}>
                                <div className="skumari-order-card-left">
                                    <div className="skumari-order-icon-wrapper">
                                        <HiOutlineArchiveBox size={24} />
                                    </div>
                                    <div className="skumari-order-details-text">
                                        <p className="skumari-order-id">
                                            Order ID: #{order.id}
                                            <span className={`skumari-order-status skumari-status-${order.status ? order.status.toLowerCase().replace(/\s/g, '') : ''}`}>
                                                {order.status}
                                            </span>
                                        </p>
                                        <p className="skumari-order-products">{order.products}</p>
                                        <p className="skumari-order-datetime">{order.time}, {order.date}</p>
                                        <p className="skumari-order-total">Total: ₹{order.total ? order.total.toFixed(2) : '0.00'}</p>
                                    </div>
                                </div>
                                
                                <div className="skumari-order-card-right">
                                    <button
                                        className="skumari-see-details-btn"
                                        onClick={() => handleSeeOrderDetails(order)}
                                    >
                                        See Order Details
                                    </button>
                                </div>
                            </div>
                        )) : <div className="skumari-orders-no-entries">No orders found.</div>}
                        <div className="skumari-orders-footer">
                            Showing {orderList.length > 0 ? 1 : 0} to {orderList.length} of {orderList.length} entries
                        </div>
                    </div>
                </div>
            )}

            {/* Full-Screen Order Detail View */}
            {showOrderDetailView && selectedOrderDetail && (
                <div className="skumari-order-detail-fullscreen">
                    <button onClick={closeOrderDetailView} className="skumari-order-detail-back-btn">← Back</button>
                    <div className="skumari-order-detail-columns">
                        <div className="skumari-order-summary-left">
                            <div className="skumari-order-info-group">
                                <p>Order ID: #{selectedOrderDetail.id}</p>
                                <p>Order Date: {selectedOrderDetail.time}, {selectedOrderDetail.date}</p> {/* Reverted to original data */}
                                <p>Order Type: Delivery</p>
                                <p>Order Status: <span className={`skumari-status skumari-status-${selectedOrderDetail.status ? selectedOrderDetail.status.toLowerCase().replace(/\s/g, '') : ''}`}>{selectedOrderDetail.status}</span></p>
                                <div className="skumari-order-status-bar">
                                    {['Order Pending', 'Order Confirmed', 'Order On The Way', 'Order Delivered'].map(step => (
                                        <div key={step} className={`skumari-status-step ${getStatusClass(step, selectedOrderDetail.status)}`}>
                                            <FaCheck className="skumari-status-icon" />
                                            <span>{step}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="skumari-payment-info">
                                <h4>Payment Info</h4>
                                <p>Method: Paypay</p>
                                {/* <p>Order Date: {selectedOrderDetail.time}, {selectedOrderDetail.date}</p> Reverted to original data */}
                                <p>Status: <span className="skumari-status-paid">Paid</span></p>
                            </div>
                        </div>
                        <div className="skumari-order-details-right">
                            <h4>Order Details</h4>
                            <div className="skumari-order-product-item">
                                {/* <img src="\Wella Elements 2.0 Shampoo 1000 ML.jpeg" alt=" " className="skumari-product-thumb" /> */}
                                <span>{selectedOrderDetail.productsName}</span>
                                <span className="skumari-product-price">₹{selectedOrderDetail.total ? selectedOrderDetail.total.toFixed(2) : '0.00'}</span>
                            </div>
                            <div className="skumari-summary-line"><span>Subtotal</span><span>₹{selectedOrderDetail.total ? selectedOrderDetail.total.toFixed(2) : '0.00'}</span></div>
                            <div className="skumari-summary-line"><span>Tax Fee</span><span>₹0.00</span></div>
                            <div className="skumari-summary-line"><span>Shipping Charge</span><span>₹1.00</span></div>
                            <div className="skumari-summary-line"><span>Discount</span><span>₹0.00</span></div>
                            <div className="skumari-summary-total"><span>Total</span><span>₹{(selectedOrderDetail.total ? selectedOrderDetail.total + 1.00 : 1.00).toFixed(2)}</span></div>
                        </div>
                    </div>
                </div>
            )}

            {/* Add/Edit Address Modal */}
            {showAddressModal  &&(
                <div className="skumari-modal-overlay">
                    <div className="skumari-modal">
                        <h3>{editAddressData ? 'Edit Address' : 'Add Address'}</h3>
                        <div className="skumari-divider-line"></div>
                        <form onSubmit={handleSaveAddress}>
                            <div className="skumari-form-grid">
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
            {selectedAddressForDetail && (
                <div className="skumari-address-detail-overlay">
                    <div className="skumari-address-detail-box">
                        <div className="skumari-address-detail-header">
                            <h2 className="skumari-address-detail-name">{selectedAddressForDetail.name}</h2>
                            {<button className="skumari-address-detail-back-btn" onClick={handleCloseAddressDetails}>
                                ← Back
                            </button>}
                        </div>
                        <div className="skumari-address-detail-content">
                            <div className="skumari-address-detail-row">
                                <span className="skumari-address-detail-label">NAME</span>
                                <span className="skumari-address-detail-value">: {selectedAddressForDetail.name}</span>
                            </div>
                            <div className="skumari-address-detail-row">
                                <span className="skumari-address-detail-label">EMAIL</span>
                                <span className="skumari-address-detail-value">: {selectedAddressForDetail.email}</span>
                            </div>
                            <div className="skumari-address-detail-row">
                                <span className="skumari-address-detail-label">PHONE</span>
                                <span className="skumari-address-detail-value">: {selectedAddressForDetail.phone}</span>
                            </div>
                            <div className="skumari-address-detail-row">
                                <span className="skumari-address-detail-label">ADDRESS</span>
                                <span className="skumari-address-detail-value">: {selectedAddressForDetail.street}</span>
                            </div>
                            <div className="skumari-address-detail-row">
                                <span className="skumari-address-detail-label">CITY</span>
                                <span className="skumari-address-detail-value">: {selectedAddressForDetail.city}</span>
                            </div>
                            <div className="skumari-address-detail-row">
                                <span className="skumari-address-detail-label">STATE</span>
                                <span className="skumari-address-detail-value">: {selectedAddressForDetail.state}</span>
                            </div>
                            <div className="skumari-address-detail-row">
                                <span className="skumari-address-detail-label">ZIP CODE</span>
                                <span className="skumari-address-detail-value">: {selectedAddressForDetail.zip}</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
        // </AdminLayout>
    );
    
}

export default Userprofile;