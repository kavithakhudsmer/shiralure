// Sidebar.jsx
import React from 'react';
import { MdOutlineDashboard } from "react-icons/md";
import { LuListTodo } from "react-icons/lu";
import { GiRotaryPhone } from "react-icons/gi";
import { FaTag } from "react-icons/fa";
import { GoDot } from "react-icons/go";
import './Sidebar.css';

const Sidebar = ({ activeSection, setActiveSection }) => {
  const menuItems = [
    {
      category: 'PRODUCT & STOCK',
      icon: <LuListTodo />,
      items: [
        { name: 'Products', icon: <GoDot /> },
        { name: 'Purchase', icon: <GoDot /> },
        { name: 'Damages', icon: <GoDot /> },
        { name: 'Stock', icon: <GoDot /> }
      ]
    },
    {
      category: 'POS & ORDERS',
      icon: <GiRotaryPhone />,
      items: [
        { name: 'POS', icon: <GoDot /> },
        { name: 'POS Orders', icon: <GoDot /> },
        { name: 'Online Orders', icon: <GoDot /> },
        { name: 'Return Orders', icon: <GoDot /> },
        { name: 'Returns and Refunds', icon: <GoDot /> }
      ]
    },
    {
      category: 'PROMO',
      icon: <FaTag />,
      items: [
        { name: 'E-Coupons', icon: <GoDot /> },
        { name: 'Promotions', icon: <GoDot /> },
        { name: 'Product Sections', icon: <GoDot /> }
      ]
    }
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="dashboard-item">
          <MdOutlineDashboard className="dashboard-icon" />
          <span>Dashboard</span>
        </div>
      </div>

      <div className="sidebar-content">
        {menuItems.map((category, categoryIndex) => (
          <div key={categoryIndex} className="menu-category">
            <div className="category-header">
              <span className="category-icon">{category.icon}</span>
              <span className="category-title">{category.category}</span>
            </div>
            <ul className="menu-items">
              {category.items.map((item, itemIndex) => (
                <li 
                  key={itemIndex} 
                  className={`menu-item ${activeSection === item.name ? 'active' : ''}`}
                  onClick={() => setActiveSection(item.name)}
                >
                  <span className="item-icon">{item.icon}</span>
                  <span className="item-name">{item.name}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;