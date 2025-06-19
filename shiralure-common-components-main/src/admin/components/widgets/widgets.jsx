// widgets.jsx
import React from 'react'
import "./widgets.scss"
import RequestQuoteOutlinedIcon from '@mui/icons-material/RequestQuoteOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";

const formatMoney = (amount) => {
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const Widgets = ({type, amount, diff}) => {
    let data;

    switch(type){
        case "revenue":
            data = {
                title: "Total Revenue",
                isMoney: true,
                link: "in last week",
                icon: (
                    <RequestQuoteOutlinedIcon className="muthu-icon" style={{ color: 'rgb(90, 102, 242)' }}/>
                ),
                color: 'rgb(90, 102, 242)',
                trendIcon: <FaArrowTrendUp />
            };
            break;
        case "sales":
            data = {
                title: "Total Sales",
                isMoney: true,
                link: "in last week",
                icon: (
                    <ReceiptLongOutlinedIcon className="muthu-icon" style={{ color: 'rgb(33, 133, 255)' }}/>
                ),
                color: 'rgb(33, 133, 255)',
                trendIcon: <FaArrowTrendUp />
            };
            break;
        case "stocks":
            data = {
                title: "Stock Value",
                isMoney: true,
                link: "in last week",
                icon: (
                    <ShoppingBagOutlinedIcon className="muthu-icon" style={{ color: 'rgb(235, 181, 19)' }}/>
                ),
                color: 'rgb(235, 181, 19)',
                trendIcon: <FaArrowTrendDown />
            };
            break;
        case "expenses":
            data = {
                title: "Total Expenses",
                isMoney: true,
                link: "in last week",
                icon: (
                    <MonetizationOnOutlinedIcon className="muthu-icon" style={{ color: 'rgb(33, 196, 93)' }}/>
                ),
                color: 'rgb(33, 196, 93)',
                trendIcon: <FaArrowTrendUp />
            };
            break;
        default:
            break;
    }

    const formattedAmount = data.isMoney ? formatMoney(amount) : amount;

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
                    <span className='muthu-counter'>{data.isMoney && "$"} {formattedAmount}</span>
                    <span className='muthu-link'>{data.link}</span>
                </div>
            </div>
            <div className="muthu-right">
                <div className="muthu-trend" 
                     style={{ 
                         backgroundColor: `${data.color.replace(')', ', 0.1)')}`,
                         color: data.color // Added to match icon color
                     }}>
                    {data.trendIcon}
                    <span>{diff}%</span>
                </div>
            </div>
        </div>
    )
}

export default Widgets;