import React from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';
import './PromotionsFilter.css';
 
const PromotionsFilter = ({ onFilter, onClear }) => {
  const [filters, setFilters] = React.useState({
    name: '',
    type: '',
    status: ''
  });
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };
 
  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter(filters);
  };
 
  const handleClear = () => {
    setFilters({
      name: '',
      type: '',
      status: ''
    });
    onClear();
  };
 
  return (
    <div className="muthufilter-promotions-filter">
      <form onSubmit={handleSubmit}>
        <div className="muthufilter-filter-row">
          <div className="muthufilter-filter-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={filters.name}
              onChange={handleChange}
              // Removed the placeholder attribute from here
            />
          </div>
          <div className="muthufilter-filter-group">
            <label>Type</label>
            <select
              name="type"
              value={filters.type}
              onChange={handleChange}
            >
              <option value="">All Types</option>
              <option value="Small">Small</option>
              <option value="Big">Big</option>
            </select>
          </div>
          <div className="muthufilter-filter-group">
            <label>Status</label>
            <select
              name="status"
              value={filters.status}
              onChange={handleChange}
            >
              <option value="">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>
        <div className="muthufilter-filter-actions">
          <button type="submit" className="muthufilter-search-btn">
            <FaSearch /> Search
          </button>
          <button type="button" className="muthufilter-clear-btn" onClick={handleClear}>
            <FaTimes /> Clear
          </button>
        </div>
      </form>
    </div>
  );
};
 
export default PromotionsFilter;
 