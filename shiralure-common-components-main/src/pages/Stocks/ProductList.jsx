import React, { useEffect, useState } from 'react';
import './ProductList.css';
import { FaShareSquare, FaFileExcel, FaPrint } from 'react-icons/fa';
import { MdArrowDropDown, MdOutlineClear } from 'react-icons/md';
import { PiSliders } from 'react-icons/pi';
import { BiSolidAddToQueue } from 'react-icons/bi';
import { IoMdSearch, IoMdCloseCircleOutline } from "react-icons/io";


const ProductList = () => {
  const [stocks, setStocks] = useState([]);
  const [showEntriesDropdown, setShowEntriesDropdown] = useState(false);
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [showShareDropdown, setShowShareDropdown] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [entries, setEntries] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);

  // States for filter panel inputs (these change as you type)
  const [filterStatusInput, setFilterStatusInput] = useState('');
  const [filterNameInput, setFilterNameInput] = useState('');

  // New states to store the *applied* filter values (only updated on search click)
  const [appliedFilterStatus, setAppliedFilterStatus] = useState('');
  const [appliedFilterName, setAppliedFilterName] = useState('');

  const [newStock, setNewStock] = useState({ name: '', quantity: '', status: 'Active' });

  // States for the "Add Stock" modal's name field and dropdown
  const [addFormNameInput, setAddFormNameInput] = useState('');
  const [filteredAddFormNames, setFilteredAddFormNames] = useState([]);
  const [showAddFormNameDropdown, setShowAddFormNameDropdown] = useState(false);


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

  const handleAddFormNameChange = (e) => {
    const value = e.target.value;
    setAddFormNameInput(value);
    setNewStock({ ...newStock, name: value });

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
  };

  const handleClearAddFormName = () => {
    setAddFormNameInput('');
    setNewStock({ ...newStock, name: '' });
    setFilteredAddFormNames([]);
    setShowAddFormNameDropdown(false);
  };

  const handleAddSubmit = () => {
    if (!newStock.name || !newStock.quantity) return;
    setStocks([...stocks, { ...newStock, id: stocks.length > 0 ? Math.max(...stocks.map(s => s.id)) + 1 : 1 }]);
    setNewStock({ name: '', quantity: '', status: 'Active' });
    setAddFormNameInput('');
    setFilteredAddFormNames([]);
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

  // NEW: Function to handle search button click
  const handleFilterSearch = () => {
    setAppliedFilterName(filterNameInput);
    setAppliedFilterStatus(filterStatusInput);
    setCurrentPage(1); // Reset to first page on new search
  };

  // NEW: Function to handle clear button click in filter panel
  const handleFilterClear = () => {
    setFilterNameInput('');
    setFilterStatusInput('');
    setAppliedFilterName(''); // Clear applied filters
    setAppliedFilterStatus(''); // Clear applied filters
    setCurrentPage(1); // Reset to first page
  };


  // filteredStocks now filters by appliedFilterName and appliedFilterStatus
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
              {/* Call handleFilterSearch on Search button click */}
              <button className="shira-search-btn" type="button" onClick={handleFilterSearch}><IoMdSearch /> Search</button>
              {/* Call handleFilterClear on Clear button click */}
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
                  <option value="">--</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <div className="shira-modal-footer">
                <button className="shira-save-button" type="submit">Save</button>
                <button className="shira-cancel-button" type="button" onClick={() => setShowAddForm(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;