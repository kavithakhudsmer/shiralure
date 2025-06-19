// File: components/Account.jsx
import React from "react";
import "./Account.css";

function Account() {
  return (
<section className="account-page">
  <div className="account-section">
    <h2>
      <img src="/icons/user1.png" alt="user" className="user-pic" /> Account
    </h2>
    <button className="edit-btn">Edit Account</button>
    <form className="account-form">
      <div className="input-group">
        <input type="text" placeholder="First Name" />
        <input type="text" placeholder="Last Name" />
      </div>
      <input type="email" placeholder="Email" />
      <input type="text" placeholder="Mobile Number" />

      <div className="gender">
        <label><input type="radio" name="gender" /> Male</label>
        <label><input type="radio" name="gender" /> Female</label>
      </div>

      <h3>Address</h3>
      <button className="location-btn">Use my current location</button>
      <input type="text" placeholder="Apartment, House no etc..." />
      <input type="text" placeholder="Area, Street, Sector, Village" />
      <input type="text" placeholder="Landmark" />

      <div className="input-group">
        <input type="text" placeholder="Pincode" />
        <input type="text" placeholder="Town/City" />
      </div>

      <input type="text" placeholder="State" />
    </form>
  </div>
</section>

  );
}

export default Account;