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
    <div className="taxes26">
      <div className="taxes26__container">
        <div className="taxes26__header">
          <h1 className="taxes26__title">Taxes</h1>
          <button onClick={handleAdd} className="taxes26__add-btn">
            <Plus size={20} />
          </button>
        </div>

        <div className="taxes26__table-container">
          <table className="taxes26__table">
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
                    <span className={`taxes26__status ${tax.status === 'Active' ? 'taxes26__status--active' : 'taxes26__status--inactive'}`}>
                      {tax.status}
                    </span>
                  </td>
                  <td>
                    <div className="taxes26__actions">
                      <button onClick={() => handleEdit(tax)} className="taxes26__action-btn taxes26__action-btn--edit">
                        <Edit size={16} />
                      </button>
                      <button onClick={() => handleDeleteClick(tax.id)} className="taxes26__action-btn taxes26__action-btn--delete">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="taxes26__footer">
          Showing 1 to {taxes.length} of {taxes.length} entries
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="taxes26__modal-overlay">
          <div className="taxes26__modal">
            <div className="taxes26__modal-header">
              <h2>Taxes</h2>
              <button onClick={handleClose} className="taxes26__close-btn">
                <X size={20} />
              </button>
            </div>

            <div className="taxes26__modal-content">
              <div className="taxes26__form-row">
                <div className="taxes26__form-group">
                  <label className="taxes26__label">
                    NAME <span className="taxes26__required">*</span>
                  </label>
                  <input
                    type="text"
                    value={currentTax.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="taxes26__input"
                  />
                </div>

                <div className="taxes26__form-group">
                  <label className="taxes26__label">
                    STATUS <span className="taxes26__required">*</span>
                  </label>
                  <div className="taxes26__radio-group">
                    <label className="taxes26__radio-item">
                      <input
                        type="radio"
                        name="status"
                        value="Active"
                        checked={currentTax.status === 'Active'}
                        onChange={(e) => handleInputChange('status', e.target.value)}
                      />
                      <span className="taxes26__radio-custom"></span>
                      Active
                    </label>
                    <label className="taxes26__radio-item">
                      <input
                        type="radio"
                        name="status"
                        value="Inactive"
                        checked={currentTax.status === 'Inactive'}
                        onChange={(e) => handleInputChange('status', e.target.value)}
                      />
                      <span className="taxes26__radio-custom"></span>
                      Inactive
                    </label>
                  </div>
                </div>
              </div>

              <div className="taxes26__form-row">
                <div className="taxes26__form-group">
                  <label className="taxes26__label">
                    CODE <span className="taxes26__required">*</span>
                  </label>
                  <input
                    type="text"
                    value={currentTax.code}
                    onChange={(e) => handleInputChange('code', e.target.value)}
                    className="taxes26__input"
                  />
                </div>

                <div className="taxes26__form-group">
                  <label className="taxes26__label">
                    TAX RATE <span className="taxes26__required">*</span>
                  </label>
                  <input
                    type="text"
                    value={currentTax.taxRate}
                    onChange={(e) => handleInputChange('taxRate', e.target.value)}
                    className="taxes26__input"
                  />
                </div>
              </div>
            </div>

            <div className="taxes26__modal-footer">
              <button onClick={handleSave} className="taxes26__btn taxes26__btn--save">
                <span>✓</span> Save
              </button>
              <button onClick={handleClose} className="taxes26__btn taxes26__btn--close">
                <span>✕</span> Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="taxes26__modal-overlay">
          <div className="taxes26__modal taxes26__modal--delete">
            <div className="taxes26__delete-content">
              <div className="taxes26__warning-icon">
                <AlertCircle size={48} />
              </div>
              <h3 className="taxes26__delete-title">Are you sure ?</h3>
              <p className="taxes26__delete-message">
                You will not be able to recover the deleted record!
              </p>
              <div className="taxes26__delete-actions">
                <button onClick={handleDelete} className="taxes26__btn taxes26__btn--delete-confirm">
                  Yes, Delete it !
                </button>
                <button onClick={handleClose} className="taxes26__btn taxes26__btn--cancel">
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