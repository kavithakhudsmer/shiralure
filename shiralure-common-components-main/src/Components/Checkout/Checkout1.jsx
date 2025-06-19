import React, { useState, useEffect } from 'react';
import { Circle, Check, Package, Truck, Clock, RefreshCw } from 'lucide-react';
import '../styles/Checkout1.css';

const OrderConfirmation = ({ orderData }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [orderStatus, setOrderStatus] = useState('received');
  const [estimatedDeliveryDate, setEstimatedDeliveryDate] = useState(null);
  
  // Default order data if not provided as props
  const defaultOrderData = {
    orderId: '49068498',
    product: {
      name: 'POCO M6 Pro 5G (Power Black, 128 GB)',
      specs: '6 GB RAM',
      currentPrice: 14999,
      originalPrice: 20000,
      discount: '25% off',
      image: '../../../src/assets/images/poco.png'
    },
    shipping: {
      address: 'kovipatti',
      cost: 42
    },
    payment: {
      subtotal: 2957,
      total: 2999.00
    },
    status: 'ready_to_ship', // received, processing, ready_to_ship, shipped, delivered
    orderDate: new Date(),
  };

  // Use provided orderData or default
  const order = orderData || defaultOrderData;

  useEffect(() => {
    // Calculate estimated delivery date (5 days from order date)
    const deliveryDate = new Date(order.orderDate);
    deliveryDate.setDate(deliveryDate.getDate() + 5);
    setEstimatedDeliveryDate(deliveryDate);
    
    // Set order status
    setOrderStatus(order.status);
    
    // Simulate order progress for demo purposes
    // In a real app, this would come from API updates
    if (process.env.NODE_ENV === 'development' && !orderData) {
      const statusSequence = ['received', 'processing', 'ready_to_ship', 'shipped', 'delivered'];
      let currentIndex = statusSequence.indexOf(order.status);
      
      const interval = setInterval(() => {
        if (currentIndex < statusSequence.length - 1) {
          currentIndex++;
          setOrderStatus(statusSequence[currentIndex]);
        } else {
          clearInterval(interval);
        }
      }, 5000); // Update every 5 seconds for demo
      
      return () => clearInterval(interval);
    }
  }, [order]);

  const toggleSummary = () => {
    setIsExpanded(!isExpanded);
  };

  // Format date to readable string
  const formatDate = (date) => {
    if (!date) return '';
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  // Determine status for each step
  const getStepStatus = (step) => {
    const statusOrder = ['received', 'processing', 'ready_to_ship', 'shipped', 'delivered'];
    const currentIndex = statusOrder.indexOf(orderStatus);
    const stepIndex = statusOrder.indexOf(step);
    
    if (stepIndex < currentIndex) return 'completed';
    if (stepIndex === currentIndex) return 'active';
    if (stepIndex === currentIndex + 1) return 'pending';
    return 'future';
  };

  return (
    <div className="container bg-info">
      {/* Main heading */}
      <div className="header1">
        <h2>Thank you for your Order</h2>
      </div>
      
      {/* Main content area with two columns */}
      <div className="main-content-checkout">
        {/* Left Column - Order Details */}
        <div className="left-column">
          {/* Success Message */}
          <div className="success-alert">
            <p>We have received your order!</p>
          </div>
          
          {/* Product Card */}
          <div className="product-card-checkout">
            <div className="product-details-checkout">
              <div className="product-image-checkout">
                <img src={order.product.image} alt={order.product.name} />
              </div>
              <div className="product-info-checkout">
                <h3>{order.product.name}</h3>
                <p className="product-specs">{order.product.specs}</p>
                <div className="price-container-checkout">
                  <span className="current-price-checkout">₹{order.product.currentPrice}</span>
                  <span className="original-price-checkout">₹{order.product.originalPrice}</span>
                  <span className="discount-tag-checkout">{order.product.discount}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Order Meta Information */}
          <div className="order-meta">
            <div className="order-number">
              <p>Order #{order.orderId}</p>
            </div>

            <div className="shipping-info">
              <p>Shipping to {order.shipping.address}</p>
              <p><a href="#">Visit My Orders</a> to review or edit details</p>
            </div>

            <div className="shipment-details">
              <h3>Shipment</h3>
              <p>Estimated Delivery: {formatDate(estimatedDeliveryDate)}</p>
            </div>

            {/* Order Summary Section */}
            <div className="summary-section">
              <div className="summary-header" onClick={toggleSummary}>
                <h3>Summary</h3>
                <div className={`caret ${isExpanded ? 'open' : ''}`}></div>
              </div>
              {isExpanded && (
                <div className="summary-details">
                  <div className="summary-row">
                    <span>Subtotal</span>
                    <span>₹{order.payment.subtotal}</span>
                  </div>
                  <div className="summary-row">
                    <span>Shipping</span>
                    <span>₹{order.shipping.cost}</span>
                  </div>
                  <div className="summary-row total-row">
                    <span>Total</span>
                    <span>₹{order.payment.total.toFixed(2)}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

       {/* Right Column - Order Status */}
<div className="right-column">
  <div className="status-timeline">
    {/* Status Step 1 - Order received */}
    <div className="status-step">
      <div className={`status-icon ${getStepStatus('received') === 'completed' ? 'status-completed' : 'status-pending'}`}>
        {getStepStatus('received') === 'completed' ? 
          <Check size={16} /> : 
          <Circle size={16} />}
      </div>
      <div className={`status-line ${getStepStatus('received') === 'completed' ? 'line-completed' : 'line-pending'}`}></div>
      <div className="status-content">
        <div className={`status-title ${getStepStatus('received') === 'completed' ? 'title-completed' : 'title-pending'}`}>Order received</div>
        <div className="status-text">
          Your order has been received in our system and will be processed shortly
        </div>
      </div>
    </div>

    {/* Status Step 2 - Order in progress */}
    <div className="status-step">
      <div className={`status-icon ${getStepStatus('processing') === 'completed' ? 'status-completed' : 'status-pending'}`}>
        <RefreshCw size={16} />
      </div>
      <div className={`status-line ${getStepStatus('processing') === 'completed' ? 'line-completed' : 'line-pending'}`}></div>
      <div className="status-content">
        <div className={`status-title ${getStepStatus('processing') === 'completed' ? 'title-completed' : 'title-pending'}`}>Order in progress</div>
        <div className="status-text">
          Your order is now being processed. Ordered products that are not yet in stock will be delivered via our partners as quickly as possible
        </div>
      </div>
    </div>

    {/* Status Step 3 - Waiting for shipping */}
    <div className="status-step">
      <div className={`status-icon ${getStepStatus('ready_to_ship') === 'completed' ? 'status-completed' : 'status-pending'}`}>
        <Clock size={16} />
      </div>
      <div className={`status-line ${getStepStatus('ready_to_ship') === 'completed' ? 'line-completed' : 'line-pending'}`}></div>
      <div className="status-content">
        <div className={`status-title ${getStepStatus('ready_to_ship') === 'completed' ? 'title-completed' : 'title-pending'}`} >Waiting for shipping</div>
        <div className="status-text">
          The product is now in stock and is being prepared for shipment
        </div>
      </div>
    </div>

    {/* Status Step 4 - Order Shipped */}
    <div className="status-step">
      <div className={`status-icon ${getStepStatus('shipped') === 'completed' ? 'status-completed' : 'status-pending'}`}>
        <Truck size={16} />
      </div>
      <div className={`status-line ${getStepStatus('shipped') === 'completed' ? 'line-completed' : 'line-pending'}`}></div>
      <div className="status-content">
        <div className={`status-title ${getStepStatus('shipped') === 'completed' ? 'title-completed' : 'title-pending'}`}>Order Shipped</div>
        <div className="status-text">
          Your order is already on its way to you. You will receive all details about your delivery via the tracking link
          {orderStatus === 'shipped' && (
            <div className="tracking-info">
              <a href="#" className="tracking-link">Track your package</a>
              <p className="tracking-number">Tracking #: {Math.random().toString(36).substring(2, 10).toUpperCase()}</p>
            </div>
          )}
        </div>
      </div>
    </div>

    {/* Status Step 5 - Order delivered */}
    <div className="status-step">
      <div className={`status-icon ${getStepStatus('delivered') === 'completed' ? 'status-completed' : 'status-pending'}`}>
        <Package size={16} />
      </div>
      <div className="status-content">
        <div className={`status-title ${getStepStatus('delivered') === 'completed' ? 'title-completed' : 'title-pending'}`}>Order delivered</div>
        <div className="status-text">
          Your shipment has been delivered. You can find out all details about the delivery location via the tracking link
          {orderStatus === 'delivered' && (
            <div className="delivery-confirmation">
              <p>Delivered on: {formatDate(new Date())}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
</div>
       
      </div>
    </div>
  );
};

export default OrderConfirmation;