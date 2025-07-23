import React, { useState } from 'react';
import { Edit, Trash2, Plus, X, RotateCcw } from 'lucide-react';
import { FaCheck } from "react-icons/fa";

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
    <div className="currency-container3">
      <div className="currency-header3">
        <h2>Currencies</h2>
        <div className="header-buttons3">
          <button className="btn-primary3" onClick={handleAdd}>
            <Plus size={16} />Add
          </button>
        </div>
      </div>

      <div className="currency-table3">
        <div className="table-header3">
          <div className="col-title3">TITLE</div>
          <div className="col-symbol3">SYMBOL</div>
          <div className="col-code3">CODE</div>
          <div className="col-crypto3">IS CRYPTOCURRENCY</div>
          <div className="col-rate3">EXCHANGE RATE</div>
          <div className="col-action3">ACTION</div>
        </div>

        {currencies.map((currency) => (
          <div key={currency.id} className="table-row3">
            <div className="col-title3">{currency.title}</div>
            <div className="col-symbol3">{currency.symbol}</div>
            <div className="col-code3">{currency.code}</div>
            <div className="col-crypto3">
              <span className={currency.isCryptocurrency ? 'yes3' : 'no3'}>
                {currency.isCryptocurrency ? 'Yes' : 'No'}
              </span>
            </div>
            <div className="col-rate3">{currency.exchangeRate}</div>
            <div className="col-action3">
              <button 
                className="action-btn3 edit-btn3" 
                onClick={() => handleEdit(currency)}
              >
                <Edit size={16} color="#28a745" />
              </button>
              <button 
                className="action-btn3 delete-btn3" 
                onClick={() => handleDelete(currency.id)}
              >
                <Trash2 size={16} color="#f0ad4e" />
              </button>
            </div>
          </div>
        ))}

        <div className="table-footer3">
          Showing {currencies.length} out of {currencies.length} entries
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay3">
          <div className="modal3">
            <div className="modal-header3">
              <h3>CURRENCIES</h3>
              <button className="close-btn3" onClick={() => setShowModal(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="modal-body3">
              <div className="form-row3">
                <div className="form-group3">
                  <label>NAME <span className="required3">*</span></label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                  />
                </div>
                <div className="form-group3">
                  <label>SYMBOL <span className="required3">*</span></label>
                  <input
                    type="text"
                    value={formData.symbol}
                    onChange={(e) => setFormData({...formData, symbol: e.target.value})}
                  />
                </div>
              </div>

              <div className="form-row3">
                <div className="form-group3">
                  <label>CODE <span className="required3">*</span></label>
                  <input
                    type="text"
                    value={formData.code}
                    onChange={(e) => setFormData({...formData, code: e.target.value})}
                  />
                </div>
                <div className="form-group3">
                  <label>IS CRYPTOCURRENCY <span className="required3">*</span></label>
                  <div className="radio-group3">
                    <label className="radio-label3">
                      <input
                        type="radio"
                        name="isCryptocurrency"
                        checked={formData.isCryptocurrency === true}
                        onChange={() => setFormData({...formData, isCryptocurrency: true})}
                      />
                      <span>Yes</span>
                    </label>
                    <label className="radio-label3">
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

              <div className="form-group3">
                <label>EXCHANGE RATE</label>
                <input
                  type="number"
                  value={formData.exchangeRate}
                  onChange={(e) => setFormData({...formData, exchangeRate: e.target.value})}
                />
              </div>
            </div>

            <div className="modal-footer3">
              <button className="btn-primary3" onClick={handleSave}>
                <FaCheck size={16} />
                SAVE
              </button>
              <button className="btn-secondary3" onClick={handleClear}>
                <RotateCcw size={16} />
                CLEAR
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="modal-overlay3">
          <div className="delete-modal3">
            <div className="delete-icon3">⚠️</div>
            <h3>Are you sure ?</h3>
            <p>You will not be able to recover the deleted record!</p>
            <div className="delete-actions3">
              <button className="btn-danger3" onClick={confirmDelete}>
                Yes, Delete it !
              </button>
              <button className="btn-cancel3" onClick={() => setShowDeleteModal(false)}>
                No, Cancel !
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .currency-container3 {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
          font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .currency-header3 {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .currency-header3 h2 {
          margin: 0;
          font-size: 20px;
          font-weight: 600;
          color: #333;
          font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .header-buttons3 {
          display: flex;
          gap: 10px;
        }

        .btn-primary3 {
          background: #5A66F1;
          color: white;
          border: none;
          padding: 8px 12px;
          border-radius: 6px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 15px;
          font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        

        .btn-secondary3 {
          background: #f3f4f6;
          color: #6b7280;
          border: 1px solid #d1d5db;
          padding: 8px 12px;
          border-radius: 6px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 15px;
          font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        

        .currency-table3 {
          background: white;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .table-header3 {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1.5fr 1fr 1fr;
          gap: 20px;
          padding: 16px 20px;
          background: #f9fafb;
          border-bottom: 1px solid #e5e7eb;
          font-weight: 600;
          font-size: 13px;
          color: #374151;
          text-transform: uppercase;
          font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .table-row3 {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1.5fr 1fr 1fr;
          gap: 20px;
          padding: 16px 20px;
          border-bottom: 1px solid #f3f4f6;
          align-items: center;
        }

        .table-row3:hover {
          background: #f9fafb;
        }

        .yes3 {
          color: #10b981;
          font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .no3 {
          color: #ef4444;
          font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .col-action3 {
          display: flex;
          gap: 8px;
        }

        .action-btn3 {
          width: 32px;
          height: 32px;
          border: none;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
          opacity: 0.9;
        }

        .edit-btn3 {
          background: #dcfce7;
        }

        .edit-btn3:hover {
          background: #bbf7d0;
          transform: scale(1.05);
        }

        .delete-btn3 {
          background: #fef2f2;
        }

        .delete-btn3:hover {
          background: #fee2e2;
          transform: scale(1.05);
        }

        .table-footer3 {
          padding: 16px 20px;
          font-size: 15px;
          color: #6b7280;
          background: #f9fafb;
          font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .modal-overlay3 {
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

        .modal3 {
          background: white;
          border-radius: 8px;
          width: 600px;
          max-width: 90vw;
          max-height: 90vh;
          overflow: auto;
        }

        .modal-header3 {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px;
          border-bottom: 1px solid #e5e7eb;
        }

        .modal-header3 h3 {
          margin: 0;
          font-size: 20px;
          font-weight: 600;
          font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .close-btn3 {
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
          color: #6b7280;
          font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }


        .modal-body3 {
          padding: 20px;
        }

        .form-row3 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 20px;
        }

        .form-group3 {
          display: flex;
          flex-direction: column;
        }

        .form-group3 label {
          font-size: 13px;
          font-weight: 600;
          color: #374151;
          margin-bottom: 8px;
          text-transform: uppercase;
          font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .required3 {
          color: #ef4444;
          font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .form-group3 input {
          padding: 12px;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          font-size: 15px;
          font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .form-group3 input:focus {
          outline: none;
          border-color: #5A66F1;
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
        }

        .radio-group3 {
          display: flex;
          gap: 20px;
          margin-top: 8px;
        }

        .radio-label3 {
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          font-size: 15px;
          text-transform: none;
          font-weight: normal;
          margin-bottom: 0;
          font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .radio-label3 input[type="radio"] {
          margin: 0;
        }

        .modal-footer3 {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          padding: 20px;
          border-top: 1px solid #e5e7eb;
        }

        .delete-modal3 {
          background: white;
          border-radius: 8px;
          padding: 40px;
          text-align: center;
          width: 400px;
          max-width: 90vw;
        }

        .delete-icon3 {
          font-size: 48px;
          margin-bottom: 20px;
        }

        .delete-modal3 h3 {
          margin: 0 0 10px 0;
          font-size: 20px;
          color: #374151;
          font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .delete-modal3 p {
          margin: 0 0 30px 0;
          color: #6b7280;
          font-size: 15px;
          font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .delete-actions3 {
          display: flex;
          gap: 12px;
          justify-content: center;
        }

        .btn-danger3 {
          background: #5A66F1;
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 15px;
          font-weight: 500;
          font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        

        .btn-cancel3 {
          background: #6b7280;
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 15px;
          font-weight: 500;
          font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

       
      `}</style>
    </div>
  );
};

export default CurrencyComponent;