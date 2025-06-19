import React, { useState, useEffect } from 'react';
import { MdAddToPhotos, MdArrowDropDown, MdOutlineClear } from "react-icons/md";
import { FaPrint, FaFileExcel, FaShareSquare } from 'react-icons/fa';
import { PiSliders } from 'react-icons/pi';
import { IoIosArrowBack, IoIosArrowForward, IoMdSearch } from 'react-icons/io';
import { Eye, Pen, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { TiTick } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";
import { PiWarningCircleBold } from "react-icons/pi";


import './CustomerTable.css';
import ViewCustomerPage from './ViewCustomerPage';

export default function CustomerTable() {
  const [customers, setCustomers] = useState([]);

  const [showFilters, setShowFilters] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showShareDropdown, setShowShareDropdown] = useState(false);
  const [numRecords, setNumRecords] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [filters, setFilters] = useState({ name: '', email: '', phone: '', status: '' });
  const [searchFilters, setSearchFilters] = useState({ name: '', email: '', phone: '', status: '' });

  const [customerToDelete, setCustomerToDelete] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const navigate = useNavigate();

  // Form state for modal inputs:
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    status: 'ACTIVE',
    password: '',
    confirmPassword: '',
  });
   useEffect(() => {
    fetch('/da.json')
      .then(res => res.json())
      .then(data => setCustomers(data))
      .catch(err => console.error('Failed to load data:', err));
  }, []);

  // Update formData when selectedCustomer or mode changes
  useEffect(() => {
    if (isEditMode && selectedCustomer) {
      setFormData({
        name: selectedCustomer.name || '',
        email: selectedCustomer.email || '',
        phone: selectedCustomer.phone || '',
        status: selectedCustomer.status || 'ACTIVE',
        password: '',
        confirmPassword: '',
      });
    } else {
      // For Add mode, clear form
      setFormData({
        name: '',
        email: '',
        phone: '',
        status: 'ACTIVE',
        password: '',
        confirmPassword: '',
      });
    }
  }, [isEditMode, selectedCustomer]);

  const filteredData = customers.filter((c) =>
    c.name.toLowerCase().includes(searchFilters.name.toLowerCase()) &&
    c.email.toLowerCase().includes(searchFilters.email.toLowerCase()) &&
    c.phone.includes(searchFilters.phone) &&
    (searchFilters.status ? c.status === searchFilters.status : true)
  );

  const totalPages = Math.ceil(filteredData.length / numRecords);
  const startIdx = (currentPage - 1) * numRecords;
  const displayedData = filteredData.slice(startIdx, startIdx + numRecords);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const exportToXLS = () => {
    const dataStr = JSON.stringify(filteredData, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'customers.xls';
    a.click();
    URL.revokeObjectURL(url);
  };

  const confirmDelete = (customer) => {
    setCustomerToDelete(customer);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirmed = () => {
    setCustomers(customers.filter(c => c.id !== customerToDelete.id));
    setShowDeleteModal(false);
    setCustomerToDelete(null);
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setCustomerToDelete(null);
  };

  // Handle modal form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Basic validation for password match
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    // Validate required fields
    if (!formData.name || !formData.email || !formData.status) {
      alert('Please fill all required fields');
      return;
    }

    if (isEditMode) {
      // Update existing customer
      setCustomers(prevCustomers =>
        prevCustomers.map(c =>
          c.id === selectedCustomer.id
            ? { ...c, name: formData.name, email: formData.email, phone: formData.phone, status: formData.status }
            : c
        )
      );
    } else {
      // Add new customer with unique id
      const newId = customers.length > 0 ? Math.max(...customers.map(c => c.id)) + 1 : 1;
      const newCustomer = {
        id: newId,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        status: formData.status,
      };
      setCustomers(prev => [newCustomer, ...prev]);
    }

    // Close modal and reset states
    setShowModal(false);
    setSelectedCustomer(null);
    setIsEditMode(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      status: 'ACTIVE',
      password: '',
      confirmPassword: '',
    });
  };

  // Handle form reset (Clear button)
  const handleFormReset = (e) => {
    e.preventDefault();
    if (isEditMode && selectedCustomer) {
      setFormData({
        name: selectedCustomer.name || '',
        email: selectedCustomer.email || '',
        phone: selectedCustomer.phone || '',
        status: selectedCustomer.status || 'ACTIVE',
        password: '',
        confirmPassword: '',
      });
    } else {
      setFormData({
        name: '',
        email: '',
        phone: '',
        status: 'ACTIVE',
        password: '',
        confirmPassword: '',
      });
    }
  };
  const toggleFilter = () => {
  setShowFilters(prev => !prev);
  setShowShareDropdown(false);
  setShowDropdown(false);
};

const toggleShareOptions = () => {
  setShowShareDropdown(prev => !prev);
  setShowFilters(false);
  setShowDropdown(false);
};

const toggleDropdown = () => {
  setShowDropdown(prev => !prev);
  setShowFilters(false);
  setShowShareDropdown(false);
};

return (
  <div className="snekcustomer-page">
    <div className="snekheader-row">
      <h2 className="title">Customer</h2>
      <h6 className="breadcrumb"><a href="/">Home</a> &gt;&gt; <span>Customer</span></h6>
    </div>
    <div className="snekwhite-container">
      <div className="snekaction-bar">
        <div className="snekicon-button">
          <button className="snekicon-box" onClick={toggleDropdown}>
            {numRecords} <MdArrowDropDown size={20} className="icon" />
          </button>
          {showDropdown && (
            <div className="snekdropdown-menu">
              {[5, 10, 15, 20].map((num) => (
                <div
                  key={num}
                  className="snekdropdown-item"
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

        <div className="snekcustomer-actions">
          <button className="snekicon-btn filled" onClick={toggleFilter}>
            <PiSliders size={20} />
          </button>
          <div className="snekicon-button dropdown-container">
            <button className="snekicon-btn filled" onClick={toggleShareOptions}>
              <FaShareSquare size={22} />
            </button>
            {showShareDropdown && (
              <div className="snekdropdown-menu right">
                <div className="snekdropdown-items">
                  <div onClick={() => window.print()}>
                    <FaPrint size={14} /> Print
                  </div>
                  <div onClick={exportToXLS}>
                    <FaFileExcel size={14} /> XLS
                  </div>
                </div>
              </div>
            )}
          </div>

          <button
            className="snekicon-btn filled"
            title="Add New"
            onClick={() => {
              setSelectedCustomer(null);
              setIsEditMode(false);
              setShowModal(true);
              setFormData({
                name: '',
                email: '',
                phone: '',
                status: 'ACTIVE',
                password: '',
                confirmPassword: '',
              });
            }}
          >
            <span style={{ fontSize: '20px', fontWeight: 'bold' }}>
              <MdAddToPhotos />
            </span>
          </button>
        </div>
      </div>
      <div className="sneksection-divider" />

      {showFilters && (
        <div className="snekcustomer-filters">
          <div className="snekfilter-grid">
            <div className="snekfilter-field">
            <label>Name</label>
            <input
              type="text"
             
              value={filters.name}
              onChange={(e) => setFilters({ ...filters, name: e.target.value })}
            />
            </div>
            <div className="snekfilter-field">
            <label>Email</label>
            <input
              type="email"
              
              value={filters.email}
              onChange={(e) => setFilters({ ...filters, email: e.target.value })}
            />
            </div>
            <div className="snekfilter-field">
            <label>Phone</label>
            <input
              type="text"
             
              value={filters.phone}
              onChange={(e) => setFilters({ ...filters, phone: e.target.value })}
            />
            </div>
            <div className="snekfilter-field">
            <label>Status</label>
            <select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            >
              <option value="">--</option>
              <option value="ACTIVE">ACTIVE</option>
              <option value="INACTIVE">INACTIVE</option>
            </select>
            </div>
          </div>

          <div className="snekfilter-buttons">
            <button
              className="snekbtn search"
              onClick={(e) => {
                e.preventDefault();
                setSearchFilters(filters);
                setCurrentPage(1);
              }}
            >
              <IoMdSearch /> Search
            </button>
            <button
              className="snekbtn clear"
              onClick={(e) => {
                e.preventDefault();
                setFilters({ name: '', email: '', phone: '', status: '' });
                setSearchFilters({ name: '', email: '', phone: '', status: '' });
                setCurrentPage(1);
              }}
            >
              <MdOutlineClear /> Clear
            </button>
          </div>
        </div>
      )}

      <div className="snekcustomer-table-wrapper">
        <table className="snekcustomer-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {displayedData.map((c) => (
              <tr key={c.id}>
                <td>{c.name}</td>
                <td>{c.email}</td>
                <td>{c.phone}</td>
                <td
                  style={{
                    color: c.status?.toLowerCase() === 'active' ? '#28a745' : '#dc3545',
                    fontWeight: '600',
                    textTransform: 'capitalize',
                  }}
                  
                >
                  {c.status?.charAt(0).toUpperCase() + c.status?.slice(1).toLowerCase()}

                </td>
                <td>
                  <button
                    className="snekicon-btn view"
                    onClick={() => navigate(`/view-customer/${c.id}`, { state: { customer: c } })}
                  >
                    <Eye size={18} />
                  </button>

                  <button
                    className="snekicon-btn edit"
                    onClick={() => {
                      setSelectedCustomer(c);
                      setIsEditMode(true);
                      setShowModal(true);
                    }}
                  >
                    <Pen size={18} />
                  </button>
                  <button className="snekicon-btn delete" onClick={() => confirmDelete(c)}>
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
         <div className="snektable-footer-container">
        <div className="snektable-footer">
          Showing {startIdx + 1} to {startIdx + displayedData.length} of {filteredData.length} entries
        </div>
        <div className="snekpagination">
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

     

      {showModal && (
        <div className="snekcustomer-modal-overlay">
          <div className="snekcustomer-modal-box">
            <div className="snekcustomer-modal-header">
              <h3>Customers</h3>
              <button
                onClick={() => {
                  setShowModal(false);
                  setSelectedCustomer(null);
                  setIsEditMode(false);
                }}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleFormSubmit} onReset={handleFormReset}>
              <div className="snekcustomer-form-grid">
                <div className="snekcustomer-form-group">
                  <label>
                    NAME<span className="required">*</span>
                  </label>
                  <input
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="snekcustomer-form-group">
                  <label>
                    EMAIL<span className="required">*</span>
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="snekcustomer-form-group">
                  <label>PHONE</label>
                  <input
                    name="phone"
                    type="text"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="snekcustomer-row-three">
                <div className="snekcustomer-form-group">
                  <label>
                    STATUS<span className="required">*</span>
                  </label>
                  <div className="snekcustomer-radio-group">
                    <label>
                      <input
                        type="radio"
                        name="status"
                        value="ACTIVE"
                        checked={formData.status === 'ACTIVE'}
                        onChange={handleInputChange}
                      />{' '}
                      Active
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="status"
                        value="INACTIVE"
                        checked={formData.status === 'INACTIVE'}
                        onChange={handleInputChange}
                      />{' '}
                      Inactive
                    </label>
                  </div>
                </div>

                <div className="snekcustomer-form-group">
                  <label>
                    PASSWORD<span className="required">*</span>
                  </label>
                  <input
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="snekcustomer-form-group">
                  <label>
                    CONFIRM PASSWORD<span className="required">*</span>
                  </label>
                  <input
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="snekcustomer-modal-footer">
                <button type="submit" className="snekcustomer-btn snekcustomer-save-btn">
                  <TiTick  style={{ marginRight: '6px' }} /> 
                  {isEditMode ? 'UPDATE' : 'SAVE'}
                </button>
                <button type="reset" className="snekcustomer-btn snekcustomer-clear-btn">
                  <RxCross2  style={{ marginRight: '6px' }}/>
                  CLEAR
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
{/* 
      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal-box delete-confirmation">
            <div className="modal-header">
              <div className="icon-warning">⚠️</div>
            </div>
            <div className="modal-body">
              <h3>Are you sure ?</h3>
              <p>You will not be able to recover the deleted record!</p>
            </div>
            <div className="modal-footer">
              <button className="btn danger" onClick={handleDeleteConfirmed}>
                Yes, Delete it !
              </button>
              <button className="btn cancel" onClick={handleCancelDelete}>
                No, Cancel !
              </button>
            </div>
          </div>
        </div>
      )} */}
      {showDeleteModal && (
  <div className="snekmodal-overlay">
    <div className="snekmodal-box delete-confirmation">
      <div className="snekicon-warning">
       <PiWarningCircleBold />
      </div>
      <h3 className="modal-title">Are you sure ?</h3>
      <p className="modal-subtitle">You will not be able to recover the deleted record!</p>
      <div className="snekmodal-footer">
        <button className="btn danger" onClick={handleDeleteConfirmed}>
          Yes, Delete it !
        </button>
        <button className="btn cancel" onClick={handleCancelDelete}>
          No, Cancel !
        </button>
      </div>
    </div>
  </div>
)}


    </div>
  );
}
