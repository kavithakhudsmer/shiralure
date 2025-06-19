import React from 'react';

const QuantitySelector = ({ quantity, setQuantity }) => {
  const handleIncrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div>
      <p className="quantity-label">Quantity</p>
      <div className="quantity-control">
        <button onClick={handleDecrementQuantity} className="quantity-button decrease">-</button>
        <input type="text" value={quantity} readOnly className="quantity-input" />
        <button onClick={handleIncrementQuantity} className="quantity-button increase">+</button>
      </div>
    </div>
  );
};

export default QuantitySelector; 