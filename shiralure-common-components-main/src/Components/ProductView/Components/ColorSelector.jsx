import React from 'react';

const ColorSelector = ({ colorOptions, selectedColor, handleColorChange }) => {
  return (
    <div>
      <p className="color-label">Color: {colorOptions.find(c => c.id === selectedColor)?.name}</p>
      <div className="color-options">
        {colorOptions.map((color) => (
          <button
            key={color.id}
            onClick={() => handleColorChange(color.id)}
            className={`color-option ${selectedColor === color.id ? 'selected' : 'unselected'}`}
          >
            <img
              src={color.image}
              alt={color.name}
              className="color-image"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ColorSelector; 