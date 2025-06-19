import React, { useState } from "react";

const order = {
  image: "https://pplx-res.cloudinary.com/image/upload/v1744784453/user_uploads/JjvegGxwybdNjoN/arrived-too-late.jpg",
  name: "Women Boxy Fit Casual Shirt",
  size: "M",
  qty: 1,
  price: 2957,
  deliveredOn: "March 30, 2025",
};

const ExchangeOrder = () => {
  const [reason, setReason] = useState("");
  const [subReason, setSubReason] = useState("");
  const [details, setDetails] = useState("");
  const [images, setImages] = useState([]);
  const [exchangeItem, setExchangeItem] = useState("");
const [exchangeType, setExchangeType] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!reason || !subReason) {
      alert("Please select both reason and sub-reason for exchange.");
      return;
    }
    if (!exchangeItem) {
      alert("Please indicate whether you'd like to exchange this item.");
      return;
    }
    alert("Exchange request submitted!");
    
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files.map(file => ({
      file,
      url: URL.createObjectURL(file)
    })));
  };

  const removeImage = (idx) => {
    setImages(images.filter((_, i) => i !== idx));
  };

  const renderSubReasons = () => {
    const subReasonOptions = {
      "Shipping & Packaging issues": [
        "Item arrived too late",
        "Item was improperly packaged",
      ],
      "Technical & Functionality Issues": [
        "Item doesn't work as expected",
        "Missing instructions & installation issues",
      ],
      "Customer Preference": [
        "Found a better alternative",
        "No longer needed or wanted",
        "Accidently ordered multiple times",
      ],
      "Size & Fit Issues": [
        "Too big",
        "Too small",
        "Didn't fit as expected",
      ],
      "Product Related Issues": [
        "Received damaged or defective item",
        "Item not as described or pictured",
        "Received the wrong item",
        "Item is missing parts or accessories",
      ],
      Others: ["Other"],
    };

    if (!reason || !subReasonOptions[reason]) return null;

    return (
      <div className="sub-reasons">
        {subReasonOptions[reason].map((item) => (
          <label key={item}>
            <input
              type="radio"
              name="subReason"
              value={item}
              checked={subReason === item}
              onChange={() => setSubReason(item)}
            />
            {item}
          </label>
        ))}
      </div>
    );
  };

  return (
    <div className="exchange-pag">
      {/* <div className="header">
        <h2>SHIRALURE</h2>
      </div> */}
      <div className="main-scrollable">
        <div className="main">
          <form className="exchange-form" onSubmit={handleSubmit}>
            <h2 style={{ textAlign: "center", paddingBottom: "5px", color: "#d32f2f" }}>Exchange Your Order!</h2>

            <label className="form-label">
              Please select a reason for your exchange and provide details.
            </label>
            <select
              value={reason}
              onChange={(e) => {
                setReason(e.target.value);
                setSubReason("");
              }}
              className="form-select"
            >
              <option>Select a reason</option>
              <option>Shipping & Packaging issues</option>
              <option>Technical & Functionality Issues</option>
              <option>Customer Preference</option>
              <option>Size & Fit Issues</option>
              <option>Product Related Issues</option>
              <option>Others</option>
            </select>
            {renderSubReasons()}
{subReason && (
  <>
    <label className="form-label">Would you like to exchange this item?</label>
    <div className="radio-group">
      <label>
        <input
          type="radio"
          name="exchangeItem"
          value="yes"
          checked={exchangeItem === "yes"}
          onChange={() => setExchangeItem("yes")}
        />
        Yes
      </label> &nbsp; 
      <label>
        <input
          type="radio"
          name="exchangeItem"
          value="no"
          checked={exchangeItem === "no"}
          onChange={() => setExchangeItem("no")}
        />
        No
      </label>
    </div>


    {exchangeItem === "yes" && (
      <>
      
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="exchangeType"
              value="same"
              checked={exchangeType === "same"}
              onChange={() => setExchangeType("same")}
            />
            Exchange for the same item (new replacement)
          </label>
          <br></br>
          <label>
            <input
              type="radio"
              name="exchangeType"
              value="different"
              checked={exchangeType === "different"}
              onChange={() => setExchangeType("different")}
            />
            Exchange for a different model
          </label>
        </div>
      </>
    )}
  </>
)}


         
            <div className="image-upload-section">
              <label className="image-upload-label">
                <span className="camera-icon" role="img" aria-label="camera">📷</span>
                <span className="image-upload-instructions">
                  To assist you better, please upload clear photos showing the damage or defect.<br />
                  Make sure to include close-up shots and overall product views for faster processing.
                </span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="image-upload-input"
                  onChange={handleImageChange}
                />
              </label>
              <div className="image-preview-list">
                {images.map((img, idx) => (
                  <div className="image-preview" key={idx}>
                    <img src={img.url} alt={`upload-${idx}`} />
                    <button type="button" className="remove-image-btn" onClick={() => removeImage(idx)}>✕</button>
                  </div>
                ))}
              </div>
            </div>

            <textarea
              placeholder="Enter additional detail..."
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              className="form-textarea"
            />

            <div className="exchange-policy">
              <strong>Exchange Policy:</strong>
              <ul>
                <li>
                  Exchanges must be requested within <strong>7 days</strong> of
                  delivery.
                </li>
                <li>Items should be in original condition and packaging.</li>
                <li>Refunds will be processed after inspection.</li>
              </ul>
            </div>

            <button type="submit" className="submit-btn">
              Confirm Exchange
            </button>
            <div className="support-alert">
              <span role="img" aria-label="help">
                ⚠️
              </span>{" "}
              Need help? Contact our support team before canceling.
            </div>
          </form>

          <div className="order-summary">
            <h4>Order Summary</h4>
            <div className="order-info">
              <img src={order.image} alt={order.name} />
              <div>
                <div className="order-name">{order.name}</div>
                <div className="order-details">
                  Size: {order.size} | Qty: {order.qty}
                </div>
                <div className="order-price">₹{order.price}</div>
              </div>
            </div>
            <div className="order-delivered">
              <strong>Delivered on:</strong> {order.deliveredOn}
            </div>
          </div>
        </div>
      </div>
      {/* <footer className="footer">
        <div className="footer-content">
          <div>
            <h5>Support</h5>
            <div>Cancellation & Refund</div>
            <div>Shipping & Delivery</div>
            <div>Grievance Redressal Mechanism</div>
          </div>
          <div>
            <h5>Legal</h5>
            <div>About Us</div>
            <div>Contact Us</div>
            <div>Cookies Policy</div>
          </div>
          <div>
            <h5>Contact</h5>
            <div>India</div>
            <div>Support@shiralure.com</div>
            <div>7845337261</div>
            <div style={{ marginTop: 8 }}>
              <span style={{ marginRight: 8 }}>🌐</span>
              <span style={{ marginRight: 8 }}>📷</span>
              <span style={{ marginRight: 8 }}>📘</span>
              <span>🔗</span>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          © 2025. All Rights Reserved — ShiraLure
        </div>
      </footer> */}
    </div>
  );
};

export default ExchangeOrder;

