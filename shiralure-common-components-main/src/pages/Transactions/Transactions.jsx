import React, { useState, useEffect, useRef } from 'react';
import {FiPrinter, FiFileText, } from "react-icons/fi";
import { FaShareFromSquare,FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import {  IoMdArrowDropdown,IoMdSearch } from "react-icons/io";
import { MdClear } from "react-icons/md";

import { PiSliders } from "react-icons/pi";
import './Transactions.css';

const TransactionPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showShareDropdown, setShowShareDropdown] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [transactionIdFilter, setTransactionIdFilter] = useState("");
  const [orderSerialNoFilter, setOrderSerialNoFilter] = useState("");
  const [paymentMethodFilter, setPaymentMethodFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const [showPageDropdown, setShowPageDropdown] = useState(false);

  const shareButtonRef = useRef(null);
  const shareDropdownRef = useRef(null);
  const recordButtonRef = useRef(null);
  const recordDropdownRef = useRef(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch('/transactions.json');
        const data = await response.json();
        setTransactions(data);
        setFilteredList(data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTransactions();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showShareDropdown && shareDropdownRef.current && !shareDropdownRef.current.contains(event.target) && shareButtonRef.current && !shareButtonRef.current.contains(event.target)) {
        setShowShareDropdown(false);
      }
    };
    if (showShareDropdown) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showShareDropdown]);

  useEffect(() => {
    const handleClickOutsideRecord = (event) => {
      if (showPageDropdown && recordDropdownRef.current && !recordDropdownRef.current.contains(event.target) && recordButtonRef.current && !recordButtonRef.current.contains(event.target)) {
        setShowPageDropdown(false);
      }
    };
    if (showPageDropdown) document.addEventListener("mousedown", handleClickOutsideRecord);
    return () => document.removeEventListener("mousedown", handleClickOutsideRecord);
  }, [showPageDropdown]);

  const toggleFilters = () => setShowFilters(!showFilters);
  const toggleShareDropdown = () => setShowShareDropdown(!showShareDropdown);

  const handleSearch = () => {
    const filtered = transactions.filter((trans) =>
      trans.id.toLowerCase().includes(transactionIdFilter.toLowerCase()) &&
      trans.order.toLowerCase().includes(orderSerialNoFilter.toLowerCase()) &&
      (paymentMethodFilter === "" || trans.method.toLowerCase() === paymentMethodFilter.toLowerCase()) &&
      trans.date.toLowerCase().includes(dateFilter.toLowerCase())
    );
    setFilteredList(filtered);
    setCurrentPage(1);
  };

  const handleClear = () => {
    setTransactionIdFilter("");
    setOrderSerialNoFilter("");
    setPaymentMethodFilter("");
    setDateFilter("");
    setFilteredList(transactions);
    setCurrentPage(1);
  };

  const handlePrint = () => {
    const originalRowsPerPage = rowsPerPage;
    setRowsPerPage(filteredList.length);
    setCurrentPage(1);
    setTimeout(() => window.print(), 0);
    setRowsPerPage(originalRowsPerPage);
  };

  const downloadXLS = () => {
    const header = ["Transaction Id", "Date", "Payment Method", "Order Serial No", "Amount"];
    const data = filteredList.map(trans => [
      trans.id,
      trans.date,
      trans.method,
      trans.order,
      trans.amount
    ]);
    const csv = [
      header.join(","),
      ...data.map(row => row.join(","))
    ].join("\n");
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'transactions.xls';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const totalPages = Math.ceil(filteredList.length / rowsPerPage);
  const paginate = () => filteredList.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  return (
    <div className="DevaDEsubscriber">
      <div className="DevaDEheader">
        <div className="DevaDEheader-content">
          <h1>Transaction</h1>
          <div className="DevaDEbreadcrumb">
            <span className="DevaDEhome">Dashboard</span>  Transaction
          </div>
        </div>
      </div>

      <div className="DevaDEmain-container">
        <div className="DevaDEaction-bar">
          <div className="DevaDEdropdown-container">
            <button
              ref={recordButtonRef}
              className="DevaDErecord-button"
              onClick={() => setShowPageDropdown(!showPageDropdown)}
            >
              {rowsPerPage} <IoMdArrowDropdown size={17}/>
            </button>
            {showPageDropdown && (
              <div ref={recordDropdownRef} className="DevaDEdropdown-menu">
                {[6, 12, 18, 24].map((num) => (
                  <div
                    key={num}
                    className="DevaDEdropdown-item"
                    onClick={() => { setRowsPerPage(num); setShowPageDropdown(false); setCurrentPage(1); }}
                  >
                    {num}
                  </div>
                ))}
              </div>
            )}
          </div>
          <button
            className="DevaDEaction-button"
            onClick={toggleFilters}
          >
            <PiSliders size={17} />
          </button>
          <div className="DevaDEdropdown-container">
            <button
              ref={shareButtonRef}
              className="DevaDEaction-button"
              onClick={toggleShareDropdown}
            >
              <FaShareFromSquare />
            </button>
            {showShareDropdown && (
              <div ref={shareDropdownRef} className="DevaDEdropdown-menu">
                <div className="DevaDEdropdown-item" onClick={handlePrint}>
                  <FiPrinter /> Print
                </div>
                <div className="DevaDEdropdown-item" onClick={downloadXLS}>
                  <FiFileText /> XLS
                </div>
              </div>
            )}
          </div>
        </div>

        <hr className="DevaDEdivider" />

        {showFilters && (
          <div className="DevaDEfilter-container">
            <div className="DevaDEfilter-row">
              <div className="DevaDEfilter-group">
                <label className="DevaDEfilter-label">Transaction Id</label>
                <input
                  className="DevaDEfilter-input"
                  value={transactionIdFilter}
                  onChange={(e) => setTransactionIdFilter(e.target.value)}
                />
              </div>
              <div className="DevaDEfilter-group">
                <label className="DevaDEfilter-label">Order Serial No</label>
                <input
                  className="DevaDEfilter-input"
                  value={orderSerialNoFilter}
                  onChange={(e) => setOrderSerialNoFilter(e.target.value)}
                />
              </div>
              <div className="DevaDEfilter-group">
                <label className="DevaDEfilter-label">Payment Method</label>
                <select
                  className="DevaDEfilter-input DevaDEfilter-select"
                  value={paymentMethodFilter}
                  onChange={(e) => setPaymentMethodFilter(e.target.value)}
                >
                  <option value="">All</option>
                  <option value="Credit Card">Credit Card</option>
                  <option value="PayPal">PayPal</option>
                  <option value="Debit Card">Debit Card</option>
                  <option value="UPI">UPI</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                </select>
              </div>
            </div>
            <div className="DevaDEfilter-row">
              <div className="DevaDEfilter-group">
                <label className="DevaDEfilter-label">Date</label>
                <input
                  type="datetime-local"
                  className="DevaDEfilter-input"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                />
              </div>
            </div>
            <div className="DevaDEfilter-row">
              <div className="DevaDEfilter-group DevaDEbutton-group">
                <button className="DevaDEsearch-button" onClick={handleSearch}>
                  <IoMdSearch /> Search
                </button>
                <button className="DevaDEclear-button" onClick={handleClear}>
                  <MdClear /> Clear
                </button>
              </div>
            </div>
          </div>
        )}

        {isLoading ? (
          <div className="DevaDEloading">Loading transactions...</div>
        ) : (
          <div id="printable-table">
            <table className="DevaDEsubscriber-table">
              <thead>
                <tr>
                  <th>Transaction Id</th>
                  <th>Date</th>
                  <th>Payment Method</th>
                  <th>Order Serial No</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {paginate().length > 0 ? (
                  paginate().map((trans, index) => (
                    <tr key={index}>
                      <td>{trans.id}</td>
                      <td>{trans.date}</td>
                      <td>{trans.method}</td>
                      <td>{trans.order}</td>
                      <td>{trans.amount}</td>
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

        <div className="DevaDEpagination">
          <div className="DevaDEpagination-info">
            Showing {Math.min((currentPage - 1) * rowsPerPage + 1, filteredList.length)} to {Math.min(currentPage * rowsPerPage, filteredList.length)} of {filteredList.length} entries
          </div>
          <div className="DevaDEpagination-buttons">
            <button
              className="DevaDEpagination-button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(1)}
            >
              <FaAngleLeft color="black" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                className={`DevaDEpagination-button ${page === currentPage ? 'DevaDEactive' : ''}`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}
            <button
              className="DevaDEpagination-button"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(totalPages)}
            >
              <FaAngleRight color="black" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionPage;