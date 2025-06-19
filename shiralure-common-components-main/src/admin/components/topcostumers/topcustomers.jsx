import React from 'react';
import "./topcustomers.scss";
import ViewHeadlineOutlinedIcon from '@mui/icons-material/ViewHeadlineOutlined';

const customers = [
  { id: 1, name: "John Smith", purchases: 15, value: 1250, avatar: "https://randomuser.me/api/portraits/men/1.jpg" },
  { id: 2, name: "Sarah Johnson", purchases: 12, value: 980, avatar: "https://randomuser.me/api/portraits/women/1.jpg" },
  { id: 3, name: "Michael Brown", purchases: 8, value: 750, avatar: "https://randomuser.me/api/portraits/men/2.jpg" },
  { id: 4, name: "Emily Davis", purchases: 6, value: 620, avatar: "https://randomuser.me/api/portraits/women/2.jpg" },
  { id: 5, name: "Robert Wilson", purchases: 5, value: 550, avatar: "https://randomuser.me/api/portraits/men/3.jpg" }
];

const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
};

const TopCustomer = ({ darkMode }) => {
  return (
    <div className={`muthu-topcustomer ${darkMode ? 'muthu-dark-mode' : ''}`}>
      <div className="muthu-customer-list">
        <div className="muthu-section-header">
          <h3>Top Customers</h3>
          <div className="muthu-icon-container">
            <ViewHeadlineOutlinedIcon className="muthu-icon" />
          </div>
        </div>
        {customers.map(customer => (
          <div className="muthu-customer-row" key={customer.id}>
            <div className="muthu-customer-info">
              <img src={customer.avatar} alt={customer.name} className="muthu-avatar" />
              <div className="muthu-customer-details">
                <span className="muthu-name">{customer.name}</span>
                <span className="muthu-purchases">{customer.purchases} Purchases</span>
              </div>
            </div>
            <div className="muthu-sale-value">
              {formatCurrency(customer.value)}
            </div>
          </div>
        ))}
      </div>
      
      <div className="muthu-sales-value">
        <div className="muthu-section-header">
          <h3>Sale Value</h3>
          <div className="muthu-icon-container">
            <ViewHeadlineOutlinedIcon className="muthu-icon" />
          </div>
        </div>
        <div className="muthu-chart-section">
          <div className="muthu-donut-chart">
            <div className="muthu-chart-container">
              <div className="muthu-chart-progress"></div>
              <div className="muthu-middle-circle"></div>
              <div className="muthu-chart-center">75%</div>
            </div>
          </div>
        </div>
        
        <div className="muthu-divider-line"></div>
        
        <div className="muthu-sales-metrics">
          <div className="muthu-metric-box muthu-left-box">
            <div className="muthu-metric-row">
              <span className="muthu-metric-name">Sale Items</span>
              <span className="muthu-metric-value">567</span>
              <span className="muthu-trend-indicator muthu-up">
                <span className="muthu-arrow">↑</span> 0.23%
              </span>
            </div>
          </div>
          
          <div className="muthu-metric-box muthu-right-box">
            <div className="muthu-metric-row">
              <span className="muthu-metric-name">Sale Revenue</span>
              <span className="muthu-metric-value">$11,197</span>
              <span className="muthu-trend-indicator muthu-up">
                <span className="muthu-arrow">↑</span> 0.15%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopCustomer;