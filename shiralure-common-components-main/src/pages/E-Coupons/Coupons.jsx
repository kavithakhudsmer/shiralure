import React, { useEffect, useState, useRef } from "react";
import { FiEye, FiTrash2, FiPrinter, FiFileText, FiEdit2} from "react-icons/fi";
import { FaShareFromSquare, FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { MdClear } from "react-icons/md";
import { RiAddBoxLine } from "react-icons/ri";
import { CiSearch, CiCircleAlert } from "react-icons/ci";
import { IoMdArrowDropdown } from "react-icons/io";
import { FaCheck } from "react-icons/fa";
import { PiSliders } from "react-icons/pi";
import "./Coupons.css";

function Coupons() {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [filteredCoupons, setFilteredCoupons] = useState([]);
  const [showShareDropdown, setShowShareDropdown] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [couponToDelete, setCouponToDelete] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [showPageDropdown, setShowPageDropdown] = useState(false);
  const shareRef = useRef(null);
  const addModalRef = useRef(null);
  const viewModalRef = useRef(null);
  const editModalRef = useRef(null);
  const deleteModalRef = useRef(null);
  const addFormRef = useRef(null);
  const recordButtonRef = useRef(null);
  const recordDropdownRef = useRef(null);

  const [filters, setFilters] = useState({
    name: "",
    code: "",
    discount: "",
    discountType: "",
    startDate: "",
    endDate: "",
    minOrderAmount: "",
    maxDiscount: "",
    limitPerUser: "",
  });

  const [newCoupon, setNewCoupon] = useState({
    name: "",
    code: "",
    discount: "",
    discountType: "Fixed",
    startDate: "",
    endDate: "",
    minOrderAmount: "",
    maxDiscount: "",
    limitPerUser: "",
    description: "",
    image: null,
  });

  const [formErrors, setFormErrors] = useState({});
  const [addFileName, setAddFileName] = useState("");
  const [editFileName, setEditFileName] = useState("");

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const response = await fetch("/coupons.json");
        const data = await response.json();
        setCoupons(data);
        setFilteredCoupons(data);
      } catch (error) {
        console.error("Failed to load coupons:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCoupons();

    const handleClickOutside = (event) => {
      if (shareRef.current && !shareRef.current.contains(event.target)) {
        setShowShareDropdown(false);
      }
      if (addModalRef.current && !addModalRef.current.contains(event.target)) {
        setShowAddModal(false);
        setFormErrors({});
        setAddFileName("");
      }
      if (viewModalRef.current && !viewModalRef.current.contains(event.target)) {
        setShowViewModal(false);
      }
      if (editModalRef.current && !editModalRef.current.contains(event.target)) {
        setShowEditModal(false);
        setEditFileName("");
      }
      if (deleteModalRef.current && !deleteModalRef.current.contains(event.target)) {
        setShowDeleteConfirmModal(false);
      }
      if (recordDropdownRef.current && !recordDropdownRef.current.contains(event.target) && !recordButtonRef.current.contains(event.target)) {
        setShowPageDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const totalPages = Math.ceil(filteredCoupons.length / rowsPerPage);

  const goToFirstPage = () => setCurrentPage(1);

  const goToPage = (page) => setCurrentPage(page);

  const goToLastPage = () => setCurrentPage(totalPages);

  const displayedCoupons = filteredCoupons.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const toggleFilters = () => setShowFilters(!showFilters);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleSearch = () => {
    const filtered = coupons.filter((c) =>
      Object.keys(filters).every((key) =>
        filters[key]
          ? c[key]?.toString().toLowerCase().includes(filters[key].toLowerCase())
          : true
      )
    );
    setFilteredCoupons(filtered);
    setCurrentPage(1);
  };

  const handleClear = () => {
    const cleared = Object.fromEntries(Object.keys(filters).map((key) => [key, ""]));
    setFilters(cleared);
    setFilteredCoupons(coupons);
    setCurrentPage(1);
  };

  const handlePrint = () => window.print();

  const handleExportXLS = () => {
    const csvContent = [
      ["Name", "Code", "Discount", "Discount Type", "Start Date", "End Date"],
      ...filteredCoupons.map((c) => [
        c.name,
        c.code,
        c.discount,
        c.discountType,
        c.startDate,
        c.endDate,
      ]),
    ].map((row) => row.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "coupons.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const validateForm = () => {
    const errors = {};
    const requiredFields = [
      "name",
      "code",
      "discount",
      "discountType",
      "startDate",
      "endDate",
      "minOrderAmount",
      "maxDiscount",
      "limitPerUser",
      "description",
      "image",
    ];

    requiredFields.forEach((field) => {
      if (!newCoupon[field] || newCoupon[field].toString().trim() === "") {
        errors[field] = `${field.replace(/([A-Z])/g, " $1").toUpperCase()} is required`;
      }
    });

    if (newCoupon.discount && parseFloat(newCoupon.discount) <= 0) {
      errors.discount = "Discount must be greater than 0";
    }
    if (newCoupon.minOrderAmount && parseFloat(newCoupon.minOrderAmount) < 0) {
      errors.minOrderAmount = "Minimum Order Amount cannot be negative";
    }
    if (newCoupon.maxDiscount && parseFloat(newCoupon.maxDiscount) < 0) {
      errors.maxDiscount = "Maximum Discount cannot be negative";
    }
    if (newCoupon.limitPerUser && parseInt(newCoupon.limitPerUser, 10) <= 0) {
      errors.limitPerUser = "Limit Per User must be greater than 0";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAddCoupon = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    const coupon = {
      ...newCoupon,
      discount: parseFloat(newCoupon.discount),
      minOrderAmount: parseFloat(newCoupon.minOrderAmount) || null,
      maxDiscount: parseFloat(newCoupon.maxDiscount) || null,
      limitPerUser: parseInt(newCoupon.limitPerUser, 10) || null,
    };
    const updatedCoupons = [...coupons, coupon];
    setCoupons(updatedCoupons);
    setFilteredCoupons(updatedCoupons);
    setNewCoupon({
      name: "",
      code: "",
      discount: "",
      discountType: "Fixed",
      startDate: "",
      endDate: "",
      minOrderAmount: "",
      maxDiscount: "",
      limitPerUser: "",
      description: "",
      image: null,
    });
    setFormErrors({});
    setAddFileName("");
    setShowAddModal(false);
    setCurrentPage(1);
  };

  const handleAddFileChange = (e) => {
    const file = e.target.files[0];
    setNewCoupon({ ...newCoupon, image: file });
    setAddFileName(file ? file.name : "");
  };

  const handleViewCoupon = (coupon) => {
    setSelectedCoupon(coupon);
    setShowViewModal(true);
  };

  const handleEditCoupon = (coupon) => {
    setEditingCoupon(coupon);
    const formData = {
      ...coupon,
      discount: String(coupon.discount),
      minOrderAmount: String(coupon.minOrderAmount || ""),
      maxDiscount: String(coupon.maxDiscount || ""),
      limitPerUser: String(coupon.limitPerUser || ""),
      description: coupon.description || "",
      image: coupon.image || null,
    };
    setEditFormData(formData);
    setEditFileName(coupon.image instanceof File ? coupon.image.name : "");
    setShowEditModal(true);
  };

  const handleEditFormChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      const file = files[0];
      setEditFormData((prevData) => ({
        ...prevData,
        [name]: file,
      }));
      setEditFileName(file ? file.name : "");
    } else {
      setEditFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleUpdateCoupon = () => {
    const updatedCouponData = {
      ...editFormData,
      discount: parseFloat(editFormData.discount),
      minOrderAmount: parseFloat(editFormData.minOrderAmount) || null,
      maxDiscount: parseFloat(editFormData.maxDiscount) || null,
      limitPerUser: parseInt(editFormData.limitPerUser, 10) || null,
    };

    const updatedCoupons = coupons.map((c) =>
      c.code === editingCoupon.code ? updatedCouponData : c
    );

    setCoupons(updatedCoupons);
    setFilteredCoupons(updatedCoupons);
    setShowEditModal(false);
    setEditingCoupon(null);
    setEditFormData({});
    setEditFileName("");
    setCurrentPage(1);
  };

  const handleCancelEdit = () => {
    setShowEditModal(false);
    setEditingCoupon(null);
    setEditFormData({});
    setEditFileName("");
  };

  const handleDeleteClick = (coupon) => {
    setCouponToDelete(coupon);
    setShowDeleteConfirmModal(true);
  };

  const handleConfirmDelete = () => {
    const updatedCoupons = coupons.filter((c) => c.code !== couponToDelete.code);
    setCoupons(updatedCoupons);
    setFilteredCoupons(updatedCoupons);
    setShowDeleteConfirmModal(false);
    setCouponToDelete(null);
    setCurrentPage(1);
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirmModal(false);
    setCouponToDelete(null);
  };

  return (
    <div className="DSCoupon-container">
      <div className="DSheader">
        <h2 className="DStitle">E-Coupons</h2>
        <h6 className="DSbreadcrumb">
          <a href="/" className="DSbreadcrumb">Home</a> &gt;&gt; <span>E-Coupons</span>
        </h6>
      </div>
      <div className="DSCoupon-card">
        <div className="DSCoupon-header">
          <div className="DSHeader-buttons">
            <div className="DSDedropdown-container">
              <button
                ref={recordButtonRef}
                className="DSDErecord-button"
                onClick={() => setShowPageDropdown(!showPageDropdown)}
                title="Records"
              >
                {rowsPerPage}
                <IoMdArrowDropdown size={17} />
              </button>
              {showPageDropdown && (
                <div ref={recordDropdownRef} className="DSDEdropdown-menu">
                  {[5, 10, 15, 20].map((num) => (
                    <div
                      key={num}
                      className="DSDEdropdown-item"
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
            <button className="DSBtn-icon" onClick={toggleFilters} title="Filter">
              <PiSliders size={17} />
            </button>
            <div className="DSShare-dropdown-container" ref={shareRef}>
              <button
                className="DSBtn-icon"
                onClick={() => setShowShareDropdown(!showShareDropdown)}
                title="Share"
              >
                <FaShareFromSquare size={17} />
              </button>
              {showShareDropdown && (
                <div className="DSDropdown-menu">
                  <div onClick={handlePrint}>
                    <FiPrinter /> Print
                  </div>
                  <div onClick={handleExportXLS}>
                    <FiFileText /> XLS
                  </div>
                </div>
              )}
            </div>
            <button className="DSBtn-icon" onClick={() => setShowAddModal(true)} title="Add New Coupon">
              <RiAddBoxLine size={17} />
            </button>
          </div>
        </div>
        <hr className="DSHeader-divider" />
        {showFilters && (
          <div className="DSFilter-grid" style={{ marginBottom: "20px" }}>
            {[
              ["name", "code", "discount", "discountType"],
              ["startDate", "endDate", "minOrderAmount", "maxDiscount"],
              ["limitPerUser"],
            ].map((group, i) => (
              <div className="DSFilter-row" key={i}>
                {group.map((key) => (
                  <div key={key} className="DSFilter-field">
                    <label>{key.replace(/([A-Z])/g, " $1").replace(/^./, str => str.toUpperCase()).toLowerCase().replace(/^./, str => str.toUpperCase())}</label>
                    {key === "startDate" || key === "endDate" ? (
                      <div className="DSDate-input-container">
                        <input
                          type="datetime-local"
                          className="DSFilter-input DSDate-input"
                          name={key}
                          value={filters[key]}
                          onChange={handleInputChange}
                        />
                      </div>
                    ) : (
                      <input
                        name={key}
                        value={filters[key]}
                        onChange={handleInputChange}
                        placeholder=""
                      />
                    )}
                  </div>
                ))}
              </div>
            ))}
            <div className="DSFilter-buttons">
              <button className="DSSearch-button" onClick={handleSearch}>
                <CiSearch /> Search
              </button>
              <button className="DSClear-button" onClick={handleClear}>
                <MdClear /> Clear
              </button>
            </div>
          </div>
        )}
        <div className="DSCoupon-table-container">
          <table className="DSCoupon-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Code</th>
                <th>Discount</th>
                <th>Discount Type</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7">Loading...</td>
                </tr>
              ) : displayedCoupons.length === 0 ? (
                <tr>
                  <td colSpan="7">No entries found</td>
                </tr>
              ) : (
                displayedCoupons.map((c, index) => (
                  <tr key={index}>
                    <td>{c.name}</td>
                    <td>{c.code}</td>
                    <td>{c.discount.toFixed(2)}</td>
                    <td style={{ color: "#007bff", fontWeight: "500" }}>
                      {c.discountType}
                    </td>
                    <td>{c.startDate}</td>
                    <td>{c.endDate}</td>
                    <td className="DSAction-buttons-cell">
                      <button
                        className="DSAction-btn DSView"
                        onClick={() => handleViewCoupon(c)}
                      >
                        <FiEye />
                      </button>
                      <button
                        className="DSAction-btn DSEdit"
                        onClick={() => handleEditCoupon(c)}
                      >
                        <FiEdit2 />
                      </button>
                      <button
                        className="DSAction-btn DSDelete"
                        onClick={() => handleDeleteClick(c)}
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
        <div className="DSPagination-container">
          <div>
            Showing {Math.min((currentPage - 1) * rowsPerPage + 1, filteredCoupons.length)} to {Math.min(currentPage * rowsPerPage, filteredCoupons.length)} out of {filteredCoupons.length} entries
          </div>
          <div className="DSDEpagination-buttons">
            <button
              className="DSDEpagination-button"
              onClick={goToFirstPage}
              disabled={currentPage === 1}
            >
              <FaAngleLeft color="black" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                className={`DSDEpagination-button ${page === currentPage ? 'DSDEactive' : ''}`}
                onClick={() => goToPage(page)}
              >
                {page}
              </button>
            ))}
            <button
              className="DSDEpagination-button"
              onClick={goToLastPage}
              disabled={currentPage === totalPages}
            >
              <FaAngleRight color="black" />
            </button>
          </div>
        </div>
      </div>
      {/* Add New Coupon Modal */}
      {showAddModal && (
        <div className="DSModal-overlay">
          <div className="DSModal-content" ref={addModalRef}>
            <h3>Add New Coupon</h3>
            <form ref={addFormRef} onSubmit={handleAddCoupon} noValidate>
              <div className="DSForm-grid">
                <div className="DSForm-row">
                  <div className="DSFilter-field">
                    <label>
                      Name<span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={newCoupon.name}
                      onChange={(e) =>
                        setNewCoupon({ ...newCoupon, name: e.target.value })
                      }
                      required
                      className={formErrors.name ? "DSInput-error" : ""}
                    />
                    {formErrors.name && (
                      <span className="DSError-message">{formErrors.name}</span>
                    )}
                  </div>
                  <div className="DSFilter-field">
                    <label>
                      Code<span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="text"
                      name="code"
                      value={newCoupon.code}
                      onChange={(e) =>
                        setNewCoupon({ ...newCoupon, code: e.target.value })
                      }
                      required
                      className={formErrors.code ? "DSInput-error" : ""}
                    />
                    {formErrors.code && (
                      <span className="DSError-message">{formErrors.code}</span>
                    )}
                  </div>
                  <div className="DSFilter-field">
                    <label>
                      Discount<span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="number"
                      name="discount"
                      value={newCoupon.discount}
                      onChange={(e) =>
                        setNewCoupon({ ...newCoupon, discount: e.target.value })
                      }
                      required
                      min="0.01"
                      step="0.01"
                      className={formErrors.discount ? "DSInput-error" : ""}
                    />
                    {formErrors.discount && (
                      <span className="DSError-message">{formErrors.discount}</span>
                    )}
                  </div>
                </div>
                <div className="DSForm-row">
                  <div className="DSFilter-field">
                    <label>
                      Discount Type<span style={{ color: "red" }}>*</span>
                    </label>
                    <div className="DSRadio-group">
                      <label>
                        <input
                          type="radio"
                          name="discountType"
                          value="Fixed"
                          checked={newCoupon.discountType === "Fixed"}
                          onChange={(e) =>
                            setNewCoupon({
                              ...newCoupon,
                              discountType: e.target.value,
                            })
                          }
                          required
                        />
                        Fixed
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="discountType"
                          value="Percentage"
                          checked={newCoupon.discountType === "Percentage"}
                          onChange={(e) =>
                            setNewCoupon({
                              ...newCoupon,
                              discountType: e.target.value,
                            })
                          }
                        />
                        Percentage
                      </label>
                    </div>
                    {formErrors.discountType && (
                      <span className="DSError-message">{formErrors.discountType}</span>
                    )}
                  </div>
                  <div className="DSFilter-field">
                    <label>
                      Start Date<span style={{ color: "red" }}>*</span>
                    </label>
                    <div className="DSDate-input-container">
                      <input
                        type="datetime-local"
                        name="startDate"
                        value={newCoupon.startDate}
                        onChange={(e) =>
                          setNewCoupon({ ...newCoupon, startDate: e.target.value })
                        }
                        required
                        className={`DSFilter-input DSDate-input ${formErrors.startDate ? "DSInput-error" : ""}`}
                      />
                    </div>
                    {formErrors.startDate && (
                      <span className="DSError-message">{formErrors.startDate}</span>
                    )}
                  </div>
                  <div className="DSFilter-field">
                    <label>
                      End Date<span style={{ color: "red" }}>*</span>
                    </label>
                    <div className="DSDate-input-container">
                      <input
                        type="datetime-local"
                        name="endDate"
                        value={newCoupon.endDate}
                        onChange={(e) =>
                          setNewCoupon({ ...newCoupon, endDate: e.target.value })
                        }
                        required
                        className={`DSFilter-input DSDate-input ${formErrors.endDate ? "DSInput-error" : ""}`}
                      />
                    </div>
                    {formErrors.endDate && (
                      <span className="DSError-message">{formErrors.endDate}</span>
                    )}
                  </div>
                </div>
                <div className="DSForm-row">
                  <div className="DSFilter-field">
                    <label>
                      Minimum Order Amount<span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="number"
                      name="minOrderAmount"
                      value={newCoupon.minOrderAmount}
                      onChange={(e) =>
                        setNewCoupon({
                          ...newCoupon,
                          minOrderAmount: e.target.value,
                        })
                      }
                      required
                      min="0"
                      step="0.01"
                      className={formErrors.minOrderAmount ? "DSInput-error" : ""}
                    />
                    {formErrors.minOrderAmount && (
                      <span className="DSError-message">{formErrors.minOrderAmount}</span>
                    )}
                  </div>
                  <div className="DSFilter-field">
                    <label>
                      Maximum Discount<span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="number"
                      name="maxDiscount"
                      value={newCoupon.maxDiscount}
                      onChange={(e) =>
                        setNewCoupon({ ...newCoupon, maxDiscount: e.target.value })
                      }
                      required
                      min="0"
                      step="0.01"
                      className={formErrors.maxDiscount ? "DSInput-error" : ""}
                    />
                    {formErrors.maxDiscount && (
                      <span className="DSError-message">{formErrors.maxDiscount}</span>
                    )}
                  </div>
                  <div className="DSFilter-field">
                    <label>
                      Limit Per User<span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="number"
                      name="limitPerUser"
                      value={newCoupon.limitPerUser}
                      onChange={(e) =>
                        setNewCoupon({
                          ...newCoupon,
                          limitPerUser: e.target.value,
                        })
                      }
                      required
                      min="1"
                      step="1"
                      className={formErrors.limitPerUser ? "DSInput-error" : ""}
                    />
                    {formErrors.limitPerUser && (
                      <span className="DSError-message">{formErrors.limitPerUser}</span>
                    )}
                  </div>
                </div>
                <div className="DSForm-row">
                  <div className="DSFilter-field" style={{ gridColumn: "1 / 3" }}>
                    <label>
                      Description<span style={{ color: "red" }}>*</span>
                    </label>
                    <textarea
                      name="description"
                      value={newCoupon.description}
                      onChange={(e) =>
                        setNewCoupon({
                          ...newCoupon,
                          description: e.target.value,
                        })
                      }
                      rows={5}
                      required
                      className={`DSLarge-textarea ${formErrors.description ? "DSInput-error" : ""}`}
                    />
                    {formErrors.description && (
                      <span className="DSError-message">{formErrors.description}</span>
                    )}
                  </div>
                  <div className="DSFilter-field">
                    <label>
                      Image<span style={{ color: "red" }}>*</span>
                    </label>
                    <div className="DSFile-input-wrapper" data-filename={addFileName || ""}>
                      <input
                        type="file"
                        accept="image/*"
                        name="image"
                        onChange={handleAddFileChange}
                        required
                        className={`DSLarge-file-input ${formErrors.image ? "DSInput-error" : ""}`}
                      />
                    </div>
                    {formErrors.image && (
                      <span className="DSError-message">{formErrors.image}</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="DSForm-buttons" style={{ justifyContent: "flex-start" }}>
                <button className="DSClick-button" type="submit">
                  <FaCheck /> Save
                </button>
                <button
                  className="DSClear-button"
                  type="button"
                  onClick={() => {
                    setNewCoupon({
                      name: "",
                      code: "",
                      discount: "",
                      discountType: "Fixed",
                      startDate: "",
                      endDate: "",
                      minOrderAmount: "",
                      maxDiscount: "",
                      limitPerUser: "",
                      description: "",
                      image: null,
                    });
                    setFormErrors({});
                    setAddFileName("");
                    setShowAddModal(false);
                  }}
                >
                  <MdClear /> Clear
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* View Coupon Modal */}
      {showViewModal && selectedCoupon && (
        <div className="DSModal-overlay">
          <div className="DSModal-content" ref={viewModalRef}>
            <h3>E-Coupons <button className="DSClose-button" onClick={() => setShowViewModal(false)}>
              ×
            </button></h3>
            <div className="DSCoupon-details">
              <p>
                <strong>Name</strong> : {selectedCoupon.name}
              </p>
              <p>
                <strong>Code</strong> : {selectedCoupon.code}
              </p>
              <p>
                <strong>Discount</strong> : {selectedCoupon.discount.toFixed(2)}
              </p>
              <p>
                <strong>Discount Type</strong> : {selectedCoupon.discountType}
              </p>
              <p>
                <strong>Start Date</strong> : {selectedCoupon.startDate}
              </p>
              <p>
                <strong>End Date</strong> : {selectedCoupon.endDate}
              </p>
              <p>
                <strong>Minimum Order Amount</strong> :{" "}
                {selectedCoupon.minOrderAmount || "N/A"}
              </p>
              <p>
                <strong>Maximum Discount:</strong> :{" "}
                {selectedCoupon.maxDiscount || "N/A"}
              </p>
              <p>
                <strong>Limit Per User:</strong> :{" "}
                {selectedCoupon.limitPerUser || "N/A"}
              </p>
              {selectedCoupon.description && (
                <p>
                  <strong>Description:</strong> {selectedCoupon.description}
                </p>
              )}
              {selectedCoupon.image && (
                <p>
                  <strong>Image:</strong>{" "}
                  {selectedCoupon.image instanceof File ? (
                    <img
                      src={URL.createObjectURL(selectedCoupon.image)}
                      alt="Coupon"
                      style={{ maxWidth: "100px", maxHeight: "100px" }}
                    />
                  ) : (
                    <span>No image preview (file not loaded)</span>
                  )}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
      {/* Edit Coupon Modal */}
      {showEditModal && editingCoupon && (
        <div className="DSModal-overlay">
          <div className="DSModal-content" ref={editModalRef}>
            <h3>Edit Coupon</h3>
            <div className="DSForm-grid">
              <div className="DSForm-row">
                <div className="DSFilter-field">
                  <label>
                    Name<span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={editFormData.name || ""}
                    onChange={handleEditFormChange}
                    required
                  />
                </div>
                <div className="DSFilter-field">
                  <label>
                    Code<span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="code"
                    value={editFormData.code || ""}
                    onChange={handleEditFormChange}
                    required
                    readOnly
                  />
                </div>
                <div className="DSFilter-field">
                  <label>
                    Discount<span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="number"
                    name="discount"
                    value={editFormData.discount || ""}
                    onChange={handleEditFormChange}
                    required
                  />
                </div>
              </div>
              <div className="DSForm-row">
                <div className="DSFilter-field">
                  <label>
                    Discount Type<span style={{ color: "red" }}>*</span>
                  </label>
                  <div className="DSRadio-group">
                    <label>
                      <input
                        type="radio"
                        name="discountType"
                        value="Fixed"
                        checked={editFormData.discountType === "Fixed"}
                        onChange={handleEditFormChange}
                      />
                      Fixed
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="discountType"
                        value="Percentage"
                        checked={editFormData.discountType === "Percentage"}
                        onChange={handleEditFormChange}
                      />
                      Percentage
                    </label>
                  </div>
                </div>
                <div className="DSFilter-field">
                  <label>
                    Start Date<span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    value={editFormData.startDate || ""}
                    onChange={handleEditFormChange}
                    required
                  />
                </div>
                <div className="DSFilter-field">
                  <label>
                    End Date<span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="date"
                    name="endDate"
                    value={editFormData.endDate || ""}
                    onChange={handleEditFormChange}
                    required
                  />
                </div>
              </div>
              <div className="DSForm-row">
                <div className="DSFilter-field">
                  <label>
                    Minimum Order Amount<span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="number"
                    name="minOrderAmount"
                    value={editFormData.minOrderAmount || ""}
                    onChange={handleEditFormChange}
                    required
                  />
                </div>
                <div className="DSFilter-field">
                  <label>
                    Maximum Discount<span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="number"
                    name="maxDiscount"
                    value={editFormData.maxDiscount || ""}
                    onChange={handleEditFormChange}
                    required
                  />
                </div>
                <div className="DSFilter-field">
                  <label>
                    Limit Per User<span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="number"
                    name="limitPerUser"
                    value={editFormData.limitPerUser || ""}
                    onChange={handleEditFormChange}
                    required
                  />
                </div>
              </div>
              <div className="DSForm-row">
                <div className="DSFilter-field" style={{ gridColumn: "1 / 3" }}>
                  <label>
                    Description<span style={{ color: "red" }}>*</span>
                  </label>
                  <textarea
                    name="description"
                    value={editFormData.description || ""}
                    onChange={handleEditFormChange}
                    rows={5}
                    required
                    className="DSLarge-textarea"
                  />
                </div>
                <div className="DSFilter-field">
                  <label>
                    Image<span style={{ color: "red" }}>*</span>
                  </label>
                  <div className="DSFile-input-wrapper" data-filename={editFileName || ""}>
                    <input
                      type="file"
                      accept="image/*"
                      name="image"
                      onChange={handleEditFormChange}
                      className="DSEdit-file-input"
                    />
                  </div>
                  {editFormData.image && !(editFormData.image instanceof File) && (
                    <img
                      src={editFormData.image}
                      alt="Current"
                      style={{ maxWidth: "80px", maxHeight: "80px", marginTop: "5px" }}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="DSForm-buttons" style={{ justifyContent: "flex-start" }}>
              <button className="DSClick-button" onClick={handleUpdateCoupon}>
                <FaCheck /> Save
              </button>
              <button className="DSClear-button" onClick={handleCancelEdit}>
                <MdClear /> Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Delete Confirmation Modal */}
      {showDeleteConfirmModal && (
        <div className="DSModal-overlay">
          <div className="DSModal-content DSDelete-confirm-modal" ref={deleteModalRef}>
            <div className="DSDelete-icon">
              <CiCircleAlert size={78} color="gold" />
            </div>
            <h2>Are you sure ?</h2>
            <p className="DSDelete-message">
              You will not be able to recover the deleted record!
            </p>
            <div className="DSDelete-buttons">
              <button
                className="DSDelete-confirm-btn DSDelete-yes"
                onClick={handleConfirmDelete}
              >
                Yes, Delete it !
              </button>
              <button
                className="DSDelete-confirm-btn DSDelete-no"
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

export default Coupons;