import React, { useEffect, useState, useRef } from "react";
import { FiEye, FiTrash2, FiPrinter, FiFileText, FiEdit2, FiX, FiInfo, FiPlus, FiCheck } from "react-icons/fi";
import { FaShareFromSquare, FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { MdClear } from "react-icons/md";
import { BiSolidAddToQueue } from "react-icons/bi";
import { CiSearch, CiCircleAlert } from "react-icons/ci";
import { IoMdArrowDropdown } from "react-icons/io";
import { FaCheck as FaCheckSolid } from "react-icons/fa"; // Renamed to avoid conflict with FiCheck
import { PiSliders } from "react-icons/pi";
import { BsBoxSeam } from "react-icons/bs";
import "./ProductSection.css";

// Dummy data for products with variations
const allProductsData = [
  { id: 1, name: "Electronics", status: "Active", slug: "electronics-slug", variations: [{ id: 101, name: "Laptop", price: "1200.00", status: "Active" }, { id: 102, name: "Mouse", price: "25.00", status: "Active" }] },
  { id: 2, name: "Apparel", status: "Inactive", slug: "apparel-slug", variations: [{ id: 201, name: "T-Shirt", price: "20.00", status: "Active" }, { id: 202, name: "Jeans", price: "50.00", status: "Inactive" }] },
  { id: 3, name: "Books", status: "Active", slug: "books-slug", variations: [{ id: 301, name: "Fiction", price: "15.00", status: "Active" }] },
  { id: 4, name: "Home Goods", status: "Active", slug: "home-goods-slug", variations: [] },
  { id: 5, name: "Sports", status: "Inactive", slug: "sports-slug", variations: [{ id: 501, name: "Basketball", price: "30.00", status: "Active" }] },
  { id: 6, name: "Toys", status: "Active", slug: "toys-slug", variations: [{ id: 601, name: "Action Figure", price: "10.00", status: "Active" }] },
  { id: 7, name: "Groceries", status: "Active", slug: "groceries-slug", variations: [] },
  { id: 8, name: "Automotive", status: "Inactive", slug: "automotive-slug", variations: [{ id: 801, name: "Tires", price: "100.00", status: "Active" }] },
  { id: 9, name: "Health", status: "Active", slug: "health-slug", variations: [{ id: 901, name: "Vitamins", price: "20.00", status: "Active" }] },
  { id: 10, name: "Beauty", status: "Active", slug: "beauty-slug", variations: [{ id: 1001, name: "Shampoo", price: "10.00", status: "Active" }] },
];

// Dummy product options for AddProductModal (can be fetched from an API)
const allProductOptions = [
  { id: 101, name: 'Laptop', price: '1200.00' },
  { id: 102, name: 'Mouse', price: '25.00' },
  { id: 201, name: 'T-Shirt', price: '20.00' },
  { id: 202, name: 'Jeans', price: '50.00' },
  { id: 301, name: 'Fiction Book', price: '15.00' },
  { id: 501, name: 'Basketball', price: '30.00' },
  { id: 601, name: 'Action Figure', price: '10.00' },
  { id: 801, name: 'Car Tires', price: '100.00' },
  { id: 901, name: 'Vitamins', price: '20.00' },
  { id: 1001, name: 'Shampoo', price: '10.00' },
];

// --- DeleteModal Component (formerly DeleteModal.jsx) ---
const DeleteConfirmModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="ps-delete-modal-overlay">
      <div className="ps-delete-modal-content ps-delete-confirm-modal">
        <div className="ps-delete-icon">
          <CiCircleAlert size={78} color="gold" />
        </div>
        <h2>Are you sure?</h2>
        <p className="ps-delete-message">
          You will not be able to recover the deleted record!
        </p>
        <div className="ps-delete-buttons">
          <button
            className="ps-delete-confirm-btn ps-delete-yes"
            onClick={onConfirm}
          >
            <FaCheckSolid /> Yes, Delete it!
          </button>
          <button
            className="ps-delete-confirm-btn ps-delete-no"
            onClick={onClose}
          >
            <MdClear /> No, Cancel!
          </button>
        </div>
      </div>
    </div>
  );
};

// --- AddProductModal Component (formerly AddProductModal.jsx) ---
const AddProductModal = ({ isOpen, onClose, onAdd, productOptions }) => {
  const [selectedProduct, setSelectedProduct] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedProduct) {
      setError('Product is required');
      return;
    }
    setError('');
    onAdd(selectedProduct);
    setSelectedProduct('');
  };

  const handleProductChange = (e) => {
    setSelectedProduct(e.target.value);
    if (e.target.value) {
      setError('');
    }
  };

  return (
    <div className="ps-add-modal-overlay">
      <div className="ps-add-modal-content">
        <div className="ps-add-modal-header">
          <h3 className="ps-add-modal-title">Products</h3>
          <button className="ps-add-modal-close" onClick={onClose}>
            <FiX />
          </button>
        </div>
        <div className="ps-add-modal-body">
          <form onSubmit={handleSubmit}>
            <div className="ps-add-form-group">
              <label className="ps-add-form-label ps-add-required">Product</label>
              <select
                className="ps-add-form-select"
                value={selectedProduct}
                onChange={handleProductChange}
                required
              >
                <option value="">Select a product</option>
                {productOptions.map(product => (
                  <option key={product.id} value={product.id}>
                    {product.name} (₹{product.price})
                  </option>
                ))}
              </select>
              {error && <p className="ps-add-form-error" style={{ color: 'red', marginTop: '5px' }}>{error}</p>}
            </div>
          </form>
        </div>
        <div className="ps-add-modal-footer">
          <button
            className="ps-add-modal-button ps-add-modal-button-secondary"
            onClick={onClose}
          >
            <FiX /> Close
          </button>
          <button
            className="ps-add-modal-button ps-add-modal-button-primary"
            onClick={handleSubmit}
          >
            <FiCheck /> Save
          </button>
        </div>
      </div>
    </div>
  );
};

// --- ViewProductPage Component (formerly ViewProductPage.jsx) ---
const ProductDetailsPage = ({ product, onClose, onUpdateProductVariations }) => {
  const [activeTab, setActiveTab] = useState('information');
  const [variations, setVariations] = useState(product.variations || []);
  const [variationToDelete, setVariationToDelete] = useState(null);
  const [showDeleteVariationModal, setShowDeleteVariationModal] = useState(false);
  const [showAddVariationModal, setShowAddVariationModal] = useState(false);

  useEffect(() => {
    setVariations(product.variations || []);
  }, [product]);

  const handleDeleteVariationClick = (variationId) => {
    setVariationToDelete(variationId);
    setShowDeleteVariationModal(true);
  };

  const confirmDeleteVariation = () => {
    const updatedVariations = variations.filter(v => v.id !== variationToDelete);
    setVariations(updatedVariations);
    onUpdateProductVariations(product.id, updatedVariations); // Propagate change to parent
    setShowDeleteVariationModal(false);
    setVariationToDelete(null);
  };

  const handleAddVariation = (selectedProductId) => {
    const variationToAdd = allProductOptions.find(p => p.id === parseInt(selectedProductId));
    if (variationToAdd) {
      const newVariations = [...variations, {
        id: variationToAdd.id,
        name: variationToAdd.name,
        price: variationToAdd.price,
        status: 'Active'
      }];
      setVariations(newVariations);
      onUpdateProductVariations(product.id, newVariations); // Propagate change to parent
    }
    setShowAddVariationModal(false);
  };

  return (
    <div className="ps-view-page-container">
     <div className="psheader">
        <div className="psheader-content">
          <h1>Product Section</h1>
          <div className="psbreadcrumb">
            <span className="pshome">Home</span> &gt;&gt; Product Section
          </div>
        </div>
      </div>

      <div className="ps-view-tabs-container">
        <div className="ps-view-tabs">
          <button
            className={`ps-view-tab ${activeTab === 'information' ? 'ps-view-active' : ''}`}
            onClick={() => setActiveTab('information')}
          >
            <FiInfo className="ps-view-tab-icon" /> Information
          </button>
          <button
            className={`ps-view-tab ${activeTab === 'variations' ? 'ps-view-active' : ''}`}
            onClick={() => setActiveTab('variations')}
          >
            <BsBoxSeam className="ps-view-tab-icon" /> Products
          </button>
        </div>
      </div>

      <div className="ps-view-tab-content">
        {activeTab === 'information' && (
          <div className="ps-view-info-card">
            <div className="ps-view-info-title">Information</div>
            <div className="ps-view-info-grid">
              <div className="ps-view-info-item"> {/* Name */}
                <div className="ps-view-info-label">Name</div>
                <div className="ps-view-info-value">{product.name}</div>
              </div>
              <div className="ps-view-info-item"> {/* Status */}
                <div className="ps-view-info-label">Status</div>
                <div className={`ps-view-info-value ${product.status.toLowerCase()}`}>{product.status}</div>
              </div>
              <div className="ps-view-info-item"> {/* Slug */}
                <div className="ps-view-info-label">Slug</div>
                <div className="ps-view-info-value">{product.name}</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'variations' && (
          <div className="ps-view-variations-section">
          
            <div className="ps-view-variations-card">
                <div className="ps-view-variations-header">
                  Products
              <button className="ps-view-add-variation-button" onClick={() => setShowAddVariationModal(true)}>
                <FiPlus className="ps-view-add-icon" />
                Add Product
              </button>
            </div>
              {variations.length > 0 ? (
                <div className="ps-view-variations-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {variations.map(v => (
                        <tr key={v.id}>
                          <td>{v.name}</td>
                          <td>₹{v.price}</td>
                          <td>
                            <span className={`ps-view-status-badge ${v.status.toLowerCase()}`}>
                              {v.status}
                            </span>
                          </td>
                          <td>
                            <button className="ps-view-delete-button" onClick={() => handleDeleteVariationClick(v.id)}>
                              <FiTrash2 />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="ps-view-variations-placeholder">
                  <p>No variations found for this product.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <DeleteConfirmModal isOpen={showDeleteVariationModal} onClose={() => setShowDeleteVariationModal(false)} onConfirm={confirmDeleteVariation} />
      <AddProductModal isOpen={showAddVariationModal} onClose={() => setShowAddVariationModal(false)} onAdd={handleAddVariation} productOptions={allProductOptions} />
    </div>
  );
};


// --- Main ProductSection Component ---
function ProductSection() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showShareDropdown, setShowShareDropdown] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showProductDetailsPage, setShowProductDetailsPage] = useState(false);
  const [productToView, setProductToView] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [showPageDropdown, setShowPageDropdown] = useState(false);
  const shareRef = useRef(null);
  const addModalRef = useRef(null);
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
    variations: [],
  });

  const [formErrors, setFormErrors] = useState({});
  const [editFormErrors, setEditFormErrors] = useState({});

  useEffect(() => {
    setProducts(allProductsData);
    setFilteredProducts(allProductsData);
    setLoading(false);

    const handleClickOutside = (event) => {
      if (shareRef.current && !shareRef.current.contains(event.target)) {
        setShowShareDropdown(false);
      }
      if (addModalRef.current && !addModalRef.current.contains(event.target)) {
        setShowAddModal(false);
        setFormErrors({});
      }
      if (editModalRef.current && !editModalRef.current.contains(event.target)) {
        setShowEditModal(false);
        setEditFormErrors({});
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

  const validateAddForm = () => {
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

  const validateEditForm = () => {
    const errors = {};
    const requiredFields = ["name", "status"];
    requiredFields.forEach((field) => {
      if (!editFormData[field] || editFormData[field].toString().trim() === "") {
        errors[field] = `${field.replace(/([A-Z])/g, " $1").toUpperCase()} is required`;
      }
    });
    setEditFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAddProductChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
    if (name === "name" && value.trim() !== "") {
      setFormErrors((prev) => ({ ...prev, name: undefined }));
    }
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!validateAddForm()) {
      return;
    }
    const product = { ...newProduct, id: products.length + 1 };
    const updatedProducts = [...products, product];
    setProducts(updatedProducts);
    setFilteredProducts(updatedProducts);
    setNewProduct({ name: "", status: "Active", variations: [] });
    setFormErrors({});
    setShowAddModal(false);
    setCurrentPage(1);
  };

  const handleViewProduct = (product) => {
    setProductToView(product);
    setShowProductDetailsPage(true);
  };

  const handleCloseProductDetailsPage = () => {
    setShowProductDetailsPage(false);
    setProductToView(null);
  };

  const handleUpdateProductVariations = (productId, updatedVariations) => {
    setProducts((prevProducts) =>
      prevProducts.map((p) =>
        p.id === productId ? { ...p, variations: updatedVariations } : p
      )
    );
    setFilteredProducts((prevFilteredProducts) =>
      prevFilteredProducts.map((p) =>
        p.id === productId ? { ...p, variations: updatedVariations } : p
      )
    );
    if (productToView && productToView.id === productId) {
      setProductToView((prevProduct) => ({ ...prevProduct, variations: updatedVariations }));
    }
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
    if (name === "name" && value.trim() !== "") {
      setEditFormErrors((prev) => ({ ...prev, name: undefined }));
    }
  };

  const handleUpdateProduct = (e) => {
    e.preventDefault();
    if (!validateEditForm()) {
      return;
    }
    const updatedProductData = { ...editFormData };
    const updatedProducts = products.map((p) =>
      p.id === editingProduct.id ? updatedProductData : p
    );
    setProducts(updatedProducts);
    setFilteredProducts(updatedProducts);
    setShowEditModal(false);
    setEditingProduct(null);
    setEditFormData({});
    setEditFormErrors({});
    setCurrentPage(1);
  };

  const handleCancelEdit = () => {
    setShowEditModal(false);
    setEditingProduct(null);
    setEditFormData({});
    setEditFormErrors({});
  };

  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setShowDeleteConfirmModal(true);
  };

  const handleConfirmDelete = () => {
    const updatedProducts = products.filter((p) => p.id !== productToDelete.id);
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

  if (showProductDetailsPage && productToView) {
    return (
      <ProductDetailsPage
        product={productToView}
        onClose={handleCloseProductDetailsPage}
        onUpdateProductVariations={handleUpdateProductVariations}
      />
    );
  }

  return (
    <div className="psCouponContainer">
      <div className="psheader">
        <div className="psheader-content">
          <h1>Product Sections</h1>
          <div className="psbreadcrumb">
            <span className="pshome">Home</span> &gt;&gt; Product Sections
          </div>
        </div>
      </div>
      <div className="psCouponCard">
        <div className="psCouponHeader">
          <div className="psCouponHeaderButtons">
            <div className="psCouponDedropdownContainer">
              <button
                ref={recordButtonRef}
                className="psCouponDerecordButton"
                onClick={() => setShowPageDropdown(!showPageDropdown)}
                title="Records"
              >
                {rowsPerPage}
                <IoMdArrowDropdown size={17} />
              </button>
              {showPageDropdown && (
                <div ref={recordDropdownRef} className="psCouponDedropdownMenu">
                  {[5, 10, 15, 20].map((num) => (
                    <div
                      key={num}
                      className="psCouponDedropdownItem"
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
            <button className="psCouponBtnIcon" onClick={toggleFilters} title="Filter">
              <PiSliders size={17} />
            </button>
            <div className="psCouponShareDropdownContainer" ref={shareRef}>
              <button
                className="psCouponBtnIcon"
                onClick={() => setShowShareDropdown(!showShareDropdown)}
                title="Share"
              >
                <FaShareFromSquare size={17} />
              </button>
              {showShareDropdown && (
                <div className="psCouponDropdownMenu">
                  <div onClick={handlePrint}>
                    <FiPrinter /> Print
                  </div>
                  <div onClick={handleExportXLS}>
                    <FiFileText /> XLS
                  </div>
                </div>
              )}
            </div>
            <button className="psCouponBtnIcon" onClick={() => setShowAddModal(true)} title="Add New Product Section">
              <BiSolidAddToQueue size={17} />
            </button>
          </div>
        </div>
        <hr className="psCouponHeaderDivider" />
        {showFilters && (
          <div className="psCouponFilterGrid">
            <div className="psCouponFilterRow">
              <div className="psCouponFilterField">
                <label>Name</label>
                <input
                  name="name"
                  value={filters.name}
                  onChange={handleInputChange}
                  placeholder=""
                />
              </div>
              <div className="psCouponFilterField">
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
            <div className="psCouponFilterButtons">
              <button className="psCouponSearchButton" onClick={handleSearch}>
                <CiSearch /> Search
              </button>
              <button className="psCouponClearButton" onClick={handleClear}>
                <MdClear /> Clear
              </button>
            </div>
          </div>
        )}
        <div className="psCouponTableContainer">
          <table className="psCouponTable">
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
                    <td className="psCouponActionButtonsCell">
                      <button
                        className="psCouponActionBtn psCouponView"
                        onClick={() => handleViewProduct(p)}
                      >
                        <FiEye />
                      </button>
                      <button
                        className="psCouponActionBtn psCouponEdit"
                        onClick={() => handleEditProduct(p)}
                      >
                        <FiEdit2 />
                      </button>
                      <button
                        className="psCouponActionBtn psCouponDelete"
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
        <div className="psCouponPaginationContainer">
          <div>
            Showing {Math.min((currentPage - 1) * rowsPerPage + 1, filteredProducts.length)} to {Math.min(currentPage * rowsPerPage, filteredProducts.length)} out of {filteredProducts.length} entries
          </div>
          <div className="psCouponDepaginationButtons">
            <button
              className="psCouponDepaginationButton"
              onClick={goToFirstPage}
              disabled={currentPage === 1}
            >
              <FaAngleLeft color="black" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                className={`psCouponDepaginationButton ${page === currentPage ? 'psCouponDeactive' : ''}`}
                onClick={() => goToPage(page)}
              >
                {page}
              </button>
            ))}
            <button
              className="psCouponDepaginationButton"
              onClick={goToLastPage}
              disabled={currentPage === totalPages}
            >
              <FaAngleRight color="black" />
            </button>
          </div>
        </div>
      </div>
      {showAddModal && (
        <div className="psCouponModalOverlay">
          <div className="psCouponModalContent" ref={addModalRef}>
            <h3>Add New Product Section</h3>
            <form onSubmit={handleAddProduct} noValidate>
              <div className="psCouponFormGrid">
                <div className="psCouponFormRow">
                  <div className="psCouponFilterField">
                    <label>
                      Name<span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={newProduct.name}
                      onChange={handleAddProductChange}
                      required
                      className={formErrors.name ? "psCouponInputError" : ""}
                    />
                    {formErrors.name && (
                      <span className="psCouponErrorMessage">{formErrors.name}</span>
                    )}
                  </div>
                  <div className="psCouponFilterField">
                    <label>
                      Status<span style={{ color: "red" }}>*</span>
                    </label>
                    <div className="psCouponRadioGroup">
                      <label>
                        <input
                          type="radio"
                          name="status"
                          value="Active"
                          checked={newProduct.status === "Active"}
                          onChange={handleAddProductChange}
                        />
                        Active
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="status"
                          value="Inactive"
                          checked={newProduct.status === "Inactive"}
                          onChange={handleAddProductChange}
                        />
                        Inactive
                      </label>
                    </div>
                    {formErrors.status && (
                      <span className="psCouponErrorMessage">{formErrors.status}</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="psCouponFormButtons" style={{ justifyContent: "flex-start" }}>
                <button className="psCouponClickButton" type="submit">
                  <FaCheckSolid /> Save
                </button>
                <button
                  className="psCouponClearButton"
                  type="button"
                  onClick={() => {
                    setNewProduct({ name: "", status: "Active", variations: [] });
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
      {showEditModal && editingProduct && (
        <div className="psCouponModalOverlay">
          <div className="psCouponModalContent" ref={editModalRef}>
            <h3>Edit Product Section</h3>
            <form onSubmit={handleUpdateProduct} noValidate>
              <div className="psCouponFormGrid">
                <div className="psCouponFormRow">
                  <div className="psCouponFilterField">
                    <label>
                      Name<span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={editFormData.name || ""}
                      onChange={handleEditFormChange}
                      required
                      className={editFormErrors.name ? "psCouponInputError" : ""}
                    />
                    {editFormErrors.name && (
                      <span className="psCouponErrorMessage">{editFormErrors.name}</span>
                    )}
                  </div>
                  <div className="psCouponFilterField">
                    <label>
                      Status<span style={{ color: "red" }}>*</span>
                    </label>
                    <div className="psCouponRadioGroup">
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
                    {editFormErrors.status && (
                      <span className="psCouponErrorMessage">{editFormErrors.status}</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="psCouponFormButtons" style={{ justifyContent: "flex-start" }}>
                <button className="psCouponClickButton" type="submit">
                  <FaCheckSolid /> Save
                </button>
                <button className="psCouponClearButton" type="button" onClick={handleCancelEdit}>
                  <MdClear /> Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {showDeleteConfirmModal && (
        <div className="psCouponModalOverlay">
          <div className="psCouponModalContent psCouponDeleteConfirmModal" ref={deleteModalRef}>
            <div className="psCouponDeleteIcon">
              <CiCircleAlert size={78} color="gold" />
            </div>
            <h2>Are you sure ?</h2>
            <p className="psCouponDeleteMessage">
              You will not be able to recover the deleted record!
            </p>
            <div className="psCouponDeleteButtons">
              <button
                className="psCouponDeleteConfirmBtn psCouponDeleteYes"
                onClick={handleConfirmDelete}
              >
                Yes, Delete it !
              </button>
              <button
                className="psCouponDeleteConfirmBtn psCouponDeleteNo"
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
