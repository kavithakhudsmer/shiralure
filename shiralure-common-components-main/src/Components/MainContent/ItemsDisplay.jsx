import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import productData from '../../data/ProductData.js';
import './ItemsDisplay.css';

function ItemsDisplay() {
  const { category, subcategory } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    priceRange: [0, 100000],
    brands: [],
    colors: [],
    sizes: []
  });
  const [selectedFilters, setSelectedFilters] = useState({
    brands: [],
    colors: [],
    sizes: []
  });
  const [sortOption, setSortOption] = useState('relevance');

  useEffect(() => {
    // Fetch products based on category and subcategory
    setLoading(true);
    
    try {
      const formattedCategory = category.toLowerCase();
      const formattedSubcategory = subcategory.toLowerCase().replace(/-/g, ' ').replace(/and/g, '&');
      
      console.log(`Looking for products in category: ${formattedCategory}, subcategory: ${formattedSubcategory}`);
      
      // Find the closest matching subcategory
      let matchedSubcategory = null;
      let productsData = [];
      
      if (productData[formattedCategory]) {
        // Try exact match first
        if (productData[formattedCategory][subcategory]) {
          matchedSubcategory = subcategory;
        } else {
          // Try to find the closest match
          const subcategories = Object.keys(productData[formattedCategory]);
          for (const sub of subcategories) {
            const formattedSub = sub.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and');
            if (formattedSub === subcategory) {
              matchedSubcategory = sub;
              break;
            }
          }
        }
        
        if (matchedSubcategory) {
          productsData = productData[formattedCategory][matchedSubcategory];
        }
      }
      
      if (productsData && productsData.length > 0) {
        setProducts(productsData);
        
        // Extract filter options
        const brands = [...new Set(productsData.map(product => product.brand))];
        const colors = [...new Set(productsData.map(product => product.color))];
        const sizes = [...new Set(productsData.map(product => product.size).filter(Boolean))];
        
        // Find min and max prices
        const prices = productsData.map(product => product.price);
        const minPrice = Math.min(...prices);
        const maxPrice = Math.max(...prices);
        
        setFilters({
          priceRange: [minPrice, maxPrice],
          brands,
          colors,
          sizes
        });
      } else {
        console.log('No products found for this category/subcategory');
        setProducts([]);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
    }
    
    setLoading(false);
  }, [category, subcategory]);

  // Filter products based on selected filters
  const filteredProducts = products.filter(product => {
    // Price filter
    if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
      return false;
    }
    
    // Brand filter
    if (selectedFilters.brands.length > 0 && !selectedFilters.brands.includes(product.brand)) {
      return false;
    }
    
    // Color filter
    if (selectedFilters.colors.length > 0 && !selectedFilters.colors.includes(product.color)) {
      return false;
    }
    
    // Size filter
    if (selectedFilters.sizes.length > 0 && !selectedFilters.sizes.includes(product.size)) {
      return false;
    }
    
    return true;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case 'price-low-high':
        return a.price - b.price;
      case 'price-high-low':
        return b.price - a.price;
      case 'discount':
        return b.discount - a.discount;
      default:
        return 0; // relevance - keep original order
    }
  });

  const handleFilterChange = (filterType, value) => {
    setSelectedFilters(prev => {
      const current = [...prev[filterType]];
      
      if (current.includes(value)) {
        // Remove the value if already selected
        return {
          ...prev,
          [filterType]: current.filter(item => item !== value)
        };
      } else {
        // Add the value if not already selected
        return {
          ...prev,
          [filterType]: [...current, value]
        };
      }
    });
  };

  const handlePriceRangeChange = (min, max) => {
    setFilters(prev => ({
      ...prev,
      priceRange: [min, max]
    }));
  };

  const handleSortChange = (option) => {
    setSortOption(option);
  };

  const clearAllFilters = () => {
    setSelectedFilters({
      brands: [],
      colors: [],
      sizes: []
    });
    setFilters(prev => ({
      ...prev,
      priceRange: [0, 100000]
    }));
  };

  // Function to navigate to home page
  const navigateToHome = () => {
    navigate('/');
  };

  if (loading) {
    return <div className="loading">Loading products...</div>;
  }

  return (
    <div className="product-listing-page">
      <div className="breadcrumb">
        <span onClick={navigateToHome} className="breadcrumb-link">Home</span> /
        <span>{category}</span> /
        <span>{subcategory.replace(/-/g, ' ')}</span>
      </div>
      
      <h1 className="page-title">{subcategory.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</h1>
      
      <div className="product-container">
        <div className="filters-section">
          <div className="filter-header">
            <h3>Filters</h3>
            <button className="clear-filters" onClick={clearAllFilters}>Clear All</button>
          </div>
          
          <div className="filter-group">
            <h4>Price Range</h4>
            <div className="price-slider">
              <input
                type="range"
                min={filters.priceRange[0]}
                max={filters.priceRange[1]}
                value={filters.priceRange[0]}
                onChange={(e) => handlePriceRangeChange(parseInt(e.target.value), filters.priceRange[1])}
              />
              <input
                type="range"
                min={filters.priceRange[0]}
                max={filters.priceRange[1]}
                value={filters.priceRange[1]}
                onChange={(e) => handlePriceRangeChange(filters.priceRange[0], parseInt(e.target.value))}
              />
              <div className="price-range-display">
                ₹{filters.priceRange[0]} - ₹{filters.priceRange[1]}
              </div>
            </div>
          </div>
          
          <div className="filter-group">
            <h4>Brand</h4>
            {filters.brands.map((brand, index) => (
              <div className="filter-option" key={index}>
                <input
                  type="checkbox"
                  id={`brand-${index}`}
                  checked={selectedFilters.brands.includes(brand)}
                  onChange={() => handleFilterChange('brands', brand)}
                />
                <label htmlFor={`brand-${index}`}>{brand}</label>
              </div>
            ))}
          </div>
          
          <div className="filter-group">
            <h4>Color</h4>
            {filters.colors.map((color, index) => (
              <div className="filter-option" key={index}>
                <input
                  type="checkbox"
                  id={`color-${index}`}
                  checked={selectedFilters.colors.includes(color)}
                  onChange={() => handleFilterChange('colors', color)}
                />
                <label htmlFor={`color-${index}`}>
                  <span className="color-swatch" style={{ backgroundColor: color }}></span>
                  {color.charAt(0).toUpperCase() + color.slice(1)}
                </label>
              </div>
            ))}
          </div>
          
          {filters.sizes.length > 0 && (
            <div className="filter-group">
              <h4>Size</h4>
              {filters.sizes.map((size, index) => (
                <div className="filter-option" key={index}>
                  <input
                    type="checkbox"
                    id={`size-${index}`}
                    checked={selectedFilters.sizes.includes(size)}
                    onChange={() => handleFilterChange('sizes', size)}
                  />
                  <label htmlFor={`size-${index}`}>{size}</label>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="products-section">
          <div className="sort-section">
            <span>Sort By: </span>
            <select value={sortOption} onChange={(e) => handleSortChange(e.target.value)}>
              <option value="relevance">Relevance</option>
              <option value="price-low-high">Price: Low to High</option>
              <option value="price-high-low">Price: High to Low</option>
              <option value="discount">Discount</option>
            </select>
            <span className="product-count">{sortedProducts.length} Products</span>
          </div>
          
          {sortedProducts.length === 0 ? (
            <div className="no-products">
              <h3>No products found</h3>
              <p>Try adjusting your filters or check back later for new arrivals.</p>
            </div>
          ) : (
            // In the product grid section, replace the existing product card rendering with this version:

<div className="product-grid">
  {sortedProducts.map(product => (
    <div className="product-card" key={product.id}>
      <div className="product-image">
        <img src={product.image} alt={product.name} />
        <button className="wishlist-button heart-icon">
          <i className="fas fa-heart"></i>
        </button>
      </div>
      <div className="product-info">
        <h3 className="product-title">{product.name}</h3>
        <p className="product-discount">{product.discount}% OFF</p>
      </div>
    </div>
  ))}
</div>

          )}
        </div>
      </div>
    </div>
  );
}

export default ItemsDisplay;
