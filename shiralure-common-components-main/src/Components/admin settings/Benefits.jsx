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
  const [showViewModal, setShowViewModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [editingBenefit, setEditingBenefit] = useState(null);
  const [viewingBenefit, setViewingBenefit] = useState(null);
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
    <div className="ab-main-container">
      <div className="ab-card-wrapper">
        
        <div className="ab-header-section">
          <h1 className="ab-main-title">BENEFITS</h1>
          <div className="ab-header-controls">
            <div className="ab-dropdown-wrapper">
              <select 
                value={6}
                onChange={(e) => console.log('Entries changed:', e.target.value)}
                className="ab-entries-dropdown"
              >
                <option value={6}>6</option>
                <option value={10}>10</option>
                <option value={25}>25</option>
              </select>
            </div>
            <div className="ab-pagination-dropdown">
              <select 
                value="15"
                onChange={(e) => console.log('Pagination changed:', e.target.value)}
                className="ab-pagination-select"
              >
                <option value="15">15</option>
                <option value="30">30</option>
                <option value="50">50</option>
              </select>
            </div>
          </div>
        </div>

        <div className="ab-table-container">
          <table className="ab-data-table">
            <thead className="ab-table-header">
              <tr>
                <th className="ab-th-title">TITLE</th>
                <th className="ab-th-description">DESCRIPTION</th>
                <th className="ab-th-status">STATUS</th>
                <th className="ab-th-action">ACTION</th>
              </tr>
            </thead>
            <tbody className="ab-table-body">
              {benefits.map((benefit) => (
                <tr key={benefit.id} className="ab-table-row">
                  <td className="ab-td-title">{benefit.title}</td>
                  <td className="ab-td-description">{benefit.description}</td>
                  <td className="ab-td-status">
                    <span className={`ab-status-badge ${benefit.status.toLowerCase()}`}>
                      {benefit.status}
                    </span>
                  </td>
                  <td className="ab-td-action">
                    <div className="ab-action-buttons">
                      <button 
                        className="ab-action-view"
                        onClick={() => handleView(benefit)}
                        title="View Benefit"
                      >
                        <Eye size={14} />
                      </button>
                      <button 
                        className="ab-action-edit"
                        onClick={() => handleEdit(benefit)}
                        title="Edit Benefit"
                      >
                        <Edit size={14} />
                      </button>
                      <button 
                        className="ab-action-delete"
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

        <div className="ab-table-footer">
          <div className="ab-entries-info">
            Showing {startEntry} to {endEntry} out of {totalEntries} entries
          </div>
          <button 
            className="ab-add-new-btn"
            onClick={handleAddNew}
            title="Add New Benefit"
          >
            <Plus size={16} />
            Add New
          </button>
        </div>
      </div>

      {showModal && (
        <div className="ab-modal-overlay">
          <div className="ab-modal-container">
            <div className="ab-modal-header">
              <h2 className="ab-modal-title">BENEFITS</h2>
              <button 
                className="ab-modal-close"
                onClick={handleCloseModal}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="ab-form">
              <div className="ab-form-group">
                <label className="ab-form-label">
                  TITLE <span className="ab-required">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="ab-form-input"
                  required
                />
              </div>

              <div className="ab-form-group">
                <label className="ab-form-label">
                  STATUS <span className="ab-required">*</span>
                </label>
                <div className="ab-radio-group">
                  <label className="ab-radio-label">
                    <input
                      type="radio"
                      name="status"
                      value="Active"
                      checked={formData.status === 'Active'}
                      onChange={handleInputChange}
                      className="ab-radio-input"
                    />
                    <span className="ab-radio-text">Active</span>
                  </label>
                  <label className="ab-radio-label">
                    <input
                      type="radio"
                      name="status"
                      value="Inactive"
                      checked={formData.status === 'Inactive'}
                      onChange={handleInputChange}
                      className="ab-radio-input"
                    />
                    <span className="ab-radio-text">Inactive</span>
                  </label>
                </div>
              </div>

              <div className="ab-form-group">
                <label className="ab-form-label">IMAGE</label>
                <div className="ab-file-upload">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="ab-file-input"
                    id="ab-file-upload"
                    accept="image/*"
                  />
                  <label htmlFor="ab-file-upload" className="ab-file-label">
                    Choose File
                  </label>
                  <span className="ab-file-status">
                    {formData.image ? formData.image.name : 'No File Chosen'}
                  </span>
                </div>
              </div>

              <div className="ab-form-group">
                <label className="ab-form-label">DESCRIPTION</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="ab-form-textarea"
                  rows="4"
                />
              </div>

              <div className="ab-form-actions">
                <button type="submit" className="ab-save-btn">
                  SAVE
                </button>
                <button 
                  type="button" 
                  className="ab-clear-btn"
                  onClick={handleCloseModal}
                >
                  CLEAR
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showViewModal && viewingBenefit && (
        <div className="ab-modal-overlay">
          <div className="ab-modal-container">
            <div className="ab-modal-header">
              <h2 className="ab-modal-title">View Benefit</h2>
              <button 
                className="ab-modal-close"
                onClick={handleCloseViewModal}
              >
                <X size={20} />
              </button>
            </div>

            <div className="ab-view-content">
              <div className="ab-form-group">
                <label className="ab-form-label">TITLE</label>
                <input
                  type="text"
                  value={viewingBenefit.title}
                  readOnly
                  className="ab-form-input"
                />
              </div>

              <div className="ab-form-group">
                <label className="ab-form-label">STATUS</label>
                <input
                  type="text"
                  value={viewingBenefit.status}
                  readOnly
                  className="ab-form-input"
                />
              </div>

              <div className="ab-form-group">
                <label className="ab-form-label">IMAGE</label>
                {viewingBenefit.image ? (
                  <div className="ab-file-status">
                    {viewingBenefit.image.name || 'Image Uploaded'}
                  </div>
                ) : (
                  <span className="ab-file-status">No Image</span>
                )}
              </div>

              <div className="ab-form-group">
                <label className="ab-form-label">DESCRIPTION</label>
                <textarea
                  value={viewingBenefit.description}
                  readOnly
                  className="ab-form-textarea"
                  rows="4"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="ab-modal-overlay">
          <div className="ab-delete-modal">
            <div className="ab-delete-icon">
              <AlertCircle size={48} />
            </div>
            <h3 className="ab-delete-title">Are you sure ?</h3>
            <p className="ab-delete-message">
              You will not be able to recover the deleted record!
            </p>
            <div className="ab-delete-actions">
              <button 
                className="ab-confirm-delete-btn"
                onClick={confirmDelete}
              >
                Yes, Delete it !
              </button>
              <button 
                className="ab-cancel-delete-btn"
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