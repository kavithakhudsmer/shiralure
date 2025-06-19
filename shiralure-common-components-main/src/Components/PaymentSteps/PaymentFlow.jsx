import React, { useState, useEffect } from 'react';
import { Edit, Plus, CheckCircle, Info, Minus, ArrowRight, X, ShoppingBag, RefreshCw, Volume2 } from 'lucide-react';
import '../styles/PaymentFlow.css';
import pocoImage from '../../../src/assets/images/poco.png';

const CaptchaImage = ({ src, onClick, selected }) => (
  <div className={`captcha-image ${selected ? 'selected' : ''}`} onClick={onClick}>
    <img src={src} alt="captcha" />
  </div>
);

const PaymentFlow = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedPayment, setSelectedPayment] = useState('upi');
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: 'John Doe',
      phone: '+91 1234567890',
      address: '123/colony, Anna nagar, Aruppukottai, virudhunagar, Tamilnadu-628503',
      isSelected: true
    },
    {
      id: 2,
      name: 'Jane Smith',
      phone: '+91 1234567890',
      address: '123/colony, Anna nagar, Varagunaon, Tenkasi, Tamilnadu-628101',
      isSelected: false
    }
  ]);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    name: '',
    phone: '',
    address: ''
  });
  const [orderItems, setOrderItems] = useState([
    {
      id: 1,
      name: 'POCO M6 Pro 5G (Power Black, 128 GB)',
      specs: '6 GB RAM',
      originalPrice: '₹19,999',
      discountedPrice: '₹20,000',
      discount: '68% Off',
      offers: '2 offers available',
      deliveryDate: 'Fri Mar 28',
      deliveryFee: 'Free',
      quantity: 1,
      image: pocoImage,
    }
  ]);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [selectedCaptchaImages, setSelectedCaptchaImages] = useState([]); // Track multiple selections
  const [captchaImages, setCaptchaImages] = useState([
    { id: 1, src: '../../../src/assets/images/car1.png', isCorrect: true },
    { id: 3, src: '../../../src/assets/images/cat.png', isCorrect: false },
    { id: 4, src: '../../../src/assets/images/car2.png', isCorrect: true },
    { id: 5, src: '../../../src/assets/images/mountain.png', isCorrect: false },
    { id: 6, src: '../../../src/assets/images/car3.png', isCorrect: true },
    { id: 2, src: '../../../src/assets/images/post.png', isCorrect: false },
  ]);

  const userData = {
    phone: '+91 1234567890',
    priceDetails: {
      itemPrice: 885,
      deliveryCharges: 0,
      platformFee: 3,
      totalPayable: 888,
      totalSaving: 6.11
    }
  };

  const paymentMethods = [
    { id: 'upi', name: 'UPI', isSelected: true },
    { id: 'wallets', name: 'Wallets' },
    { id: 'cards', name: 'Credit / Debit / ATM Card' },
    { id: 'netbanking', name: 'Net Banking' },
    { id: 'emi', name: 'EMI' },
    { id: 'cod', name: 'Cash on delivery' }
  ];

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const goToStep = (step) => {
    setCurrentStep(step);
  };

  const increaseQuantity = (itemId) => {
    setOrderItems(prev => 
      prev.map(item => 
        item.id === itemId 
          ? {...item, quantity: item.quantity + 1} 
          : item
      )
    );
  };
  
  const decreaseQuantity = (itemId) => {
    setOrderItems(prev => 
      prev.map(item => 
        item.id === itemId && item.quantity > 1
          ? {...item, quantity: item.quantity - 1} 
          : item
      )
    );
  };

  const removeItem = (itemId) => {
    setOrderItems(prev => prev.filter(item => item.id !== itemId));
  };

  const handleContinue = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else if (currentStep === 4 && captchaVerified) {
      alert("Payment processed successfully!");
    }
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setNewAddress(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addNewAddress = () => {
    if (newAddress.name && newAddress.phone && newAddress.address) {
      const newId = addresses.length > 0 ? Math.max(...addresses.map(a => a.id)) + 1 : 1;
      const addressToAdd = {
        id: newId,
        ...newAddress,
        isSelected: false
      };
      
      setAddresses(prev => [...prev, addressToAdd]);
      setNewAddress({ name: '', phone: '', address: '' });
      setShowAddressForm(false);
    } else {
      alert("Please fill all the fields");
    }
  };

  const handleCaptchaClick = (captchaId) => {
    setSelectedCaptchaImages(prev => {
      if (prev.includes(captchaId)) {
        return prev.filter(id => id !== captchaId); // Deselect if already selected
      } else {
        return [...prev, captchaId]; // Select the image
      }
    });
  };

  const refreshCaptcha = () => {
    const shuffledImages = [...captchaImages].sort(() => Math.random() - 0.5);
    setCaptchaImages(shuffledImages);
    setSelectedCaptchaImages([]);
    setCaptchaVerified(false);
  };

  const verifyCaptcha = () => {
    const correctImages = captchaImages.filter(img => img.isCorrect).map(img => img.id);
    const allCorrectSelected = correctImages.every(id => selectedCaptchaImages.includes(id));
    const onlyCorrectSelected = selectedCaptchaImages.every(id => correctImages.includes(id));

    if (allCorrectSelected && onlyCorrectSelected) {
      setCaptchaVerified(true);
      alert("Captcha verified successfully!");
    } else {
      alert("Please select all images containing cars and only those images.");
      setSelectedCaptchaImages([]);
      refreshCaptcha();
    }
  };

  const renderCaptcha = () => {
    if (currentStep !== 4 || captchaVerified) return null;
    return (
      <div className="captcha-container">
        <p className="captcha-instruction">Select all images containing cars</p>
        <div className="captcha-grid">
          {captchaImages.map((image) => (
            <CaptchaImage
              key={image.id}
              src={image.src}
              onClick={() => handleCaptchaClick(image.id)}
              selected={selectedCaptchaImages.includes(image.id)}
            />
          ))}
        </div>
        <div className="captcha-actions">
          <button className="captcha-action-btn refresh-btn" onClick={refreshCaptcha} aria-label="Refresh captcha">
            <RefreshCw size={14} color="#666" />
          </button>
          <button className="captcha-action-btn audio-btn" aria-label="Listen to captcha">
            <Volume2 size={14} color="#666" />
          </button>
          <button className="captcha-action-btn info-btn" aria-label="Captcha info">
            <Info size={14} color="#666" />
          </button>
          <button
            className="verify-btn"
            onClick={verifyCaptcha}
            disabled={selectedCaptchaImages.length === 0}
          >
            Verify
          </button>
        </div>
      </div>
    );
  };

  const renderLoginSection = () => {
    return (
      <div className={`section-wrapper ${currentStep === 1 ? 'active-section' : ''}`}>
        <div className="stepper-item">
          <div 
            className={`stepper-circle ${currentStep > 1 ? 'completed' : ''} ${currentStep === 1 ? 'active' : ''}`}
            onClick={() => currentStep > 0 && goToStep(1)}
          />
        </div>
        <div className="section-pf">
          <div className="section-header-pf">
            <div className="section-title-pf">
              <h3>Login</h3>
              {currentStep > 1 && <p className="section-subtitle-pf">{userData.phone}</p>}
            </div>
            {currentStep > 1 && (
              <button className="change-btn" onClick={() => goToStep(1)}>
                CHANGE
              </button>
            )}
          </div>
          
          {currentStep === 1 && (
            <div className="section-content-pf">
              <div className="phone-input-pf">
                <p className="phone-number">{userData.phone}</p>
              </div>
              <button className="continue-btn" onClick={handleContinue}>
                Continue
              </button>
            </div>
          )}
        </div>
        {currentStep >= 1 && (
          <div className={`stepper-line ${currentStep > 1 ? 'completed' : ''}`}></div>
        )}
      </div>
    );
  };

  const renderDeliveryAddressSection = () => {
    return (
      <div className={`section-wrapper ${currentStep === 2 ? 'active-section' : ''}`}>
        <div className="stepper-item">
          <div 
            className={`stepper-circle ${currentStep > 2 ? 'completed' : ''} ${currentStep === 2 ? 'active' : ''}`}
            onClick={() => currentStep > 1 && goToStep(2)}
          />
        </div>
        <div className="section-pf">
          <div className="section-header-pf">
            <div className="section-title-pf">
              <h3>Delivery Address</h3>
              {currentStep > 2 && addresses[selectedAddress] && (
                <p className="section-subtitle-pf">{addresses[selectedAddress].address}</p>
              )}
            </div>
            {currentStep > 2 && (
              <button className="change-btn" onClick={() => goToStep(2)}>
                CHANGE
              </button>
            )}
          </div>
          
          {currentStep === 2 && (
            <div className="section-content">
              <div className="address-options">
                {addresses.map((address, index) => (
                  <div 
                    key={address.id} 
                    className={`address-option ${selectedAddress === index ? 'selected' : ''}`}
                    onClick={() => setSelectedAddress(index)}
                  >
                    <div className="address-option-content">
                      <div className={`radio ${selectedAddress === index ? 'selected' : ''}`}></div>
                      <div className="address-details">
                        <p className="address-name">{address.name} · {address.phone}</p>
                        <p className="address-text">{address.address}</p>
                        {selectedAddress === index && (
                          <button className="deliver-here-btn" onClick={() => goToStep(3)}>
                            DELIVER HERE
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {!showAddressForm ? (
                <div className="add-new-address">
                  <button className="add-address-btn" onClick={() => setShowAddressForm(true)}>
                    <Plus size={16} />
                    <span>Add New Address</span>
                  </button>
                </div>
              ) : (
                <div className="address-form">
                  <h4>Add New Address</h4>
                  <div className="form-group">
                    <label>Full Name</label>
                    <input 
                      type="text" 
                      name="name" 
                      value={newAddress.name} 
                      onChange={handleAddressChange} 
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input 
                      type="text" 
                      name="phone" 
                      value={newAddress.phone} 
                      onChange={handleAddressChange} 
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div className="form-group">
                    <label>Address</label>
                    <textarea 
                      name="address" 
                      value={newAddress.address} 
                      onChange={handleAddressChange} 
                      placeholder="Enter your full address"
                      rows="3"
                    ></textarea>
                  </div>
                  <div className="form-buttons">
                    <button className="cancel-btn" onClick={() => setShowAddressForm(false)}>
                      Cancel
                    </button>
                    <button className="save-address-btn" onClick={addNewAddress}>
                      Save Address
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        {currentStep >= 2 && (
          <div className={`stepper-line ${currentStep > 2 ? 'completed' : ''}`}></div>
        )}
      </div>
    );
  };

  const renderOrderSummarySection = () => {
    return (
      <div className={`section-wrapper ${currentStep === 3 ? 'active-section' : ''}`}>
        <div className="stepper-item">
          <div 
            className={`stepper-circle ${currentStep > 3 ? 'completed' : ''} ${currentStep === 3 ? 'active' : ''}`}
            onClick={() => currentStep > 2 && goToStep(3)}
          />
        </div>
        <div className="section-pf">
          <div className="section-header-pf">
            <div className="section-title-pf">
              <h3>Order Summary</h3>
              {currentStep > 3 && orderItems.length > 0 && (
                <p className="section-subtitle-pf">
                  {orderItems.length} {orderItems.length === 1 ? 'item' : 'items'}
                </p>
              )}
            </div>
            {currentStep > 3 && (
              <button className="change-btn" onClick={() => goToStep(3)}>
                CHANGE
              </button>
            )}
          </div>
          
          {currentStep === 3 && (
            <div className="section-content-pf">
              {orderItems.length > 0 ? (
                <>
                  {orderItems.map(item => (
                    <div className="order-summary-product" key={item.id}>
                      <div className="product-details-pf">
                        <div className="image-and-quantity">
                          <div className="product-image-pf">
                            <img src={item.image} alt={item.name} />
                          </div>
                          <div className="quantity-control">
                            <button 
                              className="quantity-btn" 
                              onClick={() => decreaseQuantity(item.id)}
                              aria-label="Decrease quantity"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="quantity">{item.quantity}</span>
                            <button 
                              className="quantity-btn" 
                              onClick={() => increaseQuantity(item.id)}
                              aria-label="Increase quantity"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                        </div>
                        <div className="product-info-pf">
                          <div className="info-content">
                            <h4>{item.name}</h4>
                            <p className="product-specs">{item.specs}</p>
                            <div className="product-price-pf">
                              <span className="original-price-pf">{item.originalPrice}</span>
                              <span className="discounted-price-pf">{item.discountedPrice}</span>
                              <span className="discount">{item.discount}</span>
                              <span className="offers">
                                {item.offers}
                                <Info size={12} className="info-icon" aria-label="More information about offers" />
                              </span>
                            </div>
                            <p className="delivery-info-pf">
                              Delivery by {item.deliveryDate} | 
                              <span className="free">{item.deliveryFee}</span>
                            </p>
                          </div>
                          <div className="remove-action">
                            <button 
                              className="remove-btn" 
                              onClick={() => removeItem(item.id)}
                              aria-label={`Remove ${item.name} from cart`}
                            >
                              REMOVE
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <button className="continue-btn" onClick={handleContinue}>
                    Continue
                  </button>
                </>
              ) : (
                <div className="empty-cart">
                  <p>Your cart is empty</p>
                  <button className="continue-shopping-btn" onClick={() => alert("Continue shopping clicked")}>
                    Continue Shopping
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
        {currentStep >= 3 && (
          <div className={`stepper-line ${currentStep > 3 ? 'completed' : ''}`}></div>
        )}
      </div>
    );
  };

  const renderPaymentOptionsSection = () => {
    return (
      <div className={`section-wrapper ${currentStep === 4 ? 'active-section' : ''}`}>
        <div className="stepper-item">
          <div 
            className={`stepper-circle ${currentStep > 4 ? 'completed' : ''} ${currentStep === 4 ? 'active' : ''}`}
            onClick={() => currentStep > 3 && goToStep(4)}
          />
        </div>
        <div className="section-pf">
          <div className="section-header-pf">
            <div className="section-title-pf">
              <h3>Payment Options</h3>
            </div>
            {currentStep > 4 && (
              <button className="change-btn" onClick={() => goToStep(4)}>
                CHANGE
              </button>
            )}
          </div>
          
          {currentStep === 4 && (
            <div className="section-content">
              <div className="payment-methods">
                {paymentMethods.map((method) => (
                  <div 
                    key={method.id}
                    className={`payment-method ${selectedPayment === method.id ? 'selected' : ''}`}
                    onClick={() => setSelectedPayment(method.id)}
                  >
                    <div className="payment-method-header">
                      <div className={`radio ${selectedPayment === method.id ? 'selected' : ''}`}></div>
                      <h4>{method.name}</h4>
                    </div>
                    
                    {selectedPayment === method.id && method.id === 'upi' && (
                      <div className="payment-method-content">
                        <p>Pay by any UPI app</p>
                        <div className="payment-icons">
                          <img src="../../../src/assets/images/bhim.png" alt="Bharat UPI" />
                          <img src="../../../src/assets/images/phonepe.png" alt="Paytm" />
                          <img src="../../../src/assets/images/paytm.png" alt="PhonePe" />
                          <img src="../../../src/assets/images/gpay.png" alt="Google Pay" />
                        </div>
                        <div className="upi-input">
                          <input type="text" placeholder="Enter UPI ID" />
                          <button className="verify-upi-btn">VERIFY</button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              {renderCaptcha()}
              <button className="continue-btn" onClick={handleContinue} disabled={!captchaVerified}>
                Pay Now
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };
  
  const calculateTotalPrice = () => {
    if (orderItems.length === 0) return userData.priceDetails;
    
    const itemPrice = orderItems.reduce((total, item) => {
      const price = parseFloat(item.discountedPrice.replace('₹', '').replace(',', '')) || 0;
      return total + (price * item.quantity);
    }, 0);
    
    const platformFee = 3;
    const deliveryCharges = 0;
    const totalPayable = itemPrice + platformFee + deliveryCharges;
    
    const originalTotal = orderItems.reduce((total, item) => {
      const price = parseFloat(item.originalPrice.replace('₹', '').replace(',', '')) || 0;
      return total + (price * item.quantity);
    }, 0);
    
    const totalSaving = originalTotal - itemPrice;
    
    return {
      itemPrice,
      deliveryCharges,
      platformFee,
      totalPayable,
      totalSaving
    };
  };

  const renderPriceDetails = () => {
    const priceDetails = calculateTotalPrice();
    
    return (
      <div className={`price-details ${showSummary ? 'show-summary' : ''}`}>
        <div className="price-details-content">
          <h3>PRICE DETAILS</h3>
          
          <div className="price-row">
            <span>Price({orderItems.length} {orderItems.length === 1 ? 'Item' : 'Items'})</span>
            <span>₹{priceDetails.itemPrice}</span>
          </div>
          
          <div className="price-row">
            <span>Delivery Charges</span>
            <span className="free-delivery">FREE</span>
          </div>
          
          <div className="price-row">
            <span>Platform Fee</span>
            <span>₹{priceDetails.platformFee}</span>
          </div>
          
          <div className="price-divider"></div>
          
          <div className="price-row total">
            <span>Total Payable</span>
            <span>₹{priceDetails.totalPayable}</span>
          </div>
          
          <div className="savings">
            <p>Your Total Saving on this order ₹{priceDetails.totalSaving.toFixed(2)}!!</p>
          </div>
          
          <div className="security-note">
            <CheckCircle size={16} className="check-icon" />
            <p>Safe and secure Payment. Easy returns. 100% Authentic products.</p>
          </div>
        </div>
      </div>
    );
  };

  const renderMobileSummaryToggle = () => {
    return null; // Removed the toggle button entirely
  };

  return (
    <div className="payment-container">
      <div className="payment-layout">
        <div className="payment-content">
          {renderLoginSection()}
          {renderDeliveryAddressSection()}
          {renderOrderSummarySection()}
          {renderPaymentOptionsSection()}
        </div>
        
        {renderPriceDetails()}
      </div>
      
      {renderMobileSummaryToggle()}
    </div>
  );
};

export default PaymentFlow;