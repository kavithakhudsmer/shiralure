import React, { useState } from 'react';
import { X, AlertCircle, Eye, Edit, Trash2, Plus } from 'lucide-react';
import './ReturnReason.css';

const ReturnReasonComponent = () => {
  const [reasons, setReasons] = useState([
    {
      id: 1,
      title: 'Defective Product',
      details: 'Product arrived damaged or not functioning',
      status: 'Active',
    },
  ]);

  const [showAddEdit, setShowAddEdit] = useState(false);
  const [showView, setShowView] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [currentReason, setCurrentReason] = useState({
    id: null,
    title: '',
    details: '',
    status: 'Active',
  });
  const [deleteId, setDeleteId] = useState(null);

  const handleAdd = () => {
    setCurrentReason({
      id: null,
      title: '',
      details: '',
      status: 'Active',
    });
    setShowAddEdit(true);
  };

  const handleEdit = (reason) => {
    setCurrentReason(reason);
    setShowAddEdit(true);
  };

  const handleView = (reason) => {
    setCurrentReason(reason);
    setShowView(true);
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowDelete(true);
  };

  const handleSave = () => {
    if (currentReason.id) {
      setReasons(reasons.map((r) => (r.id === currentReason.id ? currentReason : r)));
    } else {
      const newReason = {
        ...currentReason,
        id: Math.max(...reasons.map((r) => r.id), 0) + 1,
      };
      setReasons([...reasons, newReason]);
    }
    setShowAddEdit(false);
  };

  const handleDelete = () => {
    setReasons(reasons.filter((r) => r.id !== deleteId));
    setShowDelete(false);
    setDeleteId(null);
  };

  const handleCancel = () => {
    setShowAddEdit(false);
    setShowView(false);
    setShowDelete(false);
    setDeleteId(null);
  };

  return (
    <div className="container" style={{ minHeight: 'calc(100vh - 70px)', padding: '24px' }}>
      <div className="main-card">
        <div className="header">
          <h1>Return Reason</h1>
          <button onClick={handleAdd} className="add-btn">
            <div className="add-icon">
              <Plus size={20} />
            </div>
            Add
          </button>
        </div>

        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Details</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {reasons.map((reason) => (
                <tr key={reason.id}>
                  <td>{reason.title}</td>
                  <td>{reason.details}</td>
                  <td>
                    <span className={`status-badge ${reason.status === 'Active' ? 'status-active' : 'status-inactive'}`}>
                      {reason.status}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button onClick={() => handleView(reason)} className="action-btn view-btn" aria-label="View">
                        <Eye size={16} />
                      </button>
                      <button onClick={() => handleEdit(reason)} className="action-btn edit-btn" aria-label="Edit">
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(reason.id)}
                        className="action-btn delete-btn"
                        aria-label="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="footer">
          Showing 1 to {reasons.length} of {reasons.length} entries
        </div>
      </div>

      {showAddEdit && (
        <div className="modal-overlay">
          <div className="return-reason-modal" role="dialog" aria-labelledby="return-reason-title">
            <div className="return-reason-modal-header">
              <h2 id="return-reason-title">{currentReason.id ? 'Edit Return Reason' : 'Add Return Reason'}</h2>
              <button onClick={handleCancel} className="return-reason-close-btn" aria-label="Close">
                <X size={20} />
              </button>
            </div>

            <div className="return-reason-modal-content">
              <div className="return-reason-form-group">
                <label htmlFor="return-reason-title-input" className="return-reason-form-label">
                  Title <span className="return-reason-required">*</span>
                </label>
                <input
                  id="return-reason-title-input"
                  type="text"
                  value={currentReason.title}
                  onChange={(e) => setCurrentReason({ ...currentReason, title: e.target.value })}
                  className="return-reason-form-input"
                  placeholder="Defective Product"
                  required
                  aria-required="true"
                />
              </div>

              <div className="return-reason-form-group">
                <label className="return-reason-form-label">
                  Status <span className="return-reason-required">*</span>
                </label>
                <div className="return-reason-radio-group" role="radiogroup">
                  <label className="return-reason-radio-item">
                    <input
                      type="radio"
                      name="status"
                      value="Active"
                      checked={currentReason.status === 'Active'}
                      onChange={(e) => setCurrentReason({ ...currentReason, status: e.target.value })}
                      className="return-reason-radio-input"
                      id="return-reason-status-active"
                      required
                      aria-required="true"
                    />
                    <span>Active</span>
                  </label>
                  <label className="return-reason-radio-item">
                    <input
                      type="radio"
                      name="status"
                      value="Inactive"
                      checked={currentReason.status === 'Inactive'}
                      onChange={(e) => setCurrentReason({ ...currentReason, status: e.target.value })}
                      className="return-reason-radio-input"
                      id="return-reason-status-inactive"
                      required
                      aria-required="true"
                    />
                    <span>Inactive</span>
                  </label>
                </div>
              </div>

              <div className="return-reason-form-group">
                <label htmlFor="return-reason-details-input" className="return-reason-form-label">
                  Details <span className="return-reason-required">*</span>
                </label>
                <textarea
                  id="return-reason-details-input"
                  value={currentReason.details}
                  onChange={(e) => setCurrentReason({ ...currentReason, details: e.target.value })}
                  className="return-reason-form-textarea"
                  placeholder="Product arrived damaged or not functioning"
                  required
                  aria-required="true"
                />
              </div>
            </div>

            <div className="return-reason-modal-footer">
              <button onClick={handleSave} className="return-reason-btn return-reason-btn-primary" aria-label="Save changes">
                ✓ Save
              </button>
              <button onClick={handleCancel} className="return-reason-btn return-reason-btn-secondary" aria-label="Cancel">
                ⊗ Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showView && (
        <div className="modal-overlay">
          <div className="modal" role="dialog" aria-labelledby="view-title">
            <div className="modal-header">
              <h2 id="view-title">View Attribute</h2>
              <button onClick={handleCancel} className="close-btn" aria-label="Close">
                <X size={20} />
              </button>
            </div>

            <div className="modal-content">
              <div className="view-field">
                <div className="view-label">Title :</div>
                <div className="view-value">{currentReason.title}</div>
              </div>

              <div className="view-field">
                <div className="view-label">Status :</div>
                <div className={`view-value view-status ${currentReason.status.toLowerCase()}`}>
                  {currentReason.status}
                </div>
              </div>

              <div className="view-field">
                <div className="view-label">Details :</div>
                <div className="view-value">{currentReason.details}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showDelete && (
        <div className="modal-overlay">
          <div className="modal delete-modal" role="dialog" aria-labelledby="delete-title">
            <div className="delete-content">
              <div className="warning-icon">
                <AlertCircle size={32} />
              </div>

              <h3 id="delete-title" className="delete-title">Are you sure ?</h3>

              <p className="delete-message">
                You will not be able to recover the deleted record!
              </p>

              <div className="delete-buttons">
                <button onClick={handleDelete} className="btn btn-primary" aria-label="Confirm delete">
                  Yes, Delete it !
                </button>
                <button onClick={handleCancel} className="btn btn-secondary" aria-label="Cancel delete">
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

export default ReturnReasonComponent;