import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import { FiEye, FiInfo, FiImage } from 'react-icons/fi'; // Removed FiArrowLeft
import { useParams } from "react-router-dom";
import './RecentOrders.scss';

const RecentOrders = () => {
  const { id } = useParams();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [activeSection, setActiveSection] = useState("information");
  const [selectedOrderData, setSelectedOrderData] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('/data/orders.json');
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        const data = await response.json();
        const transformedData = data.map(order => ({
          ...order,
          type: order.type || 'Small',
          description: order.description || 'No description available'
        }));
        setOrders(transformedData);

        if (id) {
          const initialSelectedOrder = transformedData.find((item) => item.id === parseInt(id));
          setSelectedOrderData(initialSelectedOrder || transformedData[0]);
          setSelectedOrderId(parseInt(id));
        } else {
          setSelectedOrderData(transformedData[0]);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching orders.json:', error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, [id]);

  const handleViewDash = (record) => {
    setSelectedOrderId(record.id);
    setSelectedOrderData(record);
  };

  // handleBackToOrders function is removed

  const handleInfoClick = () => {
    setActiveSection("information");
  };

  const handleImagesClick = () => {
    setActiveSection("images");
  };

  const columns = [
    {
      title: 'S.No',
      key: 'serialNumber',
      fixed: 'left',
      width: 130,
      align: 'center',
      render: (_, __, index) => index + 1,
    },
    {
      title: 'Item Details',
      key: 'itemDetails',
      fixed: 'left',
      width: 250,
      render: (record) => (
        <div className="muthu-item-details">
          <img src={record.itemImage} alt={record.itemName} />
          <div className="muthu-text">
            <div className="muthu-item-name">{record.itemName}</div>
            <span className="muthu-item-code">{record.itemCode}</span>
          </div>
        </div>
      ),
    },
    {
      title: 'Customer ID',
      dataIndex: 'customerId',
      key: 'customerId',
      width: 150,
      align: 'center',
      render: (customerId) => (
        <span className="muthu-customer-id">{customerId}</span>
      ),
    },
    {
      title: 'Customer Details',
      key: 'customerDetails',
      width: 250,
      render: (record) => (
        <div className="muthu-customer-details">
          <img src={record.customerImage} alt={record.customerName} />
          <div className="muthu-text">
            <div className="muthu-customer-name">{record.customerName}</div>
            <span className="muthu-customer-email">{record.customerEmail}</span>
          </div>
        </div>
      ),
    },
    {
      title: 'Ordered Date',
      dataIndex: 'orderedDate',
      key: 'orderedDate',
      width: 150,
      align: 'center',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 150,
      align: 'center',
      render: (status) => (
        <span className={`muthu-status muthu-${status.toLowerCase().replace(' ', '-')}`}>
          {status}
        </span>
      ),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      width: 120,
      align: 'right',
    },
    {
      title: 'Action',
      key: 'action',
      width: 100,
      align: 'center',
      render: (_, record) => (
        <button
          className="muthu-view-btn"
          onClick={() => handleViewDash(record)}
        >
          <FiEye />
        </button>
      ),
    },
  ];

  return (
    <div className="muthu-recent-orders-wrapper" style={{ padding: selectedOrderId ? '0px' : '20px' }}>
      {selectedOrderId && selectedOrderData ? (
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
          {selectedOrderData && (
            <>
              {activeSection === "information" && (
                <div className="dsdvpdashboard-content">
                  <div className="dsdvpinfo-header">
                    <h2>Information</h2>
                  </div>
                  <div className="dsdvpinfo-table">
                    <div className="dsdvpinfo-row">
                      <div className="dsdvpinfo-pair">
                        <span className="dsdvpinfo-label">Name</span>
                        <span className="dsdvpinfo-value">{selectedOrderData.customerName}</span>
                      </div>
                      <div className="dsdvpinfo-pair">
                        <span className="dsdvpinfo-label">Slug</span>
                        <span className="dsdvpinfo-value">{selectedOrderData.itemCode}</span>
                      </div>
                    </div>

                    <div className="dsdvpinfo-row">
                      <div className="dsdvpinfo-pair">
                        <span className="dsdvpinfo-label">Type</span>
                        <span className="dsdvpinfo-value">Small</span>
                      </div>
                      <div className="dsdvpinfo-pair">
                        <span className="dsdvpinfo-label">Status</span>
                        <span className="dsdvpinfo-value dsdvpstatus-active">
                          {selectedOrderData.status.charAt(0).toUpperCase() + selectedOrderData.status.slice(1)}
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
                      <img src={selectedOrderData.itemImage} alt={selectedOrderData.itemName} />
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
      ) : (
        <div className="muthu-recent-orders-container">
          <h2 className="muthu-recent-orders-title">Recent Order Details</h2>
          <Table
            loading={loading}
            columns={columns}
            dataSource={orders}
            scroll={{ x: true, y: 400 }}
            rowKey="id"
            pagination={false}
            className="muthu-orders-table"
          />
        </div>
      )}
    </div>
  );
};

export default RecentOrders;