import React, { useEffect, useState, useRef } from "react";
import { FiEye, FiTrash2, FiPrinter, FiFileText } from "react-icons/fi";
import { FaShareFromSquare, FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { MdClear, MdEmail } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import { PiSliders } from "react-icons/pi";
import { IoMdArrowDropdown } from "react-icons/io";
import { FaUser, FaEnvelope, FaPhone, FaCalendar, FaCheck, FaPhoneAlt } from "react-icons/fa";
import { CiCircleAlert } from "react-icons/ci";
import "./PosOrders.css";

function PosOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [showShareDropdown, setShowShareDropdown] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [showPageDropdown, setShowPageDropdown] = useState(false);

  const shareRef = useRef(null);
  const addModalRef = useRef(null);
  const deleteModalRef = useRef(null);
  const recordButtonRef = useRef(null);
  const recordDropdownRef = useRef(null);

  const [filters, setFilters] = useState({
    orderId: "",
    status: "",
    customer: "",
    date: "",
  });

  const [paymentStatus, setPaymentStatus] = useState("Paid");
  const [orderStatus, setOrderStatus] = useState("Confirmed");

  // Placeholder for poscustomer.png
  const posCustomerImage = "https://placehold.co/40x40/cccccc/ffffff?text=User";

  useEffect(() => {
    // Fetch data from orders.json
    fetch('/orders1.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setOrders(data);
        setFilteredOrders(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching orders:', error);
        setLoading(false);
        // Fallback to empty array if fetch fails
        setOrders([]);
        setFilteredOrders([]);
      });

    const handleClickOutside = (event) => {
      if (shareRef.current && !shareRef.current.contains(event.target)) {
        setShowShareDropdown(false);
      }
      if (addModalRef.current && !addModalRef.current.contains(event.target)) {
        setShowViewModal(false);
      }
      if (deleteModalRef.current && !deleteModalRef.current.contains(event.target)) {
        setShowDeleteConfirmModal(false);
      }
      if (recordDropdownRef.current && recordButtonRef.current && !recordDropdownRef.current.contains(event.target) && !recordButtonRef.current.contains(event.target)) {
        setShowPageDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const totalPages = Math.ceil(filteredOrders.length / rowsPerPage);

  const goToFirstPage = () => setCurrentPage(1);
  const goToPage = (page) => setCurrentPage(page);
  const goToLastPage = () => setCurrentPage(totalPages);

  const displayedOrders = filteredOrders.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const toggleFilters = () => setShowFilters(!showFilters);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleSearch = () => {
    const filtered = orders.filter((o) =>
      Object.keys(filters).every((key) => {
        if (!filters[key]) return true;
        if (key === "date") {
          return o[key]?.includes(filters[key]);
        }
        return o[key]?.toString().toLowerCase().includes(filters[key].toLowerCase());
      })
    );
    setFilteredOrders(filtered);
    setCurrentPage(1);
  };

  const handleClear = () => {
    const cleared = Object.fromEntries(Object.keys(filters).map((key) => [key, ""]));
    setFilters(cleared);
    setFilteredOrders(orders);
    setCurrentPage(1);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExportXLS = () => {
    const csvContent = [
      ["Order ID", "Customer", "Amount", "Date", "Status"],
      ...filteredOrders.map((o) => [o.orderId, o.customer, o.amount, o.date, o.status]),
    ].map((row) => row.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "orders.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setPaymentStatus(order.paymentStatus || "Paid");
    setOrderStatus(order.status || "Confirmed");
    setShowViewModal(true);
  };

  const handleDeleteClick = (order) => {
    setOrderToDelete(order);
    setShowDeleteConfirmModal(true);
  };

  const handleConfirmDelete = () => {
    const updatedOrders = orders.filter((o) => o.orderId !== orderToDelete.orderId);
    setOrders(updatedOrders);
    setFilteredOrders(updatedOrders);
    setShowDeleteConfirmModal(false);
    setOrderToDelete(null);
    setCurrentPage(1);
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirmModal(false);
    setOrderToDelete(null);
  };

  const [showViewModal, setShowViewModal] = useState(false);

  return (
    <div className="dvsCouponContainer">
      <div className="dvsDEheader">
        <div className="dvsDEheader-content">
          <h1>PosOrder</h1>
          <div className="dvsDEbreadcrumb">
            <span className="dvsDEhome">Home</span> &gt;&gt; PosOrder
          </div>
        </div>
      </div>

      <div className="dvsCouponCard">
        <div className="dvsCouponHeader">
          <div className="dvsCouponHeaderButtons">
            <div className="dvsCouponDedropdownContainer">
              <button
                ref={recordButtonRef}
                className="dvsDevaDErecord-button"
                onClick={() => setShowPageDropdown(!showPageDropdown)}
                title="Records"
              >
                {rowsPerPage} <IoMdArrowDropdown size={17} />
              </button>
              {showPageDropdown && (
                <div ref={recordDropdownRef} className="dvsDevaDEdropdown-menu">
                  {[6, 12, 18, 24].map((num) => (
                    <div
                      key={num}
                      className="dvsDevaDEdropdown-item"
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
            <button className="dvsDevaDEaction-button" onClick={toggleFilters} title="Filter">
              <PiSliders size={17} />
            </button>
            <div className="dvsCouponDedropdownContainer" ref={shareRef}>
              <button
                className="dvsDevaDEaction-button"
                onClick={() => setShowShareDropdown(!showShareDropdown)}
                title="Share"
              >
                <FaShareFromSquare />
              </button>
              {showShareDropdown && (
                <div className="dvsDevaDEdropdown-menu">
                  <div className="dvsDevaDEdropdown-item" onClick={handlePrint}>
                    <FiPrinter /> Print
                  </div>
                  <div className="dvsDevaDEdropdown-item" onClick={handleExportXLS}>
                    <FiFileText /> XLS
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <hr className="dvsCouponHeaderDivider" />
        {showFilters && (
          <div className="dvsCouponFilterGrid">
            <div className="dvsCouponFilterRow">
              <div className="dvsCouponFilterField">
                <label>Order ID</label>
                <input
                  name="orderId"
                  value={filters.orderId}
                  onChange={handleInputChange}
                  placeholder=""
                  className="dvsDevaDEfilter-input"
                />
              </div>
              <div className="dvsCouponFilterField">
                <label>Status</label>
                <select
                  name="status"
                  value={filters.status}
                  onChange={handleInputChange}
                  className="dvsDevaDEfilter-input dvsDevaDEfilter-select"
                >
                  <option value="">Select status</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
              <div className="dvsCouponFilterField">
                <label>Customer</label>
                <input
                  name="customer"
                  value={filters.customer}
                  onChange={handleInputChange}
                  placeholder=""
                  className="dvsDevaDEfilter-input"
                />
              </div>
              <div className="dvsCouponFilterField">
                <label>Date</label>
                <input
                  name="date"
                  type="datetime-local"
                  value={filters.date}
                  onChange={handleInputChange}
                  className="dvsDevaDEfilter-input"
                />
              </div>
            </div>
            <div className="dvsCouponFilterButtons">
              <button className="dvsDevaDEsearch-button" onClick={handleSearch}>
                <CiSearch /> Search
              </button>
              <button className="dvsDevaDEclear-button" onClick={handleClear}>
                <MdClear /> Clear
              </button>
            </div>
          </div>
        )}
        <div className="dvsCouponTableContainer">
          <table className="dvsCouponTable">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6">Loading...</td>
                </tr>
              ) : displayedOrders.length === 0 ? (
                <tr>
                  <td colSpan="6">No entries found</td>
                </tr>
              ) : (
                displayedOrders.map((o, index) => (
                  <tr key={index}>
                    <td>{o.orderId}</td>
                    <td>{o.customer}</td>
                    <td>₹{o.amount}</td>
                    <td>{o.date}</td>
                    <td style={{ color: o.status === "Confirmed" ? "#22C55E" : o.status === "Pending" ? "#F59E0B" : "#F4415F" }}>
                      {o.status}
                    </td>
                    <td className="dvsCouponActionButtonsCell">
                      <button
                        className="dvsCouponActionBtn dvsCouponView"
                        onClick={() => handleViewOrder(o)}
                        aria-label={`View ${o.orderId}`}
                      >
                        <FiEye />
                      </button>
                      <button
                        className="dvsCouponActionBtn dvsCouponDelete"
                        onClick={() => handleDeleteClick(o)}
                        aria-label={`Delete ${o.orderId}`}
                      >
                        <FiTrash2 />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="dvsCouponPaginationContainer">
          <div>
            Showing {Math.min((currentPage - 1) * rowsPerPage + 1, filteredOrders.length)} to {Math.min(currentPage * rowsPerPage, filteredOrders.length)} out of {filteredOrders.length} entries
          </div>
          <div className="dvsCouponDepaginationButtons">
            <button
              className="dvsDevaDEpagination-button"
              onClick={goToFirstPage}
              disabled={currentPage === 1}
            >
              <FaAngleLeft size={10} color="black" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                className={`dvsDevaDEpagination-button ${page === currentPage ? 'dvsDevaDEactive' : ''}`}
                onClick={() => goToPage(page)}
              >
                {page}
              </button>
            ))}
            <button
              className="dvsDevaDEpagination-button"
              onClick={goToLastPage}
              disabled={currentPage === totalPages}
            >
              <FaAngleRight size={10} color="black" />
            </button>
          </div>
        </div>
      </div>
      {showViewModal && selectedOrder && (
        <div className="dvsCouponModalOverlay">
          <div className="dvsCouponModalContent dvsCouponViewModalContent" ref={addModalRef}>
            <button
              className="dvsCouponCloseButton"
              onClick={() => setShowViewModal(false)}
            >
              <MdClear />
            </button>
            <div className="dvsCouponViewOrderLayout">
              <div className="dvsCouponCard dvsCouponOrderIdContainer">
                <div className="dvsCouponOrderIdDetails">
                  {/* Row 1: ORDER ID: #2112025 Paid Confirmed inline */}
                  <div className="dvsOrder-id-row d-flex align-items-center mb-2">
                    <h6 className="dvsCouponOrderTitle mb-0 me-3">
                      ORDER ID: <span>#{selectedOrder.orderId}</span>
                    </h6>
                    <div className="d-flex align-items-center gap-2">
                      <span className="dvsCouponPaid text-success fw-bold">{paymentStatus}</span>
                      <span className="dvsCouponConfirmed text-primary fw-bold">{orderStatus}</span>
                    </div>
                  </div>

                  {/* Row 2: Date and Time */}
                  <div className="dvsCouponDate text-muted mb-2">
                    <FaCalendar className="me-1" />
                    {selectedOrder.date}
                  </div>

                  {/* Row 3: Payment Type */}
                  <div className="mb-2">
                    <strong>Payment Type:</strong> {selectedOrder.paymentType || "Cash"}
                  </div>

                  {/* Row 4: Order Type with buttons at the end with space */}
                  <div className="dvsOrder-type-row d-flex align-items-center">
                    <div className="me-auto">
                      <strong>Order Type:</strong> {selectedOrder.orderType || "Pos"}
                    </div>
                    <div className="dvsButton-group d-flex align-items-center">
                      <select
                        className="dvsOrder-status-select"
                        value={paymentStatus}
                        onChange={(e) => setPaymentStatus(e.target.value)}
                      >
                        <option value="Paid">Paid</option>
                        <option value="Unpaid">Unpaid</option>
                      </select>
                      <select
                        className="dvsOrder-status-select"
                        value={orderStatus}
                        onChange={(e) => setOrderStatus(e.target.value)}
                      >
                        <option value="Confirmed">Confirmed</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                      <button
                        className="dvsPrint-invoice-btn"
                        onClick={handlePrint}
                      >
                        <FiPrinter size={20} />PrintInvoice

                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="dvsCouponTwoColumnGrid">
                <div className="dvsCouponCard dvsCouponOrderDetails">
                  <h6 className="dvsCouponSectionTitle">Order Details</h6>
                  <hr />
                  <div className="dvsCouponProductRow">
                    <img
                      src={selectedOrder.image || "https://placehold.co/100x150/e0e0e0/ffffff?text=Product"}
                      alt="Product"
                      className="dvsCouponProductImage"
                    />
                    <div className="dvsCouponProductText">
                      <p className="dvsCouponProductName fw-semibold">
                        Wella Elements 2.0 Shampoo 1000 ML
                      </p>
                      <p className="dvsCouponProductPrice">
                        ₹{parseFloat(selectedOrder.amount || 0).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="dvsCouponCard dvsCouponSummary">
                  <div className="dvsCouponSummaryRow d-flex justify-content-between">
                    <span>Subtotal</span>
                    <span>₹{parseFloat(selectedOrder.amount || 0).toFixed(2)}</span>
                  </div>
                  <div className="dvsCouponSummaryRow d-flex justify-content-between">
                    <span>Tax Fee</span>
                    <span>₹0.00</span>
                  </div>
                  <div className="dvsCouponSummaryRow d-flex justify-content-between">
                    <span>Discount</span>
                    <span>₹0.00</span>
                  </div>
                  <hr />
                  <div className="dvsCouponSummaryTotal d-flex justify-content-between fw-bold">
                    <span>Total</span>
                    <span>₹{parseFloat(selectedOrder.amount || 0).toFixed(2)}</span>
                  </div>
                </div>
                <div className="dvsCouponCard dvsCouponInformation dvsCouponSpanTwoColumns">
                  <h6 className="dvsCouponSectionTitle">Information</h6>
                  <hr />
                  <div className="dvsCouponCustomerRow">
                    <img
                      src={posCustomerImage}
                      alt="User"
                      className="dvsCouponCustomerImg"
                    />
                    <span className="fw-semibold">Walking Customer</span>
                  </div>
                  <div className="dvsCouponCustomerContact d-flex align-items-center mb-1">
                    <MdEmail size={12} className="me-2" /> walkingcustomer@ex.com
                  </div>
                  <div className="dvsCouponCustomerContact d-flex align-items-center">
                    <FaPhoneAlt size={12} className="me-2" /> 1234567890
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {showDeleteConfirmModal && (
        <div className="dvsCouponModalOverlay">
          <div className="dvsCouponModalContent dvsCouponDeleteConfirmModal" ref={deleteModalRef}>
            <div className="dvsCouponDeleteIcon">
              <CiCircleAlert size={78} color="gold" />
            </div>
            <h2>Are you sure ?</h2>
            <p className="dvsCouponDeleteMessage">
              You will not be able to recover the deleted record!
            </p>
            <div className="dvsCouponDeleteButtons">
              <button
                className="dvsCouponDeleteConfirmBtn dvsCouponDeleteYes"
                onClick={handleConfirmDelete}
              >
                Yes, Delete it !
              </button>
              <button
                className="dvsCouponDeleteConfirmBtn dvsCouponDeleteNo"
                onClick={handleCancelDelete}
              >
                No, Cancel !
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PosOrders;