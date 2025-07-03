import React from "react";
import {
  MdSpaceDashboard,
  MdInventory2,
  MdOutlinePointOfSale,
  MdOutlineLocalOffer,
  MdOutlineNotificationsNone,
  MdPeopleOutline,
  MdAccountBalance,
  MdBarChart,
  MdSettings,
} from "react-icons/md";

import "./Sidebar.css";

const menu = [
  {
    label: "Dashboard",
    icon: <MdSpaceDashboard />,
    link: "#",
  },
  {
    label: "PRODUCT & STOCK",
    icon: <MdInventory2 />,
    sub: ["Products", "Purchase", "Damages", "Stock"],
  },
  {
    label: "POS & ORDERS",
    icon: <MdOutlinePointOfSale />,
    sub: ["POS", "POS Orders", "Online Orders", "Return Orders", "Returns and Refunds"],
  },
  {
    label: "PROMO",
    icon: <MdOutlineLocalOffer />,
    sub: ["E‑Coupons", "Promotions", "Product Sections"],
  },
  {
    label: "COMMUNICATIONS",
    icon: <MdOutlineNotificationsNone />,
    sub: ["Push Notifications", "Subscribers"],
  },
  {
    label: "USERS",
    icon: <MdPeopleOutline />,
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
    icon: <MdSettings />,
    sub: ["Settings"],
  },
];

export default function Sidebar() {
  return (
    <aside className="kv-sidebar">
      <div className="kv-sidebar-content">
        {menu.map((item) => (
          <div key={item.label} className="kv-menu-group">
            <div className="kv-item kv-parent">
              {item.icon}
              <span>{item.label}</span>
            </div>

            {item.sub && (
              <div className="kv-submenu show">
                {item.sub.map((subItem) => (
                  <a key={subItem} href="#" className="kv-subitem">
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
