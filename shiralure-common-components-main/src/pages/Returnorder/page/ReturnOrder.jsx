import React, { useState, useEffect, useRef } from "react";
import {
  FiMail, FiPrinter, FiFileText, FiCheck, FiX, FiTrash2,
  FiEye
} from "react-icons/fi";
import { PiSliders } from "react-icons/pi";
import { IoIosSearch } from "react-icons/io";
import { FaShareFromSquare, FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import { IoMdSearch, IoMdArrowDropdown } from "react-icons/io";
import { MdClear } from "react-icons/md";
import { BiSolidAddToQueue } from 'react-icons/bi';
import ExcelJS from "exceljs";
import "../style/ReturnOrder.css";
import data from "./returnOrder.json";

function ReturnOrder() {
  const [showFilters, setShowFilters] = useState(false);
  const [emailFilter, setEmailFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [allReturnOrders, setAllReturnOrders] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showShareDropdown, setShowShareDropdown] = useState(false);
  const [showMailPage, setShowMailPage] = useState(false);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(9);
  const [currentPage, setCurrentPage] = useState(1);
  const [showPageDropdown, setShowPageDropdown] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteTargetIndex, setDeleteTargetIndex] = useState(null);
  const [showInvoiceModule, setShowInvoiceModule] = useState(false);
  const [invoiceData, setInvoiceData] = useState({
    date: "",
    referenceNo: "",
    customer: "",
    products: [],
  });
  const [reason, setReason] = useState("");

  const shareButtonRef = useRef(null);
  const shareDropdownRef = useRef(null);
  const recordButtonRef = useRef(null);
  const recordDropdownRef = useRef(null);
  const reasonEditableRef = useRef(null);

  useEffect(() => {
    setFilteredList(data);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    setAllReturnOrders(data);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showShareDropdown &&
        shareDropdownRef.current &&
        !shareDropdownRef.current.contains(event.target) &&
        shareButtonRef.current &&
        !shareButtonRef.current.contains(event.target)
      ) {
        setShowShareDropdown(false);
      }
    };
    if (showShareDropdown) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showShareDropdown]);

  useEffect(() => {
    const handleClickOutsideRecord = (event) => {
      if (
        showPageDropdown &&
        recordDropdownRef.current &&
        !recordDropdownRef.current.contains(event.target) &&
        recordButtonRef.current &&
        !recordButtonRef.current.contains(event.target)
      ) {
        setShowPageDropdown(false);
      }
    };
    if (showPageDropdown) document.addEventListener("mousedown", handleClickOutsideRecord);
    return () => document.removeEventListener("mousedown", handleClickOutsideRecord);
  }, [showPageDropdown]);

  const toggleFilters = () => setShowFilters(!showFilters);
  const toggleShareDropdown = () => setShowShareDropdown(!showShareDropdown);
  const toggleMailPage = () => setShowMailPage(!showMailPage);
  const toggleInvoiceModule = () => setShowInvoiceModule(!showInvoiceModule);

  const handleSearch = () => {
    const filtered = allReturnOrders.filter((sub) =>
      sub.email.toLowerCase().includes(emailFilter.toLowerCase()) &&
      sub.date.toLowerCase().includes(dateFilter.toLowerCase())
    );
    setFilteredList(filtered);
    setCurrentPage(1);
  };

  const handleClear = () => {
    setEmailFilter("");
    setDateFilter("");
    setFilteredList(allReturnOrders);
    setCurrentPage(1);
  };

  const handlePrint = () => {
    const originalRowsPerPage = rowsPerPage;
    setRowsPerPage(filteredList.length);
    setCurrentPage(1);
    setTimeout(() => {
      window.print();
      setRowsPerPage(originalRowsPerPage);
    }, 0);
  };

  const handleExportXLS = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("ReturnOrders");
    worksheet.columns = [
      { header: "Customer", key: "email", width: 30 },
      { header: "Date", key: "date", width: 20 },
      { header: "Reference No", key: "referenceNo", width: 15 },
      { header: "Total", key: "total", width: 15 },
      { header: "Reason", key: "reason", width: 20 },
    ];
    filteredList.forEach((sub) => {
      worksheet.addRow({
        email: sub.email,
        date: formatDateForDisplay(sub.date),
        referenceNo: sub.referenceNo,
        total: sub.total,
        reason: sub.reason,
      });
    });
    worksheet.getRow(1).font = { bold: true };
    worksheet.getRow(1).fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFF2F2F2" },
    };
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "ReturnOrders.xlsx";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const clearMailForm = () => {
    setSubject("");
    setMessage("");
  };

  const saveMail = () => {
    if (!subject.trim() || !message.trim()) {
      alert("Both Subject and Message are required.");
      return;
    }
    alert(`Saved message:\nSubject: ${subject}\nMessage: ${message}`);
  };

  const handleEyeClick = (order) => setSelectedOrder(order);
  const handleDeleteClick = (index) => {
    const globalIndex = (currentPage - 1) * rowsPerPage + index;
    setDeleteTargetIndex(0);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (deleteTargetIndex !== null && deleteTargetIndex < allReturnOrders.length) {
      const updated = [...allReturnOrders];
      updated.splice(deleteTargetIndex, 1);
      setAllReturnOrders(updated);
      setFilteredList(updated);
      setDeleteTargetIndex(null);
      setShowDeleteConfirm(false);
      if (paginate().length === 1 && currentPage > 1) setCurrentPage(currentPage - 1);
    }
  };

  const closeModal = () => {
    setDeleteTargetIndex(null);
    setShowDeleteConfirm(false);
  };

  const totalPages = Math.ceil(filteredList.length / rowsPerPage);
  const goToPage = (page) => setCurrentPage(page);
  const goToFirstPage = () => setCurrentPage(1);
  const goToLastPage = () => setCurrentPage(totalPages);

  const paginate = () => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return filteredList.slice(startIndex, endIndex);
  };

  const formatDateForDisplay = (dateString) => {
    if (!dateString) return "";
    const [time, date] = dateString.split(", ");
    const match = time.match(/(\d+):(\d+)([AP]M)/);
    if (!match) return dateString;
    const [, hours, minutes, ampm] = match;
    const [day, month, year] = date.split("-");
    const dateObj = new Date(`${year}-${month}-${day}T${hours}:${minutes}:00`);
    if (isNaN(dateObj.getTime())) return dateString;
    const formattedMonth = String(dateObj.getMonth() + 1).padStart(2, "0");
    const formattedDay = String(dateObj.getDate()).padStart(2, "0");
    const formattedYear = dateObj.getFullYear();
    let formattedHours = dateObj.getHours();
    const formattedMinutes = String(dateObj.getMinutes()).padStart(2, "0");
    const finalAmpm = formattedHours >= 12 ? "PM" : "AM";
    formattedHours = formattedHours % 12 || 12;
    return `${formattedMonth}/${formattedDay}/${formattedYear} ${String(formattedHours).padStart(2, "0")}:${formattedMinutes} ${finalAmpm}`;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInvoiceData({ ...invoiceData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setInvoiceData({
      ...invoiceData,
      attachment: file ? file : null,
      attachmentName: file ? file.name : ""
    });
  };

  const handleAddProduct = () => {
    if (invoiceData.date && invoiceData.customer) {
      setInvoiceData({
        ...invoiceData,
        products: [...invoiceData.products, { product: "", unitCost: 0, quantity: 0, discount: 0, taxes: 0, subtotal: 0 }],
      });
    } else {
      alert("Please fill Date and Customer before adding products.");
    }
  };

  const handleDeleteProduct = (index) => {
    const updatedProducts = [...invoiceData.products];
    updatedProducts.splice(index, 1);
    setInvoiceData({ ...invoiceData, products: updatedProducts });
  };

  const handleProductChange = (index, e) => {
    const { name, value } = e.target;
    const updatedProducts = [...invoiceData.products];
    updatedProducts[index] = { ...updatedProducts[index], [name]: value };
    updatedProducts[index].subtotal = (updatedProducts[index].unitCost * updatedProducts[index].quantity) - updatedProducts[index].discount + updatedProducts[index].taxes;
    setInvoiceData({ ...invoiceData, products: updatedProducts });
  };

  const handleClearInvoice = () => {
    setInvoiceData({ date: "", referenceNo: "", customer: "", attachment: null, products: [] });
    setReason("");
  };

  const handleSaveInvoice = () => {
    console.log("Invoice Data:", { ...invoiceData, reason });
    alert("Invoice saved!");
    setShowInvoiceModule(false);
  };

  // Enhanced applyFormatting with focus and selection handling
  const applyFormatting = (command, value = null) => {
    if (reasonEditableRef.current) {
      reasonEditableRef.current.focus();
      const selection = window.getSelection();
      if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        if (!range.collapsed) {
          document.execCommand(command, false, value);
        } else {
          // If no text is selected, insert the command effect at cursor
          const span = document.createElement("span");
          if (command === "bold") span.style.fontWeight = "bold";
          else if (command === "italic") span.style.fontStyle = "italic";
          else if (command === "underline") span.style.textDecoration = "underline";
          else if (command === "strikeThrough") span.style.textDecoration = "line-through";
          else if (command === "insertText" && value) span.innerHTML = value;
          else if (command === "createLink") {
            const url = prompt("Enter the URL:");
            if (url) document.execCommand(command, false, url);
            return;
          }
          range.insertNode(span);
          range.selectNodeContents(span);
          selection.removeAllRanges();
          selection.addRange(range);
        }
        setReason(reasonEditableRef.current.innerHTML);
      }
    }
  };

  const handleFocusReason = () => {
    if (reasonEditableRef.current) {
      reasonEditableRef.current.focus();
    }
  };

  const toolbarIcons = [
    { label: "B", command: "bold" }, // Bold
    { label: "I", command: "italic" }, // Italic
    { label: "U", command: "underline" }, // Underline
    { label: "S", command: "strikeThrough" }, // Strikethrough
    { label: "H1", command: "formatBlock", value: "h1" }, // Heading/Title
    { label: "¶", command: "formatBlock", value: "p" }, // Paragraph
    { label: "≡L", command: "justifyLeft" }, // Align Justify Left
    { label: "≡C", command: "justifyCenter" }, // Align Justify Center
    { label: "≡R", command: "justifyRight" }, // Align Justify Right
    { label: "•", command: "insertUnorderedList" }, // Bullet List
    { label: "1.", command: "insertOrderedList" }, // Numbered List
    { label: "→", command: "indent" }, // Indent
    { label: "←", command: "outdent" }, // Outdent
    { label: "Sans", command: "fontName", value: "sans-serif" }, // Font Sans-Serif
    { label: "Normal", command: "removeFormat" }, // Unstyled/Normal
    { label: "img", command: "insertImage" }, // Insert Image
    { label: "vdo", command: "insertHTML", value: "<video></video>" }, // Insert Video
    { label: "link", command: "createLink" }, // Insert Link
  ];

  return (
    <div className="psubscriber">
      <div className="pheader">
        <div className="pheader-content">
          <h1>Return Orders</h1>
          <div className="pbreadcrumb">
            <span className="phome">Home</span>Return Orders
          </div>
        </div>
      </div>

      <div className="pmain-container">
        <div className="paction-bar">
          <div className="pdropdown-container">
            <button
              ref={recordButtonRef}
              className="precord-button"
              onClick={() => setShowPageDropdown(!showPageDropdown)}
              title="Records"
            >
              {rowsPerPage}
              <IoMdArrowDropdown size={17} />
            </button>
            {showPageDropdown && (
              <div ref={recordDropdownRef} className="pdropdown-menu">
                {[5, 10, 15, 20].map((num) => (
                  <div
                    key={num}
                    className="pdropdown-item"
                    onClick={() => {
                      setRowsPerPage(num);
                      setShowPageDropdown(false);
                      setCurrentPage(1);
                    }}
                  >
                    {num}
                  </div>
                ))}
              </div>
            )}
          </div>
          <button
            className="paction-button pfilter-button"
            onClick={toggleFilters}
            title="Filter"
          >
            <PiSliders size={17} />
          </button>
          <div className="pdropdown-container">
            <button
              ref={shareButtonRef}
              className="paction-button pshare-button"
              onClick={toggleShareDropdown}
              title="Share"
            >
              <FaShareFromSquare size={17} />
            </button>
            {showShareDropdown && (
              <div ref={shareDropdownRef} className="pdropdown-menu">
                <div className="pdropdown-item" onClick={handlePrint}>
                  <FiPrinter size={27} color="white" /> Print
                </div>
                <div className="pdropdown-item" onClick={handleExportXLS}>
                  <FiFileText size={27} color="white" /> XLS
                </div>
              </div>
            )}
          </div>
          <button
            className="paction-button pmessage-button"
            onClick={toggleInvoiceModule}
            title="Add Invoice"
          >
            <BiSolidAddToQueue size={20} />
          </button>
        </div>

        <hr className="pdivider" />

        {showFilters && (
          <div className="pfilter-container">
            <div className="pfilter-row">
              <div className="pfilter-group">
                <label className="pfilter-label">Customer</label>
                <input type="text" className="pfilter-input" />
              </div>
              <div className="pfilter-group">
                <label className="pfilter-label">Date</label>
                <div className="pdate-time-picker">
                  <input
                    type="datetime-local"
                    className="pfilter-input pdate-input"
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                  />
                </div>
              </div>
              <div className="pfilter-group">
                <label className="pfilter-label">Reference No</label>
                <input type="text" className="pfilter-input" />
              </div>
            </div>
            <div className="pfilter-row">
              <div className="pfilter-group">
                <label className="pfilter-label">Total</label>
                <input className="pfilter-input" type="text" />
              </div>
              <div className="pfilter-group">
                <label className="pfilter-label">Reason</label>
                <input className="pfilter-input" type="text" />
              </div>
            </div>
            <div className="pfilter-buttons">
              <button className="psearch-button" onClick={handleSearch}>
                Search<IoIosSearch />
              </button>
              <button className="pclear-button" onClick={handleClear}>
                Clear<MdClear />
              </button>
            </div>
          </div>
        )}

        {isLoading ? (
          <div className="ploading">Loading subscribers...</div>
        ) : (
          <div id="printable-table">
            <table className="psubscriber-table">
              <thead>
                <tr>
                  <th>CUSTOMER</th>
                  <th>Date</th>
                  <th>Reference No</th>
                  <th>Total</th>
                  <th>Reason</th>
                  <th className="paction-column">Action</th>
                </tr>
              </thead>
              <tbody>
                {paginate().length > 0 ? (
                  paginate().map((sub, index) => (
                    <tr key={index}>
                      <td>{sub.email}</td>
                      <td>{formatDateForDisplay(sub.date)}</td>
                      <td>{sub.referenceNo}</td>
                      <td>{sub.total}</td>
                      <td>{sub.reason}</td>
                      <td className="paction-column">
                        <div className="paction-icons">
                          <div className="peye-icon" onClick={() => handleEyeClick(sub)}>
                            <FiEye color="#5A66F1" />
                          </div>
                          <div className="pdelete-icon" onClick={() => handleDeleteClick(index)}>
                            <FiTrash2 color="#F4415F" />
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6">No results found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        <div className="ppagination">
          <div className="ppagination-info">
            Showing {Math.min((currentPage - 1) * rowsPerPage + 1, filteredList.length)} to{" "}
            {Math.min(currentPage * rowsPerPage, filteredList.length)} of {filteredList.length} entries
          </div>
          <div className="ppagination-buttons">
            <button
              className="ppagination-button"
              onClick={goToFirstPage}
              disabled={currentPage === 1}
            >
              <FaAngleLeft color="black" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                className={`ppagination-button ${page === currentPage ? 'pactive' : ''}`}
                onClick={() => goToPage(page)}
              >
                {page}
              </button>
            ))}
            <button
              className="ppagination-button"
              onClick={goToLastPage}
              disabled={currentPage === totalPages}
            >
              <FaAngleRight color="black" />
            </button>
          </div>
        </div>
      </div>

      {showInvoiceModule && (
        <div className="pmodal-overlay">
          <div className="pinvoice-modal">
            <div className="pheader2">
              <h2>Return Order</h2>
              <button className="pclose-btn" onClick={() => setShowInvoiceModule(false)}>✖</button>
            </div>
            <div className="pform-group">
              <div className="pdate-time-picker1">
                <input
                  type="datetime-local"
                  name="date"
                  value={invoiceData.date}
                  onChange={handleInputChange}
                  placeholder="Date"
                  required
                  className="pfilter-input pdate-input1"
                />
              </div>
              <input
                type="text"
                name="referenceNo"
                value={invoiceData.referenceNo}
                onChange={handleInputChange}
                placeholder="Reference No"
              />
            </div>
            <div className="pform-group">
              <input
                type="text"
                name="customer"
                value={invoiceData.customer}
                onChange={handleInputChange}
                placeholder="Customer"
                required
              />
              <div className="pattachment">
                <input type="file" onChange={handleFileChange} id="attachment-input" />
                <label htmlFor="attachment-input" className="pattachment-label">Choose file</label>
                <input type="text" name="attachmentName" value={invoiceData.attachmentName || ""} readOnly />
              </div>
            </div>
            <div className="pproduct-section">
              <p>Please select these before adding any product</p>
              <select onChange={handleAddProduct} value="">
                <option value="" disabled>Select one</option>
                <option value="add">Add Products</option>
              </select>
            </div>
            <table className="pproduct-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Unit Cost</th>
                  <th>Quantity</th>
                  <th>Discount</th>
                  <th>Taxes</th>
                  <th>Subtotal</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {invoiceData.products.map((product, index) => (
                  <tr key={index}>
                    <td><input type="text" name="product" value={product.product} onChange={(e) => handleProductChange(index, e)} /></td>
                    <td><input type="number" name="unitCost" value={product.unitCost} onChange={(e) => handleProductChange(index, e)} /></td>
                    <td><input type="number" name="quantity" value={product.quantity} onChange={(e) => handleProductChange(index, e)} /></td>
                    <td><input type="number" name="discount" value={product.discount} onChange={(e) => handleProductChange(index, e)} /></td>
                    <td><input type="number" name="taxes" value={product.taxes} onChange={(e) => handleProductChange(index, e)} /></td>
                    <td>{Number(product.subtotal || 0).toFixed(2)}</td>
                    <td><button className="pdelete-btn" onClick={() => handleDeleteProduct(index)}>Delete</button></td>
                  </tr>
                ))}
                <tr>
                  <td colSpan="5">Total</td>
                  <td>
                    {Number(
                      invoiceData.products.reduce((sum, p) => sum + (parseFloat(p.subtotal) || 0), 0)
                    ).toFixed(2)}
                  </td>
                  <td></td>
                </tr>
              </tbody>
            </table>
            <div className="preason-section" onClick={handleFocusReason}>
              <label onClick={handleFocusReason}>Reason</label>
              <div className="toolbar inline-toolbar" onClick={handleFocusReason}>
                {toolbarIcons.map((icon, index) => (
                  <span
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      applyFormatting(icon.command, icon.value);
                    }}
                    className="toolbar-label"
                  >
                    {icon.label}
                  </span>
                ))}
              </div>
              <div
                ref={reasonEditableRef}
                contentEditable={true}
                onInput={(e) => setReason(e.currentTarget.innerHTML)}
                dangerouslySetInnerHTML={{ __html: reason }}
                placeholder="Insert content here..."
                className="editable-textarea"
              />
            </div>
            <button className="psave-btn" onClick={handleSaveInvoice}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5"/>
              </svg>
              Save
            </button>
          </div>
        </div>
      )}

      {showMailPage && (
        <div className="pmodal-overlay">
          <div className="pmodal">
            <div className="pmodal-header">
              <span className="pmodal-header" onClick={toggleMailPage}>
                <FiX />
                <h2>ReturnOrders</h2>
              </span>
            </div>
            <label className="pmodal-label">
              Subject <span className="prequired">*</span>
            </label>
            <input
              className="pmodal-input"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
            <label className="pmodal-label">
              Message <span className="prequired">*</span>
            </label>
            <textarea
              rows="5"
              className="pmodal-textarea"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <div className="pmodal-buttons">
              <button
                className="psave-button"
                onClick={saveMail}
              >
                <FiCheck /> Save
              </button>
              <button
                className="pclear-button1"
                onClick={clearMailForm}
              >
                <FiX /> Clear
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedOrder && (
        <div className="pmodal-overlay">
          <div className="porder-details-modal">
            <span className="pmodal-close" onClick={() => setSelectedOrder(null)}>
              <FiX />
            </span>
            <div className="pmodal-header">
              <h3>Order Details</h3>
            </div>
            <div className="porder-details-content">
              <div className="porder-info">
                <h3></h3>
                <ul>
                  <li><strong>Order ID:</strong> #{selectedOrder.orderId}</li>
                  <li><strong>Customer Name:</strong> {selectedOrder.email}</li>
                  <li><strong>Customer Contact:</strong> {selectedOrder.customerContact}</li>
                  <li><strong>Order Date:</strong> {selectedOrder.orderDate}</li>
                  <li><strong>Delivery Date:</strong> {selectedOrder.deliveryDate}</li>
                </ul>
                <br />
                <h3>Product Details</h3>
                <ul>
                  <li><strong>Product Name:</strong> {selectedOrder.productName}</li>
                  <li><strong>Product SKU:</strong> {selectedOrder.productSKU}</li>
                  <li><strong>Size:</strong> {selectedOrder.size}</li>
                  <li><strong>Color:</strong> {selectedOrder.color}</li>
                  <li><strong>Quantity:</strong> {selectedOrder.quantity}</li>
                </ul>
                <br />
                <h3>Return Request Details</h3>
                <ul>
                  <li><strong>Return Request ID:</strong> {selectedOrder.returnRequestId}</li>
                  <li><strong>Return Request Date:</strong> {selectedOrder.returnRequestDate}</li>
                  <li><strong>Reason for Return:</strong> {selectedOrder.reason}</li>
                  <li><strong>Customer Complaint:</strong> “{selectedOrder.customerComplaint}”</li>
                </ul>
              </div>
              <div className="porder-image">
                <img src={selectedOrder.productImage} alt="Product" />
              </div>
            </div>
            <div className="pprint-button-container">
              <button className="pprint-button" onClick={handlePrint}>
                <FiPrinter /> Print
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeleteConfirm && (
        <div className="pmodal-overlay">
          <div className="pmodal-box">
            <div className="pmodal-icon">
              <span className="pexclamation-icon">!</span>
            </div>
            <h2 className="pmodal-title">Are you sure ?</h2>
            <p className="pmodal-message">
              You will not be able to recover the deleted record!
            </p>
            <div className="pmodal-buttons">
              <button className="pmodal-button pdelete-button" onClick={confirmDelete}>
                Yes, Delete it !
              </button>
              <button className="pmodal-button pcancel-button" onClick={closeModal}>
                No, Cancel !
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ReturnOrder;