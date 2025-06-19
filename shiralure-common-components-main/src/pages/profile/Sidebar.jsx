import React from "react";
import { Link } from "react-router-dom"; 
import "./Sidebar.css";

function Sidebar({ isOpen, setIsOpen }) {
  return (
    <aside className={`sidebar ${isOpen ? "open" : ""}`}>
      <button className="close-btn" onClick={() => setIsOpen(false)}>×</button>
      <div className="profile-header">
      <img src="/icons/profile.jpg" alt="profile" className="profile-pic" />
      <h3>Sarah Miller</h3>
      </div>
      <ul className="sidebar-options">
        <li className="active">
          <Link to="/Profile" onClick={() => setIsOpen(false)}>
            <img src="/icons/user.png" alt="profile" className="profile-pic" /> Account
          </Link>
        </li>
        <li>
          <Link to="/Profile/ChangePassword" onClick={() => setIsOpen(false)}>
            <img src="/icons/padlock.png" alt="password" className="password-pic" />
            Change Password
          </Link>
        </li>
        <li>
          <Link to="/Profile/ShippingAddress" onClick={() => setIsOpen(false)}>
            <img src="/icons/location.png" alt="location" className="location-pic" /> 
            Shipping Address
          </Link>
        </li>
        <li>
          <Link to="/Profile/MyOrders" onClick={() => setIsOpen(false)}>
            <img src="/icons/order.png" alt="order" className="order-pic" /> 
            My Orders
          </Link>
        </li>
        <li>
          <Link to="/Profile/Notification" onClick={() => setIsOpen(false)}>
            <img src="/icons/notification.png" alt="notification" className="notification-pic" /> 
            Notification
          </Link>
        </li>
        <li>
          <img src="/icons/delete.png" alt="delete" className="delete-pic" /> Delete Account
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
