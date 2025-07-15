import React, { useState, useRef, useEffect } from "react";
import { FiSearch, FiBell, FiUpload, FiLogOut ,  FiMail,
  FiMessageSquare,
  FiCheckSquare,
  FiCalendar,
  FiFolder,
  FiUser} from "react-icons/fi";
import { RiMoonLine, RiShoppingBasketLine } from "react-icons/ri";
import { BiBookmark } from "react-icons/bi";
import "./Header1.css";
import logo from "../assets/logo.png";
import { GiShoppingCart } from "react-icons/gi";
import { BsBellFill } from "react-icons/bs";
import { RiSunLine } from "react-icons/ri";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { MdOutlineFullscreen ,MdOutlineFullscreenExit} from "react-icons/md";
import { PiGreaterThanDuotone } from "react-icons/pi";
 
 
 
 
 
 
export default function Header1({ title = "Returns and Refunds" }) {
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [profileImage, setProfileImage] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showApps, setShowApps] = useState(false);
 
  const searchRef = useRef(null);
  const cartRef = useRef(null);
  const notificationsRef = useRef(null);
  const dropdownRef = useRef(null);
  const fileInputRef = useRef(null);
   const langRef = useRef();
  const appsRef = useRef(null);
const toggleFullscreen = () => {
  if (!isFullscreen) {
    document.documentElement.requestFullscreen?.();
  } else {
    document.exitFullscreen?.();
  }
};
useEffect(() => {
  const handleFullscreenChange = () => {
    setIsFullscreen(!!document.fullscreenElement);
  };
 
  document.addEventListener("fullscreenchange", handleFullscreenChange);
  return () => {
    document.removeEventListener("fullscreenchange", handleFullscreenChange);
  };
}, []);
  // Toggle dark theme
  useEffect(() => {
    document.body.classList.toggle("dark-theme", isDarkMode);
  }, [isDarkMode]);
 
  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) setShowSearch(false);
      if (cartRef.current && !cartRef.current.contains(event.target)) setShowCart(false);
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) setShowNotifications(false);
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) setShowDropdown(false);
      if (langRef.current && !langRef.current.contains(event.target)) setShowLanguageDropdown(false);
      if (appsRef.current && !appsRef.current.contains(event.target)) setShowApps(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
 
  // Load cart data
  useEffect(() => {
    fetch("/data/cart.json")
      .then((res) => (res.ok ? res.json() : Promise.reject("Failed to load cart.json")))
      .then(setCartItems)
      .catch(console.error);
  }, []);
 
  // Load notification data
  useEffect(() => {
    fetch("/data/notifications.json")
      .then((res) => (res.ok ? res.json() : Promise.reject("Failed to load notifications.json")))
      .then(setNotifications)
      .catch(console.error);
  }, []);
 
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };
 
 
  return (
    <>
      <header className="kv-header1">
        <div className="kv-logo">
         <img src={logo} alt="Logo" className="kv-logo-img" />
         
</div>
 
 
 
 <div className="kv-actions">
          {/* 🔍 Search */}
          <div className="vkv-search-wrapper" ref={searchRef}>
  <button
    aria-label="Search"
    className="vkv-search-button"
    onClick={() => setShowSearch(!showSearch)}
  >
    <FiSearch />
  </button>
 
  {showSearch && (
    <input
      type="text"
      className="kv-search-dropdown"
      placeholder="Search..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      autoFocus
    />
  )}
</div>
 
        <button aria-label="Toggle Fullscreen" onClick={toggleFullscreen}>
 
    {isFullscreen ? <MdOutlineFullscreenExit /> : <MdOutlineFullscreen />}
</button>
     
 
 
       <button
  aria-label="Toggle Theme"
  onClick={() => setIsDarkMode((prev) => !prev)}
>
  {isDarkMode ? <RiSunLine /> : <RiMoonLine />}
</button>
 
          {/* 🛒 Cart */}
          <div className="kv-cart-wrapper" ref={cartRef}>
            <button aria-label="Cart" onClick={() => setShowCart(!showCart)}>
              <RiShoppingBasketLine />
            </button>
            {showCart && (
              <div className="kv-cart-modal">
                <button className="kv-cart-close" onClick={() => setShowCart(false)}><IoMdCloseCircleOutline /></button>
                <h4><GiShoppingCart /> Cart Items</h4>
                {cartItems.length === 0 ? (
                  <p className="kv-cart-empty">Your cart is empty.</p>
                ) : (
                  <ul className="kv-cart-list">
                    {cartItems.map((item) => (
                      <li key={item.id}>
                        <strong>{item.name}</strong> x {item.quantity} – ₹{item.price.toFixed(2)}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
 
          {/* 🔔 Notifications */}
          <div className="kv-notifications-wrapper" ref={notificationsRef}>
            <button aria-label="Notifications" onClick={() => setShowNotifications(!showNotifications)}>
              <FiBell />
              {notifications.length > 0 && <span className="kv-notification-count">{notifications.length}</span>}
            </button>
            {showNotifications && (
              <div className="kv-notification-dropdown">
                <div className="kv-notification-title"><BsBellFill /> Notifications</div>
 
                {notifications.length === 0 ? (
                  <p className="kv-cart-empty">No new notifications</p>
                ) : (
                  <ul className="kv-cart-list">
                    {notifications.map((note) => (
                      <li key={note.id}>{note.message}</li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
 
          {/* 📌 Related Apps */}
          <div className="kv-apps-wrapper" ref={appsRef}>
            <button aria-label="Apps" onClick={() => setShowApps(!showApps)}>
              <BiBookmark />
            </button>
          {showApps && (
  <div className="kv-apps-dropdown">
    <div className="kv-apps-header1">Related Apps</div>
    <div className="kv-apps-grid">
      <div className="kv-apps-item email">
        <FiMail style={{ color: "#6366f1" }} />
        <span>Mail Inbox</span>
      </div>
      <div className="kv-apps-item chat">
        <FiMessageSquare style={{ color: "#60a5fa" }} />
        <span>Chat</span>
      </div>
      <div className="kv-apps-item task">
        <FiCheckSquare style={{ color: "#facc15" }} />
        <span>Task</span>
      </div>
      <div className="kv-apps-item calendar">
        <FiCalendar style={{ color: "#f87171" }} />
        <span>Calendar</span>
      </div>
      <div className="kv-apps-item file">
        <FiFolder style={{ color: "#93c5fd" }} />
        <span>FileManager</span>
      </div>
      <div className="kv-apps-item contacts">
        <FiUser style={{ color: "#34d399" }} />
        <span>Contacts</span>
      </div>
    </div>
    <button className="kv-apps-footer"></button>
  </div>
)}
 
          </div>
 
          {/* 👤 Profile Upload & Logout */}
          <div className="kv-profile-wrapper" ref={dropdownRef}>
            <div
              className="kv-profile-round kv-profile-large kv-clickable-avatar"
              onClick={() => setShowDropdown((prev) => !prev)}
              title="Upload Profile Photo"
            >
              <img
                src={profileImage || "/assets/default-avatar.png"}
                alt="Profile"
                className="kv-profile-img"
              />
            </div>
 
            {showDropdown && (
              <div className="kv-profile-dropdown">
                <div
                  className="kv-profile-option"
                  onClick={() => {
                    fileInputRef.current.click();
                    setShowDropdown(false);
                  }}
                >
                  <FiUpload style={{ marginRight: "8px" }} />
                  Upload Profile
                </div>
                <div className="kv-profile-option">
                  <FiLogOut style={{ marginRight: "8px" }} />
                  Logout
                </div>
              </div>
            )}
 
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleImageUpload}
            />
          </div>
        </div>
      </header>
 
     <div className="kv-header-footer">  
       
      </div>
    </>
  );
}