import React from 'react';
import Header1 from './Header1'; // Import the Header component
import Sidebar from './Sidebar'; // Import the Sidebar component
import './Sidebar.css'; // Import the Sidebar styles
import './Header1.css'; // Import the Header styles
 
const AdminLayout = ({ children }) => {
  return (
   
    <div className="vkv-layout"> {/* From Sidebar.css */}
      <Sidebar />
      <div className="vkv-main"> {/* From Sidebar.css */}
        <Header1 /> {/* Your admin-specific Header1 */}
        <div className="vkv-content"> {/* From Sidebar.css */}
          {children} {/* This will be your admin page content */}
        </div>
      </div>
     
    </div>
  );
};
 
export default AdminLayout;