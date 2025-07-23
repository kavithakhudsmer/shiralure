import React, { useEffect, useState } from 'react';
import './ProductList.css';
import { FaShareSquare, FaFileExcel, FaPrint } from 'react-icons/fa';
import { MdArrowDropDown, MdOutlineClear } from 'react-icons/md';
import { PiSliders } from 'react-icons/pi';
import { BiSolidAddToQueue } from 'react-icons/bi';
import { IoMdSearch, IoMdCloseCircleOutline } from "react-icons/io";
import {FiCheck,FiX} from "react-icons/fi";

const ProductList = () => {
  const [stocks, setStocks] = useState([]);
  const [showEntriesDropdown, setShowEntriesDropdown] = useState(false);
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [showShareDropdown, setShowShareDropdown] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [entries, setEntries] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);

  const [filterStatusInput, setFilterStatusInput] = useState('');
  const [filterNameInput, setFilterNameInput] = useState('');
  const [appliedFilterStatus, setAppliedFilterStatus] = useState('');
  const [appliedFilterName, setAppliedFilterName] = useState('');

  const [newStock, setNewStock] = useState({ name: '', quantity: '', status: '' }); // Changed default status to '' to trigger error
  const [addFormNameInput, setAddFormNameInput] = useState('');
  const [filteredAddFormNames, setFilteredAddFormNames] = useState([]);
  const [showAddFormNameDropdown, setShowAddFormNameDropdown] = useState(false);

  // Add error states
  const [nameError, setNameError] = useState('');
  const [quantityError, setQuantityError] = useState('');
  const [statusError, setStatusError] = useState('');

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
    if (name === 'status') setStatusError(''); // Clear status error when changed
  };

  const handleAddFormNameChange = (e) => {
    const value = e.target.value;
    setAddFormNameInput(value);
    setNewStock({ ...newStock, name: value });
    setNameError(''); // Clear error when user starts typing

    if (value.length > 0) {
      const uniqueNames = [...new Set(stocks.map(stock => stock.name))];
      const filtered = uniqueNames.filter(name =>
        name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredAddFormNames(filtered);
      setShowAddFormNameDropdown(true);
    } else {
      setFilteredAddFormNames([]);
      setShowAddFormNameDropdown(false);
    }
  };

  const handleAddFormNameSelect = (name) => {
    setAddFormNameInput(name);
    setNewStock({ ...newStock, name: name });
    setShowAddFormNameDropdown(false);
    setNameError(''); // Clear error when a name is selected
  };

  const handleClearAddFormName = () => {
    setAddFormNameInput('');
    setNewStock({ ...newStock, name: '' });
    setFilteredAddFormNames([]);
    setShowAddFormNameDropdown(false);
    setNameError(''); // Clear error when cleared
  };

  const handleAddSubmit = () => {
    let hasError = false;

    if (!newStock.name.trim()) {
      setNameError('Name cannot be empty');
      hasError = true;
    } else {
      setNameError('');
    }

    if (!newStock.quantity || newStock.quantity <= 0) {
      setQuantityError('Quantity cannot be empty');
      hasError = true;
    } else {
      setQuantityError('');
    }

    if (!newStock.status || newStock.status === '') {
      setStatusError('Status cannot be empty');
      hasError = true;
    } else {
      setStatusError('');
    }

    if (!hasError) {
      setStocks([...stocks, { ...newStock, id: stocks.length > 0 ? Math.max(...stocks.map(s => s.id)) + 1 : 1 }]);
      setNewStock({ name: '', quantity: '', status: '' }); // Reset to empty status
      setAddFormNameInput('');
      setFilteredAddFormNames([]);
      setShowAddForm(false);
    }
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

  const handleFilterSearch = () => {
    setAppliedFilterName(filterNameInput);
    setAppliedFilterStatus(filterStatusInput);
    setCurrentPage(1);
  };

  const handleFilterClear = () => {
    setFilterNameInput('');
    setFilterStatusInput('');
    setAppliedFilterName('');
    setAppliedFilterStatus('');
    setCurrentPage(1);
  };

  const filteredStocks = stocks.filter(stock => {
    const matchesStatus = appliedFilterStatus ? stock.status.toLowerCase() === appliedFilterStatus.toLowerCase() : true;
    const matchesName = appliedFilterName ? stock.name.toLowerCase().includes(appliedFilterName.toLowerCase()) : true;
    return matchesStatus && matchesName;
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
            <BiSolidAddToQueue />
          </button>
        </div>

        <div className="shira-stocks-divider-line"></div>

        {showFilterPanel && (
          <div className="shira-filter-panel">
            <div className="shira-filter-fields">
              <div className="shira-filter-group">
                <label htmlFor="filterName">Name</label>
                <input
                  type="text"
                  id="filterName"
                  value={filterNameInput}
                  onChange={(e) => setFilterNameInput(e.target.value)}
                />
              </div>

              <div className="shira-filter-group">
                <label htmlFor="status">Status</label>
                <select id="status" value={filterStatusInput} onChange={(e) => setFilterStatusInput(e.target.value)}>
                  <option value="">--</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
            <div className="shira-filter-buttons">
              <button className="shira-search-btn" type="button" onClick={handleFilterSearch}><IoMdSearch /> Search</button>
              <button className="shira-clear-btn" type="button" onClick={handleFilterClear}><MdOutlineClear /> Clear</button>
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
            {paginatedStocks.length > 0 ? (
              paginatedStocks.map((stock, i) => (
                <tr key={i}>
                  <td>{stock.name}</td>
                  <td>{stock.quantity}</td>
                  <td className={stock.status.toLowerCase() === 'active' ? 'shira-status-active' : 'shira-status-inactive'}>{stock.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" style={{ textAlign: 'center', padding: '20px' }}>No stocks found matching your criteria.</td>
              </tr>
            )}
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
      <form onSubmit={(e) => {
        e.preventDefault();
        handleAddSubmit();
      }}>
        <div className="shira-modal-body">
          <label htmlFor="name">Name</label>
          <div className="shira-add-stock-name-input-wrapper">
            <input
              type="text"
              name="name"
              value={addFormNameInput}
              onChange={handleAddFormNameChange}
              onFocus={() => {
                if (addFormNameInput.length > 0) setShowAddFormNameDropdown(true);
              }}
              onBlur={() => setTimeout(() => setShowAddFormNameDropdown(false), 100)}
            />
            {addFormNameInput && (
              <IoMdCloseCircleOutline
                className="shira-clear-add-form-name"
                onClick={handleClearAddFormName}
              />
            )}
            {showAddFormNameDropdown && filteredAddFormNames.length > 0 && (
              <div className="shira-add-stock-name-dropdown">
                {filteredAddFormNames.map((name, index) => (
                  <div key={index} onMouseDown={() => handleAddFormNameSelect(name)}>
                    {name}
                  </div>
                ))}
              </div>
            )}
          </div>
          {nameError && <div style={{ color: 'red', fontSize: '12px', marginTop: '-15px' }}>{nameError}</div>}

          <label htmlFor="quantity">Quantity</label>
          <input
            type="number"
            name="quantity"
            value={newStock.quantity}
            onChange={handleInputChange}
          />
          {quantityError && <div style={{ color: 'red', fontSize: '12px', marginTop: '-10px' }}>{quantityError}</div>}

          <label htmlFor="status">Status</label>
          <select
            name="status"
            value={newStock.status}
            onChange={handleInputChange}
          >
            <option value="">--</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          {statusError && <div style={{ color: 'red', fontSize: '12px', marginTop: '-10px' }}>{statusError}</div>}
        </div>
        <div className="shira-modal-footer">
          <button className="shira-save-button" type="submit"> <FiCheck /> Save </button>
          <button className="shira-cancel-button" type="button" onClick={() => setShowAddForm(false)}> <FiX /> Cancel </button>
        </div>
      </form>
    </div>
  </div>
)}
 </div>
  );
};

export default ProductList;