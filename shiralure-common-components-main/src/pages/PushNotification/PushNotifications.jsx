import React, { useState, useEffect, useRef } from "react";
import {
  FiTrash2,
  FiCheck,
  FiX,
  FiUpload,
  FiEye,
} from "react-icons/fi";
import { PiSliders } from "react-icons/pi";
import { FaShareFromSquare, FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import { IoMdSearch, IoMdArrowDropdown } from "react-icons/io";
import { MdClear } from "react-icons/md";
import { CiCircleAlert } from "react-icons/ci";
import { BiSolidAddToQueue } from "react-icons/bi";
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

  const shareButtonRef = useRef(null);
  const shareDropdownRef = useRef(null);
  const recordButtonRef = useRef(null);
  const recordDropdownRef = useRef(null);
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    role: "",
    user: "",
    title: "",
    image: null,
    description: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState({
    role: "",
    user: "",
    title: "",
    description: "",
    filterTitle: "",
    filterRole: "",
    filterUser: "",
  });

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "title") setTitleFilter(value);
    if (name === "role") setRoleFilter(value);
    if (name === "user") setUserFilter(value);
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
    // Clear error when user starts typing
    setErrors({
      ...errors,
      [name]: "",
      [`filter${name.charAt(0).toUpperCase() + name.slice(1)}`]: "",
    });
  };

  const handleSave = () => {
    const newErrors = {
      role: !formData.role ? "Role cannot be empty" : "",
      user: !formData.user ? "User cannot be empty" : "",
      title: !formData.title.trim() ? "Title cannot be empty" : "",
      description: !formData.description.trim() ? "Description cannot be empty" : "",
    };
    setErrors({ ...errors, ...newErrors });

    if (Object.values(newErrors).some((error) => error)) {
      return;
    }

    const newSubscriber = {
      title: formData.title,
      role: formData.role,
      user: formData.user,
      description: formData.description,
      action: "view",
    };

    const updatedSubscribers = [...allSubscribers, newSubscriber];
    setAllSubscribers(updatedSubscribers);
    setFilteredList(updatedSubscribers);

    alert("Successfully added new push notification!");

    setFormData({
      role: "",
      user: "",
      title: "",
      image: null,
      description: "",
    });
    setErrors({
      role: "",
      user: "",
      title: "",
      description: "",
      filterTitle: "",
      filterRole: "",
      filterUser: "",
    });
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
    setErrors({
      role: "",
      user: "",
      title: "",
      description: "",
      filterTitle: "",
      filterRole: "",
      filterUser: "",
    });
  };

  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        const response = await fetch("/PuchNotification.json");
        const data = await response.json();
        const formattedData = data.map((item) => ({
          ...item,
          description: item.description || "",
        }));
        setAllSubscribers(formattedData);
        setFilteredList(formattedData);
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
    if (showShareDropdown)
      document.addEventListener("mousedown", handleClickOutside);
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
    if (showPageDropdown)
      document.addEventListener("mousedown", handleClickOutsideRecord);
    return () =>
      document.removeEventListener("mousedown", handleClickOutsideRecord);
  }, [showPageDropdown]);

  const toggleFilters = () => setShowFilters(!showFilters);
  const toggleShareDropdown = () => setShowShareDropdown(!showShareDropdown);
  const toggleMailPage = () => setShowMailPage(!showMailPage);
  const toggleViewPage = (subscriber) => {
    setSelectedSubscriber(subscriber);
    setShowViewPage(true);
  };

  const handleSearch = () => {
    const newErrors = {
      filterTitle: !titleFilter.trim() ? "Title cannot be empty" : "",
      filterRole: !roleFilter ? "Role cannot be empty" : "",
      filterUser: !userFilter ? "User cannot be empty" : "",
    };
    setErrors({ ...errors, ...newErrors });

    // if (Object.values(newErrors).some((error) => error)) {
    //   alert("Please fill in all filter fields: Title, Role, and User");
    //   return;
    // }

    const filtered = allSubscribers.filter(
      (sub) =>
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
    setErrors({
      ...errors,
      filterTitle: "",
      filterRole: "",
      filterUser: "",
    });
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
      { header: "Description", key: "description", width: 50 },
    ];
    worksheet.addRows(filteredList);
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
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
      const fileExtension = file.name.split(".").pop().toLowerCase();
      if (fileExtension !== "xlsx") {
        alert("Please upload an XLSX file only.");
        event.target.value = "";
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const fileContent = e.target.result;
        const workbook = new ExcelJS.Workbook();
        workbook.xlsx.load(fileContent).then(() => {
          const worksheet = workbook.getWorksheet("Subscribers");
          if (worksheet) {
            const parsedData = worksheet
              .getRows(2, worksheet.rowCount - 1)
              .map((row) => ({
                title: row.getCell(1).value?.toString() || "",
                role: row.getCell(2).value?.toString() || "",
                user: row.getCell(3).value?.toString() || "",
                description: row.getCell(4)?.value?.toString() || "",
                action: row.getCell(5)?.value?.toString() || "view",
              }))
              .filter((sub) => sub.title && sub.role && sub.user);

            if (parsedData.length > 0) {
              const updatedSubscribers = [...allSubscribers, ...parsedData].filter(
                (sub, index, self) =>
                  index ===
                  self.findIndex(
                    (s) => s.title === sub.title && s.role === sub.role && s.user === sub.user
                  )
              );
              setAllSubscribers(updatedSubscribers);
              setFilteredList(updatedSubscribers);
              alert(
                `Successfully uploaded ${parsedData.length} new subscribers from ${file.name}! Total subscribers: ${updatedSubscribers.length}`
              );
            } else {
              alert("No valid data found in the uploaded XLSX file.");
            }
          } else {
            alert("No 'Subscribers' worksheet found in the Excel file.");
          }
        }).catch((error) => {
          console.error("XLSX parsing error:", error);
          alert("Error parsing XLSX file.");
        });
      };
      reader.readAsArrayBuffer(file);
      event.target.value = "";
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
    setAllSubscribers(newList);
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
  const goToLastPage = () => setCurrentPage(totalPages);

  const paginate = () => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return filteredList.slice(startIndex, endIndex);
  };

  const handleRoleDetails = () => {
    alert(`Details for role: ${formData.role}`);
  };

  const handleUserDetails = () => {
    alert(`Details for user: ${formData.user}`);
  };

  return (
    <div className="dvspSubscriber">
      <div className="dvspHeader">
        <div className="dvspHeader-content">
          <h1>Push Notifications</h1>
          <div className="dvspBreadcrumb">
            <span className="dvspHome">Home</span>&gt;&gt;Push Notifications
          </div>
        </div>
      </div>

      <div className="dvspMain-container">
        <div className="dvspAction-bar">
          <div className="dvspDropdown-container">
            <button
              ref={recordButtonRef}
              className="dvspRecord-button"
              onClick={() => setShowPageDropdown(!showPageDropdown)}
              title="Records"
            >
              {rowsPerPage}
              <IoMdArrowDropdown size={17} />
            </button>
            {showPageDropdown && (
              <div ref={recordDropdownRef} className="dvspDropdown-menu">
                {[5, 10, 15, 20].map((num) => (
                  <div
                    key={num}
                    className="dvspDropdown-item"
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
            className="dvspAction-button dvspFilter-button"
            onClick={toggleFilters}
            title="Filter"
          >
            <PiSliders size={17} />
          </button>
          <div className="dvspDropdown-container">
            <button
              ref={shareButtonRef}
              className="dvspAction-button dvspShare-button"
              onClick={toggleShareDropdown}
              title="Share"
            >
              <FaShareFromSquare size={17} />
            </button>
            {showShareDropdown && (
              <div ref={shareDropdownRef} className="dvspDropdown-menu">
                <div
                  className="dvspDropdown-item"
                  onClick={() => fileInputRef.current.click()}
                >
                  <FiUpload /> Upload File
                </div>
              </div>
            )}
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
              accept=".xlsx"
            />
          </div>
          <button
            className="dvspAction-button dvspAdd-button"
            onClick={() => setShowModal(true)}
            title="Add Notification"
          >
            <BiSolidAddToQueue size={17} />
          </button>
        </div>

        <hr className="dvspDivider" />

        {showFilters && (
          <div className="dvspFilter-container">
            <div className="dvspFilter-row">
              <div className="dvspFilter-group">
                <label className="dvspFilter-label">Title</label>
                <input
                  type="text"
                  name="title"
                  className={errors.filterTitle ? "dvspError" : ""}
                  value={titleFilter}
                  onChange={(e) => setTitleFilter(e.target.value)}
                />
                {/* {errors.filterTitle && (
                  <div className="dvspError-message">{errors.filterTitle}</div>
                )} */}
              </div>
              <div className="dvspFilter-group">
                <label className="dvspFilter-label">Role</label>
                <select
                  name="role"
                  className={errors.filterRole ? "dvspError" : ""}
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                >
                  <option value="">--</option>
                  <option value="Customer">Customer</option>
                  <option value="Admin">Admin</option>
                  <option value="Manager">Manager</option>
                </select>
                {/* {errors.filterRole && (
                  <div className="dvspError-message">{errors.filterRole}</div>
                )} */}
              </div>
              <div className="dvspFilter-group">
                <label className="dvspFilter-label">User</label>
                <select
                  name="user"
                  className={errors.filterUser ? "dvspError" : ""}
                  value={userFilter}
                  onChange={(e) => setUserFilter(e.target.value)}
                >
                  <option value="">--</option>
                  <option value="Walking Customer">Walking Customer</option>
                  <option value="Admin User">Admin User</option>
                  <option value="Manager User">Manager User</option>
                </select>
                {/* {errors.filterUser && (
                  <div className="dvspError-message">{errors.filterUser}</div>
                )} */}
              </div>
            </div>
            <div className="dvspButton-group">
              <button className="dvspSearch-button" onClick={handleSearch}>
                <IoMdSearch /> Search
              </button>
              <button className="dvspClear-button" onClick={handleClear}>
                <MdClear /> Clear
              </button>
            </div>
          </div>
        )}

        {isLoading ? (
          <div className="dvspLoading">Loading Push Notifications...</div>
        ) : (
          <div id="printable-table">
            <table className="dvspSubscriber-table">
              <thead>
                <tr>
                  <th style={{ width: "25%" }}>Title</th>
                  <th style={{ width: "25%" }}>Role</th>
                  <th style={{ width: "25%" }}>User</th>
                  <th className="dvspAction-column" style={{ width: "25%" }}>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginate().length > 0 ? (
                  paginate().map((sub, index) => (
                    <tr key={index}>
                      <td>{sub.title}</td>
                      <td>{sub.role}</td>
                      <td>{sub.user}</td>
                      <td className="dvspAction-column">
                        <div className="dvspAction-icons">
                          <FiEye
                            className="dvspEye-icon"
                            onClick={() => toggleViewPage(sub)}
                          />
                          <FiTrash2
                            className="dvspTrash-icon"
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

        <div className="dvspPagination">
          <div className="dvspPagination-info">
            Showing{" "}
            {Math.min((currentPage - 1) * rowsPerPage + 1, filteredList.length)}{" "}
            to {Math.min(currentPage * rowsPerPage, filteredList.length)} of{" "}
            {filteredList.length} entries
          </div>
          <div className="dvspPagination-buttons">
            <button
              className="dvspPagination-button"
              onClick={goToFirstPage}
              disabled={currentPage === 1}
            >
              <FaAngleLeft />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                className={`dvspPagination-button ${
                  page === currentPage ? "dvspActive" : ""
                }`}
                onClick={() => goToPage(page)}
              >
                {page}
              </button>
            ))}
            <button
              className="dvspPagination-button"
              onClick={goToLastPage}
              disabled={currentPage === totalPages}
            >
              <FaAngleRight />
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="dvspModal-overlay">
          <div className="dvspModal">
            <div className="dvspModal-header">
              <h2>Add Push Notification</h2>
              <span
                className="dvspModal-close"
                onClick={() => setShowModal(false)}
              >
                ×
              </span>
            </div>

            <div className="dvspModal-body">
              <div className="dvspInput-row">
                <div className="dvspInput-group dvspHalf">
                  <label>
                    Role<span className="dvspRequired">*</span>
                  </label>
                  <div className="dvspSelectWithBtn">
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      className={errors.role ? "dvspError" : ""}
                    >
                      <option value="">--</option>
                      <option value="Admin">Admin</option>
                      <option value="Manager">Manager</option>
                      <option value="Employee">Employee</option>
                    </select>
                  </div>
                  {errors.role && <div className="dvspError-message">{errors.role}</div>}
                </div>

                <div className="dvspInput-group dvspHalf">
                  <label>
                    User<span className="dvspRequired">*</span>
                  </label>
                  <div className="dvspSelectWithBtn">
                    <select
                      name="user"
                      value={formData.user}
                      onChange={handleInputChange}
                      className={errors.user ? "dvspError" : ""}
                    >
                      <option value="">--</option>
                      <option value="JohnDoe">John Doe</option>
                      <option value="JaneSmith">Jane Smith</option>
                      <option value="AliceWong">Alice Wong</option>
                    </select>
                  </div>
                  {errors.user && <div className="dvspError-message">{errors.user}</div>}
                </div>
              </div>

              <div className="dvspInput-group">
                <label>
                  Title<span className="dvspRequired">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className={errors.title ? "dvspError" : ""}
                />
                {errors.title && <div className="dvspError-message">{errors.title}</div>}
              </div>

              <div className="dvspInput-group">
                <label>
                  Description<span className="dvspRequired">*</span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Enter description here"
                  className={errors.description ? "dvspError" : ""}
                />
                {errors.description && (
                  <div className="dvspError-message">{errors.description}</div>
                )}
              </div>
            </div>

            <div className="dvspModal-footer">
              <button className="dvspSave-button" onClick={handleSave}>
                <TiTick size={15} /> SAVE
              </button>
              <button className="dvspClear-button1" onClick={handleClear1}>
                <RxCross2 size={15} /> CLEAR
              </button>
            </div>
          </div>
        </div>
      )}

      {showMailPage && (
        <div className="dvspModal-overlay">
          <div className="dvspModal">
            <div className="dvspModal-header">
              <h2>Push Notifications</h2>
              <span className="dvspModal-close" onClick={toggleMailPage}>
                <FiX />
              </span>
            </div>
            <label className="dvspModal-label">
              Subject <span className="dvspRequired">*</span>
            </label>
            <input
              className="dvspModal-input"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
            <div className="dvspModal-buttons">
              <button className="dvspSave-button" onClick={saveMessage}>
                <FiCheck /> Save
              </button>
              <button className="dvspClear-button1" onClick={clearMailForm}>
                <FiX /> Clear
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeleteConfirm && (
        <div className="dvspModal-overlay">
          <div className="dvspModal dvspDelete-modal">
            <div className="dvspModal-icon">
              <CiCircleAlert size={60} color="gold" />
            </div>
            <h2>Are you sure?</h2>
            <p>You will not be able to recover the deleted record.</p>
            <div className="dvspModal-buttons1">
              <button className="dvspDelete-button" onClick={deleteSubscriber}>
                Yes, Delete it!
              </button>
              <button className="dvspCancel-button" onClick={cancelDelete}>
                No, Cancel!
              </button>
            </div>
          </div>
        </div>
      )}

      {showViewPage && selectedSubscriber && (
        <div className="dvspModal-overlay">
          <div className="dvspView-modal">
            <div className="dvspView-header">
              <h2>View Details</h2>
              <span
                className="dvspView-close"
                onClick={() => setShowViewPage(false)}
              >
                <FiX />
              </span>
            </div>
            <div className="dvspView-content">
              <p>
                <strong>Title:</strong> {selectedSubscriber.title}
              </p>
              <p>
                <strong>Role:</strong> {selectedSubscriber.role || "N/A"}
              </p>
              <p>
                <strong>User:</strong> {selectedSubscriber.user || "N/A"}
              </p>
              <p>
                <strong>Description:</strong>{" "}
                {selectedSubscriber.description || "No description provided"}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PushNotifications;