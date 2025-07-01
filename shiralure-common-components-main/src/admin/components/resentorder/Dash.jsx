import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // For URL parameter (id)
import { FiInfo, FiImage } from "react-icons/fi";
import "./Dash.css";

function Dash() {
  const { id } = useParams(); // Get the id from the URL (e.g., /dashboard/1)
  const [activeSection, setActiveSection] = useState("information");
  const [order, setOrder] = useState(null);

  useEffect(() => {
    // Fetch data from orders.json in the public folder
    fetch('/orders.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        // Find the order with the matching id
        const selectedOrder = data.find((item) => item.id === parseInt(id));
        setOrder(selectedOrder || data[0]); // Default to first order if id not found
      })
      .catch((error) => {
        console.error('Error fetching orders.json:', error);
      });
  }, [id]); // Re-run effect when id changes

  const handleInfoClick = () => {
    setActiveSection("information");
  };

  const handleImagesClick = () => {
    setActiveSection("images");
  };

  return (
    <div className="dsdvpdash">
      <div className="dsdvpheader">
        <div className="dsdvpheader-content">
          <h1>Dashboard</h1>
          <div className="dsdvpbreadcrumb">
            <span className="dsdvphome">Home</span> &gt;&gt; Dashboard
          </div>
        </div>
      </div>

      <div className="dsdvpaction-bar">
        <button
          className={`dsdvpaction-button dsdvpinfo-button ${
            activeSection === "information" ? "dsdvpactive" : ""
          }`}
          title="Information"
          onClick={handleInfoClick}
        >
          <FiInfo /> Information
        </button>
        <button
          className={`dsdvpaction-button dsdvpimages-button ${
            activeSection === "images" ? "dsdvpactive" : ""
          }`}
          title="Images"
          onClick={handleImagesClick}
        >
          <FiImage /> Images
        </button>
      </div>

      <div className="dsdvpmain-container">
        {order && (
          <>
            {activeSection === "information" && (
              <div className="dsdvpdashboard-content">
                <div className="dsdvpinfo-header">
  <h2>Information</h2>
</div>
                <div className="dsdvpinfo-table">
  {/* Row 1: Name + Slug */}
  <div className="dsdvpinfo-row">
    <div className="dsdvpinfo-pair">
      <span className="dsdvpinfo-label">Name</span>
      <span className="dsdvpinfo-value">{order.customerName}</span>
    </div>
    <div className="dsdvpinfo-pair">
      <span className="dsdvpinfo-label">Slug</span>
      <span className="dsdvpinfo-value">{order.itemCode}</span>
    </div>
  </div>

  {/* Row 2: Type + Status */}
  <div className="dsdvpinfo-row">
    <div className="dsdvpinfo-pair">
      <span className="dsdvpinfo-label">Type</span>
      <span className="dsdvpinfo-value">Small</span>
    </div>
    <div className="dsdvpinfo-pair">
      <span className="dsdvpinfo-label">Status</span>
      <span className="dsdvpinfo-value dsdvpstatus-active">
        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
      </span>
    </div>
  </div>
</div>

              </div>
            )}

            {activeSection === "images" && (
              <div className="dsdvpdashboard-content">
                <div className="dsdvpimage-section">
  <div className="dsdvpimage-container">
    <img src={order.itemImage} alt={order.itemName} />
  </div>
  <div className="dsdvpimage-info-side">
    <p>Small Size: (360px,224px)</p>
    <p>Big Size: (1126px,400px)</p>
  </div>
</div>

              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Dash;