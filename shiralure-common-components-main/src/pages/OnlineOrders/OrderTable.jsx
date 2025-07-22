import React, { useState, useEffect } from 'react';
import OrderDetails from './OrderDetails';
import {
  FaPrint,
  FaFileExcel,
  FaShareSquare,
} from 'react-icons/fa';
import { MdArrowDropDown } from 'react-icons/md';
import { PiSliders } from 'react-icons/pi';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { IoMdSearch } from 'react-icons/io';
import { MdOutlineClear } from 'react-icons/md';
import { FiEye } from 'react-icons/fi';
import { RxCross2 } from 'react-icons/rx';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import './OrderTable.css';

const OrderTable = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [orderIdFilter, setOrderIdFilter] = useState('');
  const [customerFilter, setCustomerFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [numRecords, setNumRecords] = useState(10); // Default records per page
  const [showFilter, setShowFilter] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5173/Data.json')
      .then((response) => response.json())
      .then((data) => {
        setOrders(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  const filteredData = orders.filter((item) =>
    item.orderId.includes(orderIdFilter) &&
    item.customer.toLowerCase().includes(customerFilter.toLowerCase()) &&
    (dateFilter === '' || item.date === dateFilter) &&
    (statusFilter === '' || item.status.toLowerCase() === statusFilter.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / numRecords);
  const startIdx = (currentPage - 1) * numRecords;
  const displayedData = filteredData.slice(startIdx, startIdx + numRecords);

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
  };

  const handleBack = () => {
    setSelectedOrder(null);
  };

  const handleSearch = () => {
    setCurrentPage(1); // Reset to first page on search
    console.log({ orderIdFilter, customerFilter, dateFilter, statusFilter });
    // Add API call logic here if needed
  };

  const handleClear = () => {
    setOrderIdFilter('');
    setCustomerFilter('');
    setDateFilter('');
    setStatusFilter('');
    setCurrentPage(1);
  };

  const toggleFilter = () => {
    setShowFilter((prev) => !prev);
    setShowShareOptions(false);
    setShowDropdown(false);
  };

  const toggleShareOptions = () => {
    setShowShareOptions((prev) => !prev);
    setShowFilter(false);
    setShowDropdown(false);
  };

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
    setShowFilter(false);
    setShowShareOptions(false);
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Orders');
    XLSX.writeFile(workbook, 'Orders.xlsx');
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text('Order Table', 20, 10);
    autoTable(doc, {
      head: [['Order ID', 'Order Type', 'Customer', 'Amount', 'Date', 'Status']],
      body: filteredData.map((item) => [
        item.orderId,
        item.orderType,
        item.customer,
        item.amount.toFixed(2),
        item.date,
        item.status,
      ]),
      startY: 15,
    });
    doc.save('Orders.pdf');
  };

  if (loading) {
    return <p style={{ padding: '20px', textAlign: 'center' }}>Loading orders table...</p>;
  }

  if (selectedOrder) {
    return (
      <div className="sriorder-details-wrapper">
        <button className="sriback-btn" onClick={handleBack}>
          <RxCross2 />
        </button>
        <OrderDetails order={selectedOrder} />
      </div>
    );
  }

  return (
    <>
      <div className="sriorder-page">
        <div className="sriheader">
          <h2 className="srititle">Online Orders</h2>
          <h6 className="sribreadcrumb">
            <a href="/admin" className="sribreadcrumb">Home</a> &gt;&gt;  <span>Online Orders</span>
          </h6>
        </div>
        <div className="sriorder-box-wrapper">
          {/* Top Controls */}
          <div className="sritop-buttons">
            <div className="sriicon-button" title="Records">
              <button className="sriicon-box" onClick={toggleDropdown}>
                {numRecords} <MdArrowDropDown size={15} className="sriicon" />
              </button>
              {showDropdown && (
                <div className="sridropdown-menu">
                  {[5, 10, 15, 20].map((num) => (
                    <div
                      key={num}
                      className="sridropdown-item"
                      onClick={() => {
                        setNumRecords(num);
                        setCurrentPage(1);
                        setShowDropdown(false);
                      }}
                    >
                      {num}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="sriicon-button" title="Filter">
              <button className="sriicon-box" onClick={toggleFilter}>
                <PiSliders className="sriicon" />
              </button>
            </div>

            <div className="sriicon-button" title="Share">
              <button className="sriicon-box" onClick={toggleShareOptions}>
                <FaShareSquare className="sriicon" />
              </button>
              {showShareOptions && (
                <div className="srishare-dropdown">
                  <div
                    className="srishare-item"
                    onClick={() => {
                      exportToPDF();
                      setShowShareOptions(false);
                    }}
                  >
                    <FaPrint className="sridropdown-icon" /><span>PDF</span>
                  </div>
                  <div
                    className="srishare-item"
                    onClick={() => {
                      exportToExcel();
                      setShowShareOptions(false);
                    }}
                  >
                    <FaFileExcel className="sridropdown-icon" /><span>XLS</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="sridivider-line"></div>

          {showFilter && (
            <div className="srifilter-form-wrapper">
              <div className="srifilter-form">
                <div className="filter-group">
                  <label htmlFor="orderId">Order ID</label>
                  <input
                    type="text"
                    id="orderId"
                    value={orderIdFilter}
                    onChange={(e) => setOrderIdFilter(e.target.value)}
                    placeholder="Enter Order ID"
                  />
                </div>
                <div className="filter-group">
                  <label htmlFor="customer">Customer</label>
                  <input
                    type="text"
                    id="customer"
                    value={customerFilter}
                    onChange={(e) => setCustomerFilter(e.target.value)}
                    placeholder="Enter Customer Name"
                  />
                </div>
                <div className="filter-group">
                  <label htmlFor="date">Date</label>
                  <input
                    type="date"
                    id="date"
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                    placeholder="Select Date"
                  />
                </div>
                <div className="filter-group">
                  <label htmlFor="status">Status</label>
                  <select
                    id="status"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="srifilter-input"
                  >
                    <option value="">-- Select Status --</option>
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                    <option value="in progress">In Progress</option>
                  </select>
                </div>
              </div>
              <div className="sriform-buttons">
                <button className="srisearch-btn" onClick={handleSearch}>
                  <IoMdSearch /> Search
                </button>
                <button className="sriclear-btn" onClick={handleClear}>
                  <MdOutlineClear /> Clear
                </button>
              </div>
            </div>
          )}

          {/* Table */}
          <div className="sritable-container">
            <table className="sriorder-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Order Type</th>
                  <th>Customer</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {displayedData.map((item, index) => (
                  <tr key={index}>
                    <td>{item.orderId}</td>
                    <td className="sridelivery-type">{item.orderType}</td>
                    <td>{item.customer}</td>
                    <td>{item.amount.toFixed(2)}</td>
                    <td>{item.date}</td>
                    <td>
                      <span className={`sristatus ${item.status.toLowerCase()}`}>
                        {item.status}
                      </span>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <span className="sriaction-eye" onClick={() => handleViewDetails(item)}>
                        <FiEye style={{ color: '#5A66F1', cursor: 'pointer', fontSize: '16px' }} />
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination + Footer - Same Line */}
            <div className="sritable-bottom-bar">
              <div className="sritable-footer">
                Showing {startIdx + 1} to {startIdx + displayedData.length} of {filteredData.length} entries
              </div>

              <div className="sripagination">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                >
                  <IoIosArrowBack />
                </button>
                {[...Array(totalPages).keys()].map((i) => (
                  <button
                    key={i + 1}
                    className={currentPage === i + 1 ? 'active' : ''}
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                >
                  <IoIosArrowForward />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderTable;