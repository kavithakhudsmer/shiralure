// import React, { useState, useEffect, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { FiSliders, FiChevronDown, FiEye, FiEdit2, FiTrash2, FiPrinter, FiFile } from 'react-icons/fi';
// import { MdLibraryAdd } from "react-icons/md";
// import { TiExport } from "react-icons/ti";
// import AddPromotionModal from './AddPromotionModal';
// import PromotionsFilter from './PromotionsFilter';
// import EditPromotionModal from './EditPromotion';
// import DeleteModal from './viewcomponents/DeleteModal';
// import * as XLSX from 'xlsx';
// import { jsPDF } from "jspdf";
// import autoTable from "jspdf-autotable";
// import './promotion.css';

// const PromotionsDashboard = () => {
//   const navigate = useNavigate();
//   const [showExportDropdown, setShowExportDropdown] = useState(false);
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [showFilterModal, setShowFilterModal] = useState(false);
//   const [itemsPerPage, setItemsPerPage] = useState(5);
//   const [showItemsPerPageDropdown, setShowItemsPerPageDropdown] = useState(false);
//   const [filteredPromotions, setFilteredPromotions] = useState([]);
//   const [isFiltered, setIsFiltered] = useState(false);
//   const [editPromotion, setEditPromotion] = useState(null);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [promotionToDelete, setPromotionToDelete] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);

//   const exportRef = useRef(null);
//   const itemsPerPageRef = useRef(null);
//   const filterRef = useRef(null);
//   const filterModalRef = useRef(null);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (exportRef.current && !exportRef.current.contains(event.target)) {
//         setShowExportDropdown(false);
//       }
//       if (itemsPerPageRef.current && !itemsPerPageRef.current.contains(event.target)) {
//         setShowItemsPerPageDropdown(false);
//       }
//       if (showFilterModal &&
//           filterRef.current && !filterRef.current.contains(event.target) &&
//           filterModalRef.current && !filterModalRef.current.contains(event.target)) {
//         setShowFilterModal(false);
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [showFilterModal]);

//   const [allPromotions, setAllPromotions] = useState([
//     { id: 1, name: 'Exclusive Products', type: 'Small', status: 'Active', description: 'Special discount on exclusive items' },
//     { id: 2, name: 'Winter Products', type: 'Big', status: 'Active', description: 'Winter season special offers' },
//     { id: 3, name: 'Summer Sale', type: 'Medium', status: 'Inactive', description: 'Discounts on summer collection' },
//     { id: 4, name: 'Autumn Collection', type: 'Big', status: 'Active', description: 'New autumn arrivals' },
//     { id: 5, name: 'Spring Savings', type: 'Small', status: 'Active', description: 'Early bird spring discounts' },
//     { id: 6, name: 'Holiday Special', type: 'Medium', status: 'Active', description: 'Festive season offers' },
//     { id: 7, name: 'Clearance Event', type: 'Small', status: 'Inactive', description: 'Last chance items' },
//   ]);

//   const displayPromotions = isFiltered ? filteredPromotions : allPromotions;
//   const totalPages = Math.ceil(displayPromotions.length / itemsPerPage);
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentPromotions = displayPromotions.slice(indexOfFirstItem, indexOfLastItem);

//   const handleItemsPerPageChange = (number) => {
//     setItemsPerPage(number);
//     setCurrentPage(1);
//     setShowItemsPerPageDropdown(false);
//   };

//   const handleAddPromotion = (newPromotion) => {
//     const newId = allPromotions.length > 0 ? Math.max(...allPromotions.map(p => p.id)) + 1 : 1;
//     const promotionToAdd = {
//       ...newPromotion,
//       id: newId,
//       status: newPromotion.status === 'Available' ? 'Active' : 'Inactive'
//     };
//     setAllPromotions([...allPromotions, promotionToAdd]);
//     setShowAddModal(false);
//   };

//   const handleFilter = (filters) => {
//     const filtered = allPromotions.filter(promo => {
//       return (
//         (filters.name === '' || promo.name.toLowerCase().includes(filters.name.toLowerCase())) &&
//         (filters.type === '' || promo.type === filters.type) &&
//         (filters.status === '' || promo.status === filters.status)
//       );
//     });
//     setFilteredPromotions(filtered);
//     setIsFiltered(true);
//     setCurrentPage(1);
//     setShowFilterModal(false);
//   };

//   const handleClearFilter = () => {
//     setIsFiltered(false);
//     setCurrentPage(1);
//     setShowFilterModal(false);
//   };

//   const handleDeleteClick = (id) => {
//     setPromotionToDelete(id);
//     setShowDeleteModal(true);
//   };

//   const confirmDelete = () => {
//     setAllPromotions(allPromotions.filter(promo => promo.id !== promotionToDelete));
//     if (isFiltered) {
//       setFilteredPromotions(filteredPromotions.filter(promo => promo.id !== promotionToDelete));
//     }
//     setShowDeleteModal(false);
//     setPromotionToDelete(null);
//   };

//   const cancelDelete = () => {
//     setShowDeleteModal(false);
//     setPromotionToDelete(null);
//   };

//   const handleViewPromotion = (promotion) => {
//     navigate(`/promotions/view/${promotion.id}`);
//   };

//   const handleEditPromotion = (updatedPromotion) => {
//     setAllPromotions(allPromotions.map(promo =>
//       promo.id === updatedPromotion.id ? updatedPromotion : promo
//     ));
//     if (isFiltered) {
//       setFilteredPromotions(filteredPromotions.map(promo =>
//         promo.id === updatedPromotion.id ? updatedPromotion : promo
//       ));
//     }
//     setEditPromotion(null);
//   };

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   const renderPageNumbers = () => {
//     const pageNumbers = [];
//     const maxVisiblePages = 3;

//     if (totalPages <= maxVisiblePages + 2) {
//       for (let i = 1; i <= totalPages; i++) {
//         pageNumbers.push(
//           <button
//             key={i}
//             className={`muthpagination-btn ${currentPage === i ? 'active' : ''}`}
//             onClick={() => handlePageChange(i)}
//           >
//             {i}
//           </button>
//         );
//       }
//     } else {
//       pageNumbers.push(
//         <button
//           key={1}
//           className={`muthpagination-btn ${currentPage === 1 ? 'active' : ''}`}
//           onClick={() => handlePageChange(1)}
//         >
//           1
//         </button>
//       );

//       if (currentPage > maxVisiblePages - 1) {
//         pageNumbers.push(<span key="start-ellipsis" className="muthpagination-ellipsis">...</span>);
//       }

//       let startPage = Math.max(2, currentPage - 1);
//       let endPage = Math.min(totalPages - 1, currentPage + 1);

//       for (let i = startPage; i <= endPage; i++) {
//         pageNumbers.push(
//           <button
//             key={i}
//             className={`muthpagination-btn ${currentPage === i ? 'active' : ''}`}
//             onClick={() => handlePageChange(i)}
//           >
//             {i}
//           </button>
//         );
//       }

//       if (currentPage < totalPages - (maxVisiblePages - 2)) {
//         pageNumbers.push(<span key="end-ellipsis" className="muthpagination-ellipsis">...</span>);
//       }

//       pageNumbers.push(
//         <button
//           key={totalPages}
//           className={`muthpagination-btn ${currentPage === totalPages ? 'active' : ''}`}
//           onClick={() => handlePageChange(totalPages)}
//         >
//           {totalPages}
//         </button>
//       );
//     }

//     return pageNumbers;
//   };

//   // Function to export to Excel (XLSX)
//   const exportToXLSX = () => {
//     const ws = XLSX.utils.json_to_sheet(displayPromotions);
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, "Promotions");
//     XLSX.writeFile(wb, "promotions.xlsx");
//   };

//   // Function to export to PDF
//   const exportToPDF = () => {
//     const doc = new jsPDF();
//     autoTable(doc, {
//       head: [['ID', 'Name', 'Type', 'Status', 'Description']],
//       body: displayPromotions.map(promo => [
//         promo.id,
//         promo.name,
//         promo.type,
//         promo.status,
//         promo.description
//       ])
//     });
//     doc.save('promotions.pdf');
//   };

//   return (
//     <div className="muthpromotions-dashboard">
//       <div className="muthheader">
//         <div className="muthheader-content">
//           <div className="muthheader-left">
//             <h1>Promotions</h1>
//           </div>
//           <div className="muthheader-right">
//             <div className="muthbreadcrumb">
//               <a href="/" className="muthbreadcrumb-home">Home</a>
//               <span> &gt;&gt; Promotions</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="muthtable-container">
//         <div className="table-header">
//           <div className="table-actions">
//             <div className="items-per-page" ref={itemsPerPageRef}>
//               <div
//                 className="items-per-page-selector"
//                 onClick={() => setShowItemsPerPageDropdown(!showItemsPerPageDropdown)}
//               >
//                 <span>{itemsPerPage} </span>
//                 <FiChevronDown size={16} color='white' />
//               </div>
//               {showItemsPerPageDropdown && (
//                 <div className="items-per-page-dropdown">
//                   {[5, 10, 25, 50, 100].map(number => (
//                     <div
//                       key={number}
//                       className={`items-per-page-option ${itemsPerPage === number ? 'active' : ''}`}
//                       onClick={() => handleItemsPerPageChange(number)}
//                     >
//                       {number}
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>

//             <div className="muthfilter-container" ref={filterRef}>
//               <button
//                 className="icon-btn"
//                 title="Filter"
//                 onClick={() => setShowFilterModal(!showFilterModal)}
//               >
//                 <FiSliders color='white' size={20} />
//               </button>
//             </div>

//             <div className="export-container" ref={exportRef}>
//               <button
//                 className="icon-btn"
//                 title="Export"
//                 onClick={() => setShowExportDropdown(!showExportDropdown)}
//               >
//                 <TiExport color='white' size={20} />
//               </button>
//               {showExportDropdown && (
//                 <div className="export-dropdown">
//                   <button onClick={exportToPDF}><FiPrinter color='white' size={18} /> PDF</button>
//                   <button onClick={exportToXLSX}><FiFile color='white' size={18} /> XLS</button>
//                 </div>
//               )}
//             </div>

//             <button
//               className="icon-btn add-btn"
//               title="Add"
//               onClick={() => setShowAddModal(true)}
//             >
//               <MdLibraryAdd size={20} color='white' />
//             </button>
//           </div>
//         </div>

//         <div className="table-separator"></div>

//         {showFilterModal && (
//           <div ref={filterModalRef} className="muthfilter-modal-wrapper">
//             <PromotionsFilter
//               onClose={() => setShowFilterModal(false)}
//               onFilter={handleFilter}
//               onClear={handleClearFilter}
//             />
//           </div>
//         )}

//         <div className="muthtable-content-box">
//           <table className="muthpromotions-table">
//             <thead>
//               <tr>
//                 <th>Name</th>
//                 <th>Type</th>
//                 <th>Status</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {currentPromotions.map(promo => (
//                 <tr key={promo.id}>
//                   <td>{promo.name}</td>
//                   <td>{promo.type}</td>
//                   <td className={`status ${promo.status.toLowerCase()}`}>
//                     {promo.status}
//                   </td>
//                   <td>
//                     <div className="action-buttons-cell">
//                       <button
//                         className="action-btn view"
//                         onClick={() => handleViewPromotion(promo)}
//                       >
//                         <FiEye size={16} />
//                       </button>
//                       <button
//                         className="action-btn edit"
//                         title="Edit"
//                         onClick={() => setEditPromotion(promo)}
//                       >
//                         <FiEdit2 size={16} />
//                       </button>
//                       <button
//                         className="action-btn delete"
//                         title="Delete"
//                         onClick={() => handleDeleteClick(promo.id)}
//                       >
//                         <FiTrash2 size={16} />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         <div className="muthtable-footer-pagination">
//           <div className="pagination-info">
//             Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, displayPromotions.length)} of {displayPromotions.length} entries
//           </div>
//           <div className="muthpagination-controls">
//             <button
//               className="muthpagination-btn"
//               disabled={currentPage === 1}
//               onClick={() => handlePageChange(currentPage - 1)}
//             >
//               &lt; 
//             </button>
//             {renderPageNumbers()}
//             <button
//               className="muthpagination-btn"
//               disabled={currentPage === totalPages || totalPages === 0}
//               onClick={() => handlePageChange(currentPage + 1)}
//             >
//               &gt;
//             </button>
//           </div>
//         </div>
//       </div>

//       {showAddModal && (
//         <AddPromotionModal
//           onClose={() => setShowAddModal(false)}
//           onSave={handleAddPromotion}
//         />
//       )}

//       {editPromotion && (
//         <EditPromotionModal
//           promotion={editPromotion}
//           onClose={() => setEditPromotion(null)}
//           onSave={handleEditPromotion}
//         />
//       )}

//       {showDeleteModal && (
//         <DeleteModal
//           isOpen={showDeleteModal}
//           onClose={cancelDelete}
//           onConfirm={confirmDelete}
//         />
//       )}
//     </div>
//   );
// };

// export default PromotionsDashboard;

// Full updated PromotionsDashboard.jsx with divider line and Search/Clear buttons in filter UI
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FiSliders, FiChevronDown, FiEye, FiEdit2, FiTrash2, FiPrinter, FiFile
} from 'react-icons/fi';
import { MdLibraryAdd } from "react-icons/md";
import { TiExport } from "react-icons/ti";
import { FaSearch, FaTimes } from 'react-icons/fa';
import AddPromotionModal from './AddPromotionModal';
import EditPromotionModal from './EditPromotion';
import DeleteModal from './viewcomponents/DeleteModal';
import * as XLSX from 'xlsx';
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import './promotion.css';
import './PromotionsFilter.css';
 
import promotionsData from '../data/promotion.json';
 
 
const PromotionsDashboard = () => {
  const navigate = useNavigate();
 
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
 
  const exportRef = useRef(null);
  const itemsPerPageRef = useRef(null);
 
  // 🆕 Load promotions from JSON file
  useEffect(() => {
    setAllPromotions(promotionsData);
  }, []);
 
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
    navigate(`/promotions/view/${promotion.id}`);
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
    <div className="muthpromotions-dashboard">
      <div className="muthheader">
        <div className="muthheader-content">
          <div className="muthheader-left">
            <h1>Promotions</h1>
          </div>
          <div className="muthheader-right">
            <div className="muthbreadcrumb">
              <a href="/" className="muthbreadcrumb-home">Home</a>
              <span> &gt;&gt; Promotions</span>
            </div>
          </div>
        </div>
      </div>
 
      <div className="muthtable-container">
        <div className="table-header">
          <div className="table-actions">
            <div className="muthitems-per-page" ref={itemsPerPageRef}>
              <div className="muthitems-per-page-selector" onClick={() => {
                setShowItemsPerPageDropdown(!showItemsPerPageDropdown);
                setShowFilterRow(false);
              }}>
                <span>{itemsPerPage}</span>
                <FiChevronDown size={16} color='white' />
              </div>
              {showItemsPerPageDropdown && (
                <div className="muthitems-per-page-dropdown">
                  {[5, 10, 25, 50, 100].map(number => (
                    <div
                      key={number}
                      className={`muthitems-per-page-option ${itemsPerPage === number ? 'active' : ''}`}
                      onClick={() => handleItemsPerPageChange(number)}
                    >
                      {number}
                    </div>
                  ))}
                </div>
              )}
            </div>
 
            <button className="muthicon-btn" title="Filter" onClick={() => {
              setShowFilterRow(prev => !prev);
              setShowExportDropdown(false);
              setShowItemsPerPageDropdown(false);
            }}>
              <FiSliders color='white' size={20} />
            </button>
 
            <div className="muthexport-container" ref={exportRef}>
              <button className="muthicon-btn" title="Export" onClick={() => {
                setShowExportDropdown(!showExportDropdown);
                setShowFilterRow(false);
                setShowItemsPerPageDropdown(false);
              }}>
                <TiExport color='white' size={20} />
              </button>
              {showExportDropdown && (
                <div className="muthexport-dropdown">
                  <button onClick={exportToPDF}><FiPrinter color='white' size={18} /> PDF</button>
                  <button onClick={exportToXLSX}><FiFile color='white' size={18} /> XLS</button>
                </div>
              )}
            </div>
 
            <button className="muthicon-btn add-btn" title="Add" onClick={() => {
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
          <div className="muthufilter-promotions-filter" style={{ margin: '20px' }}>
            <div className="muthufilter-filter-row">
              <div className="muthufilter-filter-group">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={filterInputs.name}
                  onChange={handleFilterInputChange}
                />
              </div>
              <div className="muthufilter-filter-group">
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
              <div className="muthufilter-filter-group">
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
            <div className="muthufilter-filter-actions" style={{ marginTop: '20px' }}>
              <button type="button" className="muthufilter-search-btn">
                <FaSearch /> Search
              </button>
              <button type="button" className="muthufilter-clear-btn" onClick={handleClearFilters}>
                <FaTimes /> Clear
              </button>
            </div>
          </div>
        )}
 
        <div className="muthtable-content-box">
          <table className="muthpromotions-table">
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
                  <td className={`status ${promo.status.toLowerCase()}`}>{promo.status}</td>
                  <td>
                    <div className="action-buttons-cell">
                      <button className="action-btn view" onClick={() => handleViewPromotion(promo)}>
                        <FiEye size={16} />
                      </button>
                      <button className="action-btn edit" onClick={() => setEditPromotion(promo)}>
                        <FiEdit2 size={16} />
                      </button>
                      <button className="action-btn delete" onClick={() => handleDeleteClick(promo.id)}>
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
 
        <div className="muthtable-footer-pagination">
          <div className="pagination-info">
            Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, displayPromotions.length)} of {displayPromotions.length} entries
          </div>
          <div className="muthpagination-controls">
            <button className="muthpagination-btn" disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>&lt;</button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i + 1}
                className={`muthpagination-btn ${currentPage === i + 1 ? 'active' : ''}`}
                onClick={() => handlePageChange(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            <button className="muthpagination-btn" disabled={currentPage === totalPages || totalPages === 0} onClick={() => handlePageChange(currentPage + 1)}>&gt;</button>
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
    </div>
  );
};
 
export default PromotionsDashboard;