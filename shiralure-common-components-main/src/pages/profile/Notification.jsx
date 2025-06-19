import React, { useState } from 'react';
import './Notification.css';

const Notification = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      iconClass: "cart-icon",
      title: 'Almost Gone!📝',
      message: 'Still thinking it over? Items in your cart are almost gone!',
      time: 'Today, 15 min ago',
      read: false
    },
    {
      id: 2,
      iconClass: "package-icon", 
      title: 'Shipped & On The Way!📦',
      message: 'Your order #18273 has been shipped! Track your package → Track',
      time: 'Today, 10:35 pm',
      read: false
    },
    {
      id: 3,
      iconClass: "discount-icon",
      title: 'New Discounts Just For You🔥',
      message: '🔥 Flash Deal Frenzy! Only 2 hours left — up to 40% off!',
      time: 'Today, 12 pm',
      read: false
    },
    {
      id: 4,
      iconClass: "delivered-icon",
      title: 'Delivered with Care!📦',
      message: 'We hope it made your day and you love it. Let us know how we did!',
      time: 'Yesterday, 8:26 am',
      read: false
    },
    {
      id: 5,
      iconClass: "stock-icon",
      title: 'Back in Stock 🌱',
      message: '🏬 They\'re Here Again! The sneakers you loved are back — don\'t miss out!',
      time: '29/03/2025, 9:30 AM',
      read: false
    }
  ]);

  const [allRead, setAllRead] = useState(false);

  const markAllAsRead = () => {
    const updatedNotifications = notifications.map(notification => ({
      ...notification,
      read: true
    }));
    setNotifications(updatedNotifications);
    setAllRead(true);
  };

  const refreshNotifications = () => {
    // This would typically fetch new notifications from an API
    console.log("Refreshing notifications");
  };

  const dismissNotification = (id) => {
    const updatedNotifications = notifications.filter(notification => notification.id !== id);
    setNotifications(updatedNotifications);
  };

  return (
    <div className="notification-page">
      <div className="notification-header">
        <div className="title-section">
          <div className="bell-icon"></div>
          <h1> Notification</h1>
        </div>
        <div className="action-buttons">
          <button className="refresh-btn" onClick={refreshNotifications}>
            <div className="refresh-icon"></div>
            <span>Refresh</span>
          </button>
          <div className="mark-read-container">
            <input 
              type="checkbox" 
              id="markAllRead" 
              checked={allRead}
              onChange={markAllAsRead}
            />
            <label htmlFor="markAllRead">Mark all as read</label>
          </div>
        </div>
      </div>

      <div className="notification-list">
        {notifications.map(notification => (
          <div key={notification.id} className={`notification-item ${notification.read ? 'read' : ''}`}>
            <div className="notification-content">
              <div className={`notification-icon-container ${notification.iconClass}`}>
                {/* Icon background and styling will be handled in CSS */}
              </div>
              <div className="notification-text">
                <h3 className="notification-title">{notification.title}</h3>
                <p className="notification-message">{notification.message}</p>
              </div>
            </div>
            <div className="notification-right">
              <span className="notification-time">{notification.time}</span>
              <button 
                className="dismiss-btn" 
                onClick={() => dismissNotification(notification.id)}
              >
                <div className="close-icon"></div>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notification;