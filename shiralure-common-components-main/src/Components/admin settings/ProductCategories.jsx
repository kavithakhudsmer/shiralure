import React, { useState } from 'react';
import { 
  Plus, 
  Upload, 
  Printer, 
  FileText, 
  Edit, 
  Eye, 
  Trash2, 
  X, 
  Save, 
  RotateCcw,
  AlertTriangle 
} from 'lucide-react';

const ProductCategoriesComponent = () => {
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: 'RAMYA',
      parentCategory: 'SHIRTS',
      status: 'Active',
      image: null,
      description: 'Category for shirts and related items'
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    parentCategory: '',
    status: 'Active',
    image: null,
    description: ''
  });

  const handleAdd = () => {
    setCurrentCategory(null);
    setFormData({
      name: '',
      parentCategory: '',
      status: 'Active',
      image: null,
      description: ''
    });
    setShowAddModal(true);
  };

  const handleEdit = (category) => {
    setCurrentCategory(category);
    setFormData({
      name: category.name,
      parentCategory: category.parentCategory,
      status: category.status,
      image: category.image,
      description: category.description
    });
    setShowEditModal(true);
  };

  const handleView = (category) => {
    setCurrentCategory(category);
    setShowViewModal(true);
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setCategories(categories.filter(c => c.id !== deleteId));
    setShowDeleteModal(false);
    setDeleteId(null);
  };

  const handleSave = () => {
    if (currentCategory) {
      setCategories(categories.map(c => 
        c.id === currentCategory.id 
          ? { ...c, ...formData }
          : c
      ));
      setShowEditModal(false);
    } else {
      const newCategory = {
        id: Date.now(),
        ...formData
      };
      setCategories([...categories, newCategory]);
      setShowAddModal(false);
    }
  };

  const handleClear = () => {
    setFormData({
      name: '',
      parentCategory: '',
      status: 'Active',
      image: null,
      description: ''
    });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({...formData, image: file.name});
    }
  };

 return (
  <div className="product-categories-container18">
    <div className="product-categories-header18">
      <h2 className="product-categories-title18">PRODUCT CATEGORIES</h2>
      <div className="product-categories-actions18">
        <button className="pc-btn-primary18" onClick={handleAdd}>
          <Plus size={16} />Add
        </button>
        <button className="pc-btn-secondary18">
          <Upload size={16} />
        </button>
        <div className="pc-dropdown-container18">
          <button 
            className="pc-btn-secondary18"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <Printer size={16} />
          </button>
          {showDropdown && (
            <div className="pc-dropdown-menu18">
              <div className="pc-dropdown-item18">
                <Printer size={14} />
                Print
              </div>
              <div className="pc-dropdown-item18">
                <FileText size={14} />
                XLS
              </div>
            </div>
          )}
        </div>
        <button className="pc-btn-secondary18">
          <FileText size={16} />
        </button>
      </div>
    </div>

    <div className="product-categories-table18">
      <div className="pc-table-header18">
        <div className="pc-col-name18">NAME</div>
        <div className="pc-col-parent18">PARENT CATEGORY</div>
        <div className="pc-col-status18">STATUS</div>
        <div className="pc-col-action18">ACTION</div>
      </div>

      {categories.map((category) => (
        <div key={category.id} className="pc-table-row18">
          <div className="pc-col-name18">{category.name}</div>
          <div className="pc-col-parent18">{category.parentCategory}</div>
          <div className="pc-col-status18">
            <span className={`pc-status18 ${category.status.toLowerCase()}18`}>
              {category.status}
            </span>
          </div>
          <div className="pc-col-action18">
            <button 
              className="pc-action-btn18 pc-view-btn18" 
              onClick={() => handleView(category)}
            >
              <Eye size={16} color="#dc3545" />
            </button>
            <button 
              className="pc-action-btn18 pc-edit-btn18" 
              onClick={() => handleEdit(category)}
            >
              <Edit size={16} color="#28a745" />
            </button>
            <button 
              className="pc-action-btn18 pc-delete-btn18" 
              onClick={() => handleDelete(category.id)}
            >
              <Trash2 size={16} color="#f0ad4e" />
            </button>
          </div>
        </div>
      ))}

      <div className="pc-table-footer18">
        Showing 1 out of {categories.length} entries
      </div>
    </div>

    {/* Add Modal */}
    {showAddModal && (
      <div className="pc-modal-overlay18">
        <div className="pc-modal18">
          <div className="pc-modal-header18">
            <h3 className="pc-modal-title18">PRODUCT CATEGORIES</h3>
            <button className="pc-close-btn18" onClick={() => setShowAddModal(false)}>
              <X size={20} />
            </button>
          </div>

          <div className="pc-modal-body18">
            <div className="pc-form-group18">
              <label className="pc-form-label18">NAME <span className="pc-required18">*</span></label>
              <input
                type="text"
                className="pc-form-input18"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>

            <div className="pc-form-row18">
              <div className="pc-form-group18">
                <label className="pc-form-label18">PARENT CATEGORY</label>
                <input
                  type="text"
                  className="pc-form-input18"
                  value={formData.parentCategory}
                  onChange={(e) => setFormData({...formData, parentCategory: e.target.value})}
                />
              </div>
              <div className="pc-form-group18">
                <label className="pc-form-label18">STATUS <span className="pc-required18">*</span></label>
                <div className="pc-radio-group18">
                  <label className="pc-radio-label18">
                    <input
                      type="radio"
                      name="status"
                      checked={formData.status === 'Active'}
                      onChange={() => setFormData({...formData, status: 'Active'})}
                    />
                    <span>Active</span>
                  </label>
                  <label className="pc-radio-label18">
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
            </div>

            <div className="pc-form-group18">
              <label className="pc-form-label18">IMAGE</label>
              <div className="pc-file-upload18">
                <input
                  type="file"
                  id="fileUpload"
                  className="pc-file-input18"
                  onChange={handleFileUpload}
                />
                <label htmlFor="fileUpload" className="pc-file-label18">
                  Choose File
                </label>
                <span className="pc-file-name18">
                  {formData.image || 'No File Chosen'}
                </span>
              </div>
            </div>

            <div className="pc-form-group18">
              <label className="pc-form-label18">DESCRIPTION</label>
              <textarea
                className="pc-form-textarea18"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
            </div>
          </div>

          <div className="pc-modal-footer18">
            <button className="pc-btn-primary18" onClick={handleSave}>
              <Save size={16} />
              SAVE
            </button>
            <button className="pc-btn-secondary18" onClick={handleClear}>
              <RotateCcw size={16} />
              CLEAR
            </button>
          </div>
        </div>
      </div>
    )}

    {/* Edit Modal */}
    {showEditModal && (
      <div className="pc-modal-overlay18">
        <div className="pc-modal18">
          <div className="pc-modal-header18">
            <h3 className="pc-modal-title18">PRODUCT CATEGORIES</h3>
            <button className="pc-close-btn18" onClick={() => setShowEditModal(false)}>
              <X size={20} />
            </button>
          </div>

          <div className="pc-modal-body18">
            <div className="pc-form-group18">
              <label className="pc-form-label18">NAME <span className="pc-required18">*</span></label>
              <input
                type="text"
                className="pc-form-input18"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>

            <div className="pc-form-row18">
              <div className="pc-form-group18">
                <label className="pc-form-label18">PARENT CATEGORY</label>
                <input
                  type="text"
                  className="pc-form-input18"
                  value={formData.parentCategory}
                  onChange={(e) => setFormData({...formData, parentCategory: e.target.value})}
                />
              </div>
              <div className="pc-form-group18">
                <label className="pc-form-label18">STATUS <span className="pc-required18">*</span></label>
                <div className="pc-radio-group18">
                  <label className="pc-radio-label18">
                    <input
                      type="radio"
                      name="editStatus"
                      checked={formData.status === 'Active'}
                      onChange={() => setFormData({...formData, status: 'Active'})}
                    />
                    <span>Active</span>
                  </label>
                  <label className="pc-radio-label18">
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
            </div>

            <div className="pc-form-group18">
              <label className="pc-form-label18">IMAGE</label>
              <div className="pc-file-upload18">
                <input
                  type="file"
                  id="editFileUpload"
                  className="pc-file-input18"
                  onChange={handleFileUpload}
                />
                <label htmlFor="editFileUpload" className="pc-file-label18">
                  Choose File
                </label>
                <span className="pc-file-name18">
                  {formData.image || 'No File Chosen'}
                </span>
              </div>
            </div>

            <div className="pc-form-group18">
              <label className="pc-form-label18">DESCRIPTION</label>
              <textarea
                className="pc-form-textarea18"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
            </div>
          </div>

          <div className="pc-modal-footer18">
            <button className="pc-btn-primary18" onClick={handleSave}>
              <Save size={16} />
              SAVE
            </button>
            <button className="pc-btn-secondary18" onClick={handleClear}>
              <RotateCcw size={16} />
              CLEAR
            </button>
          </div>
        </div>
      </div>
    )}

    {/* View Modal */}
    {showViewModal && currentCategory && (
      <div className="pc-modal-overlay18">
        <div className="pc-view-modal18">
          <div className="pc-modal-header18">
            <h3 className="pc-modal-title18">PRODUCT CATEGORIES</h3>
            <button className="pc-close-btn18" onClick={() => setShowViewModal(false)}>
              <X size={20} />
            </button>
          </div>

          <div className="pc-view-body18">
            <div className="pc-view-row18">
              <span className="pc-view-label18">NAME</span>
              <span className="pc-view-value18">{currentCategory.name}</span>
            </div>
            <div className="pc-view-row18">
              <span className="pc-view-label18">PARENT CATEGORY</span>
              <span className="pc-view-value18">{currentCategory.parentCategory}</span>
            </div>
            <div className="pc-view-row18">
              <span className="pc-view-label18">STATUS</span>
              <span className={`pc-view-value18 pc-status18 ${currentCategory.status.toLowerCase()}18`}>
                {currentCategory.status}
              </span>
            </div>
          </div>
        </div>
      </div>
    )}

    {/* Delete Confirmation Modal */}
    {showDeleteModal && (
      <div className="pc-modal-overlay18">
        <div className="pc-delete-modal18">
          <div className="pc-delete-icon18">
            <AlertTriangle size={48} color="#f59e0b" />
          </div>
          <h3 className="pc-delete-title18">Are you sure ?</h3>
          <p className="pc-delete-message18">You will not be able to recover the deleted record!</p>
          <div className="pc-delete-actions18">
            <button className="pc-btn-danger18" onClick={confirmDelete}>
              Yes, Delete it !
            </button>
            <button className="pc-btn-cancel18" onClick={() => setShowDeleteModal(false)}>
              No, Cancel !
            </button>
          </div>
        </div>
      </div>
    )}

    <style jsx>{`
      .product-categories-container18 {
        max-width: 1200px;
        margin: 0 auto;
        padding: 20px;
        font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        background: #f8fafc;
        min-height: 100vh;
      }

      .product-categories-header18 {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
      }

      .product-categories-title18 {
        margin: 0;
        font-size: 20px;
        font-weight: 600;
        color: #1f2937;
        font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      }

      .product-categories-actions18 {
        display: flex;
        gap: 10px;
        align-items: center;
      }

      .pc-btn-primary18 {
        background: #6366f1;
        color: white;
        border: none;
        padding: 10px 12px;
        border-radius: 6px;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 15px;
        font-weight: 500;
        font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      }

      .pc-btn-primary18:hover {
        background: #5855e7;
      }

      .pc-btn-secondary18 {
        background: #6366f1;
        color: white;
        border: none;
        padding: 10px 12px;
        border-radius: 6px;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 15px;
        font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      }

      .pc-btn-secondary18:hover {
        background: #5855e7;
      }

      .pc-dropdown-container18 {
        position: relative;
      }

      .pc-dropdown-menu18 {
        position: absolute;
        top: 100%;
        right: 0;
        background: white;
        border: 1px solid #e5e7eb;
        border-radius: 6px;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        z-index: 100;
        min-width: 120px;
        margin-top: 4px;
      }

      .pc-dropdown-item18 {
        padding: 10px 12px;
        display: flex;
        align-items: center;
        gap: 8px;
        cursor: pointer;
        font-size: 15px;
        color: #374151;
        font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      }

      .pc-dropdown-item18:hover {
        background: #f3f4f6;
      }

      .product-categories-table18 {
        background: white;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      }

      .pc-table-header18 {
        display: grid;
        grid-template-columns: 2fr 2fr 1fr 1fr;
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

      .pc-table-row18 {
        display: grid;
        grid-template-columns: 2fr 2fr 1fr 1fr;
        gap: 20px;
        padding: 16px 20px;
        border-bottom: 1fr solid #f3f4f6;
        align-items: center;
      }

      .pc-table-row18:hover {
        background: #f9fafb;
      }

      .pc-status18 {
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 13px;
        font-weight: 500;
        font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      }

      .pc-status18.active18 {
        background: #dcfce7;
        color: #16a34a;
      }

      .pc-status18.inactive18 {
        background: #fee2e2;
        color: #dc2626;
      }

      .pc-col-action18 {
        display: flex;
        gap: 8px;
      }

      .pc-action-btn18 {
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

      .pc-view-btn18 {
        background: #f8d7da;
      }

      .pc-view-btn18:hover {
        background: #f1aeb5;
        transform: scale(1.05);
      }

      .pc-edit-btn18 {
        background: #d1e7dd;
      }

      .pc-edit-btn18:hover {
        background: #a3cfbb;
        transform: scale(1.05);
      }

      .pc-delete-btn18 {
        background: #fff3cd;
      }

      .pc-delete-btn18:hover {
        background: #ffeaa7;
        transform: scale(1.05);
      }

      .pc-table-footer18 {
        padding: 16px 20px;
        font-size: 15px;
        color: #6b7280;
        background: #f9fafb;
        font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      }

      .pc-modal-overlay Taxes and Charges
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

      .pc-modal18 {
        background: white;
        border-radius: 8px;
        width: 600px;
        max-width: 90vw;
        max-height: 90vh;
        overflow: auto;
      }

      .pc-view-modal18 {
        background: white;
        border-radius: 8px;
        width: 400px;
        max-width: 90vw;
      }

      .pc-modal-header18 {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px;
        border-bottom: 1px solid #e5e7eb;
      }

      .pc-modal-title18 {
        margin: 0;
        font-size: 20px;
        font-weight: 600;
        color: #1f2937;
        font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      }

      .pc-close-btn18 {
        background: none;
        border: none;
        cursor: pointer;
        padding: 4px;
        color: #6b7280;
        font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      }

      .pc-close-btn18:hover {
        color: #374151;
      }

      .pc-modal-body18 {
        padding: 20px;
      }

      .pc-form-row18 {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 20px;
      }

      .pc-form-group18 {
        margin-bottom: 20px;
      }

      .pc-form-label18 {
        display: block;
        font Parkerized: 13px;
        font-weight: 600;
        color: #374151;
        margin-bottom: 8px;
        text-transform: uppercase;
        font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      }

      .pc-required18 {
        color: #ef4444;
        font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      }

      .pc-form-input18 {
        width: 100%;
        padding: 12px;
        border: 1px solid #d1d5db;
        border-radius: 6px;
        font-size: 15px;
        box-sizing: border-box;
        font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      }

      .pc-form-input18:focus {
        outline: none;
        border-color: #6366f1;
        box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
      }

      .pc-form-textarea18 {
        width: 100%;
        padding: 12px;
        border: 1px solid #d1d5db;
        border-radius: 6px;
        font-size: 15px;
        min-height: 80px;
        resize: vertical;
        box-sizing: border-box;
        font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      }

      .pc-form-textarea18:focus {
        outline: none;
        border-color: #6366f1;
        box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
      }

      .pc-radio-group18 {
        display: flex;
        gap: 20px;
        margin-top: 8px;
      }

      .pc-radio-label18 {
        display: flex;
        align-items: center;
        gap: 8px;
        cursor: pointer;
        font-size: 15px;
        text-transform: none;
        font-weight: normal;
        font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      }

      .pc-radio-label18 input[type="radio"] {
        margin: 0;
      }

      .pc-file-upload18 {
        display: flex;
        align-items: center;
        gap: 12px;
      }

      .pc-file-input18 {
        display: none;
      }

      .pc-file-label18 {
        padding: 12px 16px;
        background: #f3f4f6;
        border: 1px solid #d1d5db;
        border-radius: 6px;
        cursor: pointer;
        font-size: 15px;
        color: #374151;
        font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      }

      .pc-file-label18:hover {
        background: #e5e7eb;
      }

      .pc-file-name18 {
        font-size: 15px;
        color: #6b7280;
        font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      }

      .pc-modal-footer18 {
        display: flex;
        justify-content: flex-end;
        gap: 12px;
        padding: 20px;
        border-top: 1px solid #e5e7eb;
      }

      .pc-view-body18 {
        padding: 20px;
      }

      .pc-view-row18 {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 12px 0;
        border-bottom: 1px solid #f3f4f6;
      }

      .pc-view-row18:last-child {
        border-bottom: none;
      }

      .pc-view-label18 {
        font-size: 13px;
        font-weight: 600;
        color: #6b7280;
        text-transform: uppercase;
        font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      }

      .pc-view-value18 {
        font-size: 15px;
        color: #1f2937;
        font-weight: 500;
        font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      }

      .pc-delete-modal18 {
        background: white;
        border-radius: 8px;
        padding: 40px;
        text-align: center;
        width: 400px;
        max-width: 90vw;
      }

      .pc-delete-icon18 {
        margin-bottom: 20px;
      }

      .pc-delete-title18 {
        margin: 0 0 10px 0;
        font-size: 20px;
        color: #1f2937;
        font-weight: 600;
        font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      }

      .pc-delete-message18 {
        margin: 0 0 30px 0;
        color: #6b7280;
        font-size: 15px;
        font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      }

      .pc-delete-actions18 {
        display: flex;
        gap: 12px;
        justify-content: center;
      }

      .pc-btn-danger18 {
        background: #6366f1;
        color: white;
        border: none;
        padding: 12px 24px;
        border-radius: 6px;
        cursor: pointer;
        font-size: 15px;
        font-weight: 500;
        font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      }

      .pc-btn-danger18:hover {
        background: #5855e7;
      }

      .pc-btn-cancel18 {
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

      .pc-btn-cancel18:hover {
        background: #4b5563;
      }
    `}</style>
  </div>
);
};

export default ProductCategoriesComponent;