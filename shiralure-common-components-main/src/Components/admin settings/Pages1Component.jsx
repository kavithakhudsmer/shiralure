import React, { useState } from 'react';
import { X, AlertCircle, Eye, Edit, Trash2, Plus } from 'lucide-react';
import './Pages1Component.css';

const Pages1Component = () => {
  const [reasons, setReasons] = useState([
    {
      id: 1,
      title: 'Benefits',
      details: 'Advantages,perks or positive outcomes gained from a product',
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
  <div className="container13" style={{ minHeight: 'calc(100vh - 70px)', padding: '24px' }}>
    <div className="main-card13">
      <div className="header13">
        <h1>Pages</h1>
        <button onClick={handleAdd} className="add-btn13">
          <div className="add-icon13">
            <Plus size={20} />
          </div>
          Add
        </button>
      </div>

      <div className="table-container13">
        <table className="table13">
          <thead>
            <tr>
              <th>Title</th>
              <th>Descriptions</th>
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
                  <span className={`status-badge13 ${reason.status === 'Active' ? 'status-active13' : 'status-inactive13'}`}>
                    {reason.status}
                  </span>
                </td>
                <td>
                  <div className="action-buttons13">
                    <button onClick={() => handleView(reason)} className="action-btn13 view-btn13">
                      <Eye size={16} />
                    </button>
                    <button onClick={() => handleEdit(reason)} className="action-btn13 edit-btn13">
                      <Edit size={16} />
                    </button>
                    <button onClick={() => handleDeleteClick(reason.id)} className="action-btn13 delete-btn13">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="footer13">
        Showing 1 to {reasons.length} of {reasons.length} entries
      </div>
    </div>

    {showAddEdit && (
      <div className="modal-overlay13">
        <div className="page-modal13" role="dialog" aria-labelledby="page-modal-title13">
          <div className="page-modal-header13">
            <h2 id="page-modal-title13">Edit Attribute</h2>
            <button onClick={handleCancel} className="page-modal-close-btn13" aria-label="Close">
              <X size={20} />
            </button>
          </div>

          <div className="page-modal-content13">
            <div className="page-form-group13">
              <label htmlFor="page-title-input13" className="page-form-label13">Title</label>
              <input
                id="page-title-input13"
                type="text"
                value={currentReason.title}
                onChange={(e) => setCurrentReason({ ...currentReason, title: e.target.value })}
                className="page-form-input13"
                placeholder="Defective Product"
              />
            </div>

            <div className="page-form-group13">
              <label className="page-form-label13">Status</label>
              <div className="page-radio-group13" role="radiogroup">
                <label className="page-radio-item13">
                  <input
                    type="radio"
                    name="status"
                    value="Active"
                    checked={currentReason.status === 'Active'}
                    onChange={(e) => setCurrentReason({ ...currentReason, status: e.target.value })}
                    className="page-radio-input13"
                    id="page-status-active13"
                  />
                  Active
                </label>
                <label className="page-radio-item13">
                  <input
                    type="radio"
                    name="status"
                    value="Inactive"
                    checked={currentReason.status === 'Inactive'}
                    onChange={(e) => setCurrentReason({ ...currentReason, status: e.target.value })}
                    className="page-radio-input13"
                    id="page-status-inactive13"
                  />
                  Inactive
                </label>
              </div>
            </div>

            <div className="page-form-group13">
              <label htmlFor="page-details-input13" className="page-form-label13">Details</label>
              <textarea
                id="page-details-input13"
                value={currentReason.details}
                onChange={(e) => setCurrentReason({ ...currentReason, details: e.target.value })}
                className="page-form-textarea13"
                placeholder="Product arrived damaged or not functioning"
              />
            </div>
          </div>

          <div className="page-modal-footer13">
            <button onClick={handleSave} className="page-btn13 page-btn-primary13" aria-label="Save changes">
              ✓ Save
            </button>
            <button onClick={handleCancel} className="page-btn13 page-btn-secondary13" aria-label="Cancel">
              ⊗ Cancel
            </button>
          </div>
        </div>
      </div>
    )}

    {showView && (
      <div className="modal-overlay13">
        <div className="modal13">
          <div className="modal-header13">
            <h2>View Attribute</h2>
            <button onClick={handleCancel} className="close-btn13" aria-label="Close">
              <X size={20} />
            </button>
          </div>

          <div className="modal-content13">
            <div className="view-field13">
              <div className="view-label13">Title :</div>
              <div className="view-value13">{currentReason.title}</div>
            </div>

            <div className="view-field13">
              <div className="view-label13">Status :</div>
              <div className={`view-value13 view-status13 ${currentReason.status.toLowerCase()}13`}>
                {currentReason.status}
              </div>
            </div>

            <div className="view-field13">
              <div className="view-label13">Details :</div>
              <div className="view-value13">{currentReason.details}</div>
            </div>
          </div>
        </div>
      </div>
    )}

    {showDelete && (
      <div className="modal-overlay13">
        <div className="modal13 delete-modal13">
          <div className="delete-content13">
            <div className="warning-icon13">
              <AlertCircle size={32} />
            </div>

            <h3 className="delete-title13">Are you sure ?</h3>

            <p className="delete-message13">
              You will not be able to recover the deleted record!
            </p>

            <div className="delete-buttons13">
              <button onClick={handleDelete} className="btn13 btn-primary13" aria-label="Confirm delete">
                Yes, Delete it !
              </button>
              <button onClick={handleCancel} className="btn13 btn-secondary13" aria-label="Cancel delete">
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

export default Pages1Component;