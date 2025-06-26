import React, { useState, useEffect, useRef } from "react";
import {
   FiTrash2,  FiCheck, FiX, FiUpload,FiEye
} from "react-icons/fi";
import { PiSliders } from "react-icons/pi";
import { FaShareFromSquare, FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import { IoMdSearch, IoMdArrowDropdown } from "react-icons/io";
import { MdClear } from "react-icons/md";
import { CiCircleAlert } from "react-icons/ci";
import Papa from "papaparse";
import { BiAddToQueue } from "react-icons/bi";
import ExcelJS from "exceljs";
import { TiTick } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";
import "./PushNotifications.css";

function PushNotifications() {
  const [showFilters, setShowFilters] = useState(false);
  const [titleFilter, setTitleFilter] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [userFilter, setUserFilter] = useState("");
  const [allSubscribers, setAllSubscribers] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showShareDropdown, setShowShareDropdown] = useState(false);
  const [showMailPage, setShowMailPage] = useState(false);
  const [subject, setSubject] = useState("");
  const [deleteTargetIndex, setDeleteTargetIndex] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(9);
  const [currentPage, setCurrentPage] = useState(1);
  const [showPageDropdown, setShowPageDropdown] = useState(false);
  const [showViewPage, setShowViewPage] = useState(false);
  const [selectedSubscriber, setSelectedSubscriber] = useState(null);
  const [details, setDetails] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [isSecondPageStyle, setIsSecondPageStyle] = useState(false); // Toggle 2nd page style

  const shareButtonRef = useRef(null);
  const shareDropdownRef = useRef(null);
  const recordButtonRef = useRef(null);
  const recordDropdownRef = useRef(null);
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    role: '',
    user: '',
    title: '',
    image: null,
    description: '',
  });
  const [showModal, setShowModal] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSave = () => {
    console.log("Saved:", formData);
    setShowModal(false);
  };

  const handleClear1 = () => {
    setFormData({
      role: "",
      user: "",
      title: "",
      image: null,
      description: "",
    });
  };

  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        const response = await fetch("/PuchNotification.json");
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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showShareDropdown && shareDropdownRef.current && !shareDropdownRef.current.contains(event.target) && shareButtonRef.current && !shareButtonRef.current.contains(event.target)) {
        setShowShareDropdown(false);
      }
    };
    if (showShareDropdown) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showShareDropdown]);

  useEffect(() => {
    const handleClickOutsideRecord = (event) => {
      if (showPageDropdown && recordDropdownRef.current && !recordDropdownRef.current.contains(event.target) && recordButtonRef.current && !recordButtonRef.current.contains(event.target)) {
        setShowPageDropdown(false);
      }
    };
    if (showPageDropdown) document.addEventListener("mousedown", handleClickOutsideRecord);
    return () => document.removeEventListener("mousedown", handleClickOutsideRecord);
  }, [showPageDropdown]);

  const toggleFilters = () => setShowFilters(!showFilters);
  const toggleShareDropdown = () => setShowShareDropdown(!showShareDropdown);
  const toggleMailPage = () => setShowMailPage(!showMailPage);
  const toggleViewPage = (subscriber) => {
    setSelectedSubscriber(subscriber);
    setShowViewPage(true);
  };
  const toggleUploadModal = () => setShowUploadModal(!showUploadModal);
  const toggleSecondPageStyle = () => setIsSecondPageStyle(!isSecondPageStyle); // Switch to 2nd page style

  const handleSearch = () => {
    const filtered = allSubscribers.filter((sub) =>
      sub.title.toLowerCase().includes(titleFilter.toLowerCase()) &&
      sub.role.toLowerCase().includes(roleFilter.toLowerCase()) &&
      sub.user.toLowerCase().includes(userFilter.toLowerCase())
    );
    setFilteredList(filtered);
    setCurrentPage(1);
  };

  const handleClear = () => {
    setTitleFilter("");
    setRoleFilter("");
    setUserFilter("");
    setFilteredList(allSubscribers);
    setCurrentPage(1);
  };

  const handleExportXLS = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Subscribers");
    worksheet.columns = [
      { header: "Title", key: "title", width: 30 },
      { header: "Role", key: "role", width: 20 },
      { header: "User", key: "user", width: 20 },
    ];
    worksheet.addRows(filteredList);
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "subscribers.xlsx";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        const fileContent = e.target.result;
        let parsedData = [];

        const fileExtension = file.name.split('.').pop().toLowerCase();
        if (fileExtension === 'csv') {
          Papa.parse(fileContent, {
            header: true,
            complete: (result) => {
              parsedData = result.data.map(row => ({
                title: row.Title || row.title || "",
                role: row.Role || row.role || "",
                user: row.User || row.user || "",
                action: row.Action || row.action || "view"
              })).filter(sub => sub.title && sub.role && sub.user);
              updateSubscribers(parsedData);
            },
            error: (error) => {
              console.error("CSV parsing error:", error);
              alert("Error parsing CSV file.");
            }
          });
        } else if (fileExtension === 'json') {
          try {
            parsedData = JSON.parse(fileContent).map(row => ({
              title: row.Title || row.title || "",
              role: row.Role || row.role || "",
              user: row.User || row.user || "",
              action: row.Action || row.action || "view"
            })).filter(sub => sub.title && sub.role && sub.user);
            updateSubscribers(parsedData);
          } catch (error) {
            console.error("JSON parsing error:", error);
            alert("Invalid JSON file.");
          }
        } else if (fileExtension === 'xlsx') {
          const workbook = new ExcelJS.Workbook();
          workbook.xlsx.load(fileContent).then(() => {
            const worksheet = workbook.getWorksheet("Subscribers");
            if (worksheet) {
              parsedData = worksheet.getRows(2, worksheet.rowCount - 1).map(row => ({
                title: row.getCell(1).value?.toString() || "",
                role: row.getCell(2).value?.toString() || "",
                user: row.getCell(3).value?.toString() || "",
                action: row.getCell(4) ? row.getCell(4).value?.toString() || "view" : "view"
              })).filter(sub => sub.title && sub.role && sub.user);
              updateSubscribers(parsedData);
            } else {
              alert("No 'Subscribers' worksheet found in the Excel file.");
            }
          }).catch(error => {
            console.error("XLSX parsing error:", error);
            alert("Error parsing Excel file.");
          });
        } else if (fileExtension.match(/\.(jpg|jpeg|png|gif)$/i)) {
          alert("Image uploaded successfully: " + file.name);
        } else {
          alert("Unsupported file format. Please upload a CSV, JSON, XLSX, or image (JPG, JPEG, PNG, GIF).");
          return;
        }
      };
      if (fileExtension === 'xlsx') {
        reader.readAsArrayBuffer(file);
      } else {
        reader.readAsText(file);
      }
      event.target.value = "";
    }
  };

  const updateSubscribers = (newData) => {
    if (newData.length > 0) {
      const updatedSubscribers = [...allSubscribers, ...newData].filter((sub, index, self) =>
        index === self.findIndex((s) => s.title === sub.title && s.role === sub.role && s.user === sub.user)
      );
      setAllSubscribers(updatedSubscribers);
      setFilteredList(updatedSubscribers);
      alert(`Successfully uploaded ${newData.length} new subscribers! Total subscribers: ${updatedSubscribers.length}`);
    } else {
      alert("No valid data found in the uploaded file.");
    }
  };

  const clearMailForm = () => {
    setSubject("");
  };

  const saveMessage = () => {
    if (!subject.trim()) {
      alert("Subject is required.");
      return;
    }
    alert(`Saved message:\nSubject: ${subject}`);
    toggleMailPage();
  };

  const confirmDelete = (index) => {
    setDeleteTargetIndex(index);
    setShowDeleteConfirm(true);
  };

  const deleteSubscriber = () => {
    const newList = filteredList.filter((_, i) => i !== deleteTargetIndex);
    setFilteredList(newList);
    setShowDeleteConfirm(false);
    setDeleteTargetIndex(null);
  };

  const cancelDelete = () => {
    setDeleteTargetIndex(null);
    setShowDeleteConfirm(false);
  };

  const totalPages = Math.ceil(filteredList.length / rowsPerPage);
  const goToPage = (page) => setCurrentPage(page);
  const goToFirstPage = () => setCurrentPage(1);
  const goToNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const goToLastPage = () => setCurrentPage(totalPages);

  const paginate = () => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return filteredList.slice(startIndex, endIndex);
  };

  function showDetails(type, value) {
    if (value) {
      setDetails(`${type.charAt(0).toUpperCase() + type.slice(1)} selected: ${value}`);
    } else {
      setDetails('');
    }
  }

  return (
    
    <div className={`posubscriber ${isSecondPageStyle ? "posecond-page" : ""}`}>
      <div className="poheader">
        <div className="poheader-content">
          <h1>Push Notifications</h1>
          <div className="pobreadcrumb">
            <span className="pohome">Home</span>&gt;&gt;Push Notifications
          </div>
        </div>
      </div>

      <div className="pomain-container">
        <div className="poaction-bar">
          <div className="podropdown-container">
            <button
              ref={recordButtonRef}
              className="porecord-button"
              onClick={() => setShowPageDropdown(!showPageDropdown)}
              title="Records"
            >
              {rowsPerPage}
              <IoMdArrowDropdown size={17} />
            </button>
            {showPageDropdown && (
              <div ref={recordDropdownRef} className="podropdown-menu">
                {[5, 10, 15, 20].map((num) => (
                  <div
                    key={num}
                    className="podropdown-item"
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
            className="poaction-button pofilter-button"
            onClick={toggleFilters}
            title="Filter"
          >
            <PiSliders size={17} />
          </button>
          <div className="podropdown-container">
            <button
              ref={shareButtonRef}
              className="poaction-button poshare-button"
              onClick={toggleShareDropdown}
              title="Share"
            >
              <FaShareFromSquare size={17} />
            </button>
            {showShareDropdown && (
              <div ref={shareDropdownRef} className="podropdown-menu">
                <div className="podropdown-item" onClick={() => fileInputRef.current.click()}>
                  <FiUpload /> Upload File
                </div>
              </div>
            )}
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
              accept=".csv,.json,.xlsx,.jpg,.jpeg,.png,.gif"
            />
          </div>
          <button
            className="poaction-button poadd-button"
            onClick={() => setShowModal(true)}// Triggers 2nd page style
            title="Switch to 1nd Page PushNotification Style"
          >
            <BiAddToQueue size={17} />
          </button>
          {showModal && (
        <div className="pomodal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Push notifactions</h2>
              <span className="modal-close" onClick={() => setShowModal(false)}>&times;</span>
            </div>

            <div className="modal-body">
              <div className="input-row">
                <div className="input-group half">
                <label>Role</label>
                <input
                  type="text"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                />
                </div>
                <div className="input-group half">
                <label>User</label>
                <input
                  type="text"
                  name="user"
                  value={formData.user}
                  onChange={handleInputChange}
                />
                </div>
              </div>
              <div className="input-group">
                <label>
                  Title<span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                />
              </div>
              <div className="input-group">
                <label>Image</label>
                <input
                  type="file"
                  name="image"
                  onChange={handleInputChange}
                />
              </div>
              <div className="input-group">
                <label>
                  Description<span className="required">*</span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="modal-footer">
              <button className="posave-button" onClick={handleSave}>
                <TiTick size={15}/> SAVE
              </button>
              <button className="poclear-button1" onClick={handleClear1}>
               <RxCross2 size={15} /> CLEAR
              </button>
            </div>
          </div>
        </div>
      )}

    
        </div>

        <hr className="podivider" />

        {showFilters && (
          <div className="pofilter-container">
            <div className="pofilter-row">
              <div className="pofilter-group">
                <label className="pofilter-label">Title</label>
                <input
                  className="pofilter-input"
                  value={titleFilter}
                  onChange={(e) => setTitleFilter(e.target.value)}
                />
              </div>
              <div className="pofilter-group">
                <label className="pofilter-label">Role</label>
                <select
                  className="pofilter-input"
                  value={roleFilter}
                  onChange={(e) => {
                    setRoleFilter(e.target.value);
                    showDetails('role', e.target.value);
                  }}
                >
                  <option value="">--</option>
                  <option value="Customer">Customer</option>
                  <option value="Admin">Admin</option>
                  <option value="Manager">Manager</option>
                </select>
              </div>
              <div className="pofilter-group">
                <label className="pofilter-label">User</label>
                <select
                  className="pofilter-input"
                  value={userFilter}
                  onChange={(e) => {
                    setUserFilter(e.target.value);
                    showDetails('user', e.target.value);
                  }}
                >
                  <option value="">--</option>
                  <option value="Walking Customer">Walking Customer</option>
                  <option value="Admin User">Admin User</option>
                  <option value="Manager User">Manager User</option>
                </select>
              </div>
            </div>
            <div className="pobutton-group">
              <button className="posearch-button" onClick={handleSearch}>
                <IoMdSearch /> Search
              </button>
              <button className="poclear-button" onClick={handleClear}>
                <MdClear /> Clear
              </button>
            </div>
          </div>
        )}

        {isLoading ? (
          <div className="poloading">Loading Push Notifications...</div>
        ) : (
          <div id="printable-table">
            <table className="posubscriber-table">
              <thead>
                <tr>
                  <th style={{ width: "25%" }}>Title</th>
                  <th style={{ width: "25%" }}>Role</th>
                  <th style={{ width: "25%" }}>User</th>
                  <th className="poaction-column" style={{ width: "25%" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {paginate().length > 0 ? (
                  paginate().map((sub, index) => (
                    <tr key={index}>
                      <td>{sub.title}</td>
                      <td>{sub.role}</td>
                      <td>{sub.user}</td>
                      <td className="poaction-column">
                        <div className="poaction-icons">
                          <FiEye
                            className="eye-icon"
                            onClick={() => toggleViewPage(sub)}
                          />
                          <FiTrash2
                            className="trash-icon"
                            onClick={() => confirmDelete(index)}
                          />
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4">No results found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        <div className="popagination">
          <div className="popagination-info">
            Showing {Math.min((currentPage - 1) * rowsPerPage + 1, filteredList.length)} to{" "}
            {Math.min(currentPage * rowsPerPage, filteredList.length)} of {filteredList.length} entries
          </div>
          <div className="popagination-buttons">
            <button
              className="popagination-button"
              onClick={goToFirstPage}
              disabled={currentPage === 1}
            >
              <FaAngleLeft />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                className={`popagination-button ${page === currentPage ? "poactive" : ""}`}
                onClick={() => goToPage(page)}
              >
                {page}
              </button>
            ))}
            <button
              className="popagination-button"
              onClick={goToLastPage}
              disabled={currentPage === totalPages}
            >
              <FaAngleRight />
            </button>
          </div>
        </div>
      </div>

      {showMailPage && (
        <div className="pomodal-overlay">
          <div className="pomodal">
            <div className="pomodal-header">
              <h2>Push Notifications</h2>
              <span className="pomodal-close" onClick={toggleMailPage}>
                <FiX />
              </span>
            </div>
            <label className="pomodal-label">
              Subject <span className="porequired">*</span>
            </label>
            <input
              className="pomodal-input"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
            <div className="pomodal-buttons">
              <button className="posave-button" onClick={saveMessage}>
                <FiCheck /> Save
              </button>
              <button className="poclear-button1" onClick={clearMailForm}>
                <FiX /> Clear
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeleteConfirm && (
        <div className="pomodal-overlay">
          <div className="pomodal podelete-modal">
            <div className="pomodal-icon">
              <CiCircleAlert size={60} color="gold" />
            </div>
            <h2>Are you sure?</h2>
            <p>You will not be able to recover the deleted record.</p>
            <div className="pomodal-buttons1">
              <button className="podelete-button" onClick={deleteSubscriber}>
                Yes, Delete it!
              </button>
              <button className="pocancel-button" onClick={cancelDelete}>
                No, Cancel!
              </button>
            </div>
          </div>
        </div>
      )}

      {showViewPage && selectedSubscriber && (
        <div className="pomodal-overlay">
          <div className="poview-modal">
            <div className="poview-header">
              <h2>View Details</h2>
              <span className="poview-close" onClick={() => setShowViewPage(false)}>
                <FiX />
              </span>
            </div>
            <div className="poview-content">
              <p><strong>Title:</strong> {selectedSubscriber.title}</p>
              <p><strong>Role:</strong> {selectedSubscriber.role}</p>
              <p><strong>User:</strong> {selectedSubscriber.user}</p>
            </div>
          </div>
        </div>
      )}

      {showUploadModal && (
        <div className="pomodal-overlay">
          <div className="pomodal poupload-modal">
            <div className="pomodal-header">
              <h2>Upload Content</h2>
              <span className="pomodal-close" onClick={toggleUploadModal}>
                <FiX />
              </span>
            </div>
            <div className="poupload-options">
              <label className="pomodal-label">Upload Image</label>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "block" }}
                onChange={handleFileChange}
                accept=".jpg,.jpeg,.png,.gif"
              />
              <label className="pomodal-label">Upload File (CSV, JSON, XLSX)</label>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "block" }}
                onChange={handleFileChange}
                accept=".csv,.json,.xlsx"
              />
            </div>
            <div className="pomodal-buttons">
              <button className="posave-button" onClick={toggleUploadModal}>
                <FiCheck /> Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PushNotifications;