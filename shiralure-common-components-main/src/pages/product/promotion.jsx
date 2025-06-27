import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FiSliders, FiChevronDown, FiEye, FiEdit2, FiTrash2, FiPrinter, FiFile
} from 'react-icons/fi';
// import { MdLibraryAdd } from "react-icons/md";
import { TiExport } from "react-icons/ti";
import { FaSearch, FaTimes } from 'react-icons/fa';
import AddPromotionModal from './AddPromotionModal';
import EditPromotionModal from './EditPromotion';
import { GoFileSymlinkFile } from 'react-icons/go';
import { BiSolidAddToQueue } from 'react-icons/bi';
import DeleteModal from './viewcomponents/DeleteModal';
import * as XLSX from 'xlsx';
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import './promotion.css';
// import './PromotionsFilter.css';
import { FaFile } from "react-icons/fa";
import { FaFileUpload } from "react-icons/fa";
import productsData from './public/data/products1.json';

const PromotionsDashboard = () => {
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

  const handleViewPromotion = (promotion) => {
    navigate(`/promotions/view/${promotion.id}`);
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
      success: 'green',
      shipping: 'blue',
      'out for delivery': 'goldenrod',
      cancelled: 'red',
      ordered: 'gray',
      packed: 'blue',
    };
    const color = colorMap[status.toLowerCase()];
    return <span style={color ? { color } : { fontWeight: 'bold' }}>{status}</span>;
  };

  return (
    <div className="promotions-dashboard">
      {/* HEADER */}
      <div className="header">
        <div className="header-content">
          <h1>Products</h1>
          <div className="breadcrumb">
            <a href="/" className="breadcrumb-home">Home</a>
            <span> &gt;&gt; Products</span>
          </div>
        </div>
      </div>

      {/* ACTIONS */}
      <div className="table-container">
        <div className="table-header">
          <div className="table-actions">
            {/* ITEMS PER PAGE */}
            <div className="items-per-page" ref={itemsPerPageRef}>
              <div className="items-per-page-selector" onClick={() => {
                setShowItemsPerPageDropdown(!showItemsPerPageDropdown);
                setShowFilterRow(false);
              }}>
                <span>{itemsPerPage}</span>
                <FiChevronDown size={16} color='white' />
              </div>
              {showItemsPerPageDropdown && (
                <div className="items-per-page-dropdown">
                  {[5, 10, 25, 50, 100].map(number => (
                    <div key={number} className={`items-per-page-option ${itemsPerPage === number ? 'active' : ''}`} onClick={() => handleItemsPerPageChange(number)}>{number}</div>
                  ))}
                </div>
              )}
            </div>

            {/* FILTER */}
            <button className="icon-btn" title="Filter" onClick={() => {
              setShowFilterRow(prev => !prev);
              setShowExportDropdown(false);
              setShowItemsPerPageDropdown(false);
            }}>
              <FiSliders color='white' size={20} />
            </button>

            {/* EXPORT */}
            <div className="export-container" ref={exportRef}>
              <button className="icon-btn" title="Export" onClick={() => {
                setShowExportDropdown(!showExportDropdown);
                setShowFilterRow(false);
                setShowItemsPerPageDropdown(false);
              }}>
                <TiExport color='white' size={20} />
              </button>
              {showExportDropdown && (
                <div className="export-dropdown">
                  <button onClick={exportToPDF}><FiPrinter /> PDF</button>
                  <button onClick={exportToXLSX}><FiFile /> XLS</button>
                </div>
              )}
            </div>

          <div className="export-container">

            <button className="icon-btn add-btn"  title="Upload" onClick={() => {
             setShowUploadDropdown(prev => !prev);
              setShowFilterRow(false);
              setShowExportDropdown(false);
              setShowItemsPerPageDropdown(false);
            }}>
              <GoFileSymlinkFile size={20} color='white' />
            </button>
             {showUploadDropdown && (
    <div className="export-dropdown">
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


<button className="icon-btn" onClick={() => setEditPromotion(allPromotions[0])}>
  <BiSolidAddToQueue color='white' size={20} />
</button>

          </div>
        </div>

        <hr style={{ borderTop: '0.5px solid #d8d8da', marginBottom: '20px' }} />

        {/* FILTER FORM */}
         {showFilterRow && (
        <div className="srifilter-form">
          <div className="srifilter-row">
            <div className="srifilter-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={filterInputs.name}
                onChange={handleFilterInputChange}
                // placeholder="Enter name"
              />
            </div>
            <div className="srifilter-group">
             <label>Sku</label>
              <input
                type="text"
                name="sku"
                value={filterInputs.sku}
                onChange={handleFilterInputChange}
                // placeholder="Enter sku"
              />
            </div>
            <div className="srifilter-group">
              <label>Buying Price</label>
              <input
                type="text"
                name="buyingprice"
                value={filterInputs.buyingprice}
                onChange={handleFilterInputChange}
                // placeholder="Enter buyingprice"
              />
            </div>
            <div className="srifilter-group">
              <label>Selling Price</label>
              <input
                type="text"
                name="sellingprice"
                value={filterInputs.sellingprice}
                onChange={handleFilterInputChange}
                // placeholder="Enter sellingprice"
              />
            </div>
            <div className="srifilter-group">
              <label>Category</label>
              <input
                type="text"
                name="category"
                value={filterInputs.category}
                onChange={handleFilterInputChange}
                // placeholder="Enter category"
              />
            </div>
            <div className="srifilter-group">
              <label>Brand</label>
              <input
                type="text"
                name="brand"
                value={filterInputs.brand}
                onChange={handleFilterInputChange}
                // placeholder="Enter brand"
              />
            </div>
            <div className="srifilter-group">
              <label>Barcoad</label>
              <input
                type="text"
                name="barcode"
                value={filterInputs.barcode}
                onChange={handleFilterInputChange}
                // placeholder="Enter barcode"
              />
            </div>
            <div className="srifilter-group">
              <label>Tax</label>
              <input
                type="text"
                name="tax"
                value={filterInputs.tax}
                onChange={handleFilterInputChange}
                // placeholder="Enter tax"
              />
            </div>
            <div className="srifilter-group">
              <label>Unit</label>
              <input
                type="text"
                name="unit"
                value={filterInputs.unit}
                onChange={handleFilterInputChange}
                // placeholder="Enter unit"
              />
            </div>
            <div className="srifilter-group">
              <label>Status</label>
              <input
                type="text"
                name="status"
                value={filterInputs.status}
                onChange={handleFilterInputChange}
                // placeholder="Enter status"
              />
            </div>
            <div className="srifilter-group">
              <label>Purchasable</label>
              <input
                type="text"
                name="purchas"
                value={filterInputs.purchas}
                onChange={handleFilterInputChange}
                // placeholder="Enter purchas"
              />
            </div>
            <div className="srifilter-group">
              <label>Show Stock Out</label>
              <input
                type="text"
                name="stockout"
                value={filterInputs.stockout}
                onChange={handleFilterInputChange}
                // placeholder="Enter stockout"
              />
            </div>
             <div className="srifilter-group">
              <label>Refundable</label>
              <input
                type="text"
                name="Refundable"
                value={filterInputs.stockout}
                onChange={handleFilterInputChange}
                // placeholder="Enter stockout"
              />
            </div>
            
            <div className="srifilter-actions">
              <button className="srisearch-btn"><FaSearch  /> Search</button>
              <button className="sriclear-btn" onClick={handleClearFilters}><FaTimes /> Clear</button>
            </div>
          </div>
        </div>
      )}

        {/* TABLE */}
        <div className="table-content-box">
          <table className="promotions-table">
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
                    <div className="item-detail">
                      <img src={item.image} alt="" />

                      <div>
                        <div className="item-name">{item.name}</div>
                        <div className="item-id">#{item.id}</div>
                      </div>
                    </div>
                  </td>
                  <td><span className="category">#{item.category}</span></td>

                  <td>{item.date}</td>
                  <td>{renderStatus(item.status)}</td>
                  <td>₹{item.price}</td>
                  <td>
                    <button className="action-btn view" onClick={() => handleViewPromotion(item)}><FiEye size={16} /></button>
                    <button className="action-btn edit" onClick={() => setEditPromotion(item)}><FiEdit2 size={16} /></button>
                    <button className="action-btn delete" onClick={() => handleDeleteClick(item.id)}><FiTrash2 size={16} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className="table-footer-pagination">
          <div className="pagination-info">
            Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredItems.length)} of {filteredItems.length} entries
          </div>
          <div className="pagination-controls">
            <button className="pagination-btn" disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>&lt;</button>
            {[...Array(totalPages)].map((_, i) => (
              <button key={i + 1} className={`pagination-btn ${currentPage === i + 1 ? 'active' : ''}`} onClick={() => handlePageChange(i + 1)}>{i + 1}</button>
            ))}
            <button className="pagination-btn" disabled={currentPage === totalPages || totalPages === 0} onClick={() => handlePageChange(currentPage + 1)}>&gt;</button>
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

export default PromotionsDashboard;
