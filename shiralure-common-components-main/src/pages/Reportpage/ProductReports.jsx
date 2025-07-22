import { useState, useEffect } from "react";
import productsData from "./Products.json";
import { FaPrint, FaFileExcel, FaShareSquare } from "react-icons/fa";
import { MdArrowDropDown } from "react-icons/md";
import { PiSliders } from "react-icons/pi";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { IoMdSearch } from "react-icons/io";
import { MdOutlineClear } from "react-icons/md";

import "./ProductReport.css";

const ProductsReport = () => {
  const [numRecords, setNumRecords] = useState(6);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  
  // NEW: States for input fields (what user types)
  const [nameInput, setNameInput] = useState("");
  const [categoryInput, setCategoryInput] = useState("");

  // NEW: States for APPLIED filters (only updated on Search click)
  const [appliedFilterName, setAppliedFilterName] = useState("");
  const [appliedFilterCategory, setAppliedFilterCategory] = useState("");

  const [filteredProducts, setFilteredProducts] = useState(productsData);
  const [showShareOptions, setShowShareOptions] = useState(false);

  useEffect(() => {
    // This useEffect now depends on appliedFilterName and appliedFilterCategory
    // It will run only when these 'applied' states change (i.e., when search is clicked)
    const applyFilters = () => {
      let tempProducts = productsData;

      if (appliedFilterName) {
        tempProducts = tempProducts.filter(product =>
          product.name.toLowerCase().includes(appliedFilterName.toLowerCase())
        );
      }

      if (appliedFilterCategory) {
        tempProducts = tempProducts.filter(product =>
          product.category === appliedFilterCategory
        );
      }
      setFilteredProducts(tempProducts);
      setCurrentPage(1); // Reset to first page when filters are applied
    };

    applyFilters();
  }, [appliedFilterName, appliedFilterCategory]); // Dependencies changed

  const itemsPerPage = numRecords;
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredProducts.length);
  const currentData = filteredProducts.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Handlers for input field changes (update input states)
  const handleNameInputChange = (e) => {
    setNameInput(e.target.value);
  };

  const handleCategoryInputChange = (e) => {
    setCategoryInput(e.target.value);
  };

  // NEW: Handle "Search" button click
  const handleSearchClick = () => {
    setAppliedFilterName(nameInput);      // Apply current name input
    setAppliedFilterCategory(categoryInput); // Apply current category input
    // The useEffect will now trigger and re-filter based on these new applied values
  };

  // Handle "Clear" button click
  const handleClearFilters = () => {
    setNameInput("");           // Clear input field
    setCategoryInput("");       // Clear input field
    setAppliedFilterName("");   // Clear applied filter (triggers useEffect)
    setAppliedFilterCategory(""); // Clear applied filter (triggers useEffect)
  };

  // const handlePrint = () => {
  //   window.print();
  //   setShowShareOptions(false);
  // };

  const handlePrint = () => {
  setTimeout(() => {
    window.print();
  }, 100); // Try 100ms. If this doesn't work, test with 200ms, 300ms.
  // Make sure any modals are closed or state preventing table render is false BEFORE print.
  setShowShareOptions(false);
};


  function handleDownloadXLS() {
    const headers = ["Name", "Category", "Viewed", "Sold Quantity"];
    const rows = filteredProducts.map(item => [
      `"${item.name.replace(/"/g, '""')}"`,
      `"${item.category.replace(/"/g, '""')}"`,
      item.viewed,
      item.sold
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "products_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setShowShareOptions(false);
  }

  const handleGoToDashboard = () => {
    console.log("Navigating to Dashboard...");
    alert("Simulating navigation to Dashboard. In a full app, this would be a route change!");
  };

  const toggleNumRecordsDropdown = () => {
    setShowDropdown(prev => !prev); // Toggle its own state
    setShowFilterPanel(false); // Close filter panel
    setShowShareOptions(false); // Close share options
  };

  const toggleFilterPanel = () => {
    setShowFilterPanel(prev => !prev); // Toggle its own state
    setShowDropdown(false); // Close num records dropdown
    setShowShareOptions(false); // Close share options
  };

  const toggleShareOptions = () => {
    setShowShareOptions(prev => !prev); // Toggle its own state
    setShowDropdown(false); // Close num records dropdown
    setShowFilterPanel(false); // Close filter panel
  };

  return (
    <div className="rproducts-report-container">
      <div className="rheader-bar">
        <h1 className="rtitle">Products Report</h1>
        <div className="rbreadcrumb">
          <div className="rlink" onClick={handleGoToDashboard}>Home</div> <div className="arrow">&gt;&gt;</div> <div>Products Report</div>
        </div>
      </div>

      
        <div className="topsicons">
        <div className="ractions">
       <button onClick={toggleNumRecordsDropdown} className="rdropdown-btn">
             {numRecords} <MdArrowDropDown />
           </button>
        {showDropdown && (
          <div className="rdropdown-menu">
            {[5, 6, 10, 15, 20].map((n) => (
              <div key={n} onClick={() => { setNumRecords(n); setShowDropdown(false); }}>
                {n}
              </div>
            ))}
          </div>
        )}

        <button onClick={toggleFilterPanel} className="ricon-btn"><PiSliders /></button>
        <button onClick={toggleShareOptions} className="ricon-btn"><FaShareSquare /></button>
        {showShareOptions && (
          <div className="rshare-options-menu">
            <div onClick={handlePrint} className="rshare-option-item">
              <FaPrint /> Print
            </div>
            <div onClick={handleDownloadXLS} className="rshare-option-item">
              <FaFileExcel /> XLS
            </div>
          </div>
        )}
      </div>

      {showFilterPanel && (
        <div className="rfilter-panel">
          <div className="rfilter-row">
            <div className="rfilter-group">
              <label htmlFor="name-input" className="rfilter-label">Name</label>
              <input
                type="text"
                id="name-input"
                className="rfilter-input"
                value={nameInput} // Binds to nameInput
                onChange={handleNameInputChange} // Updates nameInput
              />
            </div>
            <div className="rfilter-group">
              <label htmlFor="category-select" className="rfilter-label1">Category</label>
              <select
                id="category-select"
                className="rfilter-inputs"
                value={categoryInput} // Binds to categoryInput
                onChange={handleCategoryInputChange} // Updates categoryInput
              >
                <option value="">Select Category</option>
                <option value="Hair Care">Hair Care</option>
                <option value="Skin Care">Skin Care</option>
                <option value="Apparel">Apparel</option>
              </select>
            </div>
          </div>
          <div className="rfilter-actions">
            <button className="rsearch-btn" onClick={handleSearchClick}> <IoMdSearch />Search</button> {/* Call handleSearchClick */}
            <button className="rclear-btn" onClick={handleClearFilters}> <MdOutlineClear />Clear</button>
          </div>
        </div>
        )}
      
        <div className="beautyproducts">
          <table className="rproducts-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Viewed</th>
            <th>Sold Quantity</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((item, idx) => (
            <tr key={idx}>
              <td>{item.name}</td>
              <td>{item.category}</td>
              <td>{item.viewed}</td>
              <td>{item.sold}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      

      <div className="rpagination-footer">
        <div className="rpagin">
        Showing {startIndex + 1} to {endIndex} of {filteredProducts.length} entries
        </div>

        <div className="rpagination-controls">
          <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
            <IoIosArrowBack />
          </button>
          {[...Array(totalPages)].map((_, idx) => (
            <button
              key={idx}
              className={currentPage === idx + 1 ? "active" : ""}
              onClick={() => handlePageChange(idx + 1)}
            >
              {idx + 1}
            </button>
          ))}
          <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
            <IoIosArrowForward />
          </button>
        </div>
      </div>
    </div>
    </div>
  
  );
};

export default ProductsReport;