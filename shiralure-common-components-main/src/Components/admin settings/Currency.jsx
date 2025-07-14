import React, { useState } from 'react';
import { Edit, Trash2, Plus, X, Save, RotateCcw } from 'lucide-react';

const CurrencyComponent = () => {
  const [currencies, setCurrencies] = useState([
    {
      id: 1,
      title: 'India Rupees',
      symbol: '₹',
      code: 'INR',
      isCryptocurrency: false,
      exchangeRate: 1
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentCurrency, setCurrentCurrency] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    symbol: '',
    code: '',
    isCryptocurrency: false,
    exchangeRate: ''
  });

  const handleAdd = () => {
    setCurrentCurrency(null);
    setFormData({
      title: '',
      symbol: '',
      code: '',
      isCryptocurrency: false,
      exchangeRate: ''
    });
    setShowModal(true);
  };

  const handleEdit = (currency) => {
    setCurrentCurrency(currency);
    setFormData({
      title: currency.title,
      symbol: currency.symbol,
      code: currency.code,
      isCryptocurrency: currency.isCryptocurrency,
      exchangeRate: currency.exchangeRate.toString()
    });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setCurrencies(currencies.filter(c => c.id !== deleteId));
    setShowDeleteModal(false);
    setDeleteId(null);
  };

  const handleSave = () => {
    if (currentCurrency) {
      setCurrencies(currencies.map(c => 
        c.id === currentCurrency.id 
          ? { ...c, ...formData, exchangeRate: parseFloat(formData.exchangeRate) }
          : c
      ));
    } else {
      const newCurrency = {
        id: Date.now(),
        ...formData,
        exchangeRate: parseFloat(formData.exchangeRate)
      };
      setCurrencies([...currencies, newCurrency]);
    }
    setShowModal(false);
  };

  const handleClear = () => {
    setFormData({
      title: '',
      symbol: '',
      code: '',
      isCryptocurrency: false,
      exchangeRate: ''
    });
  };

  return (
    <div className="currency-container">
      <div className="currency-header">
        <h2>CURRENCIES</h2>
        <div className="header-buttons">
          <button className="btn-primary" onClick={handleAdd}>
            <Plus size={16} />Add
          </button>
        </div>
      </div>

      <div className="currency-table">
        <div className="table-header">
          <div className="col-title">TITLE</div>
          <div className="col-symbol">SYMBOL</div>
          <div className="col-code">CODE</div>
          <div className="col-crypto">IS CRYPTOCURRENCY</div>
          <div className="col-rate">EXCHANGE RATE</div>
          <div className="col-action">ACTION</div>
        </div>

        {currencies.map((currency) => (
          <div key={currency.id} className="table-row">
            <div className="col-title">{currency.title}</div>
            <div className="col-symbol">{currency.symbol}</div>
            <div className="col-code">{currency.code}</div>
            <div className="col-crypto">
              <span className={currency.isCryptocurrency ? 'yes' : 'no'}>
                {currency.isCryptocurrency ? 'Yes' : 'No'}
              </span>
            </div>
            <div className="col-rate">{currency.exchangeRate}</div>
            <div className="col-action">
              <button 
                className="action-btn edit-btn" 
                onClick={() => handleEdit(currency)}
              >
                <Edit size={16} color="#28a745" /> {/* Green for edit */}
              </button>
              <button 
                className="action-btn delete-btn" 
                onClick={() => handleDelete(currency.id)}
              >
                <Trash2 size={16} color="#f0ad4e" /> {/* Orange for delete */}
              </button>
            </div>
          </div>
        ))}

        <div className="table-footer">
          Showing {currencies.length} out of {currencies.length} entries
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>CURRENCIES</h3>
              <button className="close-btn" onClick={() => setShowModal(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="modal-body">
              <div className="form-row">
                <div className="form-group">
                  <label>NAME <span className="required">*</span></label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>SYMBOL <span className="required">*</span></label>
                  <input
                    type="text"
                    value={formData.symbol}
                    onChange={(e) => setFormData({...formData, symbol: e.target.value})}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>CODE <span className="required">*</span></label>
                  <input
                    type="text"
                    value={formData.code}
                    onChange={(e) => setFormData({...formData, code: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>IS CRYPTOCURRENCY <span className="required">*</span></label>
                  <div className="radio-group">
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="isCryptocurrency"
                        checked={formData.isCryptocurrency === true}
                        onChange={() => setFormData({...formData, isCryptocurrency: true})}
                      />
                      <span>Yes</span>
                    </label>
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="isCryptocurrency"
                        checked={formData.isCryptocurrency === false}
                        onChange={() => setFormData({...formData, isCryptocurrency: false})}
                      />
                      <span>No</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label>EXCHANGE RATE</label>
                <input
                  type="number"
                  value={formData.exchangeRate}
                  onChange={(e) => setFormData({...formData, exchangeRate: e.target.value})}
                />
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-primary" onClick={handleSave}>
                <Save size={16} />
                SAVE
              </button>
              <button className="btn-secondary" onClick={handleClear}>
                <RotateCcw size={16} />
                CLEAR
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="delete-modal">
            <div className="delete-icon">⚠️</div>
            <h3>Are you sure ?</h3>
            <p>You will not be able to recover the deleted record!</p>
            <div className="delete-actions">
              <button className="btn-danger" onClick={confirmDelete}>
                Yes, Delete it !
              </button>
              <button className="btn-cancel" onClick={() => setShowDeleteModal(false)}>
                No, Cancel !
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .currency-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
          font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; /* Updated font stack */
        }

        .currency-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .currency-header h2 {
          margin: 0;
          font-size: 20px; /* Increased from 18px */
          font-weight: 600;
          color: #333;
          font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; /* Consistent font */
        }

        .header-buttons {
          display: flex;
          gap: 10px;
        }

        .btn-primary {
          background: #6366f1;
          color: white;
          border: none;
          padding: 8px 12px;
          border-radius: 6px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 15px; /* Increased from 14px */
          font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; /* Consistent font */
        }

        .btn-primary:hover {
          background: #5855e7;
        }

        .btn-secondary {
          background: #f3f4f6;
          color: #6b7280;
          border: 1px solid #d1d5db;
          padding: 8px 12px;
          border-radius: 6px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 15px; /* Increased from 14px */
          font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; /* Consistent font */
        }

        .btn-secondary:hover {
          background: #e5e7eb;
        }

        .currency-table {
          background: white;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .table-header {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1.5fr 1fr 1fr;
          gap: 20px;
          padding: 16px 20px;
          background: #f9fafb;
          border-bottom: 1px solid #e5e7eb;
          font-weight: 600;
          font-size: 13px; /* Increased from 12px */
          color: #374151;
          text-transform: uppercase;
          font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; /* Consistent font */
        }

        .table-row {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1.5fr 1fr 1fr;
          gap: 20px;
          padding: 16px 20px;
          border-bottom: 1px solid #f3f4f6;
          align-items: center;
        }

        .table-row:hover {
          background: #f9fafb;
        }

        .yes {
          color: #10b981;
          font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; /* Consistent font */
        }

        .no {
          color: #ef4444;
          font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; /* Consistent font */
        }

        .col-action {
          display: flex;
          gap: 8px;
        }

        .action-btn {
          width: 32px;
          height: 32px;
          border: none;
          border-radius: 50%; /* Circular shape */
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
          opacity: 0.9;
        }

        .edit-btn {
          background: #dcfce7;
        }

        .edit-btn:hover {
          background: #bbf7d0;
          transform: scale(1.05);
        }

        .delete-btn {
          background: #fef2f2;
        }

        .delete-btn:hover {
          background: #fee2e2;
          transform: scale(1.05);
        }

        .table-footer {
          padding: 16px 20px;
          font-size: 15px; /* Increased from 14px */
          color: #6b7280;
          background: #f9fafb;
          font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; /* Consistent font */
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .modal {
          background: white;
          border-radius: 8px;
          width: 600px;
          max-width: 90vw;
          max-height: 90vh;
          overflow: auto;
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px;
          border-bottom: 1px solid #e5e7eb;
        }

        .modal-header h3 {
          margin: 0;
          font-size: 20px; /* Increased from 18px */
          font-weight: 600;
          font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; /* Consistent font */
        }

        .close-btn {
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
          color: #6b7280;
          font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; /* Consistent font */
        }

        .close-btn:hover {
          color: #374151;
        }

        .modal-body {
          padding: 20px;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 20px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        .form-group label {
          font-size: 13px; /* Increased from 12px */
          font-weight: 600;
          color: #374151;
          margin-bottom: 8px;
          text-transform: uppercase;
          font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; /* Consistent font */
        }

        .required {
          color: #ef4444;
          font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; /* Consistent font */
        }

        .form-group input {
          padding: 12px;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          font-size: 15px; /* Increased from 14px */
          font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; /* Consistent font */
        }

        .form-group input:focus {
          outline: none;
          border-color: #6366f1;
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
        }

        .radio-group {
          display: flex;
          gap: 20px;
          margin-top: 8px;
        }

        .radio-label {
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          font-size: 15px; /* Increased from 14px */
          text-transform: none;
          font-weight: normal;
          margin-bottom: 0;
          font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; /* Consistent font */
        }

        .radio-label input[type="radio"] {
          margin: 0;
        }

        .modal-footer {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          padding: 20px;
          border-top: 1px solid #e5e7eb;
        }

        .delete-modal {
          background: white;
          border-radius: 8px;
          padding: 40px;
          text-align: center;
          width: 400px;
          max-width: 90vw;
        }

        .delete-icon {
          font-size: 48px;
          margin-bottom: 20px;
        }

        .delete-modal h3 {
          margin: 0 0 10px 0;
          font-size: 20px; /* Increased from 20px */
          color: #374151;
          font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; /* Consistent font */
        }

        .delete-modal p {
          margin: 0 0 30px 0;
          color: #6b7280;
          font-size: 15px; /* Increased from default */
          font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; /* Consistent font */
        }

        .delete-actions {
          display: flex;
          gap: 12px;
          justify-content: center;
        }

        .btn-danger {
          background: #6366f1;
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 15px; /* Increased from 14px */
          font-weight: 500;
          font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; /* Consistent font */
        }

        .btn-danger:hover {
          background: #5855e7;
        }

        .btn-cancel {
          background: #6b7280;
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 15px; /* Increased from 14px */
          font-weight: 500;
          font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; /* Consistent font */
        }

        .btn-cancel:hover {
          background: #4b5563;
        }
      `}</style>
    </div>
  );
};

export default CurrencyComponent;