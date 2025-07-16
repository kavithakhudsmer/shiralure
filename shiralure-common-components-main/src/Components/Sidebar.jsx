import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
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


// Define a mapping of sub-item labels to their corresponding admin page paths.
// These paths MUST match the exact paths defined in your App.jsx under /admin.
const adminPageRoutes = {
  // Dashboard
  "Dashboard": "/admin", // Assuming Dashboard points to the admin root

  // PRODUCT & STOCK
  "Products": "/admin/products", // This goes to ProductDashboard
  "Purchase": "/admin/Purchase",
  "Damages": "/admin/damage", // Assuming 'Damages' links to the 'damage' page
  "Stock": "/admin/Stocks", // Assuming 'Stock' links to the 'Stocks' page

  // POS & ORDERS
  "POS": "/admin/Pos",
  "POS Orders": "/admin/PosOrder",
  "Online Orders": "/admin/OnlineOrders",
  "Return Orders": "/admin/Returnorder", // Assuming 'Return Orders' links to the 'Returnorder' page
  "Returns and Refunds": "/admin/ReturnPage", // Assuming 'Returns and Refunds' links to the 'ReturnPage'

  // PROMO
  "E-Coupons": "/admin/Coupons", // Note: Adjust casing if necessary based on App.jsx route
  "Promotions": "/admin/Promotion",
  "Product Sections": "/admin/ProductSection",

  // COMMUNICATIONS
  "Push Notifications": "/admin/PushNotification",
  "Subscribers": "/admin/Subscriber",

  // USERS
  "Administrators": "/admin/Administrators",
  "Customers": "/admin/Customers",
  "Employees": "/admin/Employees",

  // ACCOUNTS
  "Transactions": "/admin/Transactions",

  // REPORTS
  "Sales Report": "/admin/SalesReport", // Links to DamageTShirt
  "Products Report": "/admin/ProductReports",
  "Credit Balance Report": "/admin/CreditBalanceReports",

  // SETUP
  "Settings": "/admin/Settings", // This is for the main settings page
  // Add specific settings sub-pages if you want direct links from here
  // e.g., "Return Reasons": "/admin/return-reasons",
  // "Company": "/admin/company",
  // "Site": "/admin/site",
  // ... and so on for all your nested settings routes
};


const menu = [
  {
    label: "Dashboard",
    icon: <MdSpaceDashboard />,
    link: "/admin", // Updated to reflect the actual admin dashboard path
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
    sub: ["E-Coupons", "Promotions", "Product Sections"], // Adjusted E-Coupons for consistency
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
    sub: ["Settings"], // This is the main Settings link
  },
];

export default function Sidebar() {
  const [activeMenu, setActiveMenu] = useState("Dashboard");
  const [activeSub, setActiveSub] = useState("");
  // const [showSearch, setShowSearch] = useState(false); // Unused, can be removed if not needed later

  const handleMainClick = (item) => {
    setActiveMenu(item.label);
    setActiveSub(""); // Reset sub-item selection when main menu is clicked
    if (item.link) {
      // If it's a direct link (like Dashboard), navigate
      // navigate(item.link); // You'd need useNavigate here if not using Link for main items
    }
  };

  const handleSubItemClick = (menuLabel, subLabel) => {
    setActiveMenu(menuLabel); // Update parent menu
    setActiveSub(subLabel);
    // Link component handles navigation, so no manual navigate call here for sub-items
  };

  // const [isSidebarClose, setIsSidebarClose] = useState(false); // Unused, can be removed if not needed later

  return (
    <aside className="vkv-sidebar">
      <div className="vkv-sidebar-content">
        {menu.map((item) => (
          <div key={item.label} className="kv-menu-group">
            {/* For top-level menu items that have a direct link (like Dashboard) */}
            {item.link ? (
              <Link
                to={item.link}
                className={`vkv-item vkv-parent ${item.className || ""} ${
                  activeMenu === item.label ? "active" : ""
                }`}
                onClick={() => handleMainClick(item)}
                style={{ cursor: "pointer", width: "100%", textDecoration: "none", color: "inherit" }}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ) : (
              // For top-level menu items that are just headers for sub-menus
              <div
                className={`vkv-item vkv-parent ${item.className || ""} ${
                  activeMenu === item.label ? "active" : ""
                }`}
                onClick={() => handleMainClick(item)}
                style={{ cursor: "pointer", width: "100%" }}
              >
                {item.icon}
                <span>{item.label}</span>
              </div>
            )}


            {item.sub && (
              <div className="vkv-submenu show"> {/* 'show' class might control visibility via CSS */}
                {item.sub.map((subItem) => (
                  <Link // Use Link component for navigation
                    key={subItem}
                    to={adminPageRoutes[subItem] || "#"} // Get path from map, fallback to '#' if not found
                    className={`vkv-subitem ${
                      activeSub === subItem ? "active" : ""
                    }`}
                    onClick={() => handleSubItemClick(item.label, subItem)}
                    style={{ textDecoration: "none", color: "inherit" }} // Basic styling to remove link underline
                  >
                    {subItem}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </aside>
  );
}