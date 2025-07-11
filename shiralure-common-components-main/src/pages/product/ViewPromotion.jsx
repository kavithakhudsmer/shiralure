import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  FiInfo, FiImage, FiGrid, FiUpload, FiPlus, FiTrash2
} from 'react-icons/fi';
import { MdOutlineExpandMore } from 'react-icons/md';
import DeleteModal from './viewcomponents/DeleteModal';
import AddProductModal from './viewcomponents/AddProductModal';
import './ViewPromotion.css';
import { BiSolidOffer } from 'react-icons/bi';
import { MdVideoLibrary, MdOutlineLocalShipping } from 'react-icons/md';
import { TfiWorld } from 'react-icons/tfi';
import productsData from '../../data/products1.json'; // adjust based on file structure
const ViewPromotion = () => {
  const { id } = useParams();
  const [promotion, setPromotion] = useState(null);
  const [activeTab, setActiveTab] = useState('information');
  const [moreTab, setMoreTab] = useState(null);
  const [showMoreDropdown, setShowMoreDropdown] = useState(false);
  const [imagePreviewUrl, setImagePreviewUrl] = useState('');

  const [products, setProducts] = useState([
    { id: 1, name: 'Exclusive Products', price: '1921.00', status: 'Active' },
    { id: 2, name: 'Winter Products', price: '1921.00', status: 'Active' }
  ]);

  const [productToDelete, setProductToDelete] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const productOptions = [
    { id: 6, name: 'Summer Collection', price: '2500.00' },
    { id: 7, name: 'Spring Special', price: '1800.00' },
    { id: 8, name: 'Autumn Arrival', price: '2200.00' }
  ];

 useEffect(() => {
  const product = productsData.find(p => p.id === id);
  setPromotion(product);
}, [id]);

  const handleDeleteClick = (productId) => {
    setProductToDelete(productId);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setProducts(products.filter(product => product.id !== productToDelete));
    setShowDeleteModal(false);
    setProductToDelete(null);
  };

  const handleAddProduct = (selectedProduct) => {
    const productToAdd = productOptions.find(p => p.id === parseInt(selectedProduct));
    if (productToAdd) {
      setProducts([...products, {
        id: productToAdd.id,
        name: productToAdd.name,
        price: productToAdd.price,
        status: 'Active'
      }]);
    }
    setShowAddModal(false);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreviewUrl(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleMoreSelect = (tab) => {
    setMoreTab(tab);
    setShowMoreDropdown(false);
    setActiveTab(null);
  };

  const filteredProducts = products;

  if (!promotion) return <div className="vvp-view-promotion-page">Promotion not found</div>;

  return (
    <div className="vvp-view-promotion-page">
      <div className="vvp-header">
        <div className="vvp-header-left"><h1>Products</h1></div>
        <div className="vvp-header-right">
          <div className="vvp-breadcrumb">
            <a href="/admin/products" className="vvp-breadcrumb-home">Home</a>
            <span> &gt;&gt; </span>
            <a href="/" className="vvp-breadcrumb-promotions">Products</a>
          </div>
        </div>
      </div>

      <div className="vvp-tabs-container">
        <div className="vvp-tabs">
          <button className={`vvp-tab ${activeTab === 'information' ? 'vvp-active' : ''}`} onClick={() => { setActiveTab('information'); setMoreTab(null); }}>
            <FiInfo className="vvp-tab-icon" /> Information
          </button>
          <button className={`vvp-tab ${activeTab === 'images' ? 'vvp-active' : ''}`} onClick={() => { setActiveTab('images'); setMoreTab(null); }}>
            <FiImage className="vvp-tab-icon" /> Images
          </button>
          <button className={`vvp-tab ${activeTab === 'products' ? 'vvp-active' : ''}`} onClick={() => { setActiveTab('products'); setMoreTab(null); }}>
            <FiGrid className="vvp-tab-icon" /> Variation
          </button>

          <div className="vvp-tab-dropdown">
            <button
              className={`vvp-tab ${moreTab ? 'vvp-active' : ''}`}
              onClick={() => setShowMoreDropdown(!showMoreDropdown)}
            >
              <MdOutlineExpandMore className="vvp-tab-icon" size={20} />
              More
            </button>

            {showMoreDropdown && (
              <div className="vvp-dropdown-menu">
                <div className="vvp-dropdown-item" onClick={() => handleMoreSelect('offer')}>
                  <FiGrid className="vvp-dropdown-icon" /> Offer
                </div>
                <div className="vvp-dropdown-item" onClick={() => handleMoreSelect('videos')}>
                  <FiImage className="vvp-dropdown-icon" /> Video
                </div>
                <div className="vvp-dropdown-item" onClick={() => handleMoreSelect('shipping')}>
                  <FiUpload className="vvp-dropdown-icon" /> Shipping & Return
                </div>
                <div className="vvp-dropdown-item" onClick={() => handleMoreSelect('seo')}>
                  <FiInfo className="vvp-dropdown-icon" /> SEO
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="vvp-tab-content">
        {activeTab === 'information' && (
          <div className="vvp-info-card">
            <div className="vvp-info-title">Information</div>
            <div className="vvp-info-grid">
              <div className="vvp-info-row">
                <div className="vvp-info-label">Name</div>
                <div className="vvp-info-value">{promotion.name}</div>
                <div className="vvp-info-label">Slug</div>
                <div className="vvp-info-value">{promotion.name?.toLowerCase().replace(/\s+/g, '-')}</div>
              </div>
              <div className="vvp-info-row">
                <div className="vvp-info-label">Type</div>
                <div className="vvp-info-value">{promotion.type}</div>
                <div className="vvp-info-label">Status</div>
                <div className={`vvp-info-value ${promotion.status.toLowerCase()}`}>{promotion.status}</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'images' && (
          <div className="vvp-images-card">
            <div className="vvp-images-content">
              <div className="vvp-image-left">
                <img
                  src={imagePreviewUrl || 'https://images.unsplash.com/photo-1596464716121-e7c07f1ec67f'}
  alt="Preview"
                  className="vvp-image-preview"
                />
              </div>
              <div className="vvp-image-right">
                <p>Small Size: (360px,224px)</p>
                <br />
                <p>Big Size: (1126px,400px)</p>
                <br />
                <label className="vvp-upload-btn">
                  <FiUpload className="vvp-upload-icon" />
                  Upload Images
                  <input type="file" onChange={handleImageUpload} style={{ display: 'none' }} accept="image/*" />
                </label>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <div className="vvp-products-section">
            <div className="vvp-products-header">
              <button className="vvp-add-product-button" onClick={() => setShowAddModal(true)}>
                <FiPlus className="vvp-add-icon" />
                Add Product
              </button>
            </div>
            <div className="vvp-products-card">
              {filteredProducts.length > 0 ? (
                <div className="vvp-products-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProducts.map(product => (
                        <tr key={product.id}>
                          <td>{product.name}</td>
                          <td>₹{product.price}</td>
                          <td>
                            <span className={`vvp-status-badge ${product.status.toLowerCase()}`}>
                              {product.status}
                            </span>
                          </td>
                          <td>
                            <button className="vvp-delete-button" onClick={() => handleDeleteClick(product.id)}>
                              <FiTrash2 />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="vvp-products-placeholder">
                  <p>No products match your search.</p>
                </div>
              )}
            </div>
          </div>
        )}

{moreTab === 'offer' && (
  <div className="vvp-more-tab-content">
    <h3><BiSolidOffer style={{ verticalAlign: 'middle', marginRight: 6 }} /> Offer</h3>
  </div>
)}

{moreTab === 'videos' && (
  <div className="vvp-more-tab-content">
    <h3><MdVideoLibrary style={{ verticalAlign: 'middle', marginRight: 6 }} /> Videos</h3>
  </div>
)}

{moreTab === 'shipping' && (
  <div className="vvp-more-tab-content">
    <h3><MdOutlineLocalShipping style={{ verticalAlign: 'middle', marginRight: 6 }} /> Shipping & Return</h3>
  </div>
)}

{moreTab === 'seo' && (
  <div className="vvp-more-tab-content">
    <h3><TfiWorld style={{ verticalAlign: 'middle', marginRight: 6 }} /> SEO</h3>
  </div>
)}

      </div>

      <DeleteModal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)} onConfirm={confirmDelete} />
      <AddProductModal isOpen={showAddModal} onClose={() => setShowAddModal(false)} onAdd={handleAddProduct} productOptions={productOptions} />
    </div>
  );
};

export default ViewPromotion;