import React, { useState, useRef, useEffect } from 'react';
import {
  FiTrash2, FiPrinter, FiFileText, FiCheck, FiX, FiEye, FiEdit2
} from "react-icons/fi";
import { FaShareFromSquare, FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import { IoMdSearch, IoMdArrowDropdown, IoMdClose } from "react-icons/io";

import { PiSliders } from "react-icons/pi";

import { MdClear } from "react-icons/md";
import { CiCircleAlert } from "react-icons/ci";
import { BiSolidAddToQueue } from 'react-icons/bi';
import ExcelJS from "exceljs";
import ReactQuill from 'react-quill'; // Import ReactQuill directly
import 'react-quill/dist/quill.snow.css'; // Import Quill's CSS
import './damage.css';

const DUMMY_PRODUCT_OPTIONS = [
  { id: 'prod1', name: 'Blue T-Shirt', unitCost: 25.00 },
  { id: 'prod2', name: 'Hair Serum', unitCost: 83.33 },
  { id: 'prod3', name: 'Red Scarf', unitCost: 15.00 },
  { id: 'prod4', name: 'Leather Wallet', unitCost: 45.00 },
];

const EditDamageForm = ({ damageItem, onCancel, onSave, productOptions, pageTitle }) => {
  const [formData, setFormData] = useState({
    date: '',
    referenceNo: '',
    attachments: null,
    note: '',
  });
  const [productsInReport, setProductsInReport] = useState([]);
  const [selectedProductToAdd, setSelectedProductToAdd] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (damageItem) {
      let formDate = '';
      if (damageItem.dateReported) {
        try {
          const parts = damageItem.dateReported.split(', ')[1].split('-');
          if (parts.length === 3) {
            formDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
          }
        } catch (e) { console.error("Error parsing date: ", e); }
      }
      if (!formDate && damageItem.date && typeof damageItem.date === 'string' && damageItem.date.includes('-')) {
        if (!isNaN(new Date(damageItem.date))) {
          formDate = damageItem.date;
        }
      }

      setFormData({
        date: formDate || new Date().toISOString().split('T')[0],
        referenceNo: damageItem.referenceNo || '',
        attachments: null,
        note: damageItem.note || '',
      });

      if (damageItem.products && damageItem.products.length > 0) {
        setProductsInReport(damageItem.products);
      } else if (damageItem.productName) {
        const productValueNumeric = parseFloat(damageItem.productValue?.replace('$', '')) || 0;
        const quantity = damageItem.quantityDamaged || 1;
        const unitCost = quantity > 0 ? productValueNumeric / quantity : 0;
        
        setProductsInReport([
          {
            id: `item_${Date.now()}`,
            productId: productOptions.find(p => p.name === damageItem.productName)?.id || '',
            name: damageItem.productName,
            unitCost: unitCost.toFixed(2),
            quantity: quantity,
            discount: 0,
            taxes: 0,
            subTotal: productValueNumeric.toFixed(2),
          },
        ]);
      } else {
        setProductsInReport([]);
      }
    }
  }, [damageItem, productOptions]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleNoteChange = (value) => {
    setFormData((prev) => ({ ...prev, note: value }));
    setError('');
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, attachments: e.target.files[0] }));
  };

  const handleProductChange = (index, field, value) => {
    const updatedProducts = [...productsInReport];
    updatedProducts[index] = { ...updatedProducts[index], [field]: value };

    if (field === 'unitCost' || field === 'quantity' || field === 'discount' || field === 'taxes') {
      const product = updatedProducts[index];
      const unitCost = parseFloat(product.unitCost) || 0;
      const quantity = parseInt(product.quantity, 10) || 0;
      const discount = parseFloat(product.discount) || 0;
      const taxes = parseFloat(product.taxes) || 0;
      const grossSubTotal = unitCost * quantity;
      product.subTotal = (grossSubTotal - discount + taxes).toFixed(2);
    }
    setProductsInReport(updatedProducts);
    setError('');
  };

  const handleAddProductFromDropdown = () => {
    if (!selectedProductToAdd) {
      setError('Please select a product to add.');
      return;
    }
    const productData = productOptions.find(p => p.id === selectedProductToAdd);
    if (productData) {
      setProductsInReport(prevProducts => [
        ...prevProducts,
        {
          id: `item_${Date.now()}`,
          productId: productData.id,
          name: productData.name,
          unitCost: (productData.unitCost || 0).toFixed(2),
          quantity: 1,
          discount: (0).toFixed(2),
          taxes: (0).toFixed(2),
          subTotal: (productData.unitCost || 0).toFixed(2),
        }
      ]);
      setSelectedProductToAdd('');
      setError('');
    }
  };
  
  const removeProduct = (index) => {
    setProductsInReport(prevProducts => prevProducts.filter((_, i) => i !== index));
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (productsInReport.length === 0) {
      setError('At least one product must be added to the damage report.');
      return;
    }
    const overallTotal = productsInReport.reduce((sum, p) => sum + parseFloat(p.subTotal || 0), 0);
    const updatedDamageData = {
      ...damageItem,
      dateReported: new Date(formData.date).toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }) + ', ' + new Date(formData.date).toLocaleDateString('en-GB', { day:'2-digit', month:'2-digit', year:'numeric'}).replace(/\//g, '-'),
      date: new Date(formData.date).toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }) + ', ' + new Date(formData.date).toLocaleDateString('en-GB', { day:'2-digit', month:'2-digit', year:'numeric'}).replace(/\//g, '-'),
      referenceNo: formData.referenceNo,
      note: formData.note,
      products: productsInReport,
      total: `$ ${overallTotal.toFixed(2)}`,
      productName: productsInReport.length === 1 ? productsInReport[0].name : (productsInReport.length > 1 ? 'Multiple Items' : ''),
      quantityDamaged: productsInReport.reduce((sum, p) => sum + parseInt(p.quantity, 10), 0),
      productValue: `$ ${overallTotal.toFixed(2)}`,
    };
    onSave(updatedDamageData);
  };

  const totalQuantity = productsInReport.reduce((sum, p) => sum + (parseInt(p.quantity, 10) || 0), 0);
  const totalDiscount = productsInReport.reduce((sum, p) => sum + (parseFloat(p.discount) || 0), 0);
  const totalTaxes = productsInReport.reduce((sum, p) => sum + (parseFloat(p.taxes) || 0), 0);
  const grandTotalSubTotal = productsInReport.reduce((sum, p) => sum + (parseFloat(p.subTotal) || 0), 0);

  const isNewDamage = !damageItem.referenceNo;

  return (
    <div className="devpmodal-content">
      <div className="devpmodal-header">
        <h2>{pageTitle}</h2>
        <span className="devpmodal-close" onClick={onCancel}>
          <FiX />
        </span>
      </div>
      {error && (
        <div className="devptext-red-500 devptext-sm devpmb-4">{error}</div>
      )}
      <form onSubmit={handleSubmit} className="devpmodal-form">
        <div className="devpfilter-container">
          <div className="devpfilter-group">
            <label htmlFor="date" className="devpfilter-label">
              Date <span className="devprequired">*</span>
            </label>
            <input
              type="date"
              name="date"
              id="date"
              value={formData.date}
              onChange={handleInputChange}
              className="devpfilter-input"
              required
            />
          </div>
          <div className="devpfilter-group">
            <label htmlFor="referenceNo" className="devpfilter-label">
              Reference No
            </label>
            <input
              type="text"
              name="referenceNo"
              id="referenceNo"
              value={formData.referenceNo}
              onChange={handleInputChange}
              className="devpfilter-input"
            />
          </div>
          <div className="devpfilter-group">
            <label htmlFor="attachments" className="devpfilter-label">
              Attachments
            </label>
            <input
              style={{ width: '300px' }}
              type="file"
              name="attachments"
              id="attachments"
              onChange={handleFileChange}
              className="devpfilter-input"
            />
          </div>
        </div>
        <div className="devpfilter-container">
          <div className="devpfilter-group">
            <label htmlFor="addProduct" className="devpfilter-label">
              Add Products <span className="devprequired">*</span>
            </label>
            <div className="devpfilter-container">
              <div style={{ display: 'flex', gap: '8px' }}>
                <select
                  id="addProduct"
                  value={selectedProductToAdd}
                  onChange={(e) => setSelectedProductToAdd(e.target.value)}
                  className="devpfilter-input"
                >
                  <option value="">Select one</option>
                  {productOptions.map(option => (
                    <option key={option.id} value={option.id}>{option.name} (Cost: ${option.unitCost.toFixed(2)})</option>
                  ))}
                </select>
                <button 
                  type="button"
                  onClick={handleAddProductFromDropdown}
                  className="devpsearch-button"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="devpmain-container">
          <h3 className="devpmodal-label">Products</h3>
          <div id="printable-table" className="devpmodal-table-container">
            <table className="devpsubscriber-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Unit Cost</th>
                  <th>Quantity</th>
                  <th>Discount</th>
                  <th>Taxes</th>
                  <th>SubTotal</th>
                  <th className="devpaction-column">Actions</th>
                </tr>
              </thead>
              <tbody>
                {productsInReport.length > 0 ? (
                  productsInReport.map((product, index) => (
                    <tr key={product.id || index}>
                      <td>{product.name}</td>
                      <td>
                        <input
                          type="number"
                          value={product.unitCost}
                          onChange={e => handleProductChange(index, 'unitCost', e.target.value)}
                          className="devpfilter-input"
                          style={{ width: '100px' }}
                          step="0.01"
                          min="0"
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          value={product.quantity}
                          onChange={e => handleProductChange(index, 'quantity', e.target.value)}
                          className="devpfilter-input"
                          style={{ width: '80px' }}
                          min="1"
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          value={product.discount}
                          onChange={e => handleProductChange(index, 'discount', e.target.value)}
                          className="devpfilter-input"
                          style={{ width: '100px' }}
                          step="0.01"
                          min="0"
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          value={product.taxes}
                          onChange={e => handleProductChange(index, 'taxes', e.target.value)}
                          className="devpfilter-input"
                          style={{ width: '100px' }}
                          step="0.01"
                          min="0"
                        />
                      </td>
                      <td>$ {parseFloat(product.subTotal || 0).toFixed(2)}</td>
                      <td className="devpaction-column">
                        <div
                          className="devpdelete-icon"
                          onClick={() => removeProduct(index)}
                        >
                          <FiTrash2 color="#F4415F" />
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7">No products added yet.</td>
                  </tr>
                )}
              </tbody>
              <tfoot>
                <tr>
                  <td className="devpfilter-label" colSpan="2">Total</td>
                  <td className="devpfilter-label">{totalQuantity}</td>
                  <td className="devpfilter-label">$ {totalDiscount.toFixed(2)}</td>
                  <td className="devpfilter-label">$ {totalTaxes.toFixed(2)}</td>
                  <td className="devpfilter-label">$ {grandTotalSubTotal.toFixed(2)}</td>
                  <td></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
        <div className="devpfilter-container">
          <div className="devpfilter-group">
            <label htmlFor="note" className="devpfilter-label">
              Note
            </label>
            <ReactQuill
              theme="snow"
              value={formData.note}
              onChange={handleNoteChange}
              placeholder="Insert content here ..."
              modules={{
                toolbar: [
                  ['bold', 'italic', 'underline', 'strike'], // toggled buttons
                  ['blockquote', 'code-block'],
                  [{ header: 1 }, { header: 2 }], // custom button values
                  [{ list: 'ordered' }, { list: 'bullet' }],
                  [{ script: 'sub' }, { script: 'super' }],
                  [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
                  [{ direction: 'rtl' }], // text direction
                  [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
                  [{ header: [1, 2, 3, 4, 5, 6, false] }],
                  [{ color: [] }, { background: [] }], // dropdown with defaults
                  [{ font: [] }],
                  [{ align: [] }],
                  ['link', 'image', 'video'],
                  ['clean'], // remove formatting
                ],
              }}
            />
          </div>
        </div>
        <div className="devpmodal-buttons">
          <button
            type="button"
            onClick={onCancel}
            className="devpclear-button1"
          >
            <FiX /> Cancel
          </button>
          <button
            type="submit"
            className="devpsave-button"
          >
            <FiCheck /> {isNewDamage ? 'Save' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  );
};

const DamagePage = () => {
  const [currentDamageData, setCurrentDamageData] = useState([]);
  const [filterForm, setFilterForm] = useState({
    note: '',
    date: '',
    total: '',
    referenceNo: ''
  });
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [isShareDropdownOpen, setIsShareDropdownOpen] = useState(false);
  const [isPerPageDropdownOpen, setIsPerPageDropdownOpen] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(9);
  const [currentPage, setCurrentPage] = useState(1);
  const [editingDamageItem, setEditingDamageItem] = useState(null);
  const [viewingDamageItem, setViewingDamageItem] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [damageItemIdToDelete, setDamageItemIdToDelete] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const shareButtonRef = useRef(null);
  const shareDropdownRef = useRef(null);
  const recordButtonRef = useRef(null);
  const recordDropdownRef = useRef(null);

  useEffect(() => {
    const fetchDamageData = async () => {
      try {
        const response = await fetch("/Damagedata.json");
        const data = await response.json();
        setCurrentDamageData(data);
      } catch (error) {
        console.error("Error fetching damage data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDamageData();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isShareDropdownOpen &&
        shareDropdownRef.current &&
        !shareDropdownRef.current.contains(event.target) &&
        shareButtonRef.current &&
        !shareButtonRef.current.contains(event.target)
      ) {
        setIsShareDropdownOpen(false);
      }
    };

    if (isShareDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isShareDropdownOpen]);

  useEffect(() => {
    const handleClickOutsideRecord = (event) => {
      if (
        isPerPageDropdownOpen &&
        recordDropdownRef.current &&
        !recordDropdownRef.current.contains(event.target) &&
        recordButtonRef.current &&
        !recordButtonRef.current.contains(event.target)
      ) {
        setIsPerPageDropdownOpen(false);
      }
    };

    if (isPerPageDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutsideRecord);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideRecord);
    };
  }, [isPerPageDropdownOpen]);

  const toggleFilter = () => {
    setIsFilterVisible(prev => !prev);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilterForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSearch = () => {
    const filtered = currentDamageData.filter(item => {
      const matchesNote =
        filterForm.note === '' ||
        item.note.toLowerCase().includes(filterForm.note.toLowerCase()) ||
        item.productName.toLowerCase().includes(filterForm.note.toLowerCase());

      const matchesDate =
        filterForm.date === '' || item.date.includes(filterForm.date);

      const matchesTotal =
        filterForm.total === '' || item.total.includes(filterForm.total);

      const matchesReference =
        filterForm.referenceNo === '' || item.referenceNo.toLowerCase().includes(filterForm.referenceNo.toLowerCase());

      return matchesNote && matchesDate && matchesTotal && matchesReference;
    });

    setCurrentDamageData(filtered);
    setCurrentPage(1);
  };

  const handleClearSearch = () => {
    const fetchDamageData = async () => {
      try {
        const response = await fetch("/Damagedata.json");
        const data = await response.json();
        setCurrentDamageData(data);
      } catch (error) {
        console.error("Error fetching damage data:", error);
      }
    };
    fetchDamageData();
    setFilterForm({
      note: '',
      date: '',
      total: '',
      referenceNo: ''
    });
    setCurrentPage(1);
  };

  const handleItemsPerPageChange = (size) => {
    setItemsPerPage(size);
    setCurrentPage(1);
    setIsPerPageDropdownOpen(false);
  };

  const handleViewClick = (damageItem) => {
    setViewingDamageItem(damageItem);
  };

  const handleEditClick = (damageItem) => {
    setEditingDamageItem(damageItem);
  };

  const handleAddClick = () => {
    const newDamageTemplate = {
      id: `new_${Date.now()}`,
      date: new Date().toLocaleDateString('en-CA'),
      referenceNo: '',
      total: '$ 0.00',
      note: '',
      productName: '',
      quantityDamaged: 0,
      productValue: '$ 0.00',
      reportedBy: 'Current User',
      status: 'Draft',
      dateReported: new Date().toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }) + ', ' + new Date().toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '-'),
      products: []
    };
    setEditingDamageItem(newDamageTemplate);
  };

  const handleCancelView = () => {
    setViewingDamageItem(null);
  };

  const handleCancelEdit = () => {
    setEditingDamageItem(null);
  };

  const handleSaveDamage = (updatedDamage) => {
    if (updatedDamage.id.startsWith('new_')) {
      setCurrentDamageData(prevData => [...prevData, { ...updatedDamage, id: prevData.length + 1 }]);
    } else {
      setCurrentDamageData(prevData =>
        prevData.map(item => (item.id === updatedDamage.id ? { ...item, ...updatedDamage } : item))
      );
    }
    setEditingDamageItem(null);
  };

  const handleDeleteClick = (itemId) => {
    setDamageItemIdToDelete(itemId);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmActualDelete = () => {
    const updatedData = currentDamageData.filter(item => item.id !== damageItemIdToDelete);
    setCurrentDamageData(updatedData);
    setIsDeleteModalOpen(false);
    setDamageItemIdToDelete(null);
    if (paginatedData.length === 1 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    setDamageItemIdToDelete(null);
  };

  const handlePrint = () => {
    const originalItemsPerPage = itemsPerPage;
    setItemsPerPage(currentDamageData.length);
    setCurrentPage(1);
    setTimeout(() => {
      window.print();
      setItemsPerPage(originalItemsPerPage);
    }, 0);
  };

  const handleExportXLS = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Damage Reports");

    worksheet.columns = [
      { header: "Date", key: "date", width: 20 },
      { header: "Reference No", key: "referenceNo", width: 15 },
      { header: "Total", key: "total", width: 15 },
      { header: "Note", key: "note", width: 30 },
    ];

    currentDamageData.forEach((item) => {
      worksheet.addRow({
        date: item.date,
        referenceNo: item.referenceNo,
        total: item.total,
        note: item.note,
      });
    });

    worksheet.getRow(1).font = { bold: true };
    worksheet.getRow(1).fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFF2F2F2" },
    };

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "damage_reports.xlsx";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const totalPages = Math.ceil(currentDamageData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const paginatedData = currentDamageData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="devpsubscriber">
      <div className="devpheader">
        <div className="devpheader-content">
          <h1>Damage</h1>
          <div className="devpbreadcrumb">
            <span className="devphome">Home</span> &gt;&gt;  Damage
          </div>
        </div>
      </div>

      <div className="devpmain-container">
        <div className="devpaction-bar">
          <div className="devpdropdown-container">
            <button
              ref={recordButtonRef}
              className="devprecord-button"
              onClick={() => setIsPerPageDropdownOpen(!isPerPageDropdownOpen)}
              title="Records"
            >
              {itemsPerPage}
              <IoMdArrowDropdown size={17} />
            </button>
            {isPerPageDropdownOpen && (
              <div ref={recordDropdownRef} className="devpdropdown-menu">
                {[5, 10, 15, 20].map((size) => (
                  <div
                    key={size}
                    className="devpdropdown-item"
                    onClick={() => handleItemsPerPageChange(size)}
                  >
                    {size}
                  </div>
                ))}
              </div>
            )}
          </div>
          <button
            className="devpaction-button devpfilter-button"
            onClick={toggleFilter}
            title="Filter"
          >
            <PiSliders size={17} />
          </button>
          <div className="devpdropdown-container">
            <button
              ref={shareButtonRef}
              className="devpaction-button devpshare-button"
              onClick={() => setIsShareDropdownOpen(!isShareDropdownOpen)}
              title="Share"
            >
              <FaShareFromSquare size={17} />
            </button>
            {isShareDropdownOpen && (
              <div ref={shareDropdownRef} className="devpdropdown-menu">
                <div className="devpdropdown-item" onClick={handlePrint}>
                  <FiPrinter size={27} color="white" /> Print
                </div>
                <div className="devpdropdown-item" onClick={handleExportXLS}>
                  <FiFileText size={27} color="white" /> XLS
                </div>
              </div>
            )}
          </div>
          <button
            className="devpaction-button"
            onClick={handleAddClick}
            title="Add New Damage"
          >
            <BiSolidAddToQueue size={17} />
          </button>
        </div>

        <hr className="devpdivider" />

        {isFilterVisible && (
          <div className="devpfilter-container">
            <div className="devpfilter-group">
              <label className="devpfilter-label">Note</label>
              <input
                name="note"
                value={filterForm.note}
                onChange={handleFilterChange}
                className="devpfilter-input"
                placeholder="Search note or product..."
              />
              <button
                className="devpsearch-button"
                onClick={handleSearch}
              >
                <IoMdSearch /> Search
              </button>
            </div>
            <div className="devpfilter-group">
              <label className="devpfilter-label">Date</label>
              <input
                type="datetime-local"
                name="date"
                value={filterForm.date}
                onChange={handleFilterChange}
                className="devpfilter-input devpdate-input"
              />
              <button
                className="devpclear-button"
                onClick={handleClearSearch}
              >
                <MdClear /> Clear
              </button>
            </div>
            <div className="devpfilter-group">
              <label className="devpfilter-label">Total</label>
              <input
                name="total"
                value={filterForm.total}
                onChange={handleFilterChange}
                className="devpfilter-input"
                placeholder="$"
              />
            </div>
            <div className="devpfilter-group">
              <label className="devpfilter-label">Reference No</label>
              <input
                name="referenceNo"
                value={filterForm.referenceNo}
                onChange={handleFilterChange}
                className="devpfilter-input"
                placeholder="e.g. DMG-001"
              />
            </div>
          </div>
        )}

        {isLoading ? (
          <div className="devploading">Loading damage reports...</div>
        ) : (
          <div id="printable-table">
            <table className="devpsubscriber-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Reference No</th>
                  <th>Total</th>
                  <th>Note</th>
                  <th className="devpaction-column">Action</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.length > 0 ? (
                  paginatedData.map((item) => (
                    <tr key={item.id}>
                      <td>{item.date}</td>
                      <td>{item.referenceNo}</td>
                      <td>{item.total}</td>
                      <td>{item.note}</td>
                      <td className="devpaction-column">
                        <div
                          className="devpview-icon"
                          onClick={() => handleViewClick(item)}
                        >
                          <FiEye color="#5a66f1" />
                        </div>
                        <div
                          className="devpedit-icon"
                          onClick={() => handleEditClick(item)}
                        >
                          <FiEdit2 color='green'/>
                        </div>
                        <div
                          className="devpdelete-icon"
                          onClick={() => handleDeleteClick(item.id)}
                        >
                          <FiTrash2 color="#F4415F" />
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">No results found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        <div className="devppagination">
          <div className="devppagination-info">
            Showing {Math.min((currentPage - 1) * itemsPerPage + 1, currentDamageData.length)} to{" "}
            {Math.min(currentPage * itemsPerPage, currentDamageData.length)} of {currentDamageData.length} entries
          </div>
          <div className="devppagination-buttons">
            <button
              className="devppagination-button"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <FaAngleLeft color="black" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                className={`devppagination-button ${page === currentPage ? 'devpactive' : ''}`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}
            <button
              className="devppagination-button"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              <FaAngleRight color="black" />
            </button>
          </div>
        </div>
      </div>

      {(editingDamageItem || viewingDamageItem) && (
        <div className="devpmodal-overlay">
          <div className="devpmodal">
            {viewingDamageItem && (
              <div className="devpfixed devpinset-0 devpbg-black/25 devpbackdrop-blur-sm devpflex devpitems-center devpjustify-center devpp-4 devpz-50">
                <div className="devpbg-white devprounded-lg devpshadow-xl devpmax-w-md devpw-full devpmax-h-[90vh] devpoverflow-y-auto">
                  <div className="devpdamagebt">
                    <button onClick={handleCancelView} className="devpview-close-button">
                      <IoMdClose/>
                    </button>
                    <h2 className="devptext-xl devpfont-semibold devptext-gray-900">Damage Details</h2>
                  </div>
                  <div className="devpdamagebt1">
                    <div><span className="devpfont-medium devptext-gray-900">Reference No: </span><span className="devptext-gray-700">{viewingDamageItem.referenceNo}</span></div>
                    <div><span className="devpfont-medium devptext-gray-900">Date Reported: </span><span className="devptext-gray-700">{viewingDamageItem.dateReported}</span></div>
                    <div><span className="devpfont-medium devptext-gray-900">Product: </span><span className="devptext-gray-700">{viewingDamageItem.productName}</span></div>
                    <div><span className="devpfont-medium devptext-gray-900">Quantity Damaged: </span><span className="devptext-gray-700">{viewingDamageItem.quantityDamaged}</span></div>
                    <div><span className="devpfont-medium devptext-gray-900">Product Value: </span><span className="devptext-gray-700">{viewingDamageItem.productValue}</span></div>
                    <div><span className="devpfont-medium devptext-gray-900">Total Damage Value: </span><span className="devptext-gray-700">{viewingDamageItem.total}</span></div>
                    <div><span className="devpfont-medium devptext-gray-900">Reported By: </span><span className="devptext-gray-700">{viewingDamageItem.reportedBy}</span></div>
                    <div><span className="devpfont-medium devptext-gray-900">Status: </span><span className="devptext-gray-700">{viewingDamageItem.status}</span></div>
                    <div><span className="devpfont-medium devptext-gray-900">Note: </span><span className="devptext-gray-700 devpbreak-words">{viewingDamageItem.note}</span></div>
                  </div>
                </div>
              </div>
            )}
            {editingDamageItem && (
              <EditDamageForm
                damageItem={editingDamageItem}
                onCancel={handleCancelEdit}
                onSave={handleSaveDamage}
                productOptions={DUMMY_PRODUCT_OPTIONS}
                pageTitle={editingDamageItem.referenceNo ? `Edit Damage: ${editingDamageItem.referenceNo}` : 'Add New Damage'}
              />
            )}
          </div>
        </div>
      )}

      {isDeleteModalOpen && (
        <div className="devpmodal-overlay">
          <div className="devpmodal devpdelete-modal">
            <div className="devpmodal-icon">
              <CiCircleAlert size={60} color="gold" />
            </div>
            <h2>Are you sure?</h2>
            <p>You will not be able to recover the deleted record.</p>
            <div className="devpmodal-buttons1">
              <button
                className="devpdelete-button"
                onClick={handleConfirmActualDelete}
              >
                Yes, Delete it!
              </button>
              <button
                className="devpcancel-button"
                onClick={handleCancelDelete}
              >
                No, Cancel!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DamagePage;