import React, { useState } from "react";
import {
  MdSpaceDashboard,
  MdOutlinePointOfSale,
  MdOutlineLocalOffer,
  MdAccountBalance,
  MdBarChart,
} from "react-icons/md";
import { LuListTodo } from "react-icons/lu";
import { FaUser } from "react-icons/fa6";
import {
  RiSettings3Fill,
  RiNotificationBadgeFill,
} from "react-icons/ri";
import "./Sidebar.css";
 
const menu = [
  {
    label: "Dashboard",
    icon: <MdSpaceDashboard />,
    link: "#",
    className: "vkvdashboard-item",
  },
  {
    label: "PRODUCT & STOCK",
    icon: <LuListTodo />,
    sub: ["Products", "Purchase", "Damages", "Stock"],
  },
  {
    label: "POS & ORDERS",
    icon: <MdOutlinePointOfSale />,
    sub: [
      "POS",
      "POS Orders",
      "Online Orders",
      "Return Orders",
      "Returns and Refunds",
    ],
  },
  {
    label: "PROMO",
    icon: <MdOutlineLocalOffer />,
    sub: ["E‑Coupons", "Promotions", "Product Sections"],
  },
  {
    label: "COMMUNICATIONS",
    icon: <RiNotificationBadgeFill />,
    sub: ["Push Notifications", "Subscribers"],
  },
  {
    label: "USERS",
    icon: <FaUser />,
    sub: ["Administrators", "Customers", "Employees"],
  },
  {
    label: "ACCOUNTS",
    icon: <MdAccountBalance />,
    sub: ["Transactions"],
  },
  {
    label: "REPORTS",
    icon: <MdBarChart />,
    sub: ["Sales Report", "Products Report", "Credit Balance Report"],
  },
  {
    label: "SETUP",
    icon: <RiSettings3Fill />,
    sub: ["Settings"],
  },
];
 
export default function Sidebar() {
  const [activeMenu, setActiveMenu] = useState("Dashboard");
 
  const [activeSub, setActiveSub] = useState("");
const [showSearch, setShowSearch] = useState(false);
  const handleMainClick = (label) => {
    setActiveMenu(label);
    setActiveSub("");
  };
 
  const handleSubItemClick = (menuLabel, subLabel) => {
    setActiveMenu(menuLabel); // 👈 update parent menu too
    setActiveSub(subLabel);
  };
const [isSidebarClose, setIsSidebarClose] = useState(false);
  return (
   
    <aside className="vkv-sidebar">
      <div className="vkv-sidebar-content">
        {menu.map((item) => (
          <div key={item.label} className="kv-menu-group">
            <div
              className={`vkv-item vkv-parent ${item.className || ""} ${
                activeMenu === item.label ? "active" : ""
              }`}
              onClick={() => handleMainClick(item.label)}
              style={{ cursor: "pointer", width: "100%" }}
            >
              {item.icon}
              <span>{item.label}</span>
            </div>
 
            {item.sub && (
              <div className="vkv-submenu show">
                {item.sub.map((subItem) => (
                  <a
                    key={subItem}
                    href="#"
                    className={`vkv-subitem ${
                      activeSub === subItem ? "active" : ""
                    }`}
                    onClick={() => handleSubItemClick(item.label, subItem)} // ✅ pass parent label
                  >
                    {subItem}
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </aside>
   
   
  );
}
 