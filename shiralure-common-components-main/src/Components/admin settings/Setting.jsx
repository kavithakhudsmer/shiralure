// Setting.jsx
import React, { useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import {
  FaBuilding, FaGlobe, FaEnvelope, FaMapMarkerAlt, FaShippingFast, FaLock,
  FaBell, FaExclamationTriangle, FaFacebookF, FaCookieBite, FaChartBar,
  FaPaintBrush, FaSlidersH, FaMoneyBill, FaList, FaTags, FaCogs,
  FaUndo, FaUsers, FaStore, FaGift, FaBalanceScale, FaReceipt,
  FaFileAlt, FaUserShield, FaLanguage, FaSms, FaCreditCard, FaKey
} from 'react-icons/fa';

const settingsMenu = [
  'Company', 'Site', 'Mail', 'Location Setup', 'Shipping Setup', 'OTP', 'Notification',
  'Notification Alert', 'Social Media', 'Cookies', 'Analytics', 'Theme', 'Sliders',
  'Currencies', 'Product Categories', 'Product Brands', 'Product Attributes',
  'Return Reasons', 'Suppliers', 'Outlets', 'Benefits', 'Units', 'Taxes', 'Pages',
  'Role & Permissions', 'Languages', 'SMS gateway', 'Payment gateway', 'License',
];

const iconMap = {
  'Company': <FaBuilding />,
  'Site': <FaGlobe />,
  'Mail': <FaEnvelope />,
  'Location Setup': <FaMapMarkerAlt />,
  'Shipping Setup': <FaShippingFast />,
  'OTP': <FaLock />,
  'Notification': <FaBell />,
  'Notification Alert': <FaExclamationTriangle />,
  'Social Media': <FaFacebookF />,
  'Cookies': <FaCookieBite />,
  'Analytics': <FaChartBar />,
  'Theme': <FaPaintBrush />,
  'Sliders': <FaSlidersH />,
  'Currencies': <FaMoneyBill />,
  'Product Categories': <FaList />,
  'Product Brands': <FaTags />,
  'Product Attributes': <FaCogs />,
  'Return Reasons': <FaUndo />,
  'Suppliers': <FaUsers />,
  'Outlets': <FaStore />,
  'Benefits': <FaGift />,
  'Units': <FaBalanceScale />,
  'Taxes': <FaReceipt />,
  'Pages': <FaFileAlt />,
  'Role & Permissions': <FaUserShield />,
  'Languages': <FaLanguage />,
  'SMS gateway': <FaSms />,
  'Payment gateway': <FaCreditCard />,
  'License': <FaKey />,
};

export default function Setting() {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState('');

  return (
    <div
      style={{
        ...styles.mainPanel,
        height: 'calc(100vh - 70px)', // Keep the height the same as per your request
        overflowY: 'auto', // Keep this if you want mainPanel to scroll
        scrollbarWidth: 'none', /* Firefox */
        msOverflowStyle: 'none', /* IE and Edge */
      }}
      className="main-scroll-area"
    >
      <div style={styles.headerRow}>
        <div style={styles.settingsHeader}>Settings</div>
        <div style={styles.settingsBreadcrumb}>
          <span>Home</span>
          <span style={{ margin: '0 5px' }}> &gt;&gt; </span>
          <span style={styles.settingsBreadcrumbActive}>Settings</span>
        </div>
      </div>

      <div style={styles.settingsContent}>
        <div
          style={{
            ...styles.settingsMenu,
            overflowY: 'auto',
            scrollbarWidth: 'none', /* Firefox */
            msOverflowStyle: 'none', /* IE and Edge */
          }}
        >
          <ul style={styles.settingsMenuUl}>
            {settingsMenu.map((item) => (
              <li
                key={item}
                onClick={() => {
                  setActiveItem(item);
                  let path = item.toLowerCase().replace(/\s+/g, '-');
                  if (item === 'Role & Permissions') {
                      path = 'role-&-permissions';
                  }
                  navigate(`/admin/Settings/${path}`);
                }}
                className={`settings-menu-li${item === activeItem ? ' active' : ''}`}
                style={{
                  ...styles.settingsMenuLi,
                  ...(item === activeItem ? styles.settingsMenuLiActive : {}),
                }}
              >
                <span style={styles.icon}>{iconMap[item]}</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div
          style={{
            ...styles.settingsChildContent,
            overflowY: 'auto',
            scrollbarWidth: 'none', /* Firefox */
            msOverflowStyle: 'none', /* IE and Edge */
          }}
        >
          <Outlet />
        </div>
      </div>

      <style>
        {`
          .main-scroll-area::-webkit-scrollbar,
          .settings-menu::-webkit-scrollbar,
          .settings-child-content::-webkit-scrollbar {
            width: 0; /* Webkit browsers */
            height: 0;
          }

          .settings-menu-li:hover:not(.active) {
            background: #f5f5f5;
            color: #222;
          }

          @media (max-width: 768px) {
            .settings-content {
              flex-direction: column;
              margin: 16px;
              gap: 16px;
            }
            .settings-menu {
              width: 100%;
              max-height: 300px;
              overflow-y: auto;
            }
            .settings-child-content {
              width: 100%;
            }
            .header-row {
              padding: 16px;
            }
            .settings-header {
              font-size: 18px;
            }
            .settings-breadcrumb {
              font-size: 13px;
            }
          }

          @media (max-width: 480px) {
            .header-row {
              padding: 12px;
              flex-direction: column;
              align-items: flex-start;
              gap: 8px;
            }
            .settings-header {
              font-size: 16px;
            }
            .settings-breadcrumb {
              font-size: 12px;
            }
            .settings-menu-li {
              padding: 8px 16px;
              font-size: 14px;
            }
            .icon {
              font-size: 14px;
              min-width: 18px;
              margin-right: 10px;
            }
          }
        `}
      </style>
    </div>
  );
}

const styles = {
  mainPanel: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    minHeight: 0,
    background: '#f5f5f5',
    height: 'calc(100vh - 70px)', // Keeping the height calculation as per your request
    paddingBottom: '24px', // Added padding to increase the background size at the bottom
  },
  headerRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '24px 32px 0 32px',
    flexWrap: 'wrap',
  },
  settingsHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    letterSpacing: 1,
    color: '#222',
  },
  settingsBreadcrumb: {
    display: 'flex',
    alignItems: 'center',
    fontSize: 15,
    color: '#8b8b8b',
  },
  settingsBreadcrumbActive: {
    color: '#3f51b5',
    fontWeight: 'bold',
    marginLeft: 6,
  },
  settingsContent: {
    display: 'flex',
    margin: '16px 32px',
    flexWrap: 'nowrap',
    gap: '24px',
    flex: 1,
    minHeight: 0,
  },
  settingsMenu: {
    width: 260,
    background: '#fff',
    borderRadius: 8,
    boxShadow: '0 1px 4px #eaeaea',
    padding: 0,
    fontFamily: 'Segoe UI, sans-serif',
  },
  settingsMenuUl: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  settingsMenuLi: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px 24px',
    fontSize: 15,
    color: '#444',
    borderBottom: '1px solid #eee',
    cursor: 'pointer',
    borderRadius: 0,
    background: 'transparent',
    transition: 'background 0.15s, color 0.15s',
    userSelect: 'none',
  },
  settingsMenuLiActive: {
    background: '#fceaea',
    color: '#d64545',
    fontWeight: 600,
    borderRadius: 0,
  },
  icon: {
    marginRight: 12,
    fontSize: 16,
    minWidth: 20,
    color: 'inherit',
  },
  settingsChildContent: {
    flex: 1,
    background: '#f5f5f5',
    overflowY: 'auto',
  },
};