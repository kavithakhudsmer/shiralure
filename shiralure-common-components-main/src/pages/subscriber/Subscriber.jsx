import React, { useState, useEffect, useRef } from "react";
import {
  FiMail, FiTrash2, FiPrinter, FiFileText, FiCheck, FiX,
} from "react-icons/fi";
import { PiSliders } from "react-icons/pi";
import { FaShareFromSquare, FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import { IoMdSearch, IoMdArrowDropdown } from "react-icons/io";
import { MdClear } from "react-icons/md";
import { CiCircleAlert } from "react-icons/ci";
import ExcelJS from "exceljs";
import "./Subscriber.css";

function Subscriber() {
  const [showFilters, setShowFilters] = useState(false);
  const [emailFilter, setEmailFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [allSubscribers, setAllSubscribers] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showShareDropdown, setShowShareDropdown] = useState(false);
  const [showMailPage, setShowMailPage] = useState(false);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [deleteTargetIndex, setDeleteTargetIndex] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(9);
  const [currentPage, setCurrentPage] = useState(1);
  const [showPageDropdown, setShowPageDropdown] = useState(false);

  // Refs for the Share button and dropdown
  const shareButtonRef = useRef(null);
  const shareDropdownRef = useRef(null);

  // Refs for the Records button and dropdown
  const recordButtonRef = useRef(null);
  const recordDropdownRef = useRef(null);

  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        const response = await fetch("/Subscriberdata.json");
        const data = await response.json();
        setAllSubscribers(data);
        setFilteredList(data);
      } catch (error) {
        console.error("Error fetching subscribers:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSubscribers();
  }, []);

  // Handle clicks outside the Share dropdown
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

  // Handle clicks outside the Records dropdown
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

  const toggleFilters = () => setShowFilters(!showFilters);
  const toggleShareDropdown = () => setShowShareDropdown(!showShareDropdown);
  const toggleMailPage = () => setShowMailPage(!showMailPage);

  const handleSearch = () => {
    const filtered = allSubscribers.filter((sub) =>
      sub.email.toLowerCase().includes(emailFilter.toLowerCase()) &&
      sub.date.toLowerCase().includes(dateFilter.toLowerCase())
    );
    setFilteredList(filtered);
    setCurrentPage(1);
  };

  const handleClear = () => {
    setEmailFilter("");
    setDateFilter("");
    setFilteredList(allSubscribers);
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
    const worksheet = workbook.addWorksheet("Subscribers");

    // Define headers
    worksheet.columns = [
      { header: "Email", key: "email", width: 30 },
      { header: "Date", key: "date", width: 20 },
    ];

    // Add data
    filteredList.forEach((sub) => {
      worksheet.addRow({
        email: sub.email,
        date: formatDateForDisplay(sub.date),
      });
    });

    // Style headers
    worksheet.getRow(1).font = { bold: true };
    worksheet.getRow(1).fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFF2F2F2" },
    };

    // Generate and download file
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "subscribers.xlsx";
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

  const confirmDelete = (index) => {
    setDeleteTargetIndex(index);
    setShowDeleteConfirm(true);
  };

  const cancelDelete = () => {
    setDeleteTargetIndex(null);
    setShowDeleteConfirm(false);
  };

  const deleteSubscriber = () => {
    if (deleteTargetIndex !== null) {
      const updated = [...allSubscribers];
      updated.splice(deleteTargetIndex, 1);
      setAllSubscribers(updated);
      setFilteredList(updated);
      setDeleteTargetIndex(null);
      setShowDeleteConfirm(false);
    }
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
    // Example input: "01:17PM, 23-12-2024"
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

  return (
    <div className="DEsubscriber">
      <div className="DEheader">
        <div className="DEheader-content">
          <h1>Subscribers</h1>
          <div className="DEbreadcrumb">
            <span className="DEhome">Home</span> &gt;&gt; Subscribers
          </div>
        </div>
      </div>

      <div className="DEmain-container">
        <div className="DEaction-bar">
          <div className="DEdropdown-container">
            <button
              ref={recordButtonRef}
              className="DErecord-button"
              onClick={() => setShowPageDropdown(!showPageDropdown)}
              title="Records"
            >
              {rowsPerPage}
              <IoMdArrowDropdown size={17} />
            </button>
            {showPageDropdown && (
              <div ref={recordDropdownRef} className="DEdropdown-menu">
                {[5, 10, 15, 20].map((num) => (
                  <div
                    key={num}
                    className="DEdropdown-item"
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
            className="DEaction-button DEfilter-button"
            onClick={toggleFilters}
            title="Filter"
          >
            <PiSliders size={17} />
          </button>
          <div className="DEdropdown-container">
            <button
              ref={shareButtonRef}
              className="DEaction-button DEshare-button"
              onClick={toggleShareDropdown}
              title="Share"
            >
              <FaShareFromSquare size={17} />
            </button>
            {showShareDropdown && (
              <div ref={shareDropdownRef} className="DEdropdown-menu">
                <div className="DEdropdown-item" onClick={handlePrint}>
                  <FiPrinter size={27} color="white"/> Print
                </div>
                <div className="DEdropdown-item" onClick={handleExportXLS}>
                  <FiFileText size={27} color="white"/> XLS
                </div>
              </div>
            )}
          </div>
          <button
            className="DEaction-button DEmessage-button"
            onClick={toggleMailPage}
            title="Message"
          >
            <FiMail size={17} />
          </button>
        </div>

        <hr className="DEdivider" />

        {showFilters && (
          <div className="DEfilter-container">
            <div className="DEfilter-group">
              <label className="DEfilter-label">Email</label>
              <input
                className="DEfilter-input"
                value={emailFilter}
                onChange={(e) => setEmailFilter(e.target.value)}
              />
              <button
                className="DEsearch-button"
                onClick={handleSearch}
              >
                <IoMdSearch /> Search
              </button>
            </div>
            <div className="DEfilter-group">
              <label className="DEfilter-label">Date</label>
              <div className="DEdate-input-container">
                <input
                  type="datetime-local"
                  className="DEfilter-input DEdate-input"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                />
              </div>
              <button
                className="DEclear-button"
                onClick={handleClear}
              >
                <MdClear /> Clear
              </button>
            </div>
          </div>
        )}

        {isLoading ? (
          <div className="DEloading">Loading subscribers...</div>
        ) : (
          <div id="printable-table">
            <table className="DEsubscriber-table">
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Date</th>
                  <th className="DEaction-column">Action</th>
                </tr>
              </thead>
              <tbody>
                {paginate().length > 0 ? (
                  paginate().map((sub, index) => (
                    <tr key={index}>
                      <td>{sub.email}</td>
                      <td>{formatDateForDisplay(sub.date)}</td>
                      <td className="DEaction-column">
                        <div
                          className="DEdelete-icon"
                          onClick={() => confirmDelete(index)}
                        >
                          <FiTrash2 color="#F4415F" />
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3">No results found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        <div className="DEpagination">
          <div className="DEpagination-info">
            Showing {Math.min((currentPage - 1) * rowsPerPage + 1, filteredList.length)} to{" "}
            {Math.min(currentPage * rowsPerPage, filteredList.length)} of {filteredList.length} entries
          </div>
          <div className="DEpagination-buttons">
            <button
              className="DEpagination-button"
              onClick={goToFirstPage}
              disabled={currentPage === 1}
            >
              <FaAngleLeft color="black" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                className={`DEpagination-button ${page === currentPage ? 'DEactive' : ''}`}
                onClick={() => goToPage(page)}
              >
                {page}
              </button>
            ))}
            <button
              className="DEpagination-button"
              onClick={goToLastPage}
              disabled={currentPage === totalPages}
            >
              <FaAngleRight color="black" />
            </button>
          </div>
        </div>
      </div>

      {showMailPage && (
        <div className="DEmodal-overlay">
          <div className="DEmodal">
            <div className="DEmodal-header">
              <h2>Subscribers</h2>
              <span className="DEmodal-close" onClick={toggleMailPage}>
                <FiX />
              </span>
            </div>
            <label className="DEmodal-label">
              Subject <span className="DErequired">*</span>
            </label>
            <input
              className="DEmodal-input"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
            <label className="DEmodal-label">
              Message <span className="DErequired">*</span>
            </label>
            <textarea
              rows="5"
              className="DEmodal-textarea"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <div className="DEmodal-buttons">
              <button
                className="DEsave-button"
                onClick={saveMail}
              >
                <FiCheck /> Save
              </button>
              <button
                className="DEclear-button1"
                onClick={clearMailForm}
              >
                <FiX /> Clear
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeleteConfirm && (
        <div className="DEmodal-overlay">
          <div className="DEmodal DEdelete-modal">
            <div className="DEmodal-icon">
              <CiCircleAlert size={60} color="gold" />
            </div>
            <h2>Are you sure?</h2>
            <p>You will not be able to recover the deleted record.</p>
            <div className="DEmodal-buttons1">
              <button
                className="DEdelete-button"
                onClick={deleteSubscriber}
              >
                Yes, Delete it!
              </button>
              <button
                className="DEcancel-button"
                onClick={cancelDelete}
              >
                No, Cancel!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Subscriber;