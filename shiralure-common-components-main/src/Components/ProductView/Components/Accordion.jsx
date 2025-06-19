import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';

const Accordion = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="accordion-item">
      <button 
        className={`accordion-button ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="accordion-title">{title}</span>
        <ChevronRight className={`accordion-icon ${isOpen ? 'rotated' : ''}`} />
      </button>
      {isOpen && (
        <div className="accordion-content">
          {content}
        </div>
      )}
    </div>
  );
};

export default Accordion; 