import React from "react";
import './ShippingAddress.css'

export default function ShippingAddress() {
  return (
    <div className="shipping-address-page">
      <h1><img src="/icons/box.png" alt="ox" className="box-pic" />   Shipping Address</h1>
      <form className="shipping-form">
        <div className="input-row">
          <div className="form-group">
            <label>Country<span>*</span></label>
            <select>
              <option>India</option>
              <option>USA</option>
              <option>UK</option>
              <option>Canada</option>
            </select>
          </div>
        </div>

        <div className="input-row">
          <div className="form-group">
            <label>First Name<span>*</span></label>
            <input type="text" placeholder="First Name" required />
          </div>
          <div className="form-group">
            <label>Last Name<span>*</span></label>
            <input type="text" placeholder="Last Name" required />
          </div>
        </div>

        <div className="input-row">
          <div className="form-group full-width">
            <label>Mobile Number<span>*</span></label>
            <input type="text" placeholder="XXXXXXXXXX" required />
          </div>
        </div>

        <div className="form-group full-width">
          <label>Address<span>*</span></label>
          <div className="address-with-button">
            <input type="text" placeholder="Enter address" />
            <button type="button" className="location-btn">Use my current location</button>
          </div>
        </div>

        <div className="input-row">
          <div className="form-group full-width">
            <label>Apartment</label>
            <input type="text" placeholder="Apartment No" />
          </div>
        </div>

        <div className="input-row">
          <div className="form-group full-width">
            <label>Area, Street, Sector, Village</label>
            <input type="text" placeholder="Area Street" />
          </div>
        </div>

        <div className="input-row">
          <div className="form-group full-width">
            <label>Landmark</label>
            <input type="text" placeholder="Landmark" />
          </div>
        </div>

        <div className="input-row">
          <div className="form-group">
            <label>Pincode</label>
            <input type="text" placeholder="XXXXXX" />
          </div>
          <div className="form-group">
            <label>Town/City</label>
            <input type="text" placeholder="XXXXXX" />
          </div>
        </div>

        <div className="form-group full-width">
          <label>State</label>
          <select>
            <option>Tamil Nadu</option>
            <option>Karnataka</option>
            <option>Kerala</option>
            <option>Maharashtra</option>
          </select>
        </div>

        <button className="save-btn" type="submit">Save Address</button>
      </form>
    </div>
  )
}
