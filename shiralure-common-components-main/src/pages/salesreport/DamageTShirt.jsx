import React, { useState, useEffect, useRef } from "react";
import {
  FiPrinter, FiFileText, FiCheck, FiX,FiSliders 
} from "react-icons/fi";
import { FaShareFromSquare, FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import { IoMdSearch, IoMdArrowDropdown } from "react-icons/io";
import { MdClear } from "react-icons/md";
import { BsCalendar2Date } from "react-icons/bs";
import ExcelJS from "exceljs";
import "./DamageTShirt.css";

const PaymentStatusBadge = ({ status }) => {
  const statusClasses = {
    Paid: "dspbadge dspbg-success",
    Unpaid: "dspbadge dspbg-danger",
    Pending: "dspbadge dspbg-warning",
    Refunded: "dspbadge dspbg-info",
    "Partially Paid": "dspbadge dspbg-warning", // Ensure Partially Paid uses warning (orange)
  };

  return (
    <span className={`dspbadge ${statusClasses[status] || 'dspbg-secondary'}`}>
      {status}
    </span>
  );
};

export default function DamageTShirt() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editedOrder, setEditedOrder] = useState({});
  const [showShareDropdown, setShowShareDropdown] = useState(false);
  const [showFilterForm, setShowFilterForm] = useState(false);
  const [searchFilters, setSearchFilters] = useState({
    OrderId: "",
    Date: "",
    PaymentStatus: "",
    PaymentType: "",
  });
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);
  const [showPageDropdown, setShowPageDropdown] = useState(false);

  const shareButtonRef = useRef(null);
  const shareDropdownRef = useRef(null);
  const recordButtonRef = useRef(null);
  const recordDropdownRef = useRef(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("/OrderData.json");
        const data = await response.json();
        setOrders(data);
        setFilteredOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrders();
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

    if (showShareDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
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

    if (showPageDropdown) {
      document.addEventListener("mousedown", handleClickOutsideRecord);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideRecord);
    };
  }, [showPageDropdown]);

  const toggleFilters = () => setShowFilterForm(!showFilterForm);
  const toggleShareDropdown = () => setShowShareDropdown(!showShareDropdown);

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearchOrder = () => {
    const filtered = orders.filter((order) => {
      return (
        (searchFilters.OrderId === "" ||
          order.OrderId.toLowerCase().includes(searchFilters.OrderId.toLowerCase())) &&
        (searchFilters.Date === "" ||
          order.Date.toLowerCase().includes(searchFilters.Date.toLowerCase())) &&
        (searchFilters.PaymentStatus === "" ||
          order.PaymentStatus === searchFilters.PaymentStatus) &&
        (searchFilters.PaymentType === "" ||
          order.PaymentType === searchFilters.PaymentType)
      );
    });
    setFilteredOrders(filtered);
    setCurrentPage(1);
  };

  const handleClearSearch = () => {
    setSearchFilters({
      OrderId: "",
      Date: "",
      PaymentStatus: "",
      PaymentType: "",
    });
    setFilteredOrders(orders);
    setCurrentPage(1);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedOrder((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveEdit = (id) => {
    const updatedOrders = orders.map((order) =>
      order.id === id ? { ...editedOrder } : order
    );
    setOrders(updatedOrders);
    setFilteredOrders(updatedOrders);
    setEditingId(null);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  const handlePrint = () => {
    const originalRowsPerPage = rowsPerPage;
    setRowsPerPage(filteredOrders.length);
    setCurrentPage(1);
    setTimeout(() => {
      window.print();
      setRowsPerPage(originalRowsPerPage);
    }, 0);
  };

  const handleExportXLS = async () => {
    try {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("Orders");

      worksheet.columns = [
        { header: "Order ID", key: "OrderId", width: 15 },
        { header: "Date", key: "Date", width: 20 },
        { header: "Total", key: "Total", width: 10 },
        { header: "Discount", key: "Discount", width: 10 },
        { header: "Shipping Charge", key: "ShippingCharge", width: 15 },
        { header: "Payment Type", key: "PaymentType", width: 15 },
        { header: "Payment Status", key: "PaymentStatus", width: 15 },
      ];

      filteredOrders.forEach((order) => {
        worksheet.addRow({
          OrderId: order.OrderId,
          Date: formatDateForDisplay(order.Date),
          Total: `$${order.Total}`,
          Discount: `$${order.Discount}`,
          ShippingCharge: `$${order.ShippingCharge}`,
          PaymentType: order.PaymentType,
          PaymentStatus: order.PaymentStatus,
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
      a.download = "orders.xlsx";
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error exporting to XLS:", error);
      alert("Failed to export to XLS. Please try again.");
    }
  };

  const totalPages = Math.ceil(filteredOrders.length / rowsPerPage);
  const goToPage = (page) => setCurrentPage(page);
  const goToFirstPage = () => setCurrentPage(1);
  const goToLastPage = () => setCurrentPage(totalPages);

  const formatDateForDisplay = (dateString) => {
    if (!dateString) return "";
    // Example input: "01:17PM, 23-12-2024" or ISO format from datetime-local
    let dateObj;
    if (dateString.includes(",")) {
      const [time, date] = dateString.split(", ");
      const match = time.match(/(\d+):(\d+)([AP]M)/);
      if (!match) return dateString;
      const [, hours, minutes, ampm] = match;
      const [day, month, year] = date.split("-");
      dateObj = new Date(`${year}-${month}-${day}T${hours}:${minutes}:00`);
    } else {
      dateObj = new Date(dateString);
    }
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

  const paginate = () => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return filteredOrders.slice(startIndex, endIndex);
  };

  return (
    <div className="dspDEsubscriber">
      <div className="dspDEheader">
        <div className="dspDEheader-content">
          <h1>Sales Report</h1>
          <div className="dspDEbreadcrumb">
            <span className="dspDEhome">Home</span> &gt;&gt; Sales Report
          </div>
        </div>
      </div>

      <div className="dspDEmain-container">
        <div className="dspDEaction-bar">
          <div className="dspDEdropdown-container">
            <button
              ref={recordButtonRef}
              className="dspDErecord-button"
              onClick={() => setShowPageDropdown(!showPageDropdown)}
              title="Records"
            >
              {rowsPerPage}
              <IoMdArrowDropdown size={17} />
            </button>
            {showPageDropdown && (
              <div ref={recordDropdownRef} className="dspDEdropdown-menu">
                {[6, 10, 20].map((num) => (
                  <div
                    key={num}
                    className="dspDEdropdown-item"
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
            className="dspDEaction-button dspDEfilter-button"
            onClick={toggleFilters}
            title="Filter"
          >
            <FiSliders  size={17} />
          </button>
          <div className="dspDEdropdown-container">
            <button
              ref={shareButtonRef}
              className="dspDEaction-button dspDEshare-button"
              onClick={toggleShareDropdown}
              title="Share"
            >
              <FaShareFromSquare size={17} />
            </button>
            {showShareDropdown && (
              <div ref={shareDropdownRef} className="dspDEdropdown-menu">
                <div className="dspDEdropdown-item" onClick={handlePrint}>
                  <FiPrinter size={27} color="white" /> Print
                </div>
                <div className="dspDEdropdown-item" onClick={handleExportXLS}>
                  <FiFileText size={27} color="white" /> XLS
                </div>
              </div>
            )}
          </div>
        </div>

        <hr className="dspDEdivider" />

        {showFilterForm && (
          <div className="dspDEfilter-container">
            <div className="dspDEfilter-fields">
              <div className="dspDEfilter-group">
                <label className="dspDEfilter-label">Order ID</label>
                <input
                  className="dspDEfilter-input"
                  name="OrderId"
                  value={searchFilters.OrderId}
                  onChange={handleSearchChange}
                  placeholder=" "
                />
              </div>
              <div className="dspDEfilter-group">
                <label className="dspDEfilter-label">Date</label>
                <div className="dspDEdate-input-wrapper">
                  <input
                    type="datetime-local"
                    className="dspDEfilter-input dspDEdate-input"
                    name="Date"
                    value={searchFilters.Date}
                    onChange={handleSearchChange}
                  />
                </div>
              </div>
              <div className="dspDEfilter-group">
                <label className="dspDEfilter-label">Payment Status</label>
                <select
                  className="dspDEfilter-input"
                  name="PaymentStatus"
                  value={searchFilters.PaymentStatus}
                  onChange={handleSearchChange}
                >
                  <option value=""></option>
                  <option value="Paid">Paid</option>
                  <option value="Unpaid">Unpaid</option>
                  <option value="Partially Paid" >Partially Paid</option>
                </select>
              </div>
              <div className="dspDEfilter-group">
                <label className="dspDEfilter-label">Payment Type</label>
                <select
                  className="dspDEfilter-input"
                  name="PaymentType"
                  value={searchFilters.PaymentType}
                  onChange={handleSearchChange}
                >
                  <option value=""></option>
                  <option value="UPI">UPI</option>
                  <option value="Credit Card">Credit Card</option>
                  <option value="Cash">Cash</option>
                  <option value="Net Banking">Net Banking</option>
                </select>
              </div>
            </div>
            <div className="dspDEfilter-buttons">
              <button className="dspDEsearch-button" onClick={handleSearchOrder}>
                <IoMdSearch /> Search
              </button>
              <button className="dspDEclear-button" onClick={handleClearSearch}>
                <MdClear /> Clear
              </button>
            </div>
          </div>
        )}

        {isLoading ? (
          <div className="dspDEloading">Loading orders...</div>
        ) : (
          <div id="printable-table">
            <table className="dspDEsubscriber-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Date</th>
                  <th>Total</th>
                  <th>Discount</th>
                  <th>Shipping Charge</th>
                  <th>Payment Type</th>
                  <th>Payment Status</th>
                </tr>
              </thead>
              <tbody>
                {paginate().length > 0 ? (
                  paginate().map((order) => (
                    <tr>
                      {editingId === order.id ? (
                        <>
                          <td>
                            <input
                              type="text"
                              name="OrderId"
                              value={editedOrder.OrderId}
                              onChange={handleEditChange}
                              className="dspDEmodal-input"
                            />
                          </td>
                          <td>
                            <div className="dspDEdate-input-wrapper">
                              <input
                                type="datetime-local"
                                name="Date"
                                value={editedOrder.Date}
                                onChange={handleEditChange}
                                className="dspDEmodal-input dspDEdate-input"
                                placeholder="Select Date and Time"
                              />
                              <BsCalendar2Date className="dspDEcalendar-icon" />
                            </div>
                          </td>
                          <td>
                            <input
                              type="number"
                              name="Total"
                              value={editedOrder.Total}
                              onChange={handleEditChange}
                              className="dspDEmodal-input"
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              name="Discount"
                              value={editedOrder.Discount}
                              onChange={handleEditChange}
                              className="dspDEmodal-input"
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              name="ShippingCharge"
                              value={editedOrder.ShippingCharge}
                              onChange={handleEditChange}
                              className="dspDEmodal-input"
                            />
                          </td>
                          <td>
                            <select
                              name="PaymentType"
                              value={editedOrder.PaymentType}
                              onChange={handleEditChange}
                              className="dspDEmodal-input"
                            >
                              <option value="UPI">UPI</option>
                              <option value="Credit Card">Credit Card</option>
                              <option value="Cash">Cash</option>
                              <option value="Net Banking">Net Banking</option>
                            </select>
                          </td>
                          <td>
                            <select
                              name="PaymentStatus"
                              value={editedOrder.PaymentStatus}
                              onChange={handleEditChange}
                              className="dspDEmodal-input"
                            >
                              <option value="Paid">Paid</option>
                              <option value="Unpaid">Unpaid</option>
                              <option value="Partially Paid" style={{ color: 'orange' }}>Partially Paid</option>
                            </select>
                          </td>
                        </>
                      ) : (
                        <>
                          <td>{order.OrderId}</td>
                          <td>{formatDateForDisplay(order.Date)}</td>
                          <td>${order.Total}</td>
                          <td>${order.Discount}</td>
                          <td>${order.ShippingCharge}</td>
                          <td>{order.PaymentType}</td>
                          <td>
                            <PaymentStatusBadge status={order.PaymentStatus} />
                          </td>
                        </>
                      )}
                      {editingId === order.id && (
                        <td className="dspDEedit-buttons">
                          <button
                            className="dspDEsave-button"
                            onClick={() => handleSaveEdit(order.id)}
                          >
                            <FiCheck /> Save
                          </button>
                          <button
                            className="dspDEcancel-button"
                            onClick={handleCancelEdit}
                          >
                            <FiX /> Cancel
                          </button>
                        </td>
                      )}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7">No results found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        <div className="dspDEpagination">
          <div className="dspDEpagination-info">
            Showing {Math.min((currentPage - 1) * rowsPerPage + 1, filteredOrders.length)} to{" "}
            {Math.min(currentPage * rowsPerPage, filteredOrders.length)} of {filteredOrders.length} entries
          </div>
          <div className="dspDEpagination-buttons">
            <button
              className="dspDEpagination-button"
              onClick={goToFirstPage}
              disabled={currentPage === 1}
            >
              <FaAngleLeft color="black" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                className={`dspDEpagination-button ${page === currentPage ? 'dspDEactive' : ''}`}
                onClick={() => goToPage(page)}
              >
                {page}
              </button>
            ))}
            <button
              className="dspDEpagination-button"
              onClick={goToLastPage}
              disabled={currentPage === totalPages}
            >
              <FaAngleRight color="black" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}