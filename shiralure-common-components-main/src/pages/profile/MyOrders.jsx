import React from 'react';
import './MyOrders.css';
import { useNavigate } from 'react-router-dom';

const MyOrders = () => {
  const navigate = useNavigate();

  const renderProgressBar = (status) => (
    <div className="progress-tracker">
      <div className="progress-bar">
        <div className="step">
          <div className={`step-dot ${status.ordered.completed ? 'completed' : ''}`}>✓</div>
          <div className="step-info">
            <div>Order Confirmed</div>
            <div className="step-date">{status.ordered.date}</div>
          </div>
        </div>
        <div className="step">
          <div className={`step-dot ${status.shipped.completed ? 'completed' : ''}`}>✓</div>
          <div className="step-info">
            <div>Shipped</div>
            <div className="step-date">{status.shipped.date}</div>
          </div>
        </div>
        <div className="step">
          <div className={`step-dot ${status.delivery.completed ? 'completed' : ''}`}>✓</div>
          <div className="step-info">
            <div>{status.delivery.completed ? 'Delivered' : 'Delivery Pending'}</div>
            <div className="step-date">{status.delivery.date}</div>
          </div>
        </div>
      </div>
    </div>
  );
  

  return (
    <div className="my-orders-page">
      <div className="search-bar">
        <input type="text" placeholder="Search your order here" />
        <button><i className="fa fa-search"></i> Search</button>
      </div>
      <h1><i className="fa fa-shopping-cart"></i><img src="/icons/order.png" alt="order" className="order-pic" />My Orders</h1>
      <div>
        <h3>Items Ordered & Delivery Details</h3>
      </div>
      {/* Shipment 1 */}
      <div className="shipment">
        <h4>Shipment 1</h4>
        {renderProgressBar({
          ordered: { date: 'Mon 10, March', completed: true },
          shipped: { date: 'Wed 14, March', completed: true },
          delivery: { date: '', completed: false }
        })}

        <div className="order-card">
          <img src="/icons/shirt1.jpg" alt="Product" />
          <div className="details">
            <p>Women Boxy Fit Casual Shirt</p>
            <p>Size: M | Qty: 1</p>
            <strong>₹2957</strong>
            <span className="status in-progress">In Progress</span>
            <p className="arrival">Arriving by <strong>Fri 16, March</strong></p>
            <button className="cancel-btn">Cancel</button>
          </div>
        </div>

        <div className="order-card">
          <img src="/icons/shirt2.jpg" alt="Product" />
          <div className="details">
            <p>Women Boxy Fit Casual Shirt</p>
            <p>Size: M | Qty: 1</p>
            <strong>₹2957</strong>
            <span className="status in-progress">In Progress</span>
            <p className="arrival">Arriving by <strong>Fri 16, March</strong></p>
            <button className="cancel-btn">Cancel</button>
          </div>
        </div>
      </div>

      {/* Shipment 2 */}
      <div className="shipment">
        <h4>Shipment 2</h4>
        {renderProgressBar({
          ordered: { date: 'Mon 1, March', completed: true },
          shipped: { date: 'Wed 4, March', completed: true },
          delivery: { date: 'Fri 6, March', completed: true }
        })}

        <div className="order-card">
          <img src="/icons/chair.jpg" alt="Product" />
          <div className="details">
            <p>A simple yet elegant wooden chair</p>
            <p>Qty: 1</p>
            <strong>₹6957</strong>
            <span className="status delivered">Delivered</span>
            <p className="arrival">Arrived by <strong>Fri 6, March</strong></p>
            <button className="rate-btn">⭐ Rate & Review</button>
            <div className="actions">
              <button className="return-btn" onClick={() => navigate('/ReturnOrder')}>Return</button>
              <button className="exchange-btn" onClick={() => navigate('/ExchangeOrder')}>Exchange</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
