import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  PackageSearch,
  ShoppingCart,
  ShieldAlert,
  Boxes,
  Store,
  ClipboardList,
  CornerUpLeft,
  Undo2,
  ReceiptText,
  TicketPercent,
  MapPin,
  Box,
  Bell,
  ShieldCheck,
  User,
  Users,
  UserCircle,
  Banknote,
  BarChart,
  FileText,
  Wallet,
  Settings
} from 'lucide-react';

const sections = [
  {
    label: '',
    items: [
      { label: 'Dashboard', icon: <LayoutDashboard size={18} />, path: '/' },
    ],
  },
  {
    label: 'PRODUCT & STOCK',
    items: [
      { label: 'Products', icon: <PackageSearch size={18} />, path: '/products' },
      { label: 'Purchase', icon: <ShoppingCart size={18} />, path: '/purchase' },
      { label: 'Damages', icon: <ShieldAlert size={18} />, path: '/damages' },
      { label: 'Stock', icon: <Boxes size={18} />, path: '/stock' },
    ],
  },
  {
    label: 'POS & ORDERS',
    items: [
      { label: 'POS', icon: <Store size={18} />, path: '/pos' },
      { label: 'POS Orders', icon: <ClipboardList size={18} />, path: '/pos-orders' },
      { label: 'Online Orders', icon: <CornerUpLeft size={18} />, path: '/online-orders' },
      { label: 'Return Orders', icon: <Undo2 size={18} />, path: '/return-orders' },
      { label: 'Return And Refunds', icon: <ReceiptText size={18} />, path: '/return-and-refunds' },
    ],
  },
  {
    label: 'PROMO',
    items: [
      { label: 'Coupons', icon: <TicketPercent size={18} />, path: '/coupons' },
      { label: 'Promotions', icon: <MapPin size={18} />, path: '/promotions' },
      { label: 'Product Sections', icon: <Box size={18} />, path: '/product-sections' },
    ],
  },
  {
    label: 'COMMUNICATIONS',
    items: [
      { label: 'Push Notifications', icon: <Bell size={18} />, path: '/push-notifications' },
      { label: 'Subscribers', icon: <ShieldCheck size={18} />, path: '/subscribers' },
    ],
  },
  {
    label: 'USERS',
    items: [
      { label: 'Administrators', icon: <User size={18} />, path: '/administrators' },
      { label: 'Customers', icon: <Users size={18} />, path: '/customers' },
      { label: 'Employees', icon: <UserCircle size={18} />, path: '/employees' },
    ],
  },
  {
    label: 'ACCOUNTS',
    items: [
      { label: 'Transactions', icon: <Banknote size={18} />, path: '/transactions' },
    ],
  },
  {
    label: 'REPORTS',
    items: [
      { label: 'Sales Report', icon: <BarChart size={18} />, path: '/sales-report' },
      { label: 'Products Report', icon: <FileText size={18} />, path: '/products-report' },
      { label: 'Credit Balance Report', icon: <Wallet size={18} />, path: '/credit-balance-report' },
    ],
  },
  {
    label: 'SETUP',
    items: [
      { label: 'Settings', icon: <Settings size={18} />, path: '/settings' },
    ],
  },
];

export default function Sidebar() {
  const navigate = useNavigate();

  return (
    <aside
      style={{
        width: '260px',
        height: 'calc(100vh - 70px)', // Subtract Header height
        backgroundColor: '#fff',
        borderRight: '1px solid #E5E7EB',
        padding: '24px',
        fontFamily: "'Inter', sans-serif",
        overflowY: 'auto', // Ensure scrolling
        position: 'fixed',
        top: '70px', // Match Header height
        left: 0,
        boxSizing: 'border-box',
      }}
    >
      <style>
        {`
          aside {
            scrollbar-width: none; /* Firefox */
            -ms-overflow-style: none; /* IE and Edge */
          }
          aside::-webkit-scrollbar {
            width: 0; /* Webkit browsers (Chrome, Safari) */
            height: 0;
          }
        `}
      </style>

      {sections.map((section, index) => (
        <div key={index} style={{ marginBottom: '24px' }}>
          {section.label && (
            <p
              style={{
                color: '#9CA3AF',
                fontSize: '12px',
                letterSpacing: '1px',
                marginBottom: '12px',
                fontWeight: '600',
              }}
            >
              {section.label}
            </p>
          )}
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {section.items.map((item, idx) => (
              <li
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                  color: '#4B5563',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = '#F3F4F6')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                onClick={() => navigate(item.path)}
              >
                {item.icon}
                <span style={{ fontSize: '14px' }}>{item.label}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </aside>
  );
}