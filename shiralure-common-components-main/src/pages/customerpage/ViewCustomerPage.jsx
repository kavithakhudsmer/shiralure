import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { ImagePlus, Eye, Pen, Trash2, User, Lock, MapPin, FileText } from 'lucide-react';
import './ViewCustomerPage.css';
import { TiTick } from "react-icons/ti";
import { PiWarningCircleBold } from 'react-icons/pi';
import { RxCross2 } from "react-icons/rx";

export default function ViewCustomerPage() {
  const { id } = useParams();
  const location = useLocation();

  // Component-level state for customer, loading, and errors
  const [customer, setCustomer] = useState(location.state?.customer);
  const [isLoading, setIsLoading] = useState(!customer);
  const [error, setError] = useState(null);

  const [activeTab, setActiveTab] = useState('profile');
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [viewedAddress, setViewedAddress] = useState(null);
  const [viewedOrder, setViewedOrder] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState('https://via.placeholder.com/150');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState({ type: null, index: null });

  const [addresses, setAddresses] = useState([]);
  const [orders, setOrders] = useState([]);

  // Effect to fetch customer data if it's not passed in state
  useEffect(() => {
    if (!customer) {
      setIsLoading(true);
      fetch('/da.json')
        .then(res => {
          if (!res.ok) throw new Error('Network response was not ok');
          return res.json();
        })
        .then(allCustomers => {
          const foundCustomer = allCustomers.find(c => c.id.toString() === id);
          if (foundCustomer) {
            setCustomer(foundCustomer);
          } else {
            setError('Customer not found.');
          }
        })
        .catch(err => setError(err.message))
        .finally(() => setIsLoading(false));
    }
  }, [id, customer]);

  useEffect(() => {
    // Fetch related data for orders and addresses
    fetch('/or.json')
      .then(res => res.json())
      .then(data => setOrders(data))
      .catch(err => console.error('Failed to load orders.json:', err));

    fetch('/ad.json')
      .then(res => res.json())
      .then(data => setAddresses(data))
      .catch(err => console.error('Error loading addresses.json:', err));
  }, []);

  const [editingAddressIndex, setEditingAddressIndex] = useState(null);
  const [addressForm, setAddressForm] = useState({
    name: '', email: '', phone: '', address: '', state: '', city: '', zip: ''
  });

  const [editingOrderIndex, setEditingOrderIndex] = useState(null);
  const [orderForm, setOrderForm] = useState({
    item: '', quantity: '', price: '', shippingAddress: '', orderDate: ''
  });

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePhoto(URL.createObjectURL(file));
    }
  };

  const openAddressModal = (index = null) => {
    if (index !== null) {
      setAddressForm(addresses[index]);
      setEditingAddressIndex(index);
    } else {
      setAddressForm({ name: '', email: '', phone: '', address: '', state: '', city: '', zip: '' });
      setEditingAddressIndex(null);
    }
    setShowAddressModal(true);
  };
  
  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddressForm(prev => ({ ...prev, [name]: value }));
  };
  
  const handleAddressSave = () => {
    if (editingAddressIndex !== null) {
      const updated = [...addresses];
      updated[editingAddressIndex] = addressForm;
      setAddresses(updated);
    } else {
      setAddresses([...addresses, { ...addressForm, id: addresses.length + 1 }]);
    }
    setShowAddressModal(false);
  };
  
  const openOrderModal = (index = null) => {
    if (index !== null) {
      setOrderForm(orders[index]);
      setEditingOrderIndex(index);
    } else {
      setOrderForm({ item: '', quantity: '', price: '', shippingAddress: '', orderDate: '' });
      setEditingOrderIndex(null);
    }
    setShowOrderModal(true);
  };

  const handleOrderChange = (e) => {
    const { name, value } = e.target;
    setOrderForm(prev => ({ ...prev, [name]: value }));
  };

  const handleOrderSave = () => {
    if (editingOrderIndex !== null) {
      const updated = [...orders];
      updated[editingOrderIndex] = orderForm;
      setOrders(updated);
    } else {
      setOrders([...orders, { ...orderForm, id: orders.length + 1 }]);
    }
    setShowOrderModal(false);
  };

  const openDeleteModal = (type, index) => {
    setDeleteTarget({ type, index });
    setShowDeleteModal(true);
  };

  const handleDeleteConfirmed = () => {
    const { type, index } = deleteTarget;
    if (type === 'address') {
      setAddresses(addresses.filter((_, i) => i !== index));
    } else if (type === 'order') {
      setOrders(orders.filter((_, i) => i !== index));
    }
    setShowDeleteModal(false);
  };

  // Loading and error views
  if (isLoading) {
    return <div className="snekaview-customer-page"><h2>Loading customer...</h2></div>;
  }

  if (error) {
    return <div className="snekaview-customer-page"><h2>Error: {error}</h2></div>;
  }

  if (!customer) {
    return <div className="snekaview-customer-page"><h2>Customer not found.</h2></div>;
  }

  return (
    <div className="snekaview-customer-page">
      {/* Profile Header */}
      <div className="snekaview-white-card snekaview-profile-header-card">
        <div className="snekaview-header">
          <img src={profilePhoto} alt={customer?.name} className="snekaview-profile-photo" />
        </div>
        <div className="snekaview-header-info">
          <h2>{customer?.name}</h2>
          <span className="snekaview-tag">CUSTOMER</span>
          <input
            type="file"
            accept="image/*"
            id="photo-upload"
            style={{ display: 'none' }}
            onChange={handlePhotoUpload}
          />
          <button
            className="snekaview-upload-btn"
            onClick={() => document.getElementById('photo-upload').click()}
            type="button"
          >
            <ImagePlus size={16} style={{ marginRight: '6px' }} />
            Upload Photo
          </button>
        </div>
      </div>

      {/* Tab Section */}
      <div className="snekaview-white-card">
        <div className="snekaview-tabs">
          {['profile', 'security', 'address', 'orders'].map(tab => {
            const Icon = {
              profile: User,
              security: Lock,
              address: MapPin,
              orders: FileText
            }[tab];

            return (
              <button
                key={tab}
                className={`snekaview-tab ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                <Icon size={16} style={{ marginRight: 6 }} />
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            );
          })}
        </div>

        <div className="snekaview-tab-content">
          {activeTab === 'profile' && (
            <>
              <div className="snekaview-info-row">
                <div className="snekaview-info-label"><strong>Email</strong></div>
                <div className="snekaview-info-value">{customer?.email}</div>

                <div className="snekaview-info-label"><strong>Phone</strong></div>
                <div className="snekaview-info-value">{customer?.phone}</div>
              </div>

              <div className="snekaview-info-row">
                <div className="snekaview-info-label"><strong>Status</strong></div>
                <div className="snekaview-info-value">
                  <span className={`snekaview-status ${customer?.status?.toLowerCase()}`}>
                    {customer?.status?.charAt(0).toUpperCase() + customer?.status?.slice(1).toLowerCase()}
                  </span>
                </div>
              </div>
            </>
          )}

          {activeTab === 'security' && (
            <>
              <div className="snekaview-security-row">
                <div className="snekaview-security-field">
                  <label>Password*</label>
                  <input type="password" placeholder="New Password" />
                </div>
                <div className="snekaview-security-field">
                  <label>Confirm Password*</label>
                  <input type="password" placeholder="Confirm Password" />
                </div>
              </div>
              <button className="snekaview-save-btn"><TiTick style={{ marginRight: '6px' }} /> Save</button>
            </>
          )}

          {activeTab === 'address' && (
            <>
              {!viewedAddress ? (
                <>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
                    <button className="snekaview-add-address-btn" onClick={() => openAddressModal()}>
                      + Add Address
                    </button>
                  </div>
                  <table>
                    <thead>
                      <tr>
                        <th>Name</th><th>Email</th><th>Phone</th><th>Address</th><th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {addresses.map((address, index) => (
                        <tr key={index}>
                          <td>{address.name}</td>
                          <td>{address.email}</td>
                          <td>{address.phone}</td>
                          <td>{`${address.address}, ${address.city}, ${address.state} - ${address.zip}`}</td>
                          <td>
                            <span className="snekaview-icon-btn view" onClick={() => setViewedAddress(address)}><Eye size={18} /></span>
                            <span className="snekaview-icon-btn edit" onClick={() => openAddressModal(index)}><Pen size={18} /></span>
                            <span className="snekaview-icon-btn delete" onClick={() => openDeleteModal('address', index)}><Trash2 size={18} /></span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <p className="snekaview-entry-count">Showing {addresses.length} of {addresses.length} entries</p>
                </>
              ) : (
                <div className="snekaview-address-view-card">
                  <div className="snekaview-card-header">
                    <h3>{viewedAddress.name}</h3>
                    <button className="snekaview-back-button" onClick={() => setViewedAddress(null)}>← Back</button>
                  </div>
                  <div className="snekaaddress-details">
                    <p><strong>NAME</strong> : {viewedAddress.name}</p>
                    <p><strong>EMAIL</strong> : {viewedAddress.email}</p>
                    <p><strong>PHONE</strong> : {viewedAddress.phone}</p>
                    <p><strong>ADDRESS</strong> : {viewedAddress.address}</p>
                    <p><strong>CITY</strong> : {viewedAddress.city}</p>
                    <p><strong>STATE</strong> : {viewedAddress.state}</p>
                    <p><strong>ZIP CODE</strong> : {viewedAddress.zip}</p>
                  </div>
                </div>
              )}
            </>
          )}

          {activeTab === 'orders' && (
             <>
              {!viewedOrder ? (
                <>
                  <table>
                    <thead>
                      <tr>
                        <th>Item</th><th>Quantity</th><th>Price</th><th>Order Date</th><th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order, index) => (
                        <tr key={index}>
                          <td>{order.item}</td>
                          <td>{order.quantity}</td>
                          <td>₹{order.price}</td>
                          <td>{order.orderDate}</td>
                          <td>
                            <span className="snekaview-icon-btn view" onClick={() => setViewedOrder(order)}><Eye size={18} /></span>
                            <span className="snekaview-icon-btn edit" onClick={() => openOrderModal(index)}><Pen size={18} /></span>
                            <span className="snekaview-icon-btn delete" onClick={() => openDeleteModal('order', index)}><Trash2 size={18} /></span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                   <p className="snekaview-entry-count">Showing {orders.length} of {orders.length} entries</p>
                </>
              ) : (
                <div className="snekaview-address-view-card">
                  <div className="snekaview-card-header">
                     <h3>{viewedOrder.item}</h3>
                    <button className="snekaview-back-button" onClick={() => setViewedOrder(null)}>← Back</button>
                  </div>
                  <div className="snekaaddress-details">
                    <p><strong>ITEM</strong> : {viewedOrder.item}</p>
                    <p><strong>QUANTITY</strong> : {viewedOrder.quantity}</p>
                    <p><strong>PRICE</strong> : ₹{viewedOrder.price}</p>
                    <p><strong>SHIPPING ADDRESS</strong> : {viewedOrder.shippingAddress}</p>
                    <p><strong>ORDER DATE</strong> : {viewedOrder.orderDate}</p>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {showAddressModal && (
        <div className="snekaview-modal-overlay">
          <div className="snekaview-modal">
            <div className="snekaview-modal-header">
              <h3>{editingAddressIndex !== null ? 'Edit Address' : 'Add Address'}</h3>
              <i onClick={() => setShowAddressModal(false)} style={{ cursor: 'pointer' }}>×</i>
            </div>
            <div className="snekaview-modal-body">
              {['name', 'email', 'phone', 'address', 'state', 'city', 'zip'].map(field => (
                <input
                  key={field}
                  name={field}
                  value={addressForm[field]}
                  onChange={handleAddressChange}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  className={field === 'zip' ? 'full-width' : ''}
                />
              ))}
            </div>
            <div className="snekaview-modal-footer">
              <button className="snekaview-save-btn" onClick={handleAddressSave}><TiTick style={{ marginRight: '6px' }} />Save</button>
              <button className="snekaview-clear-btn" onClick={() => setShowAddressModal(false)}><RxCross2 style={{ marginRight: '6px' }} />Cancel</button>
            </div>
          </div>
        </div>
      )}

      {showOrderModal && (
         <div className="snekaview-modal-overlay">
          <div className="snekaview-modal">
            <div className="snekaview-modal-header">
              <h3>{editingOrderIndex !== null ? 'Edit Order' : 'Add Order'}</h3>
              <i onClick={() => setShowOrderModal(false)} style={{ cursor: 'pointer' }}>×</i>
            </div>
            <div className="snekaview-modal-body">
              {['item', 'quantity', 'price', 'shippingAddress', 'orderDate'].map(field => (
                <input
                  key={field}
                  name={field}
                  value={orderForm[field]}
                  onChange={handleOrderChange}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                />
              ))}
            </div>
            <div className="snekaview-modal-footer">
              <button className="snekaview-save-btn" onClick={handleOrderSave}><TiTick style={{ marginRight: '6px' }} />Save</button>
              <button className="snekaview-clear-btn" onClick={() => setShowOrderModal(false)}><RxCross2 style={{ marginRight: '6px' }} />Cancel</button>
            </div>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="snekaview-modal-overlay">
          <div className="snekaview-modal-box delete-confirmation">
            <div className="snekaview-icon-warning">
              <PiWarningCircleBold size={48} color="#facc15" />
            </div>
            <h3 className="snekaview-modal-title">Are you sure ?</h3>
            <p className="snekaview-modal-subtitle">You will not be able to recover the deleted record!</p>
            <div className="snekaview-modal-footer">
              <button className="snekaview-btn danger" onClick={handleDeleteConfirmed}>Yes, Delete it !</button>
              <button className="snekaview-btn cancel" onClick={() => setShowDeleteModal(false)}>No, Cancel !</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}