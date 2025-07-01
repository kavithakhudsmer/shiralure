import React, { useState, useEffect, useRef } from 'react';
import './ReturnPage.css';
import { IoCalendarNumberOutline } from "react-icons/io5";
import { MdArrowDropDown } from 'react-icons/md';
import { HiOutlineAdjustments } from 'react-icons/hi';
import { FaShareFromSquare } from 'react-icons/fa6';
import { MdOutlineLocalPrintshop } from 'react-icons/md';
import { BsFiletypeXls } from 'react-icons/bs';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { FiEye } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom'; // <--- Re-introduced useNavigate
import { FaSearch, FaTimes } from 'react-icons/fa';

// import ReturnDetails from './ReturnDetails'; // <--- REMOVED: No longer directly imported here

const ReturnPage = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [rowCount, setRowCount] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [showShareDropdown, setShowShareDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const shareRef = useRef(null);

  // const [selectedOrderId, setSelectedOrderId] = useState(null); // <--- REMOVED: No longer needed for conditional rendering

  const [filters, setFilters] = useState({
    id: '',
    customer: '',
    date: '',
    status: '',
  });

  const navigate = useNavigate(); // <--- Re-initialized useNavigate

  useEffect(() => {
    fetch('/returns.json')
      .then(res => res.json())
      .then(data => {
        setAllOrders(data.orders);
        setFilteredOrders(data.orders);
      });
  }, []);

  // MODIFIED handleViewClick to use navigation
  const handleViewClick = (order) => {
    // IMPORTANT: Path must match the route defined in App.jsx for admin section
    navigate(`/admin/returns/${order.id}`); // <--- MODIFIED TO NAVIGATE TO THE DETAILS PAGE
  };

  // const handleCloseReturnDetails = () => { // <--- REMOVED: No longer needed
  //   setSelectedOrderId(null);
  // };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = () => {
    const filtered = allOrders.filter((o) =>
      Object.keys(filters).every((key) => {
        if (!filters[key]) return true;
        if (key === "date") {
          return o[key]?.includes(filters[key]);
        }
        return o[key]?.toString().toLowerCase().includes(filters[key].toLowerCase());
      })
    );
    setFilteredOrders(filtered);
    setCurrentPage(1);
  };

  const handleClear = () => {
    setFilters({ id: '', customer: '', date: '', status: '' });
    setFilteredOrders(allOrders);
  };

  const handlePrint = () => window.print();

  const handleExportToExcel = () => {
    const exportData = filteredOrders.map(order => ({
      "Order ID": order.id,
      "Customer": order.customer,
      "Amount": order.amount,
      "Date": order.date,
      "Status": order.status,
    }));
    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Returns");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    saveAs(data, "returns_data.xlsx");
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
      if (shareRef.current && !shareRef.current.contains(e.target)) {
        setShowShareDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const startIndex = (currentPage - 1) * rowCount;
  const endIndex = Math.min(startIndex + rowCount, filteredOrders.length);
  const totalPages = Math.ceil(filteredOrders.length / rowCount);

  // CONDITIONAL RENDERING LOGIC REMOVED: Now ReturnDetails is a separate route
  // if (selectedOrderId) {
  //   return (
  //     <ReturnDetails
  //       orderId={selectedOrderId}
  //       onClose={handleCloseReturnDetails}
  //     />
  //   );
  // }

  // Otherwise, render the ReturnPage content (always)
  return (
    <div className="vkreturns-page">
      <div className="returns-header">
        <h2>Returns and Refunds</h2>
        <div className="returns-breadcrumb">
          <span className="breadcrumb-link">Dashboard</span>
          <span className="breadcrumb-divider"> &gt;&gt; </span>
          <span>Returns and Refunds</span>
        </div>
      </div>

      <div className="vkreturns-container">
        <div className="vkreturns-controls">
          <div className="vkcount-dropdown-wrapper" ref={dropdownRef}>
            <button className="vkcount-button" onClick={() => setShowDropdown(!showDropdown)}>
              {rowCount} <MdArrowDropDown />
            </button>
            {showDropdown && (
              <div className="vkcount-dropdown-menu">
                {[5, 10, 20].map(count => (
                  <div key={count} className="dropdown-item" onClick={() => { setRowCount(count); setShowDropdown(false); }}>
                    {count}
                  </div>
                ))}
              </div>
            )}
          </div>
          <button className="vvkicon-button" onClick={() => setShowFilter(!showFilter)}>
            <HiOutlineAdjustments />
          </button>
          <div className="vkshare-dropdown-wrapper" ref={shareRef}>
            <button onClick={() => setShowShareDropdown(!showShareDropdown)}>
              <FaShareFromSquare />
            </button>
            {showShareDropdown && (
              <div className="vkshare-dropdown">
                <div className="vkshare-option" onClick={handlePrint}>
                  <MdOutlineLocalPrintshop /> Print
                </div>
                <div className="vkshare-option" onClick={handleExportToExcel}>
                  <BsFiletypeXls /> XLS
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="kvdivider-line"></div>

        {showFilter && (
          <div className="vkfilter-box">
            <div className="vkfilter-group">
              <label>Order ID</label>
              <input type="text" name="id" value={filters.id} onChange={handleFilterChange} />
            </div>

            <div className="vkfilter-group">
              <label>Date</label>
              <div className="vkdate-wrapper">
                <input
                  name="date"
                  type="datetime-local"
                  value={filters.date}
                  onChange={handleFilterChange}
                  className="DevaDEfilter-input"
                />
              </div>
            </div>

            <div className="vkfilter-group">
              <label>Customer</label>
              <input type="text" name="customer" value={filters.customer} onChange={handleFilterChange} />
            </div>
            <div className="vkfilter-group">
              <label>Status</label>
              <input type="text" name="status" value={filters.status} onChange={handleFilterChange} />
            </div>
            <div className="vkfilter-buttons">
              <button className="vksearch-btn" onClick={handleSearch}><FaSearch />Search</button>
              <button className="vkclear-btn" onClick={handleClear}><FaTimes />Clear</button>
            </div>
          </div>
        )}

        <div className="printable-table">
          <table className="vkreturns-table">
            <thead>
              <tr>
                <th>Order Id</th>
                <th>Customer</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Status</th>
                <th className="no-print">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.slice(startIndex, endIndex).map((order, index) => (
                <tr key={index}>
                  <td>{order.id}</td>
                  <td>{order.customer}</td>
                  <td>{order.amount}</td>
                  <td>{order.date}</td>
                  <td className={`status ${order.status.toLowerCase()}`}>{order.status}</td>
                  <td className="vkkactions no-print">
                    <button
                      className="vkkicon-button vkkview-btn"
                      onClick={() => handleViewClick(order)} // Calls navigate
                      title="View"
                    >
                      <FiEye />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="vktable-footer">
          <p>Showing {startIndex + 1} to {endIndex} of {filteredOrders.length} entries</p>
          <div className="vkpagination">
            <button className="vkpage-arrow1" onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>&lt;</button>
            {[...Array(totalPages)].map((_, i) => {
              const pageNum = i + 1;
              return (
                <button key={pageNum} className={`vkpage-btn ${currentPage === pageNum ? 'active' : ''}`} onClick={() => setCurrentPage(pageNum)}>
                  {pageNum}
                </button>
              );
            })}
            <button className="vkpage-arrow2" onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>&gt;</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReturnPage;