// SettingsHeader.jsx
import React from 'react';
import './SHeader.css';
import { PiNutBold } from "react-icons/pi";
import { PiCookieBold } from "react-icons/pi";
import { VscSymbolColor } from "react-icons/vsc";
import { PiSlideshowBold } from "react-icons/pi";
import { BsCashStack } from "react-icons/bs";
import { BsShop } from "react-icons/bs";
import { LuMedal } from "react-icons/lu";
import { RxLoop } from "react-icons/rx";
import { RiBankFill } from "react-icons/ri";


const SettingsHeader = ({ activeTab, setActiveTab }) => {
  const settingsItems = [
    { name: 'Social Media', icon:<PiNutBold/> },
    { name: 'Cookies', icon:<PiCookieBold/> },
    { name: 'Analytics', icon: '📊' },
    { name: 'Theme', icon:<VscSymbolColor/> },
    { name: 'Sliders', icon:<PiSlideshowBold/> },
    { name: 'Currencies', icon: <BsCashStack/> },
    { name: 'Product Categories', icon: '📂' },
    { name: 'Product Brands', icon: '🏷️' },
    { name: 'Product Attributes', icon: '⚙️' },
    { name: 'Return Reasons', icon: '↩️' },
    { name: 'Suppliers', icon: <RxLoop/> },
    { name: 'Outlets', icon: <BsShop/> },
    { name: 'Benefits', icon: <LuMedal/> },
    { name: 'Units', icon: '📏' },
    { name: 'Taxes', icon: <RiBankFill/> },
    { name: 'Pages', icon: '📄' }
  ];

  return (
    <div className="settings-navigation">
      {settingsItems.map((item, index) => (
        <div 
          key={index}
          className={`settings-nav-item ${activeTab === item.name ? 'active' : ''}`}
          onClick={() => setActiveTab(item.name)}
        >
          <span className="nav-icon">{item.icon}</span>
          <span className="nav-text">{item.name}</span>
        </div>
      ))}
    </div>
  );
};

export default SettingsHeader;