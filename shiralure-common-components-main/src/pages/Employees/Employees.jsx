import { useState, useRef, useEffect } from 'react';
import './Employees.css';
import * as XLSX from "xlsx";
import { IoCloseSharp } from 'react-icons/io5';
import { MdArrowDropDown} from 'react-icons/md';
import { FaPrint } from "react-icons/fa6";
import { FaCheck, FaSearch, FaTimes } from 'react-icons/fa';
import { RiErrorWarningLine } from 'react-icons/ri';
import { FaShareFromSquare } from 'react-icons/fa6';
import { BiAddToQueue } from 'react-icons/bi';
import { HiOutlineAdjustments } from 'react-icons/hi';
import { FaFileExcel } from "react-icons/fa6";
import AdminProfile from "./Adminis";
import {FiEdit2,FiTrash2 } from "react-icons/fi";
import { IoEyeOutline } from "react-icons/io5";
 
function Employees() {
  const [admins, setAdmins] = useState([]);
  useEffect(() => {
    fetch('/admin.json')
      .then((res) => res.json())
      .then((data) => {
        setAdmins(data.admins);
        setFilteredAdmins(data.admins);
      })
      .catch((error) => {
        console.error("Failed to fetch admins:", error);
      });
  }, []);
 
  const [filteredAdmins, setFilteredAdmins] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [filters, setFilters] = useState({ name: '', email: '', role: '', status: '', phone: ''});
  const [showShareDropdown, setShowShareDropdown] = useState(false);
  const [showOverlayForm, setShowOverlayForm] = useState(false);
  const [showRowCountDropdown, setShowRowCountDropdown] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editAdmin, setEditAdmin] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [adminToDeleteIndex, setAdminToDeleteIndex] = useState(null);
  const [rowsToDisplay, setRowsToDisplay] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
 
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    countryCode: '+91',
    role: '',
    status: 'Active',
    password: '',
    confirmPassword: ''
  });
 
  const shareRef = useRef();
  const formRef = useRef();
  const rowCountRef = useRef();
 
  useEffect(() => {
    const savedAdmins = localStorage.getItem('admins');
    if (savedAdmins) {
      const parsed = JSON.parse(savedAdmins);
      setAdmins(parsed);
      setFilteredAdmins(parsed);
    }
  }, []);
 
  useEffect(() => {
    if (showOverlayForm) {
      document.body.classList.add('sraju-modal-open');
    } else {
      document.body.classList.remove('sraju-modal-open');
    }
  }, [showOverlayForm]);
 
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showShareDropdown && shareRef.current && !shareRef.current.contains(event.target)) {
        setShowShareDropdown(false);
      }
      if (showOverlayForm && formRef.current && !formRef.current.contains(event.target)) {
        setShowOverlayForm(false);
      }
      if (showRowCountDropdown && rowCountRef.current && !rowCountRef.current.contains(event.target)) {
        setShowRowCountDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showShareDropdown, showOverlayForm, showRowCountDropdown]);
 
  const handleViewClick = (admin) => {
    setSelectedAdmin(admin);
    setShowProfile(true);
  };
 
  const closeUploadModal = () => {
    setSelectedAdmin(null);
    setShowProfile(false);
  };
 
  const handleFormClear = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      countryCode: '+91',
      role: '',
      status: 'Active',
      password: '',
      confirmPassword: '',
    });
  };
 
  const handleOverlayToggle = () => {
    setShowOverlayForm(!showOverlayForm);
    setShowEditForm(false);
    handleFormClear();
  };
 
  const handleFilterToggle = () => setShowFilter(!showFilter);
  const handleShareToggle = () => setShowShareDropdown(!showShareDropdown);
  const handleRowCountToggle = () => setShowRowCountDropdown(!showRowCountDropdown);
 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
 
  const ftrhandleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
 
  const handleSaveAdmin = () => {
    if (!formData.name || !formData.email || !formData.password || formData.password !== formData.confirmPassword) {
      console.error('Please fill all required fields and ensure passwords match');
      return;
    }
 
    const updatedAdmin = {
      name: formData.name,
      email: formData.email,
      phone: formData.countryCode + formData.phone,
      role: formData.role,
      status: formData.status,
    };
 
    let updatedAdmins;
    if (editAdmin !== null) {
      updatedAdmins = [...admins];
      updatedAdmins[editAdmin] = updatedAdmin;
    } else {
      updatedAdmins = [...admins, updatedAdmin];
    }
 
    setAdmins(updatedAdmins);
    setFilteredAdmins(updatedAdmins);
    handleOverlayToggle();
  };
 
  const handleSearch = () => {
    const result = admins.filter((admin) => {
      return (
        admin.name.toLowerCase().includes(filters.name.toLowerCase()) &&
        admin.email.toLowerCase().includes(filters.email.toLowerCase()) &&
        admin.phone.includes(filters.phone) &&
        admin.role.toLowerCase().includes(filters.role.toLowerCase()) &&
        admin.status.toLowerCase().includes(filters.status.toLowerCase())
      );
    });
 
    setFilteredAdmins(result);
    setCurrentPage(1);
  };
 
  const handleClear = () => {
    setFilters({ name: '', email: '', phone: '', status: '', role: '' });
    setFilteredAdmins(admins);
    setCurrentPage(1);
  };
 
  const handleEditClick = (admin, index) => {
    setFormData({
      name: admin.name,
      email: admin.email,
      phone: admin.phone.replace(/^\+\d{1,2}/, ''),
      countryCode: admin.phone.startsWith('+1') ? '+1' : '+91',
      role: admin.role,
      status: admin.status,
      password: '',
      confirmPassword: '',
    });
    setEditAdmin(index);
    setShowEditForm(true);
    setShowOverlayForm(true);
  };
 
  const handleDeleteClick = (index) => {
    setAdminToDeleteIndex(index);
    setShowDeleteConfirm(true);
  };
 
  const confirmDeleteAdmin = () => {
    const updatedAdmins = [...admins];
    updatedAdmins.splice(adminToDeleteIndex, 1);
    setAdmins(updatedAdmins);
    setFilteredAdmins(updatedAdmins);
    setShowDeleteConfirm(false);
    setAdminToDeleteIndex(null);
    setCurrentPage(1);
  };
 
  const handlePrint = () => {
    window.print();
  };
 
  const handleExportToExcel = () => {
    const dataToExport = filteredAdmins.map(({ name, email, phone, role, status }) => ({
        Name: name,
        Email: email,
        Phone: phone,
        Role: role,
        Status: status
    }));
    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Admins");
    XLSX.writeFile(workbook, "admin_data.xlsx");
  };
 
  const totalPages = Math.ceil(filteredAdmins.length / rowsToDisplay);
  const startIndex = (currentPage - 1) * rowsToDisplay;
  const endIndex = Math.min(startIndex + rowsToDisplay, filteredAdmins.length);
  const paginatedAdmins = filteredAdmins.slice(startIndex, endIndex);
 
  return (
    <div className="sraju-sremployee-dashboard-container">
        <div className="sraju-sremployee-header-section">
            <div className="sraju-employee-header-left">
                <h1 className="sraju-employee-title">Employees</h1>
            </div>
            <div className="sraju-employee-header-right">
                <h6 className="sraju-employee-breadcrumb">
                    <a href="/" className="sraju-employee-breadcrumb-link">Home</a> &gt;&gt; <span className="sraju-employee-current-page">Employees</span> {/* Added sraju- prefix */}
                </h6>
            </div>
        </div>
 
        <div className="sraju-employee-content-box-wrapper">
 
            <div className="sraju-employee-top-controls">
 
                <div className="sraju-employee-icon-button-group">
                    <div className="sraju-employee-row-count-wrapper" ref={rowCountRef}>
                        <button className="sraju-employee-row-count-btn" onClick={handleRowCountToggle}>
                            {rowsToDisplay} <MdArrowDropDown />
                        </button>
                        {showRowCountDropdown && (
                            <div className="sraju-employee-row-count-dropdown">
                                {[5, 10, 15, 20].map((num) => (
                                    <p
                                        key={num}
                                        onClick={() => {
                                            setRowsToDisplay(num);
                                            setShowRowCountDropdown(false);
                                            setCurrentPage(1);
                                        }}
                                    >
                                        {num}
                                    </p>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="sraju-employee-icon-button" title="Filter">
                        <button className="sraju-employee-icon-box" onClick={handleFilterToggle}>
                            <HiOutlineAdjustments className="sraju-employee-icon" />
                        </button>
                    </div>
 
                    <div className="sraju-employee-icon-button" ref={shareRef} title="Share Options">
                        <button className="sraju-employee-icon-box" onClick={handleShareToggle}><FaShareFromSquare className="sraju-employee-icon" /></button> {/* Added sraju- prefix */}
                        {showShareDropdown && (
                            <div className="sraju-employee-share-dropdown">
                                <div className="sraju-employee-share-item" onClick={handlePrint}>
                                    <FaPrint className="sraju-employee-dropdown-icon" /> Print
                                </div>
                                <div className="sraju-employee-share-item" onClick={handleExportToExcel}>
                                    <FaFileExcel className="sraju-employee-dropdown-icon" /> XLS
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="sraju-employee-icon-button" title="Add Employee">
                        <button className="sraju-employee-icon-box" onClick={handleOverlayToggle}><BiAddToQueue className="sraju-employee-icon" /></button> {/* Added sraju- prefix */}
                    </div>
                </div>
            </div>
 
            <div className="sraju-employee-divider-line"></div>
 
            {showFilter && (
                <div className="sraju-employee-filter-form-wrapper">
                    <div className="sraju-employee-filter-form">
                        <div className="sraju-filter-group">
                            <label htmlFor="filter-name">NAME</label>
                            <input id="filter-name" name="name" value={filters.name} onChange={ftrhandleInputChange} />
                        </div>
                        <div className="sraju-filter-group">
                            <label htmlFor="filter-email">EMAIL</label>
                            <input id="filter-email" name="email" value={filters.email} onChange={ftrhandleInputChange} />
                        </div>
                        <div className="sraju-filter-group">
                            <label htmlFor="filter-phone">PHONE</label>
                            <input id="filter-phone" name="phone" value={filters.phone} onChange={ftrhandleInputChange} />
                        </div>
                        <div className="sraju-filter-group">
                            <label htmlFor="filter-status">STATUS</label>
                            <select id="filter-status" name="status" value={filters.status} onChange={ftrhandleInputChange}>
                                <option value="">--</option>
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                        </div>
                        <div className="sraju-filter-group">
                            <label htmlFor="filter-role">ROLE</label>
                            <select id="filter-role" name="role" value={filters.role} onChange={ftrhandleInputChange}>
                                <option value="">--</option>
                                <option value="Manager">Manager</option>
                                <option value="Staff">Staff</option>
                            </select>
                        </div>
                    </div>
                    <div className="sraju-filter-buttons">
                        <button className="sraju-search" onClick={handleSearch}><FaSearch /> Search</button>
                        <button className="sraju-clear" onClick={handleClear}><FaTimes /> Clear</button>
                    </div>
                </div>
            )}
 
            <div className="sraju-print-table-area">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th className="sraju-no-print">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedAdmins.map((admin, index) => (
                            <tr key={index}>
                                <td>{admin.name}</td>
                                <td>{admin.email}</td>
                                <td>{admin.phone}</td>
                                <td>{admin.role}</td>
                                <td>
                                    <span className={admin.status === 'Active' ? 'sraju-active-status' : 'sraju-inactive-status'}>
                                        {admin.status}
                                    </span>
                                </td>
                                <td className="sraju-employee-actions">
                                    <div className="sraju-employee-action-buttons sraju-no-print">
                                        <button onClick={() => handleViewClick(admin)} className="sraju-employee-icon-action-btn sraju-employee-view-btn" title="View">
                                            <IoEyeOutline/>
                                        </button>
                                        <button title="Edit" onClick={() => handleEditClick(admin, index)} className="sraju-employee-icon-action-btn sraju-employee-edit-btn">
                                            <FiEdit2 />
                                        </button>
                                        <button title="Delete" onClick={() => handleDeleteClick(index)} className="sraju-employee-icon-action-btn sraju-employee-delete-btn">
                                            <FiTrash2 />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
 
            {showOverlayForm && (
                <div className="sraju-employee-overlay">
                    <div className="sraju-employee-form-box" ref={formRef}>
                        <h2>{showEditForm ? 'Employees' : 'Employees'}</h2>
                        <div className="sraju-employee-divider-line"></div>
                        <div className="sraju-employee-form-grid">
                            <div className="sraju-employee-form-group">
                                <label htmlFor="form-name">Name<span className="sraju-required">*</span></label>
                                <input id="form-name" type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder=" " />
                            </div>
                            <div className="sraju-employee-form-group">
                                <label htmlFor="form-email">Email<span className="sraju-required">*</span></label>
                                <input id="form-email" type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder=" " />
                            </div>
                            <div className="sraju-employee-form-group">
                                <label htmlFor="form-phone">Phone</label>
                                <div className="sraju-employee-phone-input">
                                    <input id="form-phone" name="phone" type="text" value={formData.phone} onChange={handleInputChange} placeholder=" " />
                                </div>
                            </div>
                            <div className="sraju-employee-form-group">
                                <label>Status<span className="sraju-required">*</span></label>
                                <div className="sraju-employee-radio-group">
                                    <label htmlFor="status-active">
                                        <input id="status-active" type="radio" name="status" value="Active" checked={formData.status === 'Active'} onChange={handleInputChange} /> Active
                                    </label>
                                    <label htmlFor="status-inactive">
                                        <input id="status-inactive" type="radio" name="status" value="Inactive" checked={formData.status === 'Inactive'} onChange={handleInputChange} /> Inactive
                                    </label>
                                </div>
                            </div>
                            <div className="sraju-employee-form-group">
                                <label htmlFor="form-password">Password<span className="sraju-required">*</span></label>
                                <input id="form-password" type="password" name="password" value={formData.password} onChange={handleInputChange} placeholder=" " />
                            </div>
                            <div className="sraju-employee-form-group">
                                <label htmlFor="form-confirm-password">Password Confirmation<span className="sraju-required">*</span></label>
                                <input id="form-confirm-password" type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} placeholder=" " />
                            </div>
                            <div className="sraju-employee-form-group">
                                <label htmlFor="form-role">Role<span className="sraju-required">*</span></label>
                                <select id="form-role" name="role" value={formData.role} onChange={handleInputChange} required>
                                    <option value="">--</option>
                                    <option value="Manager">Manager</option>
                                    <option value="Staff">Staff</option>
                                </select>
                            </div>
                        </div>
                        <div className="sraju-employee-form-buttons">
                            <button className="sraju-save" onClick={handleSaveAdmin}>
                                <FaCheck /> Save
                            </button>
                            <button className="sraju-close" onClick={handleOverlayToggle}>
                                <IoCloseSharp /> Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
 
            {showProfile && selectedAdmin && (
                <AdminProfile admin={selectedAdmin} onClose={closeUploadModal} />
            )}
 
            {showDeleteConfirm && (
                <div className="sraju-employee-delete-modal">
                    <div className="sraju-employee-delete-box">
                        <div className="sraju-employee-delete-icon"><RiErrorWarningLine size={80} color="#d4af37" /></div>
                        <h2>Are you sure?</h2>
                        <p className="sraju-employee-subtext">You will not be able to recover the deleted record!</p>
                        <div className="sraju-employee-delete-buttons">
                            <button className="sraju-yes" onClick={confirmDeleteAdmin}>Yes, Delete it!</button>
                            <button className="sraju-no" onClick={() => setShowDeleteConfirm(false)}>No, Cancel</button>
                        </div>
                    </div>
                </div>
            )}
 
            <div className="sraju-employee-footer">
                <div className="sraju-employee-footer-content">
                    <p>Showing {startIndex + 1} to {endIndex} of {filteredAdmins.length} entries</p>
                    <div className="sraju-employee-pagination">
                        <button
                            className="sraju-employee-pagination-arrow"
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                        >
                            &lt;
                        </button>
                        {[...Array(totalPages)].map((_, i) => {
                            const pageNum = i + 1;
                            return (
                                <button
                                    key={pageNum}
                                    className={`sraju-employee-pagination-page ${currentPage === pageNum ? 'sraju-active' : ''}`}
                                    onClick={() => setCurrentPage(pageNum)}
                                >
                                    {pageNum}
                                </button>
                            );
                        })}
                        <button
                            className="sraju-employee-pagination-arrow sraju-employee-pagination-next"
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                        >
                            &gt;
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}
 
export default Employees;