import React, { useState, useEffect } from 'react';
import { FaPhoneAlt, FaMapMarkerAlt, FaPrint, FaUserCircle } from 'react-icons/fa';
import { SlCalender } from "react-icons/sl";
import { MdOutlineClear } from "react-icons/md";
import { BsCheckLg } from "react-icons/bs";
import './OrderDetails.css';

const OrderDetails = ({ order, onBack }) => {
  const [isRejected, setIsRejected] = useState(false);
  const [isAccepted, setIsAccepted] = useState(false);
  const [showReasonBox, setShowReasonBox] = useState(false);
  const [reason, setReason] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [deliveryStatus, setDeliveryStatus] = useState("Pending");


  // Debug: Log order and items whenever order changes
  useEffect(() => {
    console.log("DEBUG: order object:", order);
    if (order && Array.isArray(order.items)) {
      console.log("DEBUG: order items:", order.items);
    } else {
      console.log("DEBUG: No items or items not an array");
    }
  }, [order]);

  useEffect(() => {
    let timer;
    if (showSuccess) {
      timer = setTimeout(() => setShowSuccess(false), 500); 
    }
    return () => clearTimeout(timer);
  }, [showSuccess]);

  if (!order) return null;

  const handleReject = () => {
    setShowReasonBox(true);
  };

  const handleSaveReason = () => {
    if (reason.trim()) {
      setIsRejected(true);
      setShowReasonBox(false);
    }
  };

  const handleAccept = () => {
    setIsAccepted(true);
    setShowSuccess(true);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="sriorder-page">
      <div className="sriheader">
      <h2 className="srititle">Online Orders</h2>
      <h6 className="sribreadcrumb">
        <a href="/" className="sribreadcrumb">Home</a> &gt;&gt; <span>Online Orders</span>
      </h6>
      </div>
      {/* Reason Modal */}
      {showReasonBox && (
        <div className="srireason-modal">
          <div className="srimodal-content">
            <h3>REASON</h3>
            <label>Reason<span className="srirequired">*</span></label>
            <input
              type="text"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Enter rejection reason"
            />
            <div className="srimodal-buttons">
              <button onClick={() => setShowReasonBox(false)}>Close</button>
              <button onClick={handleSaveReason}>Save</button>
            </div>
          </div>
        </div>
      )}

      {/* Success Banner */}
      {showSuccess && (
        <div className="sristatus-banner success">Updated Status Successfully</div>
      )}

      <div className="sriorder-summary">
        <div className="sriorder-header">
  <span className="sriorder-id">Order ID: <b>#{order.orderId}</b></span>
  <span className={`sristatus-badge ${isPaid ? "status-paid" : "status-unpaid"}`}>
    {isPaid ? "Paid" : "Unpaid"}
  </span>
<span className={`sristatus-badge ${deliveryStatus.toLowerCase().replace(/\s/g, '-')}`}>
  {deliveryStatus}
</span>


</div>

        <div className="sriorder-meta">
          <p><SlCalender /> {order.date}</p>
          <p>Payment Type: <b>Cash On Delivery</b></p>
          <p>Order Type: <b>{order.orderType}</b></p>
        </div>

        {!isAccepted && !isRejected ? (
          <div className="sriaction-buttons">
            <button className="btn reject" onClick={handleReject}>
  <MdOutlineClear className="icon1" />Reject
</button>
<button className="btn accept" onClick={handleAccept}>
  <BsCheckLg className="icon1" />Accept
</button>

          </div>
        ) : (
          <div className="sriaction-panel">
            <div className="sritoggle">
              <label>Unpaid</label>
              <label className="sriswitch">
                <input
                  type="checkbox"
                  checked={isPaid}
                  onChange={() => setIsPaid(!isPaid)}
                />
                <span className="slider round"></span>
              </label>
              <label>Paid</label>
            </div>
           <select
  className="sristatus-dropdown"
  value={deliveryStatus}
  onChange={(e) => setDeliveryStatus(e.target.value)}
>
  <option value="Pending">Pending</option>
  <option value="Confirmed">Confirmed</option>
  <option value="On the Way">On the Way</option>
  <option value="Delivered">Delivered</option>
</select>

            <button className="btn print" onClick={handlePrint}>
              <FaPrint /> Print Invoice
            </button>
          </div>
        )}
      </div>

      <div className="sriorder-content">
        <div className="sriorder-section order-items">
          <h4>ORDER DETAILS</h4>
          {Array.isArray(order.items) && order.items.length > 0 ? (
            order.items.map((item, index) => (
              <div className="sriorder-item" key={index}>
                <img src={item.image || "https://via.placeholder.com/40"} alt={item.name} />
                <span className="sriitem-name">{item.name}</span>
                <span className="sriitem-price">₹ {item.price}</span>
              </div>
            ))
          ) : (
            <p>No items available for this order.</p>
          )}
        </div>

        <div className="sriorder-section sriorder-summary-box">
          <ul>
            <li><span>Subtotal</span> <b>₹ 3098.00</b></li>
            <li><span>Tax Fee</span> <b>₹ 0.00</b></li>
            <li><span>Discount</span> <b>₹ 0.00</b></li>
            <li><span>Shipping Charge</span> <b>₹ 40.00</b></li>
            <hr />
            <li className="sritotal"><span>Total</span> <b>₹ 3138.00</b></li>
          </ul>
        </div>

        <div className="sriorder-section address">
          <div className="sriaddress-heading">SHIPPING ADDRESS</div>
          <div className="sriaddress-content">
            <p><FaUserCircle className="sriicon" /><b>{order.customer}</b></p>
            <p><FaPhoneAlt className="sriicon" /> +917264899</p>
            <p><FaMapMarkerAlt className="sriicon" /> 5th North Street., Bagaha.Bihar.India.627426</p>
          </div>
        </div>

        <div className="sriorder-section address">
          <div className="sriaddress-heading">BILLING ADDRESS</div>
          <div className="sriaddress-content">
            <p><FaUserCircle className="sriicon" /><b>{order.customer}</b></p>
            <p><FaPhoneAlt className="sriicon" /> +917264899</p>
            <p><FaMapMarkerAlt className="sriicon" /> 5th North Street., Bagaha.Bihar.India.627426</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
