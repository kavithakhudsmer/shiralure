import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ReturnDetails.css';
import { TbMoneybag } from "react-icons/tb";
import { RiFilePaper2Line } from "react-icons/ri";
import { FaExclamation } from "react-icons/fa";
import { BiPackage } from "react-icons/bi";
import { FaPhoneFlip } from "react-icons/fa6";
import { IoCloseSharp } from 'react-icons/io5';
function ReturnDetails() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/returnDetails.json')
      .then(res => res.json())
      .then(json => {
        const found = json.find(item => item.orderId === orderId);
        setData(found || null);
      });
  }, [orderId]);

  if (!data) return <p>Loading...</p>;

  return (
    <div className="vkreturn-wrapper">
      {/* Header */}
    <div className="vkcard vkheader-card">
  <div className="vkreturn-header">
    <h2>Returns Details</h2>
    <span className="vkbadge returned">Returned</span>
  </div>
  <p className="vktimestamp">{data.timestamp}</p>
</div>



      {/* Info Grid */}
      <div className="vkgrid-3">
        <div className="vkcard">
          <h4>Customer Information</h4>
          <p><strong>Name:</strong> {data.customer.name}</p>
          <p><strong>Email:</strong> {data.customer.email}</p>
          <p><strong>Phone:</strong> {data.customer.phone}</p>
        </div>
        <div className="vkcard">
          <h4>Order Information</h4>
          <p><strong>Order ID:</strong> {data.orderId}</p>
          <p><strong>Items:</strong> {data.orderInfo.items} (Qty: {data.orderInfo.quantity})</p>
        </div>
        <div className="vkcard">
          <h4>Return Details</h4>
          <p><strong>Amount:</strong> ${data.returnDetails.amount}</p>
          <p><strong>Date:</strong> {data.timestamp}</p>
          <p><strong>Reason:</strong> {data.returnDetails.reason}</p>
        </div>
      </div>

     <div className="vkcard vkrefund-header-card">
  <div className="kvreturn-header">
    <h3>Refunds Details</h3>
    <span className="kvbadge refunded">Refunded</span>
  </div>
  <p className="kvtimestamp">{data.timestamp}</p>
</div>


      <div className="vkgrid-3">
        <div className="vkcard">
         <h4><RiFilePaper2Line className="vkicon" /> Order Information</h4>
          <p><strong>Order ID:</strong> {data.orderId}</p>
          <p><strong>Purchase Date:</strong> {data.refundDetails.purchaseDate}</p>
          <p><strong>Request Date:</strong> {data.refundDetails.requestDate}</p>
          <p><strong>Processed Date:</strong> {data.refundDetails.processedDate}</p>
        </div>
        <div className="vkcard">
          <h4><TbMoneybag className="vkicon2" /> Refund Status</h4>
          <p><strong>Refunded Amount:</strong> ${data.refundDetails.refundedAmount}</p>
          <p><strong>Refunded To:</strong> {data.refundDetails.refundedTo}</p>
          <p><strong>Transaction ID:</strong> {data.refundDetails.transactionId}</p>
        </div>
        <div className="vkcard">
          <h4><FaExclamation className="vkicon3" /> Reason for Refund</h4>
          <p><strong>Issue:</strong> {data.returnDetails.reason}</p>
          <p><strong>Notes:</strong> {data.refundDetails.notes}</p>
        </div>
      </div>

      {/* Reminder */}
      <div className="vkcard reminder">
        <h4><BiPackage style={{ marginRight: '6px' }} />  Refund Policy Reminder</h4>
        <p>Refunds may take <strong>5–7 business days</strong> to reflect in your account.</p>
        <p>If you don’t see the amount credited, please contact your bank.</p>
      </div>

      {/* Footer */}
      <div className="vkfooter">
        <p><FaPhoneFlip />Need Help? <a href="#">Contact Customer Support</a></p>
        <button className="close-btn" onClick={() => navigate(-1)}><IoCloseSharp />Close </button>
      </div>
    </div>
  );
}

export default ReturnDetails;
