import { useState, useRef, useEffect } from 'react';
import './Customers.css'; // This CSS file will also need its class names updated
import * as XLSX from "xlsx";
import { IoCloseSharp } from 'react-icons/io5';
import { MdArrowDropDown } from 'react-icons/md';
import { FaPrint } from "react-icons/fa6";
import { FaCheck, FaSearch, FaTimes } from 'react-icons/fa';
import { RiErrorWarningLine } from 'react-icons/ri';
import { FaShareFromSquare } from 'react-icons/fa6';
import { BiAddToQueue } from 'react-icons/bi';
import { HiOutlineAdjustments } from 'react-icons/hi';
import { FaFileExcel } from "react-icons/fa6";
import UserProfile from "./Adminis1"; // Ensure this path is correct based on where Userprofile.jsx is located
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { IoEyeOutline } from 'react-icons/io5';


function Customers() {
    const [customers, setCustomers] = useState([]);
    const [filteredCustomers, setFilteredCustomers] = useState([]);
    const [showFilter, setShowFilter] = useState(false);
    const [filters, setFilters] = useState({ name: '', email: '', phone: '', status: '' });
    const [showShareDropdown, setShowShareDropdown] = useState(false);
    const [showOverlayForm, setShowOverlayForm] = useState(false);
    const [showRowCountDropdown, setShowRowCountDropdown] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [showProfile, setShowProfile] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [editCustomerIndex, setEditCustomerIndex] = useState(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [customerToDeleteIndex, setCustomerToDeleteIndex] = useState(null);
    const [rowsToDisplay, setRowsToDisplay] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        countryCode: '+91',
        status: 'Active',
        password: '',
        confirmPassword: ''
    });

    const shareRef = useRef();
    const formRef = useRef();
    const rowCountRef = useRef();

    useEffect(() => {
        fetch('/customer.json')
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then((data) => {
                const customersWithIds = data.customers.map((cust, index) => ({
                    id: cust.id || index + 1,
                    ...cust,
                    role: cust.role || "CUSTOMER"
                }));

                setCustomers(customersWithIds);
                setFilteredCustomers(customersWithIds);
            })
            .catch((error) => {
                console.error("Failed to fetch customers:", error);
            });

        const savedCustomers = localStorage.getItem('customers');
        if (savedCustomers) {
            const parsed = JSON.parse(savedCustomers);
            setCustomers(parsed);
            setFilteredCustomers(parsed);
        }
    }, []);

    useEffect(() => {
        if (showOverlayForm || showProfile) {
            document.body.classList.add('rk-customer-modal-open');
        } else {
            document.body.classList.remove('rk-customer-modal-open');
        }
    }, [showOverlayForm, showProfile]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (showShareDropdown && shareRef.current && !shareRef.current.contains(event.target)) {
                setShowShareDropdown(false);
            }
            if (showOverlayForm && formRef.current && !formRef.current.contains(event.target)) {
                // setShowOverlayForm(false);
            }
            if (showRowCountDropdown && rowCountRef.current && !rowCountRef.current.contains(event.target)) {
                setShowRowCountDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [showShareDropdown, showOverlayForm, showRowCountDropdown]);

    const handleViewClick = (customer) => {
        setSelectedCustomer(customer);
        setShowProfile(true);
    };

    const closeProfileModal = () => {
        setSelectedCustomer(null);
        setShowProfile(false);
    };

    const handleFormClear = () => {
        setFormData({
            name: '',
            email: '',
            phone: '',
            countryCode: '+91',
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

    const handleSaveCustomer = () => {
        if (!formData.name || !formData.email) {
            console.error('Please fill all required fields (Name and Email).');
            return;
        }

        const newCustomer = {
            id: editCustomerIndex !== null ? customers[editCustomerIndex].id : (customers.length > 0 ? Math.max(...customers.map(c => c.id || 0)) + 1 : 1),
            name: formData.name,
            email: formData.email,
            phone: formData.countryCode + formData.phone,
            status: formData.status,
            role: "CUSTOMER"
        };

        let updatedCustomers;
        if (editCustomerIndex !== null) {
            updatedCustomers = [...customers];
            updatedCustomers[editCustomerIndex] = newCustomer;
        } else {
            updatedCustomers = [...customers, newCustomer];
        }

        setCustomers(updatedCustomers);
        setFilteredCustomers(updatedCustomers);
        localStorage.setItem('customers', JSON.stringify(updatedCustomers));
        handleOverlayToggle();
    };

    const handleSearch = () => {
        const result = customers.filter((customer) => {
            return (
                customer.name.toLowerCase().includes(filters.name.toLowerCase()) &&
                customer.email.toLowerCase().includes(filters.email.toLowerCase()) &&
                customer.phone.includes(filters.phone) &&
                customer.status.toLowerCase().includes(filters.status.toLowerCase())
            );
        });

        setFilteredCustomers(result);
        setCurrentPage(1);
    };

    const handleClear = () => {
        setFilters({ name: '', email: '', phone: '', status: '' });
        setFilteredCustomers(customers);
        setCurrentPage(1);
    };

    const handleEditClick = (customer, index) => {
        const phoneParts = customer.phone.match(/^(\+\d{1,3})?(.*)$/);
        const countryCode = phoneParts && phoneParts[1] ? phoneParts[1] : '+91';
        const phoneNumber = phoneParts && phoneParts[2] ? phoneParts[2] : customer.phone;

        setFormData({
            name: customer.name,
            email: customer.email,
            phone: phoneNumber.trim(),
            countryCode: countryCode,
            status: customer.status,
            password: '',
            confirmPassword: '',
        });
        setEditCustomerIndex(index);
        setShowEditForm(true);
        setShowOverlayForm(true);
    };

    const handleDeleteClick = (index) => {
        setCustomerToDeleteIndex(index);
        setShowDeleteConfirm(true);
    };

    const confirmDeleteCustomer = () => {
        const updatedCustomers = [...customers];
        updatedCustomers.splice(customerToDeleteIndex, 1);
        setCustomers(updatedCustomers);
        setFilteredCustomers(updatedCustomers);
        localStorage.setItem('customers', JSON.stringify(updatedCustomers));
        setShowDeleteConfirm(false);
        setCustomerToDeleteIndex(null);
        setCurrentPage(1);
    };

    const handlePrint = () => {
        window.print();
    };

    const handleExportToExcel = () => {
        const dataToExport = filteredCustomers.map(({ name, email, phone, status }) => ({
            'Customer Name': name,
            'Email Address': email,
            'Contact Number': phone,
            'Account Status': status
        }));
        const worksheet = XLSX.utils.json_to_sheet(dataToExport);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Customers");
        XLSX.writeFile(workbook, "customer_data.xlsx");
    };

    const totalPages = Math.ceil(filteredCustomers.length / rowsToDisplay);
    const startIndex = (currentPage - 1) * rowsToDisplay;
    const endIndex = Math.min(startIndex + rowsToDisplay, filteredCustomers.length);
    const paginatedCustomers = filteredCustomers.slice(startIndex, endIndex);

    // if (showProfile && selectedCustomer) {
    //     return <UserProfile user={selectedCustomer} onClose={closeProfileModal} />;
    // }

    return (
        <div className="rk-customer-dashboard-container">
            <div className="rk-customer-header-section">
                <div className="rk-customer-header-left">
                    <h1 className="rk-customer-title">Customers</h1>
                </div>
                <div className="rk-customer-header-right">
                    <h6 className="rk-customer-breadcrumb">
                        <a href="/" className="rk-customer-breadcrumb-link">Home</a> &gt;&gt; <span className="rk-customer-current-page">Customers</span>
                    </h6>
                </div>
            </div>

            <div className="rk-customer-content-box-wrapper">

{showProfile && selectedCustomer ? (
                    // Render UserProfile if showProfile is true and a customer is selected
                    <UserProfile user={selectedCustomer} onBackToList={closeProfileModal} />
                ) : (
                    <>
                <div className="rk-customer-top-controls">
                    <div className="rk-customer-icon-button-group">
                        <div className="rk-customer-row-count-wrapper" ref={rowCountRef}>
                            <button className="rk-customer-row-count-btn" onClick={handleRowCountToggle}>
                                {rowsToDisplay} <MdArrowDropDown />
                            </button>
                            {showRowCountDropdown && (
                                <div className="rk-customer-row-count-dropdown">
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
                        <div className="rk-customer-icon-button" title="Filter">
                            <button className="rk-customer-icon-box" onClick={handleFilterToggle}>
                                <HiOutlineAdjustments className="rk-customer-icon" />
                            </button>
                        </div>

                        <div className="rk-customer-icon-button" ref={shareRef} title="Share Options">
                            <button className="rk-customer-icon-box" onClick={handleShareToggle}><FaShareFromSquare className="rk-customer-icon" /></button>
                            {showShareDropdown && (
                                <div className="rk-customer-share-dropdown">
                                    <div className="rk-customer-share-item" onClick={handlePrint}>
                                        <FaPrint className="rk-customer-dropdown-icon" /> Print
                                    </div>
                                    <div className="rk-customer-share-item" onClick={handleExportToExcel}>
                                        <FaFileExcel className="rk-customer-dropdown-icon" /> XLS
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="rk-customer-icon-button" title="Add Customer">
                            <button className="rk-customer-icon-box" onClick={handleOverlayToggle}><BiAddToQueue className="rk-customer-icon" /></button>
                        </div>
                    </div>
                </div>
</>)}
                <div className="rk-customer-divider-line"></div>

                {showFilter && (
                    <div className="rk-customer-filter-form-wrapper">
                        <div className="rk-customer-filter-form">
                            <div className="rk-customer-filter-group">
                                <label htmlFor="filter-name">NAME</label>
                                <input id="filter-name" name="name" value={filters.name} onChange={ftrhandleInputChange} />
                            </div>
                            <div className="rk-customer-filter-group">
                                <label htmlFor="filter-email">EMAIL</label>
                                <input id="filter-email" name="email" value={filters.email} onChange={ftrhandleInputChange} />
                            </div>
                            <div className="rk-customer-filter-group">
                                <label htmlFor="filter-phone">PHONE</label>
                                <input id="filter-phone" name="phone" value={filters.phone} onChange={ftrhandleInputChange} />
                            </div>
                            <div className="rk-customer-filter-group">
                                <label htmlFor="filter-status">STATUS</label>
                                <select id="filter-status" name="status" value={filters.status} onChange={ftrhandleInputChange}>
                                    <option value="">--</option>
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                </select>
                            </div>
                        </div>
                        <div className="rk-customer-filter-buttons">
                            <button className="rk-customer-search" onClick={handleSearch}><FaSearch /> Search</button>
                            <button className="rk-customer-clear" onClick={handleClear}><FaTimes /> Clear</button>
                        </div>
                    </div>
                )}

                <div className="rk-customer-print-table-area">
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Status</th>
                                <th className="rk-customer-no-print">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedCustomers.map((customer, index) => (
                                <tr key={customer.id || index}>
                                    <td>{customer.name}</td>
                                    <td>{customer.email}</td>
                                    <td>{customer.phone}</td>
                                    <td>
                                        <span className={customer.status === 'Active' ? 'rk-customer-active-status' : 'rk-customer-inactive-status'}>
                                            {customer.status}
                                        </span>
                                    </td>
                                    <td className="rk-customer-actions">
                                        <div className="rk-customer-action-buttons rk-customer-no-print">
                                            <button
                                                title="View Details"
                                                onClick={() => handleViewClick(customer)}
                                                className="rk-customer-icon-action-btn rk-customer-view-btn"
                                            >
                                                <IoEyeOutline />
                                            </button>
                                            <button title="Edit" onClick={() => handleEditClick(customer, index)} className="rk-customer-icon-action-btn rk-customer-edit-btn">
                                                <FiEdit2 />
                                            </button>
                                            <button title="Delete" onClick={() => handleDeleteClick(index)} className="rk-customer-icon-action-btn rk-customer-delete-btn">
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
                    <div className="rk-customer-overlay">
                        <div className="rk-customer-form-box" ref={formRef}>
                            <h2>{showEditForm ? 'Edit Customer' : 'Add Customer'}</h2>
                            <div className="rk-customer-divider-line"></div>
                            <div className="rk-customer-form-grid">
                                <div className="rk-customer-form-group">
                                    <label htmlFor="form-name">Name<span className="rk-customer-required">*</span></label>
                                    <input id="form-name" type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder=" " />
                                </div>
                                <div className="rk-customer-form-group">
                                    <label htmlFor="form-email">Email<span className="rk-customer-required">*</span></label>
                                    <input id="form-email" type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder=" " />
                                </div>
                                <div className="rk-customer-form-group">
                                    <label htmlFor="form-phone">Phone</label>
                                    <div className="rk-customer-phone-input">
                                        <input id="form-phone" name="phone" type="text" value={formData.phone} onChange={handleInputChange} placeholder=" " />
                                    </div>
                                </div>
                                <div className="rk-customer-form-group">
                                    <label>Status<span className="rk-customer-required">*</span></label>
                                    <div className="rk-customer-radio-group">
                                        <label htmlFor="status-active">
                                            <input id="status-active" type="radio" name="status" value="Active" checked={formData.status === 'Active'} onChange={handleInputChange} /> Active
                                        </label>
                                        <label htmlFor="status-inactive">
                                            <input id="status-inactive" type="radio" name="status" value="Inactive" checked={formData.status === 'Inactive'} onChange={handleInputChange} /> Inactive
                                        </label>
                                    </div>
                                </div>
                                {!showEditForm && (
                                    <>
                                        <div className="rk-customer-form-group">
                                            <label htmlFor="form-password">Password<span className="rk-customer-required">*</span></label>
                                            <input id="form-password" type="password" name="password" value={formData.password} onChange={handleInputChange} placeholder=" " />
                                        </div>
                                        <div className="rk-customer-form-group">
                                            <label htmlFor="form-confirm-password">Password Confirmation<span className="rk-customer-required">*</span></label>
                                            <input id="form-confirm-password" type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} placeholder=" " />
                                        </div>
                                    </>
                                )}
                            </div>
                            <div className="rk-customer-form-buttons">
                                <button className="rk-customer-save" onClick={handleSaveCustomer}>
                                    <FaCheck /> Save
                                </button>
                                <button className="rk-customer-close" onClick={handleOverlayToggle}>
                                    <IoCloseSharp /> Close
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {showDeleteConfirm && (
                    <div className="rk-customer-delete-modal">
                        <div className="rk-customer-delete-box">
                            <div className="rk-customer-delete-icon"><RiErrorWarningLine size={80} color="#d4af37" /></div>
                            <h2>Are you sure?</h2>
                            <p className="rk-customer-subtext">You will not be able to recover the deleted record!</p>
                            <div className="rk-customer-delete-buttons">
                                <button className="rk-customer-yes" onClick={confirmDeleteCustomer}>Yes, Delete it!</button>
                                <button className="rk-customer-no" onClick={() => setShowDeleteConfirm(false)}>No, Cancel</button>
                            </div>
                        </div>
                    </div>
                )}

                <div className="rk-customer-footer">
                    <div className="rk-customer-footer-content">
                        <p>Showing {startIndex + 1} to {endIndex} of {filteredCustomers.length} entries</p>
                        <div className="rk-customer-pagination">
                            <button
                                className="rk-customer-pagination-arrow"
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
                                        className={`rk-customer-pagination-page ${currentPage === pageNum ? 'rk-customer-active' : ''}`}
                                        onClick={() => setCurrentPage(pageNum)}
                                    >
                                        {pageNum}
                                    </button>
                                );
                            })}
                            <button
                                className="rk-customer-pagination-arrow rk-customer-pagination-next"
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

export default Customers;