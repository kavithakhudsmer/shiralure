import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import { FiEye } from 'react-icons/fi';
import './RecentOrders.scss';

const RecentOrders = ({ onShowDash }) => { // Receive onShowDash prop
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

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
        setLoading(false);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleViewDetails = (record) => {
    if (onShowDash) {
      onShowDash(record.id); // Call the function passed from Home with the order ID
    }
  };

  const columns = [
    {
      title: 'S.No',
      key: 'serialNumber',
      // removed fixed: 'left'
      width: 130,
      align: 'center',
      render: (_, __, index) => index + 1,
    },
    {
      title: 'Item Details',
      key: 'itemDetails',
      // removed fixed: 'left'
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
          onClick={() => handleViewDetails(record)}
        >
          <FiEye />
        </button>
      ),
    },
  ];

  return (
    <div className="muthu-recent-orders-wrapper">
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
    </div>
  );
};

export default RecentOrders;