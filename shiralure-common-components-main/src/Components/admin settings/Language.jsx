import React, { useState } from 'react';
import { Plus, Edit, Trash2, X, Check, AlertCircle, Eye } from 'lucide-react';

const LanguagesComponent = () => {
  const [languages, setLanguages] = useState([
    { id: 1, name: 'English', code: 'EN', status: 'Active' },
    { id: 2, name: 'Spanish', code: 'ES', status: 'Active' },
    { id: 3, name: 'French', code: 'FR', status: 'Inactive' },
    { id: 4, name: 'German', code: 'DE', status: 'Active' },
    { id: 5, name: 'Mandarin', code: 'ZH', status: 'Inactive' },
    { id: 6, name: 'Arabic', code: 'AR', status: 'Active' },
  ]);

  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingLanguage, setEditingLanguage] = useState(null);
  const [deletingLanguage, setDeletingLanguage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);

  const [formData, setFormData] = useState({
    name: '',
    code: '',
    status: 'Active'
  });

  // Pagination
  const totalPages = Math.ceil(languages.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentLanguages = languages.slice(startIndex, endIndex);

  const handleAddLanguage = () => {
    setEditingLanguage(null);
    setFormData({ name: '', code: '', status: 'Active' });
    setShowAddEditModal(true);
  };

  const handleEditLanguage = (language) => {
    setEditingLanguage(language);
    setFormData({
      name: language.name,
      code: language.code,
      status: language.status
    });
    setShowAddEditModal(true);
  };

  const handleDeleteLanguage = (language) => {
    setDeletingLanguage(language);
    setShowDeleteModal(true);
  };

  const handleViewLanguage = (language) => {
    // Placeholder for view action (e.g., open modal or alert)
    alert(`Viewing details for ${language.name}`);
  };

  const handleSaveLanguage = () => {
    if (editingLanguage) {
      setLanguages(languages.map(lang => 
        lang.id === editingLanguage.id 
          ? { ...lang, ...formData }
          : lang
      ));
    } else {
      const newLanguage = {
        id: Date.now(),
        ...formData
      };
      setLanguages([...languages, newLanguage]);
    }
    setShowAddEditModal(false);
    setFormData({ name: '', code: '', status: 'Active' });
  };

  const confirmDelete = () => {
    setLanguages(languages.filter(lang => lang.id !== deletingLanguage.id));
    setShowDeleteModal(false);
    setDeletingLanguage(null);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <>
      <style>{`
        .lang-mgmt-container5 {
          max-width: 1200px;
          margin: 0 auto;
          padding: 24px;
          background-color: #f9fafb;
          min-height: 100vh;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .lang-mgmt-header5 {
          background: white;
          border-radius: 8px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          padding: 24px;
          margin-bottom: 24px;
        }

        .lang-mgmt-header-content5 {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .lang-mgmt-title5 {
          font-size: 24px;
          font-weight: 600;
          color: #1f2937;
          margin: 0;
        }

        .lang-mgmt-add-btn5 {
          background-color: #2563eb;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          font-size: 14px;
          transition: background-color 0.2s;
        }

        .lang-mgmt-add-btn5:hover {
          background-color: #1d4ed8;
        }

        .lang-mgmt-table-wrapper5 {
          background: white;
          border-radius: 8px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }

        .lang-mgmt-table5 {
          width: 100%;
          border-collapse: collapse;
        }

        .lang-mgmt-table-header5 {
          background-color: #f9fafb;
        }

        .lang-mgmt-th5 {
          text-align: left;
          padding: 16px 24px;
          font-weight: 500;
          color: #374151;
          border-bottom: 1px solid #e5e7eb;
        }

        .lang-mgmt-table-row5 {
          border-bottom: 1px solid #f3f4f6;
          transition: background-color 0.2s;
        }

        .lang-mgmt-table-row5:hover {
          background-color: #f9fafb;
        }

        .lang-mgmt-td5 {
          padding: 16px 24px;
          color: #1f2937;
        }

        .lang-mgmt-status-badge5 {
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 500;
          display: inline-block;
        }

        .lang-mgmt-status-active5 {
          background-color: #dcfce7;
          color: #166534;
        }

        .lang-mgmt-status-inactive5 {
          background-color: #fee2e2;
          color: #991b1b;
        }

        .lang-mgmt-actions5 {
          display: flex;
          gap: 8px;
        }

        .lang-mgmt-action-btn5 {
          width: 32px;
          height: 32px;
          border: none;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background-color 0.2s;
          opacity: 0.9;
        }

        .lang-mgmt-view-btn5 {
          background-color: #f8d7da;
          color: #dc3545;
        }

        .lang-mgmt-view-btn5:hover {
          background-color: #f1aeb5;
          transform: scale(1.05);
        }

        .lang-mgmt-edit-btn5 {
          background-color: #d1e7dd;
          color: #28a745;
        }

        .lang-mgmt-edit-btn5:hover {
          background-color: #a3cfbb;
          transform: scale(1.05);
        }

        .lang-mgmt-delete-btn5 {
          background-color: #fff3cd;
          color: #f0ad4e;
        }

        .lang-mgmt-delete-btn5:hover {
          background-color: #ffeaa7;
          transform: scale(1.05);
        }

        .lang-mgmt-pagination5 {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 24px;
          border-top: 1px solid #f3f4f6;
        }

        .lang-mgmt-pagination-info5 {
          font-size: 14px;
          color: #6b7280;
        }

        .lang-mgmt-pagination-controls5 {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .lang-mgmt-pagination-btn5 {
          background: none;
          border: none;
          padding: 8px 12px;
          color: #6b7280;
          border-radius: 6px;
          cursor: pointer;
          transition: background-color 0.2s;
          min-width: 36px;
        }

        .lang-mgmt-pagination-btn5:hover:not(:disabled) {
          background-color: #f3f4f6;
        }

        .lang-mgmt-pagination-btn5:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .lang-mgmt-pagination-active5 {
          background-color: #2563eb !important;
          color: white !important;
        }

        .lang-mgmt-modal-overlay5 {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
        }

        .lang-mgmt-modal5 {
          background: white;
          border-radius: 8px;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
          width: 100%;
          max-width: 500px;
          margin: 16px;
          max-height: 90vh;
          overflow-y: auto;
        }

        .lang-mgmt-modal-header5 {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 24px;
          border-bottom: 1px solid #e5e7eb;
        }

        .lang-mgmt-modal-title5 {
          font-size: 20px;
          font-weight: 600;
          color: #1f2937;
          margin: 0;
        }

        .lang-mgmt-modal-close5 {
          background: none;
          border: none;
          color: #9ca3af;
          cursor: pointer;
          padding: 4px;
          transition: color 0.2s;
        }

        .lang-mgmt-modal-close5:hover {
          color: #6b7280;
        }

        .lang-mgmt-modal-body5 {
          padding: 24px;
          min-height: 200px;
        }

        .lang-mgmt-form-group5 {
          margin-bottom: 20px;
        }

        .lang-mgmt-form-group5:last-child {
          margin-bottom: 0;
        }

        .lang-mgmt-form-label5 {
          display: block;
          font-size: 14px;
          font-weight: 500;
          color: #374151;
          margin-bottom: 8px;
        }

        .lang-mgmt-form-input5 {
          width: 100%;
          padding: 8px 12px;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          font-size: 14px;
          transition: border-color 0.2s, box-shadow 0.2s;
          box-sizing: border-box;
        }

        .lang-mgmt-form-input5:focus {
          outline: none;
          border-color: #2563eb;
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
        }

        .lang-mgmt-file-upload5 {
          border: 2px dashed #d1d5db;
          border-radius: 6px;
          padding: 16px;
          text-align: center;
        }

        .lang-mgmt-file-input5 {
          display: none;
        }

        .lang-mgmt-file-label5 {
          color: #2563eb;
          cursor: pointer;
          text-decoration: none;
        }

        .lang-mgmt-file-label5:hover {
          color: #1d4ed8;
        }

        .lang-mgmt-file-text5 {
          color: #6b7280;
          margin-left: 8px;
        }

        .lang-mgmt-radio-group5 {
          display: flex;
          gap: 16px;
        }

        .lang-mgmt-radio-option5 {
          display: flex;
          align-items: center;
          cursor: pointer;
        }

        .lang-mgmt-radio-input5 {
          margin-right: 8px;
          cursor: pointer;
        }

        .lang-mgmt-radio-label5 {
          font-size: 14px;
          color: #374151;
          cursor: pointer;
        }

        .lang-mgmt-modal-footer5 {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          padding: 24px;
          border-top: 1px solid #e5e7eb;
        }

        .lang-mgmt-cancel-btn5 {
          padding: 8px 16px;
          color: #6b7280;
          border: 1px solid #d1d5db;
          background: white;
          border-radius: 6px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          transition: background-color 0.2s;
        }

        .lang-mgmt-cancel-btn5:hover {
          background-color: #f9fafb;
        }

        .lang-mgmt-save-btn5 {
          padding: 8px 16px;
          background-color: #2563eb;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          transition: background-color 0.2s;
        }

        .lang-mgmt-save-btn5:hover:not(:disabled) {
          background-color: #1d4ed8;
        }

        .lang-mgmt-save-btn5:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .lang-mgmt-delete-overlay5 {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 50;
        }

        .lang-mgmt-delete-modal5 {
          background: white;
          border-radius: 8px;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
          width: 100%;
          max-width: 384px;
          margin: 16px;
        }

        .lang-mgmt-delete-content5 {
          padding: 24px;
          text-align: center;
        }

        .lang-mgmt-delete-icon5 {
          margin-bottom: 16px;
        }

        .lang-mgmt-delete-icon-wrapper5 {
          width: 64px;
          height: 64px;
          margin: 0 auto;
          background-color: #fef3c7;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .lang-mgmt-delete-icon-svg5 {
          width: 32px;
          height: 32px;
          color: #d97706;
        }

        .lang-mgmt-delete-title5 {
          font-size: 18px;
          font-weight: 600;
          color: #1f2937;
          margin: 0 0 8px 0;
        }

        .lang-mgmt-delete-message5 {
          font-size: 14px;
          color: #6b7280;
          margin: 0 0 24px 0;
        }

        .lang-mgmt-delete-actions5 {
          display: flex;
          gap: 12px;
          justify-content: center;
        }

        .lang-mgmt-confirm-delete-btn5 {
          padding: 8px 24px;
          background-color: #2563eb;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 14px;
          transition: background-color 0.2s;
        }

        .lang-mgmt-confirm-delete-btn5:hover {
          background-color: #1d4ed8;
        }

        .lang-mgmt-cancel-delete-btn5 {
          padding: 8px 24px;
          background-color: #6b7280;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 14px;
          transition: background-color 0.2s;
        }

        .lang-mgmt-cancel-delete-btn5:hover {
          background-color: #4b5563;
        }

        .text-red-500 {
          color: #ef4444;
        }

        @media (max-width: 768px) {
          .lang-mgmt-container5 {
            padding: 16px;
          }

          .lang-mgmt-header5 {
            padding: 16px;
          }

          .lang-mgmt-th5,
          .lang-mgmt-td5 {
            padding: 12px 16px;
          }

          .lang-mgmt-actions5 button {
            width: 28px;
            height: 28px;
          }

          .lang-mgmt-actions5 button svg {
            width: 14px;
            height: 14px;
          }

          .lang-mgmt-modal-header5,
          .lang-mgmt-modal-body5,
          .lang-mgmt-modal-footer5 {
            padding: 16px;
          }

          .lang-mgmt-modal5 {
            max-width: 400px;
          }
        }

        @media (max-width: 480px) {
          .lang-mgmt-container5 {
            padding: 12px;
          }

          .lang-mgmt-header5 {
            padding: 12px;
          }

          .lang-mgmt-th5,
          .lang-mgmt-td5 {
            padding: 10px 12px;
          }

          .lang-mgmt-actions5 button {
            width: 24px;
            height: 24px;
          }

          .lang-mgmt-actions5 button svg {
            width: 12px;
            height: 12px;
          }

          .lang-mgmt-modal5 {
            max-width: 320px;
          }

          .lang-mgmt-modal-header5,
          .lang-mgmt-modal-body5,
          .lang-mgmt-modal-footer5 {
            padding: 12px;
          }
        }
      `}</style>
      
      <div className="lang-mgmt-container5">
        {/* Header */}
        <div className="lang-mgmt-header5">
          <div className="lang-mgmt-header-content5">
            <h1 className="lang-mgmt-title5">Languages</h1>
            <button
              onClick={handleAddLanguage}
              className="lang-mgmt-add-btn5"
            >
              <Plus size={20} />
              Add Language
            </button>
          </div>
        </div>

        {/* Main Table */}
        <div className="lang-mgmt-table-wrapper5">
          <table className="lang-mgmt-table5">
            <thead className="lang-mgmt-table-header5">
              <tr>
                <th className="lang-mgmt-th5">Name</th>
                <th className="lang-mgmt-th5">Code</th>
                <th className="lang-mgmt-th5">Status</th>
                <th className="lang-mgmt-th5">Action</th>
              </tr>
            </thead>
            <tbody className="lang-mgmt-table-body5">
              {currentLanguages.map((language) => (
                <tr key={language.id} className="lang-mgmt-table-row5">
                  <td className="lang-mgmt-td5">{language.name}</td>
                  <td className="lang-mgmt-td5">{language.code}</td>
                  <td className="lang-mgmt-td5">
                    <span className={`lang-mgmt-status-badge5 ${
                      language.status === 'Active' 
                        ? 'lang-mgmt-status-active5' 
                        : 'lang-mgmt-status-inactive5'
                    }`}>
                      {language.status}
                    </span>
                  </td>
                  <td className="lang-mgmt-td5">
                    <div className="lang-mgmt-actions5">
                      <button
                        onClick={() => handleViewLanguage(language)}
                        className="lang-mgmt-action-btn5 lang-mgmt-view-btn5"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={() => handleEditLanguage(language)}
                        className="lang-mgmt-action-btn5 lang-mgmt-edit-btn5"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteLanguage(language)}
                        className="lang-mgmt-action-btn5 lang-mgmt-delete-btn5"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="lang-mgmt-pagination5">
            <div className="lang-mgmt-pagination-info5">
              Showing {startIndex + 1} to {Math.min(endIndex, languages.length)} of {languages.length} entries
            </div>
            <div className="lang-mgmt-pagination-controls5">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="lang-mgmt-pagination-btn5"
              >
                ‹
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`lang-mgmt-pagination-btn5 ${
                    currentPage === i + 1 ? 'lang-mgmt-pagination-active5' : ''
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="lang-mgmt-pagination-btn5"
              >
                ›
              </button>
            </div>
          </div>
        </div>

        {/* Add/Edit Modal */}
        {showAddEditModal && (
          <div className="lang-mgmt-modal-overlay5">
            <div className="lang-mgmt-modal5">
              <div className="lang-mgmt-modal-header5">
                <h2 className="lang-mgmt-modal-title5">
                  {editingLanguage ? 'Edit Language' : 'Add Language'}
                </h2>
                <button
                  onClick={() => setShowAddEditModal(false)}
                  className="lang-mgmt-modal-close5"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="lang-mgmt-modal-body5">
                <div className="lang-mgmt-form-group5">
                  <label className="lang-mgmt-form-label5">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="lang-mgmt-form-input5"
                    placeholder="Enter language name"
                  />
                </div>

                <div className="lang-mgmt-form-group5">
                  <label className="lang-mgmt-form-label5">
                    Code <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.code}
                    onChange={(e) => handleInputChange('code', e.target.value.toUpperCase())}
                    className="lang-mgmt-form-input5"
                    placeholder="Enter language code"
                    maxLength={3}
                  />
                </div>

                <div className="lang-mgmt-form-group5">
                  <label className="lang-mgmt-form-label5">
                    Image
                  </label>
                  <div className="lang-mgmt-file-upload5">
                    <input
                      type="file"
                      accept="image/*"
                      className="lang-mgmt-file-input5"
                      id="language-image"
                    />
                    <label
                      htmlFor="language-image"
                      className="lang-mgmt-file-label5"
                    >
                      Choose File
                    </label>
                    <span className="lang-mgmt-file-text5">No file chosen</span>
                  </div>
                </div>

                <div className="lang-mgmt-form-group5">
                  <label className="lang-mgmt-form-label5">
                    Status <span className="text-red-500">*</span>
                  </label>
                  <div className="lang-mgmt-radio-group5">
                    <label className="lang-mgmt-radio-option5">
                      <input
                        type="radio"
                        name="status"
                        value="Active"
                        checked={formData.status === 'Active'}
                        onChange={(e) => handleInputChange('status', e.target.value)}
                        className="lang-mgmt-radio-input5"
                      />
                      <span className="lang-mgmt-radio-label5">Active</span>
                    </label>
                    <label className="lang-mgmt-radio-option5">
                      <input
                        type="radio"
                        name="status"
                        value="Inactive"
                        checked={formData.status === 'Inactive'}
                        onChange={(e) => handleInputChange('status', e.target.value)}
                        className="lang-mgmt-radio-input5"
                      />
                      <span className="lang-mgmt-radio-label5">Inactive</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="lang-mgmt-modal-footer5">
                <button
                  onClick={() => setShowAddEditModal(false)}
                  className="lang-mgmt-cancel-btn5"
                >
                  <X size={16} />
                  Close
                </button>
                <button
                  onClick={handleSaveLanguage}
                  disabled={!formData.name || !formData.code}
                  className="lang-mgmt-save-btn5"
                >
                  <Check size={16} />
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="lang-mgmt-delete-overlay5">
            <div className="lang-mgmt-delete-modal5">
              <div className="lang-mgmt-delete-content5">
                <div className="lang-mgmt-delete-icon5">
                  <div className="lang-mgmt-delete-icon-wrapper5">
                    <AlertCircle className="lang-mgmt-delete-icon-svg5" />
                  </div>
                </div>
                
                <h3 className="lang-mgmt-delete-title5">
                  Are you sure ?
                </h3>
                
                <p className="lang-mgmt-delete-message5">
                  You will not be able to recover the deleted record!
                </p>
                
                <div className="lang-mgmt-delete-actions5">
                  <button
                    onClick={confirmDelete}
                    className="lang-mgmt-confirm-delete-btn5"
                  >
                    Yes, Delete it !
                  </button>
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="lang-mgmt-cancel-delete-btn5"
                  >
                    No, Cancel !
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default LanguagesComponent;