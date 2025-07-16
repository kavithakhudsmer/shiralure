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
    <div className="container19" style={{ minHeight: 'calc(100vh - 70px)', padding: '24px' }}>
      <div className="main-card19">
        <div className="header19">
          <h1>Return Reason</h1>
          <button onClick={handleAdd} className="add-btn19">
            <div className="add-icon19">
              <Plus size={20} />
            </div>
            Add
          </button>
        </div>

        <div className="table-container19">
          <table className="table19">
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
                    <span className={`status-badge19 ${reason.status === 'Active' ? 'status-active19' : 'status-inactive19'}`}>
                      {reason.status}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons19">
                      <button onClick={() => handleView(reason)} className="action-btn19 view-btn19" aria-label="View">
                        <Eye size={16} />
                      </button>
                      <button onClick={() => handleEdit(reason)} className="action-btn19 edit-btn19" aria-label="Edit">
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(reason.id)}
                        className="action-btn19 delete-btn19"
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

        <div className="footer19">
          Showing 1 to {reasons.length} of {reasons.length} entries
        </div>
      </div>

      {showAddEdit && (
        <div className="modal-overlay19">
          <div className="return-reason-modal19" role="dialog" aria-labelledby="return-reason-title">
            <div className="return-reason-modal-header19">
              <h2 id="return-reason-title">{currentReason.id ? 'Edit Return Reason' : 'Add Return Reason'}</h2>
              <button onClick={handleCancel} className="return-reason-close-btn19" aria-label="Close">
                <X size={20} />
              </button>
            </div>

            <div className="return-reason-modal-content19">
              <div className="return-reason-form-group19">
                <label htmlFor="return-reason-title-input" className="return-reason-form-label19">
                  Title <span className="return-reason-required19">*</span>
                </label>
                <input
                  id="return-reason-title-input"
                  type="text"
                  value={currentReason.title19}
                  onChange={(e) => setCurrentReason({ ...currentReason, titel: e.target.value })}
                  className="return-reason-form-input19"
                  placeholder="Defective Product"
                  required
                  aria-required="true"
                />
              </div>

              <div className="return-reason-form-group19">
                <label className="return-reason-form-label19">
                  Status <span className="return-reason-required19">*</span>
                </label>
                <div className="return-reason-radio-group19" role="radiogroup">
                  <label className="return-reason-radio-item19">
                    <input
                      type="radio"
                      name="status"
                      value="Active"
                      checked={currentReason.status === 'Active'}
                      onChange={(e) => setCurrentReason({ ...currentReason, status: e.target.value })}
                      className="return-reason-radio-input19"
                      id="return-reason-status-active"
                      required
                      aria-required="true"
                    />
                    <span>Active</span>
                  </label>
                  <label className="return-reason-radio-item19">
                    <input
                      type="radio"
                      name="status"
                      value="Inactive"
                      checked={currentReason.status === 'Inactive'}
                      onChange={(e) => setCurrentReason({ ...currentReason, status: e.target.value })}
                      className="return-reason-radio-input19"
                      id="return-reason-status-inactive"
                      required
                      aria-required="true"
                    />
                    <span>Inactive</span>
                  </label>
                </div>
              </div>

              <div className="return-reason-form-group19">
                <label htmlFor="return-reason-details-input" className="return-reason-form-label19">
                  Details <span className="return-reason-required19">*</span>
                </label>
                <textarea
                  id="return-reason-details-input"
                  value={currentReason.details}
                  onChange={(e) => setCurrentReason({ ...currentReason, details: e.target.value })}
                  className="return-reason-form-textarea19"
                  placeholder="Product arrived damaged or not functioning"
                  required
                  aria-required="true"
                />
              </div>
            </div>

            <div className="return-reason-modal-footer19">
              <button onClick={handleSave} className="return-reason-btn19 return-reason-btn-primary19" aria-label="Save changes">
                ✓ Save
              </button>
              <button onClick={handleCancel} className="return-reason-btn19 return-reason-btn-secondary19" aria-label="Cancel">
                ⊗ Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showView && (
        <div className="modal-overlay19">
          <div className="modal19" role="dialog" aria-labelledby="view-title">
            <div className="modal-header19">
               <button onClick={handleCancel} className="close-btn19" aria-label="Close">
                <X size={20} />
              </button>
              <h2 id="view-title">View Attribute</h2>
              {/* <button onClick={handleCancel} className="close-btn19" aria-label="Close">
                <X size={20} />
              </button> */}
            </div>

            <div className="modal-content19">
              <div className="view-field19">
                <div className="view-label19">Title :</div>
                <div className="view-value19">{currentReason.title}</div>
              </div>

              <div className="view-field19">
                <div className="view-label19">Status :</div>
                <div className={`view-value19 view-status19 ${currentReason.status.toLowerCase()}19`}>
                  {currentReason.status}
                </div>
              </div>

              <div className="view-field19">
                <div className="view-label19">Details :</div>
                <div className="view-value19">{currentReason.details}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showDelete && (
        <div className="modal-overlay19">
          <div className="modal19 delete-modal19" role="dialog" aria-labelledby="delete-title">
            <div className="delete-content19">
              <div className="warning-icon19">
                <AlertCircle size={32} />
              </div>

              <h3 id="delete-title" className="delete-title19">Are you sure ?</h3>

              <p className="delete-message19">
                You will not be able to recover the deleted record!
              </p>

              <div className="delete-buttons19">
                <button onClick={handleDelete} className="btn19 btn-primary19" aria-label="Confirm delete">
                  Yes, Delete it !
                </button>
                <button onClick={handleCancel} className="btn19 btn-secondary19" aria-label="Cancel delete">
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