import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import './TopSellingProducts.scss';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';

const TopSellingProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/data/top-selling-products.json'); 
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const columns = [
    {
      title: 'Product',
      key: 'productDetails',
      fixed: 'left',
      width: 250,
      render: (record) => (
        <div className="muthu-product-details">
          <img 
            src={record.image} 
            alt={record.product} 
            onError={(e) => {
              e.target.onerror = null; 
              e.target.src = 'fallback-image-url.jpg';
            }} 
          />
          <div className="muthu-text">
            <div className="muthu-product-name">{record.product}</div>
          </div>
        </div>
      ),
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      width: 150,
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      key: 'stock',
      width: 120,
      render: (status) => (
        <span className={`muthu-status ${status.toLowerCase().replace(/ /g, '-')}`}>
          {status}
        </span>
      ),
    },
    {
      title: 'Sales',
      dataIndex: 'sales',
      key: 'sales',
      width: 120,
      align: 'right',
    },
  ];

  if (loading) {
    return <div className="muthu-top-selling-products-wrapper">Loading...</div>;
  }

  if (error) {
    return <div className="muthu-top-selling-products-wrapper">Error: {error}</div>;
  }

  return (
    <div className="muthu-top-selling-products-wrapper">
      <div className="muthu-top-selling-products-container">
        <div className="muthu-header">
          <h2 className="muthu-title">Top Selling Products</h2>
          <MoreVertOutlinedIcon className="muthu-header-action" />
        </div>
        <div className="muthu-table-wrapper">
          <Table
            columns={columns}
            dataSource={products}
            scroll={{ x: true, y: 400 }}
            rowKey="id"
            pagination={false}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default TopSellingProducts;