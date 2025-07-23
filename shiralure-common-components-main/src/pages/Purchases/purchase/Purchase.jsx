import { useState, useEffect, useRef, useCallback } from "react";
import './Purchase.css'; // Updated CSS file reference
import ExcelJS from "exceljs";
import { initialDataWithNotes, dummyPurchasePayments } from './data.json';
import {
  SlidersIcon, PrintIcon, XlsIcon,
  SearchIcon, XIcon, EyeIcon, EditIcon, TrashIcon, PaymentIcon,
  ListIcon, ExclamationCircleIcon, TruckIcon, FileTextIcon,
  BoldIcon, ItalicIcon, UnderlineIcon, StrikethroughIcon, CodeIcon,
  BulletListIcon, OrderedListIcon, SuperscriptIcon,
  AlignLeftIcon, AlignCenterIcon, AlignRightIcon, AlignJustifyIcon,
  TypeIcon, LinkIcon, ImageIcon, FilmIcon, CheckIcon,
  formatDateTimeLocal, formatDisplayDateTime,
  generateMoreDataWithNotes
} from './module.jsx';
import { FaShareSquare } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { FiEye, FiEdit2, FiTrash2 } from 'react-icons/fi';

import { PiSliders } from "react-icons/pi";
import { BiSolidAddToQueue } from "react-icons/bi";
import { FaFile } from "react-icons/fa";
import { GoFileSymlinkFile } from "react-icons/go";
import { FaFileUpload } from "react-icons/fa";

const masterPurchasesData = [...initialDataWithNotes, ...generateMoreDataWithNotes(7, 20)];

function Purchase() {
  const [showForm, setShowForm] = useState(false);
  const [showPrintDropdown, setShowPrintDropdown] = useState(false);
  const printDropdownRef = useRef(null);

  const [masterData, setMasterData] = useState(masterPurchasesData);
  const [filteredData, setFilteredData] = useState(masterPurchasesData);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);

  const [showUploadDropdown, setShowUploadDropdown] = useState(false);
  const fileInputRef = useRef(null);

  const initialSearchCriteria = { supplier: "", date: "", ref: "", status: "", total: "", note: "" };
  const [searchCriteria, setSearchCriteria] = useState(initialSearchCriteria);
  const [activeSearchCriteria, setActiveSearchCriteria] = useState(initialSearchCriteria);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDeleteId, setItemToDeleteId] = useState(null);

  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [currentEditItem, setCurrentEditItem] = useState(null);

  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [currentPaymentItem, setCurrentPaymentItem] = useState(null);

  const [showPurchasePaymentsModal, setShowPurchasePaymentsModal] = useState(false);
  const [currentPurchasePaymentsItem, setCurrentPurchasePaymentsItem] = useState(null);

  const [showViewDetailsModal, setShowViewDetailsModal] = useState(false);
  const [currentViewItem, setCurrentViewItem] = useState(null);

  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const modalRef = useRef(null);

  const handleToggleForm = () => setShowForm((prev) => !prev);
  const togglePrintDropdown = () => setShowPrintDropdown((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (printDropdownRef.current && !printDropdownRef.current.contains(event.target)) {
        setShowPrintDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Draggable Modal Logic
  const handleMouseDown = useCallback((e) => {
    if (modalRef.current && (e.target.closest('.kadd-edit-modal-title') || e.target.closest('.kpurchase-details-modal-title') || (e.target.closest('.kmodal-content') && !e.target.closest('input') && !e.target.closest('select') && !e.target.closest('textarea') && !e.target.closest('button')))) {
      setIsDragging(true);
      setDragOffset({ x: e.clientX - modalRef.current.getBoundingClientRect().left, y: e.clientY - modalRef.current.getBoundingClientRect().top });
    }
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (isDragging) {
      const newX = e.clientX - dragOffset.x;
      const newY = e.clientY - dragOffset.y;
      const viewportWidth = window.innerWidth, viewportHeight = window.innerHeight;
      const modalWidth = modalRef.current ? modalRef.current.offsetWidth : 0;
      const modalHeight = modalRef.current ? modalRef.current.offsetHeight : 0;
      const clampedX = Math.max(0, Math.min(newX, viewportWidth - modalWidth));
      const clampedY = Math.max(0, Math.min(newY, viewportHeight - modalHeight));
      setModalPosition({ x: clampedX, y: clampedY });
    }
  }, [isDragging, dragOffset]);

  const handleMouseUp = useCallback(() => { setIsDragging(false); }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.userSelect = 'none';
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.userSelect = '';
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  // Helper to apply filters to data and set filteredData state
  const applyFiltersAndSetData = useCallback((data, criteria) => {
    let tempFilteredData = [...data];
    for (const key in criteria) {
      if (criteria[key]) {
        if (key === 'date') {
          const searchDateTime = criteria[key];
          tempFilteredData = tempFilteredData.filter(item => formatDateTimeLocal(item.date).includes(searchDateTime));
        } else if (key === 'total') {
          const searchTermTotal = criteria[key].replace(/[$,]/g, '');
          tempFilteredData = tempFilteredData.filter(item => item.total.replace(/[$,]/g, '').includes(searchTermTotal));
        } else {
          tempFilteredData = tempFilteredData.filter(item => item[key] && item[key].toLowerCase().includes(criteria[key].toLowerCase()));
        }
      }
    }
    setFilteredData(tempFilteredData);
    setCurrentPage(1);
  }, []);

  // Update filtered data when activeSearchCriteria changes
  useEffect(() => {
    applyFiltersAndSetData(masterData, activeSearchCriteria);
  }, [masterData, activeSearchCriteria, applyFiltersAndSetData]);

  // Search Input Change Handler
  const handleSearchInputChange = (event) => {
    const { name, value } = event.target;
    setSearchCriteria(prev => ({ ...prev, [name]: value }));
  };

  // Search Handler
  const handleSearch = () => { setActiveSearchCriteria(searchCriteria); };

  // Clear Search Handler
  const handleClearSearch = () => {
    setSearchCriteria(initialSearchCriteria);
    setActiveSearchCriteria(initialSearchCriteria);
    setCurrentPage(1);
  };

  // Delete Handlers
  const handleDeleteClick = (id) => { setItemToDeleteId(id); setShowDeleteModal(true); };

  const handleConfirmDelete = () => {
    const updatedMasterData = masterData.filter(item => item.id !== itemToDeleteId);
    setMasterData(updatedMasterData);
    applyFiltersAndSetData(updatedMasterData, activeSearchCriteria);
    const newTotalPages = Math.ceil(filteredData.length / pageSize);
    if (currentPage > newTotalPages && newTotalPages > 0) setCurrentPage(newTotalPages);
    else if (newTotalPages === 0) setCurrentPage(1);
    setShowDeleteModal(false); setItemToDeleteId(null);
  };

  const handleCancelDelete = () => { setShowDeleteModal(false); setItemToDeleteId(null); };

  // Add/Edit Handlers
  const handleAddClick = () => {
    setCurrentEditItem({ id: null, supplier: "", date: "", ref: "", status: "Pending", total: "0.00", payment: "Pending", note: "", products: "" });
    setShowAddEditModal(true);
    setModalPosition({ x: (window.innerWidth - 700) / 2, y: 50 });
  };

  const handleEditClick = (item) => {
    setCurrentEditItem({ ...item, date: formatDateTimeLocal(item.date), total: item.total.replace(/[$,]/g, '') });
    setShowAddEditModal(true);
    setModalPosition({ x: (window.innerWidth - 700) / 2, y: 50 });
  };

  const handleCloseAddEditModal = () => { setShowAddEditModal(false); setCurrentEditItem(null); };

  const handleAddEditInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentEditItem(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveItem = () => {
    if (!currentEditItem.supplier || !currentEditItem.date || !currentEditItem.ref || !currentEditItem.status || !currentEditItem.total) {
      console.error("Please fill all required fields.");
      return;
    }
    let updatedMasterData;
    const newTotalFormatted = `$${parseFloat(currentEditItem.total).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    const displayDate = formatDisplayDateTime(currentEditItem.date);
    const itemToSave = { ...currentEditItem, total: newTotalFormatted, date: displayDate };

    if (itemToSave.id === null) {
      const newId = masterData.length > 0 ? Math.max(...masterData.map(item => item.id)) + 1 : 1;
      updatedMasterData = [...masterData, { ...itemToSave, id: newId }];
    } else {
      updatedMasterData = masterData.map(item => item.id === itemToSave.id ? { ...itemToSave } : item);
    }
    setMasterData(updatedMasterData);
    applyFiltersAndSetData(updatedMasterData, activeSearchCriteria);
    handleCloseAddEditModal();
  };

  // Payment Handlers
  const handlePaymentClick = (item) => {
    setCurrentPaymentItem({ id: item.id, date: '', referenceNo: '', amount: '', paymentMethod: '', file: null });
    setShowPaymentModal(true);
    setModalPosition({ x: (window.innerWidth - 700) / 2, y: 50 });
  };

  const handleClosePaymentModal = () => { setShowPaymentModal(false); setCurrentPaymentItem(null); };

  const handlePaymentInputChange = (e) => {
    const { name, value, files } = e.target;
    setCurrentPaymentItem(prev => ({ ...prev, [name]: name === "file" ? files[0] : value }));
  };

  const handleSavePayment = () => {
    if (!currentPaymentItem.date || !currentPaymentItem.amount || !currentPaymentItem.paymentMethod) {
      console.error("Please fill all required payment fields.");
      return;
    }
    console.log("Saving Payment:", currentPaymentItem);
    const updatedMasterData = masterData.map(item => item.id === currentPaymentItem.id ? { ...item, payment: "Paid" } : item);
    setMasterData(updatedMasterData);
    applyFiltersAndSetData(updatedMasterData, activeSearchCriteria);
    handleClosePaymentModal();
  };

  const handleUploadFileClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };
 
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    alert(`Uploaded ${files.length} file(s):\n${files.map(f => f.name).join(', ')}`);
  };

  // Purchase Payments Handlers
  const handlePurchasePaymentsClick = (item) => {
    const paymentsForPurchase = dummyPurchasePayments.filter(payment => payment.purchaseId === item.id);
    setCurrentPurchasePaymentsItem({ purchaseRef: item.ref, payments: paymentsForPurchase });
    setShowPurchasePaymentsModal(true);
    setModalPosition({ x: (window.innerWidth - 700) / 2, y: 50 });
  };

  const handleClosePurchasePaymentsModal = () => { setShowPurchasePaymentsModal(false); setCurrentPurchasePaymentsItem(null); };

  // View Details Handlers
  const handleViewClick = (item) => {
    setCurrentViewItem(item);
    setShowViewDetailsModal(true);
    setModalPosition({ x: (window.innerWidth - 900) / 2, y: 50 });
  };

  const handleCloseViewDetailsModal = () => { setShowViewDetailsModal(false); setCurrentViewItem(null); };

  // Pagination Logic
  const totalEntries = filteredData.length;
  const totalPages = Math.ceil(totalEntries / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalEntries);
  const currentTableData = filteredData.slice(startIndex, endIndex);

  const displayRangeStart = totalEntries === 0 ? 0 : startIndex + 1;
  const displayRangeEnd = endIndex;

  const handlePageSizeChange = (event) => { setPageSize(parseInt(event.target.value, 10)); setCurrentPage(1); };
  const handlePageChange = (page) => { if (page >= 1 && page <= totalPages) setCurrentPage(page); };
  const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  // Print Functionality
  const handlePrint = () => {
    const printWindow = window.open('', '', 'width=800,height=600');
    const printContent = `
      <html>
        <head>
          <title>Purchase List</title>
          <style>
            body { font-family: 'Segoe UI', sans-serif; margin: 20px; }
            .kpurchase-table { width: 100%; border-collapse: collapse; }
            .kpurchase-table th, .kpurchase-table td { padding: 12px; border: 1px solid #e4e4e4; text-align: left; font-size: 14px; }
            .kpurchase-table th { background-color: #f9fafb; font-weight: 600; color: #374151; }
            .kstatus.received { color: green; font-weight: bold; }
            .kstatus.pending { color: #e67e22; font-weight: bold; }
            .kstatus.cancelled { color: red; font-weight: bold; }
            .kpayment.paid { color: green; font-weight: bold; }
            .kpayment.pending { color: #e67e22; font-weight: bold; }
            .kpayment.not-paid { color: red; font-weight: bold; }
            .kprint-header { text-align: center; margin-bottom: 20px; }
            .kprint-header h1 { font-size: 24px; margin: 0; }
            .kprint-header p { margin: 5px 0; color: #4b5563; }
          </style>
        </head>
        <body>
          <div class="kprint-header">
            <h1>Purchase List</h1>
            <p>Generated on: ${new Date().toLocaleString()}</p>
            <p>Total Records: ${filteredData.length}</p>
          </div>
          <table class="kpurchase-table">
            <thead>
              <tr>
                <th>Supplier</th><th>Date</th><th>Reference No</th><th>Status</th><th>Total</th><th>Payment</th>
              </tr>
            </thead>
            <tbody>
              ${filteredData.map(row => `
                <tr>
                  <td>${row.supplier}</td>
                  <td>${row.date}</td>
                  <td>${row.ref}</td>
                  <td class="kstatus ${row.status.toLowerCase()}">${row.status}</td>
                  <td>${row.total}</td>
                  <td class="kpayment ${row.payment.toLowerCase().replace(" ", "-")}">${row.payment}</td>
                </tr>
              `).join('')}
              ${filteredData.length === 0 ? '<tr><td colspan="6" style="text-align: center; padding: 20px;">No matching records found.</td></tr>' : ''}
            </tbody>
          </table>
        </body>
      </html>
    `;
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  // Export to Excel Functionality
  const handleExportToXLS = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Purchases');

    // Define columns
    worksheet.columns = [
      { header: 'Supplier', key: 'supplier', width: 20 },
      { header: 'Date', key: 'date', width: 20 },
      { header: 'Reference No', key: 'ref', width: 15 },
      { header: 'Status', key: 'status', width: 15 },
      { header: 'Total', key: 'total', width: 15 },
      { header: 'Payment', key: 'payment', width: 15 },
      { header: 'Note', key: 'note', width: 30 },
    ];

    // Style header row
    worksheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };
    worksheet.getRow(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF5B61F3' }
    };
    worksheet.getRow(1).alignment = { vertical: 'middle', horizontal: 'center' };
    worksheet.getRow(1).height = 25;

    // Add filtered data to worksheet
    filteredData.forEach((row) => {
      worksheet.addRow({
        supplier: row.supplier,
        date: row.date,
        ref: row.ref,
        status: row.status,
        total: row.total,
        payment: row.payment,
        note: row.note,
      });
    });

    // Style data rows
    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber > 1) {
        row.eachCell((cell) => {
          cell.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
          };
          cell.alignment = { vertical: 'middle', horizontal: 'left' };
        });
        // Apply conditional formatting for Status and Payment
        const statusCell = row.getCell('status');
        const paymentCell = row.getCell('payment');
        if (statusCell.value === 'Received') statusCell.font = { color: { argb: 'FF008000' } };
        else if (statusCell.value === 'Pending') statusCell.font = { color: { argb: 'FFE67E22' } };
        else if (statusCell.value === 'Cancelled') statusCell.font = { color: { argb: 'FFFF0000' } };
        if (paymentCell.value === 'Paid') paymentCell.font = { color: { argb: 'FF008000' } };
        else if (paymentCell.value === 'Pending') paymentCell.font = { color: { argb: 'FFE67E22' } };
        else if (paymentCell.value === 'Not Paid') paymentCell.font = { color: { argb: 'FFFF0000' } };
      }
    });

    // Auto-fit columns based on content
    worksheet.columns.forEach(column => {
      let maxLength = 0;
      column.eachCell({ includeEmpty: true }, cell => {
        const columnLength = cell.value ? cell.value.toString().length : 10;
        maxLength = Math.max(maxLength, columnLength);
      });
      column.width = Math.min(maxLength + 2, 50);
    });

    // Generate and download the Excel file
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Purchases_${new Date().toISOString().slice(0, 10)}.xlsx`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Rich Text Editor functionality
  const handleRichTextCommand = (command, value = null) => {
    console.log(`Rich text command "${command}" clicked. Formatting functionality is currently not supported in this environment.`);
  };

  return (
    <div className="kapp-container">
      <div className="kheader-bar">
        <h1 className="ktitle">Purchases</h1>
        <div className="kbreadcrumb">
          <div className="klink">Home</div> <div className="arrow">{'>>'}</div> <div>Purchases</div>
        </div>
      </div>
      <div className="kpurchase-table-container">
        <div className="kcontrols">
          <div className="kpage-size-selector-container">
            <select className="kpage-size-select" title="Records" value={pageSize} onChange={handlePageSizeChange}>
              <option value={6}>6</option> <option value={10}>10</option> <option value={20}>20</option>
            </select>
          </div>
          <div className="kicon-bth" title="Filter">
            <button className="kicon-btn" onClick={handleToggleForm}><PiSliders /></button>
          </div>
          <div className="kexport-container">
                        <button className="kicon-btn kadd-btn" title="Upload" onClick={() => {
                          setShowUploadDropdown(prev => !prev);
                          setShowFilterRow(false);
                          setShowPrintDropdown(false);
                          setShowItemsPerPageDropdown(false);
                        }}>
                          <GoFileSymlinkFile size={20} color='white' />
                        </button>
                        {showUploadDropdown && (
                          <div className="kexport-dropdown">
                            <a href="/sample.xlsx" download>
                              <FaFile />Sample File
                            </a>
                            <button onClick={handleUploadFileClick}><FaFileUpload />Upload File</button>
                          </div>
                        )}
                      </div>
                      <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              multiple
              onChange={handleFileUpload}
            />
          <div className="kdropdown-container" title="Share">
            <div className="kdropdown-container" ref={printDropdownRef}>
              <button className="kicon-btn" onClick={togglePrintDropdown}><FaShareSquare /></button>
              {showPrintDropdown && (
                <div className="kdropdown-menu print-xls-dropdown">
                  <button className="kdropdown-item" onClick={handlePrint}><PrintIcon className="kdropdown-item-icon" />Print</button>
                  <button className="kdropdown-item" onClick={handleExportToXLS}><XlsIcon className="kdropdown-item-icon" />Excel</button>
                </div>
              )}
            </div>
          </div>
          
          <button className="kicon-btn" title="Add New Purchase" onClick={handleAddClick}><BiSolidAddToQueue /></button>
        </div>
        <hr className="kdivider" />
        {showForm && (
          <div className="kform-container">
            <div className="kform-row">
              <div className="kform-group"><label>Supplier</label><input type="text" name="supplier" value={searchCriteria.supplier} onChange={handleSearchInputChange} /></div>
              <div className="kform-group"><label>Date</label><input type="datetime-local" name="date" value={searchCriteria.date} onChange={handleSearchInputChange} /></div>
              <div className="kform-group"><label>Reference</label><input type="text" name="ref" value={searchCriteria.ref} onChange={handleSearchInputChange} /></div>
            </div>
            <div className="kform-row">
              <div className="kform-group"><label>Status</label><input type="text" name="status" value={searchCriteria.status} onChange={handleSearchInputChange} /></div>
              <div className="kform-group"><label>Total</label><input type="text" name="total" value={searchCriteria.total} onChange={handleSearchInputChange} /></div>
              <div className="kform-group"><label>Note</label><input type="text" name="note" value={searchCriteria.note} onChange={handleSearchInputChange} /></div>
            </div>
            <div className="kbutton-row">
              <button className="ksearch-btn" onClick={handleSearch}><SearchIcon />Search</button>
              <button className="kclear-btn" onClick={handleClearSearch}><XIcon />Clear</button>
            </div>
          </div>
        )}
        <table className="kpurchase-table">
          <thead><tr><th>Supplier</th><th>Date</th><th>Reference No</th><th>Status</th><th>Total</th><th>Payment</th><th>Action</th></tr></thead>
          <tbody>
            {currentTableData.map((row) => (
              <tr key={row.id}>
                <td>{row.supplier}</td><td>{row.date}</td><td>{row.ref}</td>
                <td className={`kstatus ${row.status.toLowerCase()}`}>{row.status}</td>
                <td>{row.total}</td>
                <td className={`kpayment ${row.payment.toLowerCase().replace(" ", "-")}`}>{row.payment}</td>
                <td>
                  <div className="kaction-icons">
                    <FiEye className="kicon kview-icon" onClick={() => handleViewClick(row)} />
                    <FiEdit2 className="kicon kedit-icon" onClick={() => handleEditClick(row)} />
                    <FiTrash2 className="kicon kdelete-icon" onClick={() => handleDeleteClick(row.id)} />
                    <PaymentIcon className="kicon kpayment-icon" onClick={() => handlePaymentClick(row)} />
                    <ListIcon className="kicon klist-icon" onClick={() => handlePurchasePaymentsClick(row)} />
                  </div>
                </td>
              </tr>
            ))}
            {currentTableData.length === 0 && (<tr><td colSpan="7" style={{ textAlign: 'center', padding: '20px' }}>No matching records found.</td></tr>)}
          </tbody>
        </table>
        <div className="kpagination">
          <span>Showing {displayRangeStart} to {displayRangeEnd} of {totalEntries} entries</span>
          <div className="kpage-controls">
            <button className="arrow" onClick={handlePrevPage} disabled={currentPage === 1 || totalEntries === 0}>{"<"}</button>
            {pageNumbers.map((number) => (<button key={number} className={`page ${currentPage === number ? "active" : ""}`} onClick={() => handlePageChange(number)}>{number}</button>))}
            <button className="arrow" onClick={handleNextPage} disabled={currentPage === totalPages || totalEntries === 0}>{">"}</button>
          </div>
        </div>
      </div>

      {showDeleteModal && (
        <div className="kmodal-overlay">
          <div className="kmodal-content">
            
            <div className="kmodal-icon-container"><ExclamationCircleIcon className="kmodal-icon" /></div>
            <h3 className="kmodal-title">Are you sure?</h3>
            <div className="kmodal-body">You will not be able to recover the deleted record!</div>
            <div className="kmodal-footer">
              <button className="kmodal-btn kdelete-confirm-btn" onClick={handleConfirmDelete}>Yes, Delete it!</button>
              <button className="kmodal-btn kcancel-btn" onClick={handleCancelDelete}>No, Cancel!</button>
            </div>
          </div>
        </div>
      )}

      {showAddEditModal && currentEditItem && (
        <div className="kmodal-overlay" style={{ justifyContent: 'flex-start', alignItems: 'flex-start', padding: '20px', boxSizing: 'border-box' }}>
          <div className="kmodal-content kadd-edit-modal-content" ref={modalRef} style={{ position: 'absolute', left: `${modalPosition.x}px`, top: `${modalPosition.y}px`, cursor: isDragging ? 'grabbing' : 'grab' }} onMouseDown={handleMouseDown}>
            <button className="kmodal-close-btn" onClick={handleCloseAddEditModal}><XIcon /></button>
            <h3 className="kadd-edit-modal-title">{currentEditItem.id === null ? "Add New Purchase" : "Edit Purchase"}</h3>
            <div className="kadd-edit-form-row">
              <div className="kadd-edit-form-group"><label htmlFor="modal-date">Date & Time</label><input type="datetime-local" id="modal-date" name="date" value={currentEditItem.date} onChange={handleAddEditInputChange} required /></div>
              <div className="kadd-edit-form-group"><label htmlFor="modal-ref">Reference No</label><input type="text" id="modal-ref" name="ref" value={currentEditItem.ref} onChange={handleAddEditInputChange} required /></div>
              <div className="kadd-edit-form-group"><label htmlFor="modal-status">Status</label><select id="modal-status" name="status" value={currentEditItem.status} onChange={handleAddEditInputChange} required><option value="Received">Received</option><option value="Pending">Pending</option><option value="Cancelled">Cancelled</option></select></div>
            </div>
            <div className="kadd-edit-form-row">
              <div className="kadd-edit-form-group"><label htmlFor="modal-supplier">Supplier</label><input type="text" id="modal-supplier" name="supplier" value={currentEditItem.supplier} onChange={handleAddEditInputChange} required /></div>
                          </div>
            <h4 className="kadd-edit-section-title">Products</h4>
            <div className="kadd-edit-form-row">
              <div className="kadd-edit-form-group">
                <label htmlFor="modal-products">Product Details (Simplified)</label>
                <textarea id="modal-products" name="products" value={currentEditItem.products} onChange={handleAddEditInputChange} placeholder="Enter product details (e.g., 'Laptop x 1, Mouse x 2')"></textarea>
              </div>
            </div>
            <div className="kadd-edit-form-row">
              <div className="kadd-edit-form-group"><label htmlFor="modal-total">Total</label><input type="number" id="modal-total" name="total" value={currentEditItem.total} onChange={handleAddEditInputChange} step="0.01" required /></div>
            </div>
            <h4 className="kadd-edit-section-title">Note</h4>
            <div className="kadd-edit-form-row">
              <div className="kadd-edit-form-group">
                <label htmlFor="kmodal-note">Note Content</label>
                <div className="krich-text-editor-toolbar">
                  <button type="button" onClick={() => handleRichTextCommand('bold')}><BoldIcon /></button>
                  <button type="button" onClick={() => handleRichTextCommand('italic')}><ItalicIcon /></button>
                  <button type="button" onClick={() => handleRichTextCommand('underline')}><UnderlineIcon /></button>
                  <button type="button" onClick={() => handleRichTextCommand('strikeThrough')}><StrikethroughIcon /></button>
                  <button type="button" onClick={() => handleRichTextCommand('insertOrderedList')}><OrderedListIcon /></button>
                  <button type="button" onClick={() => handleRichTextCommand('insertUnorderedList')}><BulletListIcon /></button>
                  <button type="button" onClick={() => handleRichTextCommand('justifyLeft')}><AlignLeftIcon /></button>
                  <button type="button" onClick={() => handleRichTextCommand('justifyCenter')}><AlignCenterIcon /></button>
                  <button type="button" onClick={() => handleRichTextCommand('justifyRight')}><AlignRightIcon /></button>
                  <button type="button" onClick={() => handleRichTextCommand('justifyFull')}><AlignJustifyIcon /></button>
                  <button type="button" onClick={() => handleRichTextCommand('subscript')}>X<sub>2</sub></button>
                  <button type="button" onClick={() => handleRichTextCommand('superscript')}>X<sup>2</sup></button>
                  <button type="button" onClick={() => handleRichTextCommand('fontSize', '4')}><TypeIcon /></button>
                  <button type="button" onClick={() => handleRichTextCommand('fontName', 'Sans Serif')}>Sans Serif</button>
                  <button type="button" onClick={() => handleRichTextCommand('createLink', 'link')}><LinkIcon /></button>
                  <button type="button" onClick={() => handleRichTextCommand('insertImage', 'image')}><ImageIcon /></button>
                  <button type="button" onClick={() => handleRichTextCommand('insertVideo', 'video')}><FilmIcon /></button>
                </div>
                <textarea
                  id="modal-note"
                  className="note-textarea"
                  value={currentEditItem.note}
                  onChange={handleAddEditInputChange}
                  name="note"
                  placeholder="Enter note content here..."
                  rows="4"
                ></textarea>
              </div>
            </div>
            <div className="kadd-edit-button-row">
              <button className="ksave-btn" onClick={handleSaveItem}><FaCheck /> Save</button>
              <button className="kcancel-add-edit-btn" onClick={handleCloseAddEditModal}><XIcon /> Cancel</button>
            </div>
          </div>
        </div>
      )}

      {showPaymentModal && currentPaymentItem && (
        <div className="kmodal-overlay" style={{ justifyContent: 'flex-start', alignItems: 'flex-start', padding: '20px', boxSizing: 'border-box' }}>
          <div className="kmodal-content kadd-edit-modal-content" ref={modalRef} style={{ position: 'absolute', left: `${modalPosition.x}px`, top: `${modalPosition.y}px`, cursor: isDragging ? 'grabbing' : 'grab' }} onMouseDown={handleMouseDown}>
            <button className="kmodal-close-btn" onClick={handleClosePaymentModal}><XIcon /></button>
            <h3 className="kadd-edit-modal-title">Add Payments</h3>
            <div className="kadd-edit-form-row">
              <div className="kadd-edit-form-group"><label htmlFor="payment-date">Date <span style={{ color: 'red' }}>*</span></label><input type="date" id="payment-date" name="date" value={currentPaymentItem.date} onChange={handlePaymentInputChange} required /></div>
              <div className="kadd-edit-form-group"><label htmlFor="payment-reference">Reference No</label><input type="text" id="payment-reference" name="referenceNo" value={currentPaymentItem.referenceNo} onChange={handlePaymentInputChange} /></div>
            </div>
            <div className="kadd-edit-form-row">
              <div className="kadd-edit-form-group"><label htmlFor="payment-amount">Amount <span style={{ color: 'red' }}>*</span></label><input type="number" id="payment-amount" name="amount" value={currentPaymentItem.amount} onChange={handlePaymentInputChange} step="0.01" required /></div>
              <div className="kadd-edit-form-group"><label htmlFor="payment-method">Payment Method <span style={{ color: 'red' }}>*</span></label><input type="text" id="payment-method" name="paymentMethod" value={currentPaymentItem.paymentMethod} onChange={handlePaymentInputChange} required /></div>
            </div>
            <div className="kadd-edit-form-row">
              <div className="kadd-edit-form-group"><label htmlFor="payment-file">File</label><input type="file" id="payment-file" name="file" onChange={handlePaymentInputChange} /></div>
            </div>
            <div className="kadd-edit-button-row">
              <button className="kcancel-add-edit-btn" onClick={handleClosePaymentModal}><XIcon /> Close</button>
              <button className="ksave-btn" onClick={handleSavePayment}><FaCheck /> Save</button>
            </div>
          </div>
        </div>
      )}

      {showPurchasePaymentsModal && currentPurchasePaymentsItem && (
        <div className="kmodal-overlay" style={{ justifyContent: 'flex-start', alignItems: 'flex-start', padding: '20px', boxSizing: 'border-box' }}>
          <div className="kmodal-content kadd-edit-modal-content" ref={modalRef} style={{ position: 'absolute', left: `${modalPosition.x}px`, top: `${modalPosition.y}px`, cursor: isDragging ? 'grabbing' : 'grab' }} onMouseDown={handleMouseDown}>
            <button className="kmodal-close-btn" onClick={handleClosePurchasePaymentsModal}><XIcon /></button>
            <h3 className="kadd-edit-modal-title">Purchase Payments for {currentPurchasePaymentsItem.purchaseRef}</h3>
            <table className="kpurchase-table">
              <thead><tr><th>Date</th><th>Reference No</th><th>Amount</th><th>Payment Method</th></tr></thead>
              <tbody>
                {currentPurchasePaymentsItem.payments.length > 0 ? (
                  currentPurchasePaymentsItem.payments.map((payment) => (
                    <tr key={payment.id}>
                      <td>{payment.date}</td><td>{payment.referenceNo}</td><td>{payment.amount}</td><td>{payment.paymentMethod}</td>
                    </tr>
                  ))
                ) : (<tr><td colSpan="4" style={{ textAlign: 'center', padding: '20px' }}>No payments found for this purchase.</td></tr>)}
              </tbody>
            </table>
            <div className="kadd-edit-button-row"><button className="kcancel-add-edit-btn" onClick={handleClosePurchasePaymentsModal}><XIcon /> Close</button></div>
          </div>
        </div>
      )}

      {showViewDetailsModal && currentViewItem && (
        <div className="kmodal-overlay" style={{ justifyContent: 'flex-start', alignItems: 'flex-start', padding: '20px', boxSizing: 'border-box' }}>
          <div className="kmodal-content kpurchase-details-modal-content" ref={modalRef} style={{ position: 'absolute', left: `${modalPosition.x}px`, top: `${modalPosition.y}px`, cursor: isDragging ? 'grabbing' : 'grab' }} onMouseDown={handleMouseDown}>
            <button className="kmodal-close-btn" onClick={handleCloseViewDetailsModal}><XIcon /></button>
            <h3 className="kadd-edit-modal-title purchase-details-modal-title">Purchase Details for {currentViewItem.ref}</h3>
            <div className="kdetail-card-row">
              <div className="kdetail-card">
                <h4 className="kdetail-card-title"><TruckIcon />Supplier</h4>
                <p className="kdetail-card-text">Location: <strong>{currentViewItem.supplierDetails.location}</strong></p>
                <p className="kdetail-card-text">Phone: <strong>{currentViewItem.supplierDetails.phone}</strong></p>
                <p className="kdetail-card-text">Email: <strong>{currentViewItem.supplierDetails.email}</strong></p>
              </div>
              <div className="kdetail-card">
                <h4 className="kdetail-card-title"><FileTextIcon />Reference</h4>
                <p className="kdetail-card-text">Time & Date: <strong>{currentViewItem.date}</strong></p>
                <p className="kdetail-card-text">Status: <strong className={`status ${currentViewItem.status.toLowerCase()}`}>{currentViewItem.status}</strong></p>
              </div>
            </div>
            <h4 className="kproduct-table-header">Product Details</h4>
            <table className="kpurchase-table">
              <thead><tr><th>Product</th><th>Unit Cost</th><th>Quantity</th><th>Discount</th><th>Taxes</th><th>Sub Total</th></tr></thead>
              <tbody>
                {currentViewItem.products && currentViewItem.products.length > 0 ? (
                  currentViewItem.products.map((product, index) => (
                    <tr key={index}>
                      <td>{product.name}</td>
                      <td>${parseFloat(product.unitCost).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                      <td>{product.quantity}</td>
                      <td>${parseFloat(product.discount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                      <td>${parseFloat(product.taxes).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                      <td>${parseFloat(product.subTotal).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                    </tr>
                  ))
                ) : (<tr><td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>No product details available.</td></tr>)}
              </tbody>
            </table>
            <div className="ksummary-section">
              <div className="ksummary-card">
                <div className="ksummary-item"><span>Created Date:</span><strong>{currentViewItem.createdDate}</strong></div>
                <div className="ksummary-item"><span>Sub Total:</span><strong>{currentViewItem.total}</strong></div>
                <div className="ksummary-item"><span>Tax Fee:</span><strong>$0.00</strong></div>
                <div className="ksummary-item"><span>Discount:</span><strong>$0.00</strong></div>
                <div className="ksummary-item ksummary-total"><span>Total:</span><strong>{currentViewItem.total}</strong></div>
                <div className="kprint-button-row"><button className="kprint-btn" onClick={() => window.print()}><PrintIcon /></button></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Purchase;