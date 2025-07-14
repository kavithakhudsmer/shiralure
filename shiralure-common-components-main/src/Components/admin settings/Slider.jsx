import React, { useState } from 'react';
import { Plus, Eye, Edit, Trash2, X, Upload,  AlertCircle } from 'lucide-react';
import './Slider.css';

const Slider = () => {
  const [sliders, setSliders] = useState([
    {
      id: 1,
      title: 'Beauty products',
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=200&fit=crop',
      link: '#',
      description: 'Beauty products slider'
    },
    {
      id: 2,
      title: 'Herbal Beauty',
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=200&fit=crop',
      link: '#',
      description: 'Herbal beauty products'
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedSlider, setSelectedSlider] = useState(null);
  const [editingSlider, setEditingSlider] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    link: '',
    image: null,
    imagePreview: null,
    status: 'Active',
    description: ''
  });

  // Handle Add New
  const handleAddNew = () => {
    setEditingSlider(null);
    setFormData({
      title: '',
      link: '',
      image: null,
      imagePreview: null,
      status: 'Active',
      description: ''
    });
    setShowAddModal(true);
  };

  // Handle View
  const handleView = (slider) => {
    setSelectedSlider(slider);
    setShowViewModal(true);
  };

  // Handle Edit
  const handleEdit = (slider) => {
    setEditingSlider(slider);
    setFormData({
      title: slider.title,
      link: slider.link,
      image: null,
      imagePreview: slider.image,
      status: slider.status,
      description: slider.description
    });
    setShowAddModal(true);
  };

  // Handle Delete
  const handleDelete = (slider) => {
    setSelectedSlider(slider);
    setShowDeleteModal(true);
  };

  // Confirm Delete
  const confirmDelete = () => {
    setSliders(sliders.filter(s => s.id !== selectedSlider.id));
    setShowDeleteModal(false);
    setSelectedSlider(null);
  };

  // Handle Image Upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData({
          ...formData,
          image: file,
          imagePreview: e.target.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle Save
  const handleSave = () => {
    if (editingSlider) {
      setSliders(sliders.map(s =>
        s.id === editingSlider.id
          ? { ...s, ...formData, image: formData.imagePreview || s.image }
          : s
      ));
    } else {
      const newSlider = {
        id: Date.now(),
        ...formData,
        image: formData.imagePreview || 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=200&fit=crop'
      };
      setSliders([...sliders, newSlider]);
    }
    setShowAddModal(false);
  };

  // Handle Clear
  const handleClear = () => {
    setFormData({
      title: '',
      link: '',
      image: null,
      imagePreview: null,
      status: 'Active',
      description: ''
    });
  };

  return (
    <div className="slider-management-container">
      {/* Header */}
      <div className="slider-management-header">
        <h2 className="slider-management-title">SLIDERS</h2>
        <button className="slider-add-btn" onClick={handleAddNew}>
          <Plus size={16} />Add
        </button>
      </div>

      {/* Table */}
      <div className="slider-management-table">
        <div className="slider-table-header">
          <div className="slider-th">TITLE</div>
          <div className="slider-th">STATUS</div>
          <div className="slider-th">ACTION</div>
        </div>
        {sliders.map((slider) => (
          <div key={slider.id} className="slider-table-row">
            <div className="slider-td">{slider.title}</div>
            <div className="slider-td">
              <span className={`slider-status slider-status-${slider.status.toLowerCase()}`}>
                {slider.status}
              </span>
            </div>
            <div className="slider-td slider-actions">
              <button className="slider-action-btn slider-view-btn" onClick={() => handleView(slider)}>
                <Eye size={14} />
              </button>
              <button className="slider-action-btn slider-edit-btn" onClick={() => handleEdit(slider)}>
                <Edit size={14} />
              </button>
              <button className="slider-action-btn slider-delete-btn" onClick={() => handleDelete(slider)}>
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="slider-table-info">
        Showing {sliders.length} out of {sliders.length} entries
      </div>

      {/* Add/Edit Modal */}
      {showAddModal && (
        <div className="slider-modal-overlay">
          <div className="slider-modal">
            <div className="slider-modal-header">
              <h3 className="slider-modal-title">SLIDERS</h3>
              <button className="slider-close-btn" onClick={() => setShowAddModal(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="slider-modal-body">
              <div className="slider-form-group">
                <label className="slider-form-label">TITLE <span className="slider-required">*</span></label>
                <input
                  type="text"
                  className="slider-form-input"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                />
              </div>
              <div className="slider-form-group">
                <label className="slider-form-label">LINK</label>
                <input
                  type="text"
                  className="slider-form-input"
                  value={formData.link}
                  onChange={(e) => setFormData({...formData, link: e.target.value})}
                />
              </div>
              <div className="slider-form-row">
                <div className="slider-form-group">
                  <label className="slider-form-label">IMAGE <span className="slider-required">*</span></label>
                  <div className="slider-file-input">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      id="slider-file-upload"
                      style={{ display: 'none' }}
                    />
                    <label htmlFor="slider-file-upload" className="slider-file-btn">
                      <Upload size={16} />
                      Choose file
                    </label>
                    <span className="slider-file-text">
                      {formData.image ? formData.image.name : 'No file chosen'}
                    </span>
                  </div>
                </div>
                <div className="slider-form-group">
                  <label className="slider-form-label">STATUS <span className="slider-required">*</span></label>
                  <div className="slider-radio-group">
                    <label className="slider-radio-label">
                      <input
                        type="radio"
                        className="slider-radio-input"
                        value="Active"
                        checked={formData.status === 'Active'}
                        onChange={(e) => setFormData({...formData, status: e.target.value})}
                      />
                      Active
                    </label>
                    <label className="slider-radio-label">
                      <input
                        type="radio"
                        className="slider-radio-input"
                        value="Inactive"
                        checked={formData.status === 'Inactive'}
                        onChange={(e) => setFormData({...formData, status: e.target.value})}
                      />
                      Inactive
                    </label>
                  </div>
                </div>
              </div>
              <div className="slider-form-group">
                <label className="slider-form-label">DESCRIPTION</label>
                <textarea
                  className="slider-form-textarea"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows="4"
                />
              </div>
              <div className="slider-form-actions">
                <button className="slider-save-btn" onClick={handleSave}>
                  {/* <Upload size={16} /> */}
                  SAVE
                </button>
                <button className="slider-clear-btn" onClick={handleClear}>
                  CLEAR
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Modal */}
      {showViewModal && selectedSlider && (
        <div className="slider-modal-overlay">
          <div className="slider-view-modal">
            <div className="slider-view-header">
              <h3 className="slider-view-title">SLIDERS</h3>
              <button className="slider-close-btn" onClick={() => setShowViewModal(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="slider-view-content">
              <div className="slider-preview">
                <img src={selectedSlider.image} alt={selectedSlider.title} className="slider-preview-image" />
                <div className="slider-info">
                  <h4 className="slider-info-title">{selectedSlider.title}</h4>
                  <span className={`slider-status slider-status-${selectedSlider.status.toLowerCase()}`}>
                    {selectedSlider.status}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="slider-modal-overlay">
          <div className="slider-delete-modal">
            <div className="slider-delete-icon">
              <AlertCircle size={48} />
            </div>
            <h3 className="slider-delete-title">Are you sure ?</h3>
            <p className="slider-delete-text">You will not be able to recover the deleted record!</p>
            <div className="slider-delete-actions">
              <button className="slider-confirm-btn" onClick={confirmDelete}>
                Yes, Delete it !
              </button>
              <button className="slider-cancel-btn" onClick={() => setShowDeleteModal(false)}>
                No, Cancel !
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Slider;
