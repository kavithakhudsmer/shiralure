import React, { useState } from "react";
import CustomModal from "../../component/ui/CustomModal";
import "../../../admin/pages/pos/pos.css";
import { posproducts } from "../../../admin/data/OrderData";
import cartGif from "../../../assets/gif/cart.gif";
import { FaPlus, FaMinus, FaShoppingCart, FaRegStar } from "react-icons/fa";
import { LucideScanSearch, Trash } from "lucide-react";
import ButtonComponent from "../../component/ui/ButtonComponent";

const POS = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [discountType, setDiscountType] = useState("percentage");
  const [discountValue, setDiscountValue] = useState("");

  const handleCardClick = (product) => {
    setSelectedProduct(product);
    setSelectedImage(product.image);
    setQuantity(1);
    setShowModal(true);
  };

  const renderStars = (rating) => (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-start",
        gap: "4px",
        width: "100%",
      }}
    >
      {Array.from({ length: rating }, (_, i) => (
        <FaRegStar key={i} color="#FFC107" size={14} />
      ))}
    </div>
  );

  const handleAddToCart = (product, qty = 1) => {
    setCartItems((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (item) => item.id === product.id
      );
      if (existingItemIndex !== -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += qty;
        return updatedCart;
      } else {
        return [...prevCart, { ...product, quantity: qty }];
      }
    });
    setQuantity(1);
    setShowModal(false);
  };

  const handleUpdateCartQty = (id, newQty) => {
    setCartItems((prevCart) =>
      prevCart.map((item) =>
        item.id === id
          ? { ...item, quantity: newQty > item.stock ? item.stock : newQty }
          : item
      )
    );
  };

  const handleDelete = (id) => {
    setCartItems((prevCart) => prevCart.filter((item) => item.id !== id));
  };
  const handleSearch = (productName) => {
    const query = encodeURIComponent(productName);
    const url = `https://www.google.com/search?q=${query}`;
    window.open(url, "_blank");
  };

  const applyDiscount = () => {
    let value = parseFloat(discountValue) || 0;
    if (discountType === "percentage") {
      return (subTotal * value) / 100;
    } else {
      return value;
    }
  };

  const subTotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const tax = subTotal * 0.18;
  const discount = applyDiscount();
  const total = subTotal + tax - discount;

  return (
    <div className="pos-container">
    <div className="posheader">
        <h2 className="postitle">POS</h2>
        <h6 className="posbreadcrumb">
          <a href="/" className="posbreadcrumb">Home</a> &gt;&gt; <span>POS</span>
        </h6>
      </div>
    
    <div className="pos-page d-flex">
      <div className="product-list">
        {posproducts.map((product) => (
          <div
            className="product-card"
            key={product.id}
            onClick={() => handleCardClick(product)}
          >
            <div className="contain-img" onClick={(e) => e.stopPropagation()}>
              <img
                src={product.image}
                alt={product.name}
                onClick={() => handleCardClick(product)}
              />
              <LucideScanSearch
                className="search-icon"
                size={24}
                onClick={() => handleSearch(product.name)}
              />
            </div>

            <div>
              <h4>{product.name}</h4>
              <div>{renderStars(product.star)}</div>
              <h6>₹{product.price}</h6>
            </div>
          </div>
        ))}
      </div>
      <CustomModal
        show={showModal}
        onHide={() => setShowModal(false)}
        title="Product Variation"
      >
        {selectedProduct && (
          <div className="product-modal-content d-flex flex-column flex-md-row">
            <div className="product-main text-center">
              <img
                src={selectedImage}
                alt="Main Display"
                className="main-image"
                style={{
                  width: "200px",
                  height: "300px",
                  objectFit: "contain",
                }}
              />
              <div className="thumbs d-flex justify-content-center mt-3">
                {selectedProduct.thumbnails.map((img, i) => (
                  <div
                    key={i}
                    className="thumb-wrapper mx-1 border rounded"
                    onClick={() => setSelectedImage(img)}
                    style={{
                      width: "50px",
                      height: "50px",
                      cursor: "pointer",
                      overflow: "hidden",
                      border:
                        selectedImage === img
                          ? "2px solid #6366F1"
                          : "1px solid #ccc",
                    }}
                  >
                    <img
                      src={img}
                      alt={`thumb-${i}`}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="details">
              <h5>{selectedProduct.name}</h5>
              <p className="text-muted">₹ {selectedProduct.price.toFixed(2)}</p>
              <div className="mb-2" style={{ textAlign: "left" }}>
                {renderStars(selectedProduct.star)}
              </div>
              <div className="d-flex align-items-center mt-3">
                <span className="me-1 text-muted">Quantity:</span>
                <ButtonComponent
                  variant="circle-gray"
                  onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
                >
                  <FaMinus size={12} />
                </ButtonComponent>

                <span className="mx-2">{quantity}</span>
                <ButtonComponent
                  variant="circle-gray"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <FaPlus size={12} />
                </ButtonComponent>
              </div>

              <button
                onClick={() => handleAddToCart(selectedProduct, quantity)}
                className="mt-4"
                style={{
                  backgroundColor: "#696CFF",
                  color: "#fff",
                  padding: "10px 20px",
                  borderRadius: "10px",
                  border: 0,
                }}
              >
                <FaShoppingCart className="me-1" /> Add to Cart
              </button>
            </div>
          </div>
        )}
      </CustomModal>
      <div className="cart-sidebar sticky-top p-2">
        {cartItems.length === 0 ? (
          <div className="text-center">
            <img
              src={cartGif}
              alt="Empty Cart"
              className="img-fluid rounded py-5"
            />
            <ul className="list-group list-group-flush">
              <li className="list-group-item d-flex justify-content-between">
                <span>Sub Total</span>
                <span>₹ 0.00</span>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <span>Tax</span>
                <span>₹ 0.00</span>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <span>Discount</span>
                <span>₹ 0.00</span>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <span>Total</span>
                <span>₹ 0.00</span>
              </li>
            </ul>
          </div>
        ) : (
          <>
            <div className="cart-items-list">
              {cartItems.map((item, i) => (
                <div key={i} className="cart-item d-flex mb-3 p-2">
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: "80px",
                      height: "120px",
                      objectFit: "cover",
                      borderRadius: "6px",
                      marginRight: "10px",
                    }}
                  />
                  <div className="flex-grow-1">
                    <h6
                      className="mb-1"
                      style={{ fontSize: "12px", color: "#6E7191" }}
                    >
                      {item.name}
                    </h6>
                    <small style={{ color: "#6E7191", fontWeight: "500" }}>
                      ₹ {item.price.toFixed(2)}
                    </small>
                    <div className="d-flex align-items-center mt-1">
                      <div
                        style={{
                          backgroundColor: "#F7F7FC",
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <ButtonComponent
                          variant="circle-gray"
                          onClick={() =>
                            handleUpdateCartQty(item.id, item.quantity - 1)
                          }
                        >
                          <FaMinus size={12} />
                        </ButtonComponent>
                        <span className="mx-2" style={{ fontSize: "14px" }}>
                          {item.quantity}
                        </span>
                        <ButtonComponent
                          variant="circle-gray"
                          onClick={() =>
                            handleUpdateCartQty(item.id, item.quantity + 1)
                          }
                        >
                          <FaPlus size={12} />
                        </ButtonComponent>
                      </div>
                      <ButtonComponent
                        variant="circle-blue-transparent"
                        onClick={() => handleDelete(item.id)}
                      >
                        <Trash size={12} />
                      </ButtonComponent>
                    </div>
                  </div>
                </div>
              ))}
              <div
                className="d-flex align-items-center mb-3"
                style={{ whiteSpace: "nowrap", width: "100%" }}
              >
                <select
                  className="form-select m-0"
                  style={{
                    fontSize: "12px",
                    height: "40px",
                    width: "40%",
                    borderTopLeftRadius: "6px",
                    borderBottomLeftRadius: "6px",
                    borderTopRightRadius: "0",
                    borderBottomRightRadius: "0",
                    border: "1px solid #DDE1E3",
                  }}
                  value={discountType}
                  onChange={(e) => setDiscountType(e.target.value)}
                >
                  <option value="percentage">Percentage</option>
                  <option value="flat">Flat</option>
                </select>

                <input
                  type="text"
                  placeholder="Add Discount"
                  className="form-control"
                  style={{
                    fontSize: "12px",
                    height: "40px",
                    width: "40%",
                    borderRadius: 0,
                    border: "1px solid #DDE1E3",
                  }}
                  value={discountValue}
                  onChange={(e) => setDiscountValue(e.target.value)}
                />
                <ButtonComponent
                  variant="blueclr"
                  style={{
                    width: "20%",
                    fontSize: "12px",
                    height: "40px",
                    border: "1px solid #DDE1E3",
                  }}
                >
                  Apply
                </ButtonComponent>
              </div>
              <ul className="list-group list-group-flush pt-2 mb-3">
                <li className="list-group-item d-flex justify-content-between border-0">
                  <span>Sub Total</span>
                  <span>₹ {subTotal.toFixed(2)}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between border-0">
                  <span style={{ color: "#6E7191" }}>Tax</span>
                  <span style={{ color: "#6E7191" }}>₹ {tax.toFixed(2)}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between border-0">
                  <span style={{ color: "#6E7191" }}>Discount</span>
                  <span style={{ color: "#6E7191" }}>
                    ₹ {discount.toFixed(2)}
                  </span>
                </li>
                <li className="list-group-item d-flex justify-content-between fw-bold fs-6">
                  <span>Total</span>
                  <span>₹ {total.toFixed(2)}</span>
                </li>
              </ul>
              <div className="d-flex justify-content-between">
                <ButtonComponent
                  variant="gray-rounded"
                  onClick={() => handleDelete(item.id)}
                >
                  Cancel
                </ButtonComponent>
                <ButtonComponent variant="green">Order</ButtonComponent>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
    </div>
  );
};

export default POS;
