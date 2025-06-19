import React, { useEffect,useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { ImagePlus } from 'lucide-react';
import { Eye, Pen, Trash2, User, Lock, MapPin, FileText } from 'lucide-react';
import './ViewCustomerPage.css';
import { TiTick } from "react-icons/ti";
import { PiWarningCircleBold } from 'react-icons/pi'; 
import { RxCross2 } from "react-icons/rx";


export default function ViewCustomerPage() {
  const { id } = useParams();
  const location = useLocation();
  const customer = location.state?.customer;
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
   useEffect(() => {
    fetch('/or.json')
      .then(res => res.json())
      .then(data => setOrders(data))
      .catch(err => console.error('Failed to load orders.json:', err));
  }, []);

  const [editingAddressIndex, setEditingAddressIndex] = useState(null);
  const [addressForm, setAddressForm] = useState({
    name: '', email: '', phone: '', address: '', state: '', city: '', zip: ''
  });

  const [editingOrderIndex, setEditingOrderIndex] = useState(null);
  const [orderForm, setOrderForm] = useState({
    item: '', quantity: '', price: '', shippingAddress: '', orderDate: ''
  });

  const [addressEntriesToShow, setAddressEntriesToShow] = useState(5);
  const [orderEntriesToShow, setOrderEntriesToShow] = useState(5);
    useEffect(() => {
    fetch('/ad.json')
      .then(res => res.json())
      .then(data => setAddresses(data))
      .catch(err => console.error('Error loading addresses.json:', err));
  }, []);
  

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setProfilePhoto(imageUrl); // Optional preview

    const formData = new FormData();
    formData.append('photo', file);

    try {
      const response = await fetch(`/api/customers/${id}/upload-photo`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload photo');
      }

      const data = await response.json();
      setProfilePhoto(data.imageUrl); // If server returns new URL
    } catch (error) {
      console.error('Photo upload failed:', error);
      alert('Photo upload failed. Please try again.');
    }
  };
  

  // Address modal open
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

  // Save address - add or update locally without server for demo
  const handleAddressSave = () => {
    if (editingAddressIndex !== null) {
      const updated = [...addresses];
      updated[editingAddressIndex] = addressForm;
      setAddresses(updated);
    } else {
      setAddresses([...addresses, addressForm]);
    }
    setShowAddressModal(false);
  };

  // const handleAddressDelete = (index) => {
  //   if (window.confirm('Are you sure you want to delete this address?')) {
  //     const updatedAddresses = addresses.filter((_, i) => i !== index);
  //     setAddresses(updatedAddresses);
  //   }
  // };


  // Order modal open
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

  // Save order - add or update locally without server for demo
  const handleOrderSave = () => {
    if (editingOrderIndex !== null) {
      const updated = [...orders];
      updated[editingOrderIndex] = orderForm;
      setOrders(updated);
    } else {
      setOrders([...orders, orderForm]);
    }
    setShowOrderModal(false);
  };

  // const handleOrderDelete = (index) => {
  //   if (window.confirm('Are you sure you want to delete this order?')) {
  //     const updatedOrders = orders.filter((_, i) => i !== index);
  //     setOrders(updatedOrders);
  //   }
  // };
  const openDeleteModal = (type, index) => {
  setDeleteTarget({ type, index });
  setShowDeleteModal(true);
};
const handleDeleteConfirmed = () => {
  const { type, index } = deleteTarget;

  if (type === 'address') {
    const updated = addresses.filter((_, i) => i !== index);
    setAddresses(updated);
  } else if (type === 'order') {
    const updated = orders.filter((_, i) => i !== index);
    setOrders(updated);
  }

  setShowDeleteModal(false);
  setDeleteTarget({ type: null, index: null });
};
const handleCancelDelete = () => {
  setShowDeleteModal(false);
  setDeleteTarget({ type: null, index: null });
};


  return (
    <div className="snekaview-customer-page">
      {/* Profile Header */}
      <div className="snekawhite-card profile-header-card">
        <div className="snekaheader">
          <img src={profilePhoto} alt={customer?.name} className="snekaprofile-photo" />
        </div>
        <div className="snekaheader-info">
          <h2>{customer?.name}</h2>
          <span className="snekatag">CUSTOMER</span>
          <input
            type="file"
            accept="image/*"
            id="photo-upload"
            style={{ display: 'none' }}
            onChange={handlePhotoUpload}
          />
          <button
            className="snekaupload-btn"
            onClick={() => document.getElementById('photo-upload').click()}
            type="button"
          >
            <ImagePlus size={16} style={{ marginRight: '6px' }} />
            Upload Photo
          </button>
        </div>
      </div>

      {/* Tab Section */}
      <div className="snekawhite-card tab-section-card">
        <div className="snekatabs">
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
                className={`snekatab ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                <Icon size={16} style={{ marginRight: 6 }} />
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            );
          })}
        </div>

        <div className="snekatab-content">
          {/* {activeTab === 'profile' && customer && (
            <>
              <p><strong>Email:</strong> {customer.email}</p>
              <p><strong>Phone:</strong> {customer.phone}</p>
              <p><strong>Status:</strong> <span className={`status ${customer.status?.toLowerCase()}`}>{customer.status}</span></p>
            </>
          )} */}
          {activeTab === 'profile' && customer && (
    <>
      <div className="snekainfo-row">
        <div className="snekainfo-label"><strong>Email</strong></div>
        <div className="snekainfo-value">{customer.email}</div>

        <div className="snekainfo-label"><strong>Phone</strong></div>
        <div className="snekainfo-value">{customer.phone}</div>
      </div>

       <div className="snekainfo-row">
      <div className="snekainfo-label"><strong>Status</strong></div>
      <div className="snekainfo-value">
        <span className={`snekastatus ${customer.status?.toLowerCase()}`}>
          {customer.status?.charAt(0).toUpperCase() + customer.status?.slice(1).toLowerCase()}
        </span>
      </div>
    </div>
    </>
  )}

         
          {activeTab === 'security' && (
  <>
    <div className="snekasecurity-row">
      <div className="snekasecurity-field">
        <label>Password*</label>
        <input type="password" placeholder="New Password" />
      </div>
      <div className="snekasecurity-field">
        <label>Confirm Password*</label>
        <input type="password" placeholder="Confirm Password" />
      </div>
    </div>
    
    <button className="snekasave-btn"><TiTick  style={{ marginRight: '6px' }} />  Save</button>
    
  </>
)}


         
         {activeTab === 'address' && (
  <>
    {!viewedAddress ? (
      <>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
          <button className="snekaadd-address-btn" onClick={() => openAddressModal()}>
            <span className="snekacircle-icon">+</span> Add Address
          </button>
        </div>

        <table className="snekaorders-table">
          <thead>
            <tr>
              <th>Name</th><th>Email</th><th>Phone</th><th>Address</th><th>State</th><th>City</th><th>Zip</th><th>Action</th>
            </tr>
          </thead>
          <tbody>
            {addresses.slice(0, addressEntriesToShow).map((address, index) => (
              <tr key={index}>
                <td>{address.name}</td>
                <td>{address.email}</td>
                <td>{address.phone}</td>
                <td>{address.address}</td>
                <td>{address.state}</td>
                <td>{address.city}</td>
                <td>{address.zip}</td>
                
                <td>
                  <span className="snekaicon-btn view">
                  <Eye 
                    size={18} 
                    onClick={() => setViewedAddress(address)} 
                    // style={{ cursor: 'pointer', marginRight: 6, color: '#e91e63' }} 
                    title="View"
                  />
                  </span>
                  <span className="snekaicon-btn edit">
                  <Pen 
                    size={18} 
                    onClick={() => openAddressModal(index)} 
                    // style={{ cursor: 'pointer', marginRight: 6, color: '#4caf50' }} 
                    title="Edit"
                  />
                  </span>
                  <span className="snekaicon-btn delete">
                  <Trash2 
                    size={18} 
                    // onClick={() => handleAddressDelete(index)} 
                    onClick={() => openDeleteModal('address', index)}
                    // style={{ cursor: 'pointer', color: '#dc3545' }} 
                    title="Delete"
                  />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="snekaentries-count">
          Showing {Math.min(addressEntriesToShow, addresses.length)} of {addresses.length} entries
        </p>
      </>
    ) : (
      <div className="snekaaddress-view-card">
        <div className="snekacard-header">
          <h3>{viewedAddress.name}</h3>
          <button className="snekaback-button" onClick={() => setViewedAddress(null)}>← Back</button>
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
        {/* <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
          <button className="add-address-btn" onClick={() => openOrderModal()}>
            <span className="circle-icon">+</span> Add Order
          </button>
        </div> */}

        <table className="snekaorders-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Shipping Address</th>
              <th>Order Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.slice(0, orderEntriesToShow).map((order, index) => (
              <tr key={index}>
                <td>{order.item}</td>
                <td>{order.quantity}</td>
                <td>{order.price}</td>
                <td>{order.shippingAddress}</td>
                <td>{order.orderDate}</td>
               
                <td>
                  <span className="snekaicon-btn view">
                  <Eye 
                    size={18} 
                    onClick={() => setViewedOrder(order)} 
                    
                    title="View"
                  />
                  </span>
                  <span className="snekaicon-btn edit">
                  <Pen 
                    size={18} 
                    onClick={() => openOrderModal(index)} 
                     
                    title="Edit"
                  />
                  </span>
                  <span className="snekaicon-btn delete">
                  <Trash2 
                    size={18} 
                    // onClick={() => handleOrderDelete(index)} 
                    onClick={() => openDeleteModal('order', index)}
                    title="Delete"
                  />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <p className="snekaentries-count">
          Showing {Math.min(orderEntriesToShow, orders.length)} of {orders.length} entries
        </p>
      </>
    ) : (
      <div className="snekaaddress-view-card">
        <div className="snekacard-header">
          <h3>{viewedOrder.item}</h3>
          <button className="snekaback-button" onClick={() => setViewedOrder(null)}>← Back</button>
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

      {/* Address Modal */}
      {showAddressModal && (
        <div className="snekamodal-overlay">
          <div className="snekamodal">
            <div className="snekamodal-header">
              <h3>{editingAddressIndex !== null ? 'Edit Address' : 'Add Address'}</h3>
              {/* <button onClick={() => setShowAddressModal(false)}> x </button> */}
              <i onClick={() => setShowAddressModal(false)} style={{ cursor: 'pointer' }}>×</i>

            </div>
            <div className="snekamodal-body">
              {['name', 'email', 'phone', 'address', 'state', 'city', 'zip'].map(field => (
                <input
                  key={field}
                  name={field}
                  value={addressForm[field]}
                  onChange={handleAddressChange}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                />
              ))}
            </div>
            <div className="snekamodal-footer">
              <button className="snekasave-btn" onClick={handleAddressSave}><TiTick  style={{ marginRight: '6px' }} />Save</button>
              <button className="snekaclear-btn" onClick={() => setShowAddressModal(false)}><RxCross2 style={{ marginRight: '6px' }} />Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Order Modal */}
      {showOrderModal && (
        <div className="snekamodal-overlay">
          <div className="snekamodal">
            <div className="snekamodal-header">
              <h3>{editingOrderIndex !== null ? 'Edit Order' : 'Add Order'}</h3>
              <i onClick={() => setShowOrderModal(false)} style={{ cursor: 'pointer' }}>✖</i>
            </div>
            <div className="snekamodal-body">
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
            <div className="snekamodal-footer">
              <button className="snekasave-btn" onClick={handleOrderSave}><TiTick  style={{ marginRight: '6px' }} />Save</button>
              <button className="snekaclear-btn" onClick={() => setShowOrderModal(false)}><RxCross2 style={{ marginRight: '6px' }} />Cancel</button>
            </div>
          </div>
        </div>
      )}
      {showDeleteModal && (
  <div className="snekamodal-overlay">
    <div className="snekmodal-box delete-confirmation">
      <div className="snekaicon-warning">
        <PiWarningCircleBold size={48} color="#facc15" />
      </div>
      <h3 className="modal-title">Are you sure ?</h3>
      <p className="modal-subtitle">You will not be able to recover the deleted record!</p>
      <div className="snekamodal-footer">
        <button className="btn danger" onClick={handleDeleteConfirmed}>
          Yes, Delete it !
        </button>
        <button className="btn cancel" onClick={handleCancelDelete}>
          No, Cancel !
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
}
