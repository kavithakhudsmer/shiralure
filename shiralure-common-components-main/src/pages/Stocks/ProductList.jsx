// ProductList.jsx (Shira-prefixed classes)
import React, { useEffect, useState } from 'react';
import './ProductList.css';
import { FaShareSquare, FaFileExcel, FaPrint } from 'react-icons/fa';
import { MdArrowDropDown, MdOutlineClear } from 'react-icons/md';
import { PiSliders } from 'react-icons/pi';
import { BiAddToQueue } from "react-icons/bi";
import { IoMdSearch } from "react-icons/io";

const ProductList = () => {
  const [stocks, setStocks] = useState([]);
  const [showEntriesDropdown, setShowEntriesDropdown] = useState(false);
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [showShareDropdown, setShowShareDropdown] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [entries, setEntries] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState('');
  const [filterOrderId, setFilterOrderId] = useState('');
  const [filterCustomer, setFilterCustomer] = useState('');
  const [newStock, setNewStock] = useState({ name: '', quantity: '', status: 'Active' });

  useEffect(() => {
    fetch('/stocks.json')
      .then(res => res.json())
      .then(data => setStocks(data));
  }, []);

  const handleEntrySelect = (value) => {
    setEntries(value);
    setCurrentPage(1);
    setShowEntriesDropdown(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStock({ ...newStock, [name]: value });
  };

  const handleAddSubmit = () => {
    if (!newStock.name || !newStock.quantity) return;
    setStocks([...stocks, newStock]);
    setNewStock({ name: '', quantity: '', status: 'Active' });
    setShowAddForm(false);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadXLS = () => {
    const header = ['NAME', 'QUANTITY', 'STATUS'];
    const rows = stocks.map(stock => [stock.name, stock.quantity, stock.status]);
    const csvContent = [header, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'stocks.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredStocks = stocks.filter(stock => {
    const matchesStatus = filterStatus ? stock.status.toLowerCase() === filterStatus.toLowerCase() : true;
    const matchesOrderId = filterOrderId ? stock.name.toLowerCase().includes(filterOrderId.toLowerCase()) : true;
    const matchesCustomer = filterCustomer ? stock.name.toLowerCase().includes(filterCustomer.toLowerCase()) : true;
    return matchesStatus && matchesOrderId && matchesCustomer;
  });

  const totalPages = Math.ceil(filteredStocks.length / entries);
  const paginatedStocks = filteredStocks.slice((currentPage - 1) * entries, currentPage * entries);

  return (
    <div className="shira-stocks-container">
      <div className="shira-stocks-header-section">
        <div className="shira-stocks-header-left">
          <h1>Stocks</h1>
        </div>
        <div className="shira-stocks-header-right">
          <span className="shira-breadcrumb">
            <span className="shira-breadcrumb-home">Home</span> &gt;&gt; <span className="shira-breadcrumb-current">Stocks</span>
          </span>
        </div>
      </div>

      <div className="shira-stocks">
        <div className="shira-stocks-actions">
          <div className="shira-dropdown-wrapper">
            <button className="shira-dropdown-button" onClick={() => setShowEntriesDropdown(!showEntriesDropdown)}>
              {entries} <MdArrowDropDown />
            </button>
            {showEntriesDropdown && (
              <div className="shira-entries-dropdown-menu">
                {[6, 15, 30].map(opt => (
                  <div key={opt} onClick={() => handleEntrySelect(opt)}>{opt}</div>
                ))}
              </div>
            )}
          </div>

          <button className="shira-filter-button" onClick={() => setShowFilterPanel(!showFilterPanel)}>
            <PiSliders />
          </button>

          <div className="shira-dropdown-wrapper">
            <button className="shira-share-button" onClick={() => setShowShareDropdown(!showShareDropdown)}>
              <FaShareSquare />
            </button>
            {showShareDropdown && (
              <div className="shira-share-dropdown-menu">
                <div onClick={handlePrint}><FaPrint /> Print</div>
                <div onClick={handleDownloadXLS}><FaFileExcel /> XLS</div>
              </div>
            )}
          </div>

          <button className="shira-add-button" onClick={() => setShowAddForm(true)}>
            <BiAddToQueue />
          </button>
        </div>

        <div className="shira-stocks-divider-line"></div>

        {showFilterPanel && (
          <div className="shira-filter-panel">
            <div className="shira-filter-fields">
              <div className="shira-filter-group">
                <label htmlFor="orderId">Order Id</label>
                <input type="text" id="orderId" value={filterOrderId} onChange={(e) => setFilterOrderId(e.target.value)} />
              </div>
              <div className="shira-filter-group">
                <label htmlFor="status">Status</label>
                <select id="status" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                  <option value="">--</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <div className="shira-filter-group">
                <label htmlFor="customer">Customer</label>
                <input type="text" id="customer" value={filterCustomer} onChange={(e) => setFilterCustomer(e.target.value)} />
              </div>
            </div>
            <div className="shira-filter-buttons">
              <button className="shira-search-btn"><IoMdSearch /> Search</button>
              <button className="shira-clear-btn" onClick={() => { setFilterOrderId(''); setFilterStatus(''); setFilterCustomer(''); }}><MdOutlineClear /> Clear</button>
            </div>
          </div>
        )}

        <table className="shira-stocks-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Quantity</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {paginatedStocks.map((stock, i) => (
              <tr key={i}>
                <td>{stock.name}</td>
                <td>{stock.quantity}</td>
                <td className={stock.status.toLowerCase() === 'active' ? 'shira-status-active' : 'shira-status-inactive'}>{stock.status}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="shira-pagination-container">
          <div className="shira-pagination-info">
            Showing {(currentPage - 1) * entries + 1} to {Math.min(currentPage * entries, filteredStocks.length)} out of {filteredStocks.length} entries
          </div>
          <div className="shira-pagination-controls">
            <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
              &lt;
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                className={currentPage === i + 1 ? "shira-active" : ""}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
              &gt;
            </button>
          </div>
        </div>
      </div>

      {showAddForm && (
        <div className="shira-modal-overlay">
          <div className="shira-modal-content">
            <div className="shira-modal-header">
              <h2>Add Stock</h2>
              <button className="shira-modal-close" onClick={() => setShowAddForm(false)}>×</button>
            </div>
            <div className="shira-modal-body">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                value={newStock.name}
                onChange={handleInputChange}
              />
              <label htmlFor="quantity">Quantity</label>
              <input
                type="number"
                name="quantity"
                value={newStock.quantity}
                onChange={handleInputChange}
              />
              <label htmlFor="status">Status</label>
              <select
                name="status"
                value={newStock.status}
                onChange={handleInputChange}
              >
                <option value=" ">--</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            <div className="shira-modal-footer">
              <button className="shira-save-button" onClick={handleAddSubmit}>Save</button>
              <button className="shira-cancel-button" onClick={() => setShowAddForm(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
