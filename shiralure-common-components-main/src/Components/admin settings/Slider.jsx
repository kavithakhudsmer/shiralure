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
    <div className="slider-management-container23">
      {/* Header */}
      <div className="slider-management-header23">
        <h2 className="slider-management-title23">Sliders</h2>
        <button className="slider-add-btn23" onClick={handleAddNew}>
          <Plus size={16} />Add
        </button>
      </div>

      {/* Table */}
      <div className="slider-management-table23">
        <div className="slider-table-header23">
          <div className="slider-th23">TITLE</div>
          <div className="slider-th23">STATUS</div>
          <div className="slider-th23">ACTION</div>
        </div>
        {sliders.map((slider) => (
          <div key={slider.id} className="slider-table-row23">
            <div className="slider-td23">{slider.title}</div>
            <div className="slider-td23">
              <span className={`slider-status23 slider-status-${slider.status.toLowerCase()}23`}>
                {slider.status}
              </span>
            </div>
            <div className="slider-td23 slider-actions23">
              <button className="slider-action-btn23 slider-view-btn23" onClick={() => handleView(slider)}>
                <Eye size={14} />
              </button>
              <button className="slider-action-btn23 slider-edit-btn23" onClick={() => handleEdit(slider)}>
                <Edit size={14} />
              </button>
              <button className="slider-action-btn23 slider-delete-btn23" onClick={() => handleDelete(slider)}>
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="slider-table-info23">
        Showing {sliders.length} out of {sliders.length} entries
      </div>

      {/* Add/Edit Modal */}
      {showAddModal && (
        <div className="slider-modal-overlay23">
          <div className="slider-modal23">
            <div className="slider-modal-header23">
              <h3 className="slider-modal-title23">SLIDERS</h3>
              <button className="slider-close-btn23" onClick={() => setShowAddModal(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="slider-modal-body23">
              <div className="slider-form-group23">
                <label className="slider-form-label23">TITLE <span className="slider-required23">*</span></label>
                <input
                  type="text"
                  className="slider-form-input23"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                />
              </div>
              <div className="slider-form-group23">
                <label className="slider-form-label23">LINK</label>
                <input
                  type="text"
                  className="slider-form-input23"
                  value={formData.link}
                  onChange={(e) => setFormData({...formData, link: e.target.value})}
                />
              </div>
              <div className="slider-form-row23">
                <div className="slider-form-group23">
                  <label className="slider-form-label23">IMAGE <span className="slider-required23">*</span></label>
                  <div className="slider-file-input23">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      id="slider-file-upload23"
                      style={{ display: 'none' }}
                    />
                    <label htmlFor="slider-file-upload23" className="slider-file-btn23">
                      <Upload size={16} />
                      Choose file
                    </label>
                    <span className="slider-file-text23">
                      {formData.image ? formData.image.name : 'No file chosen'}
                    </span>
                  </div>
                </div>
                <div className="slider-form-group23">
                  <label className="slider-form-label23">STATUS <span className="slider-required23">*</span></label>
                  <div className="slider-radio-group23">
                    <label className="slider-radio-label23">
                      <input
                        type="radio"
                        className="slider-radio-input23"
                        value="Active"
                        checked={formData.status === 'Active'}
                        onChange={(e) => setFormData({...formData, status: e.target.value})}
                      />
                      Active
                    </label>
                    <label className="slider-radio-label23">
                      <input
                        type="radio"
                        className="slider-radio-input23"
                        value="Inactive"
                        checked={formData.status === 'Inactive'}
                        onChange={(e) => setFormData({...formData, status: e.target.value})}
                      />
                      Inactive
                    </label>
                  </div>
                </div>
              </div>
              <div className="slider-form-group23">
                <label className="slider-form-label23">DESCRIPTION</label>
                <textarea
                  className="slider-form-textarea23"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows="4"
                />
              </div>
              <div className="slider-form-actions23">
                <button className="slider-save-btn23" onClick={handleSave}>
                  SAVE
                </button>
                <button className="slider-clear-btn23" onClick={handleClear}>
                  CLEAR
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Modal */}
      {showViewModal && selectedSlider && (
        <div className="slider-modal-overlay23">
          <div className="slider-view-modal23">
            <div className="slider-view-header23">
              <h3 className="slider-view-title23">SLIDERS</h3>
              <button className="slider-close-btn23" onClick={() => setShowViewModal(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="slider-view-content23">
              <div className="slider-preview23">
                <img src={selectedSlider.image} alt={selectedSlider.title} className="slider-preview-image23" />
                <div className="slider-info23">
                  <h4 className="slider-info-title23">{selectedSlider.title}</h4>
                  <span className={`slider-status23 slider-status-${selectedSlider.status.toLowerCase()}23`}>
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
        <div className="slider-modal-overlay23">
          <div className="slider-delete-modal23">
            <div className="slider-delete-icon23">
              <AlertCircle size={48} />
            </div>
            <h3 className="slider-delete-title23">Are you sure ?</h3>
            <p className="slider-delete-text23">You will not be able to recover the deleted record!</p>
            <div className="slider-delete-actions23">
              <button className="slider-confirm-btn23" onClick={confirmDelete}>
                Yes, Delete it !
              </button>
              <button className="slider-cancel-btn23" onClick={() => setShowDeleteModal(false)}>
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