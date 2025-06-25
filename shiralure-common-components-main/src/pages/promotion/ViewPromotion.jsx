import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FiInfo, FiImage, FiGrid, FiUpload, FiPlus, FiTrash2 } from 'react-icons/fi';
import DeleteModal from './viewcomponents/DeleteModal';
import AddProductModal from './viewcomponents/AddProductModal';
import './ViewPromotion.css';

const ViewPromotion = () => {
  const { id } = useParams();
  const [promotion, setPromotion] = useState(null);
  const [activeTab, setActiveTab] = useState('information');
  const [products, setProducts] = useState([
    { id: 1, name: 'Exclusive Products', price: '1921.00', status: 'Active' },
    { id: 2, name: 'Winter Products', price: '1921.00', status: 'Active' },
    { id: 3, name: 'Summer Sale', price: '2000.00', status: 'Inactive' },
    { id: 4, name: 'Autumn Collection', price: '1800.00', status: 'Active' },
    { id: 5, name: 'Spring Savings', price: '1700.00', status: 'Active' },
  ]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm] = useState('');

  const productOptions = [
    { id: 6, name: 'Summer Collection', price: '2500.00' },
    { id: 7, name: 'Spring Special', price: '1800.00' },
    { id: 8, name: 'Autumn Arrival', price: '2200.00' }
  ];

  useEffect(() => {
    const samplePromotions = [
      { id: 1, name: 'Exclusive Products', type: 'Small', status: 'Active', description: 'Special discount on exclusive items' },
      { id: 2, name: 'Winter Products', type: 'Big', status: 'Active', description: 'Winter season special offers' },
      { id: 3, name: 'Summer Sale', type: 'Medium', status: 'Inactive', description: 'Summer clearance sale' },
      { id: 4, name: 'New Arrivals', type: 'Small', status: 'Inactive', description: 'Check out our new products' },
      { id: 5, name: 'Clearance', type: 'Big', status: 'Active', description: 'Year-end clearance sale' },
    ];
    const foundPromotion = samplePromotions.find(p => p.id === parseInt(id));
    setPromotion(foundPromotion);
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
      console.log('File uploaded:', file.name);
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!promotion) {
    return (
      <div className="view-promotion-page">
        <div className="promotion-not-found">Promotion not found!</div>
      </div>
    );
  }

  return (
    <div className="view-promotion-page">
      <div className="header">
        <div className="header-left">
          <h1>Promotion Details</h1>
        </div>
        <div className="header-right">
          <div className="breadcrumb">
            <a href="/" className="breadcrumb-home">Home</a>
            <span> &gt;&gt; </span>
            <a href="/promotions" className="breadcrumb-promotions">Promotions</a>
          </div>
        </div>
      </div>

      <div className="tabs-container">
        <div className="tabs">
          <button className={`tab ${activeTab === 'information' ? 'active' : ''}`} onClick={() => setActiveTab('information')}>
            <FiInfo className="tab-icon" />
            Information
          </button>
          <button className={`tab ${activeTab === 'images' ? 'active' : ''}`} onClick={() => setActiveTab('images')}>
            <FiImage className="tab-icon" />
            Images
          </button>
          <button className={`tab ${activeTab === 'products' ? 'active' : ''}`} onClick={() => setActiveTab('products')}>
            <FiGrid className="tab-icon" />
            Products
          </button>
        </div>
      </div>

      <div className="tab-content">
        {activeTab === 'information' && (
          <div className="information-card">
            <h3>Information</h3>
            <div className="info-grid">
              <div className="info-column">
                <div className="info-row">
                  <span className="info-label">Name:</span>
                  <span className="info-value">{promotion.name}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Type:</span>
                  <span className="info-value">{promotion.type}</span>
                </div>
              </div>
              <div className="info-column">
                <div className="info-row">
                  <span className="info-label">Description:</span>
                  <span className="info-value">{promotion.description || 'N/A'}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Status:</span>
                  <span className={`info-value status ${promotion.status.toLowerCase()}`}>
                    {promotion.status}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'images' && (
          <div className="images-card">
            <div className="images-content">
              <div className="image-preview-container">
                <div className="image-preview">
                  <div className="image-placeholder">Image Preview</div>
                </div>
              </div>
              <div className="image-info">
                <p>Small Size: (360px, 224px)</p>
                <p>Big Size: (1126px, 400px)</p>
                <label className="upload-button">
                  <FiUpload className="upload-icon" />
                  Upload Images
                  <input
                    type="file"
                    onChange={handleImageUpload}
                    style={{ display: 'none' }}
                    accept="image/*"
                  />
                </label>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <div className="products-section">
            <div className="products-header">
              <button className="add-product-button" onClick={() => setShowAddModal(true)}>
                <FiPlus className="add-icon" />
                Add Product
              </button>
             
            </div>

            <div className="products-card">
              {filteredProducts.length > 0 ? (
                <div className="products-table">
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
                            <span className={`status-badge ${product.status.toLowerCase()}`}>
                              {product.status}
                            </span>
                          </td>
                          <td>
                            <button className="delete-button" onClick={() => handleDeleteClick(product.id)}>
                              <FiTrash2 />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="products-placeholder">
                  <p>No products match your search.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
      />

      <AddProductModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={handleAddProduct}
        productOptions={productOptions}
      />
    </div>
  );
};

export default ViewPromotion;
