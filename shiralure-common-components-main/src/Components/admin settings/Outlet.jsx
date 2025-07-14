import React, { useState } from 'react';
import { Eye, Edit, Trash2, Plus, X } from 'lucide-react';
import './Outlet.css';

const Outlets = () => {
  const [outlets, setOutlets] = useState([
    {
      id: 1,
      name: 'RAMYA',
      place: 'Madurai',
      email: 'ramya@outlet.com',
      phone: '+91 9876543210',
      city: 'Madurai',
      address: '123 Main Street, Madurai',
      zipCode: '625001',
      latitude: '9.9252',
      longitude: '78.1198',
      status: 'Active'
    }
  ]);

  const [modals, setModals] = useState({
    view: false,
    edit: false,
    add: false,
    delete: false
  });

  const [selectedOutlet, setSelectedOutlet] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    address: '',
    zipCode: '',
    latitude: '',
    longitude: '',
    status: 'Active'
  });

  const openModal = (type, outlet = null) => {
    setSelectedOutlet(outlet);
    if (type === 'edit' && outlet) {
      setFormData(outlet);
    } else if (type === 'add') {
      setFormData({
        name: '',
        email: '',
        phone: '',
        city: '',
        address: '',
        zipCode: '',
        latitude: '',
        longitude: '',
        status: 'Active'
      });
    }
    setModals({ ...modals, [type]: true });
  };

  const closeModal = (type) => {
    setModals({ ...modals, [type]: false });
    setSelectedOutlet(null);
  };

  const closeAllModals = () => {
    setModals({
      view: false,
      edit: false,
      add: false,
      delete: false
    });
    setSelectedOutlet(null);
  };

  const handleSave = () => {
    if (modals.edit) {
      setOutlets(outlets.map(outlet =>
        outlet.id === selectedOutlet.id ? { ...formData, id: selectedOutlet.id, place: formData.city } : outlet
      ));
    } else if (modals.add) {
      const newOutlet = {
        ...formData,
        id: Math.max(...outlets.map(o => o.id)) + 1,
        place: formData.city
      };
      setOutlets([...outlets, newOutlet]);
    }
    closeAllModals();
  };

  const handleDelete = () => {
    setOutlets(outlets.filter(outlet => outlet.id !== selectedOutlet.id));
    closeAllModals();
  };

  const handleClear = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      city: '',
      address: '',
      zipCode: '',
      latitude: '',
      longitude: '',
      status: 'Active'
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const renderTableView = () => (
    <div className="outlet-container">
      <div className="outlet-header">
        <h2 className="outlet-title">OUTLETS</h2>
        <div className="outlet-actions">
          <button className="outlet-btn outlet-btn-add" onClick={() => openModal('add')}>
            <Plus size={18} />Add
          </button>
        </div>
      </div>
      <div className="outlet-table-container">
        <table className="outlet-table">
          <thead>
            <tr>
              <th>NAME</th>
              <th>PLACE</th>
              <th>STATUS</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {outlets.map(outlet => (
              <tr key={outlet.id}>
                <td>{outlet.name}</td>
                <td>{outlet.place}</td>
                <td>
                  <span className={`outlet-status ${outlet.status.toLowerCase()}`}>
                    {outlet.status}
                  </span>
                </td>
                <td>
                  <div className="outlet-action-buttons">
                    <button
                      className="outlet-action-btn outlet-view-btn"
                      onClick={() => openModal('view', outlet)}
                      title="View"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      className="outlet-action-btn outlet-edit-btn"
                      onClick={() => openModal('edit', outlet)}
                      title="Edit"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      className="outlet-action-btn outlet-delete-btn"
                      onClick={() => openModal('delete', outlet)}
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="outlet-table-footer">
          Showing 1 out of {outlets.length} entries
        </div>
      </div>
    </div>
  );

  const renderViewModal = () => (
    <div className="outlet-modal-overlay" onClick={() => closeModal('view')}>
      <div className="outlet-modal-content outlet-view-modal" onClick={(e) => e.stopPropagation()}>
        <div className="outlet-view-modal-header">
          <h3 className="outlet-view-modal-title">OUTLETS</h3>
          <button className="outlet-view-modal-close" onClick={() => closeModal('view')}>
            <X size={18} />
          </button>
        </div>
        <div className="outlet-view-modal-body">
          <div className="outlet-view-detail-item">
            <label>NAME :</label>
            <span>{selectedOutlet?.name}</span>
          </div>
          <div className="outlet-view-detail-item">
            <label>STATUS :</label>
            <span className={`outlet-view-status ${selectedOutlet?.status?.toLowerCase()}`}>
              {selectedOutlet?.status}
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderFormModal = (isEdit = false) => (
    <div className="outlet-modal-overlay" onClick={() => closeModal(isEdit ? 'edit' : 'add')}>
      <div className="outlet-modal-content outlet-form-modal" onClick={(e) => e.stopPropagation()}>
        <div className="outlet-form-modal-header">
          <h3 className="outlet-form-modal-title">OUTLETS</h3>
          <button className="outlet-form-modal-close" onClick={() => closeModal(isEdit ? 'edit' : 'add')}>
            <X size={18} />
          </button>
        </div>
        <div className="outlet-form-modal-body">
          <div className="outlet-form-grid">
            <div className="outlet-form-group">
              <label>NAME *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="outlet-form-group">
              <label>LATITUDE/LONGITUDE</label>
              <input
                type="text"
                name="latitude"
                value={formData.latitude}
                onChange={handleInputChange}
                placeholder=""
              />
            </div>
            <div className="outlet-form-group">
              <label>EMAIL</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="outlet-form-group">
              <label>PHONE</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>
            <div className="outlet-form-group">
              <label>CITY *</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="outlet-form-group">
              <label>ADDRESS *</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="outlet-form-group">
              <label>ZIP CODE *</label>
              <input
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="outlet-form-group">
              <label>STATUS *</label>
              <div className="outlet-radio-group">
                <label className="outlet-radio-label">
                  <input
                    type="radio"
                    name="status"
                    value="Active"
                    checked={formData.status === 'Active'}
                    onChange={handleInputChange}
                  />
                  Active
                </label>
                <label className="outlet-radio-label">
                  <input
                    type="radio"
                    name="status"
                    value="Inactive"
                    checked={formData.status === 'Inactive'}
                    onChange={handleInputChange}
                  />
                  Inactive
                </label>
              </div>
            </div>
            <div className="outlet-form-group outlet-full-width">
              <label>ADDRESS *</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                rows="4"
                required
              ></textarea>
            </div>
          </div>
        </div>
        <div className="outlet-form-modal-footer">
          <button className="outlet-btn-save-primary" onClick={handleSave}>
            SAVE
          </button>
          <button className="outlet-btn-clear-secondary" onClick={handleClear}>
            CLEAR
          </button>
        </div>
      </div>
    </div>
  );

  const renderDeleteModal = () => (
    <div className="outlet-modal-overlay" onClick={() => closeModal('delete')}>
      <div className="outlet-modal-content outlet-delete-modal" onClick={(e) => e.stopPropagation()}>
        <div className="outlet-delete-modal-content">
          <div className="outlet-delete-modal-icon">
            <div className="outlet-warning-circle">
              <span className="outlet-exclamation">!</span>
            </div>
          </div>
          <h3 className="outlet-delete-modal-title">Are you sure ?</h3>
          <p className="outlet-delete-modal-message">You will not be able to recover the deleted record!</p>
          <div className="outlet-delete-modal-actions">
            <button className="outlet-btn-delete-yes" onClick={handleDelete}>
              Yes, Delete it !
            </button>
            <button className="outlet-btn-delete-no" onClick={() => closeModal('delete')}>
              No, Cancel !
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {renderTableView()}
      {modals.view && renderViewModal()}
      {modals.edit && renderFormModal(true)}
      {modals.add && renderFormModal(false)}
      {modals.delete && renderDeleteModal()}
    </>
  );
};

export default Outlets;
