import React from 'react';
import sizeGuideImage from '../../../assets/sizeChart.webp';

const SizeSelector = ({ product, selectedSize, setSelectedSize, showSizeGuide, setShowSizeGuide }) => {
  return (
    <div>
      <span className="size-label">Select Size</span>
      <div className="size-options">
        {product.size && Array.isArray(product.size) ? (
          product.size.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`size-option ${selectedSize === size ? 'selected' : 'unselected'}`}
            >
              {size}
            </button>
          ))
        ) : (
          <p>Size not available</p>
        )}
      </div>

      <div className="size-suggestion">
        <p className="size-text">Suggestion: Pick your normal size</p>
        <button
          onClick={() => setShowSizeGuide(true)}
          className="size-guide-link"
        >
          Size Guide
        </button>
      </div>

      {/* Size Guide Modal */}
      {showSizeGuide && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button
              onClick={() => setShowSizeGuide(false)}
              className="modal-close"
              aria-label="Close size guide"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            <h2 className="modal-title">Size Guide</h2>

            <div className="size-chart-container">
              <div className="size-chart-image">
                <img src={sizeGuideImage} alt="Size Chart" />
              </div>
            </div>

            <div className="size-table">
              <table>
                <thead>
                  <tr>
                    <th>Size</th>
                    <th>XS</th>
                    <th>S</th>
                    <th>M</th>
                    <th>L</th>
                    <th>XL</th>
                    <th>XXL</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>(A) Chest</td>
                    <td>36"</td>
                    <td>38"</td>
                    <td>40"</td>
                    <td>42"</td>
                    <td>44"</td>
                    <td>46"</td>
                  </tr>
                  <tr>
                    <td>(B) Length</td>
                    <td>27"</td>
                    <td>28"</td>
                    <td>29"</td>
                    <td>30"</td>
                    <td>31"</td>
                    <td>32"</td>
                  </tr>
                  <tr>
                    <td>(C) Shoulder</td>
                    <td>16"</td>
                    <td>17"</td>
                    <td>18"</td>
                    <td>19"</td>
                    <td>20"</td>
                    <td>21"</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="size-note">NOTE: All measurements are in inches (inch)</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SizeSelector; 