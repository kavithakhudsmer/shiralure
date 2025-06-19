import React from 'react';
import './upcomingproduct.scss';
import ViewHeadlineOutlinedIcon from '@mui/icons-material/ViewHeadlineOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';

const products = [
  {
    id: 1,
    name: "Smart Phone",
    category: "Mobiles",
    price: 1835,
    date: "01 Apr,2025",
    img: "https://m.media-amazon.com/images/I/71xb2xkN5qL._AC_UF1000,1000_QL80_.jpg"
  },
  {
    id: 2,
    name: "White Headphones",
    category: "Music",
    price: 2415,
    date: "01 Apr,2025",
    img: "https://m.media-amazon.com/images/I/61CGHv6kmWL._AC_UF1000,1000_QL80_.jpg"
  },
  {
    id: 3,
    name: "Stop Watch",
    category: "Electronics",
    price: 2415,
    date: "01 Apr,2025",
    img: "https://m.media-amazon.com/images/I/61g+McQpg7L._AC_UF1000,1000_QL80_.jpg"
  },
  {
    id: 4,
    name: "Kikon Camera",
    category: "Electronics",
    price: 2415,
    date: "01 Apr,2025",
    img: "https://m.media-amazon.com/images/I/51JwcRWiefL._AC_UY327_FMwebp_QL65_.jpg"
  },
  {
    id: 5,
    name: "Kids shoes",
    category: "Clothing",
    price: 2415,
    date: "01 Apr,2025",
    img: "https://m.media-amazon.com/images/I/713G8fax-4L._SY695_.jpg"
  }
];

const socialData = [
  { name: "Facebook", value: 700 },
  { name: "Instagram", value: 900 },
  { name: "Dribble", value: 1000 },
  { name: "Twitter", value: 1100 },
  { name: "Chrome", value: 1300 },
  { name: "Pinterest", value: 1500 },
];

const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
};

const UpcomingProducts = () => {
  return (
    <div className='muthu-upcoming-products'>
      <div className="muthu-product-list">
        <div className="muthu-section-header">
          <h3>Upcoming Products</h3>
          <div className="muthu-icon-container">
            <ViewHeadlineOutlinedIcon className="muthu-icon" />
          </div>
        </div>
        {products.map(product => (
          <div className="muthu-product-row" key={product.id}>
            <div className="muthu-product-info">
              <img src={product.img} alt={product.name} className="muthu-product-image" />
              <div className="muthu-product-details">
                <span className="muthu-name">{product.name}</span>
                <span className="muthu-category">{product.category}</span>
              </div>
            </div>
            <div className="muthu-product-price">
              {formatCurrency(product.price)}
              <div className="muthu-product-date">
                <AccessTimeOutlinedIcon className="muthu-time-icon" />
                {product.date}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="muthu-socialvisitors">
        <div className="muthu-section-header">
          <h3>Social Visitors</h3>
          <select className="muthu-time-select">
            <option>This week</option>
            <option>This month</option>
            <option>This year</option>
          </select>
        </div>
        <div className="muthu-chart-container">
          {socialData.map((item, idx) => (
            <div className="muthu-chart-item" key={idx}>
              <div className="muthu-bar-label">{item.name}</div>
              <div className="muthu-bar-container">
                <div 
                  className="muthu-progress-bar" 
                  style={{ width: `${(item.value / 1500) * 100}%` }}
                ></div>
              </div>
              
            </div>
          ))}
          <div className="muthu-x-axis-marks">
            <span>0</span>
            <span>300</span>
            <span>600</span>
            <span>900</span>
            <span>1200</span>
            <span>1500</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpcomingProducts;
