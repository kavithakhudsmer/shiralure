import { useState, useRef, useEffect } from 'react';
import './Administrators.css';
import * as XLSX from "xlsx";
import { IoCloseSharp } from 'react-icons/io5';
import { MdArrowDropDown, MdOutlineLocalPrintshop } from 'react-icons/md';
import { FaCheck, FaSearch, FaTimes } from 'react-icons/fa';
import { RiErrorWarningLine } from 'react-icons/ri';
import { FaShareFromSquare } from 'react-icons/fa6';
import { BiAddToQueue } from 'react-icons/bi';
import { HiOutlineAdjustments } from 'react-icons/hi';
import { BsFiletypeXls } from 'react-icons/bs';
import AdminProfile from "./Adminis";
import { FiEye,FiEdit2,FiTrash2 } from "react-icons/fi";
function Administrators() {
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
  const [filters, setFilters] = useState({ name: '', email: '', status: '', phone: '' });
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
    document.body.classList.add('modal-open');
  } else {
    document.body.classList.remove('modal-open');
  }
}, [showOverlayForm]);
  // ✅ Fetch admins from data.json
 
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
      status: 'Active',
      password: '',
      confirmPassword: ''
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
      alert('Please fill all required fields and ensure passwords match');
      return;
    }

    const updatedAdmin = {
      name: formData.name,
      email: formData.email,
      phone: formData.countryCode + formData.phone,
      status: formData.status
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
        admin.status.toLowerCase().includes(filters.status.toLowerCase()) &&
        admin.phone.includes(filters.phone)
      );
    });

    setFilteredAdmins(result);
    setCurrentPage(1);
  };

  const handleClear = () => {
    setFilters({ name: '', email: '', status: '', phone: '' });
    setFilteredAdmins(admins);
    setCurrentPage(1);
  };

  const handleEditClick = (admin, index) => {
    setFormData({
      name: admin.name,
      email: admin.email,
      phone: admin.phone.replace(/^\+\d{1,2}/, ''),
      countryCode: admin.phone.startsWith('+1') ? '+1' : '+91',
      status: admin.status,
      password: '',
      confirmPassword: ''
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
    const worksheet = XLSX.utils.json_to_sheet(filteredAdmins);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Admins");
    XLSX.writeFile(workbook, "admin_data.xlsx");
  };

 const totalPages = Math.ceil(filteredAdmins.length / rowsToDisplay);
const startIndex = (currentPage - 1) * rowsToDisplay;
const endIndex = Math.min(startIndex + rowsToDisplay, filteredAdmins.length);
const paginatedAdmins = filteredAdmins.slice(startIndex, endIndex);



  return (
    <div className="admin-wrapper">
      <div className="kvadmin-header">
        <h1>Administrators</h1>
        <div className="kvbreadcrumb">
          <h2>
            <span className="kvactive">Dashboard</span> &gt;&gt; <span>Administrators</span>

          </h2>
        </div>
      </div>
<div className="container-wrapper"></div>

      <div className="kvcontainer">
        
        <div className="kvcontrols">
        <div className="kvrowcount-wrapper" ref={rowCountRef}>
  <button className="kvrowcount-btn" onClick={handleRowCountToggle}>
    {rowsToDisplay} <MdArrowDropDown />
  </button>
              
            {showRowCountDropdown && (
              <div className="kvrowcount-dropdown">
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

          <button onClick={handleFilterToggle}><HiOutlineAdjustments /></button>

          <div className="kvshare-dropdown-wrapper" ref={shareRef}>
            <button onClick={handleShareToggle}><FaShareFromSquare /></button>
            {showShareDropdown && (
              <div className="kvshare-dropdown">
                <div className="kvshare-option" onClick={handlePrint}>
                  <MdOutlineLocalPrintshop /> Print
                </div>
                <div className="kvshare-option" onClick={handleExportToExcel}>
                  <BsFiletypeXls /> XLS
                </div>
              </div>
            )}
          </div>
          <button onClick={handleOverlayToggle}><BiAddToQueue /></button>
        </div>
        

        <div className="kvdivider-line"></div>

        {showFilter && (
          <div className="kvfilter-box">
            <div className="kvfilter-line">
              <div className="kvfilter-group">
                <label>Name</label>
                <input name="name" value={filters.name} onChange={ftrhandleInputChange} />
              </div>
              <div className="kvfilter-group">
                <label>Email</label>
                <input name="email" value={filters.email} onChange={ftrhandleInputChange} />
              </div>
              <div className="kvfilter-group">
                <label>Status</label>
                <input name="status" value={filters.status} onChange={ftrhandleInputChange} />
              </div>
              <div className="kvfilter-group">
                <label>Phone No</label>
                <input name="phone" value={filters.phone} onChange={ftrhandleInputChange} />
              </div>
              <div className="kvfilter-buttons">
                <button className="search" onClick={handleSearch}><FaSearch /> Search</button>
                <button className="clear" onClick={handleClear}><FaTimes /> Clear</button>
              </div>
            </div>
          </div>
        )}
         <div className="kvtable-wrapper">
        <div className="print-kvtable-area">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone No</th>
                <th>Status</th>
                <th className="no-print">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedAdmins.map((admin, index) => (
                <tr key={index}>
                  <td>{admin.name}</td>
                  <td>{admin.email}</td>
                  <td>{admin.phone}</td>
                  <td className={admin.status === 'Active' ? 'active' : 'inactive'}>
                    {admin.status}
                  </td>
                  <td className="kvactions">
  <div className="kvicon-button no-print"> {/* Add no-print class */}
    <button onClick={() => handleViewClick(admin)} className="kvicon-button kvview-btn" title="View">
      <FiEye />
    </button>
    <button title="Edit" onClick={() => handleEditClick(admin, index)} className="kvicon-button kvedit-btn">
      <FiEdit2/>
    </button>
    <button title="Delete" onClick={() => handleDeleteClick(index)} className="kvicon-button kvdelete-btn">
      <FiTrash2 />
    </button>
  </div>
</td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
</div>
        {showOverlayForm && (
          <div className="kvoverlay">
            <div className="kvform-box" ref={formRef}>
              <h2>{showEditForm ? 'Edit Administrator' : 'Add Administrator'}</h2>
              <div className="kvdivider-line"></div>
              <div className="kvform-grid">
                <div className="kvform-group">
                  <label>Name <span className="required">*</span></label>
                  <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Enter name" />
                </div>
                <div className="kvform-group">
                  <label>Email<span className="required">*</span></label>
                  <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Enter email" />
                </div>
                <div className="kvform-group">
                  <label>Phone</label>
                  <div className="kvphone-input">
                    <select name="countryCode" value={formData.countryCode} onChange={handleInputChange}>
                      <option value="+91">IN +91</option>
                      <option value="+1">US +1</option>
                    </select>
                    <input name="phone" type="text" value={formData.phone} onChange={handleInputChange} placeholder="Enter phone number" />
                  </div>
                </div>
                <div className="kvform-group">
                  <label>Status<span className="required">*</span></label>
                  <div className="kvradio-group">
                    <label>
                      <input type="radio" name="status" value="Active" checked={formData.status === 'Active'} onChange={handleInputChange} /> Active
                    </label>
                    <label>
                      <input type="radio" name="status" value="Inactive" checked={formData.status === 'Inactive'} onChange={handleInputChange} /> Inactive
                    </label>
                  </div>
                </div>
                <div className="kvform-group">
                  <label>Password<span className="required">*</span></label>
                  <input type="password" name="password" value={formData.password} onChange={handleInputChange} placeholder="Enter password" />
                </div>
                <div className="kvform-group">
                  <label>Confirm Password<span className="required">*</span></label>
                  <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} placeholder="Confirm password" />
                </div>
              </div>
              <div className="kvform-buttons bottom-left">
                <button className="save" onClick={handleSaveAdmin}>
                  <FaCheck /> Save
                </button>
                <button className="close" onClick={handleOverlayToggle}>
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
          <div className="kvdelete-modal">
            <div className="kvdelete-box">
              <div className="kvdelete-icon"><RiErrorWarningLine size={80} color="#d4af37" /></div>
              <h2>Are you sure?</h2>
              <p className="kvsubtext">You will not be able to recover the deleted record!</p>
              <div className="kvdelete-buttons">
                <button className="yes" onClick={confirmDeleteAdmin}>Yes, Delete it!</button>
                <button className="no" onClick={() => setShowDeleteConfirm(false)}>No, Cancel</button>
              </div>
            </div>
          </div>
        )}

        <div className="kvfooter">
          <div className="kvfooter-content">
            <p>Showing {startIndex + 1} to {endIndex} of {filteredAdmins.length} entries</p>
            <div className="kvpagination">
              <button
                className="kvarrow"
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
                    className={`page ${currentPage === pageNum ? 'active' : ''}`}
                    onClick={() => setCurrentPage(pageNum)}
                  >
                    {pageNum}
                  </button>
                );
              })}
              <button
                className="kvarrow1"
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

export default Administrators;