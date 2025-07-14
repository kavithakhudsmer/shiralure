import React, { useState } from 'react';
import { Plus, Edit, Trash2, X, AlertCircle } from 'lucide-react';
import './Taxes.css';

const Taxes = () => {
  const [taxes, setTaxes] = useState([
    {
      id: 1,
      name: 'Abcd',
      code: 'VAT-20%',
      taxRate: '20.00',
      status: 'Active'
    },
    {
      id: 2,
      name: 'Efgh',
      code: 'VAT-20%',
      taxRate: '20.00',
      status: 'Active'
    },
    {
      id: 3,
      name: 'Ibcd',
      code: 'VAT-20%',
      taxRate: '20.00',
      status: 'Active'
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentTax, setCurrentTax] = useState({
    id: null,
    name: '',
    code: '',
    taxRate: '',
    status: 'Active'
  });
  const [deleteId, setDeleteId] = useState(null);

  const handleAdd = () => {
    setCurrentTax({
      id: null,
      name: '',
      code: '',
      taxRate: '',
      status: 'Active'
    });
    setShowModal(true);
  };

  const handleEdit = (tax) => {
    setCurrentTax(tax);
    setShowModal(true);
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleSave = () => {
    if (currentTax.id) {
      setTaxes(taxes.map(tax => tax.id === currentTax.id ? currentTax : tax));
    } else {
      const newTax = {
        ...currentTax,
        id: Math.max(...taxes.map(t => t.id), 0) + 1
      };
      setTaxes([...taxes, newTax]);
    }
    setShowModal(false);
  };

  const handleDelete = () => {
    setTaxes(taxes.filter(tax => tax.id !== deleteId));
    setShowDeleteModal(false);
    setDeleteId(null);
  };

  const handleClose = () => {
    setShowModal(false);
    setShowDeleteModal(false);
    setDeleteId(null);
  };

  const handleInputChange = (field, value) => {
    setCurrentTax({
      ...currentTax,
      [field]: value
    });
  };

  return (
    <div className="taxes">
      <div className="taxes__container">
        <div className="taxes__header">
          <h1 className="taxes__title">Taxes</h1>
          <button onClick={handleAdd} className="taxes__add-btn">
            <Plus size={20} />
          </button>
        </div>

        <div className="taxes__table-container">
          <table className="taxes__table">
            <thead>
              <tr>
                <th>NAME</th>
                <th>CODE</th>
                <th>TAX RATE</th>
                <th>STATUS</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {taxes.map((tax) => (
                <tr key={tax.id}>
                  <td>{tax.name}</td>
                  <td>{tax.code}</td>
                  <td>{tax.taxRate}</td>
                  <td>
                    <span className={`taxes__status ${tax.status === 'Active' ? 'taxes__status--active' : 'taxes__status--inactive'}`}>
                      {tax.status}
                    </span>
                  </td>
                  <td>
                    <div className="taxes__actions">
                      <button onClick={() => handleEdit(tax)} className="taxes__action-btn taxes__action-btn--edit">
                        <Edit size={16} />
                      </button>
                      <button onClick={() => handleDeleteClick(tax.id)} className="taxes__action-btn taxes__action-btn--delete">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="taxes__footer">
          Showing 1 to {taxes.length} of {taxes.length} entries
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="taxes__modal-overlay">
          <div className="taxes__modal">
            <div className="taxes__modal-header">
              <h2>Taxes</h2>
              <button onClick={handleClose} className="taxes__close-btn">
                <X size={20} />
              </button>
            </div>

            <div className="taxes__modal-content">
              <div className="taxes__form-row">
                <div className="taxes__form-group">
                  <label className="taxes__label">
                    NAME <span className="taxes__required">*</span>
                  </label>
                  <input
                    type="text"
                    value={currentTax.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="taxes__input"
                  />
                </div>

                <div className="taxes__form-group">
                  <label className="taxes__label">
                    STATUS <span className="taxes__required">*</span>
                  </label>
                  <div className="taxes__radio-group">
                    <label className="taxes__radio-item">
                      <input
                        type="radio"
                        name="status"
                        value="Active"
                        checked={currentTax.status === 'Active'}
                        onChange={(e) => handleInputChange('status', e.target.value)}
                      />
                      <span className="taxes__radio-custom"></span>
                      Active
                    </label>
                    <label className="taxes__radio-item">
                      <input
                        type="radio"
                        name="status"
                        value="Inactive"
                        checked={currentTax.status === 'Inactive'}
                        onChange={(e) => handleInputChange('status', e.target.value)}
                      />
                      <span className="taxes__radio-custom"></span>
                      Inactive
                    </label>
                  </div>
                </div>
              </div>

              <div className="taxes__form-row">
                <div className="taxes__form-group">
                  <label className="taxes__label">
                    CODE <span className="taxes__required">*</span>
                  </label>
                  <input
                    type="text"
                    value={currentTax.code}
                    onChange={(e) => handleInputChange('code', e.target.value)}
                    className="taxes__input"
                  />
                </div>

                <div className="taxes__form-group">
                  <label className="taxes__label">
                    TAX RATE <span className="taxes__required">*</span>
                  </label>
                  <input
                    type="text"
                    value={currentTax.taxRate}
                    onChange={(e) => handleInputChange('taxRate', e.target.value)}
                    className="taxes__input"
                  />
                </div>
              </div>
            </div>

            <div className="taxes__modal-footer">
              <button onClick={handleSave} className="taxes__btn taxes__btn--save">
                <span>✓</span> Save
              </button>
              <button onClick={handleClose} className="taxes__btn taxes__btn--close">
                <span>✕</span> Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="taxes__modal-overlay">
          <div className="taxes__modal taxes__modal--delete">
            <div className="taxes__delete-content">
              <div className="taxes__warning-icon">
                <AlertCircle size={48} />
              </div>
              <h3 className="taxes__delete-title">Are you sure ?</h3>
              <p className="taxes__delete-message">
                You will not be able to recover the deleted record!
              </p>
              <div className="taxes__delete-actions">
                <button onClick={handleDelete} className="taxes__btn taxes__btn--delete-confirm">
                  Yes, Delete it !
                </button>
                <button onClick={handleClose} className="taxes__btn taxes__btn--cancel">
                  No, Cancel !
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Taxes;