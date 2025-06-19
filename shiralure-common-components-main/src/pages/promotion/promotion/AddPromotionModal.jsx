import React from 'react';
import './AddPromotionModal.css'; // Create this CSS file for the modal styles
import { FaCheck, FaTimes } from 'react-icons/fa'; // Import icons

const AddPromotionModal = ({ onClose, onSave }) => {
  const [promotion, setPromotion] = React.useState({
    name: '',
    status: 'Available', // Default status as per screenshot
    image: null, // To store the selected file object
    imageName: 'No file chosen', // To display the file name
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPromotion(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPromotion(prev => ({
        ...prev,
        image: file,
        imageName: file.name
      }));
    } else {
      setPromotion(prev => ({
        ...prev,
        image: null,
        imageName: 'No file chosen'
      }));
    }
  };

  const handleClear = () => {
    setPromotion({
      name: '',
      status: 'Available',
      image: null,
      imageName: 'No file chosen',
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Map 'Available'/'Unavailable' from modal to 'Active'/'Inactive' for dashboard
    const statusForDashboard = promotion.status === 'Available' ? 'Active' : 'Inactive';
    onSave({ ...promotion, status: statusForDashboard });
  };

  return (
    <div className="mumodal-overlay">
      <div className="mumodal-content">
        <div className="mumodal-header">
          <h2>Promotions</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="muform-group">
            <label>Name <span className="required-asterisk">*</span></label>
            <input
              type="text"
              name="name"
              value={promotion.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="muform-group">
            <label>Status <span className="required-asterisk">*</span></label>
            <div className="muradio-group">
              <label className="muradio-label">
                <input
                  type="radio"
                  name="status"
                  value="Available"
                  checked={promotion.status === 'Available'}
                  onChange={handleChange}
                  required
                />
                Available
              </label>
              <label className="muradio-label">
                <input
                  type="radio"
                  name="status"
                  value="Unavailable"
                  checked={promotion.status === 'Unavailable'}
                  onChange={handleChange}
                  required
                />
                Unavailable
              </label>
            </div>
          </div>
          <div className="muform-group">
            <label>Image (548PX.140PX) <span className="required-asterisk">*</span></label>
            <div className="mufile-input-wrapper">
              <input
                type="file"
                id="image-upload"
                className="mufile-input"
                onChange={handleImageChange}
                required
              />
              <label htmlFor="image-upload" className="muchoose-file-button">
                Choose File
              </label>
              <span className="mufile-name-display">{promotion.imageName}</span>
            </div>
          </div>
          <div className="mumodal-actions">
            <button type="button" className="muclear-btn" onClick={handleClear}>
              <FaTimes className="mubutton-icon" size={20} /> Clear
            </button>
            <button type="submit" className="musave-btn">
              <FaCheck className="mubutton-icon" size={20}/> Save
            </button>
          </div> 
        </form>
      </div>
    </div>
  );
};

export default AddPromotionModal;