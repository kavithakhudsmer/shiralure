import React, { useEffect, useState, useRef } from "react";
import { FiEye, FiTrash2, FiPrinter, FiFileText, FiEdit2 } from "react-icons/fi";
import { FaShareFromSquare, FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { MdClear } from "react-icons/md";
import { BiSolidAddToQueue } from "react-icons/bi";
import { CiSearch, CiCircleAlert } from "react-icons/ci";
import { IoMdArrowDropdown } from "react-icons/io";
import { FaCheck } from "react-icons/fa";
import { PiSliders } from "react-icons/pi";
import "./ProductSection.css";

function ProductSection() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showShareDropdown, setShowShareDropdown] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [showPageDropdown, setShowPageDropdown] = useState(false);
  const shareRef = useRef(null);
  const addModalRef = useRef(null);
  const viewModalRef = useRef(null);
  const editModalRef = useRef(null);
  const deleteModalRef = useRef(null);
  const recordButtonRef = useRef(null);
  const recordDropdownRef = useRef(null);

  const [filters, setFilters] = useState({
    name: "",
    status: "",
  });

  const [newProduct, setNewProduct] = useState({
    name: "",
    status: "Active",
  });

  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/products.json");
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error("Failed to load products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();

    const handleClickOutside = (event) => {
      if (shareRef.current && !shareRef.current.contains(event.target)) {
        setShowShareDropdown(false);
      }
      if (addModalRef.current && !addModalRef.current.contains(event.target)) {
        setShowAddModal(false);
        setFormErrors({});
      }
      if (viewModalRef.current && !viewModalRef.current.contains(event.target)) {
        setShowViewModal(false);
      }
      if (editModalRef.current && !editModalRef.current.contains(event.target)) {
        setShowEditModal(false);
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

  const totalPages = Math.ceil(filteredProducts.length / rowsPerPage);

  const goToFirstPage = () => setCurrentPage(1);

  const goToPage = (page) => setCurrentPage(page);

  const goToLastPage = () => setCurrentPage(totalPages);

  const displayedProducts = filteredProducts.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const toggleFilters = () => setShowFilters(!showFilters);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

 const handleSearch = () => {
  const filtered = products.filter((p) =>
    Object.keys(filters).every((key) => {
      if (!filters[key]) return true;
      if (key === "status") {
        return p[key]?.toLowerCase() === filters[key].toLowerCase();
      }
      return p[key]?.toString().toLowerCase().includes(filters[key].toLowerCase());
    })
  );
  setFilteredProducts(filtered);
  setCurrentPage(1);
};

  const handleClear = () => {
    const cleared = Object.fromEntries(Object.keys(filters).map((key) => [key, ""]));
    setFilters(cleared);
    setFilteredProducts(products);
    setCurrentPage(1);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExportXLS = () => {
    const csvContent = [
      ["Name", "Status"],
      ...filteredProducts.map((p) => [p.name, p.status]),
    ].map((row) => row.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "products.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const validateForm = () => {
    const errors = {};
    const requiredFields = ["name", "status"];

    requiredFields.forEach((field) => {
      if (!newProduct[field] || newProduct[field].toString().trim() === "") {
        errors[field] = `${field.replace(/([A-Z])/g, " $1").toUpperCase()} is required`;
      }
    });

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    const product = { ...newProduct };
    const updatedProducts = [...products, product];
    setProducts(updatedProducts);
    setFilteredProducts(updatedProducts);
    setNewProduct({
      name: "",
      status: "Active",
    });
    setFormErrors({});
    setShowAddModal(false);
    setCurrentPage(1);
  };

  const handleViewProduct = (product) => {
    setSelectedProduct(product);
    setShowViewModal(true);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    const formData = {
      ...product,
      name: String(product.name),
      status: product.status,
    };
    setEditFormData(formData);
    setShowEditModal(true);
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdateProduct = () => {
    const updatedProductData = { ...editFormData };

    const updatedProducts = products.map((p) =>
      p.name === editingProduct.name ? updatedProductData : p
    );

    setProducts(updatedProducts);
    setFilteredProducts(updatedProducts);
    setShowEditModal(false);
    setEditingProduct(null);
    setEditFormData({});
    setCurrentPage(1);
  };

  const handleCancelEdit = () => {
    setShowEditModal(false);
    setEditingProduct(null);
    setEditFormData({});
  };

  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setShowDeleteConfirmModal(true);
  };

  const handleConfirmDelete = () => {
    const updatedProducts = products.filter((p) => p.name !== productToDelete.name);
    setProducts(updatedProducts);
    setFilteredProducts(updatedProducts);
    setShowDeleteConfirmModal(false);
    setProductToDelete(null);
    setCurrentPage(1);
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirmModal(false);
    setProductToDelete(null);
  };

  return (
    <div className="dvsCouponContainer">
      <h2>Product Sections</h2>
      <div className="dvsCouponCard">
        <div className="dvsCouponHeader">
          <div className="dvsCouponHeaderButtons">
            <div className="dvsCouponDedropdownContainer">
              <button
                ref={recordButtonRef}
                className="dvsCouponDerecordButton"
                onClick={() => setShowPageDropdown(!showPageDropdown)}
                title="Records"
              >
                {rowsPerPage}
                <IoMdArrowDropdown size={17} />
              </button>
              {showPageDropdown && (
                <div ref={recordDropdownRef} className="dvsCouponDedropdownMenu">
                  {[5, 10, 15, 20].map((num) => (
                    <div
                      key={num}
                      className="dvsCouponDedropdownItem"
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
            <button className="dvsCouponBtnIcon" onClick={toggleFilters} title="Filter">
              <PiSliders size={17} />
            </button>
            <div className="dvsCouponShareDropdownContainer" ref={shareRef}>
              <button
                className="dvsCouponBtnIcon"
                onClick={() => setShowShareDropdown(!showShareDropdown)}
                title="Share"
              >
                <FaShareFromSquare size={17} />
              </button>
              {showShareDropdown && (
                <div className="dvsCouponDropdownMenu">
                  <div onClick={handlePrint}>
                    <FiPrinter /> Print
                  </div>
                  <div onClick={handleExportXLS}>
                    <FiFileText /> XLS
                  </div>
                </div>
              )}
            </div>
            <button className="dvsCouponBtnIcon" onClick={() => setShowAddModal(true)} title="Add New Product Section">
              <BiSolidAddToQueue size={17} />
            </button>
          </div>
        </div>
        <hr className="dvsCouponHeaderDivider" />
        {showFilters && (
          <div className="dvsCouponFilterGrid">
            <div className="dvsCouponFilterRow">
              <div className="dvsCouponFilterField">
                <label>Name</label>
                <input
                  name="name"
                  value={filters.name}
                  onChange={handleInputChange}
                  placeholder=""
                />
              </div>
              <div className="dvsCouponFilterField">
                <label>Status</label>
                <select
                  name="status"
                  value={filters.status}
                  onChange={handleInputChange}
                >
                  <option value="">Select status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
            <div className="dvsCouponFilterButtons">
              <button className="dvsCouponSearchButton" onClick={handleSearch}>
                <CiSearch /> Search
              </button>
              <button className="dvsCouponClearButton" onClick={handleClear}>
                <MdClear /> Clear
              </button>
            </div>
          </div>
        )}
        <div className="dvsCouponTableContainer">
          <table className="dvsCouponTable">
            <thead>
              <tr>
                <th>Name</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="3">Loading...</td>
                </tr>
              ) : displayedProducts.length === 0 ? (
                <tr>
                  <td colSpan="3">No entries found</td>
                </tr>
              ) : (
                displayedProducts.map((p, index) => (
                  <tr key={index}>
                    <td>{p.name}</td>
                    <td style={{ color: p.status === "Active" ? "#22C55E" : "#F4415F", fontWeight: "500" }}>
                      {p.status}
                    </td>
                    <td className="dvsCouponActionButtonsCell">
                      <button
                        className="dvsCouponActionBtn dvsCouponView"
                        onClick={() => handleViewProduct(p)}
                      >
                        <FiEye />
                      </button>
                      <button
                        className="dvsCouponActionBtn dvsCouponEdit"
                        onClick={() => handleEditProduct(p)}
                      >
                        <FiEdit2 />
                      </button>
                      <button
                        className="dvsCouponActionBtn dvsCouponDelete"
                        onClick={() => handleDeleteClick(p)}
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
            Showing {Math.min((currentPage - 1) * rowsPerPage + 1, filteredProducts.length)} to {Math.min(currentPage * rowsPerPage, filteredProducts.length)} out of {filteredProducts.length} entries
          </div>
          <div className="dvsCouponDepaginationButtons">
            <button
              className="dvsCouponDepaginationButton"
              onClick={goToFirstPage}
              disabled={currentPage === 1}
            >
              <FaAngleLeft color="black" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                className={`dvsCouponDepaginationButton ${page === currentPage ? 'dvsCouponDeactive' : ''}`}
                onClick={() => goToPage(page)}
              >
                {page}
              </button>
            ))}
            <button
              className="dvsCouponDepaginationButton"
              onClick={goToLastPage}
              disabled={currentPage === totalPages}
            >
              <FaAngleRight color="black" />
            </button>
          </div>
        </div>
      </div>
      {showAddModal && (
        <div className="dvsCouponModalOverlay">
          <div className="dvsCouponModalContent" ref={addModalRef}>
            <h3>Add New Product Section</h3>
            <form onSubmit={handleAddProduct} noValidate>
              <div className="dvsCouponFormGrid">
                <div className="dvsCouponFormRow">
                  <div className="dvsCouponFilterField">
                    <label>
                      Name<span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={newProduct.name}
                      onChange={(e) =>
                        setNewProduct({ ...newProduct, name: e.target.value })
                      }
                      required
                      className={formErrors.name ? "dvsCouponInputError" : ""}
                    />
                    {formErrors.name && (
                      <span className="dvsCouponErrorMessage">{formErrors.name}</span>
                    )}
                  </div>
                  <div className="dvsCouponFilterField">
                    <label>
                      Status<span style={{ color: "red" }}>*</span>
                    </label>
                    <div className="dvsCouponRadioGroup">
                      <label>
                        <input
                          type="radio"
                          name="status"
                          value="Active"
                          checked={newProduct.status === "Active"}
                          onChange={(e) =>
                            setNewProduct({ ...newProduct, status: e.target.value })
                          }
                          required
                        />
                        Active
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="status"
                          value="Inactive"
                          checked={newProduct.status === "Inactive"}
                          onChange={(e) =>
                            setNewProduct({ ...newProduct, status: e.target.value })
                          }
                        />
                        Inactive
                      </label>
                    </div>
                    {formErrors.status && (
                      <span className="dvsCouponErrorMessage">{formErrors.status}</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="dvsCouponFormButtons" style={{ justifyContent: "flex-start" }}>
                <button className="dvsCouponClickButton" type="submit">
                  <FaCheck /> Save
                </button>
                <button
                  className="dvsCouponClearButton"
                  type="button"
                  onClick={() => {
                    setNewProduct({ name: "", status: "Active" });
                    setFormErrors({});
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
      {showViewModal && selectedProduct && (
        <div className="dvsCouponModalOverlay">
          <div className="dvsCouponModalContent" ref={viewModalRef}>
            <h3>View Section <button className="dvsCouponCloseButton" onClick={() => setShowViewModal(false)}>
              ×
            </button></h3>
            <div className="dvsCouponProductDetails">
              <p>
                <strong>Name</strong> : {selectedProduct.name}
              </p>
              <p>
                <strong>Status</strong> :{" "}
                <span style={{ color: selectedProduct.status === "Active" ? "#22C55E" : "#F4415F", fontWeight: 500 }}>
                  {selectedProduct.status}
                </span>
              </p>
            </div>
          </div>
        </div>
      )}
      {showEditModal && editingProduct && (
        <div className="dvsCouponModalOverlay">
          <div className="dvsCouponModalContent" ref={editModalRef}>
            <h3>Edit Product Section</h3>
            <div className="dvsCouponFormGrid">
              <div className="dvsCouponFormRow">
                <div className="dvsCouponFilterField">
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
                <div className="dvsCouponFilterField">
                  <label>
                    Status<span style={{ color: "red" }}>*</span>
                  </label>
                  <div className="dvsCouponRadioGroup">
                    <label>
                      <input
                        type="radio"
                        name="status"
                        value="Active"
                        checked={editFormData.status === "Active"}
                        onChange={handleEditFormChange}
                      />
                      Active
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="status"
                        value="Inactive"
                        checked={editFormData.status === "Inactive"}
                        onChange={handleEditFormChange}
                      />
                      Inactive
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="dvsCouponFormButtons" style={{ justifyContent: "flex-start" }}>
              <button className="dvsCouponClickButton" onClick={handleUpdateProduct}>
                <FaCheck /> Save
              </button>
              <button className="dvsCouponClearButton" onClick={handleCancelEdit}>
                <MdClear /> Cancel
              </button>
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

export default ProductSection;