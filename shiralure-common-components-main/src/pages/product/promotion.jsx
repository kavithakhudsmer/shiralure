import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FiChevronDown, FiEye, FiEdit2, FiTrash2, FiPrinter, FiFile
} from 'react-icons/fi';
// import { MdLibraryAdd } from "react-icons/md";
import { TiExport } from "react-icons/ti";
import { FaSearch, FaTimes } from 'react-icons/fa';
import AddPromotionModal from './AddPromotionModal';
import EditPromotionModal from './EditPromotion';
import { GoFileSymlinkFile } from 'react-icons/go';
import { BiSolidAddToQueue } from 'react-icons/bi';

import { PiSliders } from "react-icons/pi";

import DeleteModal from './viewcomponents/DeleteModal';
import * as XLSX from 'xlsx';
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import './promotion.css';
// import './PromotionsFilter.css';
import { FaFile } from "react-icons/fa";
import { FaFileUpload } from "react-icons/fa";
import productsData from '../../data/products1.json'; // adjust based on file structure

const ProductDashboard = () => {
  const navigate = useNavigate();
  const exportRef = useRef(null);
  const itemsPerPageRef = useRef(null);

  const [allPromotions, setAllPromotions] = useState([]);
  // const [filteredPromotions, setFilteredPromotions] = useState([]);
  // const [isFiltered] = useState(false);
  const [showFilterRow, setShowFilterRow] = useState(false);
  const [filterInputs, setFilterInputs] = useState({ name: '', category: '', status: '' });
  const [showExportDropdown, setShowExportDropdown] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editPromotion, setEditPromotion] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [promotionToDelete, setPromotionToDelete] = useState(null);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [showItemsPerPageDropdown, setShowItemsPerPageDropdown] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showUploadDropdown, setShowUploadDropdown] = useState(false);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const filteredItems = allPromotions.filter(item =>
    item.name.toLowerCase().includes(filterInputs.name.toLowerCase()) &&
    item.category.toLowerCase().includes(filterInputs.category.toLowerCase()) &&
    (filterInputs.status === '' || item.status.toLowerCase() === filterInputs.status.toLowerCase())
  );

  const handleUploadFileClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    alert(`Uploaded ${files.length} file(s):\n${files.map(f => f.name).join(', ')}`);
  };

  useEffect(() => {
    setAllPromotions(productsData);
  }, []);

  const handleFilterInputChange = (e) => {
    const { name, value } = e.target;
    setFilterInputs(prev => ({ ...prev, [name]: value }));
  };

  const handleClearFilters = () => {
    setFilterInputs({ name: '', category: '', status: '' });
  };

  const fileInputRef = useRef(null);
  // const folderInputRef = useRef(null);

  const handleItemsPerPageChange = (number) => {
    setItemsPerPage(number);
    setCurrentPage(1);
    setShowItemsPerPageDropdown(false);
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
    setShowDeleteModal(false);
    setPromotionToDelete(null);
  };

  const handleViewPromotion2 = (promotion) => {
    navigate(`/admin/products/view/${promotion.id}`);
  };

  const handleEditPromotion = (updatedPromotion) => {
    setAllPromotions(allPromotions.map(p => p.id === updatedPromotion.id ? updatedPromotion : p));
    setEditPromotion(null);
  };

  const handlePageChange = (page) => setCurrentPage(page);

  const exportToXLSX = () => {
    const ws = XLSX.utils.json_to_sheet(filteredItems);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Promotions");
    XLSX.writeFile(wb, "promotions.xlsx");
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [['ID', 'Name', 'Type', 'Status', 'Description']],
      body: filteredItems.map(p => [p.id, p.name, p.type, p.status, p.description])
    });
    doc.save('promotions.pdf');
  };

  const renderStatus = (status) => {
    const colorMap = {
      success: 'pprrgreen',
      shipping: 'pprrblue',
      'out for delivery': 'pprryellow',
      cancelled: 'pprrred',
      ordered: 'pprrgray',
      packed: 'pprrblue',
    };
    const color = colorMap[status.toLowerCase()];
    return <span className={color ? `pprrstatus ${color}` : 'pprrstatus'}>{status}</span>;
  };

  return (
    <div className="pprrpromotions-dashboard">
      {/* HEADER */}
      <div className="pprrheader">
        <div className="pprrheader-content">
          <h1>Products</h1>
          <div className="pprrbreadcrumb">
            <a href="/" className="pprrbreadcrumb-home">Home</a>
            <span> &gt;&gt; Products</span>
          </div>
        </div>
      </div>

      {/* ACTIONS */}
      <div className="pprrtable-container">
        <div className="pprrtable-header">
          <div className="pprrtable-actions">
            {/* ITEMS PER PAGE */}
            <div className="pprritems-per-page" ref={itemsPerPageRef}>
              <div className="pprritems-per-page-selector" onClick={() => {
                setShowItemsPerPageDropdown(!showItemsPerPageDropdown);
                setShowFilterRow(false);
              }}>
                <span>{itemsPerPage}</span>
                <FiChevronDown size={16} color='white' />
              </div>
              {showItemsPerPageDropdown && (
                <div className="pprritems-per-page-dropdown">
                  {[5, 10, 25, 50, 100].map(number => (
                    <div key={number} className={`pprritems-per-page-option ${itemsPerPage === number ? 'pprractive' : ''}`} onClick={() => handleItemsPerPageChange(number)}>{number}</div>
                  ))}
                </div>
              )}
            </div>

            {/* FILTER */}
            <button className="pprricon-btn" title="Filter" onClick={() => {
              setShowFilterRow(prev => !prev);
              setShowExportDropdown(false);
              setShowItemsPerPageDropdown(false);
            }}>
              <PiSliders color='white' size={20} />
            </button>

            {/* EXPORT */}
            <div className="pprrexport-container" ref={exportRef}>
              <button className="pprricon-btn" title="Export" onClick={() => {
                setShowExportDropdown(!showExportDropdown);
                setShowFilterRow(false);
                setShowItemsPerPageDropdown(false);
              }}>
                <TiExport color='white' size={20} />
              </button>
              {showExportDropdown && (
                <div className="pprrexport-dropdown">
                  <button onClick={exportToPDF}><FiPrinter /> PDF</button>
                  <button onClick={exportToXLSX}><FiFile /> XLS</button>
                </div>
              )}
            </div>

            <div className="pprrexport-container">
              <button className="pprricon-btn pprradd-btn" title="Upload" onClick={() => {
                setShowUploadDropdown(prev => !prev);
                setShowFilterRow(false);
                setShowExportDropdown(false);
                setShowItemsPerPageDropdown(false);
              }}>
                <GoFileSymlinkFile size={20} color='white' />
              </button>
              {showUploadDropdown && (
                <div className="pprrexport-dropdown">
                  <a href="/sample.xlsx" download>
                    <FaFile />Sample File
                  </a>
                  <button onClick={handleUploadFileClick}><FaFileUpload />Upload File</button>
                </div>
              )}
            </div>

            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              multiple
              onChange={handleFileUpload}
            />

            <button className="pprricon-btn" onClick={() => setEditPromotion(allPromotions[0])}>
              <BiSolidAddToQueue color='white' size={20} />
            </button>
          </div>
        </div>

        <hr style={{ borderTop: '0.5px solidrgb(135, 135, 139)', marginBottom: '20px' }} />

        {/* FILTER FORM */}
        {showFilterRow && (
          <div className="pprrsrifilter-form">
            <div className="pprrsrifilter-row">
              <div className="pprrsrifilter-group">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={filterInputs.name}
                  onChange={handleFilterInputChange}
                  // placeholder="Enter name"
                />
              </div>
              <div className="pprrsrifilter-group">
                <label>Sku</label>
                <input
                  type="text"
                  name="sku"
                  value={filterInputs.sku}
                  onChange={handleFilterInputChange}
                  // placeholder="Enter sku"
                />
              </div>
              <div className="pprrsrifilter-group">
                <label>Buying Price</label>
                <input
                  type="text"
                  name="buyingprice"
                  value={filterInputs.buyingprice}
                  onChange={handleFilterInputChange}
                  // placeholder="Enter buyingprice"
                />
              </div>
              <div className="pprrsrifilter-group">
                <label>Selling Price</label>
                <input
                  type="text"
                  name="sellingprice"
                  value={filterInputs.sellingprice}
                  onChange={handleFilterInputChange}
                  // placeholder="Enter sellingprice"
                />
              </div>
              <div className="pprrsrifilter-group">
                <label>Category</label>
                <input
                  type="text"
                  name="category"
                  value={filterInputs.category}
                  onChange={handleFilterInputChange}
                  // placeholder="Enter category"
                />
              </div>
              <div className="pprrsrifilter-group">
                <label>Brand</label>
                <input
                  type="text"
                  name="brand"
                  value={filterInputs.brand}
                  onChange={handleFilterInputChange}
                  // placeholder="Enter brand"
                />
              </div>
              <div className="pprrsrifilter-group">
                <label>Barcoad</label>
                <input
                  type="text"
                  name="barcode"
                  value={filterInputs.barcode}
                  onChange={handleFilterInputChange}
                  // placeholder="Enter barcode"
                />
              </div>
              <div className="pprrsrifilter-group">
                <label>Tax</label>
                <input
                  type="text"
                  name="tax"
                  value={filterInputs.tax}
                  onChange={handleFilterInputChange}
                  // placeholder="Enter tax"
                />
              </div>
              <div className="pprrsrifilter-group">
                <label>Unit</label>
                <input
                  type="text"
                  name="unit"
                  value={filterInputs.unit}
                  onChange={handleFilterInputChange}
                  // placeholder="Enter unit"
                />
              </div>
              <div className="pprrsrifilter-group">
                <label>Status</label>
                <input
                  type="text"
                  name="status"
                  value={filterInputs.status}
                  onChange={handleFilterInputChange}
                  // placeholder="Enter status"
                />
              </div>
              <div className="pprrsrifilter-group">
                <label>Purchasable</label>
                <input
                  type="text"
                  name="purchas"
                  value={filterInputs.purchas}
                  onChange={handleFilterInputChange}
                  // placeholder="Enter purchas"
                />
              </div>
              <div className="pprrsrifilter-group">
                <label>Show Stock Out</label>
                <input
                  type="text"
                  name="stockout"
                  value={filterInputs.stockout}
                  onChange={handleFilterInputChange}
                  // placeholder="Enter stockout"
                />
              </div>
              <div className="pprrsrifilter-group">
                <label>Refundable</label>
                <input
                  type="text"
                  name="Refundable"
                  value={filterInputs.stockout}
                  onChange={handleFilterInputChange}
                  // placeholder="Enter stockout"
                />
              </div>
              <div className="pprrsrifilter-actions">
                <button className="pprrsrisearch-btn"><FaSearch /> Search</button>
                <button className="pprrsriclear-btn" onClick={handleClearFilters}><FaTimes /> Clear</button>
              </div>
            </div>
          </div>
        )}

        {/* TABLE */}
        <div className="pprrtable-content-box">
          <table className="pprrpromotions-table">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Item Details</th>
                <th>Category</th>
                <th>Ordered Date</th>
                <th>Status</th>
                <th>Selling Price</th>
                <th>Action</th>
              </tr>
            </thead>
           
            <tbody>
              {currentItems.map((item, index) => (
                <tr key={item.id}>
                  <td>{indexOfFirstItem + index + 1}</td>
                  <td>
                    <div className="pprritem-detail">
                      <img src={item.image} alt="" />
                      <div>
                        <div className="pprritem-name">{item.name}</div>
                        <div className="pprritem-id">#{item.id}</div>
                      </div>
                    </div>
                  </td>
                  <td><span className="pprrcategory">#{item.category}</span></td>
                  <td>{item.date}</td>
                  <td>{renderStatus(item.status)}</td>
                  <td>₹{item.price}</td>
                  <td>
                    <button className="pprraction-btn pprrview" onClick={() => handleViewPromotion2(item)}><FiEye size={16} /></button>
                    <button className="pprraction-btn pprredit" onClick={() => setEditPromotion(item)}><FiEdit2 size={16} /></button>
                    <button className="pprraction-btn pprrdelete" onClick={() => handleDeleteClick(item.id)}><FiTrash2 size={16} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className="pprrtable-footer-pagination">
          <div className="pprrpagination-info">
            Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredItems.length)} of {filteredItems.length} entries
          </div>
          <div className="pprrpagination-controls">
            <button className="pprrpagination-btn" disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>&lt;</button>
            {[...Array(totalPages)].map((_, i) => (
              <button key={i + 1} className={`pprrpagination-btn ${currentPage === i + 1 ? 'pprractive' : ''}`} onClick={() => handlePageChange(i + 1)}>{i + 1}</button>
            ))}
            <button className="pprrpagination-btn" disabled={currentPage === totalPages || totalPages === 0} onClick={() => handlePageChange(currentPage + 1)}>&gt;</button>
          </div>
        </div>
      </div>

      {/* MODALS */}
      {showAddModal && (
        <AddPromotionModal onClose={() => setShowAddModal(false)} onSave={handleAddPromotion} />
      )}
      {editPromotion && (
        <EditPromotionModal promotion={editPromotion} onClose={() => setEditPromotion(null)} onSave={handleEditPromotion} />
      )}
      {showDeleteModal && (
        <DeleteModal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)} onConfirm={confirmDelete} />
      )}
    </div>
  );
};

export default ProductDashboard;