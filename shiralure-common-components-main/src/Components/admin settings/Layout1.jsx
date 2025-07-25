import React from 'react';
import { Outlet } from 'react-router-dom';

import Sidebar from '../Sidebar';
import Header1 from '../Header1';

const Layout1 = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header1 />
      <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
        <Sidebar />
       
        <main
          style={{
            flex: 1,
            marginTop: '24px', // Changed from 20px to 24px as requested
            background: '#f5f5f5',
            overflowY: 'auto',
          }}
          className="main-content"
        >
          <Outlet />
        </main>
      </div>

      <style>
        {`
          @media (max-width: 768px) {
            .main-content {
              margin-left: 0 !important; // Override margin when Sidebar is hidden
            }
          }
        `}
      </style>
    </div>
  );
};

export default Layout1;