import React from "react";
import { useNavigate } from "react-router-dom";
import SL from "../assets/images/SL.png";

const SearchIcon = () => (
  <svg width="22" height="22" fill="none" stroke="black" strokeWidth="2" viewBox="0 0 24 24">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const MoonIcon = () => (
  <svg width="22" height="22" fill="none" stroke="black" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
  </svg>
);

const BagIcon = () => (
  <svg width="22" height="22" fill="none" stroke="black" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M6 2l1 7h10l1-7" />
    <rect x="2" y="9" width="20" height="13" rx="2" />
  </svg>
);

const BellIcon = () => (
  <svg width="22" height="22" fill="none" stroke="black" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M18 8a6 6 0 00-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 01-3.46 0" />
  </svg>
);

const BookmarkIcon = () => (
  <svg width="22" height="22" fill="none" stroke="black" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
  </svg>
);

const Header = () => {
  const navigate = useNavigate();

  const handleSearchClick = () => {
    alert("Open Search Modal");
  };

  const toggleTheme = () => {
    document.body.classList.toggle("dark-mode");
  };

  return (
    <header style={styles.header}>
      <div style={styles.logoContainer}>
        <img src={SL} alt="ShiraLure Logo" style={styles.logo} />
      </div>

      <div style={styles.iconGroup}>
        <div onClick={handleSearchClick} style={styles.iconButton}>
          <SearchIcon />
        </div>
        <div onClick={toggleTheme} style={styles.iconButton}>
          <MoonIcon />
        </div>
        <div onClick={() => navigate("/orders")} style={styles.iconButton}>
          <BagIcon />
        </div>
        <div onClick={() => alert("Show Notifications Panel")} style={styles.iconButton}>
          <BellIcon />
        </div>
        <div onClick={() => navigate("/bookmarks")} style={styles.iconButton}>
          <BookmarkIcon />
        </div>
        <div onClick={() => navigate("/admin/profile")} style={styles.avatar}></div>
      </div>

      <style>
        {`
          @media (max-width: 768px) {
            header {
              padding: 0 10px;
              min-height: 60px;
            }
            .logo-container {
              margin-left: 10px;
            }
            .logo {
              height: 60px;
            }
            .icon-group {
              gap: 15px;
              margin-right: 10px;
            }
            .icon-button {
              width: 32px;
              height: 32px;
            }
            .icon-button svg {
              width: 18px;
              height: 18px;
            }
            .avatar {
              width: 38px;
              height: 38px;
            }
          }

          @media (max-width: 480px) {
            header {
              flex-direction: column;
              align-items: flex-start;
              padding: 10px;
              min-height: auto;
            }
            .logo-container {
              margin-left: 0;
              margin-bottom: 10px;
            }
            .icon-group {
              flex-wrap: wrap;
              gap: 10px;
              margin-right: 0;
              width: 100%;
              justify-content: space-between;
            }
          }
        `}
      </style>
    </header>
  );
};

const styles = {
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    background: "#fff",
    padding: "0",
    borderBottom: "2px solid #f5f5f5",
    minHeight: "70px",
    width: "100%",
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 1000,
  },
  logoContainer: {
    display: "flex",
    alignItems: "center",
    marginLeft: "20px",
  },
  logo: {
    height: "80px",
    objectFit: "contain",
    marginBottom: "0",
  },
  iconGroup: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    marginRight: "20px",
  },
  iconButton: {
    width: "38px",
    height: "38px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    background: "#ececec",
    cursor: "pointer",
  },
  avatar: {
    width: "44px",
    height: "44px",
    borderRadius: "50%",
    background: "#e0e0e0",
    marginLeft: "8px",
    cursor: "pointer",
  },
};

export default Header;