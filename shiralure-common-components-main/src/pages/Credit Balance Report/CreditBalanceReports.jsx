import React, { useState } from 'react';
import { FaPrint, FaFileExcel, FaShareSquare } from 'react-icons/fa';
import { MdArrowDropDown } from 'react-icons/md';
import { PiSliders } from 'react-icons/pi';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { IoMdSearch } from 'react-icons/io';
import { MdOutlineClear } from 'react-icons/md';
 
import data from './datas.json';
import './CreditBalanceReports.css';
 
const CreditBalanceReport = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [numRecords, setNumRecords] = useState(5);
  const [showDropdown, setShowDropdown] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
 
  // 🔍 Filter state variables
  const [filterName, setFilterName] = useState('');
  const [filterEmail, setFilterEmail] = useState('');
  const [filterPhone, setFilterPhone] = useState('');
  const [filterRole, setFilterRole] = useState('');
 
 const toggleFilter = () => {
  setShowFilter(prev => !prev);
  setShowShareOptions(false);  
  setShowDropdown(false);
};
 
const toggleShareOptions = () => {
  setShowShareOptions(prev => !prev);
  setShowFilter(false);      
  setShowDropdown(false);
};
 
const toggleDropdown = () => {
  setShowDropdown(prev => !prev);
  setShowFilter(false);        
  setShowShareOptions(false);
};
 
  // 🔎 Filter the data based on the search fields
  const filteredData = data.filter((item) => {
    const nameMatch = item.name.toLowerCase().includes(filterName.toLowerCase());
    const emailMatch = item.email.toLowerCase().includes(filterEmail.toLowerCase());
    const phoneMatch = item.phone.toLowerCase().includes(filterPhone.toLowerCase());
    const roleMatch = filterRole === '' || (item.role && item.role.toLowerCase() === filterRole.toLowerCase());
    return nameMatch && emailMatch && phoneMatch && roleMatch;
  });
 
  const totalPages = Math.ceil(filteredData.length / numRecords);
  const startIdx = (currentPage - 1) * numRecords;
  const displayedData = filteredData.slice(startIdx, startIdx + numRecords);
 
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
 
  const handleSearch = () => {
    setCurrentPage(1);  
  };
 
  const handleClear = () => {
    setFilterName('');
    setFilterEmail('');
    setFilterPhone('');
    setFilterRole('');
    setCurrentPage(1);
  };
 
  const exportToExcel = () => {
    let csvContent = 'Name,Email,Phone,Role,Balance\n';
    filteredData.forEach((row) => {
      csvContent += `${row.name},${row.email},${row.phone},${row.role},${row.balance}\n`;
    });
 
    const blob = new Blob([csvContent], { type: 'application/vnd.ms-excel' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'credit_balance_report.xls');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
 
  return (
    <div className="rajipage-container">
      <div className="rajiheader">
        <h2 className="rajititle">Credit Balance Report</h2>
        <h6 className="rajibreadcrumb">
          <a href="/" className="rajibreadcrumb">Home</a> &gt;&gt; <span>Credit Balance Report</span>
        </h6>
      </div>
 
      <div className="rajiall-buttons">
        <div className="rajitop-buttons">
        {/* Number Dropdown */}
        <div className="rajiicon-button" title="Records">
          <button className="rajiicon-box" onClick={toggleDropdown}>
             {numRecords} <MdArrowDropDown className="rajiicon" />
         </button>
          {showDropdown && (
            <div className="rajidropdown-menu">
              {[5, 10, 15, 20].map((num) => (
                <div
                  key={num}
                  className="rajidropdown-item"
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
 
        {/* Filter Button */}
        <div className="rajiicon-button" title="Filter">
          <button className="rajiicon-box" onClick={toggleFilter}>
            <PiSliders className="rajiicon" />
          </button>
        </div>
 
        {/* Share Button */}
        <div className="rajiicon-button" title="Share">
          <button className="rajiicon-box" onClick={toggleShareOptions}>
            <FaShareSquare className="rajiicon" />
          </button>
          {showShareOptions && (
            <div className="rajishare-dropdown">
              <div
                className="rajishare-item"
                onClick={() => {
                  window.print();
                  setShowShareOptions(false);
                }}
              >
                <FaPrint className="rajidropdown-icon" />
                <span>Print</span>
              </div>
              <div
                className="rajishare-item"
                onClick={() => {
                  exportToExcel();
                  setShowShareOptions(false);
                }}
              >
                <FaFileExcel className="rajidropdown-icon" />
                <span>XLS</span>
              </div>
            </div>
          )}
        </div>
      </div>
 
      {showFilter && (
        <div className="rajifilter-form">
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              placeholder="Enter name"
              value={filterName}
              onChange={(e) => setFilterName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter email"
              value={filterEmail}
              onChange={(e) => setFilterEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              id="phone"
              placeholder="Enter phone"
              value={filterPhone}
              onChange={(e) => setFilterPhone(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="role">Role</label>
            <select
              id="role"
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
            >
              <option value="">--</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>
          <div className="rajiform-buttons">
            <button className="rajisearch-btn" onClick={handleSearch}>
              <IoMdSearch /> Search
            </button>
            <button className="rajiclear-btn" onClick={handleClear}>
              <MdOutlineClear /> Clear
            </button>
          </div>
        </div>
      )}
 
      <div className="rajitable-container">
        <table className="rajireport-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Balance</th>
            </tr>
          </thead>
          <tbody>
            {displayedData.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ textAlign: 'center' }}>No records found.</td>
              </tr>
            ) : (
              displayedData.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td>{item.balance.toFixed(2)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
 
        {/* Pagination Controls */}
        <div className="rajitable-footer-container">
          <div className="rajitable-footer">
            Showing {startIdx + 1} to {startIdx + displayedData.length} of {filteredData.length} entries
          </div>
          <div className="rajipagination">
            <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
              <IoIosArrowBack />
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i + 1}
                className={currentPage === i + 1 ? 'active' : ''}
                onClick={() => handlePageChange(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
              <IoIosArrowForward />
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};
 
export default CreditBalanceReport;