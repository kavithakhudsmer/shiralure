import React, { useState } from 'react';
import { 
  Plus, 
  Edit, 
  Eye, 
  Trash2, 
  X, 
  AlertTriangle 
} from 'lucide-react';
import { FaCheck } from "react-icons/fa";

const ProductBrandsComponent = () => {
  const [brands, setBrands] = useState([
    {
      id: 1,
      name: 'Wella',
      description: 'Leading Professional Haircare and Beauty Brand',
      status: 'Active',
      image: 'wella-logo.png'
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentBrand, setCurrentBrand] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: 'Active',
    image: null
  });

  const handleAdd = () => {
    setCurrentBrand(null);
    setFormData({
      name: '',
      description: '',
      status: 'Active',
      image: null
    });
    setShowAddModal(true);
  };

  const handleEdit = (brand) => {
    setCurrentBrand(brand);
    setFormData({
      name: brand.name,
      description: brand.description,
      status: brand.status,
      image: brand.image
    });
    setShowEditModal(true);
  };

  const handleView = (brand) => {
    setCurrentBrand(brand);
    setShowViewModal(true);
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setBrands(brands.filter(b => b.id !== deleteId));
    setShowDeleteModal(false);
    setDeleteId(null);
  };

  const handleSave = () => {
    if (currentBrand) {
      setBrands(brands.map(b => 
        b.id === currentBrand.id 
          ? { ...b, ...formData }
          : b
      ));
      setShowEditModal(false);
    } else {
      const newBrand = {
        id: Date.now(),
        ...formData
      };
      setBrands([...brands, newBrand]);
      setShowAddModal(false);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({...formData, image: file.name});
    }
  };

  const closeModal = () => {
    setShowAddModal(false);
    setShowEditModal(false);
  };

  return (
    <div className="product-brands-container17">
      <div className="pb-header17">
        <h2 className="pb-title17">Product Brands</h2>
        <button className="pb-add-btn17" onClick={handleAdd}>
          <Plus size={16} />Add
        </button>
      </div>

      <div className="pb-table17">
        <div className="pb-table-header17">
          <div className="pb-col-name17">Name</div>
          <div className="pb-col-description17">Description</div>
          <div className="pb-col-status17">Status</div>
          <div className="pb-col-action17">Action</div>
        </div>

        {brands.map((brand) => (
          <div key={brand.id} className="pb-table-row17">
            <div className="pb-col-name17">{brand.name}</div>
            <div className="pb-col-description17">{brand.description}</div>
            <div className="pb-col-status17">
              <span className={`pb-status17 ${brand.status.toLowerCase()}17`}>
                {brand.status}
              </span>
            </div>
            <div className="pb-col-action17">
              <button 
                className="pb-action-btn17 pb-view-btn17" 
                onClick={() => handleView(brand)}
              >
                <Eye size={16} color="#dc3545" />
              </button>
              <button 
                className="pb-action-btn17 pb-edit-btn17" 
                onClick={() => handleEdit(brand)}
              >
                <Edit size={16} color="#28a745" />
              </button>
              <button 
                className="pb-action-btn17 pb-delete-btn17" 
                onClick={() => handleDelete(brand.id)}
              >
                <Trash2 size={16} color="#f0ad4e" />
              </button>
            </div>
          </div>
        ))}

        <div className="pb-table-footer17">
          Showing 1 to 1 of {brands.length} entries
        </div>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="pb-modal-overlay17">
          <div className="pb-modal17">
            <div className="pb-modal-header17">
              <h3 className="pb-modal-title17">Product Brands</h3>
            </div>

            <div className="pb-modal-body17">
              <div className="pb-form-group17">
                <label className="pb-form-label17">Name <span className="pb-required17">*</span></label>
                <input
                  type="text"
                  className="pb-form-input17"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>

              <div className="pb-form-group17">
                <label className="pb-form-label17">Status</label>
                <div className="pb-radio-group17">
                  <label className="pb-radio-label17">
                    <input
                      type="radio"
                      name="status"
                      checked={formData.status === 'Active'}
                      onChange={() => setFormData({...formData, status: 'Active'})}
                    />
                    <span>Active</span>
                  </label>
                  <label className="pb-radio-label17">
                    <input
                      type="radio"
                      name="status"
                      checked={formData.status === 'Inactive'}
                      onChange={() => setFormData({...formData, status: 'Inactive'})}
                    />
                    <span>Inactive</span>
                  </label>
                </div>
              </div>

              <div className="pb-form-group17">
                <label className="pb-form-label17">Image (72px,72px)</label>
                <div className="pb-file-upload17">
                  <input
                    type="file"
                    id="fileUpload"
                    className="pb-file-input17"
                    onChange={handleFileUpload}
                  />
                  <label htmlFor="fileUpload" className="pb-file-label17">
                    Choose File
                  </label>
                  <span className="pb-file-name17">
                    {formData.image || 'No file chosen'}
                  </span>
                </div>
              </div>

              <div className="pb-form-group17">
                <label className="pb-form-label17">Description</label>
                <textarea
                  className="pb-form-textarea17"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
              </div>
            </div>

            <div className="pb-modal-footer17">
              <button className="pb-btn-close17" onClick={closeModal}>
                Close
              </button>
              <button className="pb-btn-save17" onClick={handleSave}>
                <FaCheck size={16} />
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <div className="pb-modal-overlay17">
          <div className="pb-modal17">
            <div className="pb-modal-header17">
              <h3 className="pb-modal-title17">Product Brands</h3>
            </div>

            <div className="pb-modal-body17">
              <div className="pb-form-group17">
                <label className="pb-form-label17">Name <span className="pb-required17">*</span></label>
                <input
                  type="text"
                  className="pb-form-input17"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>

              <div className="pb-form-group17">
                <label className="pb-form-label17">Status</label>
                <div className="pb-radio-group17">
                  <label className="pb-radio-label17">
                    <input
                      type="radio"
                      name="editStatus"
                      checked={formData.status === 'Active'}
                      onChange={() => setFormData({...formData, status: 'Active'})}
                    />
                    <span>Active</span>
                  </label>
                  <label className="pb-radio-label17">
                    <input
                      type="radio"
                      name="editStatus"
                      checked={formData.status === 'Inactive'}
                      onChange={() => setFormData({...formData, status: 'Inactive'})}
                    />
                    <span>Inactive</span>
                  </label>
                </div>
              </div>

              <div className="pb-form-group17">
                <label className="pb-form-label17">Image (72px,72px)</label>
                <div className="pb-file-upload17">
                  <input
                    type="file"
                    id="editFileUpload"
                    className="pb-file-input17"
                    onChange={handleFileUpload}
                  />
                  <label htmlFor="editFileUpload" className="pb-file-label17">
                    Choose File
                  </label>
                  <span className="pb-file-name17">
                    {formData.image || 'No file chosen'}
                  </span>
                </div>
              </div>

              <div className="pb-form-group17">
                <label className="pb-form-label17">Description</label>
                <textarea
                  className="pb-form-textarea17"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
              </div>
            </div>

            <div className="pb-modal-footer17">
              <button className="pb-btn-close17" onClick={closeModal}>
                Close
              </button>
              <button className="pb-btn-save17" onClick={handleSave}>
                <FaCheck size={16} />
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Modal */}
      {showViewModal && currentBrand && (
        <div className="pb-modal-overlay17">
          <div className="pb-view-modal17">
            <div className="pb-modal-header17">
              <h3 className="pb-modal-title17">Product Brands</h3>
              <button className="pb-close-btn17" onClick={() => setShowViewModal(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="pb-view-body17">
              <div className="pb-brand-display17">
                <div className="pb-brand-logo17">
                  <div className="pb-logo-placeholder17">
                    <span className="pb-logo-text17">WELLA</span>
                  </div>
                </div>
                <div className="pb-brand-info17">
                  <h4 className="pb-brand-name17">{currentBrand.name.toUpperCase()}</h4>
                  <span className={`pb-brand-status17 ${currentBrand.status.toLowerCase()}17`}>
                    {currentBrand.status}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="pb-modal-overlay17">
          <div className="pb-delete-modal17">
            <div className="pb-delete-icon17">
              <AlertTriangle size={48} color="#f59e0b" />
            </div>
            <h3 className="pb-delete-title17">Are you sure ?</h3>
            <p className="pb-delete-message17">You will not be able to recover the deleted record!</p>
            <div className="pb-delete-actions17">
              <button className="pb-btn-danger17" onClick={confirmDelete}>
                Yes, Delete it !
              </button>
              <button className="pb-btn-cancel17" onClick={() => setShowDeleteModal(false)}>
                No, Cancel !
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .product-brands-container17 {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
         
          min-height: 100vh;
        }

        .pb-header17 {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .pb-title17 {
          margin: 0;
          font-size: 18px;
          font-weight: 600;
          color: #1f2937;
        }

        .pb-add-btn17 {
          background: #5A66F1;
          color: white;
          border: none;
          padding: 10px;
          border-radius: 6px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        

        .pb-table17 {
          background: white;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .pb-table-header17 {
          display: grid;
          grid-template-columns: 1fr 3fr 1fr 1fr;
          gap: 20px;
          padding: 16px 20px;
          background: #f9fafb;
          border-bottom: 1px solid #e5e7eb;
          font-weight: 600;
          font-size: 14px;
          color: #374151;
        }

        .pb-table-row17 {
          display: grid;
          grid-template-columns: 1fr 3fr 1fr 1fr;
          gap: 20px;
          padding: 16px 20px;
          border-bottom: 1px solid #f3f4f6;
          align-items: center;
        }

        .pb-table-row17:hover {
          background: #f9fafb;
        }

        .pb-status17 {
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 500;
        }

        .pb-status17.active17 {
          background: #dcfce7;
          color: #16a34a;
        }

        .pb-status17.inactive17 {
          background: #fee2e2;
          color: #dc2626;
        }

        .pb-col-action17 {
          display: flex;
          gap: 8px;
        }

        .pb-action-btn17 {
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

        .pb-view-btn17 {
          background: #f8d7da;
        }

        .pb-view-btn17:hover {
          background: #f1aeb5;
          transform: scale(1.05);
        }

        .pb-edit-btn17 {
          background: #d1e7dd;
        }

        .pb-edit-btn17:hover {
          background: #a3cfbb;
          transform: scale(1.05);
        }

        .pb-delete-btn17 {
          background: #fff3cd;
        }

        .pb-delete-btn17:hover {
          background: #ffeaa7;
          transform: scale(1.05);
        }

        .pb-table-footer17 {
          padding: 16px 20px;
          font-size: 14px;
          color: #6b7280;
          background: #f9fafb;
        }

        .pb-modal-overlay17 {
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

        .pb-modal17 {
          background: white;
          border-radius: 8px;
          width: 500px;
          max-width: 90vw;
          max-height: 90vh;
          overflow: auto;
        }

        .pb-view-modal17 {
          background: white;
          border-radius: 8px;
          width: 400px;
          max-width: 90vw;
        }

        .pb-modal-header17 {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px;
          border-bottom: 1px solid #e5e7eb;
        }

        .pb-modal-title17 {
          margin: 0;
          font-size: 18px;
          font-weight: 600;
          color: #1f2937;
        }

        .pb-close-btn17 {
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
          color: #6b7280;
        }

        .pb-close-btn17:hover {
          color: #374151;
        }

        .pb-modal-body17 {
          padding: 20px;
        }

        .pb-form-group17 {
          margin-bottom: 20px;
        }

        .pb-form-label17 {
          display: block;
          font-size: 14px;
          font-weight: 500;
          color: #374151;
          margin-bottom: 8px;
        }

        .pb-required17 {
          color: #ef4444;
        }

        .pb-form-input17 {
          width: 100%;
          padding: 12px;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          font-size: 14px;
          background: #f9fafb;
          box-sizing: border-box;
        }

        .pb-form-input17:focus {
          outline: none;
          border-color: #5A66F1;
          background: white;
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
        }

        .pb-form-textarea17 {
          width: 100%;
          padding: 12px;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          font-size: 14px;
          background: #f9fafb;
          min-height: 100px;
          resize: vertical;
          box-sizing: border-box;
        }

        .pb-form-textarea17:focus {
          outline: none;
          border-color: #5A66F1;
          background: white;
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
        }

        .pb-radio-group17 {
          display: flex;
          gap: 20px;
          margin-top: 8px;
        }

        .pb-radio-label17 {
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          font-size: 14px;
        }

        .pb-radio-label17 input[type="radio"] {
          margin: 0;
        }

        .pb-file-upload17 {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px;
          background: #f9fafb;
          border: 1px solid #d1d5db;
          border-radius: 6px;
        }

        .pb-file-input17 {
          display: none;
        }

        .pb-file-label17 {
          padding: 8px 16px;
          background: #e5e7eb;
          border: 1px solid #d1d5db;
          border-radius: 4px;
          cursor: pointer;
          font-size: 14px;
          color: #374151;
        }

        .pb-file-label17:hover {
          background: #d1d5db;
        }

        .pb-file-name17 {
          font-size: 14px;
          color: #6b7280;
        }

        .pb-modal-footer17 {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          padding: 20px;
          border-top: 1px solid #e5e7eb;
        }

        .pb-btn-close17 {
          padding: 8px 16px;
          background: #6b7280;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 14px;
        }

        .pb-btn-close17:hover {
          background: #4b5563;
        }

        .pb-btn-save17 {
          padding: 8px 16px;
          background: #5A66F1;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 14px;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        

        .pb-view-body17 {
          padding: 20px;
        }

        .pb-brand-display17 {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .pb-brand-logo17 {
          width: 120px;
          height: 80px;
          background: #dc2626;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .pb-logo-placeholder17 {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .pb-logo-text17 {
          color: white;
          font-size: 18px;
          font-weight: bold;
        }

        .pb-brand-info17 {
          flex: 1;
        }

        .pb-brand-name17 {
          margin: 0 0 8px 0;
          font-size: 24px;
          font-weight: bold;
          color: #1f2937;
        }

        .pb-brand-status17 {
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 500;
        }

        .pb-brand-status17.active17 {
          background: #dcfce7;
          color: #16a34a;
        }

        .pb-brand-status17.inactive17 {
          background: #fee2e2;
          color: #dc2626;
        }

        .pb-delete-modal17 {
          background: white;
          border-radius: 8px;
          padding: 40px;
          text-align: center;
          width: 400px;
          max-width: 90vw;
        }

        .pb-delete-icon17 {
          margin-bottom: 20px;
        }

        .pb-delete-title17 {
          margin: 0 0 10px 0;
          font-size: 20px;
          color: #1f2937;
          font-weight: 600;
        }

        .pb-delete-message17 {
          margin: 0 0 30px 0;
          color: #6b7280;
          font-size: 14px;
        }

        .pb-delete-actions17 {
          display: flex;
          gap: 12px;
          justify-content: center;
        }

        .pb-btn-danger17 {
          background: #5A66F1;
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 500;
        }

        

        .pb-btn-cancel17 {
          background: #6b7280;
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 500;
        }

        
      `}</style>
    </div>
  );
};

export default ProductBrandsComponent;