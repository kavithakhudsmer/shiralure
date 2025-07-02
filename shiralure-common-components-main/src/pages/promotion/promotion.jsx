import React, { useState, useEffect, useRef } from 'react';
import {
   FiChevronDown, FiEye, FiEdit2, FiTrash2, FiPrinter, FiFile, FiX, FiInfo, FiImage, FiGrid, FiUpload, FiPlus, FiCheck
} from 'react-icons/fi';
import { MdLibraryAdd } from "react-icons/md";
import { PiSliders } from "react-icons/pi";
import { TiExport } from "react-icons/ti";
import { FaSearch, FaTimes, FaCheck as FaCheckSolid } from 'react-icons/fa'; // Renamed FaCheck to avoid conflict
import * as XLSX from 'xlsx';
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import './promotion.css';
// Removed import of PromotionsFilter.css as its styles are now in promotion.css

// AddPromotionModal Component
const AddPromotionModal = ({ onClose, onSave }) => {
  const [promotion, setPromotion] = React.useState({
    name: '',
    status: 'Available', // Default status as per screenshot
    image: null, // To store the selected file object
    imageName: 'No file chosen', // To display the file name
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPromotion(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPromotion(prev => ({
        ...prev,
        image: file,
        imageName: file.name
      }));
    } else {
      setPromotion(prev => ({
        ...prev,
        image: null,
        imageName: 'No file chosen'
      }));
    }
  };

  const handleClear = () => {
    setPromotion({
      name: '',
      status: 'Available',
      image: null,
      imageName: 'No file chosen',
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Map 'Available'/'Unavailable' from modal to 'Active'/'Inactive' for dashboard
    const statusForDashboard = promotion.status === 'Available' ? 'Active' : 'Inactive';
    onSave({ ...promotion, status: statusForDashboard });
  };

  return (
    <div className="eds-modal-overlay">
      <div className="eds-modal-content">
        <div className="eds-modal-header">
          <h2>Promotions</h2> {/* Changed to Promotions as per screenshot */}
          <button className="close1-btn" onClick={onClose}>&times;</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="eds-form-group">
            <label>NAME <span className="eds-required-asterisk">*</span></label>
            <input
              type="text"
              name="name"
              value={promotion.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="eds-form-group">
            <label>STATUS <span className="eds-required-asterisk">*</span></label>
            <div className="eds-radio-group">
              <label className="eds-radio-label">
                <input
                  type="radio"
                  name="status"
                  value="Available"
                  checked={promotion.status === 'Available'}
                  onChange={handleChange}
                  required
                />
                Available
              </label>
              <label className="eds-radio-label">
                <input
                  type="radio"
                  name="status"
                  value="Unavailable"
                  checked={promotion.status === 'Unavailable'}
                  onChange={handleChange}
                  required
                />
                Unavailable
              </label>
            </div>
          </div>
          <div className="eds-form-group">
            <label>IMAGE (548PX.140PX) <span className="eds-required-asterisk">*</span></label>
            <div className="eds-file-input-wrapper">
              <input
                type="file"
                id="image-upload"
                className="eds-file-input"
                onChange={handleImageChange}
                required
              />
              <label htmlFor="image-upload" className="eds-choose-file-button">
                Choose File
              </label>
              <span className="eds-file-name-display">{promotion.imageName}</span>
            </div>
          </div>
          <div className="eds-modal-actions">
            <button type="button" className="eds-clear-btn" onClick={handleClear}>
              <FaTimes className="eds-button-icon" /> Clear
            </button>
            <button type="submit" className="eds-save-btn">
              <FaCheckSolid className="eds-button-icon" /> Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// EditPromotionModal Component
const EditPromotionModal = ({ promotion, onClose, onSave }) => {
  const [editedPromotion, setEditedPromotion] = useState(promotion);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setEditedPromotion(promotion);
  }, [promotion]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedPromotion({
      ...editedPromotion,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!editedPromotion.name) newErrors.name = 'Name is required';
    if (!editedPromotion.type) newErrors.type = 'Type is required';
    if (!editedPromotion.status) newErrors.status = 'Status is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSave(editedPromotion);
  };

  return (
    <div className="eds-edit-modal-overlay">
      <div className="eds-edit-modal-container">
        <div className="eds-edit-modal-header">
          <h2 className="eds-edit-modal-title">Edit Promotion</h2>
          <button className="eds-edit-modal-close-btn" onClick={onClose}>
            <FiX />
          </button>
        </div>

        <form className="eds-edit-promotion-form" onSubmit={handleSubmit}>
          <div className="eds-edit-form-group">
            <label className="eds-edit-form-label" htmlFor="name">
              Name<span className="eds-edit-required">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="eds-edit-form-input"
              value={editedPromotion.name || ''}
              onChange={handleChange}
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          <div className="eds-edit-form-group">
            <label className="eds-edit-form-label" htmlFor="type">
              Type<span className="eds-edit-required">*</span>
            </label>
            <select
              id="type"
              name="type"
              className="eds-edit-form-input"
              value={editedPromotion.type || ''}
              onChange={handleChange}
            >
              <option value="">Select Type</option>
              <option value="Small">Small</option>
              <option value="Big">Big</option>
              <option value="Medium">Medium</option>
            </select>
            {errors.type && <span className="error-message">{errors.type}</span>}
          </div>

          <div className="eds-edit-form-group">
            <label className="eds-edit-form-label" htmlFor="status">
              Status<span className="eds-edit-required">*</span>
            </label>
            <div className="eds-edit-radio-group">
              <label className="eds-edit-radio-label">
                <input
                  type="radio"
                  name="status"
                  value="Active"
                  className="eds-edit-radio-input"
                  checked={editedPromotion.status === 'Active'}
                  onChange={handleChange}
                />
                Active
              </label>
              <label className="eds-edit-radio-label">
                <input
                  type="radio"
                  name="status"
                  value="Inactive"
                  className="eds-edit-radio-input"
                  checked={editedPromotion.status === 'Inactive'}
                  onChange={handleChange}
                />
                Inactive
              </label>
            </div>
            {errors.status && <span className="error-message">{errors.status}</span>}
          </div>

          <div className="eds-edit-form-group">
            <label className="eds-edit-form-label" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              className="eds-edit-form-input"
              rows={3}
              value={editedPromotion.description || ''}
              onChange={handleChange}
            />
          </div>

          <div className="eds-edit-modal-actions">
            <button
              type="button"
              className="eds-edit-clear-btn"
              onClick={onClose}
            >
              <FaTimes/> Clear
            </button>
            <button type="submit" className="eds-edit-save-btn">
              <FaCheckSolid/> Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// DeleteModal Component
const DeleteModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="eds-msdel-modal-overlay">
        <div className="eds-msdel-modal-content">
          <div className="eds-msdel-modal-body">
            {/* Warning Icon */}
            <svg
              className="eds-msdel-warning-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
              <path d="M12 9v4" />
              <path d="M12 17h.01" />
            </svg>

            <h3 className="eds-msdel-modal-title">Are you sure?</h3>
            <p className="eds-msdel-modal-description">
              You will not be able to recover the deleted record!
            </p>
          </div>

          <div className="eds-msdel-modal-footer">
            <button
              className="eds-msdel-modal-button eds-msdel-modal-button-primary"
              onClick={onConfirm}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M5 12l5 5l10 -10" />
              </svg>
              Yes, Delete it !
            </button>

            <button
              className="eds-msdel-modal-button eds-msdel-modal-button-secondary"
              onClick={onClose}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M18 6l-12 12" />
                <path d="M6 6l12 12" />
              </svg>
              No, Cancel !
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

// AddProductModal Component (moved here)
const AddProductModal = ({ isOpen, onClose, onAdd, productOptions }) => {
  const [selectedProduct, setSelectedProduct] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(selectedProduct);
    setSelectedProduct('');
  };

  return (
    <div className="eds-modal-overlay">
      <div className="eds-modal-content">
        <div className="eds-modal-header">
          <h3 className="eds-modal-title">Products</h3>
          <button
            className="eds-modal-close"
            onClick={onClose}
          >
            <FiX />
          </button>
        </div>
        <div className="eds-modal-body">
          <form onSubmit={handleSubmit}>
            <div className="eds-form-group">
              <label className="eds-form-label required">Product</label>
              <select
                className="eds-form-select"
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(e.target.value)}
                required
              >
                <option value="">Select a product</option>
                {productOptions.map(product => (
                  <option key={product.id} value={product.id}>
                    {product.name} (₹{product.price})
                  </option>
                ))}
              </select>
            </div>
          </form>
        </div>
        <div className="eds-modal-footer">
          <button
            className="eds-modal-button eds-modal-button-secondary"
            onClick={onClose}
          >
            <FiX /> Close
          </button>
          <button
            className="eds-modal-button eds-modal-button-primary"
            onClick={() => onAdd(selectedProduct)}
            disabled={!selectedProduct}
          >
            <FiCheck /> Save
          </button>
        </div>
      </div>
    </div>
  );
};


// ViewPromotion Component
const ViewPromotion = ({ promotion, onClose }) => {
  const [activeTab, setActiveTab] = useState('information');
  const [products, setProducts] = useState([
    { id: 1, name: 'Exclusive Products', price: '1921.00', status: 'Active' },
    { id: 2, name: 'Winter Products', price: '1921.00', status: 'Active' }
  ]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false); // State for AddProductModal

  const productOptions = [
    { id: 3, name: 'Summer Collection', price: '2500.00' },
    { id: 4, name: 'Spring Special', price: '1800.00' },
    { id: 5, name: 'Autumn Arrival', price: '2200.00' }
  ];

  const handleDeleteClick = (productId) => {
    setProductToDelete(productId);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setProducts(products.filter(product => product.id !== productToDelete));
    setShowDeleteModal(false);
    setProductToDelete(null);
  };

  const handleAddProduct = (selectedProductId) => {
    const productToAdd = productOptions.find(p => p.id === parseInt(selectedProductId));
    if (productToAdd) {
      setProducts([...products, {
        id: productToAdd.id,
        name: productToAdd.name,
        price: productToAdd.price,
        status: 'Active'
      }]);
    }
    setShowAddModal(false);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log('File uploaded:', file.name);
    }
  };

  if (!promotion) {
    return (
      <div className="eds-view-promotion-page">
        <div className="eds-promotion-not-found">
          Promotion not found!
        </div>
      </div>
    );
  }

  return (
    <div className="eds-view-promotion-page">
      <div className="eds-header">
        <div className="eds-header-content">
          <div className="eds-header-left">
            <h1>Promotion Details</h1>
          </div>
          <div className="eds-header-right">
            <div className="eds-breadcrumb">
              <a href="#" className="eds-breadcrumb-home" onClick={onClose}>Home</a>
              <span> &gt;&gt; </span>
              <span className="eds-breadcrumb-promotions">Promotions</span>
            </div>
          </div>
        </div>
      </div>

      <div className="eds-tabs-container">
        <div className="eds-tabs">
          <button
            className={`eds-tab ${activeTab === 'information' ? 'active' : ''}`}
            onClick={() => setActiveTab('information')}
          >
            <FiInfo className="eds-tab-icon" />
            Information
          </button>
          <button
            className={`eds-tab ${activeTab === 'images' ? 'active' : ''}`}
            onClick={() => setActiveTab('images')}
          >
            <FiImage className="eds-tab-icon" />
            Images
          </button>
          <button
            className={`eds-tab ${activeTab === 'products' ? 'active' : ''}`}
            onClick={() => setActiveTab('products')}
          >
            <FiGrid className="eds-tab-icon" />
            Products
          </button>
        </div>
      </div>

      <div className="eds-tab-content">
        {activeTab === 'information' && (
          <div className="eds-information-card">
            <h3>Information</h3>
            <div className="eds-info-grid">
              <div className="eds-info-column">
                <div className="eds-info-row">
                  <span className="eds-info-label">Name:</span>
                  <span className="eds-info-value">{promotion.name}</span>
                </div>
                <div className="eds-info-row">
                  <span className="eds-info-label">Type:</span>
                  <span className="eds-info-value">{promotion.type}</span>
                </div>
              </div>
              <div className="eds-info-column">
                <div className="eds-info-row">
                  <span className="eds-info-label">Description:</span>
                  <span className="eds-info-value">{promotion.description || 'N/A'}</span>
                </div>
                <div className="eds-info-row">
                  <span className="eds-info-label">Status:</span>
                  <span className={`eds-info-value eds-status ${promotion.status.toLowerCase()}`}>
                    {promotion.status}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'images' && (
          <div className="eds-images-card">
            <div className="eds-images-content">
              <div className="eds-image-preview-container">
                <div className="eds-image-preview">
                  <div className="eds-image-placeholder">Image Preview</div>
                </div>
              </div>
              <div className="eds-image-info">
                <p>Small Size: (360px, 224px)</p>
                <p>Big Size: (1126px, 400px)</p>
                <label className="eds-upload-button">
                  <FiUpload className="eds-upload-icon" />
                  Upload Images
                  <input
                    type="file"
                    onChange={handleImageUpload}
                    style={{ display: 'none' }}
                    accept="image/*"
                  />
                </label>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <div className="eds-products-section">
            <div className="eds-products-header">
              <button
                className="eds-add-product-button"
                onClick={() => setShowAddModal(true)} // This button now opens the AddProductModal
              >
                <FiPlus className="eds-add-icon" />
                Add Product
              </button>
            </div>
            <div className="eds-products-card">
              {products.length > 0 ? (
                <div className="eds-products-table">
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
                      {products.map(product => (
                        <tr key={product.id}>
                          <td>{product.name}</td>
                          <td>₹{product.price}</td>
                          <td>
                            <span className={`eds-status-badge ${product.status.toLowerCase()}`}>
                              {product.status}
                            </span>
                          </td>
                          <td>
                            <button
                              className="eds-delete-button"
                              onClick={() => handleDeleteClick(product.id)}
                            >
                              <FiTrash2 />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="eds-products-placeholder">
                  <p>No products assigned to this promotion</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
      />

      {/* AddProductModal is now rendered here, within ViewPromotion */}
      <AddProductModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={handleAddProduct}
        productOptions={productOptions}
      />
    </div>
  );
};


const PromotionsDashboard = () => {
  const [allPromotions, setAllPromotions] = useState([]);
  const [filteredPromotions, setFilteredPromotions] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const [showFilterRow, setShowFilterRow] = useState(false);
  const [filterInputs, setFilterInputs] = useState({ name: '', type: '', status: '' });
  const [showExportDropdown, setShowExportDropdown] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editPromotion, setEditPromotion] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [promotionToDelete, setPromotionToDelete] = useState(null);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [showItemsPerPageDropdown, setShowItemsPerPageDropdown] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedPromotionForView, setSelectedPromotionForView] = useState(null);

  const exportRef = useRef(null);
  const itemsPerPageRef = useRef(null);

  // Fetch promotions data from the public folder
  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        // Assuming promotions.json is directly in the public folder
        const response = await fetch('/promotions.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setAllPromotions(data);
      } catch (error) {
        console.error("Failed to fetch promotions data:", error);
        // Fallback or error handling if fetch fails
        setAllPromotions([]);
      }
    };

    fetchPromotions();
  }, []); // Empty dependency array means this runs once on mount

  useEffect(() => {
    const filtered = allPromotions.filter(promo => {
      return (
        (filterInputs.name === '' || promo.name.toLowerCase().startsWith(filterInputs.name.toLowerCase())) &&
        (filterInputs.type === '' || promo.type.toLowerCase() === filterInputs.type.toLowerCase()) &&
        (filterInputs.status === '' || promo.status.toLowerCase() === filterInputs.status.toLowerCase())
      );
    });
    setFilteredPromotions(filtered);
    setIsFiltered(
      filterInputs.name !== '' || filterInputs.type !== '' || filterInputs.status !== ''
    );
  }, [filterInputs, allPromotions]);

  const displayPromotions = isFiltered ? filteredPromotions : allPromotions;
  const totalPages = Math.ceil(displayPromotions.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPromotions = displayPromotions.slice(indexOfFirstItem, indexOfLastItem);

  const handleItemsPerPageChange = (number) => {
    setItemsPerPage(number);
    setCurrentPage(1);
    setShowItemsPerPageDropdown(false);
  };

  const handleFilterInputChange = (e) => {
    const { name, value } = e.target;
    setFilterInputs(prev => ({ ...prev, [name]: value }));
  };

  const handleClearFilters = () => {
    setFilterInputs({ name: '', type: '', status: '' });
  };

  const handleAddPromotion = (newPromotion) => {
    const newId = allPromotions.length > 0 ? Math.max(...allPromotions.map(p => p.id)) + 1 : 1;
    const promotionToAdd = {
      ...newPromotion,
      id: newId,
      status: newPromotion.status === 'Available' ? 'Active' : 'Inactive'
    };
    setAllPromotions([...allPromotions, promotionToAdd]);
    setShowAddModal(false);
  };

  const handleDeleteClick = (id) => {
    setPromotionToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setAllPromotions(allPromotions.filter(p => p.id !== promotionToDelete));
    setFilteredPromotions(filteredPromotions.filter(p => p.id !== promotionToDelete));
    setShowDeleteModal(false);
    setPromotionToDelete(null);
  };

  const handleEditPromotion = (updatedPromotion) => {
    setAllPromotions(allPromotions.map(p => p.id === updatedPromotion.id ? updatedPromotion : p));
    setFilteredPromotions(filteredPromotions.map(p => p.id === updatedPromotion.id ? updatedPromotion : p));
    setEditPromotion(null);
  };

  const handleViewPromotion = (promotion) => {
    setSelectedPromotionForView(promotion);
    setShowViewModal(true);
  };

  const handlePageChange = (page) => setCurrentPage(page);

  const exportToXLSX = () => {
    const ws = XLSX.utils.json_to_sheet(displayPromotions);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Promotions");
    XLSX.writeFile(wb, "promotions.xlsx");
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [['ID', 'Name', 'Type', 'Status', 'Description']],
      body: displayPromotions.map(p => [p.id, p.name, p.type, p.status, p.description])
    });
    doc.save('promotions.pdf');
  };

  return (
    <div className="eds-promotions-dashboard">
      {!showViewModal ? (
        <>
          <div className="eds-header">
            <div className="eds-header-content">
              <div className="eds-header-left">
                <h1>Promotions</h1>
              </div>
              <div className="eds-header-right">
                <div className="eds-breadcrumb">
                  <a href="/" className="eds-breadcrumb-home">Home</a>
                  <span> &gt;&gt; Promotions</span>
                </div>
              </div>
            </div>
          </div>

          <div className="eds-table-container">
            <div className="eds-table-header">
              <div className="eds-table-actions">
                <div className="eds-items-per-page" ref={itemsPerPageRef}>
                  <div className="eds-items-per-page-selector" onClick={() => {
                    setShowItemsPerPageDropdown(!showItemsPerPageDropdown);
                    setShowFilterRow(false);
                  }}>
                    <span>{itemsPerPage}</span>
                    <FiChevronDown size={16} color='white' />
                  </div>
                  {showItemsPerPageDropdown && (
                    <div className="eds-items-per-page-dropdown">
                      {[5, 10, 25, 50, 100].map(number => (
                        <div
                          key={number}
                          className={`eds-items-per-page-option ${itemsPerPage === number ? 'active' : ''}`}
                          onClick={() => handleItemsPerPageChange(number)}
                        >
                          {number}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <button className="eds-icon-btn" title="Filter" onClick={() => {
                  setShowFilterRow(prev => !prev);
                  setShowExportDropdown(false);
                  setShowItemsPerPageDropdown(false);
                }}>
                  <PiSliders color='white' size={20} />
                </button>

                <div className="eds-export-container" ref={exportRef}>
                  <button className="eds-icon-btn" title="Export" onClick={() => {
                    setShowExportDropdown(!showExportDropdown);
                    setShowFilterRow(false);
                    setShowItemsPerPageDropdown(false);
                  }}>
                    <TiExport color='white' size={20} />
                  </button>
                  {showExportDropdown && (
                    <div className="eds-export-dropdown">
                      <button onClick={exportToPDF}><FiPrinter color='white' size={18} /> PDF</button>
                      <button onClick={exportToXLSX}><FiFile color='white' size={18} /> XLS</button>
                    </div>
                  )}
                </div>

                <button className="eds-icon-btn add-btn" title="Add" onClick={() => {
                  setShowAddModal(true);
                  setShowFilterRow(false);
                  setShowExportDropdown(false);
                  setShowItemsPerPageDropdown(false);
                }}>
                  <MdLibraryAdd size={20} color='white' />
                </button>
              </div>
            </div>
            <hr style={{ borderTop: '0.5px solid #d8d8da', marginBottom: '20px' }} />

            {showFilterRow && (
              <div className="eds-muthufilter-promotions-filter" style={{ margin: '20px' }}>
                <div className="eds-muthufilter-filter-row">
                  <div className="eds-muthufilter-filter-group">
                    <label>Name</label>
                    <input
                      type="text"
                      name="name"
                      value={filterInputs.name}
                      onChange={handleFilterInputChange}
                    />
                  </div>
                  <div className="eds-muthufilter-filter-group">
                    <label>Type</label>
                    <select
                      name="type"
                      value={filterInputs.type}
                      onChange={handleFilterInputChange}
                    >
                      <option value="">All Types</option>
                      <option value="Small">Small</option>
                      <option value="Big">Big</option>
                      <option value="Medium">Medium</option>
                    </select>
                  </div>
                  <div className="eds-muthufilter-filter-group">
                    <label>Status</label>
                    <select
                      name="status"
                      value={filterInputs.status}
                      onChange={handleFilterInputChange}
                    >
                      <option value="">All Status</option>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                </div>
                <div className="eds-muthufilter-filter-actions" style={{ marginTop: '20px' }}>
                  <button type="button" className="eds-muthufilter-search-btn">
                    <FaSearch /> Search
                  </button>
                  <button type="button" className="eds-muthufilter-clear-btn" onClick={handleClearFilters}>
                    <FaTimes /> Clear
                  </button>
                </div>
              </div>
            )}

            <div className="eds-table-content-box">
              <table className="eds-promotions-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentPromotions.map(promo => (
                    <tr key={promo.id}>
                      <td>{promo.name}</td>
                      <td>{promo.type}</td>
                      <td className={`eds-status ${promo.status.toLowerCase()}`}>{promo.status}</td>
                      <td>
                        <div className="eds-action-buttons-cell">
                          <button className="eds-action-btn view" onClick={() => handleViewPromotion(promo)}>
                            <FiEye size={16} />
                          </button>
                          <button className="eds-action-btn edit" onClick={() => setEditPromotion(promo)}>
                            <FiEdit2 size={16} />
                          </button>
                          <button className="eds-action-btn delete" onClick={() => handleDeleteClick(promo.id)}>
                            <FiTrash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="eds-table-footer-pagination">
              <div className="eds-pagination-info">
                Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, displayPromotions.length)} of {displayPromotions.length} entries
              </div>
              <div className="eds-pagination-controls">
                <button className="eds-pagination-btn" disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>&lt;</button>
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i + 1}
                    className={`eds-pagination-btn ${currentPage === i + 1 ? 'active' : ''}`}
                    onClick={() => handlePageChange(i + 1)}
                  >
                    {i + 1}
                  </button>
                ))}
                <button className="eds-pagination-btn" disabled={currentPage === totalPages || totalPages === 0} onClick={() => handlePageChange(currentPage + 1)}>&gt;</button>
              </div>
            </div>
          </div>

          {showAddModal && (
            <AddPromotionModal onClose={() => setShowAddModal(false)} onSave={handleAddPromotion} />
          )}

          {editPromotion && (
            <EditPromotionModal promotion={editPromotion} onClose={() => setEditPromotion(null)} onSave={handleEditPromotion} />
          )}

          {showDeleteModal && (
            <DeleteModal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)} onConfirm={confirmDelete} />
          )}
        </>
      ) : (
        <ViewPromotion promotion={selectedPromotionForView} onClose={() => setShowViewModal(false)} />
      )}
    </div>
  );
};

export default PromotionsDashboard;
