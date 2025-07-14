// widgets.jsx
import React from 'react';
import "./widgets.scss";
import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";

const Widgets = ({ type, amount, diff, extraInfo }) => {
  let data;

  switch (type) {
    case "visitors":
      data = {
        title: "Today's Visitors",
        isMoney: false,
        link: extraInfo || "from yesterday",
        icon: (
          <PeopleOutlineOutlinedIcon className="muthu-icon" style={{ color: 'rgb(90, 102, 242)' }} />
        ),
        color: 'rgb(90, 102, 242)',
        trendIcon: diff >= 0 ? <FaArrowTrendUp /> : <FaArrowTrendDown />
      };
      break;
    case "stockItems":
      data = {
        title: "Stock Items",
        isMoney: false,
        link: extraInfo || "total inventory",
        icon: (
          <Inventory2OutlinedIcon className="muthu-icon" style={{ color: 'rgb(33, 133, 255)' }} />
        ),
        color: 'rgb(33, 133, 255)',
        trendIcon: diff >= 0 ? <FaArrowTrendUp /> : <FaArrowTrendDown />
      };
      break;
    case "orders":
      data = {
        title: "Orders Today",
        isMoney: false,
        link: extraInfo || "pending & completed",
        icon: (
          <ShoppingCartOutlinedIcon className="muthu-icon" style={{ color: 'rgb(235, 181, 19)' }} />
        ),
        color: 'rgb(235, 181, 19)',
        trendIcon: diff >= 0 ? <FaArrowTrendUp /> : <FaArrowTrendDown />
      };
      break;
    case "deliveries":
      data = {
        title: "Deliveries",
        isMoney: false,
        link: extraInfo || "status overview",
        icon: (
          <LocalShippingOutlinedIcon className="muthu-icon" style={{ color: 'rgb(33, 196, 93)' }} />
        ),
        color: 'rgb(33, 196, 93)',
        trendIcon: diff >= 0 ? <FaArrowTrendUp /> : <FaArrowTrendDown />
      };
      break;
    default:
      data = {
        title: "Unknown",
        isMoney: false,
        link: "",
        icon: null,
        color: '#ccc',
        trendIcon: null
      };
      break;
  }

  const formattedAmount = amount;

  return (
    <div className='muthu-widget'>
      <div className="muthu-left">
        <div className="muthu-icon-container">
          <div className="muthu-icon-wrapper" style={{
            backgroundColor: `${data.color.replace(')', ', 0.1)')}`
          }}>
            {data.icon}
          </div>
          <span className='muthu-title'>{data.title}</span>
        </div>
        <div className="muthu-info-container">
          <span className='muthu-counter'>{formattedAmount}</span>
          <span className='muthu-link'>{data.link}</span>
        </div>
      </div>
      <div className="muthu-right">
        {data.trendIcon && (
          <div className="muthu-trend"
            style={{
              backgroundColor: diff < 0
                ? 'rgba(255, 0, 0, 0.1)'
                : `${data.color.replace(')', ', 0.1)')}`,
              color: diff < 0 ? 'red' : data.color
            }}>
            {data.trendIcon}
            <span>{Math.abs(diff)}%</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Widgets;
