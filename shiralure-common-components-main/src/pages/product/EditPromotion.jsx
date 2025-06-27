import React from 'react';

import { FaCamera, FaTimes } from 'react-icons/fa';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { TiTick } from "react-icons/ti";
import { IoMdClose } from "react-icons/io";
import './EditPromotion.css';

const EditPromotionModal = ({ promotion, onClose, onSave }) => {
  const [description, setDescription] = React.useState('');

  return (
    <div className="eepp-modal-overlay">
      <div className="eepp-modal">
        <div className="eepp-modal-header">
          <h2>Products</h2>
          <button className="eepp-modal-close" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        <div className="eepp-modal-body">
          <form className="eepp-modal-form">
            <div className="eepp-modal-row">
              <div className="eepp-form-group">
                <label>NAME *</label>
                <input type="text" />
              </div>
              <div className="eepp-form-group">
                <label>SKU *</label>
                <input type="text" />
              </div>
            </div>

            <div className="eepp-modal-row">
              <div className="eepp-form-group">
                <label>CATEGORY *</label>
                <select><option>--</option></select>
              </div>
              <div className="eepp-form-group">
                <label>BARCODE *</label>
                <input type="text" />
              </div>
            </div>

            <div className="eepp-modal-row">
              <div className="eepp-form-group">
                <label>TAX *</label>
                <select><option>--</option></select>
              </div>
              <div className="eepp-form-group">
                <label>SELLING PRICE *</label>
                <input type="number" />
              </div>
            </div>

            <div className="eepp-modal-row">
              <div className="eepp-form-group">
                <label>BRAND *</label>
                <select><option>--</option></select>
              </div>
              <div className="eepp-form-group">
                <label>STATUS *</label>
                <div className="radio-group">
                  <label><input type="radio" name="status" /> Available</label>
                  <label><input type="radio" name="status" /> Unavailable</label>
                </div>
              </div>
            </div>

            <div className="eepp-modal-row">
              <div className="eepp-form-group">
                <label>CAN PURCHASABLE *</label>
                <div className="radio-group">
                  <label><input type="radio" name="purchase" /> Yes</label>
                  <label><input type="radio" name="purchase" /> No</label>
                </div>
              </div>
              <div className="eepp-form-group">
                <label>SHOW STOCK OUT *</label>
                <div className="radio-group">
                  <label><input type="radio" name="stockout" /> Enable</label>
                  <label><input type="radio" name="stockout" /> Disable</label>
                </div>
              </div>
            </div>

            <div className="eepp-modal-row">
              <div className="eepp-form-group">
                <label>REFUNDABLE *</label>
                <div className="radio-group">
                  <label><input type="radio" name="refundable" /> Yes</label>
                  <label><input type="radio" name="refundable" /> No</label>
                </div>
              </div>
              <div className="eepp-form-group">
                <label>MAXIMUM PURCHASE QUANTITY *</label>
                <input type="number" />
              </div>
            </div>

            <div className="eepp-modal-row">
              <div className="eepp-form-group">
                <label>LOW STOCK QUANTITY WARNING *</label>
                <input type="number" />
              </div>
              <div className="eepp-form-group">
                <label>UNIT *</label>
                <select><option>--</option></select>
              </div>
            </div>

            <div className="eepp-modal-row">
              <div className="eepp-form-group">
                <label>WEIGHT</label>
                <input type="text" />
              </div>
              <div className="eepp-form-group">
                <label>TAGS</label>
                <input type="text" />
              </div>
            </div>

            <div className="eepp-form-group full-width">
              <label>IMAGE</label>
              <div className="eepp-image-upload">
                <FaCamera className="upload-icon" />
                <span>Click or drag to upload</span>
                <input type="file" accept="image/*" />
              </div>
            </div>

            <div className="eepp-form-group full-width">
              <label>DESCRIPTION</label>
              <ReactQuill
                value={description}
                onChange={setDescription}
                theme="snow"
                placeholder="Insert content here ..."
                style={{ backgroundColor: 'white', borderRadius: '6px' }}
              />
            </div>

            <div className="eepp-modal-footer-inline">
              <button type="reset" className="eeppclear-btn"><IoMdClose />Clear</button>
              <button type="submit" className="eeppsearch-btn"><TiTick />Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditPromotionModal;