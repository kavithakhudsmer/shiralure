import React, { useState } from 'react';
import { Edit, Trash2, Plus, X, AlertCircle, Eye } from 'lucide-react';
import './Benefits.css';

const Benefits = () => {
  const [benefits, setBenefits] = useState([
    {
      id: 1,
      title: 'SAVINGS',
      description: 'SAVINGS FROM...',
      status: 'Active',
      image: null
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false); // New state for view modal
  const [deleteId, setDeleteId] = useState(null);
  const [editingBenefit, setEditingBenefit] = useState(null);
  const [viewingBenefit, setViewingBenefit] = useState(null); // New state for viewed benefit
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(15);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'Active',
    image: null
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData(prev => ({
      ...prev,
      image: file
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingBenefit) {
      setBenefits(prev => prev.map(benefit => 
        benefit.id === editingBenefit.id 
          ? { ...benefit, ...formData }
          : benefit
      ));
    } else {
      const newBenefit = {
        id: Date.now(),
        ...formData
      };
      setBenefits(prev => [...prev, newBenefit]);
    }
    
    handleCloseModal();
  };

  const handleView = (benefit) => {
    setViewingBenefit(benefit);
    setShowViewModal(true);
  };

  const handleEdit = (benefit) => {
    setEditingBenefit(benefit);
    setFormData({
      title: benefit.title,
      description: benefit.description,
      status: benefit.status,
      image: benefit.image
    });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setBenefits(prev => prev.filter(benefit => benefit.id !== deleteId));
    setShowDeleteModal(false);
    setDeleteId(null);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingBenefit(null);
    setFormData({
      title: '',
      description: '',
      status: 'Active',
      image: null
    });
  };

  const handleCloseViewModal = () => {
    setShowViewModal(false);
    setViewingBenefit(null);
  };

  const handleAddNew = () => {
    setEditingBenefit(null);
    setFormData({
      title: '',
      description: '',
      status: 'Active',
      image: null
    });
    setShowModal(true);
  };

  const totalEntries = benefits.length;
  const startEntry = (currentPage - 1) * entriesPerPage + 1;
  const endEntry = Math.min(currentPage * entriesPerPage, totalEntries);

  return (
    <div className="benefits-main-container">
      <div className="benefits-card-wrapper">
        
        <div className="benefits-header-section">
          <h1 className="benefits-main-title">BENEFITS</h1>
          <div className="benefits-header-controls">
            <div className="benefits-dropdown-wrapper">
              <select 
                value={6}
                onChange={(e) => console.log('Entries changed:', e.target.value)}
                className="benefits-entries-dropdown"
              >
                <option value={6}>6</option>
                <option value={10}>10</option>
                <option value={25}>25</option>
              </select>
            </div>
            <div className="benefits-pagination-dropdown">
              <select 
                value="15"
                onChange={(e) => console.log('Pagination changed:', e.target.value)}
                className="benefits-pagination-select"
              >
                <option value="15">15</option>
                <option value="30">30</option>
                <option value="50">50</option>
              </select>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="benefits-table-container">
          <table className="benefits-data-table">
            <thead className="benefits-table-header">
              <tr>
                <th className="benefits-th-title">TITLE</th>
                <th className="benefits-th-description">DESCRIPTION</th>
                <th className="benefits-th-status">STATUS</th>
                <th className="benefits-th-action">ACTION</th>
              </tr>
            </thead>
            <tbody className="benefits-table-body">
              {benefits.map((benefit) => (
                <tr key={benefit.id} className="benefits-table-row">
                  <td className="benefits-td-title">{benefit.title}</td>
                  <td className="benefits-td-description">{benefit.description}</td>
                  <td className="benefits-td-status">
                    <span className={`benefits-status-badge ${benefit.status.toLowerCase()}`}>
                      {benefit.status}
                    </span>
                  </td>
                  <td className="benefits-td-action">
                    <div className="benefits-action-buttons">
                      <button 
                        className="benefits-action-view"
                        onClick={() => handleView(benefit)}
                        title="View Benefit"
                      >
                        <Eye size={14} />
                      </button>
                      <button 
                        className="benefits-action-edit"
                        onClick={() => handleEdit(benefit)}
                        title="Edit Benefit"
                      >
                        <Edit size={14} />
                      </button>
                      <button 
                        className="benefits-action-delete"
                        onClick={() => handleDelete(benefit.id)}
                        title="Delete Benefit"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="benefits-table-footer">
          <div className="benefits-entries-info">
            Showing {startEntry} to {endEntry} out of {totalEntries} entries
          </div>
          <button 
            className="benefits-add-new-btn"
            onClick={handleAddNew}
            title="Add New Benefit"
          >
            <Plus size={16} />
            Add New
          </button>
        </div>
      </div>

      {/* Edit/Add Modal */}
      {showModal && (
        <div className="benefits-modal-overlay">
          <div className="benefits-modal-container">
            <div className="benefits-modal-header">
              <h2 className="benefits-modal-title">BENEFITS</h2>
              <button 
                className="benefits-modal-close"
                onClick={handleCloseModal}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="benefits-form">
              <div className="benefits-form-group">
                <label className="benefits-form-label">
                  TITLE <span className="benefits-required">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="benefits-form-input"
                  required
                />
              </div>

              <div className="benefits-form-group">
                <label className="benefits-form-label">
                  STATUS <span className="benefits-required">*</span>
                </label>
                <div className="benefits-radio-group">
                  <label className="benefits-radio-label">
                    <input
                      type="radio"
                      name="status"
                      value="Active"
                      checked={formData.status === 'Active'}
                      onChange={handleInputChange}
                      className="benefits-radio-input"
                    />
                    <span className="benefits-radio-text">Active</span>
                  </label>
                  <label className="benefits-radio-label">
                    <input
                      type="radio"
                      name="status"
                      value="Inactive"
                      checked={formData.status === 'Inactive'}
                      onChange={handleInputChange}
                      className="benefits-radio-input"
                    />
                    <span className="benefits-radio-text">Inactive</span>
                  </label>
                </div>
              </div>

              <div className="benefits-form-group">
                <label className="benefits-form-label">IMAGE</label>
                <div className="benefits-file-upload">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="benefits-file-input"
                    id="benefits-file-upload"
                    accept="image/*"
                  />
                  <label htmlFor="benefits-file-upload" className="benefits-file-label">
                    Choose File
                  </label>
                  <span className="benefits-file-status">
                    {formData.image ? formData.image.name : 'No File Chosen'}
                  </span>
                </div>
              </div>

              <div className="benefits-form-group">
                <label className="benefits-form-label">DESCRIPTION</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="benefits-form-textarea"
                  rows="4"
                />
              </div>

              <div className="benefits-form-actions">
                <button type="submit" className="benefits-save-btn">
                  SAVE
                </button>
                <button 
                  type="button" 
                  className="benefits-clear-btn"
                  onClick={handleCloseModal}
                >
                  CLEAR
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Modal */}
      {showViewModal && viewingBenefit && (
        <div className="benefits-modal-overlay">
          <div className="benefits-modal-container">
            <div className="benefits-modal-header">
              <h2 className="benefits-modal-title">View Benefit</h2>
              <button 
                className="benefits-modal-close"
                onClick={handleCloseViewModal}
              >
                <X size={20} />
              </button>
            </div>

            <div className="benefits-view-content">
              <div className="benefits-form-group">
                <label className="benefits-form-label">TITLE</label>
                <input
                  type="text"
                  value={viewingBenefit.title}
                  readOnly
                  className="benefits-form-input"
                />
              </div>

              <div className="benefits-form-group">
                <label className="benefits-form-label">STATUS</label>
                <input
                  type="text"
                  value={viewingBenefit.status}
                  readOnly
                  className="benefits-form-input"
                />
              </div>

              <div className="benefits-form-group">
                <label className="benefits-form-label">IMAGE</label>
                {viewingBenefit.image ? (
                  <div className="benefits-file-status">
                    {viewingBenefit.image.name || 'Image Uploaded'}
                  </div>
                ) : (
                  <span className="benefits-file-status">No Image</span>
                )}
              </div>

              <div className="benefits-form-group">
                <label className="benefits-form-label">DESCRIPTION</label>
                <textarea
                  value={viewingBenefit.description}
                  readOnly
                  className="benefits-form-textarea"
                  rows="4"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="benefits-modal-overlay">
          <div className="benefits-delete-modal">
            <div className="benefits-delete-icon">
              <AlertCircle size={48} />
            </div>
            <h3 className="benefits-delete-title">Are you sure ?</h3>
            <p className="benefits-delete-message">
              You will not be able to recover the deleted record!
            </p>
            <div className="benefits-delete-actions">
              <button 
                className="benefits-confirm-delete-btn"
                onClick={confirmDelete}
              >
                Yes, Delete it !
              </button>
              <button 
                className="benefits-cancel-delete-btn"
                onClick={() => setShowDeleteModal(false)}
              >
                No, Cancel !
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Benefits;