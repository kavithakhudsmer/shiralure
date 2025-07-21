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
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import the styles (optional but recommended for default styling)
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

  const [videos, setVideos] = useState([
    { id: 1, provider: 'YouTube', link: 'https://www.youtube.com/shorts/uK__aHwYnY9w' }
  ]);
  const [newVideo, setNewVideo] = useState({ provider: '', link: '' });
  const [showAddVideoModal, setShowAddVideoModal] = useState(false);

  const [shippingForm, setShippingForm] = useState({
    shippingMethod: '', // or 'free' as default
    shippingCost: 0,
    estimatedDelivery: '',
    returnPolicy: ''
  });
  const [shippingErrors, setShippingErrors] = useState({
    shippingMethod: '',
    shippingCost: '',
    estimatedDelivery: '',
    returnPolicy: ''
  });
  const [showShippingToast, setShowShippingToast] = useState(false);

  const [seoForm, setSeoForm] = useState({
    title: '',
    description: '',
    metaKeyword: '',
    image: null
  });
  const [seoErrors, setSeoErrors] = useState({
    title: '',
    description: '',
    metaKeyword: '',
    image: ''
  });
  const [showSeoToast, setShowSeoToast] = useState(false);

  // Function to handle adding a new video
  const handleAddVideo = () => {
    if (newVideo.provider && newVideo.link) {
      setVideos([...videos, { id: Date.now(), provider: newVideo.provider, link: newVideo.link }]);
      setNewVideo({ provider: '', link: '' });
      setShowAddVideoModal(false);
    }
  };

  // Function to handle deleting a video
  const handleDeleteVideo = (id) => {
    setVideos(videos.filter(video => video.id !== id));
  };

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

  const handleOfferInputChange = (e) => {
    const { id, name, value } = e.target;
    setOfferForm(prev => ({
      ...prev,
      [id || name]: value
    }));
    setErrors(prev => ({
      ...prev,
      [id || name]: ''
    }));
  };

  const handleSaveOffer = () => {
    const newErrors = {
      offerStartDate: offerForm.offerStartDate ? '' : 'Offer Start Date is required',
      offerEndDate: offerForm.offerEndDate ? '' : 'Offer End Date is required',
      discountPercentage: offerForm.discountPercentage ? '' : 'Discount Percentage is required'
    };
    
    setErrors(newErrors);

    if (Object.values(newErrors).every(error => !error)) {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  const handleClearOffer = () => {
    setOfferForm({
      offerStartDate: '',
      offerEndDate: '',
      discountPercentage: 0,
      flashSale: 'no'
    });
  };

  const handleShippingInputChange = (e) => {
    const { id, name, value } = e.target;
    setShippingForm(prev => ({
      ...prev,
      [id || name]: value
    }));
    setShippingErrors(prev => ({
      ...prev,
      [id || name]: ''
    }));
  };

  const handleSaveShipping = () => {
    const newErrors = {
      shippingMethod: shippingForm.shippingMethod ? '' : 'Shipping Method is required',
      shippingCost: shippingForm.shippingCost >= 0 ? '' : 'Shipping Cost is required',
      estimatedDelivery: shippingForm.estimatedDelivery ? '' : 'Estimated Delivery is required',
      returnPolicy: shippingForm.returnPolicy ? '' : 'Return Policy is required'
    };
    
    setShippingErrors(newErrors);

    if (Object.values(newErrors).every(error => !error)) {
      setShowShippingToast(true);
      setTimeout(() => setShowShippingToast(false), 3000);
    }
  };

  const handleClearShipping = () => {
    setShippingForm({
      shippingMethod: '',
      shippingCost: 0,
      estimatedDelivery: '',
      returnPolicy: ''
    });
  };

  const handleSeoInputChange = (e) => {
    const { id, name, value } = e.target;
    setSeoForm(prev => ({
      ...prev,
      [id || name]: value
    }));
    setSeoErrors(prev => ({
      ...prev,
      [id || name]: ''
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSeoForm(prev => ({
      ...prev,
      image: file
    }));
    setSeoErrors(prev => ({
      ...prev,
      image: ''
    }));
  };

  const handleSaveSeo = () => {
    const newErrors = {
      title: seoForm.title ? '' : 'Title is required',
      description: seoForm.description ? '' : 'Description is required',
      metaKeyword: seoForm.metaKeyword ? '' : 'Meta Keyword is required',
      image: seoForm.image ? '' : 'Image is required'
    };
    
    setSeoErrors(newErrors);

    if (Object.values(newErrors).every(error => !error)) {
      setShowSeoToast(true);
      setTimeout(() => setShowSeoToast(false), 3000);
    }
  };

  const handleClearSeo = () => {
    setSeoForm({
      title: '',
      description: '',
      metaKeyword: '',
      image: null
    });
    setImagePreviewUrl('');
    const fileInput = document.getElementById('image');
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const [showToast, setShowToast] = useState(false);
  const [offerForm, setOfferForm] = useState({
    offerStartDate: '',
    offerEndDate: '',
    discountPercentage: 0,
    flashSale: 'no'
  });
  const [errors, setErrors] = useState({
    offerStartDate: '',
    offerEndDate: '',
    discountPercentage: ''
  });

  const filteredProducts = products;

  if (!promotion) return <div className="vvp-view-promotion-page">Promotion not found</div>;

  return (
    <div className="vvp-view-promotion-page">
      <div className="vvp-header">
        <div className="vvp-header-left"><h1>Products</h1></div>
        <div className="vvp-header-right">
          <div className="vvp-breadcrumb">
            <a href="/admin/products" className="vvp-breadcrumb-home">Home</a>
            <span> &gt;&gt;</span>
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
                  <BiSolidOffer className="vvp-dropdown-icon" /> Offer
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
          <div className="vvp-offer-card">
            <div className="vvp-offer-title">Offer</div>
            <div className="vvp-offer-grid">
              <div className="vvp-offer-item">
                <label htmlFor="offerStartDate" className="vvp-offer-label">OFFER START DATE <span className="vvp-required">*</span></label>
                <input 
                  type="datetime-local" 
                  id="offerStartDate" 
                  className="vvp-offer-input" 
                  value={offerForm.offerStartDate}
                  onChange={handleOfferInputChange}
                />
                {errors.offerStartDate && <span className="vvp-error-message">{errors.offerStartDate}</span>}
              </div>
              <div className="vvp-offer-item">
                <label htmlFor="offerEndDate" className="vvp-offer-label">OFFER END DATE <span className="vvp-required">*</span></label>
                <input 
                  type="datetime-local" 
                  id="offerEndDate" 
                  className="vvp-offer-input" 
                  value={offerForm.offerEndDate}
                  onChange={handleOfferInputChange}
                />
                {errors.offerEndDate && <span className="vvp-error-message">{errors.offerEndDate}</span>}
              </div>
              <div className="vvp-offer-item">
                <label htmlFor="discountPercentage" className="vvp-offer-label">DISCOUNT PERCENTAGE <span className="vvp-required">*</span></label>
                <input 
                  type="number" 
                  id="discountPercentage" 
                  className="vvp-offer-input" 
                  value={offerForm.discountPercentage}
                  onChange={handleOfferInputChange}
                />
                {errors.discountPercentage && <span className="vvp-error-message">{errors.discountPercentage}</span>}
              </div>
              <div className="vvp-offer-item">
                <label className="vvp-offer-label">DO YOU WANT TO ADD IN THE FLASH SALE? <span className="vvp-required">*</span></label>
                <div className="vvp-radio-group">
                  <label className="vvp-radio-label">
                    <input 
                      type="radio" 
                      name="flashSale" 
                      value="yes" 
                      className="vvp-radio-input" 
                      checked={offerForm.flashSale === 'yes'}
                      onChange={handleOfferInputChange}
                    /> Yes
                  </label>
                  <label className="vvp-radio-label">
                    <input 
                      type="radio" 
                      name="flashSale" 
                      value="no" 
                      className="vvp-radio-input" 
                      checked={offerForm.flashSale === 'no'}
                      onChange={handleOfferInputChange}
                    /> No
                  </label>
                </div>
              </div>
            </div>
            <div className="vvp-offer-save-button-container">
              <button className="vvp-save-button" onClick={handleSaveOffer}>Save</button>
              <button className="vvp-clear-button" onClick={handleClearOffer}>Clear</button>
            </div>
            {showToast && (
              <div className="vvp-toast">
                Offer saved successfully!
              </div>
            )}
          </div>
        )}

        {moreTab === 'videos' && (
          <div className="vvp-more-tab-content">
            <div className="vvp-videos-card">
              <div className="vvp-videos-header">
                <h3> Videos</h3>
                <button className="vvp-add-video-button" onClick={() => setShowAddVideoModal(true)}>
                  <FiPlus className="vvp-add-icon" /> Add Video
                </button>
              </div>
              <div className="vvp-videos-table">
                <table>
                  <thead>
                    <tr>
                      <th>Video Provider</th>
                      <th>Link</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {videos.map(video => (
                      <tr key={video.id}>
                        <td>{video.provider}</td>
                        <td>{video.link}</td>
                        <td>
                          <button className="vvp-delete-button" onClick={() => handleDeleteVideo(video.id)}>
                            <FiTrash2 />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {videos.length === 0 && <p>No videos available.</p>}
              </div>
            </div>
          </div>
        )}

        {moreTab === 'shipping' && (
  <div className="vvp-shipping-card">
    <div className="vvp-shipping-title">Shipping & Return</div>
    <div className="vvp-shipping-grid">
      <div className="vvp-shipping-item">
        <label className="vvp-shipping-label">SHIPPING TYPE <span className="vvp-required">*</span></label>
        <div className="vvp-radio-group">
          <label className="vvp-radio-label">
            <input 
              type="radio" 
              name="shippingType" 
              value="free" 
              checked={shippingForm.shippingMethod === 'free'} 
              onChange={(e) => handleShippingInputChange({ target: { name: 'shippingMethod', value: e.target.value } })}
            /> Free
          </label>
          <label className="vvp-radio-label">
            <input 
              type="radio" 
              name="shippingType" 
              value="flatRate" 
              checked={shippingForm.shippingMethod === 'flatRate'} 
              onChange={(e) => handleShippingInputChange({ target: { name: 'shippingMethod', value: e.target.value } })}
            /> Flat Rate
          </label>
        </div>
        {shippingErrors.shippingMethod && <span className="vvp-error-message">{shippingErrors.shippingMethod}</span>}
      </div>
      <div className="vvp-shipping-item">
        <label htmlFor="note" className="vvp-shipping-label">
          SHIPPING & RETURN
          <span className="vvp-required">*</span>
        </label>
        <ReactQuill
          theme="snow"
          value={shippingForm.returnPolicy}
          onChange={(value) => handleShippingInputChange({ target: { name: 'returnPolicy', value } })}
          placeholder="Insert content here ..."
          modules={{
            toolbar: [
              ['bold', 'italic', 'underline', 'strike'],
              ['blockquote', 'code-block'],
              [{ header: 1 }, { header: 2 }],
              [{ list: 'ordered' }, { list: 'bullet' }],
              [{ script: 'sub' }, { script: 'super' }],
              [{ indent: '-1' }, { indent: '+1' }],
              [{ direction: 'rtl' }],
              [{ size: ['small', false, 'large', 'huge'] }],
              [{ header: [1, 2, 3, 4, 5, 6, false] }],
              [{ color: [] }, { background: [] }],
              [{ font: [] }],
              [{ align: [] }],
              ['link', 'image', 'video'],
              ['clean'],
            ],
          }}
        />
        {shippingErrors.returnPolicy && <span className="vvp-error-message">{shippingErrors.returnPolicy}</span>}
      </div>
    </div>
    <div className="vvp-shipping-save-button-container">
      <button className="vvp-save-button" onClick={handleSaveShipping}>Save</button>
      <button className="vvp-clear-button" onClick={handleClearShipping}>Clear</button>
    </div>
    {showShippingToast && (
      <div className="vvp-toast">
        Shipping details saved successfully!
      </div>
    )}
  </div>
)}

        {moreTab === 'seo' && (
          <div className="vvp-seo-card">
            <div className="vvp-seo-title">SEO</div>
            <div className="vvp-seo-grid">
              <div className="vvp-seo-item">
                <label htmlFor="title" className="vvp-seo-label">TITLE <span className="vvp-required">*</span></label>
                <input
                  type="text"
                  id="title"
                  className="vvp-seo-input"
                  value={seoForm.title}
                  onChange={handleSeoInputChange}
                  placeholder="Enter SEO title"
                />
                {seoErrors.title && <span className="vvp-error-message">{seoErrors.title}</span>}
              </div>
              <div className="vvp-seo-item">
                <label htmlFor="description" className="vvp-seo-label">DESCRIPTION <span className="vvp-required">*</span></label>
                <textarea
                  id="description"
                  className="vvp-seo-input"
                  value={seoForm.description}
                  onChange={handleSeoInputChange}
                  placeholder="Enter SEO description"
                />
                {seoErrors.description && <span className="vvp-error-message">{seoErrors.description}</span>}
              </div>
              <div className="vvp-seo-item">
                <label htmlFor="metaKeyword" className="vvp-seo-label">META KEYWORD <span className="vvp-required">*</span></label>
                <input
                  type="text"
                  id="metaKeyword"
                  className="vvp-seo-input"
                  value={seoForm.metaKeyword}
                  onChange={handleSeoInputChange}
                  placeholder="Enter meta keywords"
                />
                {seoErrors.metaKeyword && <span className="vvp-error-message">{seoErrors.metaKeyword}</span>}
              </div>
              <div className="vvp-seo-item">
                <label htmlFor="image" className="vvp-seo-label">IMAGE <span className="vvp-required">*</span></label>
                <input
                  type="file"
                  id="image"
                  className="vvp-seo-input"
                  onChange={handleImageChange}
                />
                {seoForm.image ? <span>{seoForm.image.name}</span> : <span></span>}
                {seoErrors.image && <span className="vvp-error-message">{seoErrors.image}</span>}
              </div>
            </div>
            <div className="vvp-seo-save-button-container">
              <button className="vvp-save-button" onClick={handleSaveSeo}>Save</button>
              <button className="vvp-clear-button" onClick={handleClearSeo}>Clear</button>
            </div>
            {showSeoToast && (
              <div className="vvp-toast">
                SEO details saved successfully!
              </div>
            )}
          </div>
        )}
      </div>

      <DeleteModal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)} onConfirm={confirmDelete} />
      <AddProductModal isOpen={showAddModal} onClose={() => setShowAddModal(false)} onAdd={handleAddProduct} productOptions={productOptions} />

      {showAddVideoModal && (
        <div className="vvp-modal">
          <div className="vvp-modal-content">
            <h3>Add New Video</h3>
            <div>
              <label>Video Provider</label>
              <select
                value={newVideo.provider}
                onChange={(e) => setNewVideo({ ...newVideo, provider: e.target.value })}
              >
                <option value="">Select Provider</option>
                <option value="YouTube">YouTube</option>
                <option value="Vimeo">Vimeo</option>
              </select>
            </div>
            <div>
              <label>Link</label>
              <input
                type="text"
                value={newVideo.link}
                onChange={(e) => setNewVideo({ ...newVideo, link: e.target.value })}
                placeholder="Enter video URL"
              />
            </div>
            <div className="vvp-modal-actions">
              <button onClick={() => setShowAddVideoModal(false)}>Cancel</button>
              <button onClick={handleAddVideo}>Add</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default ViewPromotion;