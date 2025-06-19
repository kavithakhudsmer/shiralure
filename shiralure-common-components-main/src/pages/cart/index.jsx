import React from 'react';
import Poco from "../../assets/poco.jpg"
import Shirt from "../../assets/shirt.png"
import PDrive from "../../assets/pdrive.jpg"
import './styles.css';

const CartPage = () => {
  // Sample cart items data
  const cartItems = [
    {
      id: 1,
      image: Poco, // Update with your actual path
      name: "POCO M6 Pro 5G (Power Black, 128 GB)",
      details: "6 GB RAM",
      currentPrice: 19999,
      originalPrice: 20000,
      discount: "68% Off",
      offersAvailable: 2,
      deliveryDate: "Fri Mar 28",
      deliveryFee: "Free"
    },
    {
      id: 2,
      image: Shirt, // Update with your actual path
      name: "Try This Men Checkered Casual Green Shirt",
      details: "Size: M",
      currentPrice: 158,
      originalPrice: 499,
      discount: "78% Off",
      offersAvailable: 2,
      deliveryDate: "Sat Feb 28",
      deliveryFee: "Free"
    },
    {
      id: 3,
      image: PDrive, // Update with your actual path
      name: "HP v220 128 GB Pen Drive",
      details: "Silver",
      currentPrice: 600,
      originalPrice: 1200,
      discount: "68% Off",
      offersAvailable: 2,
      deliveryDate: "Wed Jan 02",
      deliveryFee: "Free"
    }
  ];

  return (
    <div className="cart-container">
      <div className="cart-delivery-section">
        <span>Deliver to: XXXXXXXXX</span>
        <button className="change-address-btn">Change address</button>
      </div>
      
      <div className="cart-content-cart">
        <div className="cart-itemscart">
          {cartItems.map((item) => (
            <div className="cart-itemcart" key={item.id}>
              <div className="item-imagecart">
                <img src={item.image} alt={item.name} />
              </div>
              
              <div className="item-details-cart">
                <h3>{item.name}</h3>
                <p>{item.details}</p>
                
                <div className="price-section-cart">
                  <span className="current-price-cart">₹{item.currentPrice}</span>
                  <span className="original-price-cart">₹{item.originalPrice}</span>
                  <span className="offer-tag-cart">{item.discount} {item.offersAvailable} offers available</span>
                </div>
                
                <p className="delivery-info-cart">Delivery by {item.deliveryDate} | {item.deliveryFee}</p>
                
                <div className="item-actions-cart">
                  <div className="quantity-controls-cart">
                    <button className="quantity-btn-cart">-</button>
                    <input type="number" value="1" className="quantity-input-cart" readOnly />
                    <button className="quantity-btn-cart">+</button>
                  </div>
                  <button className="save-later-btn">SAVE FOR LATER</button>
                  <button className="remove-btn">REMOVE</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="price-details-cart">
          <h2>PRICE DETAILS</h2>
          
          <div className="price-row-cart">
            <span>Price (12 items)</span>
            <span>50,000</span>
          </div>
          
          <div className="price-row-cart">
            <span>Discount</span>
            <span className="discount-cart">-₹16,059</span>
          </div>
          
          <div className="price-row-cart">
            <span>Bye more & save more</span>
            <span>-₹60</span>
          </div>
          
          <div className="price-row-cart">
            <span>Coupons for you</span>
            <span>-₹20</span>
          </div>
          
          <div className="price-row-cart">
            <span>Delivery Charges</span>
            <span className="free">Free</span>
          </div>
          
          <div className="price-row-cart">
            <span>Secured Packaging Fee</span>
            <span>₹58</span>
          </div>
          
          <div className="price-row-cart">
            <span>Protect Promise Fee</span>
            <span>₹9</span>
          </div>
          
          <div className="price-row-cart total-cart">
            <span>Total Amount</span>
            <span>₹34,639</span>
          </div>
          
          <div className="savings-message-cart">
            You will save ₹16,044 on this order
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;