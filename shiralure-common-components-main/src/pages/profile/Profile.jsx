import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { Link, Outlet } from "react-router-dom";
import { MdDoubleArrow } from "react-icons/md";

const Profile = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="profile-layout">
      <div className="mobile-header">
         <Link to="/Profile">
            <img src="/icons/profile.jpg" alt="profile"className="profile-image" />
          </Link>
          <MdDoubleArrow width={50} className="menu-btn" onClick={() => setIsSidebarOpen(!isSidebarOpen)}/>
      </div>
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <div className="profile-content">
        <Outlet />
      </div>
    </div>
  );
};

export default Profile;
